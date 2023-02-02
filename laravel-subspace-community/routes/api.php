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

//Community Routes
Route::group(
    [
        'namespace' => 'App\Http\Controllers',
    ],
    function ($router) {
        Route::get('showCommunity','CommunityController@showCommunity');
        Route::post('createCommunity', 'CommunityController@createCommunity');
        Route::post('joinCommunity', 'CommunityController@joinCommunity');
        Route::put('editCommunity', 'CommunityController@editCommunity');
        Route::delete('deleteCommunity', 'CommunityController@deleteCommunity');
        Route::delete('leaveCommunity', 'CommunityController@leaveCommunity');
        Route::get('/usersInCommunity/{id}', 'CommunityController@UsersInCommunity');
        Route::post('/checkUser', 'CommunityController@checkUser');
        Route::get('communityById/{id}', 'CommunityController@getCommunityById');
    }
);

