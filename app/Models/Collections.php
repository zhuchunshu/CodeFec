<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collections extends Model
{
    use HasFactory;
    protected $table = "collections";

    public function class(){
        return $this->belongsTo(Collections_class::class,'class_id');
    }
    public function topic(){
        return $this->belongsTo(Topic::class,'posts_id');
    }
}
