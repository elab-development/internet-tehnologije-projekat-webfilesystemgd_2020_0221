<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PrivilegeController;
use App\Http\Controllers\UserController;
use App\Models\Company;
use App\Models\User;
use GuzzleHttp\Cookie\FileCookieJar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    // Ruta za profil korisnika
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });

    Route::resource('/companies',CompanyController::class)->only(['store','update','destroy']);
    Route::post('/employees',[EmployeeController::class,'store']);
    Route::put('/employees/{id}',[EmployeeController::class,'update']);
    Route::delete('/employees/{id}',[EmployeeController::class,'destroy']);

    Route::apiResource('/files',FileController::class)->only(['store','update','destroy']);
    Route::apiResource('/privileges',PrivilegeController::class)->only(['store','update','destroy']);



});

//USER RUTE
Route::get('/users',[UserController::class,'index']);
Route::get('/users/{id}',[UserController::class,'show']);

//COMPANY
Route::get('/companies',[CompanyController::class,'index']);
Route::get('/companies/{id}',[CompanyController::class,'show']);

//EMPLOYEE
Route::get('/employees',[EmployeeController::class,'index']);
Route::get('/employees/{id}',[EmployeeController::class,'show']);


//FILE
Route::get('/files',[FileController::class,'index']);
Route::get('/files/{id}',[FileController::class,'show']);

//PRIVILEGE
Route::get('/privileges',[PrivilegeController::class,'index']);
Route::get('/privileges/{id}',[PrivilegeController::class,'show']);




//AUTH
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');