<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invitationCode extends Model
{
    use HasFactory;
    protected $table = "invitationCode";
    // 创建者信息
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    // 使用者信息
    public function use_user()
    {
        return $this->belongsTo(User::class,'use_id');
    }
}
