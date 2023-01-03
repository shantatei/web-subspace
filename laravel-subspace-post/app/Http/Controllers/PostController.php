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
        $this->middleware('auth.jwt', ['except' => ['showPosts']]);
    }

    public function showPosts()
    {
        return  Post::all();
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
}
