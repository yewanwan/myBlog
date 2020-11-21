---
title: 前端测试学习笔记
date: 2019-12-06
tags:
 - 测试
categories:
 - javascript
---

## 测试分类

黑盒测试：常见的开发流程里，都有测试人员，这种称为黑盒测试，测试人员不管内部实现机制，只看最外层的输入输出，比如写一个加法的页面，会设计N个case，测试加法的正确性，这种代码里，称之为E2E测试。

白盒测试：白盒测试又称结构测试、透明盒测试、逻辑驱动测试或基于代码的测试。白盒测试是一种测试用例设计方法，盒子指的是被测试的软件，白盒指的是盒子是可视的，即清楚盒子内部的东西以及里面是如何运作的。

单元测试：对软件中的最小测试单元进行检查和验证的测试方法



##  测试的好处

- 提供描述组件行为的文档
- 节省手动测试的时间
- 减少研发新特性时产生的bug
- 改进设计
- 促进结构



## 测试工具

1. Mocha + Chai
2. jest（推荐）



## 测试小demo

```js
/**Vue项目 unit/example.spec.js*/

//定义一个加法函数
const add = (x, y) => {
    return x + y
}

// 编写测试方法
describe('add function', () => {
    // 分组
    it('test number add', () => {
        expect(add(1, 2)).toBe(3)
    })
    
    it('test number and string add', () => {
        expect(add(1, '2')).toBe('12')
    })
})
```



## API介绍

- describe： 定义一个测试套件
- it： 定义一个测试用例
- expect：断言的判断条件
- toBe： 断言的比较结果



## 测试Vue组件

使用Vue-cli搭建项目，选择测试用具jest，安装Vue官方推荐测试库@vue/test-utils 执行`npm install @vue/test-utils --save`

新建test.vue

```vue
// test.vue

<template>
	<div>
        <span>{{message}}</span>
        <button @click="changeMsg">Click</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'vue-test'
        }
    },
    created() {
      	this.message = 'aftermounted'  
    },
    methods: {
        changeMsg() {
            this.message = 'click message'
        }
    }
}
</script>
```



新建testVue.spec.js

```js
/** testVue.spec.js*/
import Vue from 'vue'
import Test from '../../src/components/test.vue'
import { mount } from '@vue/test-utils'

describe('测试test组件', () => {
    it('测试初始的data', () => {
        expect(Test.data().message).toBe('vue-test')
    })
    
    it('测试数据初始化后， created生命周期时的数据', () => {
        let vm = new Vue(Test).$mount()
        expect(vm.message).toBe('aftermounted')
    })
    
    it('测试点击后，message的改变', () => {
        // 获取渲染完成后的对象
        let wrapper = mount(Test)
        expect(wrapper.vm.message).toBe('aftermounted')
        // 点击事件
        wrapper.find('.btn').trigger('click')
        expect(wrapper.vm.message).toBe('click message')
    })
})
```

 

## Node.js自动化测试

安装需要的包`npm install koa jest supertest --save`

新建test.js

```js
/** test.js*/

const request = require('supertest')
const assert = require('assert')
const Koa = require('koa')
describe('测试koa', () => {
    let app1 = new Koa()
    app1.content.msg = 'helloword'
    
    it('测试ctx的信息', () => {
        app1.use((ctx, next) => {
            assert.equal(ctx.msg, 'helloword')
            ctx.body = 'test koa'
        })
        // node启动koa
        return request(app1.listen())
        	.get('/')
        expect('test koa')
    })
})
```



配置package.json

```json
"scripts": {
    "test": "jest"
}
```

执行`npm run test`

<Vssue title="Vssue test" />