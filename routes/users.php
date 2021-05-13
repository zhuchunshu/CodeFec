<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\PostController;
use App\Http\Controllers\Users\ViewController;
use App\Http\Controllers\Users\CollectionController;

/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
| 用户路由
|
*/

Route::get('/', [ViewController::class, 'index'])->name('index'); //用户中心
Route::get('/log', [ViewController::class, 'log'])->name('log'); //操作日志
Route::get('/setting', [ViewController::class, 'setting'])->name('setting'); //个人设置页面

Route::get('/setting/geren', [ViewController::class, 'setting_geren'])->name('setting.geren'); //个人设置页面
Route::get('/setting/kaiguan', [ViewController::class, 'setting_kaiguan'])->name('setting.kaiguan'); //个人设置页面
// 设置头像
Route::get('/setting/avatar', [ViewController::class, 'setting_avatar'])->name('setting.avatar');
// 打赏作者
Route::get('/setting/dashang', [ViewController::class, 'setting_dashang'])->name('setting.dashang');
// 保存头像
Route::post('/setting/dashang/save', [PostController::class, 'setting_dashang_save'])->name('setting.dashang.save');

// 保存头像
Route::post('/setting/avatar/save', [PostController::class, 'setting_avatar_save'])->name('setting.avatar.save');

Route::post('/setting/save', [PostController::class, 'setting_save'])->name('setting.save'); //保存设置
Route::post('/setting/options/save', [PostController::class, 'setting_options_save'])->name('setting.options.save'); //保存开关设置
// 我的举报
Route::get('/my/report', [ViewController::class, 'my_report'])->name('my.report');
// 经验变更记录
Route::get('/lv/log', [ViewController::class, 'lv_log'])->name('lv.log');
// 查看通知
Route::get('/my/notice', [ViewController::class, 'my_notice'])->name('my.notice');
Route::get('/my/notice/to/{url}/{id}', [ViewController::class, 'my_notice_to'])->name('my.notice.to');
Route::post('/my/notice/du', [PostController::class, 'my_notice_du'])->name('my.notice.du');

// 查看收藏
Route::get('/my/collections', [ViewController::class,'collections_data'])->name('my.collections');
// 绑定github
Route::get('/auth:github/go/{token}/{id}', [AuthController::class,'go_github'])->name('auth.github.go');
// GitHub回复
Route::get('/auth:github/re/{token}/{id}', [AuthController::class,'re_github'])->name('auth.github.re');
// Github响应数据
Route::any('/auth:github/any/{token}/{id}', [AuthController::class,'any_github'])->name('auth.github.any');
// 收藏
Route::prefix('collections')->name('collections.')->group(function(){
    // 创建收藏夹
    Route::post('create:class', [CollectionController::class,'create_class'])->name('create.class');
    // 删除收藏内容
    Route::post('delete', [CollectionController::class,'delete'])->name('delete');
    // 删除收藏夹
    Route::post('delete/class', [CollectionController::class,'delete_class'])->name('delete.class');
});