<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Privilege;

class PrivilegeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $privileges = Privilege::all();
        return response()->json($privileges);
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
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'file_id' => 'required|exists:files,id',
            'can_view' => 'boolean',
            'can_edit' => 'boolean',
            'can_delete' => 'boolean',
        ]);

        $privilege = Privilege::create($validated);
        return response()->json(['message' => 'Privilege created successfully', 'privilege' => $privilege], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $privilege = Privilege::find($id);
        if(!is_null($privilege)){

            return response()->json($privilege);
        }
        return response()->json("Privilege not found",404);
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
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'file_id' => 'required|exists:files,id',
            'can_view' => 'boolean',
            'can_edit' => 'boolean',
            'can_delete' => 'boolean',
        ]);
        $privilege = Privilege::find($id);
        if(is_null($privilege)){
            return response()->json("Privilege not found.");
        }
        $privilege->update($validated);
        return response()->json(['message' => 'Privilege updated successfully', 'privilege' => $privilege], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Privilege $privilege)
    {
        $privilege->delete();
        return response()->json(['message' => 'Privilege deleted successfully'], 200);
    }
}
