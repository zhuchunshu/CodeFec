if (jiexi == "yes") {
    $.ajax({
        url: topic_md_url,
        data: {
            '_token': $('meta[name="csrf-token"]').attr('content')
        }, //格式{key:value}
        success: function (response) { //请求成功回调
            Vditor.preview(document.getElementById('comment-content'), response)
            $(document).ready(() => {
                setTimeout(function () {
                    const previewElement = document.getElementById('comment-content')
                    previewElement.addEventListener("click", (event) => {
                        if (event.target.tagName === "IMG") {
                            Vditor.previewImage(event.target);
                        }
                    });
                }, 100)
            });
        },
    })
} else {
    const previewElement = document.getElementById('comment-content')
    previewElement.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            Vditor.previewImage(event.target);
        }
    });
    Vditor.mermaidRender(previewElement)
    Vditor.abcRender(previewElement)
    Vditor.chartRender(previewElement)
    Vditor.mathRender(previewElement)
    Vditor.mediaRender(previewElement)
    Vditor.highlightRender({ lineNumber: true, enable: true }, previewElement)
    Vditor.codeRender(previewElement)
    Vditor.graphvizRender(previewElement)
    Vditor.flowchartRender(previewElement)
    Vditor.plantumlRender(previewElement)
    $.ajax({
        url: topic_md_url,
        data: {
            '_token': $('meta[name="csrf-token"]').attr('content')
        }, //格式{key:value}
        success: function (response) { //请求成功回调
            Vditor.preview(document.getElementById('comment-content'), response)
            $(document).ready(() => {
                setTimeout(function () {
                    const previewElement = document.getElementById('comment-content')
                    previewElement.addEventListener("click", (event) => {
                        if (event.target.tagName === "IMG") {
                            Vditor.previewImage(event.target);
                        }
                    });
                }, 100)
            });
        },
    })
}