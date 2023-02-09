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



//Post Routes
Route::group(
    [
        'namespace' => 'App\Http\Controllers',
    ],
    function ($router) {
        Route::get('showPosts', 'PostController@showPosts');
        Route::post('createPost', 'PostController@createPost');
        Route::put('editPost/{id}', 'PostController@editPost');
        Route::delete('deletePost/{id}', 'PostController@deletePost');
        Route::get('postByCommunity/{id}', 'PostController@postByCommunity');
        Route::post('checkPost', 'PostController@checkPost');
        Route::get('/queryPost', 'PostController@queryPost');
        Route::get('/categories', 'PostController@getCategories');
    }
);
