<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'path',
        'mime_type',
        'google_drive_id',
        'size',
        'user_id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function privileges(){
        return $this->hasMany(Privilege::class);
    }

}
