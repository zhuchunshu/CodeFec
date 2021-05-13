@extends('layouts.app')
@section('title', 'ID:'.$data['id']."的举报信息")
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="ribbon ribbon-top ribbon-right bg-red">
                    {{ $data['zhuangtai'] }}
                </div>
                <div class="card-body">
                    <h3 class="card-title">
                        举报{{$data['class']}}的内容,ID为:{{$data['posts_id']}}
                    </h3>
                    <h4>举报理由:{{$data['select']}}</h4>
                    @if($data['content'])
                    <div class="markdown" id="content">
                        {{$data['content']}}
                    </div>
                    @endif
                </div>
                @if(CodeFec_Quanxian()->_(777))
                <div class="card-footer">
                    <form action="{{route('admin.posts.report.post')}}" method="POST">
                        @csrf
                        <input type="hidden" name="id" value="{{$data['id']}}">
                        <button type="submit" name="action" value="pass" class="btn btn-primary">
                            受理
                        </button>
                        <button type="submit" name="action" value="nopass" class="btn btn-primary">
                            驳回
                        </button>
                        <a href="{{ route('topic.show',['id' => $data['posts_id']]) }}" class="btn btn-primary"> 前往此帖 </a>
                    </form>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>

@endsection
