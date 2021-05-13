<div class="form-group mb-3">
    <div class="form-label">功能开关</div>
    <label class="form-check form-switch">
        <input class="form-check-input" type="checkbox" name="email_notice" @if (user_options($data['id'], 'email_notice')) checked @endif>
        <span class="form-check-label">不接收邮箱通知</span>
    </label>
    <label class="form-check form-switch">
        <input class="form-check-input" name="show_email" type="checkbox" @if (user_options($data['id'], 'show_email')) checked @endif>
        <span class="form-check-label">允许别人查看我的邮箱</span>
    </label>
    <label class="form-check form-switch">
        <input class="form-check-input" name="show_qianming" type="checkbox" @if (user_options($data['id'], 'show_qianming')) checked @endif>
        <span class="form-check-label">评论中显示我的签名</span>
    </label>
    <label class="form-check form-switch">
        <input class="form-check-input" name="show_topic_qianming" type="checkbox" @if (user_options($data['id'], 'show_topic_qianming')) checked @endif>
        <span class="form-check-label">帖子显示作者签名</span>
    </label>
    <label class="form-check form-switch">
        <input class="form-check-input" name="user_dashang" type="checkbox" @if (user_options($data['id'], 'user_dashang')) checked @endif>
        <span class="form-check-label">允许别人打赏我</span>
    </label>
</div>