<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientController extends Controller
{
    // 主题状态切换
    public function theme_qiehuan(){
        if(theme_riye()!="dark"){
            // 切换夜间模式
            theme_qiehuan_ye();
            return redirect()->back();
        }else{
            // 切换日间模式
            theme_qiehuan_ri();
            return redirect()->back();
        }
    }
}
