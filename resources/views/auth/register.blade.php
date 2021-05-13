@extends('layouts.app')
@section('title', '注册')
@section('description', get_options_setting('web_name').'注册,在这里创建一个新的'.get_options_setting('web_name').'账号')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">

                    <div class="card-body">
                        <h3 class="card-title">{{ __('Register') }}</h3>
                        <form method="POST" action="{{ route('register') }}">
                            @csrf

                            <div class="mb-3">
                                <label for="username" class="form-label">{{ __('用户名') }}</label>

                                <input id="username" type="text" class="form-control @error('username') is-invalid @enderror"
                                    name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>

                                @error('username')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">{{ __('E-Mail Address') }}</label>

                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
                                    name="email" value="{{ old('email') }}" required autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">{{ __('Password') }}</label>

                                <input id="password" type="password"
                                    class="form-control @error('password') is-invalid @enderror" name="password" required
                                    autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="password-confirm" class="form-label">{{ __('Confirm Password') }}</label>
                                <input id="password-confirm" type="password" class="form-control"
                                    name="password_confirmation" required autocomplete="new-password">
                            </div>
                            {{-- 邀请码 --}}
                            @if(get_options_setting('kaiguan_invitationReg')=="开启")
                            <div class="mb-3">
                                <label for="InvitationCode" class="form-label">{{ __('注册邀请码') }}</label>
                                <input id="InvitationCode" type="text" class="form-control"
                                    name="InvitationCode" required autocomplete="InvitationCode">
                            </div>
                            @endif
                            <div class="mb-3">
                                <label for="captcha" class="form-label">验证码</label>

                                <input id="captcha"
                                    class="form-control{{ $errors->has('captcha') ? ' is-invalid' : '' }}" name="captcha"
                                    required>

                                <img class="thumbnail captcha mt-3 mb-2" src="{{ captcha_src('flat') }}"
                                    onclick="this.src='/captcha/flat?'+Math.random()" title="点击图片重新获取验证码">

                                @if ($errors->has('captcha'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('captcha') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
