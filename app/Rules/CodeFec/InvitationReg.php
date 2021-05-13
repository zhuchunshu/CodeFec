<?php

namespace App\Rules\CodeFec;

use App\Models\invitationCode;
use Illuminate\Contracts\Validation\Rule;

class InvitationReg implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if(get_options_setting('kaiguan_invitationReg')=="开启"){
            if(invitationCode::where(['code' => $value,'zhuangtai' => '未使用'])->count()){
                return invitationCode::where(['code' => $value,'zhuangtai' => '未使用'])->update([
                    'zhuangtai' => '已使用',
                    'time' => time()
                ]);
            }else{
                return false;
            }
        }else{
            return true;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return '邀请码验证不通过';
    }
}
