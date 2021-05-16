<?php

namespace App\Http\Controllers\Posts;

use App\Models\Node;
use App\Models\User;
use App\Models\Topic;
use App\Models\Report;
use App\Models\PostsLike;
use App\Models\UserGroup;
use App\Models\Posts_type;
use Illuminate\Support\Str;
use App\Models\PostsComment;
use Illuminate\Http\Request;
use App\Models\Topic_Options;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Create\DarftRequest;
use App\Http\Requests\Create\TopicRequest;
use App\Http\Requests\Posts\Topic\EditSave;
use App\Http\Requests\Posts\Topic\ReComment;
use App\Http\Requests\Posts\Topic\CommentRequest;

class TopicController extends Controller
{
    // 发帖视图
    public function create(Request $request)
    {
        return view('posts.create.topic');
    }
    // 发帖请求
    public function create_post(TopicRequest $request)
    {
        $data = $request->all();
        if (@$data['caogao'] == 'yes') {
            return $this->create_post_draft((array)$data);
        } else {
            return $this->create_post_publish((array) $data);
        }
    }
    // 存为草稿
    public function create_post_draft(array $data)
    {
        $id = Topic::insertGetId([
            'title' => $data['title'],
            'user_id' => Auth::id(),
            'node_id' => $data['node'],
            'type' => $data['tags'],
            'content' => $data['content'],
            'publish' => "草稿",
            'zhuanzai' => $data['zhuanzai'],
            'html' => _qzy(clean($data['html'], 'topic')),
            'ishtml' => 'yes',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
            'token' => Str::random(15)
        ]);
        if ($id) {
            Curd_UserLog()->Insert("保存文章[" . $data['title'] . "]草稿,ID为:" . $id, Auth::user()->id);
            session()->flash('success', '草稿保存成功!');
        } else {
            session()->flash('danger', '草稿保存失败!');
        }
        return redirect()->back();
    }

    // 发布
    public function create_post_publish(array $data)
    {
        return $this->create_post_publish_insert((array)$data);
    }
    // 确定发布
    private function create_post_publish_insert(array $data)
    {
        // 判断节点
        if (!Node::where('id', $data['node'])->count()) {
            session()->flash('danger', '所选节点不存在');
            return redirect()->back();
        }
        $quanxian = UserGroup::where('id', Auth::user()->user_group)->first()['quanxian'];
        if (!Node::where([['id', $data['node'], ['quanxian', '<=', $quanxian]]])->count()) {
            session()->flash('danger', '无权限使用此节点');
            return redirect()->back();
        }
        // 判断标签
        if ($data['tags'] != 0) {
            if (!Posts_type::where('id', $data['tags'])->count()) {
                session()->flash('danger', '所选标签不存在');
                return redirect()->back();
            }
        }
        $id = Topic::insertGetId([
            'title' => $data['title'],
            'user_id' => Auth::id(),
            'node_id' => $data['node'],
            'type' => $data['tags'],
            'content' => $data['content'],
            'publish' => "发布",
            'zhuanzai' => $data['zhuanzai'],
            'html' => _qzy(clean($data['html'], 'topic')),
            'ishtml' => 'yes',
            'updated_at' => date("Y-m-d H:i:s"),
            'created_at' => date("Y-m-d H:i:s"),
            'token' => Str::random(15)
        ]);
        if ($id) {
            Curd_UserLog()->Insert("发布文章[" . $data['title'] . "],ID为:" . $id, Auth::user()->id);
            user_add_jingyan(Auth::id(), 20, "发布新帖子"); // 加经验
            session()->flash('success', '发布成功!');
            return redirect()->route('index');
        } else {
            session()->flash('danger', '发布失败!');
            return redirect()->back();
        }
    }
    // 草稿视图
    public function draft(Topic $topic)
    {
        $page = $topic->where('publish', '草稿')->paginate(15);
        return view('client.users.draft', ['page' => $page]);
    }
    // 编辑草稿
    public function draft_edit($id, Topic $topic)
    {
        if (!$topic->where(['id' => $id, 'user_id' => Auth::id(), 'publish' => '草稿'])->count()) {
            return abort(401);
        }
        $data = $topic->where(['id' => $id, 'user_id' => Auth::id(), 'publish' => '草稿'])->first();
        return view('posts.create.draft', ['data' => $data]);
    }
    // 草稿提交
    public function draft_post(DarftRequest $request, Topic $topic)
    {
        $data = $request->all();
        if (!$topic->where(['id' => $data['id'], 'user_id' => Auth::id(), 'publish' => '草稿'])->count()) {
            return abort(401);
        }
        if (@$data['caogao'] == 'yes') {
            // 存为草稿
            $topic->where('id', $data['id'])->update([
                'title' => $data['title'],
                'user_id' => Auth::id(),
                'node_id' => $data['node'],
                'type' => $data['tags'],
                'content' => $data['content'],
                'publish' => "草稿",
                'zhuanzai' => $data['zhuanzai'],
                'html' => _qzy(clean($data['html'], 'topic')),
                'ishtml' => 'yes',
            ]);
            Curd_UserLog()->Insert("保存草稿文章:" . $data['title'] . ",ID:" . $data['id'], Auth::user()->id);
            session()->flash('success', '保存成功!');
            return redirect()->back();
        } else {
            // 正式发布
            if ($topic->where([['content', $data['content']], ['id', '!=', $data['id']]])->count()) {
                session()->flash('danger', '与其他帖子内容重复!');
                return redirect()->back();
            }
            if ($topic->where([['title', $data['title']], ['id', '!=', $data['id']]])->count()) {
                session()->flash('danger', '与其他帖子标题重复!');
                return redirect()->back();
            }
            return $this->darft_post_publish_update((array)$data);
        }
    }
    private function darft_post_publish_update(array $data)
    {
        // 判断节点
        if (!Node::where('id', $data['node'])->count()) {
            session()->flash('danger', '所选节点不存在');
            return redirect()->back();
        }
        $quanxian = UserGroup::where('id', Auth::user()->user_group)->first()['quanxian'];
        if (!Node::where([['id', $data['node'], ['quanxian', '<=', $quanxian]]])->count()) {
            session()->flash('danger', '无权限使用此节点');
            return redirect()->back();
        }
        // 判断标签
        if ($data['tags'] != 0) {
            if (!Posts_type::where('id', $data['tags'])->count()) {
                session()->flash('danger', '所选标签不存在');
                return redirect()->back();
            }
        }
        Topic::where('id', $data['id'])->update([
            'title' => $data['title'],
            'user_id' => Auth::id(),
            'node_id' => $data['node'],
            'type' => $data['tags'],
            'content' => $data['content'],
            'publish' => "发布",
            'html' => _qzy(clean($data['html'], 'topic')),
            'ishtml' => 'yes',
            'zhuanzai' => $data['zhuanzai'],
        ]);
        Curd_UserLog()->Insert("发布文章:" . $data['title'] . ",ID:" . $data['id'], Auth::user()->id);
        user_add_jingyan(Auth::id(), 20, "发布新帖子"); // 加经验
        session()->flash('success', '发布成功!');
        return redirect()->route('index');
    }
    // 显示文章
    public function show($id, Topic $topic, PostsLike $pl, PostsComment $postsComment, Report $report, Request $request)
    {
        if ($topic->where([['id', $id], ['publish', '发布']])->count()) {
            $data = $topic->where([['id', $id], ['publish', '发布']])->first(); //文章信息
            $topic->where([['id', $id], ['publish', '发布']])->update([
                'view' => $data['view'] + 1,
                'updated_at' => $data['updated_at']
            ]);
            $data = $topic->with('user', 'nodes', 'tag')->where([['id', $id], ['publish', '发布']])->first(); //文章信息
            if ($report->where(['class' => 'topic', 'posts_id' => $id, 'zhuangtai' => '受理'])->count()) {
                return abort(403, '此帖子已被举报受理');
            }
            baidu_push($request->fullurl()); //推送到百度
            //喜欢
            $like = $pl->where(['posts_id' => $id, 'class' => 'topic'])->get(); //点赞信息
            $like['like_count'] = $pl->where(['posts_id' => $id, 'class' => 'topic', 'type' => 'like'])->count(); //点赞数
            $like['nolike_count'] = $pl->where(['posts_id' => $id, 'class' => 'topic', 'type' => 'nolike'])->count(); //不喜欢数

            // 评论

            $comment = $postsComment
                ->where(['topic_id' => $id])
                ->orderBy('created_at', 'asc')
                ->with('user', 'comment')
                ->paginate(10); // 评论信息 分页
            $comment_count = $postsComment->where(['topic_id' => $id])->count(); // 评论数量

            $shang = Topic::where([['id', '<', $id], ['publish', '发布']])->select('title', 'id')->orderBy('id', 'desc')->first();

            $xia = Topic::where([['id', '>', $id], ['publish', '发布']])->select('title', 'id')->orderBy('id', 'asc')->first();

            $get_topic = [];

            $get_topic['shang'] = $shang;

            $get_topic['xia'] = $xia;

            $huojiang = null;

            if (Auth::id() && $pl->where(['class' => 'topic', 'type' => 'like', 'user_id' => Auth::id(), 'posts_id' => $id])->count()) {
                $ilike = true;
            } else {
                $ilike = false;
            }
            // 判断访问权限
            if (topic_options_content('options_whosee', $data['id'])) {
                $q = true;
                if (Auth::id() && $data['user_id'] == Auth::id()) {
                    $q = false;
                } else {
                    $arr = explode("\r\n", topic_options_content('options_whosee', $data['id']));
                    if (Auth::id() && in_array(Auth::user()->username, $arr)) {
                        $q = false;
                    }
                }
                if (CodeFec_Quanxian()->_(777)) {
                    $q = false;
                }
                if ($q === true) {
                    $data['content'] = "> ## 此贴为指定帖,只有被指定的人可读";
                } else {
                    $data['content'] = $topic->where([['id', $id], ['publish', '发布']])->first()['content'];
                }
            }

            // 判断用户组阅读权限
            if (topic_options_content('options_quanxian', $data['id']) && is_numeric(topic_options_content('options_quanxian', $data['id'])) && topic_options_content('options_quanxian', $data['id']) > 0) {

                if (Auth::id()) {
                    // 通过
                    $yuedu_quanxian = false;
                    if (CodeFec_Quanxian()->_(topic_options_content('options_quanxian', $data['id']))) {
                        $yuedu_quanxian = true;
                    } else {
                        if ($data['user_id'] == Auth::id()) {
                            $yuedu_quanxian = true;
                        }
                        if (CodeFec_Quanxian()->_站长()) {
                            $yuedu_quanxian = true;
                        }
                    }
                } else {
                    $yuedu_quanxian = false;
                }
            } else {
                $yuedu_quanxian = true;
            }

            if (!$yuedu_quanxian) {
                return abort(401);
            }

            return view('posts.show.topic', ['data' => $data, 'like' => $like, 'comment' => $comment, 'get_topic' => $get_topic, 'comment_count' => $comment_count, 'ilike' => $ilike, 'huojiang' => $huojiang]);
        } else {
            return abort(404);
        }
    }
    // 显示文章md
    public function show_md($id, Topic $topic)
    {
        if ($topic->where([['id', $id], ['publish', '发布']])->count()) {
            $data = $topic->where([['id', $id], ['publish', '发布']])->first();
            $content = $topic->where([['id', $id], ['publish', '发布']])->first()['content'];

            //  判断阅读权限

            // 判断用户组阅读权限
            if (topic_options_content('options_quanxian', $data['id']) && is_numeric(topic_options_content('options_quanxian', $data['id'])) && topic_options_content('options_quanxian', $data['id']) > 0) {

                if (Auth::id()) {
                    // 通过
                    $yuedu_quanxian = false;
                    if (CodeFec_Quanxian()->_(topic_options_content('options_quanxian', $data['id']))) {
                        $yuedu_quanxian = true;
                    } else {
                        if ($data['user_id'] == Auth::id()) {
                            $yuedu_quanxian = true;
                        }
                        if (CodeFec_Quanxian()->_站长()) {
                            $yuedu_quanxian = true;
                        }
                    }
                } else {
                    $yuedu_quanxian = false;
                }
            } else {
                $yuedu_quanxian = true;
            }

            if (!$yuedu_quanxian) {
                return Json_Api(401, 'error', 'No permission');
            }

            if (topic_options_content('options_whosee', $data['id'])) {
                $q = true;
                if (Auth::id() && $data['user_id'] == Auth::id()) {
                    $q = false;
                } else {
                    $arr = explode("\r\n", topic_options_content('options_whosee', $data['id']));
                    if (Auth::id() && in_array(Auth::user()->username, $arr)) {
                        $q = false;
                    }
                }
                if (CodeFec_Quanxian()->_(777)) {
                    $q = false;
                }
                if ($q === true) {
                    $content = "> ## 此贴为指定帖,只有被指定的人可读";
                }
            }
            return response($content, 200)
                ->header('Content-Type', 'text/plain');
        } else {
            return abort(404);
        }
    }

    // 编辑文章
    public function edit($id, Topic $topic)
    {
        if (!$topic->where([['id', $id], ['publish', '发布']])->count()) {
            return abort(404);
        }
        $data = $topic->where([['id', $id], ['publish', '发布']])->first(); //帖子数据
        if ($data['user_id'] != Auth::id() && CodeFec_Quanxian()->_(777) === false) {
            return abort(401); //无权限
        }
        // 有权限
        $author_data = User::where('id', $data['user_id'])->first(); //文章作者信息
        $author_quanxian = UserGroup::where('id', $author_data['user_group'])->first()['quanxian'];

        $edit = false; // 编辑权限
        // 如果登陆用户权限大于文章作者权限则赋予编辑权限
        if (UserGroup::where('id', Auth::user()->user_group)->first()['quanxian'] > $author_quanxian) {
            $edit = true;
        }
        if ($data['user_id'] == Auth::id()) {
            $edit = true;
        }

        // 管理员操作权限
        if (CodeFec_Quanxian()->_(777)) {
            $admin_edit = true;
        } else {
            $admin_edit = true;
        }

        return view('posts.edit.topic', ['data' => $data, 'edit' => $edit, 'admin_edit' => $admin_edit]);
    }

    // 保存修改
    public function edit_save(EditSave $request, Topic $topic)
    {
        $data = $request->all();
        $id = $data['id'];
        if (!$topic->where([['id', $id], ['publish', '发布']])->count()) {
            return abort(404);
        }
        $datas = $topic->where([['id', $id], ['publish', '发布']])->first(); //帖子数据
        if ($datas['user_id'] != Auth::id() && CodeFec_Quanxian()->_(777) === false) {
            return abort(401); //无权限
        }
        // 正式发布
        if ($topic->where([['content', $data['content']], ['id', '!=', $data['id']]])->count()) {
            session()->flash('danger', '与其他帖子内容重复!');
            return redirect()->back();
        }
        if ($topic->where([['title', $data['title']], ['id', '!=', $data['id']]])->count()) {
            session()->flash('danger', '与其他帖子标题重复!');
            return redirect()->back();
        }
        return $this->edit_save_post_publish((array)$data);
    }
    private function edit_save_post_publish(array $data)
    {
        // 判断节点
        if (!Node::where('id', $data['node'])->count()) {
            session()->flash('danger', '所选节点不存在');
            return redirect()->back();
        }
        $quanxian = UserGroup::where('id', Auth::user()->user_group)->first()['quanxian'];
        if (!Node::where([['id', $data['node'], ['quanxian', '<=', $quanxian]]])->count()) {
            session()->flash('danger', '无权限使用此节点');
            return redirect()->back();
        }
        // 判断标签
        if ($data['tags'] != 0) {
            if (!Posts_type::where('id', $data['tags'])->count()) {
                session()->flash('danger', '所选标签不存在');
                return redirect()->back();
            }
        }
        Topic::where('id', $data['id'])->update([
            'title' => $data['title'],
            'node_id' => $data['node'],
            'type' => $data['tags'],
            'content' => $data['content'],
            'publish' => "发布",
            'zhuanzai' => $data['zhuanzai'],
            'html' => _qzy(clean($data['html'], 'topic')),
            'ishtml' => 'yes',
        ]);
        Curd_UserLog()->Insert("修改文章:" . $data['title'] . ",ID:" . $data['id'], Auth::user()->id);
        session()->flash('success', '修改成功!');
        return redirect()->route('topic.show', ['id' => $data['id']]);
    }
}
