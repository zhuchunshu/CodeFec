<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PostsComment;
use App\Models\Topic;

class HomeController extends Controller
{
    public function search(Request $request){
        $q = $request->input('q',null); // 搜索内容
        if($q){
            return Api_Json(403,'error','搜索内容为空');
        }
        $user = User::where('username','like','%'.$q.'%')->paginate(10);
        $qianming = User::where('qianming','like','%'.$q.'%')->paginate(10);
        $title = Topic::where('title','like','%'.$q.'%')->paginate(10);
        $content = Topic::where('content','like','%'.$q.'%')->paginate(10);
        $comment = PostsComment::where('content','like','%'.$q.'%')->paginate(10);
        return [
            'user' => [
                'username' => $user,
                'qianming' => $qianming
            ],
            'topic' => [
                'title' => $title,
                'content' => $content
            ],
            'comment' => [
                'content' => $comment
            ]
        ];
    }
}
