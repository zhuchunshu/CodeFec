@extends('layouts.app')
@section('title', '404 页面不存在')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="empty card card-stacked">
                <div class="empty-header">404</div>
                <p class="empty-title">页面不存在</p>
                <p class="empty-subtitle text-muted">
                    Try adjusting your search or filter to find what you're looking for.
                </p>
                <div class="empty-action">
                    <a href="{{url('/')}}" class="btn btn-primary">
                        <!-- SVG icon code -->
                        返回首页
                    </a>
                </div>
                <div class="ribbon bg-red">
                    <!-- SVG icon code -->
                    <i class="bi bi-x-octagon-fill"></i>
                </div>
            </div>
        </div>
    </div>
@endsection
