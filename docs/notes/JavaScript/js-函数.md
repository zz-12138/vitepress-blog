## js函数

1. 数组去重：

   * ```js
     //用indexOf函数判断数组中是否有重复的value：
     function arrayRepeat(arr) {
         let res = []
         for(let i = 0; i < arr.length; i++) {
             if(res.indexOf(arr[i]) == -1) {
                 res.push(arr[i])
             }
         }
         return res
     }
     //res.indexOf(arr[i])有重复值返回true，无重复值返回false
     ```

   * ```js
     //利用sort对数组排序，然后前后元素对比
     function arrayRepeat(arr) {
         let res = [arr[0]] //定义新数组，接受初始元素
         arr.sort((a, b) => a - b) //排序
         for(let i = 0; i < arr.length; i++) {
             if(arr[i] !== res[res.length - 1]) {
                 res.push([arr[i])
             }
         }
         return res
     }
     ```

2. 函数的调用：

   * ```js
     //函数的调用模式：
     //1.声明调用
     function A() {
         return 'zz'
     }
     A()
     //2.函数表达式
     let B = function() {
         return 'zz'
     }
     B()
     //3.函数自执行
     (function C(){return 'zz'})()
     ```

   * ```js
     //方法的调用模式
     let obj = {
         name: 'zz',
         getName() {
             console.log(this.name)
         },
     	setName(name) {
             this.name = name
             return this
         }
     }
     obj.setName('wall').getName()
     ```

   * ```js
     //构造器模式调用
     //ES5:
     function Person(name) {
         this.name = name
     }
     Person.prototype.getName = function() {
         return this.name
     }
     let p = new Person('wall')
     console.log(p.getName())
     //ES6
     class Person {
         constructor(name) {
             this.name = name
         }
         A() {
             console.log(this.name)
         }
     }
     let p = new Person('wall')
     p.A()
     ```

   * ```js
     //通过call、apply改变函数执行主体（this指向）：
     function tool(a, b) {
         return a + b
     }
     let p = {}
     console.log(tool.call(p,1,2)) //3
     cosole.log(tool.apply(p,[1,2])) //3
     ```

3. 函数的形参和实参：

   * ```js
     //形参的改变不会引起基本数据类型值的改变，但引用类型会
     let a = 2
     let b = [0, 1]
     function C(a, b) {
     	a = 1, b[0] = 1
     	console.log(a, b) 
     }
     C(a, b) //1, [1, 1]
     console.log(a, b) //2, [1, 1]
     ```

   * ```js
     //arguments的作用
     //1.用于匿名函数的递归
     function create() {
         return function(n) {
             if (n <= 1) { return 1 }
             return n * arguments.callee(n - 1)
         }
     }
     let value = create()(5)
     console.log(value)
     //2.对传入对象进行预处理
     function A(str) {
         let strArr = Array.prototype.slice.call(arguments, 1)
         return strArr.join('')
     }
     A('a', 'b', 'c') //bc
     //3.统计数组中每个元素出现的次数
     let countArrNum = function (arr) {
         return arr.reduce((pre, cur) => {
             pre[cur] ? pre[cur]++ : pre[cur] = 1
             return pre
         },{})
     }
     console.log(countArrNum([2,2,2,3,3])) //{2: 3, 3: 2}
     ```

4. 函数的闭包(函数包裹函数，对外部变量的引用)：

   * ```js
     //1.对函数执行结果的缓存
     let cacheMemory = (function() {
         //定义一个缓存器
         let cache = {}
         return {
     		function set(id) {
                 if(id in cache) {
                     return `id:${cache[id]}`
                 }
             }
         }
     })
     console.log(cacheMemory.set(1)) //cache不仅没有被销毁，还可以被操作
     //2.定时器问题（闭包防止变量污染）
     let arr = ['a', 'b', 'c']
     for(var i = 0; i < arr.length; i++) {
         (function(time) {
             setTimeout(() => {
                 console.log(arr[time])
             },time*1000)
         })(i)
     }//每秒打印一次数组中元素
     ```

5. this的使用（永远指向函数调用者）

   * ```js
     //1.this的重新绑定
     call(thisArg, x, y)
     apply(thisArg, [x, y])
     bind(thisArg, x, y)
     //thisArg:函数或对象
     ```
     
   * ```js
     //将类数组对象转化为数组对象
     function A() {
         let arr = Array.prototype.slice.call(arguments)
         return arr.reduce((pre, cur) => {
             return pre + cur
         })
     }
     console.log(A(1,2,3))//6
     ```
   
   * ```js
     //执行匿名函数
     //demo1：
     let animals = [
         {name: 'zz', age: 18},
         {name: 'aa', age: 20}
     ]
     for(let i = 0; i < animals.length; i++) {
         (function(i) {
             this.print = function() {
                 console.log(this.name)
             }
             this.print()
         }).call(animals[i], i)
     }//zz,aa
     //demo2：
     function A() {
         this.pateCount = Math.ceil(Math.random()*12) + 1
     }
     A.prototype.declare = function() { console.log(`随机数：${this.pateCount}`) }
     A.prototype.bloom = function() {
         let _this = this
         setTimeout(() => this.declare(), 1000) //写法一
         setTimeout(this.declare.bind(this), 1000) //写法二
     }
     let a = new A()
     a.bloom()
     ```
   
     

