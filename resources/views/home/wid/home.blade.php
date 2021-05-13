<div class="col-md-12">
    <div class="card">
        <div class="card-status-top bg-{{ $node['color'] }}"></div>
        <div class="card-body">
            <h3 class="card-title">
                {{ $node['name'] }}
            </h3>
            {!! Helpers()->markdowntohtml($node['description']) !!}
        </div>
        <div class="card-footer">
            @if (Auth::id())
                <a href="{{ route('create.topic') }}" class="btn btn-{{ $node['color'] }}">
                    发帖
                </a>
            @else
                <span>
                    <a class="btn btn-dark" href="{{ route('login') }}">登录</a>
                    <a class="btn btn-light" href="{{ route('register') }}">注册</a>
                    @if (get_options_setting('Github_Client_ID') && get_options_setting('Github_Client_Secrets'))
                        <a href="{{ route('auth.login.github') }}" class="btn btn-github"><svg
                                xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5">
                                </path>
                            </svg>Github登录</a>
                    @endif
                </span>
            @endif
            @if ($node['ename'])
                <a href="{{ route('node.data', ['ename' => $node['ename']]) }}"
                    class="btn btn-{{ $node['color'] }}">
                    访问此节点
                </a>
            @endif
        </div>
    </div>
</div>
