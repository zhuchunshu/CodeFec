<?php

namespace App\Http\Requests\Posts\Topic;

use App\Rules\Posts\Comment\HasTopic;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(Auth::id() && Auth::user()->zhuangtai=="正常"){
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
            'topic_id' => ['required',new HasTopic],
            'content' => 'required|min:4',
            'html' => 'required|min:4'
        ];
    }
    public function attributes()
    {
        return [
            'topic_id' => '帖子id',
            'content' => '评论内容',
            'html' => 'html正文内容'
        ];
    }
}
