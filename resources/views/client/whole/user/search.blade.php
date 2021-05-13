@extends('layouts.app')
@section('title', '本站会员搜索结果')
@section('description', 'CodeFec会员搜索结果')
@section('content')
    <div class="container">
        <!-- Page title -->
        <div class="page-header d-print-none">
            <div class="row align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        搜索结果
                    </h2>
                    <div class="text-muted mt-1">{{ $page->currentPage() }}-{{ $page->lastPage() }} 本站共
                        {{ $count }} 个会员</div>
                </div>
                <!-- Page title actions -->
                <div class="col-auto ms-auto d-print-none">
                    <form action="{{ route('public.user.search') }}" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label">搜索本站会员</label>
                            <div class="row g-2">
                                <div class="col">
                                    <input type="text" class="form-control" name="content" placeholder="username:content">
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-white btn-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="10" cy="10" r="7" />
                                            <line x1="21" y1="21" x2="15" y2="15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
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
                                    <span
                                        class="badge bg-{{ Curd_UserGroup()->Read_id($value['user_group'])['color'] }}">{{ Curd_UserGroup()->Read_id($value['user_group'])['name'] }}</span>
                                    @if ($value->user->zhuangtai == '封禁')
                                        <span class="badge bg-red">已封禁</span>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @else
                <div class="col-md-6 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">
                                无结果
                            </h3>
                        </div>
                    </div>
                </div>
            @endif
        </div>
        {{ $page }}
    </div>
@endsection
