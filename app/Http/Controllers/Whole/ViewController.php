<?php

namespace App\Http\Controllers\Whole;

use App\Models\User;
use App\Models\Links;
use App\Models\Topic;
use App\Models\UserGroup;
use App\Http\Controllers\Controller;
use App\Models\PostsComment;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{
    /**
     * 用户信息页面
     *
     * @param integer $id 用户id
     * @return void
     */
    public function user_about(int $id)
    {
        $data = User::where('id', $id)->first();
        if (Curd_UserGroup()->Read_id($data['user_group'])['quanxian'] < 999) {
            if (Auth::id() && Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'] > Curd_UserGroup()->Read_id($data['user_group'])['quanxian']) {
                $caozuo = true;
            } else {
                $caozuo = false;
            }
        } else {
            $caozuo = false;
        }
        return view('client.whole.user.about', ['data' => $data, 'caozuo' => $caozuo]);
    }
    /**
     * 联系我们
     *
     * @return void
     */
    public function contact()
    {
        return view('client.whole.contact');
    }
    
    // 用户组信息
    public function users_group_data($ename)
    {
        if (!UserGroup::where('ename', $ename)->count()) {
            return abort(404);
        }
        $data = UserGroup::where('ename', $ename)->first();
        $user_count = User::where('user_group', $data['id'])->count();
        $user_page = User::where('user_group', $data['id'])->paginate(16);
        return view('client.whole.user.group_data', ['data' => $data, 'user_count' => $user_count, 'user_page' => $user_page]);
    }
    
    // 用户帖子列表
    public function topic_list($username,User $user,Topic $topic){
        if($user->where('username',$username)->count()){
            $user_data = $user->where('username',$username)->first();
        }else{
            return abort(404);
        }
        $page = $topic
        ->where(['user_id' => $user_data->id,'publish' => '发布'])
        ->orderBy('created_at','desc')
        ->paginate(15);
        return view('client.whole.user.topic_list',compact('page','user_data'));
    }
    // 用户评论列表
    public function comment_list($username,User $user,PostsComment $postsComment){
        if($user->where('username',$username)->count()){
            $user_data = $user->where('username',$username)->first();
        }else{
            return abort(404);
        }
        $page = $postsComment->where('user_id',$user_data->id)
        ->orderBy('created_at','desc')
        ->paginate(15);
        return view('client.whole.user.comment_list',compact('user_data','page'));

    }
}
