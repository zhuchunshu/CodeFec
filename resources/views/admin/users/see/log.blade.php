@extends('layouts.app')

@section('title', $user_data['username'].'的操作记录')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card card-stacked">
                <div class="card-body">
                    <h3 class="card-title">{{ $user_data['username'] }}操作记录</h3>
                    <div class="divide-y-4">
                        @if($page->count())
                        @foreach($page as $key => $value)
                        <div>
                            <div class="row">
                                <div class="col-auto">
                                    <img src="{{user_avatars($user_data->email,$user_data->avatar) }}" class="avatar">
                                </div>
                                <div class="col">
                                    <div class="text-truncate">
                                        <strong>{{$value['id']}}.{!!$value['name']!!}</strong>
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
                                    <img src="{{user_avatars($user_data->email,$user_data->avatar)}}" class="avatar">
                                </div>
                                <div class="col">
                                    <div class="text-truncate">
                                        无结果
                                    </div>
                                    <div class="text-muted">暂无操作记录</div>
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
