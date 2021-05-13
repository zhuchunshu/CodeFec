<?php 
namespace App\Handlers;

use App\Models\User;
use App\Models\UserGroup;

class CodeFecApi {

    /**
     * 权限鉴定
     *
     * @param integer $quanxian
     * @param string $uk
     * @return void
     */
    public function quanxian(int $quanxian,string $uk){
        if(!User::where(['_Token' => $uk, 'zhuangtai' => '正常'])->count()){
            $group = null;
            return Json_API(401,'error' ,'无权限');
        }else{
            $group = User::where(['_Token' => $uk, 'zhuangtai' => '正常'])->first()['user_group'];
        }
        if(!UserGroup::where(['id' => $group])->count()){
            return Json_API(401,'error' ,'无权限'); 
        }
        if(UserGroup::where(['id' => $group])->first()['quanxian']<$quanxian){
            return Json_API(401,'error','无权限');
        }else{
            return true;
        }
    }
}