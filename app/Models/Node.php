<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Node extends Model
{
    use HasFactory;
    /**
     * 定义表名
     *
     * @var string
     */
    protected $cacheCooldownSeconds = 600; // 5 minutes
    protected $table = "node";
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
