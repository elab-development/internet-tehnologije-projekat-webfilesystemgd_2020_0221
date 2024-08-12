<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees =  Employee::all();
        return response()->json($employees);
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
        $validated=$request->validate([
            'name'=>'required|string|max:255',
            'position'=>'required|string|max:255',
            'company_id'=>'required|exists:companies,id'
        ]);
        $employee = Employee::create($validated);
        return response()->json([
            'message' => 'Employee created successfully.',
            'employee' => $employee
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = Employee::find($id);
        if(is_null($employee)){
            return response()->json("Employee not found.",404);
        }
        return response()->json($employee);
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
        $validated=$request->validate([
            'name'=>'required|string|max:255',
            'position'=>'required|string|max:255',
            'company_id'=>'required|exists:companies,id'
        ]);


        $employee = Employee::find($id);
        if(is_null($employee)){
            return response()->json("Employee not found.",404);
        }
        $employee->update($validated);

        return response()->json(['message' => 'Employee updated successfully', 'employee' => $employee], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
