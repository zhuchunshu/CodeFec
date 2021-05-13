<?php

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Dcat\Admin\Admin;

Admin::routes();

Route::group([
    'prefix'     => config('admin.route.prefix'),
    'namespace'  => config('admin.route.namespace'),
    'middleware' => config('admin.route.middleware'),
], function () {
    Route::get('/auth/extensions', function () {
        abort(404);
    });
});

Route::group([
    'prefix'     => config('admin.route.prefix'),
    'namespace'  => config('admin.route.namespace'),
    'middleware' => config('admin.route.middleware'),
], function (Router $router) {

    $router->group(['prefix' => 'Plugin'],function(Router $router){
        $router->get('/','PluginController@index');
        $router->get('/create','PluginController@create');
        $router->put('/{name}','PluginController@update');
        $router->post('/{name}','PluginController@update');
        $router->post('/','PluginController@store');
    });

    $router->get('/', 'HomeController@index');

});
