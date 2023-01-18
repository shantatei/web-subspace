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

Route::group(
    [
        'middleware' => 'api',
        'namespace' => 'App\Http\Controllers',
        'prefix' => 'auth'
    ],
    function ($router) {
        //login
        Route::post('login', 'AuthController@login');
        //register
        Route::post('register', 'AuthController@register');
        //logout
        Route::post('logout', 'AuthController@logout');
        //edit acc
        Route::put('editUser', 'AuthController@editUser');
        //delete acc
        Route::delete('deleteUser', 'AuthController@deleteUser');
        //profile
        Route::get('profile', 'AuthController@profile');
        //refresh token
        Route::post('refresh', 'AuthController@refresh');
        //profileById
        Route::get('profile/{id}', 'AuthController@getUserById');
        //change password
        Route::post('change-password', 'AuthController@change_password');
    }
);


