@extends('layouts.app')
@section('title', Str::limit($data['title'], 50, '...'))
@section('description', Str::limit(descriptions($data['content']), 120, '...'))
@section('keywords', Curd_Options()->Read_name('web_name', 'setting', 'CodeFec') . ',' .
    Curd_Options()->Read_name('web_name', 'setting', 'CodeFec') . '社区,' . Curd_Options()->Read_name('web_name', 'setting',
    'CodeFec') . '论坛,' . Helpers()->node_id($data['node_id'])['name'] . ',' . Str::limit($data['title'], 50, '...'))

@section('content')
    <div class="container">
        <div class="row justify-content">
            <div class="col-md-9">
                <div class="row row-cards">
                    <div class="col-md-12">
                        <div class="card">
                            @if ($data['zhiding'])
                                <div data-bs-toggle="tooltip" data-bs-placement="top" title="置顶帖子" class="ribbon bg-red">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-brand-tinder" width="24" height="24"
                                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M18.918 8.174c2.56 4.982 .501 11.656 -5.38 12.626c-7.702 1.687 -12.84 -7.716 -7.054 -13.229c.309 -.305 1.161 -1.095 1.516 -1.349c0 .528 .27 3.475 1 3.167c3 0 4 -4.222 3.587 -7.389c2.7 1.411 4.987 3.376 6.331 6.174z">
                                        </path>
                                    </svg>
                                </div>
                            @endif
                            @if ($data['jing'])
                                <div data-bs-toggle="tooltip" data-bs-placement="top" title="精华文章" class="ribbon bg-green"
                                    style="margin-top: 35px">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-droplet"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197 -8l-5.2 8z"></path>
                                    </svg>
                                </div>
                            @endif
                            <div class="card-body">
                                <h1>
                                    @if(get_options_setting('view_topic_title_node_show')!="关闭")
                                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="所属节点"
                                    href="{{ route('node', ['ename' => $data->nodes->ename]) }}"><span
                                        class="avatar avatar-sm"
                                        style="background-image: url({{ $data->nodes->icon }})"></span></a>
                                    @endif
                                    @if(get_options_setting('view_topic_title_tag_show')!="关闭")
                                    @if ($data['type'])<a data-bs-toggle="tooltip"
                                            data-bs-placement="top" title="所属标签"
                                            href="{{ route('tags', ['ename' => $data->tag->ename]) }}"><span
                                                class="badge bg-{{ $data->tag->color }}">{{ $data->tag->name }}</span></a>
                                    @endif
                                    @endif
                                    {{ $data['title'] }}
                                </h1>
                                <hr>
                                <div id="topic-content" class="vditor-reset markdown" style="margin-top:-25px">
                                    @if ($data->ishtml=="yes")
                                    {!! $data->html !!}
                                    @else
                                    {!! Helpers()->markdowntohtml($data['content']) !!}
                                    @endif
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    

                    {{-- 转载 --}}
                    @if ($data['zhuanzai'])
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="title">转载</h3>
                                    本文转自: <a href="{{ $data['zhuanzai'] }}">{{ $data['zhuanzai'] }}</a>
                                </div>
                            </div>
                        </div>
                    @endif

                    {{-- 作者信息 --}}
                    {{-- <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row g-2 align-items-center">
                                    <div class="col-auto">
                                        <span class="avatar avatar-lg"
                                            style="background-image: url({{ user_avatars(@$data->user->avatar,$data->user->email) }})"></span>
                                    </div>
                                    <div class="col">
                                        <h4 class="card-title m-0">
                                            <a href="{{route('public.user.about',['id' => $data['user_id']])}}">{{ Helpers()->User_id($data['user_id'])['username'] }}</a>
                                        </h4>
                                        <div class="text-muted">

                                        </div>
                                        <div class="small mt-1">
                                            <span class="badge bg-green"></span> Online
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <a href="#" class="btn">
                                            Subscribe
                                        </a>
                                    </div>
                                    <div class="col-auto">
                                        <div class="dropdown">
                                            <a href="#" class="card-dropdown" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                </svg>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a href="#" class="dropdown-item">Import</a>
                                                <a href="#" class="dropdown-item">Export</a>
                                                <a href="#" class="dropdown-item">Download</a>
                                                <a href="#" class="dropdown-item">Another action</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> --}}

                    
                    
                    
                    

                </div>
            </div>

            <div class="col-md-3" style="margin-top:5px">

                <div class="row row-cards rd">

                    <div class="col-md-12 sticky" style="top: 105px">
                        <div class="row row-cards">
                            {{-- 作者信息 --}}
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="mb-3">
                                            <span class="avatar avatar-xl avatar-rounded"
                                                style="background-image: url({{ user_avatars($data->user->email, $data->user->avatar) }})"></span>
                                        </div>
                                        <div class="card-title mb-1">
                                            {{ $data->user->username }}
                                        </div>
                                        <div class="text-muted">
                                            <a
                                                href="{{ route('public.users.group.data', ['ename' => Curd_UserGroup()->Read_id($data->user->user_group)['ename']]) }}"><span
                                                    class="badge bg-{{ Curd_UserGroup()->Read_id($data->user->user_group)['color'] }}">{{ Curd_UserGroup()->Read_id($data->user->user_group)['name'] }}</span></a>
                                            {!! user_dengji_show($data->user->lv) !!}
                                            @if ($data->user->zhuangtai == '封禁')
                                            <span class="badge bg-red">已封禁</span>
                                        @endif
                                        </div>
                                        
                                    </div>
                                    {{-- 签名 --}}
                                    @if (user_options($data['user_id'], 'show_topic_qianming') && $data->user->qianming)
                                        <div class="col-md-12">
                                            <div class="hr-text text-blue" style="margin-bottom:10px;margin-top:15px">
                                                签名
                                            </div>
                                            <div class="markdown overflow-auto" style="max-height: 80px">
                                                {!! Helpers()->markdowntohtml($data->user->qianming) !!}
                                            </div>
                                        </div>
                                    @endif
                                    <div class="col-md-12">
                                        <a href="{{ route('public.user.about', ['id' => $data['user_id']]) }}"
                                            class="card-btn">关于作者</a>
                                    </div>
                                </div>
                            </div>
                            {{-- 帖子信息 --}}
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">
                                            关于此帖
                                        </h3>
                                        @if (Auth::id() == $data['user_id'])
                                            <div class="card-actions">
                                                <a href="{{ route('topic.edit', ['id' => $data['id']]) }}">
                                                    编辑<svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24"
                                                        height="24" viewBox="0 0 24 24" stroke-width="2"
                                                        stroke="currentColor" fill="none" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path
                                                            d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                                        <line x1="16" y1="5" x2="19" y2="8" />
                                                    </svg>
                                                </a>
                                            </div>
                                        @else
                                            @if (CodeFec_Quanxian()->_(777))
                                                <div class="card-actions">
                                                    <a href="{{ route('topic.edit', ['id' => $data['id']]) }}">
                                                        编辑<svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1"
                                                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                                            stroke="currentColor" fill="none" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path
                                                                d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                                            <line x1="16" y1="5" x2="19" y2="8" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            @endif
                                        @endif
                                    </div>
                                    <div class="card-body">
                                        <dl class="row">
                                            <dt class="col-5">创建时间:</dt>
                                            <dd class="col-7">{{ $data['created_at'] }}</dd>
                                            @if ($data['updated_at'])
                                                <dt class="col-5">更新时间:</dt>
                                                <dd class="col-7">{{ $data['updated_at'] }}</dd>
                                            @endif
                                            <dt class="col-5">文章浏览:</dt>
                                            <dd class="col-7">{{ $data['view'] }}</dd>
                                            <dt class="col-5">赞同人数:</dt>
                                            <dd class="col-7">{{ $like['like_count'] }}</dd>
                                            <dt class="col-5">反对人数:</dt>
                                            <dd class="col-7">{{ $like['nolike_count'] }}</dd>
                                            <dt class="col-5">评论数量:</dt>
                                            <dd class="col-7">{{ $comment_count }}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            {{-- 节点列表 --}}
                            @include('home.wid.node')
                            {{-- 标签 --}}

                            @include('home.wid.tags')
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

@endsection


@section('scripts')
    <script src="{{ asset('js/vditor/index.min.js') }}"></script>
    <script>
        @if ($data->ishtml=="yes")
            var jiexitopic = "no";
        @else
        var jiexitopic = "yes";
        @endif
        var uploadurl = "{{ route('reply.upimage') }}?_token={{ csrf_token() }}",
            image_up = "{{ route('reply.upimage') }}?_token={{ csrf_token() }}",
            token = "{{ csrf_token() }}";
        var topic_md_url = "{{ route('topic.show.md', ['id' => $data['id']]) }}";
        var comment_list_url = "{{ route('api.open.topic.comment.list',['topic_id' => $data->id]) }}"
        var comment_caina = "{{ route('api.topic.comment.caina') }}";

    </script>
    @if (Auth::id())
        <script src="{{ mix('js/reply/topic.js') }}"></script>
    @endif
    <script src="{{ mix('js/show/topic.js') }}"></script>
@endsection

@section('css')
    <link rel="stylesheet" href="{{ asset('js/vditor/index.css') }}">
@endsection
