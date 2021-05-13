@extends('layouts.app')

@section('title', '站点设置')
@section('content')
<div class="container-xl">
    <div class="row row-cards">
        <form action="{{ route('admin.setting.save') }}" method="POST">
            @csrf
            <div class="col-md-12">
                <div class="card">
                    <ul class="nav nav-tabs" data-bs-toggle="tabs">
                        @php $var=1; @endphp
                        @foreach(config('codefec.admin-setting') as $key => $value)
                        <li class="nav-item">
                            <a href="#{{dian_($value)}}" class="nav-link @if($var==1){{("active")}}@endif" data-bs-toggle="tab">
                                <!-- SVG icon code with class="me-2" -->
                                {{$key}}
                            </a>
                        </li>
                        @php $var=$var+1; @endphp
                        @endforeach
                        <li class="nav-item ms-auto">
                            <button type="submit" class="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2">
                                    </path>
                                    <circle cx="12" cy="14" r="2"></circle>
                                    <polyline points="14 4 14 8 8 8 8 4"></polyline>
                                </svg>
                            </button>
                        </li>
                    </ul>
                    <div class="card-body">
                        <div class="tab-content">
                            @php $vars=1;@endphp
                            @foreach(config('codefec.admin-setting') as $value)
                            <div class="tab-pane @if($vars==1){{("active")}}@endif show" id="{{dian_($value)}}">
                                @include($value)
                            </div>
                            @php $vars=$vars+1; @endphp
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection
