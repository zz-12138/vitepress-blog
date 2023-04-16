---
outline: deep
---

# js-高级语法（四）

## 迭代器iterator

1. 概念：是确使用户可在容器对象（container，链表或数组）上遍访的对象，使用该接口无需关心对象的内部实现细节

2. 解释：迭代器就是帮助我们对某个数据结构进行遍历

3. 在js中，迭代器是一个具体的对象，这个对象需要符合迭代器协议（iterator protocol）

   * 迭代器协议定义了产生一系列值（无论是优先还是无限个）的标准方式
   * 这个标准就是一个特定的next方法

4. next有如下要求

   * 一个无参函数，返回一个应当有以下两个属性的对象
   * done(boolean)：
     * 如果迭代器可以产生序列中的下一个值，则为false。（这等价于没有指定done这个属性）
     * 如果迭代器已将序列迭代完毕，则为true。这种请情况下，value是可选的，如果他依然存在，即为迭代结束之后的默认返回值
   * value：
     * 迭代器返回的任何js值，done为true时可省略

5. 数组迭代器

   ```js
   // 迭代器iterator
   const arr = ['kobe', 'bob', 'wall']
   
   let index = 0
   const arrIterator = {
       next() {
           if (index < arr.length) {
               return { done: false, value: arr[index ++] }
           } else {
               return { done: true, value: undefined }
           }
       }
   }
   
   console.log(arrIterator.next())
   console.log(arrIterator.next())
   console.log(arrIterator.next())
   console.log(arrIterator.next())
   /**
    *  { done: false, value: 'kobe' }
       { done: false, value: 'bob' }
       { done: false, value: 'wall' }
       { done: true, value: undefined }
    */
   ```

6. 生成迭代器函数

   ```js
   // 生成迭代器函数
   
   const createArrayIterator = (arr) => {
       let index = 0
       return {
           next() {
               if (index < arr.length) {
                   return { done: false, value: arr[index ++] }
               } else {
                   return { done: true, value: undefined }
               }
           }
       }
   }
   
   const nums = [1, 2, 3, 4, 5]
   const numsIterator = createArrayIterator(nums)
   console.log(numsIterator.next())
   console.log(numsIterator.next())
   console.log(numsIterator.next())
   console.log(numsIterator.next())
   console.log(numsIterator.next())
   console.log(numsIterator.next())
   /**
    *  { done: false, value: 1 }
       { done: false, value: 2 }
       { done: false, value: 3 }
       { done: false, value: 4 }
       { done: false, value: 5 }
       { done: true, value: undefined }
    */
   ```

## 可迭代对象

1. 当一个对象它实现了iterator protocol协议时，它就是一个可迭代对象

2. 这个对象的要求是必须实现@@iterator方法，在代码中我们使用Symbol.iterator访问该属性

3. 当一个对象变成可迭代对象，进行for...of时就会调用@@iterator方法

4. 可迭代对象实现

   ```js
   / 创建一个可迭代对象
   
   const iteratorObj = {
       arr: ['a', 'b', 'c', 'd'],
       [Symbol.iterator]: function() {
           let index = 0
           return {
               next: () => {
                   if (index < this.arr.length) {
                       return { done: false, value: this.arr[index ++] }
                   } else {
                       return { done: true, value: undefined }
                   }
               }
           }
       }
   }
   
   const iterator = iteratorObj[Symbol.iterator]()
   console.log(iteratorObj[Symbol.iterator]) // [Function: [Symbol.iterator]]
   console.log(iterator.next())
   console.log(iterator.next())
   console.log(iterator.next())
   console.log(iterator.next())
   console.log(iterator.next())
   /**
    *  { done: false, value: 'a' }
       { done: false, value: 'b' }
       { done: false, value: 'c' }
       { done: false, value: 'd' }
       { done: true, value: undefined }
    */
   
   // for...of必须是一个可迭代对象：是迭代器的语法糖，当next函数中的done为false，继续迭代；当done为false时，停止迭代
   for(const i of iteratorObj) {
       console.log(i) // a, b, c, d
   }
   ```

5. 原生迭代对象：默认已经实现了可迭代协议

   * String、Array、Map、Set、argument、NodeList集合

   * ```js
     // 原生可迭代对象：数组
     const names = ['wall', 'zz', 'aa']
     const namesIterator = names[Symbol.iterator]()
     console.log(namesIterator.next())
     console.log(namesIterator.next())
     console.log(namesIterator.next())
     console.log(namesIterator.next())
     /** 
      *  { value: 'wall', done: false }
         { value: 'zz', done: false }
         { value: 'aa', done: false }
         { value: undefined, done: true }
      */
     ```

6. 可迭代对象的用处

   * js语法：for...of、展开语法（spread syntax）、yield*、解构赋值（Destructuring_assignment）

   * 创建一些对象时：new Map([Iterable])、new WeakMap([Iterable])、new Set([iterable])、new WeakSet([iterable])

   * 一些方法的调用：Promise.all(iterable)、Promise.all(iterable)、Array.from(iterable)

   * 注意：正对于对象展开和解构进行了特殊处理，而非迭代器

     ```js
     const obj = { name: 'wall', age: 19 }
     const { name, age } = { ...obj }
     ```

7. 封装一个可迭代对象类

   ```js
   // 创建一个类，该类创建出来的对象都是可迭代对象
   class Room {
       constructor(name, address, stu) {
           this.name = name
           this.address = address
           this.stu = stu
       }
   
       entry(stu) {
           if (!stu) return 
           this.stu.push(stu)
       }
   
       [Symbol.iterator]() {
           let index = 0
           return {
               next: () => {
                   if (index < this.stu.length) {
                       return { done: false, value: this.stu[index ++] }
                   } else {
                       return { done: true, value: undefined }
                   }
               },
               return: () => {
                   return { done: true, value: undefined }
               }
           }
       }
   }
   
   const room = new Room('A room', '301', ['wall'])
   room.entry('zz')
   
   for (const stu of room) {
       // 终端迭代器
       if (stu === 'zz') {
           break
       }
       console.log(stu) // wall
   }
   ```

8. 迭代器的中断：迭代器在某些情况下会在没有完全迭代的情况下中断

   * 比如遍历过程中通过break、continue、return、throw中断了循环
   * 比如在解构时，没有解构所有的值

## 生成器 generator

1. 概念：生成器时es6中新增的一种函数控制和使用方案，它可以让我们更加灵活的控制函数什么时候能继续执行、暂停执行等

2. 生成器函数

   * 首先生成器函数需要在function的后面加一个符号*
   * 其次生成器函数可以通过yield关键字来控制函数的执行流程
   * 最后生成器函数的返回值是一个Generator（生成器）
   * 生成器其实是一种特殊的迭代器

3. 生成器函数实现

   ```js
   // 生成器
   // 该函数返回一个生成器（一个特殊的迭代器），调用一次next方法，执行到yield暂停，yield后面跟每次next返回对象的value值
   // 下一次next方法的参数会作为上一次yield的返回值
   function* foo(i) {
       console.log('foo is running')
   
       const value1 = i
       console.log(value1)
       const n = yield value1
   
       const value2 = n
       console.log(value2)
       const m = yield value2
   
       const value3 = m
       console.log(value3)
       yield value3
   
       console.log('foo is end')
       return 'over'
   }
   
   const generatorFoo = foo('one')
   console.log('return 1', generatorFoo.next())
   // foo is running
   // one
   // return 1 { value: one, done: false }
   
   console.log('return 2', generatorFoo.next('two'))
   // return 1 { value: two, done: false }
   // two
   
   
   console.log('return 3', generatorFoo.next('three')) 
   // three
   // return 3 { value: three, done: false }
   
   console.log('return 4', generatorFoo.next())
   // foo is end
   // return 4 { value: over, done: true }
   ```

4. 生成器函数return和throw

   ```js
   function* generator(n) {
       console.log(n)
       const m = yield n
   
       console.log(m)
       const k = yield m
   
       console.log(k)
       const v = yield k
   
       return 'over'
   }
   
   const fn = generator(1)
   
   console.log(fn.next())
   console.log(fn.return(2))
   // 相当于在第一段代码后面加上了return，会提前终止生成器函数代码继续执行
   // console.log(fn.throw(2))
   // 第二段代码会抛出异常，可捕获
   console.log(fn.next(3))
   console.log(fn.next())
   /** 
    *  1
       { value: 1, done: false }
       { value: 2, done: true }
       { value: undefined, done: true }
       { value: undefined, done: true }
    */
   ```

5. 生成器替代迭代器函数

   ```js
   // 生成器替代迭代器
   function* createArrayIterator(arr) {
       // 写法一
       // for (const i of arr) {
       //     yield i
       // }
   
       // 写法二：yield* 后面跟可迭代对象
       yield* arr
   }
   
   const names = ['wall', 'zz', 'kobe']
   const namesIterator = createArrayIterator(names)
   console.log(namesIterator.next())
   console.log(namesIterator.next())
   console.log(namesIterator.next())
   console.log(namesIterator.next())
   /**
    *  { value: 'wall', done: false }
       { value: 'zz', done: false }
       { value: 'kobe', done: false }
       { value: undefined, done: true }
    */
   
   // 创建一个函数，这个函数可以迭代一个范围内的数字
   function* createRangesIterator(start, end) {
       let index = start
       while (index < end) {
           yield index++
       }
   }
   
   const ranges = createRangesIterator(10, 15)
   for (let i = 0; i < 5; i ++) {
       console.log(ranges.next())
   }
   /**
    *  { value: 10, done: false }
       { value: 11, done: false }
       { value: 12, done: false }
       { value: 13, done: false }
       { value: 14, done: false }
    */
   
   // class案例
   class Room {
       constructor(name, address, rooms) {
           this.name = name
           this.address = address
           this.rooms = rooms
       }
   
       entry(room) {
           this.rooms.push(room)
       }
   
       *[Symbol.iterator]() {
           yield* this.rooms
       }
       // 相当于
       // [Symbol.iterator]() {
       //     const _this = this
       //     let index = 0
       //     return {
       //         next() {
       //             if (index < _this.rooms.length) {
       //                 return { done: false, value: _this.rooms[index++] }
       //             } else {
       //                 return { done: true, value: undefined }
       //             }
       //         }
       //     }
       // }
   }
   
   const room = new Room('A', '201', ['wall', 'zz'])
   room.entry('kobe')
   
   for (const r of room) {
       console.log(r) // wall, zz, kobe
   }
   ```

6. 
