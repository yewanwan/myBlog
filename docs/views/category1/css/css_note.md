---
title: CSS基础笔记
date: 2019-12-16
tags:
 - css
categories:
 - CSS
---

## 盒模型

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距margin，边框border，填充padding，和实际内容content。

- box-sizing: content-box; （W3C盒模型，又称为标准盒模型）：元素的宽高大小为盒子里面内容的大小，不包括内外边距、边宽等；

- box-sizing: border-box; （IE盒模型，又称为怪异盒模型）：元素的宽高表现为内容 + 内边距 + 边框的大小，背景会延伸到边框的外沿。

## CSS3新特性

- word-wrap 文字换行
- text-overflow 超过指定容器的边界时如何显示
- text-decoration 文字渲染
- text-shadow文字阴影
- gradient渐变效果
- transition过渡效果 transition-duration：过渡的持续时间
- transform拉伸，压缩，旋转，偏移等变换
- animation动画

## BFC

### BFC应用

- 防止margin重叠
- 清除内部浮动
- 自适应两（多）栏布局
- 防止字体环绕

### 触发BFC条件

- 根元素
- float的值不为none
- overflow的值不为visible
- display的值为inline-block、table-cell、table-caption
- position的值为absolute、fixed

### BFC的特性

- 内部的Box会在垂直方向上一个接一个的放置。
- 垂直方向上的距离由margin决定
- bfc的区域不会与float的元素区域重叠。
- 计算bfc的高度时，浮动元素也参与计算
- bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

## 清除浮动

1. 在浮动元素后面添加 ``clear:both;`` 的空div

```html
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div style="clear:both"></div>
</div>
```

2. 给父元素添加 ``overflow:hidden`` 或者 ``auto`` 样式，触发BFC

```html
<style>
    .container{
    width: 300px;
    background-color: #aaa;
    overflow: hidden;
}
</style>
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

3. 使用伪元素，也是在元素末尾添加一个点并带有 ``clear: both;`` 属性的元素实现的（推荐）

```html
<style>
.clearfix:after{
    content: ".";
    height: 0;
    clear: both;
    display: block;
    visibility: hidden;
} 
</style>
<div class="container clearfix">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

## calc函数

calc函数可以计算值为数字的属性，实现设置动态值

```css
    div {
        width: calc(50px * 2);
        /* 兼容写法 */
        width: -moz-calc(100px * 2);
        width: -webkit-calc(100px * 2);
    }
```
注意： 运算符前后都需要保留一个空格；calc()函数支持'+', '-', '*', '/'运算；

## 移动端rem

rem官方说明 The font size of the root element ，即根元素的字体大小。rem是一个相对的CSS单位，1rem等于html元素上font-size的大小。所以，我们只要设置html上font-size的大小，就可以改变1rem所代表的大小。

```js
(function () {
    var html = document.documentElement;
    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
    }
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
})();
```

## 移动端1px问题

一般情况下在PC端浏览器中，设备像素比（dpr）等于1，1个css像素就代表1个物理像素；但是在手机的retina屏幕中，dpr一般是2或3，1个css像素不等于1个物理像素，因此比实际设计稿看起来粗不少。

<Vssue title="Vssue css_note" />

