@extends('layouts.app')
@section('title', '「'.$username.'」的收藏夹')
@section('description', '为你找到「'.$username."」收藏夹列表")
@section('content')
    <div class="container">
        <div class="row row-cards">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">
                            {{ $username }} 的收藏夹列表
                        </h3>
                        <div class="row row-cards">
                            @if ($data->count())
                            @foreach($data as $value)
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        {{ $value->name }}
                                    </div>
                                    <div class="card-body">
                                        {{ _cf($value->remarks,'此收藏夹无备注说明') }}
                                    </div>
                                    <div class="card-footer">
                                        <a href="{{ route('public.collections.data.data',['id' => $value->id]) }}" class="btn btn-indigo">查看此收藏夹下的内容</a>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                            @else
                            <div class="col-md-6">
                                无内容
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
