<?php

namespace App\Http\Controllers;

use App\Models\Company;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $companies = Company::all();
        return response()->json($companies);
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
        $fields=$request->validate([
            "name"=>"required|string|max:255",
            "description"=>"nullable|string|max:255",
            "address"=>"nullable|string|max:255",
            "phone"=>"nullable|string|max:20",
            
        ]);
        $fields['user_id']=Auth::id();
        $company = Company::create($fields);
        return response()->json([
            'message' => 'Company created successfully.',
            'company' => $company
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $company = Company::find($id);
        if(is_null($company)){
            return response()->json("Company not found",404);
        }
        return response()->json($company);
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
            "name"=>"nullable|string|max:255",
            "description"=>"required|string|max:255",
            "address"=>"nullable|string|max:255",
            "phone"=>"nullable|string|max:20",
        ]);
        $company = Company::find($id);
        if(is_null($company)){
            return response()->json("Company not found.",404);
        }
        if ($company->user_id !== Auth::id()) {
            return response()->json(['message' => 'You cannot update this company because you are not the owner..'], 403);
        }
       $company->update($validated);
       return response()->json(['message' => 'Company updated successfully', 'company' => $company], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        if(Auth::id()!==$company->user_id){
            return response()->json(["message"=>"You cannot delete this company because you are not the owner."],403);
        }
        $company->delete();
        return response()->json(['message' => 'Company deleted successfully'], 200);
    }
}
