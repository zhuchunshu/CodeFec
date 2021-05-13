<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Dengji_log extends Model
{
    use HasFactory;
    protected $cacheCooldownSeconds = 600; // 5 minutes
    /**
     * 定义表名
     *
     * @var string
     */
    protected $table = "dengji_log";
}
