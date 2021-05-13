<div class="mb-3">
    <div class="form-label">当前头像</div>
    <span class="avatar avatar-xl" style="background-image: url({{ user_avatars($data['email'],$data['avatar']) }})"></span>
    <span class="avatar avatar-lg" style="background-image: url({{ user_avatars($data['email'],$data['avatar']) }})"></span>
    <span class="avatar avatar-md" style="background-image: url({{ user_avatars($data['email'],$data['avatar']) }})"></span>
    <span class="avatar avatar-sm" style="background-image: url({{ user_avatars($data['email'],$data['avatar']) }})"></span>
    <span class="avatar avatar-xs" style="background-image: url({{ user_avatars($data['email'],$data['avatar']) }})"></span>
</div>
<div class="mb-3">
    <div class="form-label">上传新头像</div>
    <input type="file" class="form-control" name="avatar"/>
</div>