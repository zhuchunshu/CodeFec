<div class="row">
    @foreach (config("codefec.setting.admin.kaiguan") as $name => $value)
    <div class="col-md-4">
        <div class="form-group mb-3 row">
            <label class="form-label col-3 col-form-label">{{ $name }}</label>
            <div class="col">
                <select name="{{ $value }}" class="form-control">
                    <option value="关闭">关闭</option>
                    <option value="开启" @if(get_options_setting($value)=="开启"){{ ("selected") }}@endif>开启</option>
                </select>
            </div>
        </div>        
    </div>        
    @endforeach

</div>