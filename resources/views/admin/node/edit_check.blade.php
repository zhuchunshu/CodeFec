@extends('layouts.app')

@section('title', '节点管理')
@section('content')
    <div class="container-xl">
        <div class="row row-cards justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">请在下方选择一个节点进行编辑</h3>
                    </div>
                    <div class="card-body">
                        @if($page->count())
                        @foreach($page as $key => $value)
                        <div class="list-group list-group-flush overflow-auto" style="max-height: 35rem">
                            <div class="list-group-item">
                                <div class="row">
                                    <div class="col-auto">
                                        <a href="{{route('admin.node.edit',['id' => $value['id']])}}">
                                            <span class="avatar"
                                                style="background-image: url({{$value['icon']}})"></span>
                                        </a>
                                    </div>
                                    <div class="col text-truncate">
                                        <a href="{{route('admin.node.edit',['id' => $value['id']])}}" class="text-body d-block">{{$value['name']}}</a>
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
        </div>
    </div>
@endsection
