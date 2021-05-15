<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PostsComment extends Model
{
    use HasFactory;
    protected $cacheCooldownSeconds = 600; // 5 minutes
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
        'comment_id',
        'topic_id',
    ];
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class,'comment_id');
    }
    public function topic()
    {
        return $this->belongsTo(Topic::class,'topic_id');
    }
}
