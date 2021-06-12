<?php

/**
 * 顶部菜单
 */


return [
    '首页' => [
        'type' => 'singer', //单个
        'icon' => '<svg
        xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
        stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="5 12 3 12 12 3 21 12 19 12" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>', //图标
        'route' => 'index',
    ],
    '所有节点' => [
        'type' => 'singer',
        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-grain" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="4.5" cy="9.5" r="1"></circle>
        <circle cx="9.5" cy="4.5" r="1"></circle>
        <circle cx="9.5" cy="14.5" r="1"></circle>
        <circle cx="4.5" cy="19.5" r="1"></circle>
        <circle cx="14.5" cy="9.5" r="1"></circle>
        <circle cx="19.5" cy="4.5" r="1"></circle>
        <circle cx="14.5" cy="19.5" r="1"></circle>
        <circle cx="19.5" cy="14.5" r="1"></circle>
     </svg>',
        'route' => 'node.index',
    ],
    // '会员列表' => [
    //     'type' => 'singer',
    //     'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>',
    //     'route' => 'public.user.list',
    // ],
    // '测试2' => [
    //     'type' => 'dropdown',
    //     'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" /><circle cx="12" cy="12" r="7" /></svg>',
    //     'li' => [
    //         'name' => [
    //             'route' => 'index',
    //             'quanxian' => 999,
    //         ],
    //         'name2' => 'index'
    //     ]
    // ],
    '管理' => [
        'type' => 'dropdown',
        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><circle cx="12" cy="12" r="3" /></svg>',
        'li' => [
            '站点设置' => [
                'route' => 'admin.setting',
                'quanxian' => 999,
            ],
            '独立后台' => [
                'route' => 'admin.gadmin',
                'quanxian' => 999,
            ],
            'horizon' => [
                'route' => 'admin.horizon',
                'quanxian' => 999,
            ],
            'telescope' => [
                'route' => 'admin.telescope',
                'quanxian' => 999,
            ],
            '高级设置' => [
                'route' => 'admin.setting.pro.index',
                'quanxian' => 999,
            ],
            // '赞助商' => [
            //     'route' => 'admin.links.zanzhu',
            //     'quanxian' => 999,
            // ],
            // '友情链接' => [
            //     'route' => 'admin.links.friend',
            //     'quanxian' => 999,
            // ],
            '用户组' => [
                'route' => 'admin.users.group',
                'quanxian' => 999,
            ],
            // '用户举报' => [
            //     'route' => 'admin.posts.report',
            //     'quanxian' => 777,
            // ],
            // '邀请注册' => [
            //     'route' => 'admin.invitation.index',
            //     'quanxian' => 999
            // ]
        ],
        'quanxian' => 777,
    ],
    '节点管理' => [
        'type' => 'dropdown',
        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-seeding" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3"></path>
        <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3"></path>
        <line x1="12" y1="20" x2="12" y2="10"></line>
     </svg>',
        'li' => [
            '新增节点' => [
                'route' => 'admin.node.index',
                'quanxian' => 777,
            ],
            '管理节点' => [
                'route' => 'admin.node.edit',
                'quanxian' => 777,
            ],
            '节点标签' => [
                'route' => 'admin.node.tags',
                'quanxian' => 777
            ]
        ],
        'quanxian' => 777
    ],


    // '插件管理' => [
    //     'type' => 'dropdown',
    //     'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-box" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    //     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //     <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
    //     <line x1="12" y1="12" x2="20" y2="7.5"></line>
    //     <line x1="12" y1="12" x2="12" y2="21"></line>
    //     <line x1="12" y1="12" x2="4" y2="7.5"></line>
    //  </svg>',
    //     'li' => [
    //         '应用中心' => [
    //             'route' => 'admin.extend.index',
    //             'quanxian' => 999,
    //         ]
    //     ],
    //     'quanxian' => 999
    // ],


    '个人中心' => [
        'type' => 'dropdown',
        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="7" r="4"></circle>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
     </svg>',
        'li' => [
            '个人设置' => [
                'route' => 'users.setting',
                'quanxian' => 1,
            ],
            // '我的举报' => [
            //     'route' => 'users.my.report',
            //     'quanxian' => 1,
            // ],
            '操作日志' => [
                'route' => 'users.log',
                'quanxian' => 1,
            ],
            '经验变化记录' => [
                'route' => 'users.lv.log',
                'quanxian' => 1,
            ],
            '我的通知' => [
                'route' => 'users.my.notice',
                'quanxian' => 1,
            ],
            // '我的收藏' => [
            //     'route' => 'users.my.collections',
            //     'quanxian' => 1,
            // ]
        ],
        'quanxian' => 1
    ]
];
