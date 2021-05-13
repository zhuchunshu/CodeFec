@extends('layouts.app')
@section('title', '419 回话已过期')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="empty card card-stacked">
                <div class="empty-header">419</div>
                <p class="empty-title">回话已过期</p>
                <p class="empty-subtitle text-muted">
                    回话已过期,请返回刷新页面后重新提交
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
