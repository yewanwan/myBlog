---
title: Vue组件通信provide/inject
date: 2019-12-13
tags:
 - Vue
categories:
 - Vue.js
---

## 介绍

- provide / inject是vue2.2.0新增的一对方法，主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。

- provide选项应该是一个对象或返回一个对象的函数，该对象包含可注入其子孙的属性。

- inject选项应该是一个字符串数组，或一个对象，对象的 key 是本地的绑定名。

- [拓展阅读](https://cn.vuejs.org/v2/api/#provide-inject)


## 使用

有Father.vue 和 Child.vue两个组件，Child.vue是Father.vue 的子组件

```js
// Father.vue 父级组件提供 'name'
export default {
    provide: {
        name: 'Tom'
    }
}

// Child.vue 子组件注入 'name'
export default {
    inject: ['name'],
    mounted () {
        console.log(this.name) // Tom
    }
}
```
- 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。所以，上面 A.vue 的 name 如果改变了，Child.vue 的 this.name 是不会改变的，仍然是 Tom

## 替代Vuex

我们知道Vuex是在做比较大型的项目时用来做状态管理的，那provide / inject怎么做到全局的状态管理呢？ 当然，我们的目的并不是为了替代 Vuex，它还是有相当大的用处，这里只是介绍另一种可行性。

我们知道vue项目的入口文件上是app.vue,我们可以从这个文件理解为最外层的一个根组件，用来存储所有需要的全局数据和状态甚至是计算属性（computed）、方法（methods）等。因为你的项目中所有的组件（包含路由），它的父组件（或根组件）都是 app.vue，所以我们把整个 app.vue 实例通过 provide 对外提供。

```html
// app.vue
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
    export default {
        provide () {
            return {
                app: this
            }
        }
    }
</script>
```

上面，我们把整个 app.vue 的实例 this 对外提供，命名为 app（这个名字可以自定义，推荐使用 app，使用这个名字后，子组件不能再使用它作为局部属性）。接下来，任何组件（或路由）只要通过 inject 注入 app.vue 的 app 的话，都可以直接通过 this.app.xxx 来访问 app.vue 的 data、computed、methods 等内容。

app.vue 是整个项目第一个被渲染的组件，而且只会渲染一次（即使切换路由，app.vue也不会被再次渲染），利用这个特性，很适合做一次性全局的状态数据管理,比如：

```html
<script>
    // app.vue
    export default {
        provide () {
            return {
                app: this
            }
        },
        data () {
            return {
                company: ''
            }
        },
        mounted(){
            getCompany()
        },
        methods: {
            getCompany() {
                axios.get('/info/company').then(res => {
                    this.company = res.company
                })
            }
        }
    }
</script>
```
这样，任何页面或组件，只要通过inject注入app后，就可以直接访问company的数据以及方法，比如：

```html
<template>
    <div>
        {{ app.company }} //tencent
    </div>
</template>
<script>
    export default {
        inject: ['app'],
        methods: {
            updateCompany() {
                // 也可以调用app.vue的方法
                this.app.getCompany()
            }
        }
    }
</script>
```

用起来还是非常简单的，是不是感觉比vuex用的爽？

## 进阶技巧

如果你的项目足够的复杂，在app.vue写很多的代码，会比较难维护，这里可以使用Vue里面的混入mixins。

创建文件/src/mixins/company.js，把之前的代码移到这里：

```js
// company.js
export default {
    data () {
        return {
            company: ''
        }
    },
    mounted(){
        getCompany()
    },
    methods: {
        getCompany() {
            axios.get('/info/company').then(res => {
                this.company = res.company
            })
        }
    }
}
```

然后在app.vue中引入

```html
<script>
import mixin_company from './mixins/company'
export default {
    mixins: [mixin_company],
    provide() {
        return {
            app: this
        }
    }
}
</script>
```
这样相关业务代码就可以在独立的文件维护了

<Vssue title="Vssue provide/inject" />