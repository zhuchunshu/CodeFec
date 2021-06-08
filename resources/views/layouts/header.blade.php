<div class="sticky-top">
    <header class="navbar sticky-top navbar-expand-md navbar-dark d-print-none">
        <div class="container-xl">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                <a href="{{ url('/') }}">
                    {{-- <img src="./static/logo.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image"> --}}
                    {{-- logo --}}
                    {{ Curd_Options()->Read_name('web_name', 'setting', 'CodeFec') }}
                </a>
            </h1>
            {{-- <div class="navbar-nav flex-row order-md-last">
            <div class="nav-item dropdown d-none d-md-flex me-3">
              <a href="#" class="nav-link px-0" data-toggle="dropdown" tabindex="-1" aria-label="Show notifications">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                <span class="badge bg-red"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-card">
                <div class="card">
                  <div class="card-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet consectetur exercitationem fugiat in ipsa ipsum, natus odio quidem quod repudiandae sapiente. Amet debitis et magni maxime necessitatibus ullam.
                  </div>
                </div>
              </div>
            </div> --}}
            <div class="navbar-nav flex-row order-md-last">
                @if (Auth::id())
                <div class="nav-item d-none d-md-flex me-3">
                    <a href="{{ route('users.my.notice') }}" class="nav-link px-0" data-bs-toggle="tooltip" data-bs-placement="top" title="我的通知">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                      @if(user_my_notice_count())<span class="badge bg-red"></span>@endif
                    </a>
                  </div>
                @endif
                
                {{-- 日夜主题 --}}
    
                <div class="nav-item me-3">
                    <a href="{{ route('client.action.theme_qiehuan') }}" class="nav-link px-0" data-bs-toggle="tooltip" data-bs-placement="top" title="切换@if(theme_riye()!="dark") 夜间@else 日间 @endif 状态">
                      @if(theme_riye()!="dark")
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brightness-half" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 9a3 3 0 0 0 0 6v-6z"></path>
                        <path d="M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5z"></path>
                     </svg>
                     @else
                     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brightness-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                        <line x1="12" y1="5" x2="12" y2="3"></line>
                        <line x1="17" y1="7" x2="18.4" y2="5.6"></line>
                        <line x1="19" y1="12" x2="21" y2="12"></line>
                        <line x1="17" y1="17" x2="18.4" y2="18.4"></line>
                        <line x1="12" y1="19" x2="12" y2="21"></line>
                        <line x1="7" y1="17" x2="5.6" y2="18.4"></line>
                        <line x1="6" y1="12" x2="4" y2="12"></line>
                        <line x1="7" y1="7" x2="5.6" y2="5.6"></line>
                     </svg>
                    @endif
                    </a>
                </div>
    
                <div class="nav-item dropdown">
                    @guest
                        <span>
                            @if (Route::has('login'))
                                <a class="btn btn-dark" href="{{ route('login') }}">{{ __('Login') }}</a>
                            @endif
                            @if (Route::has('register'))
                                <a class="btn btn-light" href="{{ route('register') }}">{{ __('Register') }}</a>
                            @endif
                        </span>
                    @else
                        <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                            aria-label="Open user menu">
                            <span class="avatar avatar-sm"
                                style="background-image: url({{ user_avatars(Auth::user()->email,Auth::user()->avatar) }})"></span>
                            <div class="d-none d-xl-block ps-2">
                                <div>{{ Auth::user()->username }}</div>
                                <div class="mt-1 small text-muted">本站第{{ Auth::user()->id }}位股东</div>
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <a href="{{ route('public.user.about', ['id' => Auth::id()]) }}" class="dropdown-item">我的信息</a>
                            {{-- <a href="#" class="dropdown-item">Profile & account</a> --}}
                            <a href="{{ route('topic.draft') }}" class="dropdown-item">我的草稿</a>
                            <div class="dropdown-divider"></div>
                            <a href="{{ route('users.setting') }}" class="dropdown-item">设置</a>
                            <form action="{{ route('logout') }}" method="POST" onsubmit="return confirm('您确定要退出吗？');">
                                {{ csrf_field() }}
                                <button class="dropdown-item" type="submit" name="button">退出</button>
                            </form>
                        </div>
                    </div>
                @endguest
            </div>
        </div>
    </header>
    <div class="navbar-expand-md">
        <div class="navbar collapse navbar-collapse navbar-light" id="navbar-menu">
            <div class="container-xl">
                <ul class="navbar-nav">
                    @foreach ((array) config('codefec.navbar') as $key => $value)
                        @if ($value['type'] == 'singer')
                            @if (@$value['quanxian'])
                                {{-- 需要权限验证 --}}
                                @if (Auth::user() && Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'] >= $value['quanxian'])
                                    <li class="@if (route_name()==$value['route']){{ 'nav-item active' }}@else{{ 'nav-item' }} @endif">
                                        <a class="nav-link" href="{{ route($value['route']) }}">
                                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                                {!! $value['icon'] !!}
                                            </span>
                                            <span class="nav-link-title">
                                                {{ $key }}
                                            </span>
                                        </a>
                                    </li>
                                @endif
                            @else
                                <li class="@if (route_name()==$value['route']) {{ 'nav-item active' }}@else{{ 'nav-item' }} @endif">
                                    <a class="nav-link" href="{{ route($value['route']) }}">
                                        <span class="nav-link-icon d-md-none d-lg-inline-block">
                                            {!! $value['icon'] !!}
                                        </span>
                                        <span class="nav-link-title">
                                            {{ $key }}
                                        </span>
                                    </a>
                                </li>
                            @endif
                        @endif
                        @if ($value['type'] == 'dropdown' && @count($value['li']))
                            @if (@$value['quanxian'])
                                @if (Auth::user() && Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'] >= $value['quanxian'])
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown"
                                            role="button" aria-expanded="false">
                                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                                {!! $value['icon'] !!}
                                            </span>
                                            <span class="nav-link-title">
                                                {{ $key }}
                                            </span>
                                        </a>
                                        <div class="dropdown-menu">
                                            <div class="dropdown-menu-columns">
                                                <div class="dropdown-menu-column">
                                                    @foreach ($value['li'] as $keys => $values)
                                                        @if (is_array($values))
                                                            @if (@$values['quanxian'])
                                                                @if (Auth::user() && Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'] >= $values['quanxian'])
                                                                    <a class="dropdown-item @if (route_name()==$values['route']){{ 'active' }}@endif"
                                                                        href="{{ route($values['route']) }}">
                                                                        {{ $keys }}
                                                                    </a>
                                                                @endif
                                                            @endif
                                                        @else
                                                            <a class="dropdown-item @if (route_name()==$values['route']){{ 'active' }}@endif"
                                                                href="{{ route($values) }}">
                                                                {{ $keys }}
                                                            </a>
                                                        @endif
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                @endif
                            @else
                            @if(@count($value['li']))
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown"
                                    role="button" aria-expanded="false">
                                    <span class="nav-link-icon d-md-none d-lg-inline-block">
                                        {!! $value['icon'] !!}
                                    </span>
                                    <span class="nav-link-title">
                                        {{ $key }}
                                    </span>
                                </a>
                                <div class="dropdown-menu">
                                    <div class="dropdown-menu-columns">
                                        <div class="dropdown-menu-column">
                                            @foreach ($value['li'] as $keys => $values)
                                                @if (is_array($values))
                                                    @if (@$values['quanxian'])
                                                        @if (Auth::user() && Curd_UserGroup()->Read_id(Auth::user()->user_group)['quanxian'] >= $values['quanxian'])
                                                            <a class="dropdown-item @if (route_name()==$values['route']){{ 'active' }}@endif"
                                                                href="{{ route($values['route']) }}">
                                                                {{ $keys }}
                                                            </a>
                                                        @endif
                                                    @endif
                                                @else
                                                    <a class="dropdown-item @if (route_name()==$values['route']){{ 'active' }}@endif"
                                                        href="{{ route($values) }}">
                                                        {{ $keys }}
                                                    </a>
                                                @endif
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </li>
                            @endif
                            @endif
                        @endif
                    @endforeach
                </ul>
                <div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                    <form action="{{route('search')}}" method="get">
                        @csrf
                        <div class="input-icon">
                            <span class="input-icon-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx="10" cy="10" r="7" />
                                    <line x1="21" y1="21" x2="15" y2="15" />
                                </svg>
                            </span>
                            <input type="text" name="q" class="form-control" placeholder="Search…">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>    
</div>