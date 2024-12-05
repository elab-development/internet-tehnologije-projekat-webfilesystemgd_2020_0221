<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function register(Request $request){
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|string|max:255|email|unique:users',
            'password'=>'required|string|min:8|confirmed',
            'gender'=>'required|string|max:255'
        ]);

            $validated['password'] = bcrypt($validated['password']);
        $user = User::create($validated);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user'=>$user,'access_token'=>$token,'token_type'=>'Bearer']);

   }
   public function login(Request $request){

        $request->validate([
        
        'email'=>'required|email|exists:users',
        'password'=>'required|string|min:8'
        ]);

        $user = User::where('email',$request->email)->first();//vraca niz 
        if(!$user || !Hash::check($request->password,$user->password)){
            return response()->json(["message"=>"Invalid credentails."]);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['user'=>$user,'access_token'=>$token]);

   }
   public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(["message"=>"You are logged out!"]);
   }
}
