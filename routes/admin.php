<?php

use App\Http\Controllers\Admin\CoreController;
use App\Http\Controllers\Admin\ExtendController;
use App\Http\Controllers\Admin\Invitation;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\SettingPro;
use App\Http\Controllers\Admin\ViewController as AdminViewController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// 设置
Route::get('/setting', [AdminViewController::class,'setting'])->name('setting'); //站点设置
Route::get('/', function(){
    return redirect(admin_url());
})->name('gadmin'); //站点设置
Route::post('/setting/save', [PostController::class,'setting_save'])->name('setting.save'); //保存站点设置


// 节点
Route::prefix('node')->name('node.')->group(function(){
    Route::get('/', [AdminViewController::class,'node'])->name('index'); // 节点首页视图
    Route::get('/edit/{id?}', [AdminViewController::class,'node_edit'])->name('edit'); // 节点首页视图
    Route::post('/save', [PostController::class,'node_save'])->name('save'); //新增节点请求处理
    Route::post('/edit', [PostController::class,'node_edit_post'])->name('edit.post'); //新增节点请求处理
    Route::post('/delete', [PostController::class,'node_delete_post'])->name('delete.post'); //新增节点请求处理

    Route::get('/tags', [AdminViewController::class,'node_tags'])->name('tags'); //新增节点标签
    Route::post('/tags/save', [PostController::class,'node_tags_save'])->name('tags.save'); //新增节点标签 - 提交
    Route::post('/tags/delete', [PostController::class,'node_tags_delete'])->name('tags.delete'); //删除节点标签 - 提交
});

// 用户
Route::prefix('users')->name('users.')->group(function(){
    // 用户
    Route::get('/edit/{id}', [AdminViewController::class,'users_edit'])->name('edit');
    Route::post('/post/fengjin', [PostController::class,'user_fengjin'])->name('fengjin');
    Route::post('/post/jiefeng', [PostController::class,'user_jiefeng'])->name('jiefeng');
    Route::post('/post/edit', [PostController::class,'user_edit_save'])->name('edit.save');

    //用户组
    Route::get('/group', [AdminViewController::class,'users_group'])->name('group');
    // 修改用户组
    Route::get('/group/edit/{id}', [AdminViewController::class,'users_group_edit'])->name('group.edit');
    Route::post('/group/edit/post', [PostController::class,'users_group_edit_post'])->name('group.edit.post');
    Route::post('/group/save', [PostController::class,'users_group_save'])->name('group.save');
    Route::post('/group/delete', [PostController::class,'users_group_delete'])->name('group.delete');

    // 用户操作日志
    Route::get('/see/log/{user_id}', [AdminViewController::class,'user_see_log'])->name('see.log');
});

// 帖子
Route::prefix('topic')->name('topic.')->group(function(){

    // 管理员修改帖子
    Route::post('/edit/save', [PostController::class,'topic_edit_save'])->name('edit.save.post');

});

// // 管理举报帖子
// Route::get('/posts/report', [AdminViewController::class,'report_show'])->name('posts.report');

// // 处理举报帖子
// Route::post('/posts/report', [PostController::class,'report_post'])->name('posts.report.post');

// 插件
// Route::prefix("/extend")->name('extend.')->group(function(){
//     // 插件中心
//     Route::get('/', [ExtendController::class,'index'])->name('index');
// });

// 邀请管理
Route::prefix('invitation')->name('invitation.')->group(function(){
    // 首页
    Route::get('/', [Invitation::class,'index'])->name('index');
    // 生成邀请码
    Route::post('/create', [Invitation::class,'create'])->name('create');
    // 处理邀请码
    Route::post('/chuli', [Invitation::class,'chuli'])->name('chuli');
});

// 高级设置
Route::prefix('settingPro')->name('setting.pro.')->group(function(){
    // 首页
    Route::get('/', [SettingPro::class,'index'])->name('index');
    // 图片
    Route::get('/image', [SettingPro::class,'image'])->name('image');
    // 图片 保存
    Route::post('/image', [SettingPro::class,'image_save'])->name('image.save');
});

Route::prefix('auth')->name('auth.')->group(function(){
    Route::get('/', [CoreController::class,'index'])->name('index');
    Route::post('/ver', [CoreController::class,'ver_post'])->name('post');
});