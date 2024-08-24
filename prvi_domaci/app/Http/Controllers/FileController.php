<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\File;
use App\Models\Privilege;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = File::all();
        return response()->json($files);
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
        try{

            $validated=$request->validate([
                'name'=>'required|string|max:255',
                'path'=>'required|string|max:255',
              'mime_type'=>'required|string|max:255',
                'google_drive_id'=>'required|string|max:255',
                'size'=>'required|numeric|min:0'
            ]);
            $user = $request->user();
            $employeeId =null;
            if($user instanceof User){
                
                $validated['user_id']=Auth::id();
            }else{
                $company = Company::find($user->company_id);
    
                if ($company) {
                    $validated['user_id'] = $company->user_id; // Pretpostavlja se da `Company` model ima `user_id`
                } else {
                    return response()->json(['message' => 'Company not found.'], 404);
                }
                $employeeId = $user->id;
            }
            $file = File::create($validated);


            if ($employeeId) {
                // Ako je zaposleni kreirao fajl, dodeli sve privilegije
                Privilege::create([
                    'employee_id' => $employeeId,
                    'file_id' => $file->id,
                    'can_view' => true,
                    'can_edit' => true,
                ]);
            } 
            return response()->json([
                'message' => 'File created successfully.',
                'file' => $file
            ], 201);

        }catch(QueryException $e){
            return \response()->json(["message"=>"An error ocurd:".$e->getMessage()],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $file = File::find($id);
        if(!is_null($file)){

            return response()->json($file);
        }
        return response()->json("File not found",404);
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
       $validated= $request->validate([
            'name'=>'required|string|max:255',
            'path'=>'nullable|string|max:255',
            'mime_type'=>'nullable|string|max:255',
            'google_drive_id'=>'nullable|string|max:255',
            'size'=>'nullable|numeric|min:0',
        ]);
        $file = File::find($id);
        if(is_null($file)){
            return response()->json("File not found.",404);
        }
        // if ($file->user_id !== Auth::id()) {
        //     return response()->json(['message' => 'Unauthorized.'], 403);
        // }

            $user = $request->user();
            if($user instanceof User){
                
             if ($file->user_id !== Auth::id()) 
             return response()->json(['message' => 'Unauthorized.'], 403);

            }else{
                $company = Company::find($user->company_id);
    
                if ($company) {
                    if ($file->user_id !== $company->user_id) 
                    return response()->json(['message' => 'Unauthorized.'], 403);
                } else {
                    return response()->json(['message' => 'Company not found.'], 404);
                }
                
            }
        $file->update($validated);
        return response()->json(['message' => 'File updated successfully', 'file' => $file], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        $file->delete();
        return response()->json("File is deleted.");
    }
}
