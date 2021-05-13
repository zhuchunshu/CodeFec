@extends('layouts.app')
@section('title', '小黑屋')
@section('description', 'CodeFec全部已注册会员列表信息')
@section('content')
    <div class="container">
        <!-- Page title -->
        <div class="page-header d-print-none">
            <div class="row align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        被封禁会员列表
                    </h2>
                </div>
            </div>
        </div>
        <div class="row row-cards">
            @if ($page->count())
                @foreach ($page as $key => $value)
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
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">
                                无结果
                            </h3>
                        </div>
                    </div>
                </div>
            @endif
            {{ $page }}
        </div>
    </div>
@endsection
