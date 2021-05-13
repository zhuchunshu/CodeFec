<?php

namespace App\Http\Requests\Admin\Setting\Pro;

use Illuminate\Foundation\Http\FormRequest;

class ImageUpload extends FormRequest
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
            'icon' => 'nullable|image|min:25|max:2000',
            'topic_bc' => 'nullable|image'
        ];
    }

    public function attributes()
    {
        return [
            'icon' => '站点ICON图标',
            'topic_bc' => '帖子缩略图',
        ];
    }
}
