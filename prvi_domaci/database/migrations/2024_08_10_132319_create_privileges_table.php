<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('privileges', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('employee_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('file_id')->constrained()->onDelete('cascade'); 
            $table->boolean('can_view')->default(false); 
            $table->boolean('can_edit')->default(false); 
             
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('privileges');
    }
};
