<?php

namespace App\Http\Controllers;

use App\Models\Node;
use App\Models\User;
use App\Models\PostsComment;
use App\Models\Topic;
use App\Models\Posts_type;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Topic $topic, $ename=null)
    {
        if (!$ename) {
            $page = $topic->where('publish', '=', '发布')
            ->orderBy('zhiding','desc')
            ->with('user','nodes','tag')
            ->orderBy('created_at','desc')
            ->with('user','nodes','tag')
            ->paginate(30);
            $node = [
                'color' => 'primary',
                'name' => Curd_Options()->Read_name('web_name', 'setting', 'CodeFec'),
                'description' => Curd_Options()->Read_name('web_description', 'setting'),
                'ename' => null,
            ];
            return view('home.index', compact('page','node'));
        }else{
            if(Node::where('ename',$ename)->count()){
                $node = Node::where('ename',$ename)->first();
                $page = $topic->
                where([['publish', '=', '发布'],['node_id',$node['id']]])
                ->orderBy('zhiding','desc')
                ->orderBy('created_at','desc')
                ->with('user','nodes','tag')
                ->paginate(30);
                return view('home.index', ['page' => $page, 'node' => $node]);
            }else{
                return abort(404);
            }
        }
    }
    // 标签文章
    public function tags($ename,Posts_type $pt,Topic $topic){
        if($pt->where('ename',$ename)->count()){
            $tags = $pt->where('ename',$ename)->first();
            $page = $topic->where([['publish', '=', '发布'],['type',$tags['id']]])
            ->orderBy('zhiding','desc')
            ->orderBy('created_at','desc')
            ->with('user','nodes','tag')
            ->paginate(30);
            return view('home.tags', ['page' => $page, 'tags' => $tags]);
        }else{
            return abort(404);
        }
    }
    // 热门帖子
    public function t_hot(Topic $topic){
        $page = $topic->where('publish', '=', '发布')
        ->orderBy('view','desc')
        ->orderBy('created_at','desc')
        ->with('user','nodes','tag')
        ->paginate(30);
        $node = [
            'color' => 'primary',
            'name' => Curd_Options()->Read_name('web_name', 'setting', 'CodeFec'),
            'description' => Curd_Options()->Read_name('web_description', 'setting'),
            'ename' => null,
        ];
        return view('home.index', ['page' => $page, 'node' => $node]);
    }
    // 精华帖子
    public function t_essence(Topic $topic){
        $page = $topic->where([['publish', '=', '发布'],['jing','>','0']])
        ->orderBy('jing','desc')
        ->orderBy('created_at','desc')
        ->with('user','nodes','tag')
        ->paginate(30);
        $node = [
            'color' => 'primary',
            'name' => Curd_Options()->Read_name('web_name', 'setting', 'CodeFec'),
            'description' => Curd_Options()->Read_name('web_description', 'setting'),
            'ename' => null,
        ];
        return view('home.index', ['page' => $page, 'node' => $node]);
    }
    // 搜索
    public function search(Request $request){
        $q = $request->input('q',null); // 搜索内容
        $t = $request->input('t','topic-title');
        $c = $request->input('c','topic');
        if(!$q){
            return abort(403,'搜索内容为空');
        }
        $user = User::where('username','like','%'.$q.'%')->paginate(10,$columns = ['*'],'user-username');
        $qianming = User::where('qianming','like','%'.$q.'%')->paginate(10,$columns = ['*'],'user-qianming');
        $title = Topic::where('title','like','%'.$q.'%')
        ->with('user','nodes','tag')
        ->paginate(10,$columns = ['*'],'topic-title');
        $content = Topic::where('content','like','%'.$q.'%')
        ->with('user','nodes','tag')
        ->paginate(10,$columns = ['*'],'topic-content');
        $comment = PostsComment::where('content','like','%'.$q.'%')->paginate(10,$columns = ['*'],'comment');
        $data = [
            'user' => [
                'username' => $user,
                'qianming' => $qianming
            ],
            'topic' => [
                'title' => $title,
                'content' => $content
            ],
            'comment' => [
                'content' => $comment
            ]
        ];
        return view('client.whole.search',['q' => $q,'data' => $data,'t' => $t,'c' => $c]);
    }
    // 最新波动
    public function t_update(Topic $topic){
        $page = $topic->where('publish', '=', '发布')
        ->orderBy('updated_at','desc')
        ->with('user','nodes','tag')
        ->paginate(30);
        $node = [
            'color' => 'primary',
            'name' => Curd_Options()->Read_name('web_name', 'setting', 'CodeFec'),
            'description' => Curd_Options()->Read_name('web_description', 'setting'),
            'ename' => null,
        ];
        return view('home.index', ['page' => $page, 'node' => $node]);
    }
}
