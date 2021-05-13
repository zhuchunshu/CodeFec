<?php

use App\Models\User;
use App\Models\Dengji_log;
use App\Models\User_Notice;
use Illuminate\Support\Str;
use App\Models\User_Options;
use Illuminate\Support\Facades\Auth;
use App\Notifications\User\SendNotice;
use Illuminate\Support\Facades\Notification;

// 用户等级制度
function user_dengji($jingyan){
    // 1级
    if($jingyan>=0 && $jingyan<=10){
        return 1;
    }
    // 2级
    if($jingyan>10 && $jingyan<=1000){
        return 2;
    }
    // 3级
    if($jingyan>1000 && $jingyan<=2500){
        return 3;
    }
    // 4级
    if($jingyan>2500 && $jingyan<=7000){
        return 4;
    }
    // 5级
    if($jingyan>7000 && $jingyan<=15000){
        return 5;
    }
    // 6级
    if($jingyan>15000 && $jingyan<=30000){
        return 6;
    }
    // 7级
    if($jingyan>30000 && $jingyan<=70000){
        return 7;
    }
    // 满级
    if($jingyan>70000){
        return "MAX";
    }
}

// 用户等级制度 - 显示
function user_dengji_show($jingyan){
    // 1级
    if($jingyan>=0 && $jingyan<=10){
        return '<span class="badge bg-azure-lt">1级</span>';
    }
    // 2级
    if($jingyan>10 && $jingyan<=1000){
        return '<span class="badge bg-indigo-lt">2级</span>';
    }
    // 3级
    if($jingyan>1000 && $jingyan<=2500){
        return '<span class="badge bg-purple-lt">3级</span>';
    }
    // 4级
    if($jingyan>2500 && $jingyan<=7000){
        return '<span class="badge bg-cyan-lt">4级</span>';
    }
    // 5级
    if($jingyan>7000 && $jingyan<=15000){
        return '<span class="badge bg-teal-lt">5级</span>';
    }
    // 6级
    if($jingyan>15000 && $jingyan<=30000){
        return '<span class="badge bg-orange-lt">6级</span>';
    }
    // 7级
    if($jingyan>30000 && $jingyan<=70000){
        return '<span class="badge bg-orange">7级</span>';
    }
    // 满级
    if($jingyan>70000){
        return '<span class="badge bg-pink">MAX</span>';
    }
}

// 用户加经验
function user_add_jingyan(int $user_id,int $value,$yuanyin=null){
    if(User::where('id',$user_id)->count()){
        $jingyan = User::where('id',$user_id)->first()['lv'];
        User::where('id',$user_id)->update([
            'lv' => $jingyan+$value
        ]);
        Dengji_log::insert([
            'user_id' => $user_id,
            'num' => $value,
            'value' => $yuanyin,
            'created_at' => date("Y-m-d H:i:s")
        ]);
    }else{
        return false;
    }
}

// 用户设置选项
function user_options($user_id,$name,$value=null){
    if(User_Options::where(['user_id'=>$user_id,'name'=>$name])->count()){
        return User_Options::where(['user_id'=>$user_id,'name'=>$name])->first()['value'];
    }else{
        return $value;
    }
}

function user_value_options($name,$value){
    if(User_Options::where(['value'=>$value,'name'=>$name])->count()){
        return User_Options::where(['value'=>$value,'name'=>$name])->first()['user_id'];
    }else{
        return null;
    }
}

function user_add_options($user_id,$name,$value=null){
    if(User_Options::where(['user_id'=>$user_id,'name'=>$name])->count()){
        
    if(!$value){
        // 删除
        User_Options::where(['user_id'=>$user_id,'name'=>$name])->delete();
        return true;
    }else{
        // 更新
        User_Options::where(['user_id'=>$user_id,'name'=>$name])->update([
            'value' => $value
        ]);
        return true;
    }

    }else{
        if($value){
            User_Options::insert([
                'user_id' => $user_id,
                'name' => $name,
                'value' => $value,
                'created_at' => date("Y-m-d H:i:s")
            ]);
            return true;
        }
    }
}

function count_user_options($user_id,$name){
    return User_Options::where([
        'user_id' => $user_id,
        'name' => $name
    ])->count();
}

// 发送通知
function user_notice_send($user_id,$content,$title=null,$url=null,$form_id=null){
    $user = new User();
    if($user->where('id',$user_id)->count()){
        $id = User_Notice::insertGetId([
            'user_id' => $user_id,
            'content' => $content,
            'form_id' => $form_id,
            'title' => $title,
            'url' => $url
        ]);
        if($id){
            if(!count_user_options($user_id,'email_notice')){
                // 如果开启邮件通知
                $data = [
                    'title' => $title,
                    'description' => Str::limit(descriptions($content), 50, '...'),
                    'url' => route('users.my.notice.to',['url' => base64_encode($url),'id'=>$id]),
                    'created_at' => date("Y-m-d H:i:s")
                ];
                $users = $user->where('id',$user_id)->first();
                Notification::send($users, new SendNotice($data));
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function user_my_notice_count(){
    if(Auth::id()){
        return User_Notice::where(['user_id'=>Auth::id(),'zhuangtai' => '未查看'])->count();
    }else{
        return false;
    }
}
function user_my_notice_get($num=5){
    if(Auth::id()){
        return User_Notice::where(['user_id'=>Auth::id(),'zhuangtai' => '未查看'])->take($num)->get();
    }else{
        return false;
    }
}

// 打赏
function user_dashang($user_id){
    if(user_options($user_id, 'user_dashang')){
        // 开启打赏
        if(is_array($arr = explode("\n",User::where('id',$user_id)->first()['dashang']))){
            $data = [];
            foreach ($arr as $value) {
                if(is_array($a = explode("|",$value))){
                    if(@$a[0] && @$a[1]){
                        $data[$a[0]] = $a[1];
                    }
                }
            }
            if(count($data)){
                return $data;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }else{
        return null;
    }
}

function user_show_github($user_id){
    // 判断用户是否已绑定GitHub
    if (User::where([['id', $user_id], ['auth_github', '=', null]])->count()) {
        return false;
    }
    return true;
}