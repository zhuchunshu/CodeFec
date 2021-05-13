@extends('layouts.app')

@section('title', '图片设置 | 站点高级设置')
@section('content')
    <div class="container-xl">
        <div class="row row-cards">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">图片设置</h3>
                        <form action="{{ route('admin.setting.pro.image.save') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="row row-cards">
                                <div class="col-md-6">
                                    <label class="form-label">站点ICON</label>
                                    <a href="{{ get_options_image('icon','/assets/images/logo.svg') }}" class="avatar avatar-md" style="background-image: url({{ get_options_image('icon','/assets/images/logo.svg') }})"></a>
                                    <input type="file" class="form-control" name="icon">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">帖子默认缩略图</label>
                                    <a href="{{ get_options_image('topic_bc','/assets/images/topic_bc.jpg') }}" class="avatar avatar-md" style="background-image: url({{ get_options_image('topic_bc','/assets/images/topic_bc.jpg') }})"></a>
                                    <input type="file" class="form-control" name="topic_bc">
                                </div>
                                <div class="col-md-12">
                                    <button class="btn btn-indigo" type="submit">提交</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
