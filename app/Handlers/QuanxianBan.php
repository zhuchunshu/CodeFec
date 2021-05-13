<?php

namespace App\Handlers;

use Illuminate\Support\Facades\Auth;

/**
 * 用户访问权限限制
 */
class QuanxianBan{
    /**
     * 权限查询
     *
     * @param integer $quanxian 权限数字
     */
    public function __construct(int $quanxian=null)
    {
        if($quanxian){
            if(Auth::id()){
                if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<$quanxian){
                    return abort(401);
                }
            }else{
                return abort(401);
            }
        }
    }
    /**
     * 权限鉴定
     *
     * @param integer $quanxian 权限数字
     * @return void
     */
    public function _(int $quanxian){
        if(Auth::id()){
            if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<$quanxian){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    }
    /**
     * 站长
     */
    public function 站长(){
        // 站长权限999
        if(!Auth::id()){
            return abort(401);
        }
        if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<999){
            return abort(401);
        }
    }
    /**
     * 站长
     */
    public function _站长(){
        // 站长权限999
        if(!Auth::id()){
            return false;
        }
        if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<999){
            return false;
        }else{
            return true;
        }
    }
    /**
     * 超级版主
     */
    public function 超级版主(){
        // 超版权限888
        if(!Auth::id()){
            return abort(401);
        }
        if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<888){
            return abort(401);
        }
    }
    /**
     * 版主
     */
    public function 版主(){
        // 版主权限777
        if(!Auth::id()){
            return abort(401);
        }
        if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<777){
            return abort(401);
        }
    }
    /**
     * 审核
     */
    public function 审核(){
        // 审核权限 200
        if(!Auth::id()){
            return abort(401);
        }
        if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<200){
            return abort(401);
        }
    }
    /**
     * 普通会员
     */
    public function 普通会员(){
        // 普通会员 权限1
        if(!Auth::id()){
            return abort(401);
        }
        if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<1){
            return abort(401);
        }
    }
    /**
     * 游客
     */
    public function 游客(){
        // 游客权限0
        if(Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian']<0){
            return abort(401);
        }
    }
}
