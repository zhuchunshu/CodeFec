<?php

namespace App\Http\Controllers\Users;

use App\Handlers\AvatarUpload;
use App\Handlers\ImageUploadHandler;
use Parsedown;
use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\AvatarRequest;
use App\Http\Requests\Users\DashangSave;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Users\SettingSave;
use App\Models\User_Notice;
use App\Models\User_Options;
use Illuminate\Http\Request;

class PostController extends Controller
{
    //保存个人设置
    public function setting_save(SettingSave $request, Parsedown $Parsedown)
    {
        $data = $request->input(); // 表单数据
        //$qianming = $Parsedown->line(); // markdown转html
        $qianming = $data['qianming'];
        $update = User::where('id', Auth::id())->update([
            'qianming' => $qianming,
            'qq' => $data['qq'],
            'wechat' => $data['wechat'],
            'telegram' => $data['telegram'],
            'gongsi' => $data['gongsi'],
            'zhiwei' => $data['zhiwei'],
            'website' => $data['website'],
            'address' => $data['address'],
        ]);
        if (!$update) {
            session()->flash('danger', '更新失败!');
        } else {
            Curd_UserLog()->Insert("修改个人信息", Auth::user()->id);
            session()->flash('success', '更新成功!');
        }
        return redirect()->back();
    }
    public function up_image(Request $request, ImageUploadHandler $uploader)
    {
        $data = [];
        foreach ($request->file('file') as $key => $file) {
            $result = $uploader->save($file, 'topic', Auth::id());
            if ($result) {
                $url = $result['path'];
                $data['data']['succMap'][$url]=$url;
            } else {
                array_push((array)$data['data']['errFiles'],$key);
            }
        }
        return $data;
    }
    public function reply_image(Request $request, ImageUploadHandler $uploader){
        $data = [];
        foreach ($request->file('file') as $key => $file) {
            $result = $uploader->save($file, 'reply', Auth::id());
            if ($result) {
                $url = $result['path'];
                $data['data']['succMap'][$url]=$url;
            } else {
                array_push((array)$data['data']['errFiles'],$key);
            }
        }
        return $data;
    }
    // 保存选项设置
    public function setting_options_save(Request $request){
        $data = $request->input();

        // 判断关闭

        foreach (User_Options::where(['user_id'=>Auth::id()])->get() as $value) {
            if(!isset($data[$value['name']])){
                // 删除
                User_Options::where(['user_id'=>Auth::id(),'name'=>$value['name']])->delete();
            }
        }

        // 新增
        foreach ($data as $key => $value) {
            if($key!="_token" && $value=="on"){
                if(!User_Options::where(['user_id'=>Auth::id(),'name'=>$key])->count()){
                    // 防止重复创建
                    User_Options::insert([
                        'user_id' => Auth::id(),
                        'name' => $key,
                        'value' => $value,
                        'created_at' => date("Y-m-d H:i:s")
                    ]);
                }
            }
        }
        session()->flash('success','更新成功!');
        return redirect()->back();
    }
    public function my_notice_du(Request $request,User_Notice $un){
        $id = $request->input('read',null);
        if($un->where(['id' => $id,'user_id' => Auth::id()])->count()){
            $del = $un->where(['id' => $id,'user_id' => Auth::id()])->delete();
            if($del){
                Curd_UserLog()->Insert("成功标记ID为:".$id."的通知为已读", Auth::user()->id);
                session()->flash('success','成功标记通知为已读!');
            }else{
                session()->flash('danger','标记通知为已读失败!');
            }
        }else{
            session()->flash('danger','通知不存在!');
        }
        return redirect()->back();
    }

    // 设置头像
    public function setting_avatar_save(AvatarRequest $request,AvatarUpload $image,User $user){
        if ($request->avatar) {
            $result = $image->save($request->avatar, 'avatars', $user->id);
            if ($result) {
                $data['avatar'] = $result['path'];
            }else{
                return redirect()->back()->with('danger','头像上传失败!');
            }
        }
        $user->where('id',Auth::id())->update($data);
        return redirect()->back()->with('success','头像上传成功');
    }
}
