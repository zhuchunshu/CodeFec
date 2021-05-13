<?php

namespace App\Http\Requests\Create;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class DarftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(Auth::user()){
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
            'id' => 'required|numeric',
            'title' => 'required|string|min:5|max:999',
            'node' => 'required|numeric',
            'tags' => 'required|numeric',
            'content' => 'required|min:15',
            'html' => 'required',
            'tlou_on' => 'nullable|string|min:1|max:2',
            'tlou' => 'nullable|integer|min:1|max:1000',
            'tlou_jiangli' => 'nullable|integer|min:1|max:100',
            'tlou_jieshu' => 'nullable|date',
            'zhuanzai' => 'nullable|url'
        ];
    }
    public function attributes()
    {
        return [
            'id' => '帖子id',
            'title' => '标题',
            'node' => '节点id',
            'tags' => '标签id',
            'content' => '正文内容',
            'html' => 'html正文内容',
            'tlou_on' => 'T楼开关',
            'tlou' => 'T楼截止楼层',
            'tlou_jiangli' => 'T楼奖品份数',
            'tlou_jieshu' => 'T楼结束时间',
            'zhuanzai' => '转载地址'
        ];
    }
}
