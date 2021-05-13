@extends('layouts.app')
@section('title', '联系我们')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="card card-stacked">
            <div class="card-body">
                <h3 class="card-title">
                    联系我们
                </h3>
                <h4>微信:<b>{{Curd_Options()->Read_name('lianxi_wx','setting')}}</b></h4>
                <h4>QQ:<b>{{Curd_Options()->Read_name('lianxi_qq','setting')}}</b></h4>
                <h4>telegram: <a href="https://t.me/{{Curd_Options()->Read_name('lianxi_tg','setting')}}"><b>{{Curd_Options()->Read_name('lianxi_tg','setting')}}</b></a> </h4>
                <h4>email: <a href="mailto:{{Curd_Options()->Read_name('lianxi_email','setting')}}"><b>{{Curd_Options()->Read_name('lianxi_email','setting')}}</b></a> </h4>

                  <div class="hr-text">
                    <span>End</span>
                  </div>
                  <p>
                    加好友备注: <b>{{Curd_Options()->Read_name('web_name','setting','CodeFec')}}</b>
                  </p>
            </div>
        </div>
    </div>
</div>
@endsection
