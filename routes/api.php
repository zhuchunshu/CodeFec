<?php

use App\Http\Controllers\Api\Open\TopicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("topic/comment")->name("topic.comment.")->group(function(){
    // 帖子评论列表
    Route::post('{topic_id}/list', [TopicController::class,'topic_list'])->name("list");
});