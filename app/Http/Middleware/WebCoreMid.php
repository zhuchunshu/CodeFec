<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class WebCoreMid
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
        if(get_options_setting('kaiguan_QiangZhiLogin')=="开启" && !$request->user()){
            if(!$request->is('login', 'register','password/*','auth*','captcha*','client/action/theme*')){
                return redirect()->route('login')->with('danger','必须的登录后才能操作');
            }
        }
        return $next($request);
    }
}
