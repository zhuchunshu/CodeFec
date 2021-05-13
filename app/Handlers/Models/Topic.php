<?php

namespace App\Handlers\Models;

use App\Models\Topic as ModelsTopic;

class Topic{

    // 用户发帖量
    public function user_count($user_id){
        return ModelsTopic::where(['user_id'=>$user_id,'publish' => '发布'])->count();
    }
    // 展示指定用户指定数量的帖子
    public function user_get_num($user_id,int $num=5){
        return ModelsTopic::where(['user_id' => $user_id,'publish' => '发布'])
        ->orderBy('created_at','DESC')
        ->with('user')
        ->take($num)
        ->get();
    }
    public function user_get_count($user_id){
        return ModelsTopic::where(['user_id' => $user_id,'publish' => '发布'])
        ->count();
    }
}
