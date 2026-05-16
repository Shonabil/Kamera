<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\CameraController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/sessions', [SessionController::class, 'index']);
Route::post('/sessions', [SessionController::class, 'store']);
Route::get('/sessions/{id}', [SessionController::class, 'show']);
Route::post('/sessions/{id}/complete', [SessionController::class, 'complete']);

// Unified Camera Endpoint
Route::post('/process-session', [CameraController::class, 'processSession']);
