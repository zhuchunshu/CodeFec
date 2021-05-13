@extends('layouts.app')

@section('title', '我保存的草稿')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card card-stacked">
                <div class="card-body">
                    <h3 class="card-title">保存的草稿</h3>
                    <div class="divide-y-4">
                        @if($page->count())
                        @foreach($page as $key => $value)
                        <div>
                            <div class="row">
                                <div class="col-auto">
                                    <img src="{{user_avatars(Auth::user()->email,Auth::user()->avatar)}}" class="avatar">
                                </div>
                                <div class="col">
                                    <div class="text-truncate">
                                        <strong><a href="{{route('create.draft',['id' => $value['id']])}}">{{$value['id']}}.{!!$value['title']!!}</a></strong>
                                    </div>
                                    <div class="text-muted">{{$value['created_at']}}</div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                        @else
                        <div>
                            <div class="row">
                                <div class="col-auto">
                                    <img src="{{user_avatars(Auth::user()->email,Auth::user()->avatar)}}" class="avatar">
                                </div>
                                <div class="col">
                                    <div class="text-truncate">
                                        无结果
                                    </div>
                                    <div class="text-muted">暂无保存的草稿</div>
                                </div>
                            </div>
                        </div>
                        @endif
                    </div>
                </div>
                {{$page->links()}}
            </div>
        </div>
    </div>
</div>
@endsection
