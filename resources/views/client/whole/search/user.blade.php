<div class="card-tabs border-0">
    <!-- Cards navigation -->
    <ul class="nav nav-tabs">
        <li class="nav-item"><a href="#tab-borderless-search-user-1" class="nav-link @if($t=="user-username") active @endif"
                data-bs-toggle="tab">搜索用户名</a></li>
        <li class="nav-item"><a href="#tab-borderless-search-user-2" class="nav-link @if($t=="user-qianming") active @endif" data-bs-toggle="tab">搜索签名</a>
        </li>
    </ul>
    <div class="tab-content">
        <!-- Content of card #1 -->
        <div id="tab-borderless-search-user-1" class="card tab-pane @if($t=="user-username") active show @endif">
            <div class="card-body">
                <div class="card-title">用户名包含{{ $q }}的用户</div>
                <p>
                <div class="row row-cards">
                    @if ($data['user']['username']->count())
                        @foreach ($data['user']['username'] as $value)
                            <div class="col-md-6 col-lg-3">
                                <div class="card">
                                    <div class="card-body p-4 text-center">
                                        <span class="avatar avatar-xl mb-3 avatar-rounded"
                                            style="background-image: url({{ user_avatars($value->email, $value->avatar) }})"></span>
                                        <h3 class="m-0 mb-1"><a
                                                href="{{ route('public.user.about', ['id' => $value['id']]) }}">{{ $value['username'] }}</a>
                                        </h3>
                                        <div class="text-muted">本站第{{ $value['id'] }}个会员</div>
                                        <div class="text-muted">加入时间:{{ $value['created_at'] }}</div>
                                        <div class="mt-3">
                                            <a
                                                href="{{ route('public.users.group.data', ['ename' => Curd_UserGroup()->Read_id($value['user_group'])['ename']]) }}">
                                                <span
                                                    class="badge bg-{{ Curd_UserGroup()->Read_id($value['user_group'])['color'] }}">{{ Curd_UserGroup()->Read_id($value['user_group'])['name'] }}</span>
                                            </a>
                                            @if ($value->zhuangtai == '封禁')
                                                <span class="badge bg-red">已封禁</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <div class="col-md-12">
                            无结果
                        </div>
                    @endif
                </div>
                </p>
                {{ $data['user']['username']->appends(['q' => $q, '_token' => csrf_token(), 't' => 'user-username', 'c' => 'user'])->links() }}
            </div>
        </div>
        <!-- Content of card #2 -->
        <div id="tab-borderless-search-user-2" class="card tab-pane @if($t=="user-qianming") active show @endif">
            <div class="card-body">
                <div class="card-title">签名包含{{ $q }}的用户</div>
                <p>
                <div class="row row-cards">
                    @if ($data['user']['qianming']->count())
                        @foreach ($data['user']['qianming'] as $value)
                            <div class="col-md-6 col-lg-3">
                                <div class="card">
                                    <div class="card-body p-4 text-center">
                                        <span class="avatar avatar-xl mb-3 avatar-rounded"
                                            style="background-image: url({{ user_avatars($value->email, $value->avatar) }})"></span>
                                        <h3 class="m-0 mb-1"><a
                                                href="{{ route('public.user.about', ['id' => $value['id']]) }}">{{ $value['username'] }}</a>
                                        </h3>
                                        <div class="text-muted">本站第{{ $value['id'] }}个会员</div>
                                        <div class="text-muted">加入时间:{{ $value['created_at'] }}</div>
                                        <div class="mt-3">
                                            <a
                                                href="{{ route('public.users.group.data', ['ename' => Curd_UserGroup()->Read_id($value['user_group'])['ename']]) }}">
                                                <span
                                                    class="badge bg-{{ Curd_UserGroup()->Read_id($value['user_group'])['color'] }}">{{ Curd_UserGroup()->Read_id($value['user_group'])['name'] }}</span>
                                            </a>
                                            @if ($value->zhuangtai == '封禁')
                                                <span class="badge bg-red">已封禁</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <div class="col-md-12">
                            无结果
                        </div>
                    @endif
                </div>
                </p>
                {{ $data['user']['qianming']->appends(['q' => $q, '_token' => csrf_token(), 't' => 'user-qianming', 'c' => 'user'])->links() }}
            </div>
        </div>
    </div>
</div>
