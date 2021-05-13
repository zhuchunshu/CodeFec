<?php

namespace App\Http\Requests\Admin\Node;

use Illuminate\Foundation\Http\FormRequest;

class AddPostsType extends FormRequest
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
            'name' => 'required|string|min:2|max:255|unique:posts_type,name',
            'ename' => 'required|string|min:2|max:255|unique:posts_type,ename',
            'color' => 'required|string|min:3',
        ];
    }

    public function attributes()
    {
        return [
            'name' => '节点名称',
            'ename' => '节点英文名',
            'color' => '节点颜色值',
        ];
    }
}
