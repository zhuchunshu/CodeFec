<?php

namespace App\Http\Controllers\Admin;

use App\Models\Node;
use App\Models\Links;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Posts_type;
use App\Models\Report;
use App\Models\User;
use App\Models\UserGroup;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{
    // 站点设置视图
    public function setting()
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        return view('admin.setting');
    }
    // 管理赞助商视图
    public function zanzhu(Links $links)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $page = $links->where('class', 'zanzhushang')->orderBy('id', 'DESC')->paginate(15);
        return view('admin.links.zanzhu', ['page' => $page]);
    }
    // 友情链接
    public function friend(Links $links)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $page = $links->where('class', 'friend')->orderBy('id', 'DESC')->paginate(15);
        return view('admin.links.friend', ['page' => $page]);
    }
    // 节点 route-admin.node.index
    public function node(Node $node)
    {
        CodeFec_Quanxian(777); //最低访问权限: 版主
        $page = $node->orderBy('id', 'DESC')->paginate(15);
        $all = $node->where('die_id', '=', null)->orderBy('id', 'DESC')->get();
        return view('admin.node.index', ['page' => $page, 'all' => $all]);
    }
    // 编辑节点 route - admin.node.edit
    public function node_edit(Node $node,$id = null)
    {
        if (!$id) {
            // 选择列表视图
            $page = $node->orderBy('id', 'DESC')->paginate(15);
            return view('admin.node.edit_check', ['page' => $page]);
        } else {
            // id必须是数字
            if (!is_numeric($id)) {
                return abort(404);
            }
            //节点不存在
            if (!$node->where('id', $id)->count()) {
                return abort(404);
            }
            $data = $node->where('id', $id)->first();
            if (CodeFec_Quanxian()->_站长() !== true && $data['user_id'] != Auth::id()) {
                return abort(401);
            }
            $page = $node->orderBy('id', 'DESC')->paginate(15);
            $all = $node->where('die_id', '=', null)->orderBy('id', 'DESC')->get();
            return view('admin.node.edit', ['data' => $data, 'page' => $page, 'all' => $all]);
        }
    }
    // 用户列表
    public function users_index(User $user)
    {
        CodeFec_Quanxian(888); //设置访问权限最低为超版
        $page = $user->paginate(15);
        return view('admin.users.index', ['page' => $page]);
    }
    // 编辑用户信息
    public function users_edit($id)
    {
        Helpers()->User_cunzai($id); //用户过滤
        Helpers()->User_Quanxian_zz($id, 999); //权限过滤
        $data = User::where('id', $id)->first();
        $user_group = UserGroup::where('quanxian', '<', Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'])->get();
        return view('admin.users.edit', ['data' => $data, 'user_group' => $user_group]);
    }
    // 用户组
    public function users_group(UserGroup $group)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $page = $group->paginate(15);
        return view('admin.users.group', ['page' => $page]);
    }
    // 新增节点标签
    public function node_tags(Posts_type $pt)
    {
        CodeFec_Quanxian(777);
        $page = $pt->paginate(15);
        return view('admin.node.tags',['page' => $page]);
    }
    // 用户举报内容
    public function report_show(Report $report){
        CodeFec_Quanxian(777);
        $page = $report
        ->orderBy('created_at','desc')
        ->paginate(15);
        return view('admin.ot.report',['page' => $page]);
    }
    public function user_see_log($user_id){
        Helpers()->User_cunzai($user_id); //用户过滤
        Helpers()->User_Quanxian_zz($user_id, 999); //权限过滤
        $page = Curd_UserLog()->get_page_id($user_id);
        $user_data = User::where('id',$user_id)->first();
        return view('admin.users.see.log',['page'=>$page,'user_data'=>$user_data]);
    }
    // 修改用户组
    public function users_group_edit($id,UserGroup $userGroup){
        CodeFec_Quanxian(999);
        if(!$userGroup->where('id',$id)->count()){
            return abort(404);
        }
        $data = $userGroup->where('id',$id)->first();
        return view('admin.users.edit_group',['data' => $data]);
    }
}
