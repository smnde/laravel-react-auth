<?php

use App\Http\Controllers\Auth\{ LoginController, LogoutController, RegisterController, UserController};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);


Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', UserController::class);
    Route::post('logout', LogoutController::class);
});