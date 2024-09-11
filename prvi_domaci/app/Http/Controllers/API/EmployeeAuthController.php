<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeAuthController extends Controller
{
    public function login(Request $request){

        $request->validate([
        
        'email'=>'required|email|exists:employees',
        'password'=>'required|string|min:8'
        ]);

        $employee = Employee::where('email',$request->email)->first(); 
        if(!$employee || !Hash::check($request->password,$employee->password)){
            return response()->json(["message"=>"Invalid credentails."]);
        }
        $token = $employee->createToken('auth_token')->plainTextToken;
        return response()->json(['message'=>'Hi '.$employee->name.' welcome to home.','access_token'=>$token]);

   }
   public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(["message"=>"You are logged out!"]);
   }
}
