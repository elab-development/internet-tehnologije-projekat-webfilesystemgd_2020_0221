<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privilege extends Model
{
    use HasFactory;

    public function file(){
        return $this->belongsTo(File::class);
    }

    public function employee(){
        return $this->belongsTo(Employee::class);
    }
}
