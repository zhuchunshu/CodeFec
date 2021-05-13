@extends('layouts.app')
@section('title', '修改文章-ID:' . $data['id'])
@section('content')
    <div class="container">
        <div class="row justify-content row-cards">
            @if($edit)
            <div class="col-md-12">
                <div class="card">

                    <div class="card-body">

                        <h3 class="card-title">修改文章-ID:{{ $data['id'] }}</h3>

                        <form action="{{ route('topic.edit.save.post') }}" method="POST">
                            @csrf
                            <input type="hidden" name="id" value="{{ $data['id'] }}">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="mb-3">
                                            <label class="form-label">请选择节点</label>
                                            <select name="node" id="select-people" class="form-select">
                                                <option value="0">未选择</option>
                                                @foreach (Curd_Node()->get_edit_nodie_all() as $key => $value)
                                                    <option @if($value['icon'])data-custom-properties="&lt;span class=&quot;avatar avatar-xs&quot; style=&quot;background-image: url({{ $value->icon }})&quot;&gt;&lt;/span&gt;"@endif value="{{ $value['id'] }}" @if ($value['id'] == old('node', $data['node_id'])) {{ 'selected' }} @endif>{{ $value['name'] }}
                                                    </option>
                                                    @foreach (Curd_Node()->get_edit_hasdie_all($value['id']) as $values)
                                                        <option @if($values['icon'])data-custom-properties="&lt;span class=&quot;avatar avatar-xs&quot; style=&quot;background-image: url({{ $values->icon }})&quot;&gt;&lt;/span&gt;"@endif value="{{ $values['id'] }}" @if ($values['id'] == old('node', $data['node_id'])) {{ 'selected' }} @endif>
                                                            {{ $values['name'] }}</option>
                                                    @endforeach
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="mb-3">
                                            <label class="form-label">请选择标签</label>
                                            <select name="tags" id="select-labels" class="form-control">
                                                <option value="0">未选择</option>
                                                @foreach (Curd_PostsType()->get_all() as $key => $value)
                                                    <option data-custom-properties="&lt;span class=&quot;badge bg-{{ $value['color'] }}&quot;&gt;{{ $value['name'] }}&lt;/span&gt;" value="{{ $value['id'] }}" value="{{ $value['id'] }}" @if ($value['id'] == old('tags', $data['type'])) {{ 'selected' }} @endif>
                                                        {{ $value['name'] }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="mb-3">
                                            <label class="form-label">标题</label>
                                            <input type="text" class="form-control" name="title"
                                                value="{{ old('title', $data['title']) }}" placeholder="标题" required>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <input type="hidden" name="content" id="content" value="{{ old('content', $data['content']) }}">
                            <input type="hidden" name="html" id="html"
                            value="{{ old('html', $data['html']) }}">
                            <div class="col-md-12">
                                <div class="mb-3" id="content-div">

                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="mb-3">
                                    <div class="form-label">转载地址(可不填):</div>
                                    <input class="form-control" type="url" name="zhuanzai"
                                        value="{{ old('zhuanzai', $data['zhuanzai']) }}">
                                </div>
                            </div>
                            {{-- 高级选项 --}}

                            @include('posts.create.gaoji')
                        
                            <div class="col-md-12">
                                <button class="btn btn-blue" type="submit">提交更改</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            @endif

            @if($admin_edit)

            <div class="col-md-12">

                <form action="{{route('admin.topic.edit.save.post')}}" method="POST">
                    @csrf
                    <input type="hidden" name="id" value="{{$data['id']}}">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">
                                管理操作
                            </h3>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">精华指数</label>
                                        <input type="number" min="1" max="999" class="form-control" name="jinghua" placeholder="不设置则不填" value="{{old('jinghua',$data['jing'])}}">
                                        <small>不设置精华则不填(数字越大排名越靠前)</small>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">置顶指数</label>
                                        <input type="number" min="0" max="999" class="form-control" name="zhiding" placeholder="不设置则不填" value="{{old('zhiding',$data['zhiding'])}}">
                                        <small>不置顶则不填,或者填0(数字越大排名越靠前)</small>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-blue">
                                        提交更改
                                    </button>
                                    <button type="submit" name="delete" value="yes" class="btn btn-blue">
                                        删除此帖
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

            @endif

        </div>
    </div>
@endsection

@section('scripts')
    <script src="{{ asset('js/vditor/index.min.js') }}"></script>
    <script>
        var edit_cache=false;
        var uploadurl = "{{ route('create.upimage') }}?_token={{ csrf_token() }}";
        var image_up = "{{ route('create.upimage') }}?_token={{ csrf_token() }}";
        var token = "{{ csrf_token() }}";

    </script>
    <script src="{{ mix('js/create/topic.js') }}"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
    	var el;
    	window.Choices && (new Choices(el = document.getElementById('select-people'), {
    		classNames: {
    			containerInner: el.className,
    			input: 'form-control',
    			inputCloned: 'form-control-sm',
    			listDropdown: 'dropdown-menu',
    			itemChoice: 'dropdown-item',
    			activeState: 'show',
    			selectedState: 'active',
    		},
    		shouldSort: false,
    		searchEnabled: false,
    		callbackOnCreateTemplates: function(template) {
    			var classNames = this.config.className,
    					itemSelectText = this.config.itemSelectText;
    			return {
    				item: function(classNames, data) {
                        if(data.customProperties){
                            return template('<div class="' + String(classNames.item) + ' ' + String( data.highlighted ? classNames.highlightedState : classNames.itemSelectable ) + '" data-item data-id="' + String(data.id) + '" data-value="' + String(data.value) + '"' + String(data.active ? 'aria-selected="true"' : '') + '' + String(data.disabled ? 'aria-disabled="true"' : '') + '><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + String(data.label) + '</div>');
                        }else{
                            return template('<div class="' + String(classNames.item) + ' ' + String( data.highlighted ? classNames.highlightedState : classNames.itemSelectable ) + '" data-item data-id="' + String(data.id) + '" data-value="' + String(data.value) + '"' + String(data.active ? 'aria-selected="true"' : '') + '' + String(data.disabled ? 'aria-disabled="true"' : '') + '>' + String(data.label) + '</div>');
                        }
    				},
    				choice: function(classNames, data) {
    					
                        if(data.customProperties){
                            return template('<div class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String( data.disabled ? classNames.itemDisabled : classNames.itemSelectable ) + '" data-select-text="' + String(itemSelectText) + '" data-choice  ' + String( data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable' ) + ' data-id="' + String(data.id) + '" data-value="' + String(data.value) + '" ' + String( data.groupId > 0 ? 'role="treeitem"' : 'role="option"' ) + ' ><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + String(data.label) + '</div>');
                        }else{
                            return template('<div class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String( data.disabled ? classNames.itemDisabled : classNames.itemSelectable ) + '" data-select-text="' + String(itemSelectText) + '" data-choice  ' + String( data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable' ) + ' data-id="' + String(data.id) + '" data-value="' + String(data.value) + '" ' + String( data.groupId > 0 ? 'role="treeitem"' : 'role="option"' ) + ' >' + String(data.label) + '</div>');
                        }
    				},
    			};
    		},
    	}));
    });
    // @formatter:on
    </script>
    <script>
            // @formatter:off
    document.addEventListener("DOMContentLoaded", function () {
    	var el;
    	window.Choices && (new Choices(el = document.getElementById('select-labels'), {
    		classNames: {
    			containerInner: el.className,
    			input: 'form-control',
    			inputCloned: 'form-control-sm',
    			listDropdown: 'dropdown-menu',
    			itemChoice: 'dropdown-item',
    			activeState: 'show',
    			selectedState: 'active',
    		},
    		shouldSort: false,
    		searchEnabled: false,
    		callbackOnCreateTemplates: function(template) {
    			var classNames = this.config.className,
    					itemSelectText = this.config.itemSelectText;
    			return {
    				item: function(classNames, data) {
                        if(data.customProperties){
                            return template('<div class="' + String(classNames.item) + ' ' + String( data.highlighted ? classNames.highlightedState : classNames.itemSelectable ) + '" data-item data-id="' + String(data.id) + '" data-value="' + String(data.value) + '"' + String(data.active ? 'aria-selected="true"' : '') + '' + String(data.disabled ? 'aria-disabled="true"' : '') + '><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + String(data.label) + '</div>');
                        }else{
                            return template('<div class="' + String(classNames.item) + ' ' + String( data.highlighted ? classNames.highlightedState : classNames.itemSelectable ) + '" data-item data-id="' + String(data.id) + '" data-value="' + String(data.value) + '"' + String(data.active ? 'aria-selected="true"' : '') + '' + String(data.disabled ? 'aria-disabled="true"' : '') + '>' + String(data.label) + '</div>');
                        }
    				},
    				choice: function(classNames, data) {
    					if(data.customProperties){
                            return template('<div class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String( data.disabled ? classNames.itemDisabled : classNames.itemSelectable ) + '" data-select-text="' + String(itemSelectText) + '" data-choice  ' + String( data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable' ) + ' data-id="' + String(data.id) + '" data-value="' + String(data.value) + '" ' + String( data.groupId > 0 ? 'role="treeitem"' : 'role="option"' ) + ' ><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + String(data.label) + '</div>');
                        }else{
                            return template('<div class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String( data.disabled ? classNames.itemDisabled : classNames.itemSelectable ) + '" data-select-text="' + String(itemSelectText) + '" data-choice  ' + String( data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable' ) + ' data-id="' + String(data.id) + '" data-value="' + String(data.value) + '" ' + String( data.groupId > 0 ? 'role="treeitem"' : 'role="option"' ) + ' >' + String(data.label) + '</div>');
                        }
    				},
    			};
    		},
    	}));
    });
    // @formatter:on
    </script>
    <script src="{{ asset('tabler/dist/libs/choices.js/public/assets/scripts/choices.js') }}"></script>
@endsection

@section('css')
    <link rel="stylesheet" href="{{ asset('js/vditor/index.css') }}">
@endsection
