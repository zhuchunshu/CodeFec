{{-- 节点列表 --}}
@if (get_options_setting('view_common_node_show')!="关闭")
<div class="col-md-12">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">所有节点</h3>
            <div class="list-group list-group-flush overflow-auto" style="max-height: 180px">
                <div class="list-group-item">
                    <div class="row">
                        <div class="col-auto">
                            <a href="{{ route('index') }}">
                                <span class="avatar"><svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-home" width="24" height="24"
                                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
                                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                                    </svg></span>
                            </a>
                        </div>
                        <div class="col text-truncate">
                            <a href="{{ route('index') }}"
                                class="text-body d-block">{{ Curd_Options()->Read_name('web_name', 'setting') }}</a>
                            <div class="text-muted text-truncate mt-n1">
                                {{ Curd_Options()->Read_name('web_description', 'setting') }}
                            </div>
                        </div>
                    </div>
                </div>
                @foreach (Curd_Node()->get_nodie_all() as $key => $value)
                    <div class="list-group-item">
                        <div class="row">
                            <div class="col-auto">
                                <a href="{{ route('node', ['ename' => $value['ename']]) }}">
                                    <span class="avatar"
                                        style="background-image: url({{ $value['icon'] }})"></span>
                                </a>
                            </div>
                            <div class="col text-truncate">
                                <a href="{{ route('node', ['ename' => $value['ename']]) }}"
                                    class="text-body d-block">{{ $value['name'] }}</a>
                                <div class="text-muted text-truncate mt-n1">
                                    创建于:
                                    {{ $value['created_at'] }}
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endif