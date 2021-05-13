<div class="row">
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">强制登陆</label>
            <div class="col">
                <select name="kaiguan_QiangZhiLogin" class="form-control">
                    <option value="关闭">关闭</option>
                    <option value="开启" @if(get_options_setting('kaiguan_QiangZhiLogin')=="开启"){{ ("selected") }}@endif>开启</option>
                </select>
            </div>
        </div>        
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">回顶部按钮</label>
            <div class="col">
                <select name="view_return_top" class="form-control">
                    <option value="关闭">关闭</option>
                    <option value="开启" @if(get_options_setting('view_return_top')=="开启"){{ ("selected") }}@endif>开启</option>
                </select>
            </div>
        </div>        
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">帖子 - 标题前显示节点</label>
            <div class="col">
                <select name="view_topic_title_node_show" class="form-control">
                    <option value="开启">开启</option>
                    <option value="关闭" @if(get_options_setting('view_topic_title_node_show')=="关闭"){{ ("selected") }}@endif>关闭</option>
                </select>
            </div>
        </div>        
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">帖子 - 标题前显示标签</label>
            <div class="col">
                <select name="view_topic_title_tag_show" class="form-control">
                    <option value="开启">开启</option>
                    <option value="关闭" @if(get_options_setting('view_topic_title_tag_show')=="关闭"){{ ("selected") }}@endif>关闭</option>
                </select>
            </div>
        </div>        
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">首页 - 标题前显示节点</label>
            <div class="col">
                <select name="view_home_title_node_show" class="form-control">
                    <option value="开启">开启</option>
                    <option value="关闭" @if(get_options_setting('view_home_title_node_show')=="关闭"){{ ("selected") }}@endif>关闭</option>
                </select>
            </div>
        </div>        
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">首页 - 标题前显示标签</label>
            <div class="col">
                <select name="view_home_title_tag_show" class="form-control">
                    <option value="开启">开启</option>
                    <option value="关闭" @if(get_options_setting('view_home_title_tag_show')=="关闭"){{ ("selected") }}@endif>关闭</option>
                </select>
            </div>
        </div>        
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">全局 - 节点区块</label>
            <div class="col">
                <select name="view_common_node_show" class="form-control">
                    <option value="开启">开启</option>
                    <option value="关闭" @if(get_options_setting('view_common_node_show')=="关闭"){{ ("selected") }}@endif>关闭</option>
                </select>
            </div>
        </div>        
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">全局 - 标签区块</label>
            <div class="col">
                <select name="view_common_tag_show" class="form-control">
                    <option value="开启">开启</option>
                    <option value="关闭" @if(get_options_setting('view_common_tag_show')=="关闭"){{ ("selected") }}@endif>关闭</option>
                </select>
            </div>
        </div>        
    </div>
</div>