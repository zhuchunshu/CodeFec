@extends('layouts.app')

@section('title', '赞助商管理')
@section('content')
    <div class="container-xl">
        <div class="row row-cards">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">赞助商列表</h3>
                    </div>
                    <div class="card-body">
                        {{-- 赞助商列表 --}}
                        @if($page->count())
                        @foreach($page as $key => $value)
                        <div class="list-group list-group-flush overflow-auto" style="max-height: 35rem">
                            <div class="list-group-item">
                                <div class="row">
                                    <div class="col-auto">
                                        <a href="{{route('public.zanzhu.data',['id' => $value['id']])}}">
                                            <span class="avatar"
                                                style="background-image: url({{$value['logo']}})"></span>
                                        </a>
                                    </div>
                                    <div class="col text-truncate">
                                        <a href="{{route('public.zanzhu.data',['id' => $value['id']])}}" class="text-body d-block">{{$value['name']}}</a>
                                        <div class="text-muted text-truncate mt-n1">创建时间:{{$value['created_at']}}</div>
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
                                        <a href="#">
                                            <span class="avatar"
                                                style="background-image: url({{user_avatars(Auth::user()->email,Auth::user()->avatar)}})"></span>
                                        </a>
                                    </div>
                                    <div class="col text-truncate">
                                        <a href="#" class="text-body d-block">无结果</a>
                                        <div class="text-muted text-truncate mt-n1">无相关结果</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endif
                    </div>
                    {{$page}}
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">新增赞助商</h3>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.links.zanzhu.save') }}" accept-charset="UTF-8"
                        enctype="multipart/form-data" method="POST">
                            @csrf
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">名称</label>
                                <div class="col">
                                    <input type="text" class="form-control" name="name"
                                        placeholder="名称">
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">logo</label>
                                <div class="col">
                                    <input type="file" class="form-control" name="logo" />
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">网址</label>
                                <div class="col">
                                    <input type="text" class="form-control" name="url"
                                        placeholder="网址">
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">简介</label>
                                <div class="col">
                                    <textarea class="form-control" name="description" rows="5"></textarea>
                                    <small class="form-hint">支持markdown,不支持html</small>
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
