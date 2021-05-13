@extends('layouts.app')

@section('title', '个人设置')
@section('content')
    <div class="container-xl">
        <div class="row row-cards">
            <div class="col-md-12">
                <div class="card">
                    <ul class="nav nav-tabs" data-bs-toggle="tabs">
                        @foreach (config('codefec.user_setting') as $key => $value)
                            <li class="nav-item">
                                <a href="{{ route($value) }}" class="nav-link @if (route_name()==$value) {{ 'active disabled' }} @endif">{{ $key }}</a>
                            </li>
                        @endforeach
                    </ul>
                    @if ($btn)
                        <form action="{{ $post }}" method="POST" enctype="multipart/form-data">
                            @csrf
                    @endif
                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane active show">
                                @include($view)
                            </div>
                        </div>
                    </div>
                    @if ($btn)
                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">保存设置</button>
                        </div>
                    @endif
                    @if ($btn)
                        </form>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
