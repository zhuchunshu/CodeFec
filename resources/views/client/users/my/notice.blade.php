@extends('layouts.app')

@section('title', '我的通知')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">我的通知</h3>
                    <div class="divide-y-4">
                        @if($page->count())
                        <form onsubmit="return confirm('确定要标记为已读吗?');" action="{{ route('users.my.notice.du') }}" method="POST">
                            @csrf
                            @foreach($page as $key => $value)
                        <div>
                            <div class="row">
                              <div class="col-auto">
                                <span class="avatar"><img src="{{Helpers()->user_avatar(Auth::id())}}"></span>
                              </div>
                              <div class="col">
                                <div class="text-truncate">
                                  {{ $value['title'] }}
                                </div>
                                <div class="text-muted">{{$value['created_at']}}</div>
                              </div>
                              <div class="col-auto align-self-center">
                                <button name="read" value="{{ $value['id'] }}" class="btn btn-red">已读</button>
                                <a href="{{ route('users.my.notice.to',['url' => base64_encode($value['url']),'id' => $value['id']]) }}" class="btn btn-primary">查看</a>
                              </div>
                            </div>
                        </div>
                        @endforeach
                        </form>
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
