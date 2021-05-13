@extends('layouts.app')

@section('title', '我的举报')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">我的举报</h3>
                    <div class="divide-y-4">
                        @if($page->count())
                        @foreach($page as $key => $value)
                        <div>
                            <div class="row">
                              <div class="col-auto">
                                <span class="avatar"><img src="{{Helpers()->user_avatar(Auth::id())}}"></span>
                              </div>
                              <div class="col">
                                <div class="text-truncate">
                                  <strong>{{$value['class']}}</strong> ID: <strong>{{$value['posts_id']}}</strong> posts.
                                </div>
                                <div class="text-muted">{{$value['created_at']}}</div>
                              </div>
                              <div class="col-auto align-self-center">
                                <a href="{{route('topic.report.show',['id' => $value['id']])}}" class="btn btn-primary">查看</a>
                              </div>
                            </div>
                        </div>
                        @endforeach
                        @else
                        无内容
                      @endif
                    </div>
                </div>
                {{$page}}
            </div>
        </div>
    </div>
</div>
@endsection
