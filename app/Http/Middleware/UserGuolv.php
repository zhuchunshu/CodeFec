<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use App\Models\UserGroup;
use Illuminate\Http\Request;

class UserGuolv
{
    /**
     * 用户过滤
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if($user){
             // 如果用户已登录
            if($user->zhuangtai!="正常"){
                return abort(403,'你已被封号!');
            }
            if(!UserGroup::where('id',$user->user_group)->count()){
                User::where('id',$user->id)->update([
                    'user_group' => 1
                ]);
            }
        }
        return $next($request);
    }
}
