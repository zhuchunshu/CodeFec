@extends('layouts.app')

@section('title', '应用中心')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">插件列表</h3>
                        <div class="row row-cards">
                            @foreach ($data as $value)
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title">{{ _cf(@$value['config']['name']) }}</h3>
                                        </div>
                                        <div class="card-body">
                                            <p>{{ _cf(@$value['config']['description'],'此插件无描述') }}</p>
                                        </div>
                                        <!-- Card footer -->
                                        <div class="card-footer">
                                            <div class="row align-items-center">
                                                @if (@$value['config']['author'])
                                                <div class="col-auto">
                                                    <a href="{{ _cf(@$value['config']['url'],'#') }}">{{ _cf(@$value['config']['author']) }}</a>
                                                </div>
                                                @endif
                                                <div class="col-auto @if(@$value['config']['author']){{ ("ms-auto") }}@endif">
                                                    <label class="form-check form-switch m-0">
                                                        <input class="form-check-input position-static" name="plugins" value="{{ _cf(@$value['name']) }}" path="{{ _cf(@$value['path']) }}" type="checkbox"
                                                            @if(plugin_check_active($value['name'],$value['path'])){{ ("checked") }}@endif>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>var post_url = "{{ route('api.admin.extend.active') }}";</script>
    <script src="{{ mix('js/admin/plugins/index.js') }}"></script>
@endsection