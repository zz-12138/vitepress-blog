## es6

1. use strict严格模式：

   * 申明变量必须用标识符（var、let、const）
   * 禁止在自定义函数中this指向window
   * 禁止使用eval、with
   * 对象不能有重名
   * ……

2. 对象的扩展：

   * `Object.create(prototype, [descriptors])`：指定对象为原型，创建新对象，第二个参数可为新对象添加属性

   * ```js
     const a = {name: 'zz', age: 18}
     const b = Object.create(a, {
         sex: {
             value: 'man',
             writable: false, //不可写
             configurable: true, //可删除
             enumerable: true //可枚举（迭代）
         }
     })
     Object.defineProperty(obj, 'sex', {
         value: 'wuman',
         writable: true,
         configurable: true,
         enumerable: true
     }) //单独设置某个属性
     b //{sex: 'man'}
     b.__proto__ //{name: 'zz', age: 18}
     ```

   * `Object.defineProperties(obj, descriptors)`：为指定对象定义扩展多个属性，扩展的属性不可直接修改

   * ```js
     const obj = {firstname: 'wa', lastname: 'll'}
     Object.defineProperties(obj, {
         fullname: {
             //监听扩展属性，当属性被调用或修改时自动调用set和get方法
             get() {
                 return this.firstname + this.lastname
             },
             set(data) {
                 this.firstname = data
             }
         }
     })
     obj //{firstname: 'wa', lastname: 'll', fullname: 'wall'}
     obj.fullname = 'zz'
obj //{firstname: 'zz', lastname: 'll', fullname: 'zzll'}
     ```
     
   * call()和apply()绑定后会**立即调用函数**
   
   * bind()不会立即调用函数，而是**将函数返回**，传参和call()相同
   
3. let、const：

   * let：有块级作用域、禁止重复声明、无变量作用域提升

   * const：有块级作用域、禁止重复声明、禁止修改、无变量作用域提升

   * 在执行上下文的词法环境创建出来的时候，变量已经被创建了，但不能被访问，该现象称为暂时性死区

   * 在开发中，优先使用const定义变量，只有明确该变量会被重新赋值，采用let

   * 块级作用域

     * ```js
       // ES6的块级作用域对let/const/function/class声明的类型是有效的
       {
           let a = 'wall'
           function foo() { console.log('foo') }
           class Person {}
       }
       console.log(foo) //foo is not defined
       foo() //foo， 不同的浏览器为了兼容以前的代码，让function的调用没有块级作用域
       const p = new Person() //Person is not defined
       
       //暂时性死区
       var foo = 'foo'
       if (true) {
           console.log(foo) //err
           let foo = 'a'
       }
       
       // if，switch，for，while...等语句都是块级作用域
       if (true) {
           var a = 'a'
           let b = 'b'
       }
       console.log(a) //a
       console.log(b) //b is not defined
       
       switch(a) {
           case 1:
               var c = 'c'
               let d = 'd'
       }
       console.log(c) //c
       console.log(d) //d is not defined
       
       for (var i = 0; i < 10; i++) { console.log(i) }
       for (let j = 0; j < 10; j++) { console.log(j) }
       console.log(i) //10
       console.log(j) //j is not defined
       ```

4. 解构赋值：

   * 数组的结构赋值：

     ```js
     let [a, b, c] = [1, 2, 3] //let a = 1, b = 2, c = 3
     let [a, b, c = 3] = [1, 2] //let a = 1, b = 2, c = 3(带默认值)
     ```

   * 对象的解构赋值：

     ```js
     const obj = {name: 'wall', age: 18}
     const {name, age} = obj //const name = 'wall', age = 18(两边属性名要一致)
     const {name: username, age} = obj //const username = 'wall', age = 18(对象属性名的修改)
     let name = 'zz'
     ({name} = obj) //已定义变量的结构，用括号包裹
     ```

   * 字符串的解构赋值：

     ```js
     const str = 'helloworld'
     const [a, b, c, d] = str //const a = 'h', b = 'e', c = 'l', d = 'l'
     ```

5. for……in、for……of、Set和Map对象：

   * ```js
     const arr = ['wall', 'is', 'good']
     const map = new Map()
     map.set('name', 'wall')
     map.set('age', 18)
     const set = new Set([1, 2, 3, 1, 2])
     for(let i in arr) {
         console.log(i) //0, 1, 2
         console.log(arr[i]) // wall, is, good
     }
     for(let item of arr) {console.log(item)} //wall, is, good
     for(let [key, value] of map) {console.log(value)} //wall, 18
     for(let item of set) {console.log(item)} //1, 2, 3
     ```

6. 模板字符串：

   * ``这是一个模板字符串${value}``：value可以是变量、函数表达式、函数的调用……

7. 函数的扩展：

   * 箭头函数：
   
     ```js
     const div = document.querySelector('div')
     div.onclick = () => {
     	setTimeout(function() {
     		console.log(this) //window(默认绑定window)
     		this.style.backgroundColor = 'red'
     	})
         setTimeout(function() {
     		console.log(this) //div(改变this指向)
     		this.style.backgroundColor = 'red'
     	}.bind(this), 1000)
         setTimeout(() => {
             console.log(this) //div(箭头函数this不会随着调用改变，始终为上下文this)
     		this.style.backgroundColor = 'red'
         }, 1000)
     }
     ```
   
   * 默认参数：
   
     ```js
     let x = 3
     const a = (x = 4, y = x) => console.log(x, y) //4, 4
     const b = (z = 4, y = x) => console.log(y) //3
     const c = (x, y, z = 3, w) => console.log(x, y, z, w)
     console.log(c.length) //2， 默认参数后边的参数都不记作函数length（包括自身）
     ```
   
   * 扩展运算符和剩余参数：
   
     ```js
     //复制数组
     let arr = [1, 2, 3, 4, 5]
     let newArr = [...arr] //[1, 2, 3, 4, 5]
     console.log(arr == newArr) //false
     //传参
     const fn = (a, b, ...arg) => console.log(a, b, ...arg) //1，2，3，4，5
     fn(...arr)
     // 对象展开运算符：浅拷贝
const obj = { 
         name: 'wall', 
         info: { name: 'info' }
     }
     
     const newobj = { ...obj, name: 'zz' }
     console.log(newobj) //{ name: 'zz', info: { name: 'info' } }
     
     newobj['info'].name = 'wall'
     console.log(obj) //{ name: 'wall', info: { name: 'wall' } }
     ```
   
8. promise：

   * 概述：promise对象代表了未来某个要发生的事件（通常是一个异步操作）
   
   * es6中的promise对象，可以将异步操作以同步的流程表达出来，很好的解决了回调地狱的问题（避免层层嵌套）
   
   * promise三个状态：
   
     * 初始化状态（等待状态）：pending
     * 成功状态：fullfilled
     * 失败状态：rejected
   
   * 使用promise的步骤：
   
     ```js
     //封装一个ajax
     const ajax = (url) => {
         return new Promise((resolve, reject) => {
             //1.创建xhr
             const xhr = new XMLHttpRequest()
             //2.设置请求方式和路径
             xhr.open('GET', url)
             //3.发送请求
             xhr.send()
             //4.监听返回结果
             xhr.onreadystatechange = () => {
                 if(xhr.readyState === 4 && xhr.status === 200) {
                     resolve(xhr.response)
                 } else if((xhr.readyState === 4 && xhr.status !== 200)) {
                     reject(xhr.response)
                 }
             }
         })
     }
     //发请求
     ajax('http://data.json').then(res => console.log(JSON.parse(res)))
         						.catch(res => console.log(res))
     ```
     
   * Promise构造函数：
   
     ```js
     //创建成功的promise对象
     Promise.resolve('success').then(res => console.log(res)) //success
     //创建失败的promise对象
     Promise.reject('fail').catch(res => console.log(res)) //fail
     //Promise.all()：用来包装多个promise实例统一处理，返回所有成功状态promise对象，参数为数组
     const p1 = Promise.resolve(1)
     const p2 = Promise.resolve(2)
     const p3 = Promise.reject(3)
     const p4 = Promise.reject(4)
     Promise.all([p1, p2]).then(res => console.log(res)) //[1, 2]，成功状态全部处理
     Promise.all([p1, p2, p3, p4]).then(res => console.log(res)).catch(res => console.log(res)) //3，失败状态单个处理
     //Promise.race()：用来包装多个promise实例统一处理，返回第一个成功状态promise对象，参数为数组
     Promise.race([p1, p2]).then(res => console.log(res)) //1
     Promise.all([p1, p2, p3, p4]).then(res => console.log(res)).catch(res => console.log(res)) //1
     Promise.all([p3, p4]).catch(res => console.log(res)) //3
     ```
   
9. async/await（外异内同）：

   ```js
   const p1 = Promise.resolve('success1')
   const p2 = Promise.resolve('success2')
   const p3 = Promise.reject('err')
   const render = async () => {
       try {
           let data1 = await p1 //异步操作，同步处理
           let data2 = await p2
           let data3 = await p3
           console.log(data1, data2)
       } catch(err) {
           console.log(err) //加入微任务队列
       }
   }
   render() //返回一个pending的promise对象
   console.log('first go')
   //执行顺序：first go, err
   //tips1: try...catch只能兜住同步执行的代码，此处将promise同步处理，统一封装成异步函数render调用
   //tips2: await p1 相当于new Promise(resolve => p1)会立即执行
   //await p2相当于Promise.resolve(p1).then(() => await p2),只有第一个await状态为fulfilled才会执行
   ```

10. 迭代器/生成器：

    * 迭代器（Iterator）：迭代器是一种特殊对象，每一个迭代器都有一个next()，该方法返回一个对象，包括value和done属性

      ```js
      //实现一个迭代器工厂函数
      const createIterator = items => {
          let i = 0
          return {
              next() {
                  let done = (i >= items.length) //判断i是否小于遍历对象长度
                  let value = !done ? items[i++] : undefined //如果done为false，设置value为当前值
                  
                  return {value, done}
              }
          }
      }
      const a = createIterator([1, 2, 3])
      console.log(a.next()) //{value: 1, done: false}
      console.log(a.next()) //{value: 2, done: false}
      console.log(a.next()) //{value: 3, done: false}
      console.log(a.next()) //{value: undefined, done: true}
      ```

    * 生成器（Generator）：用来返回迭代器，一个带*的函数，返回迭代器对象，遇到yield**中断执行**，调用next()继续执行，next()函数可以传参，会改变下一次yield的值

      ```js
      //生成器函数，es6内部实现了迭代器功能，只需要用yield输出，可用for...of遍历
      function *createIterator() {
          for (let i = 0; i < 10; i++) {
               i = yield i
          }
      }
      const a = createIterator()
      console.log(a.next()) //{value: 0, done: false}
      console.log(a.next(5)) //{value: 6, done: false}
      ```

    * 创建可迭代对象：

      ```js
      const obj = {
          name: 'zz',
          age: 18,
          *[Symbol.iterator]() {
              for (let key in this) {
                  yield [key, this[key]]
              }
          }
      }
      for (let [key, value] of obj) {
          console.log(key, value)
      }
      //name zz, age 18
      ```

    * 数组、Set、Map等的内部迭代器：

      * entries()：返回键值对

      * values()：返回键值对的value
      * keys()：返回键值对的key

11. Symbol：

    * 在ES6之前，对象的属性名都是字符串，很容易造成属性名冲突

    * 将Symbol作为对象的属性值：

      ```js
      const s1 = Symbol('s1')
      const s2 = Symbol()
      let sobj = {name: 'zz', age: 12, [s1]: 'run'}
      sobj[s2] = 'wall'
      sobj[s1] = 'sun'
      console.log(sobj) //{ name: 'zz', age: 12, [Symbol(s1)]: 'sun', [Symbol()]: 'wall' }
      console.log(s1.description) //s1
      
      //不能通过obj.symbol获取
      sobj.s1 //undefined
      
      //使用symbol定义的属性名，Object.keys()无法获取
      const skeys = Object.getOwnPropertySymbols(sobj)  //通过此方法可以获取所有symbol属性名
      
      const s3 = Symbol.for('s3')
      const key = Symbol.keyFor(s3)
      console.log(s3, key) //Symbol(s3) s3
      ```

12. fetch：

    * 已经封装好了的原生ajax请求函数，支持promise和回调函数两种形式

      ```js
      const renderData = async () => {
          let res1 = await fetch('http://user/01')
          let res2 = await res1
          console.log(JSON.parse(res2))
      }
      renderData()
      ```

13. Proxy：

    * 语法：

      ```js
      let p = new Proxy(target, handler)
      //target: 一个目标对象（可以是任何类型）用Proxy来包装
      //handler：一个对象，其属性是执行一个操作时定义代理的行为函数
      ```

    * 代理的使用：

      ```js
      //设置目标对象
      const obj = {a: 1, c = 2}
      //代理操作
      let handler = {
          //get和set方法必须定义两个形参，一个为目标对象，一个为目标对象调用的属性
          get(target, name) {
              return name in target ? target[name] : 0
          },
          set(target, name, value) {
              target[name] = value
          }
      }
      //创建代理对象
      let p = new Proxy(obj, handler)
      p.a //1
      p.b //0
      p.b = 3
      p.b //3
      ```

    * 代理应用：

      ```js
      //创建代理dom对象
      let DOM = new Proxy({}, {
          get(target, attr) {
              return (attrs, ...childs) => {
                  //创建dom节点
                  let domObj = document.createElement(attr)
                  //添加属性
                  for (let key in attrs) {
                      domObj.setAttribute(key, attrs[key])
                  }
                  //添加内容
                  for (let i = 0; i < childs.length; i++) {
                      if(typeof childs[i] == 'string') {
                          let textNode = document.createTextNode(childs[i])
                          domObj.appendChild(textNode)
                      } 
                  }
                  return domObj
              }
          }
      })
      let div = DOM.div({id: 'id1', class: 'active'}, 'hello', 'zz')
      document.body.appendChild(div)
      ```

14. 模块：

    * 模块是自动运行在严格模式下并且没有办法退出JavaScript代码

      ```js
      //module1
      const a = 1
      const b = 2
      export default const c = 3 //默认导出
      export {a, b}
      //module2
      import {a, b}, c from 'module1'
      import * as all from 'module1' //全部导入
      console.log(a, b, c) //1, 2, 3
      console.log(all.a, all.b) //1, 2
      ```

15. 手写Promise

    * ```js
      class myPromise {
          constructor(fn) {
              //注册成功的事件
              this.successFn = []
              //注册失败的事件
              this.failFn = []
              this.state = 'pending'
              fn(this.resolve.bind(this), this.reject.bind(this))
          }
          then(successFn, failFn) {
              if(typeof successFn == 'function') {
                  this.successFn.push(successFn)
              }
              if(typeof failFn == 'function') {
                  this.failFn.push(failFn)
              }
          }
          catch() {
              if(typeof failFn == 'function') {
                  this.failFn.push(failFn)
              }
          }
          resolve(res) {
              this.state = 'fullfilled'
              this.successFn.forEach((item, index) => {
                  //将成功的事件循环调用
                  item(res)
              })
          }
          reject(res) {
             this.state = 'rejected'
             this.failFn.forEach((item, index) => {
                  item(res)
              }) 
          }
      }
      //创建promise对象
      const fn = (resolve, reject) => {
          setTimeout(() => {
              if (true) {
                  resolve('success')
              } else {
                  reject('err')
              }
          }, 1000)
      }
      const p = new myPromise(fn)
      p.then(res => console.log(res)) //success
      ```

16. 观察者模式（订阅模式）

    * ```js
      //1.观察者模式原理
      const lcEvent = {
          event: {
              
          },
          //事件添加
          addEvent: function(eventName, fn) {
              if(this.event[eventName] == undefined) {
                  this.event[eventName] = []
              }
              this.event[eventName].push(fn)
              this.item(eventName, e)
          },
          //事件发放
          emit: function(eventName, e) {
              const fnList = this.event[eventName]
              fnList.forEach(item => {
                  item(e)
              })
          }
      }
      
      lcEvent.addEvent('click', e => { console.log(e) })
      lcEvent.emit('click', {name: 'zz'}) //{name: 'zz'}
      ```

      ```js
    //2.事件监听原理
      const lcEvent = {
          event: {
              
          },
          //事件添加
          addEvent: function(eventName, fn) {
              if(this.event[eventName] == undefined) {
                  this.event[eventName] = []
              }
              this.event[eventName].push(fn)
              this.emit(eventName)
          },
          //事件发放
          emit: function(eventName) {
              const fnList = this.event[eventName]
              fnList.forEach(item => {
                  item({name: 'zz'}) //传event参数
              })
          }
      }
      
      lcEvent.addEvent('click', e => { console.log(e) }) //{name: 'zz'}(可以看作event参数)
      ```
      
      

