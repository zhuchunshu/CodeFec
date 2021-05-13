@extends('layouts.app')

@section('title', '站点高级设置')
@section('content')
<div class="container-xl">
    <div class="row row-cards">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    图片设置
                </div>
                <div class="card-body">
                    logo、随机图片等多项内容设置管理
                </div>
                <div class="card-footer">
                    <a href="{{ route('admin.setting.pro.image') }}" class="btn btn-indigo">前往</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
