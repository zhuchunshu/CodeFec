<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Whole\PostController as WholePostController;
use App\Http\Controllers\Whole\ViewController as WholeViewController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
| 公共路由
|
*/

Route::get('/user/about/{id}.html', [WholeViewController::class, 'user_about'])->name('user.about'); //用户信息
    
    Route::get('/contact', [WholeViewController::class, 'contact'])->name('contact'); //联系我们
    

    // 提交打赏
    Route::post('/dashang', [WholePostController::class, 'dashang_post'])->name('dashang');

    // 用户组
    Route::get('users/group/{ename}', [WholeViewController::class, 'users_group_data'])->name('users.group.data');
    // 用户帖子列表
    Route::get('/users/topic/{username}.html', [WholeViewController::class, 'topic_list'])->name('user.topic.list');
    // 用户评论列表
    Route::get('/users/comment/{username}.html', [WholeViewController::class, 'comment_list'])->name('user.comment.list');

