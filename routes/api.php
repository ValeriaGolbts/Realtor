<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('sendVerificationCode', 'App\Http\Controllers\RegistrationController@sendVerificationCode');
Route::post('reg', 'App\Http\Controllers\RegistrationController@reg');

//Route::post('sendVerificationCode', 'App\Http\Controllers\RegistrationController@sendVerificationCode');
//Route::post('reg', 'App\Http\Controllers\RegistrationController@reg');


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
});

//Route::post('sendVerificationCode', 'App\Http\Controllers\RegistrationController@sendVerificationCode');
//Route::post('reg', 'App\Http\Controllers\RegistrationController@reg');
//Route::post('/verify-code', 'App\Http\Controllers\VerificationController@verify');

