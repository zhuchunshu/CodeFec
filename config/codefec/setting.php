<?php
return [
    "admin" => [
        "kaiguan" => [
            "强制登陆" => "kaiguan_QiangZhiLogin",
            "回顶部按钮" => "view_return_top",
            "帖子 - 标题前显示节点" => "view_topic_title_node_show",
            "帖子 - 标题前显示标签" => "view_topic_title_tag_show",
            "首页 - 标题前显示节点" => "view_home_title_node_show",
            "首页 - 标题前显示标签" => "view_home_title_tag_show",
            "全局 - 节点区块" => "view_common_node_show",
            "全局 - 标签区块" => "view_common_tag_show",
        ],
        // 高级设置
        "pro" => [
            "图片设置" => [
                'description' => "logo、随机图片等多项内容设置管理",
                "route" => "admin.setting.pro.image"
            ]
        ]
    ]
];
