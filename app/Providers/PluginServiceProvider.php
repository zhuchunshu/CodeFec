<?php

namespace App\Providers;

use App\Models\Plugin;
use Illuminate\Support\Arr;
use Illuminate\Routing\Router;
use App\Services\PluginManager;
use Illuminate\Support\ServiceProvider;

class PluginServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(PluginManager $plugins)
    {
        $bootstrappers = $plugins->getAllPlugins();

        foreach ($bootstrappers as $name => $value) {
            if (read_plugin_md5($name)) {
                if (read_plugin_md5($name) != hashDirectory(plugin_path($name))) {
                    // 插件已启动
                    $this->Trun($name,$value);
                }
            }else{
                // 插件已启动
                $this->Trun($name,$value);
            }
        }
    }

    public function Trun($name,$value){
        // 插件已启动
        if (Plugin::where(['name' => $name, 'status' => 1])->count()) {
            // 实现插件功能
            $this->PluginRun($value);
            // 实现发布资源功能
            $this->publishes([
                $value['path'] . 'resources/assets' => public_path("Plugins/" . $name . "/assets"),
            ]);
            // 实现发布语言包功能
            $this->publishes([
                $value['path'] . 'resources/lang' => resource_path('lang/vendor/' . $name),
            ]);
            // 实现语言包功能
            $this->loadTranslationsFrom($value['path'] . 'resources/translations', $name);
            // 实现视图功能
            $this->loadViewsFrom($value['path'] . 'resources/views', $name);
            // 实现command 
            if (Arr::has($value['data'], 'command') && count($value['data']['command'])) {
                if ($this->app->runningInConsole()) {
                    $this->commands($value['data']['command']);
                }
            }
            // 实现中间件
            if(Arr::has($value['data'],'middleware')){
                $this->RegMiddleware($value['data']['middleware']);
            }
        }
    }

    public function PluginRun($value)
    {
        if (@count($value['data']['boot'])) {
            foreach ($value['data']['boot'] as $dataClass) {
                $c = $value['class'] . $dataClass;
                try {
                    if (method_exists(new $c(), 'handle')) {
                        $this->app->call($value['class'] . $dataClass . "@handle");
                    }
                } catch (\Throwable $th) {
                    logger()->error($th);
                }
            }
        }
    }
    public function RegMiddleware($s)
    {
        foreach ($s as $index => $value) {
            $router = $this->app->make(Router::class);
            $router->aliasMiddleware($index, $value);
        }
    }
}
