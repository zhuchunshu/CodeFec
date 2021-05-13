@if ($paginator->hasPages())
<div class="col-12">
    <div class="card">
        <div class="card-body">
            <ul class="pagination ">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
        <li class="page-item page-prev disabled">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                <div class="page-item-subtitle">previous</div>
                <div class="page-item-title">上一页</div>
            </a>
        </li>
        @else
            <li class="page-item page-prev">
                <a class="page-link" href="{{ $paginator->previousPageUrl() }}" tabindex="-1" aria-disabled="true">
                    <div class="page-item-subtitle">previous</div>
                    <div class="page-item-title">上一页</div>
                </a>
            </li>
        @endif

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <li class="page-item page-next">
                <a class="page-link" href="{{ $paginator->nextPageUrl() }}">
                    <div class="page-item-subtitle">next</div>
                    <div class="page-item-title">下一页</div>
                </a>
            </li>
        @else
        <li class="page-item page-next disabled">
            <a class="page-link" href="{{ $paginator->nextPageUrl() }}">
                <div class="page-item-subtitle">next</div>
                <div class="page-item-title">下一页</div>
            </a>
        </li>
        @endif
    </ul>
</div>
</div>
</div>
@endif

