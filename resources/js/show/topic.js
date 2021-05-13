if (jiexitopic == "yes") {
    $.ajax({
        url: topic_md_url,
        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
        }, //格式{key:value}
        success: function (response) {
            //请求成功回调
            Vditor.preview(document.getElementById("topic-content"), response);
            $(document).ready(() => {
                setTimeout(function () {
                    const previewElement = document.getElementById(
                        "topic-content"
                    );
                    previewElement.addEventListener("click", (event) => {
                        if (event.target.tagName === "IMG") {
                            Vditor.previewImage(event.target);
                        }
                    });
                }, 100);
            });
        },
    });
} else {
    const previewElement = document.getElementById("topic-content");
    previewElement.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            Vditor.previewImage(event.target);
        }
    });
    Vditor.mermaidRender(previewElement);
    Vditor.abcRender(previewElement);
    Vditor.chartRender(previewElement);
    Vditor.mathRender(previewElement);
    Vditor.mediaRender(previewElement);
    Vditor.highlightRender({ lineNumber: true, enable: true }, previewElement);
    Vditor.codeRender(previewElement);
    Vditor.graphvizRender(previewElement);
    Vditor.flowchartRender(previewElement);
    Vditor.plantumlRender(previewElement);
    $.ajax({
        url: topic_md_url,
        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
        }, //格式{key:value}
        success: function (response) {
            //请求成功回调
            Vditor.preview(document.getElementById("topic-content"), response);
            $(document).ready(() => {
                setTimeout(function () {
                    const previewElement = document.getElementById(
                        "topic-content"
                    );
                    previewElement.addEventListener("click", (event) => {
                        if (event.target.tagName === "IMG") {
                            Vditor.previewImage(event.target);
                        }
                    });
                }, 100);
            });
        },
    });
}

$('div[name="comment-show"]').each(function () {
    var id = $(this).attr("id"),
        md_url = $(this).attr("md-url"),
        ishtml = $(this).attr("ishtml");
    if (ishtml != "yes") {
        $.ajax({
            url: md_url,
            data: {
                _token: $('meta[name="csrf-token"]').attr("content"),
            }, //格式{key:value}
            success: function (response) {
                //请求成功回调
                Vditor.preview(document.getElementById(id), response);
            },
        });
    } else {
        var id = $(this).attr("id");
        const previewElement = document.getElementById(id);
        Vditor.mermaidRender(previewElement);
        Vditor.abcRender(previewElement);
        Vditor.chartRender(previewElement);
        Vditor.mathRender(previewElement);
        Vditor.mediaRender(previewElement);
        Vditor.highlightRender(
            { lineNumber: true, enable: true },
            previewElement
        );
        Vditor.codeRender(previewElement);
        Vditor.graphvizRender(previewElement);
        Vditor.flowchartRender(previewElement);
        Vditor.plantumlRender(previewElement);
        $.ajax({
            url: md_url,
            data: {
                _token: $('meta[name="csrf-token"]').attr("content"),
            }, //格式{key:value}
            success: function (response) {
                //请求成功回调
                Vditor.preview(document.getElementById(id), response);
            },
        });
    }
});
$("#topic-like").click(function () {
    $.ajax({
        type: "POST",
        url: "/api/topic/like",
        data: {
            _userToken: $('meta[name="_Token"]').attr("content"),
            topic_id: $(this).attr("topic-id"),
        },
        dataType: "json",
        success: function (response) {
            //请求成功回调
            swal(response.message, response.data, response.message);
        },
        error: function (e) {
            //请求超时回调
            if (e.statusText == "timeout") {
                alert("请求超时");
            }
            alert("请求出错");
        },
    });
});

if($("#report_content").length){
    const content = document.getElementById("report_content");
    const vditor = new Vditor("report_edit", {
        height: 500,
        cache: {
            enable: false,
        },
        value: content.value,
        // "preview": {
        //     "theme": {
        //       "current": "dark"
        //     }
        // },
        // "theme": "dark",
        hint: {
            emoji: {
                "+1": "👍",
                "-1": "👎",
                拜托: "🙏",
                bot: "🤖",
                哈哈: "😀",
                笑: "😀",
                哭笑不得: "😂",
                流汗: "😅",
                小丑: "🤡",
                中国: "🇨🇳",
                握手: "🤝",
                OK: "👌",
                爷: "👴",
                re_chui: "https://www.zhuchunshu.com/ovo/re_qgzs.png",
                re_daka: "https://www.zhuchunshu.com/ovo/re_daka.png",
                re_chui: "https://www.zhuchunshu.com/ovo/re_chui.png",
                re_wkl: "https://www.zhuchunshu.com/ovo/re_wkl.png",
                re_xiu: "https://www.zhuchunshu.com/ovo/re_xiu.png",
                re_zsmq: "https://www.zhuchunshu.com/ovo/re_zsmq.png",
                "33_no1": "https://www.zhuchunshu.com/ovo/33_no1.png",
                "33_yiwen": "https://www.zhuchunshu.com/ovo/33_yiwen.png",
                "33_maimeng": "https://www.zhuchunshu.com/ovo/33_maimeng.png",
                "33_hecha": "https://www.zhuchunshu.com/ovo/33_hecha.png",
                "33_wuyan": "https://www.zhuchunshu.com/ovo/33_wuyan.png",
                "22_yumen": "https://www.zhuchunshu.com/ovo/22_yumen.png",
                "22_daku": "https://www.zhuchunshu.com/ovo/22_daku.png",
                "22_chijing": "https://www.zhuchunshu.com/ovo/22_chijing.png",
                "22_daxiao": "https://www.zhuchunshu.com/ovo/22_daxiao.png",
            },
            emojiTail: "CodeFec精选表情",
        },
        mode: "ir",
        toolbar: [
            "emoji",
            "headings",
            "bold",
            "italic",
            "strike",
            "link",
            "|",
            "list",
            "ordered-list",
            "check",
            "|",
            "quote",
            "line",
            "code",
            "inline-code",
            "insert-before",
            "insert-after",
            "|",
            "upload",
            "record",
            "table",
            "|",
            "undo",
            "redo",
            "|",
            "fullscreen",
        ],
        upload: {
            accept: "image/*,.wav",
            token: token,
            url: uploadurl,
            linkToImgUrl: image_up,
            filename(name) {
                return name
                    .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
                    .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
                    .replace("/\\s/g", "");
            },
        },
        typewriterMode: true,
        // after () {
        //   logElement.innerText = '渲染完成'
        // },
        // ctrlEnter (md) {
        //   logElement.innerText = '用户按下了 Ctrl+Enter，Markdown 内容为：\n' + md
        // },
        input(md) {
            content.value = md;
        },
        // blur (md) {
        //   logElement.innerText = '用户离开了编辑器，Markdown 内容为：\n' + md
        // },
        // select (md) {
        //   logElement.innerText = '用户选中了一段文字，内容为：\n' + md
        // },
        // focus (md) {
        //   logElement.innerText = '用户选中了编辑器，Markdown 内容为：\n' + md
        // },
        // esc (md) {
        //   logElement.innerText = '用户按下了 ESC，Markdown 内容为：\n' + md
        // },
    });
    
}
// 评论点赞
$('button[action="comment-like"]').each(function () {
    $(this).click(function () {
        $.ajax({
            type: "POST",
            url: "/api/topic/comment/like",
            data: {
                _userToken: $('meta[name="_Token"]').attr("content"),
                comment_id: $(this).attr("comment-id"),
            },
            dataType: "json",
            success: function (response) {
                //请求成功回调
                swal(response.message, response.data, response.message);
            },
            error: function (e) {
                //请求超时回调
                if (e.statusText == "timeout") {
                    alert("请求超时");
                }
                alert("请求出错");
            },
        });
    });
});

// 评论回复
$('button[action="comment_reply"]').each(function () {
    var comment_id = $(this).attr("comment-id");
    $(this).click(function () {
        swal({
            buttons: true,
            content: {
                element: "input",
                attributes: {
                    placeholder: "简单说点什么",
                    type: "text",
                },
            },
        }).then((shuru) => {
            if (shuru) {
                $.ajax({
                    type: "POST",
                    url: "/api/topic/comment/reply",
                    data: {
                        _userToken: $('meta[name="_Token"]').attr("content"),
                        comment_id: comment_id,
                        content: shuru,
                    },
                    dataType: "json",
                    success: function (response) {
                        //请求成功回调
                        swal(response.message, response.data, response.message);
                    },
                    error: function (e) {
                        //请求超时回调
                        if (e.statusText == "timeout") {
                            alert("请求超时");
                        }
                        alert("请求出错");
                    },
                });
            }
        });
    });
});

// 回复

// 删除回复
$('button[action="delete-reply"]').each(function () {
    var reply_id = $(this).attr("reply-id");
    $(this).click(() => {
        if (confirm("确定要删除此回复吗?")) {
            $.ajax({
                type: "POST",
                url: "/api/topic/comment/reply/delete",
                data: {
                    _userToken: $('meta[name="_Token"]').attr("content"),
                    reply_id: reply_id,
                },
                dataType: "json",
                success: function (response) {
                    //请求成功回调
                    swal(response.message, response.data, response.message);
                },
            });
        }
    });
});

// 删除评论
$('button[action="comment-delete"]').each(function () {
    var comment_id = $(this).attr("comment-id");
    $(this).click(function () {
        if (confirm("确定要删除此评论吗?")) {
            $.ajax({
                type: "POST",
                url: "/api/topic/comment/delete",
                data: {
                    _userToken: $('meta[name="_Token"]').attr("content"),
                    comment_id: comment_id,
                },
                dataType: "json",
                success: function (response) {
                    //请求成功回调
                    swal(response.message, response.data, response.message);
                },
            });
        }
    });
});

// 采纳评论

$(function () {
    $("a[type='comment_caina']").each(function () {
        $(this).click(function () {
            var posturl = comment_caina;
            $.ajax({
                type: "POST",
                url: posturl,
                data: {
                    _userToken: $('meta[name="_Token"]').attr("content"),
                    comment_id: $(this).attr("comment-id"),
                },
                dataType: "json",
                success: function (response) {
                    swal(response.message, response.data, response.message);
                },
                error: function () {
                    alert("请求出错");
                },
            });
        });
    });
});


