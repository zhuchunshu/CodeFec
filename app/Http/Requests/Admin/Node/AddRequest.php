<?php

namespace App\Http\Requests\Admin\Node;

use Illuminate\Foundation\Http\FormRequest;

class AddRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //设置只有大于等于版主的等级才能访问
        return CodeFec_Quanxian()->_(777);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:2|max:255|unique:node,name',
            'ename' => 'required|string|min:2|max:255|unique:node,ename',
            'color' => 'required|string|min:3',
            'icon' => 'required|file',
            'quanxian' => 'required|integer|min:1|max:999',
            'die_id' => 'required|numeric',
            'description' => 'nullable|string|min:3'
        ];
    }

    public function attributes()
    {
        return [
            'name' => '节点名称',
            'ename' => '节点英文名',
            'color' => '节点颜色值',
            'icon' => '节点图标',
            'die_id' => '父级id',
            'description' => '节点简介',
            'quanxian' => '权限值'
        ];
    }
}
