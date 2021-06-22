<?php

namespace App\Handlers\Models;

use Illuminate\Support\Facades\Cache;
use App\Models\Options as ModelsOptions;
use Illuminate\Support\Facades\Redis;

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
            $data = ModelsOptions::where("id",$id)->first();
            Redis::setex('options:'.$class.'.'.$name,600,$data->value);
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
        $data = ModelsOptions::where(['name' => $name,'class' => $class])->first();
        Redis::setex('options:'.$class.'.'.$name,600,$data->value);
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
            if(!Redis::get('options:'.$class.'.'.$name)){
                Redis::setex('options:'.$class.'.'.$name,600,ModelsOptions::where(['name' => $name,'class' => $class])->first()['value']);
                //Cache::put('options.'.$class.'.'.$name, ModelsOptions::where(['name' => $name,'class' => $class])->first()['value'], 600);
            }
            return Redis::get('options:'.$class.'.'.$name);
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
        

        if(!Redis::get("options:count.".$class.".".$name)){
            if(ModelsOptions::where(['name' => $name,'class' => $class])->count()){
                $result = 1;
            }else{
                $result = 0;
            }
            Redis::setex("options:count.".$class.".".$name,600,$result);
        }
        return Redis::get("options:count.".$class.".".$name);

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
