<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

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
    {//name	path	mime_type	google_drive_id
        $validated=$request->validate([
            'name'=>'required|string|max:255',
            'path'=>'required|string|max:255',
            'mime_type'=>'required|string|max:255',
            'google_drive_id'=>'required|string|max:255',
            'size'=>'required|numeric|min:0',
            'user_id'=>'required|exists:users,id'
        ]);
        $file = File::create($validated);
        return response()->json([
            'message' => 'File created successfully.',
            'file' => $file
        ], 201);
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
            'path'=>'required|string|max:255',
            'mime_type'=>'required|string|max:255',
            'google_drive_id'=>'required|string|max:255',
            'size'=>'required|numeric|min:0',
            'user_id'=>'required|exists:users,id'
        ]);
        $file = File::find($id);
        if(is_null($file)){
            return response()->json("File not found.",404);
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
