@extends('layouts.app')
@section('title', '「'.$class->user->username.'」收藏夹:'.$class->name." 下的内容")
@section('description', '为你找到「'.$class->user->username.'」收藏夹:'.$class->name." 下的内容")
@section('content')
    <div class="container">
        <div class="row row-cards">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">
                            {{ $class->user->username }} 的收藏夹: {{ $class->name }}
                        </h3>
                        <div class="row row-cards">
                            @if ($data->count())
                            @foreach($data as $value)
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">{{ $value->topic->title }}</h3>
                                    </div>
                                    <div class="card-body markdown">
                                       {!! Str::limit(Helpers()->markdowntohtml($value->topic->content), 220, '...') !!}
                                    </div>
                                    <div class="card-footer">
                                        @if(Auth::id() && Auth::id()==$value->user_id)<form onsubmit="return confirm('确定要删除此收藏内容吗?');" action="{{ route('users.collections.delete') }}" method="POST">@endif
                                            @csrf
                                            <a href="{{ route('topic.show',['id' => $value->posts_id]) }}" class="btn btn-indigo">前往此贴</a>
                                            @if(Auth::id() && Auth::id()==$value->user_id)<button name="delete" value="{{ $value->id }}" class="btn btn-indigo">删除此收藏</button>@endif
                                        </form>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                            @else
                            <div class="col-md-6">
                                <h3 class="card-title">
                                    无内容
                                </h3>
                            </div>
                            @endif
                        </div>
                        {{ $data }}
                    </div>
                    @if (Auth::id() && Auth::id()==$class->user_id)
                    <div class="card-footer">
                        <form action="{{ route('users.collections.delete.class') }}" method="POST">
                            @csrf
                            <button value="{{ $class->id }}" name="class_id" class="btn btn-indigo">删除此收藏夹</button>
                        </form>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
