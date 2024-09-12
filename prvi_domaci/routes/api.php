<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EmployeeAuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PrivilegeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware(['auth:sanctum','check_if_user'])->group(function () {
    // Ruta za profil korisnika
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
    Route::resource('/companies',CompanyController::class)->only(['store','update','destroy']);

    Route::get('/companies/{id}/employees',[CompanyController::class,'getEmployees']);
    Route::post('/employees',[EmployeeController::class,'store']);
    Route::put('/employees/{id}',[EmployeeController::class,'update']);
    Route::delete('/employees/{id}',[EmployeeController::class,'destroy']);
    Route::apiResource('/privileges',PrivilegeController::class)->only(['store','update','destroy']); 
    Route::get('/users/{id}/company',[UserController::class,'getCompany']);
    Route::get('/users/{id}/files',[UserController::class,'getFiles']);
});

Route::apiResource('/files',FileController::class)->only(['store','update','destroy'])->middleware("auth:sanctum");
//USER RUTE
Route::get('/users',[UserController::class,'index']);
Route::get('/users/{id}',[UserController::class,'show']);
Route::post('/users',[UserController::class,'store']);

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

//EMPLOYEEAUTH
Route::post('/employee/login',[EmployeeAuthController::class,'login']);
Route::post('/employee/logout',[EmployeeAuthController::class,'logout'])->middleware('auth:sanctum');