<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Options;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class CoreController extends Controller
{
    public function index(Request $request)
    {
        CodeFec_Quanxian(999);
        if (file_exists(storage_path('logs/' . get_options_setting('authfile') . ".log"))) {
            $response = Http::post(base64_decode('aHR0cHM6Ly9jZmF1dGgubm9kZS50YXgvYXBpL2F1dGgvdmVyaWZ5'), [
                'domain' => _port($request->server('HTTP_HOST')),
                'hash' => read_file(storage_path('logs/' . get_options_setting('authfile') . ".log")),
                'class' => 'codefec'
            ]);
            $data = $response->json();
            if($data['code']==0){
                // 验证通过
                Cache::put('admin.auth', md5(read_file(storage_path('logs/' . get_options_setting('authfile') . ".log"))), 86400);
                return redirect()->back();
            }else{
                // 验证不通过
                return $this->ver();
            }
        } else {
            return $this->ver();
        }
    }
    // 验证授权
    public function ver()
    {
        CodeFec_Quanxian(999);
        return view('admin.system.authver');
    }
    public function ver_post(Request $request){
        CodeFec_Quanxian(999);
        $code = $request->input('code');
        $response = Http::post(base64_decode('aHR0cHM6Ly9jZmF1dGgubm9kZS50YXgvYXBpL2F1dGgvdmVyaWZ5'),[
            'domain' => _port($request->server('HTTP_HOST')),
            'hash' => $code,
            'class' => 'codefec'
        ]);
        $data = $response->json();
        if($data['code']==0){
            // 验证通过
            $name = Str::random(19);
            File::put(storage_path('logs/' . $name . ".log"),$code);
            if(get_options_setting_count('authfile')){
                // 更新
                Options::where(['name' => 'authfile','class' => 'setting'])->update([
                    'value' => $name
                ]);
            }else{
                // 新增
                Options::insert([
                    'name' => 'authfile',
                    'class' => 'setting',
                    'value' => $name,
                    'created_at' => date("Y-m-d H:i:s")
                ]);
            }
            Cache::put('admin.auth', md5(read_file(storage_path('logs/' . get_options_setting('authfile') . ".log"))), 86400);
            return redirect()->route('index')->with('success','授权验证通过');
        }else{
            return redirect()->back()->with('danger',$data['msg']);
        }
    }
}
