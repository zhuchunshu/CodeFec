<div class="mb-3">
    <div class="form-label">打赏设置</div>
    <textarea class="form-control" rows="5" name="dashang">@if ($data['dashang']){{ $data['dashang'] }}@else{{ ("支付宝|收款链接
微信|收款链接
PAYPAL|收款链接") }}@endif</textarea>
<small>一行一个,名称和收款链接用 <b>|</b> 隔开 </small>
</div>
