<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">Github Client ID</label>
    <div class="col">
        <input type="text" class="form-control" name="Github_Client_ID" value="{{ Curd_Options()->Read_name('Github_Client_ID','setting',null) }}" placeholder="Github_Client_ID">
    </div>
</div>
<div class="form-group mb-3 row">
    <label class="form-label col-3 col-form-label">Github Client Secrets</label>
    <div class="col">
        <input type="text" class="form-control" name="Github_Client_Secrets" value="{{ Curd_Options()->Read_name('Github_Client_Secrets','setting',null) }}" placeholder="Github_Client_Secrets">
    </div>
</div>