<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NodeController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Users\AuthController;
use App\Http\Controllers\Users\PostController;
use App\Http\Controllers\Posts\TopicController;
use App\Http\Controllers\Users\CollectionController;

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


Route::get('/', [HomeController::class, 'index'])->name('index'); //首页视图
Route::get('/nodes/{ename}.html', [HomeController::class, 'index'])->name('node'); //节点文章
Route::get('/tags/{ename}.html', [HomeController::class, 'tags'])->name('tags'); //标签文章

Auth::routes(['verify' => true]);

//节点
Route::prefix('node')->name('node.')->group(function () {
    Route::get('/{ename}.html', [NodeController::class, 'data'])->name('data'); // 节点信息
    Route::get('/', [NodeController::class, 'index'])->name('index'); // 全部节点
});


// 必须登录
Route::middleware('auth')->group(function () {
    // 创建帖子
    Route::get('topics/create', [TopicController::class, 'create'])->name('create.topic');
    // 帖子草稿
    Route::get('topics/draft', [TopicController::class, 'draft'])->name('topic.draft');
    // 编辑草稿
    Route::get('topics/draft/{id}', [TopicController::class, 'draft_edit'])->name('create.draft');
    // 上传图片
    Route::post('/upload/image', [PostController::class, 'up_image'])->name('create.upimage');
    Route::post('/upload/reply', [PostController::class, 'reply_image'])->name('reply.upimage');
    // 提交创建帖子
    Route::post('/topic/create', [TopicController::class, 'create_post'])->name('create.topic.post');
    // 草稿提交
    Route::post('/topic/draft', [TopicController::class, 'draft_post'])->name('create.draft.post');
    // 编辑文章
    Route::get('/topic/edit/{id}', [TopicController::class, 'edit'])->name('topic.edit');
    // 提交编辑
    Route::post('/topic/edit/save', [TopicController::class, 'edit_save'])->name('topic.edit.save.post');
    // 帖子评论
    Route::post('/topic/comment', [TopicController::class, 'topic_comment'])->name('topic.comment.post');
});

// 筛选
Route::prefix('t')->name('t.')->group(function () {
    Route::get('upd', [HomeController::class, 't_update'])->name('update'); //最近更新
    Route::get('hot', [HomeController::class, 't_hot'])->name('hot'); //热门帖子
    Route::get('essence', [HomeController::class, 't_essence'])->name('essence'); //精华帖子
});


// 文章视图

//显示文章
Route::get('/{id}.html', [TopicController::class, 'show'])->name('topic.show');

// 展示评论信息
Route::get('/topic/comment/{id}.html', [TopicController::class, 'comment_show'])->name('topic.comment.show');

// 显示文章md
Route::get('/{id}.md', [TopicController::class, 'show_md'])->name('topic.show.md');

// 显示评论md
Route::get('/comment/{id}.md', [TopicController::class, 'comment_show_md'])->name('topic.comment.show.md');

// 搜索
Route::get('/search', [HomeController::class, 'search'])->name('search');


// 客户端操作
Route::prefix('client/action')->name('client.action.')->group(function () {
    // 主题模式切换
    Route::get('theme/qiehuan', [ClientController::class, 'theme_qiehuan'])->name('theme_qiehuan');
});

// Github登录
Route::get('/auth:login/github', [AuthController::class,'login_github'])->name('auth.login.github');
Route::get('/auth:login/github:re', [AuthController::class,'login_github_re'])->name('auth.login.github.re');
