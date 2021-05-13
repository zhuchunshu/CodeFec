<?php

namespace App\Http\Requests\Admin\Users;

use Illuminate\Foundation\Http\FormRequest;

class EditUserGroup extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return CodeFec_Quanxian()->_(999);
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
            'name' => 'required|string|min:2|max:50',
            'ename' => 'required|string|min:2|max:50',
            'color' => 'required|string',
            'quanxian' => 'required|integer|min:1|max:999'
        ];
    }

    public function attributes()
    {
        return [
            'name' => '用户组名称',
            'ename' => '用户组英文名',
            'color' => '颜色值',
            'quanxian' => '权限值',
        ];
    }
}
