@extends('layouts.app')
@section('title', '「' . $data['name'] . '」用户组的相关信息')
@section('description', '为您展示关于' . $data['name'] . '用户组的相关介绍信息')
@section('content')
    <div class="container">
        <div class="row justify-content-center row-cards">
            <div class="col-md-10">
                <div class="card card-stacked">
                    <div class="card-body">
                        <div class="row g-2 align-items-center">
                            <div class="col-auto">
                                <span class="bg-{{$data['color']}} text-white avatar"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
                            </div>
                            <div class="col">
                                <h4 class="card-title m-0">
                                    <a href="#">{{ $data['name'] }}</a>
                                </h4>
                                <div class="text-muted">
                                    {{$data['ename']}},权限值:{{$data['quanxian']}},该用户组下共有:{{$user_count}}个用户
                                </div>
                                {{-- <div class="small mt-1">
                                    <span class="badge bg-green"></span> Online
                                </div> --}}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            @if(CodeFec_Quanxian()->_(999))
            <div class="col-md-10">
                <div class="card card-stacked">
                    <div class="card-body">
                        <h3 class="card-title">管理操作</h3>
                        <form onsubmit="return confirm('您确定要删除此用户组吗?');" action="{{ route('admin.users.group.delete') }}" method="POST">
                            @csrf
                            <input type="hidden" name="id" value="{{$data['id']}}">
                            <a href="{{ route('admin.users.group.edit',['id' => $data->id]) }}" class="btn btn-primary">修改</a>
                            <button type="submit" class="btn btn-primary">删除</button>
                        </form>
                    </div>
                </div>
            </div>
            @endif
            <div class="col-md-10">
                <div class="card card-stacked">
                    <div class="card-body markdown">
                        <h3 class="card-title">用户列表</h3>
                        <div class="row g-3">
                            @if($user_page->count())
                            @foreach($user_page as $key => $value)
                            <div class="col-md-6">
                                <div class="row g-3 align-items-center">
                                    <a href="{{route('public.user.about',['id' => $value['id']])}}" class="col-auto">
                                        <span class="avatar" style="background-image: url({{user_avatars($value->email,$value->avatar)}})">
                                            </span>
                                    </a>
                                    <div class="col text-truncate">
                                        <a href="{{route('public.user.about',['id' => $value['id']])}}" class="text-body d-block text-truncate">{{$value['username']}}</a>
                                        <small class="text-muted text-truncate mt-n1">注册时间:{{$value['created_at']}}</small>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                            @else
                            <div class="col-6">
                                此用户组下无用户
                            </div>
                            @endif
                        </div>
                    </div>
                    {{$user_page}}
                </div>
            </div>
        </div>
    </div>
@endsection
