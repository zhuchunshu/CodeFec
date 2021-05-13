<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogModels extends Model
{
    use HasFactory;
    /**
     * 定义表名
     *
     * @var string
     */
    protected $table = "users_log";
}
