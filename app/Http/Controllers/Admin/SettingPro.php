<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Handlers\ImageUploadHandler;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Admin\Setting\Pro\ImageUpload;
use App\Models\Options;

class SettingPro extends Controller
{
    // 首页
    public function index(){
        return view('admin.setting.pro.index');
    }
    // 图像设置
    public function image(){
        return view('admin.setting.pro.image');
    }
    // 保存图像
    public function image_save(ImageUpload $request,ImageUploadHandler $uploader){
        foreach ($request->validated() as $key => $file) {
            $result = $uploader->save($file, 'reply', Auth::id());
            $url = $result['path'];
            if(Options::where(['name' => $key,'class' => 'image'])->count()){
                // 更新
                Options::where(['name' => $key,'class' => 'image'])->update([
                    'value' => $url
                ]);
            }else{
                // 新增
                Options::insert([
                    'name' => $key,
                    'value' => $url,
                    'class' => 'image',
                    'created_at' => date("Y-m-d H:i:s")
                ]);
            }
        }
        return redirect()->back()->with('success','更新成功!');
    }
}
