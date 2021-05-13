@extends('layouts.app')

@section('title', '创建用户组')
@section('content')
    <div class="container-xl">
        <div class="row row-cards">
            <div class="col-md-7">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">用户组列表</h3>
                    </div>
                    <div class="card-body">
                        @if($page->count())
                        @foreach($page as $key => $value)
                        <div class="list-group list-group-flush overflow-auto" style="max-height: 35rem">
                            <div class="list-group-item">
                                <div class="row">
                                    <div class="col-auto">
                                        <span class="bg-{{$value['color']}} text-white avatar"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
                                        </span>
                                    </div>
                                    <div class="col text-truncate">
                                        <a href="{{route('public.users.group.data',['ename' => $value['ename']])}}" class="text-body d-block">{{$value['name']}}</a>
                                        <div class="text-muted text-truncate mt-n1">英文名:{{$value['ename']}}, 权限:{{$value['quanxian']}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                        @else
                        <div class="list-group list-group-flush overflow-auto" style="max-height: 35rem">
                            <div class="list-group-item">
                                <div class="row">
                                    <div class="col-auto">
                                        <span class="bg-red text-white avatar"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
                                        </span>
                                    </div>
                                    <div class="col text-truncate">
                                        <a href="#" class="text-body d-block">无结果</a>
                                        <div class="text-muted text-truncate mt-n1">无用户组</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endif
                    </div>
                    {{$page}}
                </div>
            </div>
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">新增用户组</h3>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.users.group.save') }}" method="POST">
                            @csrf
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">用户组名称</label>
                                <div class="col">
                                    <input type="text" class="form-control" name="name"
                                        placeholder="用户组名称" required>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">英文名</label>
                                <div class="col">
                                    <input type="text" class="form-control" name="ename"
                                        placeholder="英文名" required>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">颜色值</label>
                                <div class="col">
                                    <input type="text" class="form-control" name="color"
                                        placeholder="颜色值" value="blue" required>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">权限值</label>
                                <div class="col">
                                    <input type="number" class="form-control" name="quanxian"
                                        placeholder="权限值" max="999" min="1" value="blue" required>
                                </div>
                            </div>

                            <div class="form-footer">
                                <button type="submit" class="btn btn-primary">提交</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
