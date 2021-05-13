<?php

namespace App\Handlers\Models;

use App\Models\UserGroup;
use App\Models\Node as ModelsNode;
use Illuminate\Support\Facades\Auth;

class Node{

    public function get_nodie_all(){
        return ModelsNode::where('die_id','=',null)->with('user')->get();
    }
    public function get_hasdie_all($die_id){
        return ModelsNode::where('die_id',$die_id)->with('user')->get();
    }
    public function get_edit_nodie_all(){
        $quanxain = UserGroup::where('id',Auth::user()->user_group)->first()['quanxian'];
        return ModelsNode::where([['die_id','=',null],['quanxian','<=',$quanxain]])->get();
    }
    public function get_edit_hasdie_all($die_id){
        $quanxain = UserGroup::where('id',Auth::user()->user_group)->first()['quanxian'];
        return ModelsNode::where([['die_id',$die_id],['quanxian','<=',$quanxain]])->get();
    }
}
