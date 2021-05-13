<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">个人签名</label>
    <div class="col">
        <textarea class="form-control" name="qianming"
            rows="4">{!! $data['qianming'] !!}</textarea>
        <small class="form-hint">支持markdown,不支持html</small>
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">QQ</label>
    <div class="col">
        <input type="text" minlength="5" maxlength="11" class="form-control" name="qq"
            value="{{ $data['qq'] }}" placeholder="qq">
        <small class="form-hint">
            是否愿意留下QQ联系方式?
        </small>
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">微信</label>
    <div class="col">
        <input type="text" class="form-control" placeholder="wechat"
            value="{{ $data['wechat'] }}" name="wechat">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">TeleGram</label>
    <div class="col">
        <input type="text" class="form-control" placeholder="telegram"
            value="{{ $data['telegram'] }}" name="telegram">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">公司</label>
    <div class="col">
        <input type="text" class="form-control" placeholder="company"
            value="{{ $data['gongsi'] }}" name="gongsi">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">职位</label>
    <div class="col">
        <input type="text" class="form-control" placeholder="occupation"
            value="{{ $data['zhiwei'] }}" name="zhiwei">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站</label>
    <div class="col">
        <input type="text" class="form-control" placeholder="website"
            value="{{ $data['website'] }}" name="website">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">所在地</label>
    <div class="col">
        <input type="text" class="form-control" placeholder="address"
            value="{{ $data['address'] }}" name="address">
    </div>
</div>