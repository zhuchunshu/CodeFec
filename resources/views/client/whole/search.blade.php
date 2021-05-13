@extends('layouts.app')
@section('title', '「' . $q . '」的搜索结果')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <!-- Cards with tabs component -->
                <div class="card-tabs border-0">
                    <h3 class="card-title">搜索结果</h3>
                    <!-- Cards navigation -->
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a href="#tab-borderless-1" class="nav-link @if($c=="topic") active @endif" data-bs-toggle="tab">帖子</a></li>
                        <li class="nav-item"><a href="#tab-borderless-2" class="nav-link @if($c=="user") active @endif" data-bs-toggle="tab">用户</a>
                        </li>
                        {{-- <li class="nav-item"><a href="#tab-borderless-3" class="nav-link @if($c=="comment") active @endif" data-bs-toggle="tab">评论</a>
                        </li> --}}
                    </ul>
                    <div class="tab-content">
                        <!-- Content of card #1 -->
                        <div id="tab-borderless-1" class="card tab-pane @if($c=="topic") active show @endif">
                            <div class="card-body">
                                @include('client.whole.search.topic')
                            </div>
                        </div>
                        <!-- Content of card #2 -->
                        <div id="tab-borderless-2" class="card tab-pane @if($c=="user") active show @endif">
                            <div class="card-body">
                                @include('client.whole.search.user')
                            </div>
                        </div>
                        <!-- Content of card #3 -->
                        <div id="tab-borderless-3" class="card tab-pane @if($c=="comment") active show @endif">
                            <div class="card-body">
                                <div class="card-title">Content of tab #3</div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid
                                    distinctio dolorem expedita, fugiat hic magni molestiae molestias odit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
