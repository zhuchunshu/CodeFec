@extends('layouts.app')

@section('title', '编辑['.$data['username'].']用户信息')
@section('content')
    <div class="container-xl">
        <div class="row row-cards">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">基本信息</h3>
                    </div>
                    <div class="card-body">
                        <form action="{{route('admin.users.edit.save')}}" method="POST">
                            @csrf
                            <input type="hidden" name="id" value="{{$data['id']}}">
                            <div class="form-group mb-3 ">
                                <label class="form-label">邮箱</label>
                                <div>
                                    <input type="email" class="form-control" aria-describedby="emailHelp"
                                        placeholder="Enter email" name="email" value="{{$data['email']}}" required>
                                </div>
                            </div>
                            <div class="form-group mb-3 ">
                                <label class="form-label">用户名</label>
                                <div>
                                    <input type="text" name="username" class="form-control" value="{{$data['username']}}" placeholder="用户名">
                                </div>
                            </div>
                            <div class="form-group mb-3 ">
                                <label class="form-label">用户组</label>
                                <div>
                                    <select class="form-control" name="user_group">
                                        @foreach($user_group as $key => $value)
                                        <option value="{{$value['id']}}" @if($data['user_group']==$value['id']) selected @endif>{{$value['name']}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-footer">
                                <button type="submit" class="btn btn-primary">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {{-- <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">个人信息</h3>
                    </div>
                    <div class="card-body">
                        <form action="{{route('users.setting.save')}}" method="POST">
                            @csrf
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">个人签名</label>
                                <div class="col">
                                    <textarea class="form-control" name="qianming" rows="5">{!!$data['qianming']!!}</textarea>
                                    <small class="form-hint">支持markdown,不支持html</small>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">QQ</label>
                                <div class="col">
                                    <input type="text" minlength="5" maxlength="11" class="form-control" name="qq" value="{{$data['qq']}}" placeholder="qq">
                                    <small class="form-hint">
                                        是否愿意留下QQ联系方式?
                                    </small>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">微信</label>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="wechat" value="{{$data['wechat']}}" name="wechat">
                                    <small class="form-hint">
                                        微信是一个成熟的聊天工具
                                    </small>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">TeleGram</label>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="telegram" value="{{$data['telegram']}}" name="telegram">
                                    <small class="form-hint">
                                        Tg...
                                    </small>
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">公司</label>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="company" value="{{$data['gongsi']}}" name="gongsi">
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">职位</label>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="occupation" value="{{$data['zhiwei']}}" name="zhiwei">
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">网站</label>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="website" value="{{$data['website']}}" name="website">
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label class="form-label col-3 col-form-label">所在地</label>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="address" value="{{$data['address']}}" name="address">
                                </div>
                            </div>
                            <div class="form-footer">
                                <button type="submit" class="btn btn-primary">提交</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> --}}
        </div>
    </div>
@endsection
