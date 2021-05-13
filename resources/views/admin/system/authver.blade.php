@extends('layouts.app')

@section('title', '授权验证')
@section('content')
<div class="container">
    <div class="row row-cards">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">验证授权</h3>
                    <form action="{{ route('admin.auth.post') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label">输入授权码</label>
                            <input type="text" class="form-control" name="code" required>
                        </div>
                        <button class="btn btn-indigo">提交</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
