---
title: 微信小程序登录流程
date: 2019-12-16
tags:
 - miniapp
categories:
 - 小程序
---

## 前言

微信小程序（以下简称小程序）开发已经成为前端程序员必会的技能，很多公司也会有微信小程序的业务。登录功能是每个小程序必不可少的，我接触小程序登录的时候也有点懵，后面还是搞明白，接下来就分享一下小程序具体的登录流程。

## 登录流程

![](https://res.wx.qq.com/wxdoc/dist/assets/img/api-login.2fcc9f35.jpg)

上面这张是微信小程序官方的登录流程图，根据这张图我们来说一下大致的流程：

1. 当我们需要触发登录功能的时候，首先我们在小程序客户端调用 wx.login() 方法获取code，这是用户登录凭证（有效期5分钟）

2. 获取到code后调用后端接口，把code传给后端

3. 后端获取到code后调用 auth.code2Session ，使用code和appid、secret换取 session_key 和 openid 。 [文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html)

4. 后端人员获取 session_key 和 openid 后，使用这个两个子段可以生成登录的token返回给小程序客户端。

5. 小程序客户端获取到token后将token存在本地存储，之后的每次请求数据就可以携带token向后端发起请求获取数据。

注意：

- 会话密钥 session_key 是对用户数据进行 加密签名 的密钥。为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。

- 临时登录凭证 code 只能使用一次

大致的流程可以分为这5步，接下来我们上代码实操一遍。

## 代码实现

新建小程序并新建user页面（具体过程省略）


添加登录按钮
```html
<!-- user.wxml -->
<button wx:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
<view wx:else>请升级微信版本</view>
```

编写逻辑

```js
// user.js

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo)
                        }
                    })
                }
            }
        })
    },
    bindGetUserInfo(e: any) {
        console.log(e.detail.userInfo)
        this.login()
    },

    login: function () {
        // 调用wx.login()获取code
        wx.login({
            success(res) {
                if (res.code) {
                    // 使用wx.request()调接口传入code获取token
                    wx.request({
                        url: 'https://xxxx/user/login',
                        data: {
                            code: res.code
                        },
                        success(res) {
                            console.log(res);
                            if(res.data.token) {
                                // 存储token，提示登录状态 ....
                            }
                        }
                    })
                }
            }
        })
    }
})
```
接下来是后端获取到code后调用微信提供的接口换取 session_key 和 openid，我这里用的是node的Koa框架简单写的，具体请根据自己的业务需求。

```js
const router = require('koa-router')()
const jwt = require('jsonwebtoken');
const axios = require('axios')

const getToken = async function(code) {
	var obj = {}
	await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
		params: {
			appid: 'xxxxx', // 你的appid
			secret:'xxxxxxxxxxx', // 你的secret。可在小程序管理后台查看
			js_code: code,
			grant_type: 'authorization_code',  // 默认即可
		}
	}).then(res => {
		if (res.data) {
            // 获取的res.data对象里面包含所需要的session_key 和 openid，使用jwt生成token
			let token = jwt.sign(res.data, 'secret', { expiresIn: '1day' })
			obj =  {
				code: 200,
				msg: '登录成功',
				token: token
			}
		} else {
			obj =  {
				code: 500,
				msg: '登录失败'
			}
		}
	})
	return obj
}

// 登录接口
const userLogin = router.get(`/user/login`, async (ctx, next) => {
	let code = ctx.query.code
	ctx.body = await getToken(code)
})
```

成功生成token后可在 wx.request() 请求中配置请求头携带token请求数据即可，
token通过本地存储获取。

以上就是小程序登录流程的过程，按照的我的流程操作一般你就很容易理解了。有什么说的不对的或者需要补充的欢迎留言告知。

<Vssue title="Vssue wx_login" />

