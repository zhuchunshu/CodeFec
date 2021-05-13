<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collections_class extends Model
{
    use HasFactory;
    protected $table = "collections_class";
    public function coll(){
        return $this->hasMany(Collections::class,'class_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
