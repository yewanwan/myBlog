module.exports = {
    title: "Game Room",
    description: `Don't change the world, just change yourself`,
    dest: 'public',
    base: '/blog/',
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }],
        ['meta', {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1,user-scalable=no'
        }]
    ],
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    theme: 'reco',
    themeConfig: {
        mode: 'auto', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
        // modePicker: false,  // 默认 true，false 不显示模式调节按钮，true 则显示
        type: 'blog',
        authorAvatar: '/lst.png',
        nav: [{
            text: '主页',
            link: '/',
            icon: 'reco-home'
        },
        {
            text: '时间线',
            link: '/timeLine/',
            icon: 'reco-date'
        },
        {
            text: '我',
            link: '/views/me/me',
            icon: 'reco-account'
        }
        ],
        // 博客设置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认3
                text: '标签' // 默认 “标签”
            }
        },
        logo: '/lst.png',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // 自动形成侧边导航
        sidebar: 'auto',
        // 最后更新时间
        lastUpdated: 'Last Updated',
        // 作者
        author: '桐先生',
        // 备案号
        record: '粤ICP备19069174号',
        // 项目开始时间
        startYear: '2019',
        huawei: false,
        type: 'blog',
        // 友情链接
        friendLink: [{
            title: '午后南杂',
            desc: 'Enjoy when you can, and endure when you must.',
            email: 'recoluan@qq.com',
            link: 'https://www.recoluan.com'
        },
        {
            title: '木易杨前端进阶',
            desc: '高级前端进阶之路',
            email: 'yyg204731@gmail.com',
            link: 'https://muyiy.cn/'
        }
        ],
        // 背景颜色
        // 显示访问数据
        valineConfig: {
            appId: 'Cmfgg6awWmYgmEDxHu22Wtmf-gzGzoHsz', // your appId
            appKey: '63iS6pt0vjJiiW01Sdv8iYSJ', // your appKey
        },
        markdown: {
            lineNumbers: false
        }
    },
    // plugins: ['@vuepress/medium-zoom', 'flowchart'],
    plugins: {
        "@vssue/vuepress-plugin-vssue": {
            // 设置 `platform` 而不是 `api`
            platform: 'github',
            // 其他的 Vssue 配置
            owner: 'ShoutongLiu',
            repo: 'myBlog',
            clientId: '63ea16206d545151fb13',
            clientSecret: 'fe7c0828d9ca4c98a89ac00a7a77c28ad73ed536',
            locale: 'zh',
        },
        "@vuepress-reco/vuepress-plugin-kan-ban-niang": {
            theme: ["haruto"],
            clean: true,
            modelStyle: {
                position: "fixed",
                right: "20px",
                bottom: "0px",
                opacity: "0.9",
                zIndex: 99999
            }
        },
        // 背景音乐
        "@vuepress-reco/vuepress-plugin-bgm-player": {
            audios: [
                {
                    name: '以父之名',
                    artist: '周杰伦',
                    url: 'http://wutom.club/media/bgms/yfzm.mp3',
                    cover: 'http://wutom.club/media/imgs/yfzm.jpg'
                },
                {
                    name: '好想爱这个世界啊',
                    artist: '华晨宇',
                    url: 'http://wutom.club/media/bgms/hxazgsja.mp3',
                    cover: 'http://wutom.club/media/imgs/hxazgsja.jpg'
                },
                {
                    name: 'Cradles',
                    artist: 'Sub Urban',
                    url: 'http://wutom.club/media/bgms/Cradles.mp3',
                    cover: 'http://wutom.club/media/imgs/Cradles.jpg'
                },
                {
                    name: '经济舱(live)',
                    artist: 'Kafe.Hu',
                    url: 'http://wutom.club/media/bgms/jjc.mp3',
                    cover: 'http://wutom.club/media/imgs/jjc.jpg'
                },
                {
                    name: 'MORE',
                    artist: 'K_DA _ Madison Beer _ (G)I-DLE ((여자)아이들) _ 刘柏辛Lexie _ Jaira Burns _ Seraphine _ 英雄联盟',
                    url: 'http://wutom.club/media/bgms/MORE.mp3',
                    cover: 'http://wutom.club/media/imgs/more.jpg'
                },
                {
                    name: '烈火战马+空城计+重庆魂 (Live)',
                    artist: 'GAI周延',
                    url: 'http://wutom.club/media/bgms/lkc.mp3',
                    cover: 'http://wutom.club/media/imgs/lhzm.jpeg'
                },
            ],
            position: {
                left: '10px',
                bottom: '10px',
                'z-index': '999999'
            },
            floatStyle: {
                bottom: '100px',
                'z-index': '999999'
            }
        },
        // title
        "dynamic-title": {
            showIcon: "/favicon.ico",
            showText: "(ฅ>ω<*ฅ)欢迎回来！",
            hideText: "( ๑ˊ•̥▵•)੭₎₎不要走呀！",
            recoverTime: 2000
        }
    }
}