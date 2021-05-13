<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站名称</label>
    <div class="col">
        <input type="text" class="form-control" name="web_name" value="{{ Curd_Options()->Read_name('web_name','setting','CodeFec') }}" placeholder="网站首页标题">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站标题</label>
    <div class="col">
        <input type="text" class="form-control" name="title" value="{{ Curd_Options()->Read_name('title','setting','CodeFec') }}" placeholder="网站标题">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站副标题</label>
    <div class="col">
        <input type="text" class="form-control" value="{{ Curd_Options()->Read_name('fu_title','setting','程序员站长交流社区') }}" name="fu_title" placeholder="网站副标题">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站标题 分隔符</label>
    <div class="col">
        <input type="text" class="form-control" value="{{ Curd_Options()->Read_name('title_fenge','setting','|') }}" name="title_funge" placeholder="funge">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站描述</label>
    <div class="col">
        <textarea name="web_description" class="form-control" rows="4">{{ Curd_Options()->Read_name('web_description','setting','CodeFec是一个站长程序员交流社区') }}</textarea>
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站关键字</label>
    <div class="col">
        <textarea name="web_keywords" class="form-control" rows="4">{{ Curd_Options()->Read_name('web_keywords','setting','CodeFec,CodeFec社区,CodeFec论坛,站长交流社区,vps交流社区,程序员交流社区') }}</textarea>
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站header 自定义代码</label>
    <div class="col">
        <textarea name="code_header" class="form-control" rows="4">{{ Curd_Options()->Read_name('code_header','setting',null) }}</textarea>
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">网站footer 自定义代码</label>
    <div class="col">
        <textarea name="code_footer" class="form-control" rows="4">{{ Curd_Options()->Read_name('code_footer','setting',null) }}</textarea>
    </div>
</div>
{{-- <div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">个人签名</label>
    <div class="col">
        <textarea class="form-control" name="qianming" rows="5">{!!$data['qianming']!!}</textarea>
        <small class="form-hint">支持markdown,不支持html</small>
    </div>
</div> --}}