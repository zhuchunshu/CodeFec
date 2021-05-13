<?php

namespace App\Handlers\Models;

use App\Models\UserGroup as ModelsUserGroup;

class UserGroup{

    /**
     * 创建用户组
     *
     * @param string $name 名称
     * @param string $ename 英文名
     * @param string $color 颜色名
     * @param integer $quanxian 权限
     * @return void
     */
    public function Cerated(string $name,string $ename,string $color="black",int $quanxian=1){
        if(!$this->Count_ename($ename)){
            $id = ModelsUserGroup::insertGetId([
                'name' => $name,
                'ename' => $ename,
                'color' => $color,
                'quanxian' => $quanxian,
                'created_at' => date("Y-m-d H:i:s")
            ]);
            return $id;
        }else{
            return null;
        }
    }
    /**
     * 通过英文名判断用户组存在
     *
     * @param string $ename 英文名
     * @return void
     */
    public function Count_ename(string $ename){
        if(ModelsUserGroup::where('ename',$ename)->count()){
            return true;
        }else{
            return false;
        }
    }
    /**
     * 通过id判断用户组存在
     *
     * @param integer $id id
     * @return void
     */
    public function count(int $id){
        if(ModelsUserGroup::where('id',$id)->count()){
            return true;
        }else{
            return false;
        }
    }
    /**
     * 通过id获取用户组信息
     *
     * @param integer $id
     * @return void
     */
    public function Read_id(int $id){
        if($this->count($id)){
            return ModelsUserGroup::where('id',$id)->first();
        }else{
            return null;
        }
    }
}
