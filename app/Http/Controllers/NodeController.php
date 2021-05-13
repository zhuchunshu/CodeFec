<?php

namespace App\Http\Controllers;

use App\Models\Node;
use App\Models\Posts_type;
use Illuminate\Http\Request;

/**
 * 节点
 */
class NodeController extends Controller
{
    //  节点信息
    public function data($ename,Node $node){

        //判断节点存在
        if(!$node->where('ename',$ename)->count()){
            return abort(404);
        }
        $id = $node->where('ename',$ename)->first()['id'];
        // 显示信息
        $zi = $node
        ->with('user')
        ->where('die_id',$id)->paginate(20);
        $zi_count = $node->where('die_id',$id)->count();
        $data = $node->where('ename',$ename)->first();
        return view('client.node.data',['data' => $data,'zi' => $zi,'zi_count' => $zi_count]);
    }
    // 全部节点
    public function index(Node $node){
        $page = $node->where('die_id','=',null)
        ->with('user')
        ->orderBy('created_at','DESC')->paginate(20);
        return view('client.node.index',['page' => $page]);
    }
    // 节点标签类型
    public function node_tags($ename,Posts_type $pt){
        if($pt->where('ename',$ename)->count()){
            $data = $pt->where('ename',$ename)->first();
            return view('client.node.tags_data',['data' => $data]);
        }else{
            return abort(404);
        }
    }
}
