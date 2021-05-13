<div class="col-md-3">

    <div class="row row-cards rd">

        <div class="col-md-12 sticky" style="top: 105px">
            <div class="row row-cards">
                {{-- 发帖 --}}

                @include('home.wid.home_tag')

                {{-- 个人信息 --}}
                {{-- @if (Auth::user())
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <span class="avatar avatar-rounded"
                                style="background-image: url({{ avatar(Auth::user()->email) }})"></span>
                        </div>
                        <div class="card-title mb-1">{{ Auth::user()->username }}</div>
                        <div class="text-muted"><span
                                class="badge bg-{{ Curd_UserGroup()->Read_id(Auth::user()->user_group)['color'] }}">{{ Curd_UserGroup()->Read_id(Auth::user()->user_group)['name'] }}</span>
                        </div>
                    </div>
                    <a href="{{ route('users.setting') }}" class="card-btn">编辑个人资料</a>
                </div>
            </div>
        @endif --}}


                @include('home.wid.node')
                {{-- 赞助商 --}}

                @include('home.wid.zanzhushang')

                {{-- 标签 --}}

                @include('home.wid.tags')

                {{-- 友情链接 --}}

                @include('home.wid.friend')
            </div>
        </div>

    </div>
</div>
