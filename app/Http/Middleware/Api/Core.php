<?php

namespace App\Http\Middleware\Api;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;

class Core
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(@$request->all()['_userToken']){
            $uk = $request->all()['_userToken'];
            if(!User::where([['_Token',$uk],['zhuangtai','正常']])->count()){
                return response()->json([
                    'code' => 401,
                    'message' => 'error',
                    'data' => '无权限',
                ]);
            }
        }else{
            return response()->json([
                'code' => 401,
                'message' => 'error',
                'data' => '无权限,Token鉴权失败! 可能是未登录',
            ]);
        }
        return $next($request);
    }
}
