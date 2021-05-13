@extends('layouts.app')
@section('title', '赞助商列表')
@section('description', Curd_Options()->Read_name('web_name', 'setting') . '的赞助商列表')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h3 class="card-title">赞助商列表</h3>
                    </div>
                    <div class="list-group list-group-flush list-group-hoverable">
                        @if($page->count())
                        @foreach($page as $key => $value)
                        <div class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <a href="{{$value['url']}}">
                                        <span class="avatar"
                                            style="background-image: url({{$value['logo']}})"></span>
                                    </a>
                                </div>
                                <div class="col text-truncate">
                                    <a href="{{$value['url']}}" class="text-body d-block">{{$value['name']}}</a>
                                    <small class="d-block text-muted text-truncate mt-n1">
                                        网址:{{$value['url']}}
                                    </small>
                                </div>
                                <div class="col-auto">
                                    <a href="{{route('public.zanzhu.data',['id' => $value['id']])}}" class="list-group-item-actions">
                                        详细信息
                                    </a>
                                </div>
                            </div>
                        </div>
                        @endforeach
                        @else
                        <div class="list-group-item">
                            暂无
                        </div>
                        @endif
                    </div>
                </div>
                {{$page}}
            </div>
        </div>
    </div>
@endsection
