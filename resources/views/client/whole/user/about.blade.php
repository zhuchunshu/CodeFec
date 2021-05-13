@extends('layouts.app')
@section('title', '「' . $data['username'] . '」的相关信息')
@section('description', '为您展示关于' . $data['username'] . '的相关介绍信息')
@section('content')
    <div class="container">
        <div class="row justify-content-center row-cards">
            <div class="col-md-10">
                <div class="card card-stacked">
                    <div class="card-body">
                        <div class="row g-2 align-items-center">
                            <div class="col-auto">
                                <span class="avatar avatar-lg"
                                    style="background-image: url({{ user_avatars($data['email'],$data['avatar']) }})"></span>
                            </div>
                            <div class="col">
                                <h4 class="card-title m-0">
                                    <a href="@if ($data['website']) {{ $data['website'] }}@else # @endif">{{ $data['username'] }}</a>
                                    {{-- 用户组 --}}
                                    <span
                                        class="badge bg-{{ Curd_UserGroup()->Read_id($data['user_group'])['color'] }}">{{ Curd_UserGroup()->Read_id($data['user_group'])['name'] }}</span>
                                    {{-- 等级 --}}
                                    {!! user_dengji_show($data['lv']) !!}
                                    @if ($data->zhuangtai=="封禁")
                                    <span
                                    class="badge bg-red">已封禁</span>
                                    @endif
                                </h4>
                                <div class="text-muted">
                                    @if ($data['address'])<svg
                                            xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="12" cy="11" r="3" />
                                            <path
                                                d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                        </svg>{{ $data['address'] }}@endif
                                    @if ($data['gongsi'])<svg
                                            xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <line x1="3" y1="21" x2="21" y2="21" />
                                            <line x1="9" y1="8" x2="10" y2="8" />
                                            <line x1="9" y1="12" x2="10" y2="12" />
                                            <line x1="9" y1="16" x2="10" y2="16" />
                                            <line x1="14" y1="8" x2="15" y2="8" />
                                            <line x1="14" y1="12" x2="15" y2="12" />
                                            <line x1="14" y1="16" x2="15" y2="16" />
                                            <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
                                        </svg>{{ $data['gongsi'] }}@if ($data['zhiwei'])
                                            #{{ $data['zhiwei'] }}@endif
                                    @endif
                                    发帖总量:{{ Curd_Topic()->user_count($data['id']) }}
                                    共发布了{{ Curd_PostsComment()->user_all_count($data['id']) }}条评论,
                                    @if (user_options($data['id'], 'show_email'))
                                        邮箱: <a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a>
                                    @else
                                        @if (Auth::id() && $data['id'] == Auth::id())
                                            邮箱: <a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a>
                                        @else
                                            @if (CodeFec_Quanxian()->_(777))
                                                邮箱: <a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a>
                                            @endif
                                        @endif
                                    @endif
                                </div>
                                {{-- <div class="small mt-1">
                                    <span class="badge bg-green"></span> Online
                                </div> --}}
                            </div>
                            @if ($caozuo)
                                @if ($data['zhuangtai'] != '封禁')
                                    <div class="col-auto">
                                        <form style="white-space: nowrap;" onsubmit="return confirm('您确定要封禁此用户吗?');"
                                            action="{{ route('admin.users.fengjin') }}" method="POST">
                                            @csrf
                                            <input type="hidden" name="id" value="{{ $data['id'] }}">
                                            <button type="submit" class="btn btn-dark">
                                                封禁
                                            </button>
                                        </form>
                                    </div>
                                @else
                                    <div class="col-auto">
                                        <form style="white-space: nowrap;" onsubmit="return confirm('您确定要解封此用户吗?');"
                                            action="{{ route('admin.users.jiefeng') }}" method="POST">
                                            @csrf
                                            <input type="hidden" name="id" value="{{ $data['id'] }}">
                                            <button type="submit" class="btn btn-primary">
                                                解封
                                            </button>
                                        </form>
                                    </div>
                                @endif
                                <div class="col-auto">
                                    <div class="dropdown">
                                        <a href="#" class="card-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
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
                                            <a href="{{ route('admin.users.edit', ['id' => $data['id']]) }}"
                                                data-toggle="tooltip" data-placement="top" title="修改此用户" class="dropdown-item">修改</a>
                                            @if(CodeFec_Quanxian()->_(777))
                                            <a href="{{ route('admin.users.see.log',['user_id'=>$data['id']]) }}" data-toggle="tooltip" data-placement="top" title="用户操作日志" class="dropdown-item">操作日志</a>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-10">
                <div class="card card-stacked">
                    <div class="card-body markdown">
                        <h3 class="card-title">签名</h3>
                        {!! Helpers()->markdowntohtml($data['qianming']) !!}
                    </div>
                </div>
            </div>
            <div class="col-md-10">
                <div class="card card-stacked">
                    <div class="card-body">
                        <h3 class="card-title">详细信息</h3>
                        <div class="mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <polyline points="12 7 12 12 15 15" />
                            </svg>
                            注册日期: <strong>{{ $data['created_at'] }}</strong>
                        </div>
                        <div class="mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <polyline points="12 7 12 12 15 15" />
                            </svg>
                            最后更新: <strong>{{ $data['updated_at'] }}</strong>
                        </div>
                        @if ($data['gongsi'] && $data['zhiwei'])
                            <div class="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <rect x="3" y="7" width="18" height="13" rx="2" />
                                    <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="12" y1="12" x2="12" y2="12.01" />
                                    <path d="M3 13a20 20 0 0 0 18 0" />
                                </svg>
                                工作: <strong>{{ $data['gongsi'] }}#{{ $data['zhiwei'] }}</strong>
                            </div>
                        @endif
                        @if ($data['address'])
                            <div class="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="12" cy="11" r="3" />
                                    <path
                                        d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                </svg>
                                From: <strong>
                                    {{ $data['address'] }}</strong>
                            </div>
                        @endif
                        @if ($data['website'])
                            <div class="mb-2">
                                <i class="bi bi-link-45deg"></i>
                                网站: <strong><a href="{{ $data['website'] }}">{{ $data['website'] }}</a></strong>
                            </div>
                        @endif
                        @if ($data['telegram'])
                            <div class="mb-2">
                                <i class="bi bi-telegram"></i>
                                <strong><a
                                        href="https://t.me/{{ $data['telegram'] }}">{{ '@' . $data['telegram'] }}</a></strong>
                            </div>
                        @endif
                        @if ($data['qq'])
                            <div class="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                                    <line x1="8" y1="9" x2="16" y2="9" />
                                    <line x1="8" y1="13" x2="14" y2="13" />
                                </svg>
                                QQ: <strong>{{ $data['qq'] }}</strong>
                            </div>
                        @endif
                        @if ($data['wechat'])
                            <div class="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                                    <line x1="8" y1="9" x2="16" y2="9" />
                                    <line x1="8" y1="13" x2="14" y2="13" />
                                </svg>
                                微信: <strong>{{ $data['wechat'] }}</strong>
                            </div>
                        @endif
                        <a href="{{ route('public.user.topic.list',['username' => $data->username]) }}" class="btn btn-indigo">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-presentation" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="3" y1="4" x2="21" y2="4"></line>
                                <path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10"></path>
                                <line x1="12" y1="16" x2="12" y2="20"></line>
                                <line x1="9" y1="20" x2="15" y2="20"></line>
                                <path d="M8 12l3 -3l2 2l3 -3"></path>
                             </svg>
                            TA的帖子
                        </a>
                        <a href="{{ route('public.user.comment.list',['username' => $data->username]) }}" class="btn btn-indigo">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
                                <line x1="12" y1="12" x2="12" y2="12.01"></line>
                                <line x1="8" y1="12" x2="8" y2="12.01"></line>
                                <line x1="16" y1="12" x2="16" y2="12.01"></line>
                             </svg>
                            TA的评论
                        </a>
                    </div>
                </div>
            </div>
            @if (Curd_Topic()->user_get_count($data['id']))
                <div class="col-md-10">
                    <div class="card">
                        <div class="card-header">
                            <h3>最新帖子</h3>
                        </div>
                        <div class="card-body">
                            @foreach (Curd_Topic()->user_get_num($data['id'], 5) as $key => $value)
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="作者信息"
                                                href="{{ route('public.user.about', ['id' => $value['user_id']]) }}">
                                                <span class="avatar avatar-rounded"
                                                    style="background-image: url({{ user_avatars($data->email,$data->avatar) }})"></span>
                                            </a>
                                        </div>
                                        {{-- 标签 --}}
                                        @if ($value['type'] != 0)
                                            <div class="col-auto"><a data-bs-toggle="tooltip" data-bs-placement="top"
                                                    title="标签"
                                                    class="badge bg-{{ Helpers()->tags_id($value['type'])['color'] }}"
                                                    href="{{ route('tags', ['ename' => Helpers()->tags_id($value['type'])['ename']]) }}">{{ Helpers()->tags_id($value['type'])['name'] }}</a>
                                            </div>
                                        @endif
                                        {{-- 节点 --}}
                                        <div class="col-auto">
                                            <a data-bs-toggle="tooltip" data-bs-placement="top"
                                                title="所属节点:{{ Helpers()->node_id($value['node_id'])['name'] }}"
                                                href="{{ route('node', ['ename' => Helpers()->node_id($value['node_id'])['ename']]) }}"><span
                                                    class="avatar avatar-xs"
                                                    style="background-image: url({{ Helpers()->node_id($value['node_id'])['icon'] }})"></span></a>
                                        </div>
                                        <div class="col text-truncate">
                                            <a href="{{ route('topic.show', ['id' => $value['id']]) }}"
                                                data-bs-toggle="tooltip" data-bs-placement="left" title="查看文章"
                                                class="text-body d-block">{{ $value['title'] }}</a>
                                            <small
                                                class="d-block text-muted text-truncate mt-n1">由{{ $value->user->username }}发布于:{{ $value['created_at'] }}</small>
                                        </div>
                                        {{-- <div class="col-auto">
                                    <button class="switch-icon switch-icon-flip" data-bs-toggle="switch-icon">
                                        <span class="switch-icon-a text-muted">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path
                                                    d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3">
                                                </path>
                                            </svg>
                                        </span>
                                        <span class="switch-icon-b text-facebook">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path
                                                    d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3">
                                                </path>
                                            </svg>
                                        </span>
                                    </button>
                                </div> --}}
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection
