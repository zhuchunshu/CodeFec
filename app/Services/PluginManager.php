<?php

namespace App\Services;

class PluginManager{

    /**
     * 获取所有插件
     *
     * @return array
     */
    public function getAllPlugins(){
        $path = app_path("Plugins");
        $arr = getPath($path);
        $plugin_arr = [];
        foreach ($arr as $value) {
            if(file_exists(app_path("Plugins/".$value."/"."data.json"))){
                $plugin_arr[$value]['path']=app_path("Plugins/".$value."/");
                $plugin_arr[$value]['data']=read_plugin_data($value,false);
                $plugin_arr[$value]['class']= $plugin_arr[$value]['data']['namespace']."\\";
            }
        }
        return $plugin_arr;
    }

}