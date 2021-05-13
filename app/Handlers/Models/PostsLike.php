<?php

namespace App\Handlers\Models;

use Illuminate\Support\Facades\Auth;
use App\Models\PostsLike as ModelsPostsLike;

class PostsLike{

    public function get_data($class,$posts_id){
        if(Auth::id()){
            return ModelsPostsLike::where(['class' => $class,'posts_id' => $posts_id,'user_id' => Auth::id()])
            ->with('user')
            ->first();
        }else{
            return false;
        }
    }
    // 获取点赞量
    public function get_count($class,$posts_id,$type="like"){
        return ModelsPostsLike::where(['class' => $class,'posts_id' => $posts_id,'type' => $type])->count();
    }
    // 获取点赞总量
    public function get_all_count($class,$posts_id){
        return ModelsPostsLike::where(['class' => $class,'posts_id' => $posts_id])->count();
    }
}
