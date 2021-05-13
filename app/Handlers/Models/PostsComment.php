<?php

namespace App\Handlers\Models;

use App\Models\PostsComment as ModelsPostsComment;

class PostsComment{

    // 获取指定帖子下的所有评论
    public function get_all($class,$posts_id){
        return ModelsPostsComment::where(['class'=>$class,'comment_id'=>$posts_id])->get();
    }
    // 获取指定帖子下的评论数量
    public function get_count($class,$posts_id){
        return ModelsPostsComment::where(['class'=>$class,'comment_id'=>$posts_id])->count();
    }

    // 获取指定帖子下最后的评论
    public function get_desc_first($class,$posts_id){
        return ModelsPostsComment::where(['class'=>$class,'comment_id'=>$posts_id])
        ->orderBy('created_at','desc')
        ->first();
    }

    // 获取指定用户的评论总量
    public function user_all_count($user_id){
        return ModelsPostsComment::where('user_id',$user_id)->count();
    }

    // 获取指定用户指定数量帖子的最新评论
    public function user_desc_get_topic($user_id,$num=10){
        return ModelsPostsComment::where(['class' => 'topic','user_id' => $user_id])
        ->orderBy('created_at','desc')
        ->take($num)
        ->get();
    }
    // 获取指定评论信息
    public function data($comment_id){
        return ModelsPostsComment::where(['id' => $comment_id])->first();
    }
}
