<div class="card-tabs border-0">
    <!-- Cards navigation -->
    <ul class="nav nav-tabs">
        <li class="nav-item"><a href="#tab-borderless-search-topic-1" class="nav-link @if($t=="topic-title") active @endif"
                data-bs-toggle="tab">搜索标题</a></li>
        <li class="nav-item"><a href="#tab-borderless-search-topic-2" class="nav-link @if($t=="topic-content") active @endif" data-bs-toggle="tab">搜索内容</a>
        </li>
    </ul>
    <div class="tab-content">
        <!-- Content of card #1 -->
        <div id="tab-borderless-search-topic-1" class="card tab-pane @if($t=="topic-title") active show @endif">
            <div class="card-body">
                <div class="card-title">标题包含{{ $q }}的帖子</div>
                <p>
                    @if ($data['topic']['title']->count())
                        <div class="list-group list-group-flush list-group-hoverable">
                            @foreach ($data['topic']['title'] as $key => $value)
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <a class="avatar avatar-rounded"
                                                style="background-image: url({{ user_avatars($value->user->email, $value->user->avatar) }})"
                                                data-bs-toggle="tooltip" data-bs-placement="top" title="作者信息"
                                                href="{{ route('public.user.about', ['id' => $value->user->id]) }}">
                                            </a>
                                        </div>

                                        {{-- 指定可见帖子 --}}

                                        @if (topic_options_content('options_whosee', $value['id']))
                                            <div data-bs-toggle="tooltip" data-bs-placement="top" title="指定可见"
                                                class="col-auto d-none d-md-flex">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="icon icon-tabler icon-tabler-comet" width="24" height="24"
                                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path
                                                        d="M15.5 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z">
                                                    </path>
                                                    <line x1="4" y1="4" x2="11" y2="11"></line>
                                                    <line x1="9" y1="4" x2="12.5" y2="7.5"></line>
                                                    <line x1="4" y1="9" x2="7.5" y2="12.5"></line>
                                                </svg>
                                            </div>
                                        @endif

                                        {{-- 标签 --}}
                                        @if (get_options_setting('view_home_title_tag_show') != '关闭')
                                            @if ($value['type'])
                                                <div class="col-auto d-none d-md-flex"><a data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="标签"
                                                        class="badge bg-{{ $value->tag->color }}"
                                                        href="{{ route('tags', ['ename' => $value->tag->ename]) }}">{{ $value->tag->name }}</a>
                                                </div>
                                            @endif
                                        @endif
                                        {{-- 节点 --}}
                                        @if (get_options_setting('view_home_title_node_show') != '关闭')
                                            <div class="col-auto">
                                                <a data-bs-toggle="tooltip" data-bs-placement="top"
                                                    title="所属节点:{{ $value->nodes->name }}"
                                                    href="{{ route('node', ['ename' => $value->nodes->ename]) }}"><span
                                                        class="avatar avatar-xs"
                                                        style="background-image: url({{ $value->nodes->icon }})"></span></a>
                                            </div>
                                        @endif
                                        <div class="col">
                                            <a href="{{ route('topic.show', ['id' => $value['id']]) }}"
                                                data-bs-toggle="tooltip" data-bs-placement="left" title="查看文章"
                                                class="text-body d-block">{{ Str::limit($value->title, 50, '...') }}</a>
                                            <small class="d-block text-muted text-truncate mt-n1">由
                                                {{ $value->user->username }} 发表于
                                                {{ format_date($value['created_at']) }}
                                                | 最后活动: {{ $value['updated_at'] }}
                                            </small>
                                        </div>
                                        <div class="col-auto">
                                            <span data-bs-toggle="tooltip" data-bs-placement="top"
                                                title="浏览量:{{ $value['view'] }}">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="icon icon-tabler icon-tabler-eye" width="24" height="24"
                                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <circle cx="12" cy="12" r="2"></circle>
                                                    <path
                                                        d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7">
                                                    </path>
                                                </svg>
                                                {{ $value['view'] }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="col-6">
                            无内容
                        </div>
                    @endif
                </p>
                {{ $data['topic']['title']->appends(['q' => $q, '_token' => csrf_token(),'t' => 'topic-title','c' => 'topic'])->links() }}
            </div>
        </div>
        <!-- Content of card #2 -->
        <div id="tab-borderless-search-topic-2" class="card tab-pane @if($t=="topic-content") active show @endif">
            <div class="card-body">
                <div class="card-title">内容包含{{ $q }}的帖子</div>
                <p>
                    @if ($data['topic']['content']->count())
                        <div class="list-group list-group-flush list-group-hoverable">
                            @foreach ($data['topic']['content'] as $key => $value)
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <a class="avatar avatar-rounded"
                                                style="background-image: url({{ user_avatars($value->user->email, $value->user->avatar) }})"
                                                data-bs-toggle="tooltip" data-bs-placement="top" title="作者信息"
                                                href="{{ route('public.user.about', ['id' => $value->user->id]) }}">
                                            </a>
                                        </div>

                                        {{-- 指定可见帖子 --}}

                                        @if (topic_options_content('options_whosee', $value['id']))
                                            <div data-bs-toggle="tooltip" data-bs-placement="top" title="指定可见"
                                                class="col-auto d-none d-md-flex">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="icon icon-tabler icon-tabler-comet" width="24" height="24"
                                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path
                                                        d="M15.5 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z">
                                                    </path>
                                                    <line x1="4" y1="4" x2="11" y2="11"></line>
                                                    <line x1="9" y1="4" x2="12.5" y2="7.5"></line>
                                                    <line x1="4" y1="9" x2="7.5" y2="12.5"></line>
                                                </svg>
                                            </div>
                                        @endif

                                        {{-- 标签 --}}
                                        @if (get_options_setting('view_home_title_tag_show') != '关闭')
                                            @if ($value['type'])
                                                <div class="col-auto d-none d-md-flex"><a data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="标签"
                                                        class="badge bg-{{ $value->tag->color }}"
                                                        href="{{ route('tags', ['ename' => $value->tag->ename]) }}">{{ $value->tag->name }}</a>
                                                </div>
                                            @endif
                                        @endif
                                        {{-- 节点 --}}
                                        @if (get_options_setting('view_home_title_node_show') != '关闭')
                                            <div class="col-auto">
                                                <a data-bs-toggle="tooltip" data-bs-placement="top"
                                                    title="所属节点:{{ $value->nodes->name }}"
                                                    href="{{ route('node', ['ename' => $value->nodes->ename]) }}"><span
                                                        class="avatar avatar-xs"
                                                        style="background-image: url({{ $value->nodes->icon }})"></span></a>
                                            </div>
                                        @endif
                                        <div class="col">
                                            <a href="{{ route('topic.show', ['id' => $value['id']]) }}"
                                                data-bs-toggle="tooltip" data-bs-placement="left" title="查看文章"
                                                class="text-body d-block">{{ Str::limit($value->title, 50, '...') }}</a>
                                            <small class="d-block text-muted text-truncate mt-n1">由
                                                {{ $value->user->username }} 发表于
                                                {{ format_date($value['created_at']) }}
                                                | 最后活动: {{ $value['updated_at'] }}
                                            </small>
                                        </div>
                                        <div class="col-auto">
                                            <span data-bs-toggle="tooltip" data-bs-placement="top"
                                                title="浏览量:{{ $value['view'] }}">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="icon icon-tabler icon-tabler-eye" width="24" height="24"
                                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <circle cx="12" cy="12" r="2"></circle>
                                                    <path
                                                        d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7">
                                                    </path>
                                                </svg>
                                                {{ $value['view'] }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="col-6">
                            无内容
                        </div>
                    @endif
                </p>
                {{ $data['topic']['content']->appends(['q' => $q, '_token' => csrf_token(),'t' => 'topic-content','c' => 'topic'])->links() }}
            </div>
        </div>
    </div>
</div>
