@extends('layouts.app')
@section('title', '「'.$data['name'].'」'.'的节点信息')
@section('content')
<div class="container">
    <div class="row justify-content-center row-cards">
        <div class="col-md-12">
            <div class="card card-stacked">
                <div class="card-body markdown">
                    <h3 class="card-title">节点:{{$data['name']}} 的信息</h3>
                    <p><b>
                        创建时间: {{$data['created_at']}}
                        @if($data['die_id'])
                        上级节点: <a href="{{route('node.data',['ename' => Helpers()->Node_ename($data['die_id'])])}}">{{Helpers()->Node_name($data['die_id'])}}</a>
                        @endif
                    </b></p>
                    @if($data['description'])
                    {!!Helpers()->markdowntohtml($data['description'])!!}
                    @else
                    这个节点没有相关介绍
                    @endif
                </div>
                <div class="card-footer">
                    <a href="{{route('node',['ename' => $data['ename']])}}" class="btn btn-primary">此节点帖子</a>
                </div>
            </div>
        </div>
        @if($zi_count)
        <div class="col-md-12">
            <div class="card card-stacked">
                <div class="card-body">
                    <h3 class="card-title">
                        子节点
                    </h3>
                    <div class="row g-3">
                    @if($zi->count())
                    @foreach($zi as $key => $value)
                    <div class="col-md-6">
                        <div class="row g-3 align-items-center">
                            <a href="{{route('node.data',['ename' => $value['ename']])}}" class="col-auto">
                                <span class="avatar" style="background-image: url({{$value['icon']}})">
                                    <span class="badge bg-{{$value['color']}}"></span></span>
                            </a>
                            <div class="col text-truncate">
                                <a href="{{route('node.data',['ename' => $value['ename']])}}" class="text-body d-block text-truncate">{{$value['name']}}</a>
                                <small class="text-muted text-truncate mt-n1">创建时间:{{$value['created_at']}},创建者:{{$value->user->username}}</small>
                            </div>
                        </div>
                    </div>
                    @endforeach
                    @else
                    <p>无节点</p>
                    @endif
                    </div>
                </div>
            </div>
        </div>
        @endif
    </div>
</div>
@endsection
