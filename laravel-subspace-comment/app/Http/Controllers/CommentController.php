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
        $this->middleware('auth.jwt', ['except' => ['showComments', 'getCommentByPost']]);
    }

    public function showComments()
    {
        $comments =  Comment::all();

        foreach ($comments as $comment => $usercomment) {
            $userId = $usercomment->user_id;
            $user = Http::get("http://laravel-subspace-authentication:80/api/auth/profile/$userId");
            $user_array = $user->json();
            $usercomment->user = $user_array;
        }

        return $comments;
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

        $response = Http::post('http://laravel-subspace-post:80/api/checkPost', [
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


    public function editComment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'comment_id' => 'required|integer',
            'text' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $comment  = Comment::where('id', $request->comment_id)->first();

        if ($comment) {

            if ($comment->user_id == $request->user_id) {


                $comment->update($validator->validated());

                return response()->json([
                    'message' => 'Comment successfully updated',
                    'comment' => $comment,

                ]);
            } else {
                return response()->json([
                    'message' => 'Access denied',
                ]);
            }
        } else {

            return response()->json([
                'message' => 'No Comment Found',
            ], 403);
        }
    }

    public function deleteComment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'comment_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $comment  = Comment::where('id', $request->comment_id)->first();


        if ($comment) {

            if ($comment->user_id == $request->user_id) {
                $comment->delete();

                return response()->json([
                    'message' => 'Comment Deleted',
                    'comment' => $comment,
                ]);
            } else {
                return response()->json([
                    'message' => 'Access denied',
                ]);
            }
        } else {

            return response()->json([
                'message' => 'No Comment Found',
            ], 403);
        }
    }

    public function getCommentByPost($id)
    {
        $comments = Comment::where('post_id', $id)->get();

        if ($comments) {
            foreach ($comments as $comment => $usercomment) {
                $userId = $usercomment->user_id;
                $user = Http::get("http://laravel-subspace-authentication:80/api/auth/profile/$userId");
                $user_array = $user->json();
                $usercomment->user = $user_array;
            }

            return $comments;
        } else {
            return response()->json([
                'message' => 'No Comments Found ',
            ], 403);
        }
    }
}
