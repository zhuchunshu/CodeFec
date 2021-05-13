<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title',Curd_Options()->Read_name('title','setting','CodeFec')) | {{Curd_Options()->Read_name('fu_title','setting','程序员站长交流社区')}} | {{config('app.name',Curd_Options()->Read_name('title','setting','CodeFec'))}}</title>
    <link rel="icon" href="{{ get_options_image('icon','/assets/images/logo.svg') }}" type="image/x-icon"/>
    <link rel="shortcut icon" href="{{ get_options_image('icon','/assets/images/logo.svg') }}" type="image/x-icon"/>
    <meta name="keywords" content="@yield('keywords',Curd_Options()->Read_name('web_keywords','setting'))">
    <meta name="description" content="@yield('description',Curd_Options()->Read_name('web_description','setting'))">
    <!-- Tabler Core -->
    <link href="{{asset('tabler/dist/css/tabler.min.css')}}" rel="stylesheet"/>
    <link href="{{asset('tabler/dist/css/tabler-flags.min.css')}}" rel="stylesheet"/>
    <link href="{{asset('tabler/dist/css/tabler-payments.min.css')}}" rel="stylesheet"/>
    <link href="{{asset('tabler/dist/css/tabler-vendors.min.css')}}" rel="stylesheet"/>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    @if(Auth::id())<meta name="_Token" content="{{Auth::user()->_Token}}">@endif
    {{-- 自定义header代码 --}}
    @if (Curd_Options()->Read_name('code_header','setting',null))
        {!! Curd_Options()->Read_name('code_header','setting',null) !!}
    @endif
@yield('css')
</head>
<body @if(theme_riye()!="dark")class="antialiased" @else{!! ('class="antialiased theme-dark"') !!}@endif>
    <div id="app" class="{{route_class()}}-page">
        @include('layouts.header')
        @include('layouts.bujian._msg')
        @include('shared._error')
        <main class="py-4">
            @yield('content')
        </main>
    </div>
    @include('layouts.footer')
    <script src="{{asset('js/jquery-3.5.1.min.js')}}"></script>
    <script>
        @if(get_options_setting('view_return_top')=="开启") var comment_themes_view_rtop=true; @else var comment_themes_view_rtop=false; @endif
        var codefec_config = '{"theme":"@if(theme_riye()!="dark"){{ ('light') }}@else{!! ('dark') !!}@endif","name":"{{ get_options_setting('web_name') }}","editor":{"biaoqing":"{{ route('api.editor.biaoqing') }}"}}';
    </script>
    <script src="{{ mix('js/app.js') }}"></script>
    <script src="{{asset('tabler/dist/libs/apexcharts/dist/apexcharts.min.js')}}"></script>
    <!-- Tabler Core -->
    <script src="{{asset('tabler/dist/js/tabler.min.js')}}"></script>
    @yield('scripts')
    {{-- 自定义footer代码 --}}
    @if (Curd_Options()->Read_name('code_footer','setting',null))
        {!! Curd_Options()->Read_name('code_footer','setting',null) !!}
    @endif
</body>
</html>
