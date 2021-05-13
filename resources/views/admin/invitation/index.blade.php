@extends('layouts.app')
@section('title', '邀请注册 | 站点管理')
@section('content')
    <div class="container">
        <div class="row row-cards justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <h2 class="accordion-header" id="heading-4">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#shengcheng" aria-expanded="true">
                            生成邀请码
                        </button>
                    </h2>
                    <div id="shengcheng" class="accordion-collapse collapse">
                        <div class="accordion-body pt-0">
                            <form action="{{ route('admin.invitation.create') }}" method="POST">
                                @csrf
                                <div class="row">
                                    <div class="col-md-4 col-4">
                                        <div class="mb-3">
                                            <label class="form-label">前缀 (可不填)</label>
                                            <input type="text" class="form-control" name="qianzhui"
                                                value="{{ old('qianzhui') }}">
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-4">
                                        <div class="mb-3">
                                            <label class="form-label">后缀 (可不填)</label>
                                            <input type="text" class="form-control" name="houzhui"
                                                value="{{ old('houzhui') }}">
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-4">
                                        <div class="mb-3">
                                            <label class="form-label">生成数量</label>
                                            <input type="number" min="1" max="10000" class="form-control" name="shuliang"
                                                value="{{ old('shuliang') }}" required>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-4">
                                        <button class="btn btn-indigo" type="submit">生成</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">邀请码列表</h3>
                        <form action="{{ route('admin.invitation.chuli') }}" onsubmit="return confirm('确定要执行操作吗?')" method="POST">
                            @csrf
                            <div class="table-responsive">
                                <table class="table table-vcenter table-nowrap">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>创建者</th>
                                            <th>邀请码</th>
                                            <th>使用状态</th>
                                            <th>使用者</th>
                                            <th>使用时间</th>
                                            <th>使用者ip</th>
                                            <th>创建者ip</th>
                                            <th>创建时间</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @if ($page->count())
                                            @foreach ($page as $value)
                                                <tr>
                                                    <td>
                                                        <label class="form-check form-check-inline">
                                                            <input class="form-check-input" type="checkbox"
                                                                name="xuanze[{{ $value->id }}]">
                                                            <span class="form-check-label">{{ $value->id }}</span>
                                                        </label>
                                                    <td><a
                                                            href="{{ route('public.user.about', ['id' => $value->user->id]) }}">{{ $value->user->username }}</a>
                                                    </td>
                                                    <td>{{ $value->code }}</td>
                                                    <td>{{ $value->zhuangtai }}</td>
                                                    <td>
                                                        @if ($value->use_id)
                                                            <a
                                                                href="{{ route('public.user.about', ['id' => $value->use_user->id]) }}">{{ $value->use_user->username }}</a>
                                                            @else{{ '未使用' }}
                                                        @endif
                                                    </td>
                                                    <td>
                                                        @if ($value->time)
                                                            {{ date('Y-m-d H:i:s', $value->time) }}
                                                            @else{{ '未使用' }}@endif
                                                    </td>
                                                    <td>
                                                        @if ($value->use_ip)
                                                            {{ $value->use_ip }}
                                                            @else{{ '未使用' }}@endif
                                                    </td>
                                                    <td>{{ $value->created_ip }}</td>
                                                    <td>{{ $value->created_at }}</td>
                                                </tr>
                                            @endforeach
                                        @else
                                            <tr>
                                                <td>无内容</td>
                                                <td>无内容</td>
                                                <td>无内容</td>
                                                <td>无内容</td>
                                                <td>无内容</td>
                                                <td>无内容</td>
                                                <td>无内容</td>
                                                <td>无内容</td>
                                                <td>无内容</td>
                                            </tr>
                                        @endif
                                    </tbody>
                                </table>
                            </div>
                            @if ($page->count())
                                <button type="submit" name="type" value="delete" class="btn btn-indigo">删除选中</button>
                                <button class="btn btn-indigo" name="type" value="export" type="submit">导出选中</button>
                                <button class="btn btn-indigo" name="type" value="export_shiyong" type="submit">导出已使用</button>
                                <button class="btn btn-indigo" name="type" value="export_weishiyong" type="submit">导出未使用</button>
                                <button class="btn btn-indigo" name="type" value="qingkong_shiyong" type="submit">清空已使用</button>
                                <button class="btn btn-indigo" id="checkAll" type="button">全选</button>
                                <button class="btn btn-indigo" id="reverseCheck" type="button">反选</button>
                            @endif

                        </form>
                    </div>
                    {{ $page->links() }}
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        //1.获取页面元素
        var checkAll = document.getElementById('checkAll'); //全选
        var reverseCheck = document.getElementById('reverseCheck'); //反选
        var checkList = document.getElementsByClassName('form-check-input'); //选择框列表
        //2.注册事件
        //2.1 全选
        checkAll.onclick = function() {
            //3.事件处理：选中所有选择框（设置checked属性为true）
            for (var i = 0; i < checkList.length; i++) {
                checkList[i].checked = true;
            }
        }
        //2.3 反选
        reverseCheck.onclick = function() {
            //3.事件处理:让每一个选择框的checked属性与自身相反
            for (var i = 0; i < checkList.length; i++) {
                checkList[i].checked = !checkList[i].checked; //逻辑非取反
                // if (checkList[i].checked == true){
                //   checkList[i].checked = false;
                // }else{//false
                //   checkList[i].checked = true;
                // }
            }
        }

    </script>
@endsection
