@extends('layouts.app')
@section('title', '「'.$data['name'].'」赞助商的相关信息')
@section('description', "为您展示关于".$data['name'].'赞助商的相关介绍信息')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card card-stacked">
                <div class="card-body markdown">
                    <h3 class="card-title">赞助商 - {{$data['name']}}</h3>
                    <img src="{{$data['logo']}}">
                    <h4 class="card-title">赞助商网址: <a href="{{$data['url']}}">{{$data['url']}}</a> </h4>
                    @if($data['description'])
                    {!!Helpers()->markdowntohtml($data['description'])!!}
                    @endif
                </div>
                @if(CodeFec_Quanxian()->_站长())
                <div class="card-footer">
                    <form onsubmit="return confirm('您确定要删除此赞助商吗？');" action="{{ route('admin.links.zanzhu.delete') }}" method="POST">
                        @csrf
                        <input type="hidden" name="id" value="{{$data['id']}}">
                        <button type="submit" class="btn btn-blue">删除</button>
                    </form>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
