<?php

namespace App\Http\Controllers\Users;

use App\Models\User;
use App\Models\Report;
use App\Http\Controllers\Controller;
use App\Models\Dengji_log;
use App\Models\User_Notice;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{
    /**
     * 用户中心 - 首页
     *
     * @return void
     */
    public function index(){
        return redirect()->route('index');
    }
    /**
     * 用户中心 - 设置
     *
     * @return void
     */
    public function setting(){
        $data = User::where('id',Auth::id())->first();
        $view = "client.users.setting.jiben";
        $btn = false;
        $post = null;
        return view('client.users.setting',['data'=>$data,'view' => $view,'btn' => $btn,'post' => $post]);
    }
    public function setting_geren(){
        $data = User::where('id',Auth::id())->first();
        $view = "client.users.setting.geren";
        $btn = true;
        $post = route('users.setting.save');
        return view('client.users.setting',['data'=>$data,'view' => $view,'btn' => $btn,'post' => $post]);
    }
    // 头像设置
    public function setting_avatar(){
        $data = User::where('id',Auth::id())->first();
        $view = "client.users.setting.avatar";
        $btn = true;
        $post = route('users.setting.avatar.save');
        return view('client.users.setting',['data'=>$data,'view' => $view,'btn' => $btn,'post' => $post]);
    }
    /**
     * 用户操作日志
     *
     * @return void
     */
    public function log(){
        $page = Curd_UserLog()->get_page_id(Auth::id());
        return view('client.users.log',['page'=>$page]);
    }
    // 经验变化记录
    public function lv_log(Dengji_log $log){
        $page = $log->where(['user_id' => Auth::id()])
        ->orderBy('created_at','desc')
        ->paginate(15);
        return view('client.users.my.dengjilog',['page' => $page]);
    }
    // 收到的通知
    public function my_notice(User_Notice $un){
        $page = $un->where(['user_id'=>Auth::id(),'zhuangtai' => '未查看'])
        ->orderBy('created_at','desc')
        ->orderBy('id','desc')
        ->paginate(15);
        return view('client.users.my.notice',['page' => $page]);
    }
    // 查看通知
    public function my_notice_to($url,$id,User_Notice $un){
        $url = base64_decode($url);
        if($un->where(['id' => $id,'user_id' => Auth::id()])->count()){
            $del = $un->where(['id' => $id,'user_id' => Auth::id()])->delete();
            if($del){
                Curd_UserLog()->Insert("查看ID为:".$id."的通知,并标记为已读", Auth::user()->id);
            }
        }
        return redirect($url);
    }
}
