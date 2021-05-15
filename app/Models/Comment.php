<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    /**
     * 定义表名
     *
     * @var string
     */
    protected $table = "posts_comment";
    protected $fillable = [
        'class',
        'user_id',
        'ishtml',
        'html',
        'content',
        'posts_id',
    ];
    public $timestamps = true;
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
