<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">站长QQ</label>
    <div class="col">
        <input type="text" class="form-control" name="lianxi_qq" value="{{ Curd_Options()->Read_name('lianxi_qq','setting','467621795') }}" placeholder="站长联系QQ">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">站长微信</label>
    <div class="col">
        <input type="text" class="form-control" name="lianxi_wx" value="{{ Curd_Options()->Read_name('lianxi_wx','setting','Inkedus-zcs') }}" placeholder="站长联系微信">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">站长TG</label>
    <div class="col">
        <input type="text" class="form-control" name="lianxi_tg" value="{{ Curd_Options()->Read_name('lianxi_tg','setting','Inkedus') }}" placeholder="站长联系Telegram">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">站长邮箱</label>
    <div class="col">
        <input type="text" class="form-control" name="lianxi_email" value="{{ Curd_Options()->Read_name('lianxi_email','setting','admin@zhuchunshu.com') }}" placeholder="站长邮箱">
    </div>
</div>

<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">百度推送网址</label>
    <div class="col">
        <input type="text" class="form-control" name="baidu_url" value="{{ get_options_setting('baidu_url') }}" placeholder="百度推送网址">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">百度推送秘钥</label>
    <div class="col">
        <input type="text" class="form-control" name="baidu_token" value="{{ get_options_setting('baidu_token') }}" placeholder="百度推送秘钥">
    </div>
</div>
{{-- <div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">个人签名</label>
    <div class="col">
        <textarea class="form-control" name="qianming" rows="5">{!!$data['qianming']!!}</textarea>
        <small class="form-hint">支持markdown,不支持html</small>
    </div>
</div> --}}