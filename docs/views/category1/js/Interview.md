---
title: 六月前端面试总结
date: 2019-07-03
tags:
 - 面试
categories:
 - javascript
---

## 前言

都说现在是互联网寒冬，但是我的内心就像六月的深圳，即使互联网寒冬也扑不灭我内心裸辞的‘热情’。然而没工作的我还是觉得心慌慌的，所以接下来的日子就是约面试，然后到处跑。一天换两套衣服是正常的，找了一个多星期，最后终于在月底入职了，人也黑了不少。
在面试的过程中发现其实很多都是问基础的问题，但是我回答的也是一点半点，不尽如人意啊！工作虽然找到了，但是我也知道了自己很多的不足之处，所以想把面试中遇到的问题总结记录下来，方便自己以后面试复习，同时如果能给正在面试的同学一些帮助，在这炎热的夏天中少走一些路，少出一点汗，我这晒黑也是值得的，哈哈哈！

## CSS部分

1.CSS有哪些继承属性？

以下是我总结的常用的可继承属性，说出七八个左右也基本够了。  

| 属性           | 说明                               |
| -------------- | ---------------------------------- |
| font           | 组合字体                           |
| font-family    | 规定元素的字体系列                 |
| font-weight    | 设置字体的粗细                     |
| font-size      | 设置字体的尺寸                     |
| font-style     | 定义字体的风格                     |
| font-variant   | 设置小型大写字母的字体显示文本     |
| text-indent    | 文本缩进                           |
| text-align     | 文本水平对齐                       |
| line-height    | 行高                               |
| word-spacing   | 增加或减少单词间的空白（即字间隔） |
| letter-spacing | 增加或减少字符间的空白（字符间距） |
| text-transform | 控制文大小写                       |
| direction      | 规定文本的书写方向                 |
| color          | 文本颜色                           |
| visibility     | 设置元素可见性                     |
| cursor         | 光标属性                           |

2.CSS水平垂直居中有哪些方式？

- 已知高度和宽度

```html
<div class="father">
    <div class="child"></div>
</div>
```

方式1: 定位 + margin: 0 auto;

```css
<style>
.father {
    width: 400px;
    height: 400px;
    background-color: red;
    position: relative;
}

.child {
    width: 100px;
    height: 100px;
    background-color: yellow;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
</style>
```

方式2: 定位 + 反向margin-top,margin-left;

```css
<style>
.father {
    width: 400px;
    height: 400px;
    background-color: red;
    position: relative;
}
 
.child {
    width: 100px;
    height: 100px;
    background-color: yellow;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
</style>
```
- 未知高度和宽度

方式1: 定位 + transform: translate()

```css
<style>
.father {
    width: 400px;
    height: 400px;
    background-color: red;
    position: relative;
}
 
.child {
    background-color: yellow;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
```

方式2: 弹性布局display: flex;

```css
<style>
.father {
    width: 400px;
    height: 400px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
}
 
.child {
    background-color: yellow;
}
</style>
```
以上是我比较常用的方法，这里推荐一个大佬总结的[16种方法](https://juejin.im/post/58f818bbb123db006233ab2a)

3.高度已知，三栏布局，左右宽度300，中间自适应

- 方式1: 浮动布局
```html
<style>
.container .left{
    width: 300px;
	float: left;
	height: 100px;
    background: red;
  }
.container .center{
    background: yellow;
    height: 100px;
  }
.container .right{
    height: 100px;
	width: 300px;
    float:right;
    background: blue;
}
</style>

<div class="container">
	<div class="left"></div>
	<div class="center"></div>
	<div class="right"></div>
</div>
```

- 方式2: 决定定位布局
```html
<style>
.container .layout>div{
    position: absolute;
}
.container .left{
    left:0;
    width: 300px;
    height: 100px;
    background: red;
}
.container .center{
    left: 300px;
    right: 300px;
    height: 100px;
    background: yellow;
}
.container .right{
    right:0;
    width: 300px;
    height: 100px;
    background: blue;
}
</style>

<div class="container">
	<div class="layout">
		<div class="left"></div>
		<div class="center"></div>
		<div class="right"></div>
	</div>
</div>
```

- 方式3: flex布局

```html
<style>
.container{
    margin-top: 110px;
}
.container .layout{
    display: flex;
}
.container .left{
    width: 300px;
    height: 100px;
    background: red;
}
.container .center{
    flex:1;
    background: yellow;
}
.container .right{
    width: 300px;
    height: 100px;
    background: blue;
}
</style>

<div class="container">
	<div class="layout">
		<div class="left"></div>
		<div class="conter"></div>
		<div class="right"></div>
	</div>
</div>
```

## js部分
1. 手写一个去重函数（不能用Set）

```js
/* 方法一 */
function set(arr) {
    var temp = [arr[0]]
    for(var i = 0; i < arr.length; i ++ ) {
        if(arr[i] !== temp[temp.length-1]) {
            temp.push(arr[i])
        }
    }
    return temp
}

/* 方法二 */
function quchong(arr) {
    let empty = []
    for (var i = 0; i < arr.length; i ++) {
        if (empty.indexOf(arr[i] ) === -1) {
            empty.push(arr[i])
        }
    }
    return empty
}
```

2. 手写数组:[5, -5, 10, 50, 14, 23, 34]中元素最大差值的函数

```js
/* 转换为求最大最小值，用最大值减最小值*/
function chazhi(arr) {
    let max = arr[0]
    let min = arr[0]
    for (let i = 0; i < arr.length; i ++) {
        if (arr[i] > max) {
            max = arr[i]
        }
        if (arr[i] < min) {
            min = arr[i]
        }
    }
    return max -min
}
```
3. 手写一个字符串中出现的最多次数的字符函数

```js
function sortStr(str) {
    str = str.split('').sort()  // 转化为数组
    var obj = {}
    let num = 0
    let str2 = ''
    for (const key of str) {
        // 重复的加1
        obj[key] = obj[key] ? ++obj[key] : 1  
    }
    for (let i in obj) {
        if (obj[i] > num) {
            num = obj[i]
            str2 = i
        }
    }
    return str2
}
```

4. 已知代码如下，写出createA这个函数
```js
const addSix = createA(6)
addSix(20) // 26
addSix(7)  // 13
```
这题考的是闭包，如果没想到真的会不知道怎么写

```js
function createA(n) {
    var n = n
    return function(a) {
        return a + n
        console.log(a + n)
    }
}
var addSix = createA(6)
console.log(addSix(20))   // 26
```

5. 说一下你理解的原型链？能手话原型链图吗？
原型和原型链也是面试经常问到的问题，这个知识点我单独总结了一下，具体的就不在这里写了。[传送门](https://juejin.im/post/5d133eb26fb9a07edd2a2258)

6. 说一下js继承方式，可以手写一个吗？

继承的方式还是比较多的，这里我就简单列举几种。

- 方法一：原型链继承

```js
/* 原型链继承 */

function Father(){
    this.name = '桐先生'
}

// 在父类的原型对象上添加一个showName方法
Father.prototype.showName = function(){
  console.log(this.name);
}

// 创建子构造函数
function Child(){}

// 子类的原型对象指向父类的实例对象
Child.prototype = new Father();
var child1 = new Child()
child1.showName()  // 桐先生
```
- 方法二：借用构造函数

```js
/* 借用构造函数 */
function Father(){
    this.name = ["桐先生"];
}

// 使用call方法构造函数，实现继承
function Child(){
    Father.call(this);
}

let child1 = new Child();
child1.name.push("tom");
let child2 = new Child();

console.log(child1.name);// => ["桐先生", "tom"]
console.log(child2.name);// => ["桐先生"]
```

- 方式三：组合继承
```js
/* 组合继承 */

function Person(name,age){
    this.name = name;
    this.age = age;
}
// 添加方法
Person.prototype.showName = function(){
    console.log('name:' + this.name, 'age:' + this.age);
}
// 使用call方法构造函数，实现继承
function Student(name, age){
    Person.call(this,name, age);
}
// 子类的原型对象指向父类的实例对象
Student.prototype = new Person();
Student.prototype.constructor = Student;

// 解决原型链方式不能给父构造函数传递参数问题
var child = new Student('tom', '24')  

child.showName()   // name:tom age:24
```
- 方式四：ES6的Class继承

```js
/* Class继承 */

class Father {
    constructor(){
        this.name = 'tom';
        this.name = 'mary';
    }
}

class Child extends Father{
    constructor(boy, girl){
    // 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错
        super();
        this.boy = boy;
        this.girl = girl;
    }
}

let child1 = new Child('mark','max');
console.log(child1) // {name: "mary", boy: "mark", girl: "max"}
```

7. 说一下你常用ES6的方法。

ES6的语法糖也是经常会被问到的，经常用到的有定义变量的关键字，数组方法，对象方法，promise函数，async函数，Class语法等。这里还是推荐去看阮一峰老师的[ECMAScript 6 入门](http://es6.ruanyifeng.com/)。真正理解了，是无所畏惧的。



 ## Vue.js
 1. 说一下Vue的父子组件传值。

- 父组件 ——> 子组件
 父组件向子组件传值是通过子组件的属性传值，在子组件通过props对象去获取。

- 子组件 ——> 父组件
每个Vue实例都实现了事件接口：使用$on(evntName)监听事件。在子组件使用$emit(eventName,optionalPayload)触发事件。在父组件通过子组件的传的事件方法获取传递的数据。

2. 说一下Vue的核心理念。

这个问题我刚开始说双向数据绑定，面试官说不对，后面思考了一下，才说出来。
Vue的核心思想是数据驱动，虚拟Dom，组件化。

3. Vue路由有哪些模式？这些模式有什么区别？

- 路由模式：1. hash模式  2. history模式

- 区别：hash模式url里面永远带着#号，我们在开发当中默认使用这个模式。hash模式背后的原理是onhashchange事件，可以在window对象上监听这个事件。因为hash发生变化的url都会被浏览器记录下来，从而你会发现浏览器的前进后退都可以用了，尽管浏览器没有请求服务器，但是页面状态和url一一关联起来。hash模式只能改变#后面的url片段，而history api则可以自由改变url。history api包含了各种方法：go(), back(), forword()等，还有pushState、replaceState两个方法可以对历史状态进行修改。

推荐文章：[面试官: 你了解前端路由吗?](https://juejin.im/post/5ac61da66fb9a028c71eae1b)

 ## Webpack
 
1. 说一下webpack打包原理。
    
    - 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
    
    - 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
    
    - 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，最后输出文件到项目。

 ## HTTP

 1. 常用的HTTP方法有哪些？

    - GET： 用于请求访问已经被URI（统一资源标识符）识别的资源，可以通过URL传参给服务器

    - POST：用于传输信息给服务器，主要功能与GET方法类似，但一般推荐使用POST方式。

    - PUT： 传输文件，报文主体中包含文件内容，保存到对应URI位置。

    - HEAD： 获得报文首部，与GET方法类似，只是不返回报文主体，一般用于验证URI是否有效。

    - DELETE：删除文件，与PUT方法相反，删除对应URI位置的文件。

    - OPTIONS：查询相应URI支持的HTTP方法。

2. 从浏览器输入URL按回车到页面显示都发生了什么？

    (1) 浏览器根据URL从DNS缓存中查询，若未在缓存中找到，则不停的向上一级级请求DNS服务器。

    (2) 取得IP地址，建立TCP连接。

    (3) 构造HTTP请求。

    (4) 在TCP连接上发送HTTP报文，等待响应。

    (5) 服务器处理HTTP请求报文，返回响应HTTP响应报文。

    (6) 浏览器处理服务器返回的HTTP响应报文，解析Dom，CSS等，然后渲染页面。

3. 说一下建立连接的三次握手？

    (1) 主机向服务器发送一个建立连接的请求(SYN)。

    (2) 服务器接到请求后发送同意连接的信号(ACK)。

    (3) 主机接到同意连接的信号后，再次向服务器发送了确认信号(ACK);

4. HTTP的状态码有哪些？

    1**信息，服务器收到请求，需要请求者继续执行操作。
    
    2**成功，操作被成功接收并处理。
    
    3**重定向，需要进一步的操作以完成请求。
    
    4**客户端错误，请求包含语法错误或无法完成请求。
    
    5**服务器错误，服务器在处理请求的过程中发生了错误。


1开头的状态码

    100Continue继续。客户端应继续其请求
    
    101Switching Protocols切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议

2开头的状态码

    200OK请求成功。一般用于GET与POST请求
    
    201Created已创建。成功请求并创建了新的资源
    
    202Accepted已接受。已经接受请求，但未处理完成
    
    203Non-Authoritative Information非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本
    
    204No Content无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档
    
    205Reset Content重置内容。服务器处理成功，用户终端(例如：浏览器)应重置文档视图。可通过此返回码清除浏览器的表单域
    
    206Partial Content部分内容。服务器成功处理了部分GET请求

3开头的状态码

    300Multiple Choices多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端(例如：浏览器)选择
    
    301Moved Permanently永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替
    
    302Found临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI
    
    303See Other查看其它地址。与301类似。使用GET和POST请求查看
    
    304Not Modified未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
    
    305Use Proxy使用代理。所请求的资源必须通过代理访问
    
    306Unused已经被废弃的HTTP状态码
    
    307Temporary Redirect临时重定向。与302类似。使用GET请求重定向

4开头的状态码

    400Bad Request客户端请求的语法错误，服务器无法理解
    
    401Unauthorized请求要求用户的身份认证
    
    402Payment Required保留，将来使用
    
    403Forbidden服务器理解请求客户端的请求，但是拒绝执行此请求
    
    404Not Found服务器无法根据客户端的请求找到资源(网页)。通过此代码，网站设计人员可设置”您所请求的资源无法找到”的个性页面
    
    405Method Not Allowed客户端请求中的方法被禁止
    
    406Not Acceptable服务器无法根据客户端请求的内容特性完成请求
    
    407Proxy Authentication Required请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权
    
    408Request Time-out服务器等待客户端发送的请求时间过长，超时
    
    409Conflict服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突
    
    410Gone客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置


5开头的状态码

    500Internal Server Error服务器内部错误，无法完成请求

    501Not Implemented服务器不支持请求的功能，无法完成请求

    502Bad Gateway充当网关或代理的服务器，从远端服务器接收到了一个无效的请求

    503Service Unavailable由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中
    
    -504Gateway Time-out充当网关或代理的服务器，未及时从远端服务器获取请求
    
    505HTTP Version not supported服务器不支持请求的HTTP协议的版本，无法完成处理

## 网络安全

 1. 常见的网络攻击及预防措施有哪些？
    - XSS攻击：跨站脚本（Cross-site scripting，通常简称为XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。预防：1. 过滤特殊字符  2. 使用 HTTP 头指定类型。
    
    - CSRF：跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。防御：1. 检查referer字段   2.添加校验token
    
## Web性能优化

1. web性能优化的方式有哪些？

    - 减少HTTP请求数
    
    - 将外部脚本放在body标签底部，将CSS文件放在head标签中
    
    - 合理使用CDN
    
    - 使用懒加载，预加载
    
    - 合理使用缓存
    
    - 使用CSS替换图片
    
    - 开启gzip打包
    
    - 按需引入第三方资源包

## 项目问题

项目问题一般会问一些你在这个项目中遇到的印象最深的问题之类的问题。面试前，要把之前做的项目或者重要部分的代码再看一下，最好是平时做项目的时候有记录问题的习惯，这样面试之前看看记录就好了。最后都会回归到技术上的问题。

## 总结

经过这么这些天的面试，感觉面试官问的问题都是大同小异。不过还是要注意，对于自己简历上写的东西还是要熟悉，毕竟面试官也是会根据你简历上写的技术点去问的。在面试前一定要做好准备，如果遇到自己特别喜欢的公司，没准备好就太可惜了。还有每次面试完总结一下自己不足之处，回去还是要把对应的知识点补回来。最后我想说，能不裸辞的最好不要裸辞，因为太阳真的好大，哈哈哈！除非你是真的待不下去或者急着离职，不然还是建议先找到下一家公司先。希望正在找工作的同学能尽快找到合适自己的工作。感谢阅读，如有不对之处，还请留言指出！谢谢！

<Vssue title="Vssue Interview" />


