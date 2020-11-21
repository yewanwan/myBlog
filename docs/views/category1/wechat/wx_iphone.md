---
title: 微信小程序解决iPhone X底部空白问题
date: 2019-12-18
tags:
 - miniapp
 - iphone
categories:
 - 小程序
---

<!-- more -->

## 前言

最近在做微信小程序的时候要做一个loading蒙版，高度给了100%，简单调试了一下，嗯，还是不错的，但是切到iPhone X的时候发现底部有一块空白，没有到底。

![空白](./imgs/01.png)

在手机上调试也可以看到这块空白。接下来就介绍一种解决的方式。

## 编码

首先我们先判断手机的型号，如果是iPhone X 或者是iPhone XS之类的手机就做处理。

```js
// app.js
App({
    // 定义全局data
    globalData: {
        isIpx: false
    },
    onLaunch() {
        var that = this
        // 获取手机型号
        wx.getSystemInfo({
            success(res) {
                if (res.model === 'iPhone X' || res.model === 'iPhone XS') {
                    that.globalData.isIpx = true
                }
            }
        })
    }
})

```

然后我们给iPhone X加上和正常的手机各一套css样式

```css
/* app.wxss */

.fix-iphonex-button {
    height: 1448rpx;
    width: 100%;
}

.fix-iphonex-button::after {
    height: 1206rpx;
    width: 100%;
}
```

最后在需要的view盒子通过动态class来加上样式

```html
<view class="container {{isIpx?'fix-iphonex-button':'fix-iphonex-button::after'}}" >
    .....内容
</view>
```

底部空白完美解决，手机预览一下，空白没有，切换到其他型号的手机，也没问题。

<Vssue title="Vssue wx_iPhone" />
