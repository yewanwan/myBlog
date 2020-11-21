---
title: Promise学习笔记
date: 2019-09-07
tags:
 - Promise
categories:
 - javascript
---

## Promise

### 什么是Promise

- Promise用于异步计算
- 可以将异步操作队列话，按照预期的顺序执行，返回符合预期的结果
- 一个Promise表示在一个现在、将来或永不可能可用的值
- 可以在对象之间传递和造作Promise，帮助我们处理队列



### Promise产生的原因

- JavaScript为检查表单而生
- 创造它的首要目标是操作DOM
- JavaScript的操作大多数是异步的
- 异步操作避免界面冻结
- 解决回调产生的回调地狱问题



### Promise详解

#### 例子

```js
new Promise(
	/*执行器 executor*/
    function (resolve, reject) {
        // 一段耗时很长的异步操作
        resolve()	// 数据处理完成
        reject()	// 数据处理出错
    }
).then(function A() {
    //	成功， 下一步
}， function B() {
    // 	失败，做相应的处理
})
```

- Promise是一个代理对象， 它和原先要进行的操作并无关系。
- 他通过引入一个回调，避免更多的回调。



#### Promise有3个状态

- pending：【待定】初始状态

- fulfilled： 【实现】操作成功

- rejected：【被否决】操作失败

  

Promise状态发生改变，就会触发.then()里的响应函数处理后续步骤。

Promise状态一经改变，不会再变。



#### Promise实例一经创建，执行器立即执行

![](D:\Promise笔记\imgs\Snipaste_2019-09-05_11-55-12.png)



### .then()

- 状态响应函数可以返回新的Promise，或其他的值
- 如果返回新的Promise，那么下一级.then()会在新Promise状态改变之后执行
- 如果返回其他任何值，则会在立刻执行下一级.then()



#### .then()里有.then()的情况

- 因为.then()返回的是Promise实例
- 会等里面的.then()执行完，在执行外面的
- 对于我们来说，此时最好将其展开，会更好的阅读



### 错误处理

使用``.catch(err => {})``处理，.catch()执行完后仍然会返回一个Promise实例，继续执行后面的.then()方法

使用throw new Error('error')抛出错误会引发不同的走向，绕过.then()方法，执行.catch(err => {})

强烈建议： 在所有队列后面都加上.catch()，以免漏掉错误处理造成意想不到的问题



### Promise.all()

- 用于批量执行，``Promise.all([p1, p2, p3])``用于多个Promise实例，包装成有一个新的Promise实例

- 可以接收一个数组作为参数

- 数组里可以是Promise对象，也可以是别的值，只有Promise会等待状态改变

- 有子Promise都完成，该Promise完成，返回值是全部值的数组

- 有任何一个失败，该Promise失败，返回值是第一个失败的子Promise的结果



### Promise.resolve()

返回一个fulfilled的Promise实例，或原始Promise实例

- 参数为空， 返回一个状态为fulfilled的Promise实例
- 参数是一个跟Promise无关的值，同上，不过fulfilled响应函数会得到这个参数



### Promise.reject()

返回一个rejected的Promise实例

- Promise.reject()不认thenable



### Promise.race()

类似Promise.all()，区别在于它有任意一个完成就算完成

常见方法： 1.把异步操作和定时器放在一起。 2.如果定时器先触发，就认为超时，告知用户



### Promise实现

```js
class Promise {
	constructor(executor) {
		// 参数校验
		if (typeof executor !== 'function') {
			throw new TypeError(`Promise resolve ${executor} is not a function`)
		}
		this.initValue()
		this.initBind()

		try {
			executor(this.resolve, this.reject)
		} catch(e) {
			this.reject(e)
		}
		
	}
	// 初始化值
	initValue() {
		this.value = null	// 终值
		this.reason = null	// 拒因
		this.state = Promise.PENDING	//状态
		this.onFulfilledCallbacks = []	// 成功回调
		this.onRejectedCallbacks = []	// 失败回调
	}

	// 绑定this
	initBind() {
		this.resolve = this.resolve.bind(this)
		this.reject = this.reject.bind(this)
	}

	resolve(value) {
	// 成功后的操作（状态改变，成功回调执行）
		if (this.state === Promise.PENDING) {
			this.state = Promise.FULFILLED
			this.value = value
			this.onFulfilledCallbacks.forEach((fn) => fn(this.value))
		}
	}

	reject(reason) {
	// 失败后的操作（状态改变，失败回调执行）
		if (this.state === Promise.PENDING) {
			this.state = Promise.REJECTED
			this.reason = reason
			this.onRejectedCallbacks.forEach((fn) => fn(this.reason))
		}
	}

	then(onFulfilled, onRejected) {
			// 参数校验
		if (typeof onFulfilled !== 'function') {
			onFulfilled = function(value) {
				return value
			}
		}
		if (typeof onRejected !== 'function') {
			onRejected = function(reason) {
				throw reason
			}
		}
		// 实现链式调用，且改变了后面的then的值，必须返回新的实例
		let promise2 = new Promise((resolve, reject) => {
			// 判断状态执行函数
		if (this.state === Promise.FULFILLED) {
			setTimeout(() => {
				try {	
					const x = onFulfilled(this.value)
					 Promise.resolvePromise(promise2, x, resolve, reject)
				} catch(e) {
					reject(e)
				}
			})
		}

		if (this.state === Promise.REJECTED) {
			setTimeout(() => {
				try {
					const x = onRejected(this.reason)
					 Promise.resolvePromise(promise2, x, resolve, reject)
				} catch(e) {
					reject(e)
				}
			})
		}

		if (this.state === Promise.PENDING) {
			this.onFulfilledCallbacks.push((value) => {
				setTimeout(() => {
					try {
						const x = onFulfilled(value)
						 Promise.resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			})

			this.onRejectedCallbacks.push((reason) => {
				setTimeout(() => {
					try {
						const x = onRejected(this.reason)
						 Promise.resolvePromise(promise2, x, resolve, reject)
					} catch(e) {
						reject(e)
					}
				})
			})
		}
	})
	return promise2	
	}
}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'
Promise.resolvePromise = function(promise2, x, resolve, reject) {
	// x与promise相等
	if (promise2 === x) {
		reject(new TypeError('Chaining cycle detected for promise'))
	}
	let called = false
	// 判断x是否为Promise
	if (x instanceof Promise) {
		x.then(value => {
			Promise.resolvePromise(promise2, value, resolve, reject)
		}, reason => {
			rejecte(reason)
		})
		// 判断x为对象或者函数
	} else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
		try {
			let then = x.then
			if (typeof then === 'function') {
				then.call(x, (value) => {
					if (called) return
					called = true
					Promise.resolvePromise(promise2, value, resolve, reject)
				}, reason => {
					if (called) return
					called = true
					reject(reason)
				})
			} else {
				if (called) return
				called = true
				resolve(x)
			}
		} catch(e) {
			if (called) return
			called = true
			reject(e)
		}
	} else {
		resolve(x)
	}
}

module.exports = Promise

/* 测试代码 */
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

```
<Vssue title="Vssue Promise" />