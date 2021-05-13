<?php

namespace App\Handlers;

use Parsedown;
use App\Models\Node;
use App\Models\User;
use App\Models\Posts_type;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Request;

/**
 * 辅助函数
 */
class HelpersHandlers extends Controller
{
    /**
     * 加载执行代码
     *
     * @param Request $request
     */
    public $request;
    // public function __construct(Request $request)
    // {
    //     $this->request = $request;
    // }
    /**
     * 获取客户端ip
     *
     * @return void
     */
    public function GetClientIp()
    {
        return Request::ip();
    }
    public function markdowntohtml($text)
    {
        $Parsedown = new Parsedown();
        $content = $Parsedown->text($text);
        return clean($content, 'topic');
    }
    //去除P标签
    public function qu_P($text)
    {
        $text = Str::before($text, '</p>');
        return Str::after($text, '<p>');
    }
    // 清理模型缓存
    public function Clear_Models_Cache($model)
    {
        Artisan::call('modelCache:clear', [
            '--model' => $model
        ]);
        return true;
    }
    // 通过id获取节点名
    public function Node_name($id)
    {
        return Node::where('id', $id)->first()['name'];
    }
    public function Node_ename($id)
    {
        return Node::where('id', $id)->first()['ename'];
    }
    // 通过id获取用户名
    public function User_name($id)
    {
        return User::where('id', $id)->first()['username'];
    }
    // 通过id获取用户信息
    public function User_id($id)
    {
        return User::where('id', $id)->first();
    }
    // 通过id获取头像
    public function User_avatar($id)
    {
        $user = User::where('id',$id)->first();
        return user_avatars($user->email,$user->avatar);
    }

    // 通过父节点id获取子节点数量
    public function Node_Zi_Count($id)
    {
        return Node::where('die_id', $id)->count();
    }
    // 通过id判断用户存在
    public function User_cunzai($id)
    {
        if (!User::where('id', $id)->count()) {
            return abort(401);
        }
    }
    // 权限过滤
    public function User_Quanxian_zz($user_id,$quanxian)
    {
        $data = User::where('id',$user_id)->first();
        if (Curd_UserGroup()->Read_id($data['user_group'])['quanxian'] < $quanxian) {
            if (Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'] > Curd_UserGroup()->Read_id($data['user_group'])['quanxian']) {
                $caozuo = true;
            } else {
                $caozuo = false;
            }
        } else {
            $caozuo = false;
        }
        if (!$caozuo) {
            abort(401);
        }
    }
    // 通过id获取标签信息
    public function tags_id($id){
        if(!Posts_type::where('id',$id)->count()){
            return [
                'name' => '已失效标签',
                'ename' => 0,
                'color' => 'red',
            ];
        }
        return Posts_type::where('id',$id)->first();
    }
    // 通过id获取节点信息
    public function node_id($id){
        if(!Node::where('id',$id)->count()){
            return [
                'name' => '已删除节点',
                'ename' => '已删除节点',
                'color' => 'red',
                'icon' => avatar(User::inRandomOrder()->first()['email'])
            ];
        }
        return Node::where('id',$id)->first();
    }
    // create_old_data
    public function create_old_data(array $data){
        foreach ($data as $key => $value) {
            session()->flash($key,$value);
        }
    }
    // 获取用户信息
    public function user_data($id){
        return User::where('id',$id)->first();
    }
}
