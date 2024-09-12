<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if(!is_null($user)){

            return response()->json($user);
        }
        return response()->json("User not found",404);
    }

    public function getCompany($id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json("User not found",404);
        }
        $company = Company::where('user_id',$id)->with('employees')->first();
        if(is_null($company)){
            return response()->json("Company not found",404);
        }

        return response()->json($company);
    }

    public function getFiles($id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json("User not found",404);
        }
        $files = File::where('user_id',$id)->get();
        if(is_null($files)){
            return response()->json("Company not found",404);
        }
        return response()->json($files);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
