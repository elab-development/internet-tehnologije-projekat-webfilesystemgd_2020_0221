<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        try{

        
        $validated=$request->validate([
            'name'=>'required|string|max:255',
            'position'=>'required|string|max:255',
            'email'=>'required|string|email|unique:employees',
            'password'=>'required|string|min:8',
            'gender'=>'required|string|max:255',
        ]);
        
        $company = Company::where('user_id',Auth::id())->first();
        // Provera da li kompanija postoji
        if (is_null($company)) {
            return response()->json(['message' => 'Company not found.'], 404);
        }
        // Provera da li je trenutni korisnik vlasnik kompanije
        if ($company->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }
        $validated['password'] = bcrypt($validated['password']);
        $validated['company_id'] = $company->id;
        $employee = Employee::create($validated);
        return response()->json($employee);
    }catch(\Exception $e){
        return response()->json(['message' => $e->getMessage()], 500);
    }
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
            
            'position'=>'required|string|max:255',
            'company_id'=>'required|integer',
            
        ]);


        $employee = Employee::find($id);
        if(is_null($employee)){
            return response()->json("Employee not found.",404);
        }

        $company = Company::find($validated['company_id']);
        if (is_null($company)) {
            return response()->json(['message' => 'Company not found.'], 404);
        }
    
        // Provera da li je trenutni korisnik vlasnik kompanije
        if ($company->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
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
