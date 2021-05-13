@extends('layouts.app')

@section('title', '经验变更记录')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">经验变更记录</h3>
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
                                  <strong>{{$value['value']}}</strong> 经验: <strong>{{$value['type']}}{{ $value['num'] }}</strong>
                                </div>
                                <div class="text-muted">{{$value['created_at']}}</div>
                              </div>
                              <div class="col-auto align-self-center">
                                经验<strong>{{$value['type']}}{{ $value['num'] }}</strong>
                              </div>
                            </div>
                        </div>
                        @endforeach
                        @else
                        暂无
                      @endif
                    </div>
                </div>
                {{$page}}
            </div>
        </div>
    </div>
</div>
@endsection
