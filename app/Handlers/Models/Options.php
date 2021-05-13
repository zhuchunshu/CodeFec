<?php

namespace App\Handlers\Models;

use App\Models\Options as ModelsOptions;

class Options{

    /**
     * 新增Options内容
     *
     * @param string $name 名称
     * @param $value 值
     * @param string $class 分类
     * @return void
     */
    public function Insert(string $name,$value,string $class){
        $id = ModelsOptions::insertGetId([
            'name' => $name,
            'value' => $value,
            'class' => $class,
            'created_at' => date("Y-m-d H:i:s")
        ]);
        if($id){
            return $id;
        }else{
            return null;
        }
    }
    /**
     * 通过名称分类更新Options
     *
     * @param string $name 名称
     * @param $value 值
     * @param string $class 分类
     * @return void
     */
    public function Update_name(string $name,$value,string $class){
        ModelsOptions::where(['name' => $name,'class' => $class])->update([
            'value' => $value
        ]);
    }
    /**
     * 通过id更新Options
     *
     * @param integer $id
     * @param string $value 值
     * @return void
     */
    public function Update_id(int $id,string $value){
        ModelsOptions::where(['id' => $id])->update([
            'value' => $value
        ]);
    }
    /**
     * 通过名称分类读取内容
     *
     * @param string $name 名称
     * @param string $class 分类
     * @param string $default 默认值
     * @return void
     */
    public function Read_name(string $name,string $class,string $default=NULL){
        if($this->Count_name($name,$class)){
            return ModelsOptions::where(['name' => $name,'class' => $class])->first()['value'];
        }else{
            return $default;
        }
    }

    public function Read_name_check(string $name,string $class,string $default=NULL){
        if($this->Count_name($name,$class)){
            return ModelsOptions::where(['name' => $name,'class' => $class])->first()['create'];
        }else{
            return $default;
        }
    }
    /**
     * 通过名称分类判断内容存在
     *
     * @param string $name 名称
     * @param string $class 分类
     * @return void
     */
    public function Count_name(string $name,string $class){
        if(ModelsOptions::where(['name' => $name,'class' => $class])->count()){
            return true;
        }else{
            return false;
        }
    }
    /**
     * 更新或新增
     *
     * @param array $insert 新增数据
     * @param array $update 更新内容
     * @return void
     */
    public function updateOrInsert(array $insert,array $update){
        ModelsOptions::updateOrInsert(
            $insert,
            $update
        );
    }
}
