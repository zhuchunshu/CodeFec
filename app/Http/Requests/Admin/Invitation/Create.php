<?php

namespace App\Http\Requests\Admin\Invitation;

use Illuminate\Foundation\Http\FormRequest;

class Create extends FormRequest
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
            'shuliang' => 'required|integer|max:10000|min:1',
            'qianzhui' => 'nullable|string|max:15',
            'houzhui' => 'nullable|string|max:15'
        ];
    }
    public function attributes()
    {
        return [
            'shuliang' => '生成数量',
            'qianzhui' => '邀请码前缀',
            'houzhui' => '邀请码后缀'
        ];
    }
}
