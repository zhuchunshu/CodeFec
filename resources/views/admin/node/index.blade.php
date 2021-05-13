@extends('layouts.app')

@section('title', '创建节点')
@section('content')
    <div class="container-xl">
        <div class="row row-cards">
            <div class="col-md-7">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">节点列表</h3>
                    </div>
                    <div class="card-body">
                        @if($page->count())
                        @foreach($page as $key => $value)
                        <div class="list-group list-group-flush overflow-auto" style="max-height: 35rem">
                            <div class="list-group-item">
                                <div class="row">
                                    <div class="col-auto">
                                        <a href="{{route('node.data',['ename' => $value['ename']])}}">
                                            <span class="avatar"
                                                style="background-image: url({{$value['icon']}})"></span>
                                        </a>
                                    </div>
                                    <div class="col text-truncate">
                                        <a href="{{route('node.data',['ename' => $value['ename']])}}" class="text-body d-block">{{$value['name']}}</a>
                                        <div class="text-muted text-truncate mt-n1">创建时间:{{$value['created_at']}} @if($value['die_id']) <b>父节点: {{Helpers()->Node_name($value['die_id'])}}</b> @endif</div>
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
                                        <div class="text-muted text-truncate mt-n1">无节点</div>
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
                        <h3 class="card-title">新增节点</h3>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.node.save') }}" accept-charset="UTF-8"
                        enctype="multipart/form-data" method="POST">
                            @csrf
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">节点名称</label>
                                <div class="col">
                                    <input type="text" class="form-control" name="name"
                                        placeholder="节点名称" required>
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
                                <label class="form-label col-3 col-form-label">icon</label>
                                <div class="col">
                                    <input type="file" class="form-control" name="icon" required/>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">权限值</label>
                                <div class="col">
                                    <input type="number" min="1" max="999" class="form-control" name="quanxian" value="1" required/>
                                    <small>权限大于此值得用户可以在此节点发帖</small>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">父级节点</label>
                                <div class="col">
                                    <select class="form-select" name="die_id">
                                        <option value="0">无</option>
                                        @foreach($all as $value)
                                        <option value="{{$value['id']}}">{{$value['name']}}</option>
                                        @endforeach
                                    </select>
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
