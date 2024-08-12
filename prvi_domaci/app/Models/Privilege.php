<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privilege extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'file_id',
        'can_view',
        'can_edit',
        'can_delete',
    ];
    
    public function file(){
        return $this->belongsTo(File::class);
    }

    public function employee(){
        return $this->belongsTo(Employee::class);
    }
}
