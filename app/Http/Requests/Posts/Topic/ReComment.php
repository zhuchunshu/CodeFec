<?php

namespace App\Http\Requests\Posts\Topic;

use Illuminate\Support\Facades\Auth;
use App\Rules\Posts\Comment\HasTopic;
use App\Rules\Posts\Comment\HasComment;
use Illuminate\Foundation\Http\FormRequest;

class ReComment extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'comment_id' => [new HasComment],
            'topic_id' => ['required',new HasTopic],
            'content' => ['required','string','min:4','max:2000'],
            'html' => ['required','string','min:4','max:2000']
        ];
    }
    public function attributes()
    {
        return [
            'content' => '评论内容',
            'html' => '评论html内容(自动生成)'
        ];
    }
}
