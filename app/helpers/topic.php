<?php

use App\Models\PostsComment as ModelsPostsComment;
use App\Models\User;
use App\Models\PostsLike;
use App\Models\Topic_Options;
use App\Models\UserGroup;

/**
 * 通过id获取帖子被喜欢人数
 *
 * @param integer $topic_id
 * @return void
 */
function topic_like_count(int $topic_id){
    return PostsLike::where(['class'=>'topic','posts_id'=>$topic_id,'type'=>'like'])->count();
}
/**
 * 通过id获取帖子被喜欢人信息
 *
 * @param integer $topic_id
 * @return void
 */
function topic_like_get(int $topic_id){
    return PostsLike::where(['class'=>'topic','posts_id'=>$topic_id,'type'=>'like'])->get();
}



/**
 * 通过id获取帖子不喜欢人数
 *
 * @param integer $topic_id
 * @return void
 */
function topic_nolike_count(int $topic_id){
    return PostsLike::where(['class'=>'topic','posts_id'=>$topic_id,'type'=>'nolike'])->count();
}
/**
 * 通过id获取帖子不喜欢人信息
 *
 * @param integer $topic_id
 * @return void
 */
function topic_nolike_get(int $topic_id){
    return PostsLike::where(['class'=>'topic','posts_id'=>$topic_id,'type'=>'nolike'])->get();
}

function topic_report(array $data){
    foreach (UserGroup::where('quanxian','>=','777')->get() as $value) {
        foreach (User::where('user_group',$value['id'])->get() as $values) {
            user_notice_send(
                $values['id'],
                $data['content'],
                '有人发布了新的举报内容需要您审核',
                route('topic.report.show',['id'=>$data['report_id']])
            );
        }
    }
}

function topic_options_count($type,$topic_id){
    return Topic_Options::where(['type' => $type,'topic_id' => $topic_id])->count();
}

function topic_options_content($type,$topic_id){
    if(topic_options_count($type,$topic_id)){
        return Topic_Options::where(['type' => $type,'topic_id' => $topic_id])->first()['content'];
    }else{
        return false;
    }
}

function topic_options($type,$topic_id,$content){
    if(topic_options_count($type,$topic_id)){
        // 更新
        Topic_Options::where(['type' => $type,'topic_id' => $topic_id])->update([
            'type' => $type,
            'content' => $content
        ]);
        return true;
    }else{
        // 新增
        $id = Topic_Options::insertGetId([
            'topic_id' => $topic_id,
            'type' => $type,
            'content' => $content,
            'created_at' => date("Y-m-d H:i:s")
        ]);
        return $id;
    }
}

function topic_hash_user_comment($user_id,$topic_id){
    if(ModelsPostsComment::where(['user_id' => $user_id, 'topic_id' => $topic_id])->count()){
        return true;
    }else{
        return false;
    }
}

function topic_comment_count($topic_id){
    return ModelsPostsComment::where(['topic_id' => $topic_id])->count();
}