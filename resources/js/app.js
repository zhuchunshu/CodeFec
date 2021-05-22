require('./bootstrap');
import swal from 'sweetalert';
$('a[class="dropdown-item active"]').each(function (index) {
    var thiss = $(this);
    var attrs = thiss.parent().parent().parent().parent().attr('class');
    thiss.parent().parent().parent().parent().attr('class', attrs + " active")
})

// 站点配置
codefec_config = JSON.parse(codefec_config);
if (codefec_config.theme == "dark") {
    //黑色主题
    $(".text-body").each(function () {
        $(this).css('color', '#FFFFFF')
        $(this).removeClass('text-body')
    })
    $(".page-item-title").each(function () {
        $(this).removeClass('page-item-title')
    })
    $(".alert-title").each(function () {
        $(this).css('color', '#000000')
    })
}
import { addBackToTop } from 'vanilla-back-to-top'
if (comment_themes_view_rtop===true) {
    // 一键回顶部
    addBackToTop()
}
console.log("%cCodeFec 开源程序 https://github.com/zhuchunshu/CodeFec","color:#ffffff; font-size:25px; display: block;height: 100vh;width: 100vw;background-color: #232e3c")