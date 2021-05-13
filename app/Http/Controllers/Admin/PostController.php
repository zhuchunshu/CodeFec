<?php

namespace App\Http\Controllers\Admin;

use App\Models\Node;
use App\Models\User;
use App\Models\Links;
use App\Models\Topic;
use App\Models\Report;
use App\Models\UserGroup;
use App\Models\Posts_type;
use Illuminate\Http\Request;
use App\Handlers\ImageUploadHandler;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Jobs\Admin\Users\GroupDelete;
use App\Http\Requests\Admin\Topic\EditSave;
use App\Http\Requests\Admin\Node\AddRequest;
use App\Http\Requests\Admin\Links\ZanzhuSave;
use App\Http\Requests\Admin\Node\EditRequest;
use App\Http\Requests\Admin\Node\AddPostsType;
use App\Http\Requests\Admin\Links\FriendRequest;
use App\Http\Requests\Admin\Users\EditUserGroup;
use App\Http\Requests\Admin\Users\GroupSaveRequest;

class PostController extends Controller
{
    /**
     * 保存站点设置
     *
     * @param Request $request
     * @return void
     */
    public function setting_save(Request $request)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $data = $request->all();
        foreach ($data as $key => $value) {
            if (Curd_Options()->Count_name($key, 'setting')) {
                // 如果存在则更新
                if ($key != "_token") {
                    Curd_Options()->Update_name($key, $value, 'setting');
                }
            } else {
                // 如果不存在则新增
                if ($key != "_token") {
                    $in = Curd_Options()->Insert($key, $value, 'setting', Auth::id());
                    if (!$in) {
                        session()->flash('danger', $key . ':创建失败');
                        return redirect()->back();
                    }
                }
            }
        }
        Curd_UserLog()->Insert("更新站点信息", Auth::user()->id);
        session()->flash('success', '更新成功');
        return redirect()->back();
    }
    /**
     * 新增赞助商
     *
     * @return void
     */
    public function zanzhu_save(ZanzhuSave $request, ImageUploadHandler $uploader, Links $links)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $data = $request->input();
        $result = $uploader->save($request->logo, 'logo', Auth::id());
        if ($result) {
            $logo = $result['path'];
            $description = $data['description'];
            $id = $links->insertGetId([
                'name' => $data['name'],
                'logo' => $logo,
                'url' => $data['url'],
                'description' => $description,
                'class' => 'zanzhushang',
                'created_at' => date("Y-m-d H:i:s")
            ]);
            if ($id) {
                session()->flash('success', '新增赞助商成功!');
                Curd_UserLog()->Insert("新增赞助商", Auth::user()->id);
            } else {
                session()->flash('danger', '赞助商新增失败!');
            }
            return redirect()->back();
        } else {
            session()->flash('danger', 'logo上传失败!');
            return redirect()->back();
        }
    }
    // 删除赞助商
    public function zanzhu_delete(Request $request, Links $links)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $data = $request->all();
        if (is_numeric($data['id'])) {
            $zanzhushang = [];
            $zanzhushang['count'] = $links->where(['id' => $data['id'], 'class' => 'zanzhushang'])->count();
            if ($zanzhushang['count']) {
                $zanzhushang['data'] = $links->where(['id' => $data['id'], 'class' => 'zanzhushang'])->first();
                $del = $links->where(['id' => $data['id'], 'class' => 'zanzhushang'])->delete();
                if ($del) {
                    Curd_UserLog()->Insert("删除赞助商:" . $zanzhushang['data']['name'], Auth::user()->id);
                    session()->flash('success', '赞助商删除成功!');
                } else {
                    session()->flash('danger', '赞助商删除失败!');
                }
            } else {
                session()->flash('danger', '未找到赞助商信息');
            }
        } else {
            session()->flash('danger', '赞助商删除失败!');
        }
        return redirect()->route('public.zanzhu');
    }
    // 新增友情链接
    public function friend_save(FriendRequest $request, Links $links, ImageUploadHandler $uploader)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $data = $request->input();
        $result = $uploader->save($request->logo, 'logo', Auth::id());
        if ($result) {
            $logo = $result['path'];
            $description = $data['description'];
            $id = $links->insertGetId([
                'name' => $data['name'],
                'logo' => $logo,
                'url' => $data['url'],
                'description' => $description,
                'class' => 'friend',
                'created_at' => date("Y-m-d H:i:s")
            ]);
            if ($id) {
                session()->flash('success', '新增友链成功!');
                Curd_UserLog()->Insert("新增友链:" . $data['name'], Auth::user()->id);
            } else {
                session()->flash('danger', '友链新增失败!');
            }
            return redirect()->back();
        } else {
            session()->flash('danger', 'logo上传失败!');
            return redirect()->back();
        }
    }
    // 删除友链
    public function friend_delete(Request $request, Links $links)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $data = $request->all();
        if (is_numeric($data['id'])) {
            $friend = [];
            $friend['count'] = $links->where(['id' => $data['id'], 'class' => 'friend'])->count();
            if ($friend['count']) {
                $friend['data'] = $links->where(['id' => $data['id'], 'class' => 'friend'])->first();
                $del = $links->where(['id' => $data['id'], 'class' => 'friend'])->delete();
                if ($del) {
                    Curd_UserLog()->Insert("删除友情链接:" . $friend['data']['name'], Auth::user()->id);
                    session()->flash('success', '友情链接删除成功!');
                } else {
                    session()->flash('danger', '友情链接删除失败!');
                }
            } else {
                session()->flash('danger', '未找到友情链接信息');
            }
        } else {
            session()->flash('danger', '友情链接删除失败!');
        }
        return redirect()->route('public.friend');
    }
    // 新增节点
    public function node_save(AddRequest $request, ImageUploadHandler $uploader, Node $Node)
    {
        $data = $request->input();
        $result = $uploader->save($request->icon, 'icon', Auth::id());
        if ($result) {

            //icon 图标
            $icon = $result['path'];

            //简介
            $description = $data['description'];

            //父级id
            if ($data['die_id'] != 0) {
                $die_id = $data['die_id'];
                if (!$Node->where([['id', $die_id], ['die_id', '=', null]])->count()) {
                    session()->flash('danger', '创建失败,id为:' . $die_id . "的节点不存在");
                    return redirect()->back();
                }
            } else {
                $die_id = null;
            }

            $id = $Node->insertGetId([
                'name' => $data['name'],
                'ename' => $data['ename'],
                'color' => $data['color'],
                'icon' => $icon,
                'die_id' => $die_id,
                'quanxian' => $data['quanxian'],
                'description' => $description,
                'user_id' => Auth::id(),
                'created_at' => date("Y-m-d H:i:s")
            ]);
            if ($id) {
                // 创建成功
                Curd_UserLog()->Insert("创建节点:" . $data['name'] . ",ID为:" . $id, Auth::user()->id);
                session()->flash('success', '节点创建成功!');
            } else {
                // 创建失败
                session()->flash('danger', '节点创建失败');
            }
            return redirect()->back();
        } else {
            session()->flash('danger', 'logo上传失败!');
            return redirect()->back();
        }
    }
    // 提交修改节点
    public function node_edit_post(EditRequest $request, Node $node, ImageUploadHandler $uploader)
    {
        $post = $request->all();
        $data = $node->where('id', $post['id'])->first();
        // 权限验证
        if (CodeFec_Quanxian()->_站长() !== true && $data['user_id'] != Auth::id()) {
            return abort(401);
        }
        // 如果节点名被占用且与原来不同
        if ($node->where('name', $post['name'])->count() && $post['name'] != $data['name']) {
            session()->flash('danger', '节点名称被占用!');
            return redirect()->back();
        }
        // 如果节点英文名被占用且与原来不同
        if ($node->where('ename', $post['ename'])->count() && $post['ename'] != $data['ename']) {
            session()->flash('danger', '节点英文名称被占用!');
            return redirect()->back();
        }

        //设置icon
        if (@!$post['icon']) {
            $icon = $data['icon'];
        } else {
            $result = $uploader->save($request->icon, 'icon', Auth::id());
            if ($result) {
                $icon = $result['path'];
            } else {
                $icon = $data['icon'];
                session()->flash('danger', 'icon上传失败!');
                return redirect()->back();
            }
        }
        //简介
        $description = $post['description'];

        //父级id
        if ($post['die_id'] != 0) {
            $die_id = $post['die_id'];
            if (!$node->where([['id', $die_id], ['die_id', '=', null]])) {
                session()->flash('danger', '更新失败,id为:' . $die_id . "的父级节点不存在");
                return redirect()->back();
            }
        } else {
            $die_id = null;
        }
        $node->where('id', $data['id'])->update([
            'name' => $post['name'],
            'ename' => $post['ename'],
            'icon' => $icon,
            'quanxian' => $post['quanxian'],
            'color' => $post['color'],
            'description' => $description,
            'die_id' => $die_id
        ]);
        Curd_UserLog()->Insert("更新节点:" . $data['name'] . ",ID为:" . $data['id'], Auth::user()->id);
        session()->flash('success', '更新成功!');
        return redirect()->back();
    }
    // 提交删除节点
    public function node_delete_post(Request $request, Node $node)
    {
        $post = $request->input();
        $data = $node->where('id', $post['id'])->first();
        // 权限验证
        if (CodeFec_Quanxian()->_站长() !== true && $data['user_id'] != Auth::id()) {
            return abort(401);
        }
        $del = $node->where('id', $post['id'])->delete();
        if ($del) {
            session()->flash('success', '删除成功!');
            Curd_UserLog()->Insert("删除节点:" . $data['name'] . ",ID为:" . $data['id'], Auth::user()->id);
        } else {
            session()->flash('danger', '删除失败!');
        }
        return redirect()->route('admin.node.edit');
    }
    // 封禁用户
    public function user_fengjin(Request $request)
    {
        $id = $request->input()['id'];
        Helpers()->User_cunzai($id); //用户过滤
        $data = User::where('id', $id)->first();
        if (Curd_UserGroup()->Read_id($data['user_group'])['quanxian'] < 999) {
            if (Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'] > Curd_UserGroup()->Read_id($data['user_group'])['quanxian']) {
                $caozuo = true;
            } else {
                $caozuo = false;
            }
        } else {
            $caozuo = false;
        }
        if ($caozuo) {
            if ($data['zhuangtai'] != "封禁") {
                $update = User::where('id', $id)->update([
                    'zhuangtai' => '封禁'
                ]);
                if ($update) {
                    session()->flash('success', '封禁成功!');
                    Curd_UserLog()->Insert("封禁用户:" . $data['username'] . ",ID为:" . $data['id'], Auth::user()->id);
                } else {
                    session()->flash('danger', '封禁失败!');
                }
            } else {
                session()->flash('danger', '封禁失败!');
            }
        } else {
            session()->flash('danger', '无权操作');
        }
        return redirect()->back();
    }
    // 解封用户
    public function user_jiefeng(Request $request)
    {
        $id = $request->input()['id'];
        Helpers()->User_cunzai($id); //用户过滤
        $data = User::where('id', $id)->first();
        if (Curd_UserGroup()->Read_id($data['user_group'])['quanxian'] < 999) {
            if (Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'] > Curd_UserGroup()->Read_id($data['user_group'])['quanxian']) {
                $caozuo = true;
            } else {
                $caozuo = false;
            }
        } else {
            $caozuo = false;
        }
        if ($caozuo) {
            if ($data['zhuangtai'] == "封禁") {
                $update = User::where('id', $id)->update([
                    'zhuangtai' => '正常'
                ]);
                if ($update) {
                    session()->flash('success', '解封成功!');
                    Curd_UserLog()->Insert("解封用户:" . $data['username'] . ",ID为:" . $data['id'], Auth::user()->id);
                } else {
                    session()->flash('danger', '解封失败!');
                }
            } else {
                session()->flash('danger', '解封失败!');
            }
        } else {
            session()->flash('danger', '无权操作');
        }
        return redirect()->back();
    }
    // 更新用户资料
    public function user_edit_save(Request $request)
    {
        $post = $request->input();
        $id = $post['id'];
        Helpers()->User_cunzai($id); //用户过滤
        Helpers()->User_Quanxian_zz($id, 999); //权限过滤
        $data = User::where('id', $id)->first(); //用户数据
        $email_verified_at = $data['email_verified_at'];
        if ($post['email'] != $data['email']) {
            // 确定修改邮箱
            if (User::where('email', $post['email'])->count()) {
                // 邮箱被占用
                session()->flash('danger', '修改失败,邮箱被占用');
                return redirect()->back();
            } else {
                $email_verified_at = null;
            }
        }
        if ($post['username'] != $data['username']) {
            // 确定修改邮箱
            if (User::where('username', $post['username'])->count()) {
                // 邮箱被占用
                session()->flash('danger', '修改失败,用户名被占用');
                return redirect()->back();
            }
        }
        if (!UserGroup::where([['id', $post['user_group']], ['quanxian', '<', Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']]])->count()) {
            session()->flash('danger', '无权修改为此用户组');
            return redirect()->back();
        }
        $update = User::where('id', $id)->update([
            'email_verified_at' => $email_verified_at,
            'username' => $post['username'],
            'email' => $post['email'],
            'user_group' => $post['user_group']
        ]);
        if ($update) {
            session()->flash('success', '修改成功!');
            Curd_UserLog()->Insert("修改:" . $data['username'] . ",ID为:" . $data['id'] . "的用户信息", Auth::user()->id);
            return redirect()->back();
        } else {
            session()->flash('danger', '修改失败!');
            return redirect()->back();
        }
    }
    // 新增用户组
    public function users_group_save(GroupSaveRequest $request, UserGroup $group)
    {
        CodeFec_Quanxian()->站长(); //限制只有站长才能访问
        $data = $request->input();
        $id = $group->insertGetId([
            'name' => $data['name'],
            'ename' => $data['ename'],
            'color' => $data['color'],
            'quanxian' => $data['quanxian'],
            'created_at' => date("Y-m-d H:i:s")
        ]);
        if ($id) {
            session()->flash('success', '用户组创建成功!');
            Curd_UserLog()->Insert("创建用户组:" . $data['name'] . ",ID为:" . $id, Auth::user()->id);
        } else {
            session()->flash('danger', '用户组创建失败!');
        }
        return redirect()->back();
    }
    // 删除用户组
    public function users_group_delete(Request $request)
    {
        $data = $request->input();
        $id = $data['id'];
        if (UserGroup::where([['id', $id], ['quanxian', '<', '999'], ['id', '!=', '1']])->count()) {
            $usergp_name = UserGroup::where([['id', $id], ['quanxian', '<', '999'], ['id', '!=', '1']])->first()['name'];
            dispatch(new GroupDelete($id));
            session()->flash('success', '已放入删除队列');
            Curd_UserLog()->Insert("删除用户组:" . $usergp_name, Auth::user()->id);
        } else {
            session()->flash('danger', '你不能删除此用户组');
        }
        return redirect()->back();
    }
    // 新增节点 - 标签
    public function node_tags_save(AddPostsType $request, Posts_type $pt)
    {
        $data = $request->input();
        $id = $pt->insertGetId([
            'name' => $data['name'],
            'ename' => $data['ename'],
            'color' => $data['color'],
            'user_id' => Auth::id(),
            'created_at' => date("Y-m-d H:i:s")
        ]);
        if ($id) {
            Curd_UserLog()->Insert("创建节点标签:" . $data['name'] . ", ID:" . $id, Auth::user()->id);
            session()->flash('success', '节点标签创建成功!');
        } else {
            session()->flash('danger', '节点标签创建失败!');
        }
        return redirect()->back();
    }
    // 删除节点标签
    public function node_tags_delete(Request $request, Posts_type $pt)
    {
        CodeFec_Quanxian(777);
        $data =  $request->all();
        $tags = $pt->where('ename', $data['ename'])->first();
        $del = $pt->where('ename', $data['ename'])->delete();
        if ($del) {
            session()->flash('success', '标签删除成功!');
            Curd_UserLog()->Insert("删除标签:" . $tags['name'], Auth::user()->id);
        } else {
            session()->flash('danger', '标签删除失败!');
        }
        return redirect()->route('index');
    }
    // 保存帖子提交
    public function topic_edit_save(EditSave $request, Topic $topic)
    {
        $delete = $request->input('delete',null);
        if($delete=="yes"){
            $deletes = $topic->where('id',$request->input('id'))->update([
                'publish' => '删除'
            ]);
            if($deletes){
                // 删除成功
                session()->flash('success', '删除成功!');
                Curd_UserLog()->Insert("删除ID为:".$request->input('id')."文章:", Auth::user()->id);
            }else{
                session()->flash('danger', '删除失败!');
            }
            return redirect()->route('index');
        }
        $data = $request->input();
        $id = $data['id'];
        if (!$topic->where([['id', $id], ['publish', '发布']])->count()) {
            return abort(401);
        }
        if ($data['zhiding'] == null) {
            $data['zhiding'] = 0;
        }
        $update = $topic->where([['id', $id], ['publish', '发布']])->update([
            'jing' => $data['jinghua'],
            'zhiding' => $data['zhiding']
        ]);
        $tt = $topic->where([['id', $id], ['publish', '发布']])->first()['title'];
        if ($update) {
            session()->flash('success', '更新成功!');
            Curd_UserLog()->Insert("管理员更新文章:" . $tt . ",ID:" . $id, Auth::user()->id);
        } else {
            session()->flash('danger', '更新失败!');
        }
        return redirect()->route('topic.show', ['id' => $id]);
    }
    // 处理举报
    public function report_post(Request $request,Report $report){
        CodeFec_Quanxian(777);
        $data = $request->all();
        if(!$report->where('id',$data['id'])->count()){
            return abort(404);
        }
        if($data['action']=="pass"){
            // 受理举报
            $zhuangtai = "受理";
        }else{
            $zhuangtai = "驳回";
        }
        $update=$report->where('id',$data['id'])->update([
            'zhuangtai' => $zhuangtai
        ]);
        if($update){
            Curd_UserLog()->Insert($zhuangtai."ID为:".$data['id']."的举报", Auth::user()->id);
            session()->flash('success','处理成功!');
            return redirect()->back();
        }else{
            session()->flash('danger','处理失败!');
            return redirect()->back();
        }
    }
    // 保存用户组修改
    public function users_group_edit_post(EditUserGroup $editUserGroup,UserGroup $userGroup){
        CodeFec_Quanxian(999);
        $data = $editUserGroup->validated();
        $ename = $editUserGroup->input('ename');
        $id = $editUserGroup->input('id');
        if(!$userGroup->where('id',$id)->count()){
            return abort(404);
        }
        if($userGroup->where([['id','!=',$id],['ename',$ename]])->count()){
            return redirect()->back()->with('danger','这个英文名被占用:'.$ename);
        }
        $userGroup->where('id',$id)->update($data);
        Curd_UserLog()->Insert("修改ID为:".$id."用户组的信息", Auth::user()->id);
        return redirect()->back()->with('success','修改成功!');
    }
}
