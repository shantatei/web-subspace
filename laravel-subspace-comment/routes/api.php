<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//Comment Routes
Route::group(
    [
        'namespace' => 'App\Http\Controllers',
    ],
    function ($router) {
        Route::get('showComments', 'CommentController@showComments');
        Route::post('createComment', 'CommentController@createComment');
        Route::put('editComment', 'CommentController@editComment');
        Route::delete('deleteComment', 'CommentController@deleteComment');
    }
);
