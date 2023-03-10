<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\RequestMatcher\PortRequestMatcher;

class PostController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.jwt', ['except' => ['showPosts', 'postByCommunity', 'checkPost', 'queryPost', 'getCategories']]);
    }

    public function showPosts()
    {
        $posts = Post::with('category')->get();
        foreach ($posts as $post => $userpost) {
            $userId = $userpost->user_id;
            $user = Http::get("http://laravel-subspace-authentication:80/api/auth/profile/$userId");
            $user_array = $user->json();
            $userpost->user = $user_array;
        }

        return $posts;
    }

    public function postByCommunity($id)
    {

        //id requested is the community_id
        $posts_community = Post::where('community_id', $id)->with('category')->get();

        if ($posts_community->isEmpty()) {


            return response()->json(
                [
                    'message' => 'No Post Found',
                ]
            );
        }

        foreach ($posts_community as $post_community => $userpost) {
            $userId = $userpost->user_id;
            $user = Http::get("http://laravel-subspace-authentication:80/api/auth/profile/$userId");
            $user_array = $user->json();
            $userpost->user = $user_array;
        }

        return response()->json(
            [
                'posts' => $posts_community,
            ]
        );
    }

    public function createPost(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'community_id' => 'required|integer',
            'title' => 'required|string',
            'text' => 'string|nullable',
            'post_image_filename' => 'image|mimes:jpg,png,bmp,jpeg',
            'post_image_url' => 'string',
            'category_id' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 400);
        }

        if ($request->hasFile('post_image_filename')) {

            $path = $request->post_image_filename->store('post_images', 's3');

            Storage::disk('s3')->setVisibility($path, 'public');

            $url = Storage::disk('s3')->url($path);

            $post = new Post();
            $post->post_image_filename = $path;
            $post->post_image_url = $url;
            $post->title = $request->title;
            $post->text = $request->text;
            $post->user_id = $request->user_id;
            $post->community_id = $request->community_id;
        } else {
            $post = new Post();
            $post->title = $request->title;
            $post->text = $request->text;
            $post->user_id = $request->user_id;
            $post->community_id = $request->community_id;
        }

        $post->save();

        if ($request->has('category_id')) {
            $category = Category::where('id', $request->category_id)->first();

            $post->category()->attach($category->id);
            $post->category;
        }


        return response()->json(
            [
                'status' => true,
                'post' => $post,
            ]
        );
    }

    public function editPost($id, Request $request)
    {

        $post  = Post::where('id', $id)->first();

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'title' => 'required|string',
            'text' => 'string',
            'post_image_filename' => 'image|mimes:jpg,png,bmp,jpeg',
            'post_image_url' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 400);
        }

        if ($post) {

            if ($post->user_id == $request->user_id) {

                if ($request->hasFile('post_image_filename')) {
                    if ($post->post_image_filename) {
                        $old_path = $post->post_image_filename;
                        if (Storage::disk('s3')->exists($old_path)) {
                            Storage::disk('s3')->delete($old_path);
                        }
                    }

                    $imagepath = $request->post_image_filename->store('post_images', 's3');

                    Storage::disk('s3')->setVisibility($imagepath, 'public');

                    $imageurl = Storage::disk('s3')->url($imagepath);

                    $post->update([
                        'title' => $request->title,
                        'post_image_url' => $imageurl,
                        'post_image_filename' => $imagepath,
                    ]);
                } else {
                    $post->update($validator->validated());
                }


                return response()->json([
                    'message' => 'Post Successfully Updated',
                    'post' => $post
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Access denied',
                ]);
            }
        } else {

            return response()->json([
                'message' => 'No Post Found',
            ], 403);
        }
    }

    public function deletePost($id, Request $request)
    {
        $post  = Post::where('id', $id)->first();

        if ($post) {

            if ($post->user_id == $request->user_id) {

                if ($post->post_image_filename) {
                    $old_path = $post->post_image_filename;
                    if (Storage::disk('s3')->exists($old_path)) {
                        Storage::disk('s3')->delete($old_path);
                    }
                }

                $post->delete();
                return response()->json([
                    'message' => 'Post Deleted successfully',
                    'post' => $post
                ]);
            } else {
                return response()->json([
                    'message' => 'Access denied',
                ]);
            }
        } else {

            return response()->json([
                'message' => 'No Post Found',
            ], 403);
        }
    }

    public function checkPost(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'post_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 400);
        }

        $post = Post::where('id', $request->post_id)->first();

        if ($post) {
            return $post;
        } else {

            return response()->json([
                'message' => 'No Post Found',
            ], 403);
        }
    }

    //search,sort and pagination
    public function queryPost(Request $request)
    {
        $post_query = Post::with('category');

        //sort by keyboard(search)
        if ($request->keyword) {
            $post_query->where('title', 'LIKE', '%' . $request->keyword . '%');
        }

        //sort by id
        if ($request->sortBy && in_array($request->sortBy, ['id', 'created_at'])) {
            $sortBy = $request->sortBy;
        } else {
            $sortBy = 'id';
        }

        //sort by asc/desc time
        if ($request->sortOrder && in_array($request->sortOrder, ['asc', 'desc'])) {
            $sortOrder = $request->sortOrder;
        } else {
            $sortOrder = 'desc';
        }

        //pagination per page (default is 5)

        if ($request->perPage) {
            $perPage = $request->perPage;
        } else {
            $perPage = 5;
        }

        //pagination
        if ($request->paginate) {

            $posts = $post_query->orderBY($sortBy, $sortOrder)->paginate($perPage);
        } else {
            $posts = $post_query->orderBY($sortBy, $sortOrder)->get();
        }

        return response()->json([
            'message' => 'Listing successfully fetched',
            'posts' => $posts
        ]);
    }

    public function getCategories()
    {
        return  Category::all();
    }
}
