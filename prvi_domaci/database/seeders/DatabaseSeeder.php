<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use App\Models\File;
use App\Models\Privilege;
use Illuminate\Container\Attributes\DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
       
        // Privilege::truncate();
        // File::truncate();
        // Employee::truncate();
        // Company::truncate();
        // User::truncate();
       




        // $user1 = User::factory()->create();
        // $user2 = User::factory()->create();
        // $company1= Company::factory()->create([
        //     'user_id'=>$user1->id
        // ]);
        // $company2= Company::factory()->create([
        //     'user_id'=>$user2->id
        // ]);

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $company1 = Company::factory()->create(['user_id'=>$user1->id]);
        $company2 = Company::factory()->create(['user_id'=>$user2->id]);
         Employee::factory()->count(5)->create(['company_id' => $company1->id]);
        Employee::factory()->count(5)->create(['company_id' => $company2->id]);
        $file = File::factory()->count(5)->create(['user_id' => $user1->id]);
        $privilege = Privilege::factory()->count(5)->create();


        // Employee::factory(4)->create([
        //     'company_id'=>$company1->id
        // ]);
        // Employee::factory(4)->create([
        //     'company_id'=>$company2->id
        // ]);
        // File::factory(10)->create();
        // Privilege::factory(20)->create();


    }
}
