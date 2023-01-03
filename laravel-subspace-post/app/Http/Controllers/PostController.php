<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class PostController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.jwt', ['except' => ['showPosts', 'postByCommunity']]);
    }

    public function showPosts()
    {
        return  Post::all();
    }

    public function postByCommunity($id)
    {

        //id requested is the community_id
        $post_community = Post::where('community_id', $id)->get();

        return response()->json(
            [
                'posts' => $post_community,
            ]
        );
    }


    public function createPost(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'community_id' => 'required|integer',
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

        $response = Http::post('http://127.0.0.1:8001/api/checkUser', [
            'user_id' => $request->user_id,
            'community_id' => $request->community_id,
        ]);

        if ($response->failed()) {
            return response()->json([
                'message' => 'No user found in requested community',
            ], 403);
        } else {
            //check if request has File

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

            return response()->json(
                [
                    'status' => true,
                    'post' => $post,
                ]
            );
        }
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
}
