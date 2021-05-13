<?php

namespace App\Http\Controllers\Whole;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    public function user_search(Request $request){
        $data = $request->all();
        if(Str::contains($data['content'], ':')){
            // 如果搜索内容包含 :
            $type = Str::before($data['content'], ':');
            $search = Str::after($data['content'], ':');
            if($type && $search){
                if($type!="username" && $type!="email" && $type!="id"){
                    session()->flash('danger','查询失败,查询类型格式有误');
                    return redirect()->back();
                }else{
                    //开始查询
                    $page = User::where($type,'like','%'.$search.'%')->paginate(20);
                    $count = User::where($type,'like','%'.$search.'%')->count();
                    return view('client.whole.user.search',['count'=>$count,'page'=>$page]);
                }
            }else{
                session()->flash('danger','查询失败,查询内容格式有误');
                return redirect()->back();
            }
        }else{
            $page = User::where('username','like','%'.$data['content'].'%')->paginate(20);
            $count = User::where('username','like','%'.$data['content'].'%')->count();
            return view('client.whole.user.search',['count'=>$count,'page'=>$page]);
        }
    }
}
