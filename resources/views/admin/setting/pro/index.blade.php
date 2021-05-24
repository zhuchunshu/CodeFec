@extends('layouts.app')

@section('title', '站点高级设置')
@section('content')
<div class="container-xl">
    <div class="row row-cards">
        @foreach (config('codefec.setting.admin.pro') as $name => $array)
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    {{ $name }}
                </div>
                <div class="card-body">
                    {{ $array['description'] }}
                </div>
                <div class="card-footer">
                    <a href="{{ route($array['route']) }}" class="btn btn-indigo">前往</a>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endsection
