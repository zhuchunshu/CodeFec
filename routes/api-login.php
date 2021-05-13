<?php

use App\Http\Controllers\Api\Admin\ExtendController;
use App\Http\Controllers\Api\EditorController;
use App\Http\Controllers\Api\Posts\TopicController;
use App\Http\Controllers\Api\Users\CollectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('topic')->name('topic.')->group(function () {
    // 点赞帖子
    Route::post('/like', [TopicController::class, 'like'])->name('like');
    // 点赞评论
    Route::post('/comment/like', [TopicController::class, 'comment_like'])->name('comment.like');
    // 回复评论
    Route::post('/comment/reply', [TopicController::class, 'comment_reply'])->name('comment.reply');
    // 删除回复
    Route::post('/comment/reply/delete', [TopicController::class, 'comment_reply_delete'])->name('comment.reply.delete');
    // 删除评论
    Route::post('/comment/delete', [TopicController::class, 'comment_delete'])->name('comment.delete');
    // 采纳评论
    Route::post('/comment/caina', [TopicController::class, 'comment_caina'])->name('comment.caina');
});

// 编辑器
Route::prefix('editor')->name('editor.')->group(function () {
    // 表情
    Route::post('/biaoqing', [EditorController::class, 'biaoqing'])->name('biaoqing');
});

Route::prefix('admin')->name('admin.')->group(function () {

    // 插件管理
    Route::prefix('extend')->name('extend.')->group(function () {
        // 启用 or 禁用插件
        Route::post('/active', [ExtendController::class, 'active'])->name('active');
    });
});

// 收藏

Route::prefix('collections')->name('collections.')->group(function(){
    Route::post('/get/all', [CollectionController::class,'get_all'])->name('get.all');
});