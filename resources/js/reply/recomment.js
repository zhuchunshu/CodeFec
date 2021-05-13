$.ajax({
    url: codefec_config.editor.biaoqing,
    type: "POST",
    data: {
      '_token': $('meta[name="csrf-token"]').attr('content'),
      '_userToken': $('meta[name="_Token"]').attr('content'),
    },
    success: function (response) { //请求成功回调
      const content = document.getElementById('content')
      const html = document.getElementById('html')
      const vditor = new Vditor('recomment', {
        "height": 500,
        "cache": {
          "enable": false
        },
        "value": content.value,
        "preview": {
          "theme": {
            "current": codefec_config.theme
          }
        },
        "theme": codefec_config.theme,
        "hint": {
          "emoji": response,
          "emojiTail": codefec_config.name + "精选表情"
        },
        "mode": "ir",
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
          accept: 'image/*,.wav',
          token: token,
          url: uploadurl,
          linkToImgUrl: image_up,
          filename(name) {
            return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
              replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
              replace('/\\s/g', '')
          },
        },
        typewriterMode: true,
        after() {
          if (codefec_config.theme == "dark") {
            $(".vditor-reset").css('color', '#ffffff')
          }
        },
        // ctrlEnter (md) {
        //   logElement.innerText = '用户按下了 Ctrl+Enter，Markdown 内容为：\n' + md
        // },
        input(md) {
          content.value = md
          html.value = vditor.getHTML()
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
      })
    },
    error: function () {
      const content = document.getElementById('content')
      const html = document.getElementById('html')
      const vditor = new Vditor('recomment', {
        "height": 500,
        "cache": {
          "enable": false
        },
        "value": content.value,
        "preview": {
          "theme": {
            "current": codefec_config.theme
          }
        },
        "theme": codefec_config.theme,
        "hint": {
          "emoji": {
            "+1": "👍",
            "-1": "👎",
            "拜托": "🙏",
            "bot": "🤖",
            "哈哈": "😀",
            "笑": "😀",
            "哭笑不得": "😂",
            "流汗": "😅",
            "小丑": "🤡",
            "中国": "🇨🇳",
            "握手": "🤝",
            "OK": "👌",
            "爷": "👴",
            "re_chui": "https://www.zhuchunshu.com/ovo/re_qgzs.png",
            "re_daka": "https://www.zhuchunshu.com/ovo/re_daka.png",
            "re_chui": "https://www.zhuchunshu.com/ovo/re_chui.png",
            "re_wkl": "https://www.zhuchunshu.com/ovo/re_wkl.png",
            "re_xiu": "https://www.zhuchunshu.com/ovo/re_xiu.png",
            "re_zsmq": "https://www.zhuchunshu.com/ovo/re_zsmq.png",
            "33_no1": "https://www.zhuchunshu.com/ovo/33_no1.png",
            "33_yiwen": "https://www.zhuchunshu.com/ovo/33_yiwen.png",
            "33_maimeng": "https://www.zhuchunshu.com/ovo/33_maimeng.png",
            "33_hecha": "https://www.zhuchunshu.com/ovo/33_hecha.png",
            "33_wuyan": "https://www.zhuchunshu.com/ovo/33_wuyan.png",
            "22_yumen": "https://www.zhuchunshu.com/ovo/22_yumen.png",
            "22_daku": "https://www.zhuchunshu.com/ovo/22_daku.png",
            "22_chijing": "https://www.zhuchunshu.com/ovo/22_chijing.png",
            "22_daxiao": "https://www.zhuchunshu.com/ovo/22_daxiao.png"
          },
          "emojiTail": codefec_config.name + "精选表情"
        },
        "mode": "ir",
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
          accept: 'image/*,.wav',
          token: token,
          url: uploadurl,
          linkToImgUrl: image_up,
          filename(name) {
            return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
              replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
              replace('/\\s/g', '')
          },
        },
        typewriterMode: true,
        after() {
          if (codefec_config.theme == "dark") {
            $(".vditor-reset").css('color', '#ffffff')
          }
        },
        // ctrlEnter (md) {
        //   logElement.innerText = '用户按下了 Ctrl+Enter，Markdown 内容为：\n' + md
        // },
        input(md) {
          content.value = md
          html.value = vditor.getHTML()
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
      })
  
    }
  })
  