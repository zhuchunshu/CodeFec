@extends('layouts.app')

@section('title', '修改用户组:' .$data->name)
@section('content')
    <div class="container">
        <div class="row justify-content-center row-cards">
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">更新用户组: {{ $data->name }}</h3>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.users.group.edit.post') }}" method="POST">
                            @csrf
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">用户组名称</label>
                                <div class="col">
                                    <input type="text" class="form-control" value="{{ old('name',$data->name) }}" name="name"
                                        placeholder="用户组名称" required>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">英文名</label>
                                <div class="col">
                                    <input type="text" class="form-control" value="{{ old('ename',$data->ename) }}" name="ename"
                                        placeholder="英文名" required>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">颜色值</label>
                                <div class="col">
                                    <input type="text" class="form-control" name="color"
                                        placeholder="颜色值" value="{{ old('color',$data->color) }}" required>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">权限值</label>
                                <div class="col">
                                    <input type="number" class="form-control" name="quanxian"
                                        placeholder="权限值" max="999" min="1" value="{{ old('quanxian',$data->quanxian) }}" required>
                                </div>
                            </div>

                            <div class="form-footer">
                                <button type="submit" name="id" value="{{ $data->id }}" class="btn btn-primary">提交</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
