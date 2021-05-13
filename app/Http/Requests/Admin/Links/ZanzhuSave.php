<?php

namespace App\Http\Requests\Admin\Links;

use Illuminate\Foundation\Http\FormRequest;

class ZanzhuSave extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return CodeFec_Quanxian()->_站长();
        //设置只有站长才有权限发送请求
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:2|max:50',
            'logo' => 'file',
            'url' => 'required|url',
            'description' => 'nullable|min:5'
        ];
    }
    public function attributes()
    {
        return [
            'name' => '名称',
            'url' => '网址',
            'description' => '简介'
        ];
    }
}
