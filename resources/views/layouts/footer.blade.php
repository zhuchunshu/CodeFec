<footer class="footer footer-transparent d-print-none">
    <div class="container">
      <div class="row text-center align-items-center flex-row-reverse">
        <div class="col-lg-auto ms-lg-auto">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item"><a href="{{ route('public.contact') }}">联系我们</a></li>
            {{-- <li class="list-inline-item"><a href="{{ route('public.user.list.ban') }}">小黑屋</a></li>
            <li class="list-inline-item"><a href="{{ route('public.zanzhu') }}">本站赞助商</a></li> --}}
            {{-- <li class="list-inline-item"><a href="{{route('public.friend')}}" target="_blank" rel="noopener">友情链接</a></li> --}}
          </ul>
        </div>
        <div class="col-12 col-lg-auto mt-3 mt-lg-0">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item">
              {{date("Y")}}
              <a href="{{url('/')}}">{{ Curd_Options()->Read_name('web_name', 'setting', 'CodeFec') }}</a>. All rights reserved.
            </li>
            {{-- <li class="list-inline-item">
              <a href="./changelog.html" class="link-secondary" rel="noopener">v1.0.0-alpha.24</a>
            </li> --}}
          </ul>
        </div>
      </div>
    </div>
</footer>
