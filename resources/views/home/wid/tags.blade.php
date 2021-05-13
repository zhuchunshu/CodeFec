@if (get_options_setting('view_common_tag_show')!="关闭")
@if (count(Curd_Links()->get_all()))
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">节点标签</h3>
                @foreach (Curd_PostsType()->get_all() as $key => $value)
                    <a href="{{ route('tags', ['ename' => $value['ename']]) }}"><span
                            class="badge bg-{{ $value['color'] }}">{{ $value['name'] }}</span></a>
                @endforeach
            </div>
        </div>
    </div>
@endif
@endif
