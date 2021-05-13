<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User_Options extends Model
{
    use HasFactory;
    protected $cacheCooldownSeconds = 600; // 5 minutes
    /**
     * 定义表名
     *
     * @var string
     */
    protected $table = "user_options";
    public $timestamps = true;
}
