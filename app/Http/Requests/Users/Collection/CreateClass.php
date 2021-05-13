<?php

namespace App\Http\Requests\Users\Collection;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class CreateClass extends FormRequest
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
            'name' => 'required|string|min:2|max:100',
            'remarks' => 'nullable|string|min:3|max:200'
        ];
    }
    public function attributes()
    {
        return [
            'name' => '收藏夹名称',
            'remarks' => '收藏夹备注'
        ];
    }
}
