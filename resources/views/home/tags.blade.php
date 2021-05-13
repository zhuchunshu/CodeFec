@extends('layouts.app')
@section('title', '标签:['.$tags['name']."]下的帖子")
@section('content')
    <div class="container">
        <div class="row justify-content">
            <div class="col-md-9">
                <div class="card mb-3">
                    <div class="card-body">
                        <h3 class="card-title">帖子列表</h3>
                        @include('home.wid.topic')
                    </div>
                    {{$page}}
                </div>
            </div>
            @include('home.wid.celan_tags')
        </div>
    </div>
@endsection
