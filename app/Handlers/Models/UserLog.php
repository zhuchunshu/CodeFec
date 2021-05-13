<?php

namespace App\Handlers\Models;

use App\Models\UserLogModels;

class UserLog {
    /**
     * 新增用户操作记录
     *
     * @param string $name 记录名
     * @param integer $user_id 用户id
     * @return void
     */
    public function Insert(string $name,int $user_id){
        $id = UserLogModels::insertGetId([
            'name' => $name,
            'ip' => Helpers()->GetClientIp(),
            'user_id' => $user_id,
            'created_at' => date("Y-m-d H:i:s")
        ]);
        if($id){
            return $id;
        }else{
            return null;
        }
    }
    /**
     * 分页获取用户操作记录
     *
     * @param integer $user_id
     * @param integer $page
     * @return void
     */
    public function get_page_id(int $user_id,int $page=15){
        return UserLogModels::where('user_id',$user_id)->orderBy('id','DESC')->paginate($page);
    }
}
