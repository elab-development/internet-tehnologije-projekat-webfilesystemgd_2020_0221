<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'phone',
        'user_id',
    ];
    public function owner(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function employees(){
        return $this->hasMany(Employee::class);
    }
}
