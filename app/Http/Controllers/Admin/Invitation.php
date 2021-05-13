<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\invitationCode;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Jobs\Admin\Invitation\ClearShiyong;
use Rap2hpoutre\FastExcel\Facades\FastExcel;
use App\Http\Requests\Admin\Invitation\Create;
use App\Jobs\Admin\Invitation\Create as InvitationCreate;

class Invitation extends Controller
{
    // 首页
    public function index(invitationCode $invitationCode){
        CodeFec_Quanxian()->站长();
        $page = $invitationCode
        ->orderBy('id','desc')
        ->with('user','use_user')
        ->paginate(30);
        return view('admin.invitation.index',compact('page'));
    }
    // 生成邀请码
    public function create(Create $request){
        CodeFec_Quanxian()->站长();
        $qianzhui = $request->input('qianzhui'); // 前缀
        $houzhui = $request->input('houzhui'); // 后缀
        $shuliang = $request->input('shuliang'); // 生成数量
        $user_data = Auth::user();
        $ip = $request->getClientIp();
        dispatch(new InvitationCreate($qianzhui,$houzhui,$shuliang,$user_data,$ip));
        return redirect()->back()->with('success','任务已创建');
    }
    // 处理邀请码
    public function chuli(Request $request,invitationCode $invitationCode){
        CodeFec_Quanxian()->站长();
        $type = $request->input('type','delete');
        switch ($type) {
            case 'delete':
                return $this->delete($request,$invitationCode);
                break;
            case 'export':
                return $this->ExportXuanzhong($request,$invitationCode);
                break;
            case 'export_shiyong':
                # 导出已使用
                return $this->export_shiyong($invitationCode);
                break;
            case 'export_weishiyong':
                # 导出未使用
                return $this->export_weishiyong($invitationCode);
                break;
            case 'qingkong_shiyong':
                # 清空已使用
                dispatch(new ClearShiyong());
                return redirect()->back()->with('success','任务已创建');
                break;
            default:
                return abort(404);
                break;
        }
    }
    // 删除邀请码
    public function delete($request,invitationCode $invitationCode){
        $validatedData = $request->validate([
            'xuanze' => 'required|array',
        ],['xuanze.required' => '选中内容不能为空','xuanze.array'=>'选中内容格式不正确']);
        foreach ($validatedData['xuanze'] as $key => $value) {
            if($value=="on"){
                $invitationCode->where('id',$key)->delete();
            }
        }
        return redirect()->back()->with('success','删除成功!');
    }
    // 导出选中邀请码
    public function ExportXuanzhong($request,invitationCode $invitationCode){
        $validatedData = $request->validate([
            'xuanze' => 'required|array',
        ],['xuanze.required' => '选中内容不能为空','xuanze.array'=>'选中内容格式不正确']);
        $arr = [];
        foreach ($validatedData['xuanze'] as $key => $value) {
            if($value=="on"){
                $data = $invitationCode->with('user','use_user')->where('id',$key)->first();
                array_push($arr,$data);
            }
        }
        $list = collect($arr);
        $name = Str::random(17);
        FastExcel::data($list)->export(public_path('/uploads/admin-导出选中邀请码_'.$name.'.xlsx'),function($code){
            return [
                '创建者' => $code->user->username,
                '邀请码' => $code->code,
                '使用状态' => $code->zhuangtai,
                '创建者IP' => $code->created_ip,
                '使用者IP' => _cf($code->use_ip,'未使用'),
                '使用者' => _cf(@$code->use_user->username,'未使用'),
            ];
        });
        return redirect('/uploads/admin-导出选中邀请码_'.$name.'.xlsx');
    }
    // 导出已使用邀请码
    public function export_shiyong(invitationCode $invitationCode){
        if($invitationCode->where('zhuangtai','已使用')->count()) {
            $arr = $invitationCode->where('zhuangtai','已使用')->get();
            $list = collect($arr);
            $name = Str::random(17);
            FastExcel::data($list)->export(public_path('/uploads/admin-导出已使用邀请码_'.$name.'.xlsx'),function($code){
                return [
                    '创建者' => $code->user->username,
                    '邀请码' => $code->code,
                    '使用状态' => $code->zhuangtai,
                    '使用者IP' => _cf($code->use_ip,'未使用'),
                    '创建者IP' => $code->created_ip,
                    '使用者' => _cf(@$code->use_user->username,'未使用'),
                    '使用时间' => date("Y-m-d H:i:s",$code->time)
                ];
            });
            return redirect('/uploads/admin-导出已使用邀请码_'.$name.'.xlsx');
        }else{
            return redirect()->back()->with('danger','无内容');
        }
    }
    // 导出未使用
    public function export_weishiyong(invitationCode $invitationCode){
        if($invitationCode->where('zhuangtai','未使用')->count()) {
            $arr = $invitationCode->where('zhuangtai','未使用')->get();
            $list = collect($arr);
            $name = Str::random(17);
            FastExcel::data($list)->export(public_path('/uploads/admin-导出未使用邀请码_'.$name.'.xlsx'),function($code){
                return [
                    '创建者' => $code->user->username,
                    '邀请码' => $code->code,
                    '创建者IP' => $code->created_ip,
                    '创建时间' => $code->created_at,
                    '使用状态' => $code->zhuangtai,
                ];
            });
            return redirect('/uploads/admin-导出未使用邀请码_'.$name.'.xlsx');
        }else{
            return redirect()->back()->with('danger','无内容');
        }
    }
}
