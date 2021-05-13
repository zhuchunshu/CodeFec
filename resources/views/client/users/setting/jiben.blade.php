<div class="form-group mb-3 ">
    <label class="form-label">邮箱</label>
    <div>
        <input type="email" class="form-control" aria-describedby="emailHelp"
            placeholder="Enter email" value="{{ $data['email'] }}" disabled required>
    </div>
</div>
<div class="form-group mb-3 ">
    <label class="form-label">用户名</label>
    <div>
        <input type="text" class="form-control" value="{{ $data['username'] }}" disabled
            placeholder="用户名">
    </div>
</div>
<div class="form-group mb-3 ">
    <label class="form-label">用户秘钥</label>
    <div>
        <input type="text" class="form-control" value="{{ $data['_Token'] }}" disabled
            placeholder="_Token">
    </div>
</div>
<div class="form-group mb-3 ">
    <label class="form-label">用户组</label>
    <div>
        <input type="text" class="form-control"
            value="{{ Curd_UserGroup()->Read_id($data['user_group'])['name'] }}" disabled
            placeholder="用户组">
    </div>
</div>
<div class="form-group mb-3 ">
    <label class="form-label">积分</label>
    <div>
        <input type="text" class="form-control" value="{{ $data->jifen }}" disabled
            placeholder="积分">
    </div>
</div>
<div class="form-group mb-3 ">
    <label class="form-label">经验值</label>
    <div>
        <input type="text" class="form-control" value="{{ $data->lv }}" disabled
            placeholder="经验值">
    </div>
</div>
<div class="form-group mb-3 ">
    <label class="form-label">等级</label>
    <div>
        <input type="text" class="form-control" value="{{ user_dengji($data['lv']) }}" disabled
            placeholder="等级">
    </div>
</div>
