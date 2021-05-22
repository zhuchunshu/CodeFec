<?php

use App\Models\Plugin;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;


function _cf($data = null, $default = null)
{
    if ($data) {
        return $data;
    } else {
        return $default;
    }
}
/**
 * 获取插件信息
 *
 * @param string $name
 * @return object
 */
function get_plugin_data($name)
{
    if (file_exists(app_path("Plugins/" . $name . "/" . "data.json"))) {
        return json_decode(@read_file(app_path("Plugins/" . $name . "/" . "data.json")));
    } else {
        return null;
    }
}

function get_plugin_status($name)
{
    if (Plugin::where(['name' => $name, 'status' => 1])->count()) {
        return true;
    } else {
        return false;
    }
}
/**
 * 获取插件路径
 *
 * @param string 插件文件夹名 $name
 */
function plugin_path($name)
{
    return app_path("Plugins/" . $name);
}
/**
 * 获取插件资源路径
 *
 * @param string 插件目录名 $name
 * @param string 文件路径 $file
 */
function plugin_asset_path($name, $file)
{
    return "/Plugins/" . $name . "/assets/" . $file;
}
/**
 * 获取插件资源网址
 *
 * @param string 插件目录名 $name
 * @param string 文件路径 $file
 * @return void
 */
function plugin_asset($name, $file)
{
    return asset("/Plugins/" . $name . "/assets/" . $file);
}

/**
 * 获取插件资源网址
 *
 * @param string 插件目录名 $name
 * @param string 文件路径 $file
 * @return void
 */
function plugin_asset_asset($name, $file)
{
    return asset("/Plugins/" . $name . "/assets/" . $file);
}

/**
 * 读取插件.md5文件
 *
 * @param string $name
 * @return string
 */
function read_plugin_md5(string $name)
{
    if (File::exists(plugin_path($name . "/.md5"))) {
        if (read_file(plugin_path($name . "/.md5"))) {
            return read_file(plugin_path($name . "/.md5"));
        } else {
            return null;
        }
    }
}

/**
 * 读取插件data.json文件
 *
 * @param string 插件目录名 $name
 */
function read_plugin_data(string $name, $bool = true)
{
    if ($bool === true) {
        return json_decode(@read_file(plugin_path($name . "/data.json")));
    } else {
        return json_decode(@read_file(plugin_path($name . "/data.json")), true);
    }
}


if (!function_exists('user_admin_config')) {
    function user_admin_config($key = null, $value = null)
    {
        $session = session();
        if (!$config = $session->get('admin.config')) {
            $config = config('admin');
            $config['lang'] = config('app.locale');
        }

        if (is_array($key)) {
            // 保存
            foreach ($key as $k => $v) {
                Arr::set($config, $k, $v);
            }
            $session->put('admin.config', $config);
            return;
        }

        if ($key === null) {
            return $config;
        }

        return Arr::get($config, $key, $value);
    }
}
