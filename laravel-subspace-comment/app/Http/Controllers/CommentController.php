<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.jwt', ['except' => ['showComments']]);
    }

    public function showComments()
    {
        return Comment::all();
    }

    public function createComment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'post_id' => 'required|integer',
            'text' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 400);
        }

        $response = Http::post('http://127.0.0.1:8002/api/checkPost', [
            'post_id' => $request->post_id,
        ]);

        if ($response->failed()) {
            return response()->json([
                'message' => 'No Post Found !',
            ], 403);
        } else {

            $comment = Comment::create(
                $validator->validated(),
            );

            return response()->json([
                'message' => 'Comment created successfully',
                'comment' => $comment,
                'post' => $response->json()
            ]);
        }
    }
}
