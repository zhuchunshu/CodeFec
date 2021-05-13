@extends('layouts.app')
@section('title',"「".$user_data->username."」的评论")
@section('content')
    <div class="container">
        <div class="row justify-content">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-body">
                        <h3 class="card-title"><a href="{{ route('public.user.about',['id' => $user_data->id]) }}">{{ $user_data->username }}</a> 的评论</h3>
                        <div class="col-12">
                            <!-- Cards with tabs component -->
                            <div class="tab-content border-0">
                                <!-- Content of card #1 -->
                                <div class="card tab-pane active show shadow-none">
                                    <div class="card-body">
                                        @if ($page->count())
                                        <div class="list-group list-group-flush list-group-hoverable">
                                            @foreach ($page as $key => $value)
                                                <div class="list-group-item">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto">
                                                            <a class="avatar avatar-rounded" style="background-image: url({{ user_avatars($value->user->email,$value->user->avatar) }})" data-bs-toggle="tooltip" data-bs-placement="top" title="作者信息"
                                                                href="{{ route('public.user.about', ['id' => $value->user->id]) }}">
                                                            </a>
                                                        </div>
                                
                                                
                                                        <div class="col">
                                                                <a href="{{route('topic.show',['id' => $value->topic_id])}}" data-bs-toggle="tooltip" data-bs-placement="left" title="查看文章" class="text-body d-block">
                                                                    <div class="alert alert-success" role="alert">
                                                                        {!! subHtml(Str::limit(Helpers()->markdowntohtml($value->content), 150, '...')) !!}
                                                                    </div>
                                                                    
                                                                </a>
                                                            
                                                            <p>发表在: <a href="{{ route('topic.show',['id' => $value->topic_id]) }}">{{ Str::limit($value->topic->title, 50, '...') }}</a> </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endforeach
                                        </div>
                                        @else
                                            <div class="col-6">
                                                无内容
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>  
                        </div>                        
                    </div>
                    {{$page}}
                </div>
            </div>
            
        </div>
    </div>
@endsection
