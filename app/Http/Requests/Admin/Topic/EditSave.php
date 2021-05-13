<?php

namespace App\Http\Requests\Admin\Topic;

use Illuminate\Foundation\Http\FormRequest;

class EditSave extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
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
            'id' => 'required|numeric',
            'jinghua' => 'nullable|integer|min:1|max:999',
            'zhiding' => 'nullable|integer|min:0|max:999'
        ];
    }
    public function attributes()
    {
        return [
            'id' => '被修改的文章id',
            'jinghua' => '精华指数',
            'zhiding' => '置顶指数'
        ];
    }
}
