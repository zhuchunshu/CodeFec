/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!*************************************!*\
  !*** ./resources/js/reply/topic.js ***!
  \*************************************/
eval("function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n$.ajax({\n  url: codefec_config.editor.biaoqing,\n  type: \"POST\",\n  data: {\n    '_token': $('meta[name=\"csrf-token\"]').attr('content'),\n    '_userToken': $('meta[name=\"_Token\"]').attr('content')\n  },\n  success: function success(response) {\n    //请求成功回调\n    var content = document.getElementById('comment_content');\n    var html = document.getElementById('comment_html');\n    var vditor = new Vditor('comment-div', {\n      \"height\": 500,\n      \"cache\": {\n        \"enable\": false\n      },\n      \"value\": content.value,\n      \"preview\": {\n        \"theme\": {\n          \"current\": codefec_config.theme\n        }\n      },\n      \"theme\": codefec_config.theme,\n      \"hint\": {\n        \"emoji\": response,\n        \"emojiTail\": codefec_config.name + \"精选表情\"\n      },\n      \"mode\": \"ir\",\n      toolbar: [\"emoji\", \"headings\", \"bold\", \"italic\", \"strike\", \"link\", \"|\", \"list\", \"ordered-list\", \"check\", \"|\", \"quote\", \"line\", \"code\", \"inline-code\", \"insert-before\", \"insert-after\", \"|\", \"upload\", \"record\", \"table\", \"|\", \"undo\", \"redo\", \"|\", \"fullscreen\"],\n      upload: {\n        accept: 'image/*,.wav',\n        token: token,\n        url: uploadurl,\n        linkToImgUrl: image_up,\n        filename: function filename(name) {\n          return name.replace(/[^(a-zA-Z0-9\\u4e00-\\u9fa5\\.)]/g, '').replace(/[\\?\\\\/:|<>\\*\\[\\]\\(\\)\\$%\\{\\}@~]/g, '').replace('/\\\\s/g', '');\n        }\n      },\n      typewriterMode: true,\n      after: function after() {\n        if (codefec_config.theme == \"dark\") {\n          $(\".vditor-reset\").css('color', '#ffffff');\n        }\n      },\n      // ctrlEnter (md) {\n      //   logElement.innerText = '用户按下了 Ctrl+Enter，Markdown 内容为：\\n' + md\n      // },\n      input: function input(md) {\n        content.value = md;\n        html.value = vditor.getHTML();\n      } // blur (md) {\n      //   logElement.innerText = '用户离开了编辑器，Markdown 内容为：\\n' + md\n      // },\n      // select (md) {\n      //   logElement.innerText = '用户选中了一段文字，内容为：\\n' + md\n      // },\n      // focus (md) {\n      //   logElement.innerText = '用户选中了编辑器，Markdown 内容为：\\n' + md\n      // },\n      // esc (md) {\n      //   logElement.innerText = '用户按下了 ESC，Markdown 内容为：\\n' + md\n      // },\n\n    });\n  },\n  error: function error() {\n    var _emoji;\n\n    var content = document.getElementById('comment_content');\n    var html = document.getElementById('comment_html');\n    var vditor = new Vditor('comment-div', {\n      \"height\": 500,\n      \"cache\": {\n        \"enable\": false\n      },\n      \"value\": content.value,\n      \"preview\": {\n        \"theme\": {\n          \"current\": codefec_config.theme\n        }\n      },\n      \"theme\": codefec_config.theme,\n      \"hint\": {\n        \"emoji\": (_emoji = {\n          \"+1\": \"👍\",\n          \"-1\": \"👎\",\n          \"拜托\": \"🙏\",\n          \"bot\": \"🤖\",\n          \"哈哈\": \"😀\",\n          \"笑\": \"😀\",\n          \"哭笑不得\": \"😂\",\n          \"流汗\": \"😅\",\n          \"小丑\": \"🤡\",\n          \"中国\": \"🇨🇳\",\n          \"握手\": \"🤝\",\n          \"OK\": \"👌\",\n          \"爷\": \"👴\",\n          \"re_chui\": \"https://www.zhuchunshu.com/ovo/re_qgzs.png\",\n          \"re_daka\": \"https://www.zhuchunshu.com/ovo/re_daka.png\"\n        }, _defineProperty(_emoji, \"re_chui\", \"https://www.zhuchunshu.com/ovo/re_chui.png\"), _defineProperty(_emoji, \"re_wkl\", \"https://www.zhuchunshu.com/ovo/re_wkl.png\"), _defineProperty(_emoji, \"re_xiu\", \"https://www.zhuchunshu.com/ovo/re_xiu.png\"), _defineProperty(_emoji, \"re_zsmq\", \"https://www.zhuchunshu.com/ovo/re_zsmq.png\"), _defineProperty(_emoji, \"33_no1\", \"https://www.zhuchunshu.com/ovo/33_no1.png\"), _defineProperty(_emoji, \"33_yiwen\", \"https://www.zhuchunshu.com/ovo/33_yiwen.png\"), _defineProperty(_emoji, \"33_maimeng\", \"https://www.zhuchunshu.com/ovo/33_maimeng.png\"), _defineProperty(_emoji, \"33_hecha\", \"https://www.zhuchunshu.com/ovo/33_hecha.png\"), _defineProperty(_emoji, \"33_wuyan\", \"https://www.zhuchunshu.com/ovo/33_wuyan.png\"), _defineProperty(_emoji, \"22_yumen\", \"https://www.zhuchunshu.com/ovo/22_yumen.png\"), _defineProperty(_emoji, \"22_daku\", \"https://www.zhuchunshu.com/ovo/22_daku.png\"), _defineProperty(_emoji, \"22_chijing\", \"https://www.zhuchunshu.com/ovo/22_chijing.png\"), _defineProperty(_emoji, \"22_daxiao\", \"https://www.zhuchunshu.com/ovo/22_daxiao.png\"), _emoji),\n        \"emojiTail\": codefec_config.name + \"精选表情\"\n      },\n      \"mode\": \"ir\",\n      toolbar: [\"emoji\", \"headings\", \"bold\", \"italic\", \"strike\", \"link\", \"|\", \"list\", \"ordered-list\", \"check\", \"|\", \"quote\", \"line\", \"code\", \"inline-code\", \"insert-before\", \"insert-after\", \"|\", \"upload\", \"record\", \"table\", \"|\", \"undo\", \"redo\", \"|\", \"fullscreen\"],\n      upload: {\n        accept: 'image/*,.wav',\n        token: token,\n        url: uploadurl,\n        linkToImgUrl: image_up,\n        filename: function filename(name) {\n          return name.replace(/[^(a-zA-Z0-9\\u4e00-\\u9fa5\\.)]/g, '').replace(/[\\?\\\\/:|<>\\*\\[\\]\\(\\)\\$%\\{\\}@~]/g, '').replace('/\\\\s/g', '');\n        }\n      },\n      typewriterMode: true,\n      after: function after() {\n        if (codefec_config.theme == \"dark\") {\n          $(\".vditor-reset\").css('color', '#ffffff');\n        }\n      },\n      // ctrlEnter (md) {\n      //   logElement.innerText = '用户按下了 Ctrl+Enter，Markdown 内容为：\\n' + md\n      // },\n      input: function input(md) {\n        content.value = md;\n        html.value = vditor.getHTML();\n      } // blur (md) {\n      //   logElement.innerText = '用户离开了编辑器，Markdown 内容为：\\n' + md\n      // },\n      // select (md) {\n      //   logElement.innerText = '用户选中了一段文字，内容为：\\n' + md\n      // },\n      // focus (md) {\n      //   logElement.innerText = '用户选中了编辑器，Markdown 内容为：\\n' + md\n      // },\n      // esc (md) {\n      //   logElement.innerText = '用户按下了 ESC，Markdown 内容为：\\n' + md\n      // },\n\n    });\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvcmVwbHkvdG9waWMuanM/MWZmMCJdLCJuYW1lcyI6WyIkIiwiYWpheCIsInVybCIsImNvZGVmZWNfY29uZmlnIiwiZWRpdG9yIiwiYmlhb3FpbmciLCJ0eXBlIiwiZGF0YSIsImF0dHIiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJjb250ZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImh0bWwiLCJ2ZGl0b3IiLCJWZGl0b3IiLCJ2YWx1ZSIsInRoZW1lIiwibmFtZSIsInRvb2xiYXIiLCJ1cGxvYWQiLCJhY2NlcHQiLCJ0b2tlbiIsInVwbG9hZHVybCIsImxpbmtUb0ltZ1VybCIsImltYWdlX3VwIiwiZmlsZW5hbWUiLCJyZXBsYWNlIiwidHlwZXdyaXRlck1vZGUiLCJhZnRlciIsImNzcyIsImlucHV0IiwibWQiLCJnZXRIVE1MIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7O0FBQUFBLENBQUMsQ0FBQ0MsSUFBRixDQUFPO0FBQ0xDLEVBQUFBLEdBQUcsRUFBRUMsY0FBYyxDQUFDQyxNQUFmLENBQXNCQyxRQUR0QjtBQUVMQyxFQUFBQSxJQUFJLEVBQUUsTUFGRDtBQUdMQyxFQUFBQSxJQUFJLEVBQUU7QUFDSixjQUFVUCxDQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QlEsSUFBN0IsQ0FBa0MsU0FBbEMsQ0FETjtBQUVKLGtCQUFjUixDQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QlEsSUFBekIsQ0FBOEIsU0FBOUI7QUFGVixHQUhEO0FBT0xDLEVBQUFBLE9BQU8sRUFBRSxpQkFBVUMsUUFBVixFQUFvQjtBQUFFO0FBQzdCLFFBQU1DLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLGlCQUF4QixDQUFoQjtBQUNBLFFBQU1DLElBQUksR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLGNBQXhCLENBQWI7QUFDQSxRQUFNRSxNQUFNLEdBQUcsSUFBSUMsTUFBSixDQUFXLGFBQVgsRUFBMEI7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QUFNLEVBQUU7QUFDTkMsUUFBQUEsTUFBTSxFQUFFLGNBREY7QUFFTkMsUUFBQUEsS0FBSyxFQUFFQSxLQUZEO0FBR05yQixRQUFBQSxHQUFHLEVBQUVzQixTQUhDO0FBSU5DLFFBQUFBLFlBQVksRUFBRUMsUUFKUjtBQUtOQyxRQUFBQSxRQUxNLG9CQUtHUixJQUxILEVBS1M7QUFDYixpQkFBT0EsSUFBSSxDQUFDUyxPQUFMLENBQWEsZ0NBQWIsRUFBK0MsRUFBL0MsRUFDTEEsT0FESyxDQUNHLGlDQURILEVBQ3NDLEVBRHRDLEVBRUxBLE9BRkssQ0FFRyxRQUZILEVBRWEsRUFGYixDQUFQO0FBR0Q7QUFUSyxPQTFFK0I7QUFxRnZDQyxNQUFBQSxjQUFjLEVBQUUsSUFyRnVCO0FBc0Z2Q0MsTUFBQUEsS0F0RnVDLG1CQXNGL0I7QUFDTixZQUFJM0IsY0FBYyxDQUFDZSxLQUFmLElBQXdCLE1BQTVCLEVBQW9DO0FBQ2xDbEIsVUFBQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQitCLEdBQW5CLENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDO0FBQ0Q7QUFDRixPQTFGc0M7QUEyRnZDO0FBQ0E7QUFDQTtBQUNBQyxNQUFBQSxLQTlGdUMsaUJBOEZqQ0MsRUE5RmlDLEVBOEY3QjtBQUNSdEIsUUFBQUEsT0FBTyxDQUFDTSxLQUFSLEdBQWdCZ0IsRUFBaEI7QUFDQW5CLFFBQUFBLElBQUksQ0FBQ0csS0FBTCxHQUFhRixNQUFNLENBQUNtQixPQUFQLEVBQWI7QUFDRCxPQWpHc0MsQ0FrR3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE3R3VDLEtBQTFCLENBQWY7QUFnSEQ7QUFoTkksQ0FBUCIsInNvdXJjZXNDb250ZW50IjpbIiQuYWpheCh7XG4gIHVybDogY29kZWZlY19jb25maWcuZWRpdG9yLmJpYW9xaW5nLFxuICB0eXBlOiBcIlBPU1RcIixcbiAgZGF0YToge1xuICAgICdfdG9rZW4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxuICAgICdfdXNlclRva2VuJzogJCgnbWV0YVtuYW1lPVwiX1Rva2VuXCJdJykuYXR0cignY29udGVudCcpLFxuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHsgLy/or7fmsYLmiJDlip/lm57osINcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfY29udGVudCcpXG4gICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X2h0bWwnKVxuICAgIGNvbnN0IHZkaXRvciA9IG5ldyBWZGl0b3IoJ2NvbW1lbnQtZGl2Jywge1xuICAgICAgXCJoZWlnaHRcIjogNTAwLFxuICAgICAgXCJjYWNoZVwiOiB7XG4gICAgICAgIFwiZW5hYmxlXCI6IGZhbHNlXG4gICAgICB9LFxuICAgICAgXCJ2YWx1ZVwiOiBjb250ZW50LnZhbHVlLFxuICAgICAgXCJwcmV2aWV3XCI6IHtcbiAgICAgICAgXCJ0aGVtZVwiOiB7XG4gICAgICAgICAgXCJjdXJyZW50XCI6IGNvZGVmZWNfY29uZmlnLnRoZW1lXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInRoZW1lXCI6IGNvZGVmZWNfY29uZmlnLnRoZW1lLFxuICAgICAgXCJoaW50XCI6IHtcbiAgICAgICAgXCJlbW9qaVwiOiByZXNwb25zZSxcbiAgICAgICAgXCJlbW9qaVRhaWxcIjogY29kZWZlY19jb25maWcubmFtZSArIFwi57K+6YCJ6KGo5oOFXCJcbiAgICAgIH0sXG4gICAgICBcIm1vZGVcIjogXCJpclwiLFxuICAgICAgdG9vbGJhcjogW1xuICAgICAgICBcImVtb2ppXCIsXG4gICAgICAgIFwiaGVhZGluZ3NcIixcbiAgICAgICAgXCJib2xkXCIsXG4gICAgICAgIFwiaXRhbGljXCIsXG4gICAgICAgIFwic3RyaWtlXCIsXG4gICAgICAgIFwibGlua1wiLFxuICAgICAgICBcInxcIixcbiAgICAgICAgXCJsaXN0XCIsXG4gICAgICAgIFwib3JkZXJlZC1saXN0XCIsXG4gICAgICAgIFwiY2hlY2tcIixcbiAgICAgICAgXCJ8XCIsXG4gICAgICAgIFwicXVvdGVcIixcbiAgICAgICAgXCJsaW5lXCIsXG4gICAgICAgIFwiY29kZVwiLFxuICAgICAgICBcImlubGluZS1jb2RlXCIsXG4gICAgICAgIFwiaW5zZXJ0LWJlZm9yZVwiLFxuICAgICAgICBcImluc2VydC1hZnRlclwiLFxuICAgICAgICBcInxcIixcbiAgICAgICAgXCJ1cGxvYWRcIixcbiAgICAgICAgXCJyZWNvcmRcIixcbiAgICAgICAgXCJ0YWJsZVwiLFxuICAgICAgICBcInxcIixcbiAgICAgICAgXCJ1bmRvXCIsXG4gICAgICAgIFwicmVkb1wiLFxuICAgICAgICBcInxcIixcbiAgICAgICAgXCJmdWxsc2NyZWVuXCIsXG4gICAgICBdLFxuICAgICAgdXBsb2FkOiB7XG4gICAgICAgIGFjY2VwdDogJ2ltYWdlLyosLndhdicsXG4gICAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgICAgdXJsOiB1cGxvYWR1cmwsXG4gICAgICAgIGxpbmtUb0ltZ1VybDogaW1hZ2VfdXAsXG4gICAgICAgIGZpbGVuYW1lKG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9bXihhLXpBLVowLTlcXHU0ZTAwLVxcdTlmYTVcXC4pXS9nLCAnJykuXG4gICAgICAgICAgICByZXBsYWNlKC9bXFw/XFxcXC86fDw+XFwqXFxbXFxdXFwoXFwpXFwkJVxce1xcfUB+XS9nLCAnJykuXG4gICAgICAgICAgICByZXBsYWNlKCcvXFxcXHMvZycsICcnKVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHR5cGV3cml0ZXJNb2RlOiB0cnVlLFxuICAgICAgYWZ0ZXIoKSB7XG4gICAgICAgIGlmIChjb2RlZmVjX2NvbmZpZy50aGVtZSA9PSBcImRhcmtcIikge1xuICAgICAgICAgICQoXCIudmRpdG9yLXJlc2V0XCIpLmNzcygnY29sb3InLCAnI2ZmZmZmZicpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBjdHJsRW50ZXIgKG1kKSB7XG4gICAgICAvLyAgIGxvZ0VsZW1lbnQuaW5uZXJUZXh0ID0gJ+eUqOaIt+aMieS4i+S6hiBDdHJsK0VudGVy77yMTWFya2Rvd24g5YaF5a655Li677yaXFxuJyArIG1kXG4gICAgICAvLyB9LFxuICAgICAgaW5wdXQobWQpIHtcbiAgICAgICAgY29udGVudC52YWx1ZSA9IG1kXG4gICAgICAgIGh0bWwudmFsdWUgPSB2ZGl0b3IuZ2V0SFRNTCgpXG4gICAgICB9LFxuICAgICAgLy8gYmx1ciAobWQpIHtcbiAgICAgIC8vICAgbG9nRWxlbWVudC5pbm5lclRleHQgPSAn55So5oi356a75byA5LqG57yW6L6R5Zmo77yMTWFya2Rvd24g5YaF5a655Li677yaXFxuJyArIG1kXG4gICAgICAvLyB9LFxuICAgICAgLy8gc2VsZWN0IChtZCkge1xuICAgICAgLy8gICBsb2dFbGVtZW50LmlubmVyVGV4dCA9ICfnlKjmiLfpgInkuK3kuobkuIDmrrXmloflrZfvvIzlhoXlrrnkuLrvvJpcXG4nICsgbWRcbiAgICAgIC8vIH0sXG4gICAgICAvLyBmb2N1cyAobWQpIHtcbiAgICAgIC8vICAgbG9nRWxlbWVudC5pbm5lclRleHQgPSAn55So5oi36YCJ5Lit5LqG57yW6L6R5Zmo77yMTWFya2Rvd24g5YaF5a655Li677yaXFxuJyArIG1kXG4gICAgICAvLyB9LFxuICAgICAgLy8gZXNjIChtZCkge1xuICAgICAgLy8gICBsb2dFbGVtZW50LmlubmVyVGV4dCA9ICfnlKjmiLfmjInkuIvkuoYgRVND77yMTWFya2Rvd24g5YaF5a655Li677yaXFxuJyArIG1kXG4gICAgICAvLyB9LFxuICAgIH0pXG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X2NvbnRlbnQnKVxuICAgIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9odG1sJylcbiAgICBjb25zdCB2ZGl0b3IgPSBuZXcgVmRpdG9yKCdjb21tZW50LWRpdicsIHtcbiAgICAgIFwiaGVpZ2h0XCI6IDUwMCxcbiAgICAgIFwiY2FjaGVcIjoge1xuICAgICAgICBcImVuYWJsZVwiOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIFwidmFsdWVcIjogY29udGVudC52YWx1ZSxcbiAgICAgIFwicHJldmlld1wiOiB7XG4gICAgICAgIFwidGhlbWVcIjoge1xuICAgICAgICAgIFwiY3VycmVudFwiOiBjb2RlZmVjX2NvbmZpZy50aGVtZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ0aGVtZVwiOiBjb2RlZmVjX2NvbmZpZy50aGVtZSxcbiAgICAgIFwiaGludFwiOiB7XG4gICAgICAgIFwiZW1vamlcIjoge1xuICAgICAgICAgIFwiKzFcIjogXCLwn5GNXCIsXG4gICAgICAgICAgXCItMVwiOiBcIvCfkY5cIixcbiAgICAgICAgICBcIuaLnOaJmFwiOiBcIvCfmY9cIixcbiAgICAgICAgICBcImJvdFwiOiBcIvCfpJZcIixcbiAgICAgICAgICBcIuWTiOWTiFwiOiBcIvCfmIBcIixcbiAgICAgICAgICBcIueskVwiOiBcIvCfmIBcIixcbiAgICAgICAgICBcIuWTreeskeS4jeW+l1wiOiBcIvCfmIJcIixcbiAgICAgICAgICBcIua1geaxl1wiOiBcIvCfmIVcIixcbiAgICAgICAgICBcIuWwj+S4kVwiOiBcIvCfpKFcIixcbiAgICAgICAgICBcIuS4reWbvVwiOiBcIvCfh6jwn4ezXCIsXG4gICAgICAgICAgXCLmj6HmiYtcIjogXCLwn6SdXCIsXG4gICAgICAgICAgXCJPS1wiOiBcIvCfkYxcIixcbiAgICAgICAgICBcIueIt1wiOiBcIvCfkbRcIixcbiAgICAgICAgICBcInJlX2NodWlcIjogXCJodHRwczovL3d3dy56aHVjaHVuc2h1LmNvbS9vdm8vcmVfcWd6cy5wbmdcIixcbiAgICAgICAgICBcInJlX2Rha2FcIjogXCJodHRwczovL3d3dy56aHVjaHVuc2h1LmNvbS9vdm8vcmVfZGFrYS5wbmdcIixcbiAgICAgICAgICBcInJlX2NodWlcIjogXCJodHRwczovL3d3dy56aHVjaHVuc2h1LmNvbS9vdm8vcmVfY2h1aS5wbmdcIixcbiAgICAgICAgICBcInJlX3drbFwiOiBcImh0dHBzOi8vd3d3LnpodWNodW5zaHUuY29tL292by9yZV93a2wucG5nXCIsXG4gICAgICAgICAgXCJyZV94aXVcIjogXCJodHRwczovL3d3dy56aHVjaHVuc2h1LmNvbS9vdm8vcmVfeGl1LnBuZ1wiLFxuICAgICAgICAgIFwicmVfenNtcVwiOiBcImh0dHBzOi8vd3d3LnpodWNodW5zaHUuY29tL292by9yZV96c21xLnBuZ1wiLFxuICAgICAgICAgIFwiMzNfbm8xXCI6IFwiaHR0cHM6Ly93d3cuemh1Y2h1bnNodS5jb20vb3ZvLzMzX25vMS5wbmdcIixcbiAgICAgICAgICBcIjMzX3lpd2VuXCI6IFwiaHR0cHM6Ly93d3cuemh1Y2h1bnNodS5jb20vb3ZvLzMzX3lpd2VuLnBuZ1wiLFxuICAgICAgICAgIFwiMzNfbWFpbWVuZ1wiOiBcImh0dHBzOi8vd3d3LnpodWNodW5zaHUuY29tL292by8zM19tYWltZW5nLnBuZ1wiLFxuICAgICAgICAgIFwiMzNfaGVjaGFcIjogXCJodHRwczovL3d3dy56aHVjaHVuc2h1LmNvbS9vdm8vMzNfaGVjaGEucG5nXCIsXG4gICAgICAgICAgXCIzM193dXlhblwiOiBcImh0dHBzOi8vd3d3LnpodWNodW5zaHUuY29tL292by8zM193dXlhbi5wbmdcIixcbiAgICAgICAgICBcIjIyX3l1bWVuXCI6IFwiaHR0cHM6Ly93d3cuemh1Y2h1bnNodS5jb20vb3ZvLzIyX3l1bWVuLnBuZ1wiLFxuICAgICAgICAgIFwiMjJfZGFrdVwiOiBcImh0dHBzOi8vd3d3LnpodWNodW5zaHUuY29tL292by8yMl9kYWt1LnBuZ1wiLFxuICAgICAgICAgIFwiMjJfY2hpamluZ1wiOiBcImh0dHBzOi8vd3d3LnpodWNodW5zaHUuY29tL292by8yMl9jaGlqaW5nLnBuZ1wiLFxuICAgICAgICAgIFwiMjJfZGF4aWFvXCI6IFwiaHR0cHM6Ly93d3cuemh1Y2h1bnNodS5jb20vb3ZvLzIyX2RheGlhby5wbmdcIlxuICAgICAgICB9LFxuICAgICAgICBcImVtb2ppVGFpbFwiOiBjb2RlZmVjX2NvbmZpZy5uYW1lICsgXCLnsr7pgInooajmg4VcIlxuICAgICAgfSxcbiAgICAgIFwibW9kZVwiOiBcImlyXCIsXG4gICAgICB0b29sYmFyOiBbXG4gICAgICAgIFwiZW1vamlcIixcbiAgICAgICAgXCJoZWFkaW5nc1wiLFxuICAgICAgICBcImJvbGRcIixcbiAgICAgICAgXCJpdGFsaWNcIixcbiAgICAgICAgXCJzdHJpa2VcIixcbiAgICAgICAgXCJsaW5rXCIsXG4gICAgICAgIFwifFwiLFxuICAgICAgICBcImxpc3RcIixcbiAgICAgICAgXCJvcmRlcmVkLWxpc3RcIixcbiAgICAgICAgXCJjaGVja1wiLFxuICAgICAgICBcInxcIixcbiAgICAgICAgXCJxdW90ZVwiLFxuICAgICAgICBcImxpbmVcIixcbiAgICAgICAgXCJjb2RlXCIsXG4gICAgICAgIFwiaW5saW5lLWNvZGVcIixcbiAgICAgICAgXCJpbnNlcnQtYmVmb3JlXCIsXG4gICAgICAgIFwiaW5zZXJ0LWFmdGVyXCIsXG4gICAgICAgIFwifFwiLFxuICAgICAgICBcInVwbG9hZFwiLFxuICAgICAgICBcInJlY29yZFwiLFxuICAgICAgICBcInRhYmxlXCIsXG4gICAgICAgIFwifFwiLFxuICAgICAgICBcInVuZG9cIixcbiAgICAgICAgXCJyZWRvXCIsXG4gICAgICAgIFwifFwiLFxuICAgICAgICBcImZ1bGxzY3JlZW5cIixcbiAgICAgIF0sXG4gICAgICB1cGxvYWQ6IHtcbiAgICAgICAgYWNjZXB0OiAnaW1hZ2UvKiwud2F2JyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICB1cmw6IHVwbG9hZHVybCxcbiAgICAgICAgbGlua1RvSW1nVXJsOiBpbWFnZV91cCxcbiAgICAgICAgZmlsZW5hbWUobmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1teKGEtekEtWjAtOVxcdTRlMDAtXFx1OWZhNVxcLildL2csICcnKS5cbiAgICAgICAgICAgIHJlcGxhY2UoL1tcXD9cXFxcLzp8PD5cXCpcXFtcXF1cXChcXClcXCQlXFx7XFx9QH5dL2csICcnKS5cbiAgICAgICAgICAgIHJlcGxhY2UoJy9cXFxccy9nJywgJycpXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdHlwZXdyaXRlck1vZGU6IHRydWUsXG4gICAgICBhZnRlcigpIHtcbiAgICAgICAgaWYgKGNvZGVmZWNfY29uZmlnLnRoZW1lID09IFwiZGFya1wiKSB7XG4gICAgICAgICAgJChcIi52ZGl0b3ItcmVzZXRcIikuY3NzKCdjb2xvcicsICcjZmZmZmZmJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIGN0cmxFbnRlciAobWQpIHtcbiAgICAgIC8vICAgbG9nRWxlbWVudC5pbm5lclRleHQgPSAn55So5oi35oyJ5LiL5LqGIEN0cmwrRW50ZXLvvIxNYXJrZG93biDlhoXlrrnkuLrvvJpcXG4nICsgbWRcbiAgICAgIC8vIH0sXG4gICAgICBpbnB1dChtZCkge1xuICAgICAgICBjb250ZW50LnZhbHVlID0gbWRcbiAgICAgICAgaHRtbC52YWx1ZSA9IHZkaXRvci5nZXRIVE1MKClcbiAgICAgIH0sXG4gICAgICAvLyBibHVyIChtZCkge1xuICAgICAgLy8gICBsb2dFbGVtZW50LmlubmVyVGV4dCA9ICfnlKjmiLfnprvlvIDkuobnvJbovpHlmajvvIxNYXJrZG93biDlhoXlrrnkuLrvvJpcXG4nICsgbWRcbiAgICAgIC8vIH0sXG4gICAgICAvLyBzZWxlY3QgKG1kKSB7XG4gICAgICAvLyAgIGxvZ0VsZW1lbnQuaW5uZXJUZXh0ID0gJ+eUqOaIt+mAieS4reS6huS4gOauteaWh+Wtl++8jOWGheWuueS4uu+8mlxcbicgKyBtZFxuICAgICAgLy8gfSxcbiAgICAgIC8vIGZvY3VzIChtZCkge1xuICAgICAgLy8gICBsb2dFbGVtZW50LmlubmVyVGV4dCA9ICfnlKjmiLfpgInkuK3kuobnvJbovpHlmajvvIxNYXJrZG93biDlhoXlrrnkuLrvvJpcXG4nICsgbWRcbiAgICAgIC8vIH0sXG4gICAgICAvLyBlc2MgKG1kKSB7XG4gICAgICAvLyAgIGxvZ0VsZW1lbnQuaW5uZXJUZXh0ID0gJ+eUqOaIt+aMieS4i+S6hiBFU0PvvIxNYXJrZG93biDlhoXlrrnkuLrvvJpcXG4nICsgbWRcbiAgICAgIC8vIH0sXG4gICAgfSlcblxuICB9XG59KVxuIl0sImZpbGUiOiIuL3Jlc291cmNlcy9qcy9yZXBseS90b3BpYy5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/js/reply/topic.js\n");
/******/ })()
;