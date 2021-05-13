<?php

namespace App\Http\Requests\Users;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class SettingSave extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(Auth::user() && Auth::user()->zhuangtai!="封禁"){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'qianming' => 'string|nullable|min:5|max:999',
            'qq' => 'nullable|numeric',
            'wechat' => 'nullable|min:4|max:50|string',
            'telegram' => 'nullable|string|max:50|min:4',
            'gongsi' => 'nullable|string|min:1|max:255',
            'zhiwei' => 'nullable|string|min:2|max:255',
            'website' => 'url|nullable',
            'address' => 'nullable|string|max:255'
        ];
    }
    public function attributes()
    {
        return [
            'qianming' => '签名',
            'qq' => 'qq',
            'wechat' => '微信',
            'gongsi' => '公司',
            'zhiwei' =>'职位',
            'website' => '网站',
            'address' => '位置'
        ];
    }
}
