@extends('layouts.app')
@section('title', '所有节点')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h3 class="card-title">所有父级节点</h3>
                    </div>
                    <div class="card-body">
                        <div class="row g-3">
                            @if($page->count())
                            @foreach($page as $key => $value)
                            <div class="col-md-6">
                                <div class="row g-3 align-items-center">
                                    <a href="{{route('node.data',['ename' => $value['ename']])}}" class="col-auto">
                                        <span class="avatar" style="background-image: url({{$value['icon']}})">
                                            <span class="badge bg-{{$value['color']}}"></span></span>
                                    </a>
                                    <div class="col text-truncate">
                                        <a href="{{route('node.data',['ename' => $value['ename']])}}" class="text-body d-block text-truncate">{{$value['name']}}</a>
                                        <small class="text-muted text-truncate mt-n1">创建时间:{{$value['created_at']}},创建者:{{$value->user->username}} @if(Helpers()->Node_Zi_Count($value['id'])), 子节点数量:{{Helpers()->Node_Zi_Count($value['id'])}} @endif</small>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                            @else
                            <div class="col-6">
                                无节点
                            </div>
                            @endif
                        </div>
                    </div>
                    {{$page}}
                </div>
            </div>
        </div>
    </div>
@endsection
