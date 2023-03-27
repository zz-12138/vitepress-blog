---
outline: deep
---

# js-高级语法（三）

## Set、Map的基本使用

1. 在es6之前，我们存储数据结构主要有两种：数组、对象

2. es6中新增了两种数据结构：Set、Map（WeakSet、WeakMap）

   * Set：类似于数组，用来保存数据结构，但和数组的区别是**元素不能重复**

     * Set暂时没有字面量创建方式，只能通过构造函数创建

     * `const set = new Set(1, 2, 2, 3)`

       ```js
       // Set
       
       // 1.传入一个迭代器
       const arr = [1, 2, 2, 3, 3, 4, 5]
       const set = new Set(arr) // 数组去重
       const newArr1 = [...set] // Set支持展开运算符
       const newArr2 = Array.from(set) 
       
       // 2.通过add方法添加元素
       set.add(1)
       set.add(6)
       set.add({})
       console.log(set) // Set(7) { 1, 2, 3, 4, 5, 6, {} }
       console.log(newArr1, newArr2) // [ 1, 2, 3, 4, 5 ] [ 1, 2, 3, 4, 5 ]
       
       // 3.查看个数
       console.log(set.size) // 7
       
       // 4.删除元素
       set.delete(1)
       console.log(set) //Set(6) { 2, 3, 4, 5, 6, {} }
       
       // 5.判断是否包含某个元素
       const isHasValue = set.has(2)
       console.log(isHasValue) //true
       
       // 6.清除所有元素
       // set.clear()
       console.log(set) //Set(0) {}
       
       // 7.对set进行遍历
       set.forEach(i => {
           console.log(i) // 2, 3, 4, 5, 6, {}
       })
       
       for (let i of set) {
           console.log(i) // 2, 3, 4, 5, 6, {}
       }
       ```

   * WeakSet：同Set一样内部元素不能重复，但有区别

     * 区别一：WeakSet只能存放对象类型，不能存放基本数据类型

     * 区别二：WeakSet对元素的引用是弱引用，如果没有其他引用对某个对象进行引用，那么GC可将该对象回收

     * 区别三：WeakSet不能遍历和获取，因为WeakSet是弱引用，如果遍历到其中元素，那可能造成对象不能正常销毁

       ```js
       // WeakSet
       
       const obj = { name: 'wall' }
       
       const newSet = new Set()
       newSet.add(obj) // 对对象建立强引用
       
       const weak = new WeakSet()
       weak.add(obj) // 对对象建立弱引用，如果对象没有被其他变量引用，则该引用断开，对象被销毁
       
       console.log(newSet, weak) // Set(1) { { name: 'wall' } } WeakSet { <items unknown> }
       
       // WeakSet应用场景
       
       const weakset = new WeakSet()
       class Person {
           constructor(name) {
               weakset.add(this)
               this.name = name
           }
       
           running() {
               if (!weakset.has(this)) {
                   throw new Error('不能通过其他对象调用running方法')
               }
               console.log(this.name + ' running')
           }
       }
       
       const p1 = new Person('wall')
       const p2 = { name: 'zz' }
       p1.running() // wall running
       p1.running.call(p2) // Error: 不能通过其他对象调用running方法
       ```

   * Map：用于存储映射关系

     * 和对象的区别：对象只能用字符串和Symbol作为属性名，其他数据类型也会隐式转换为字符串

       ```js
       const obj1 = { name: 'obj1' }
       const obj2 = { name: 'obj2' }
       
       const obj3 = { 
           [obj1]: 'aaa',
           [obj2]: 'bbb'
       }
       
       console.log(obj3) //{ '[object Object]': 'bbb' }， 对象会被转化为[object Object]字符串类型
       ```

     * Map的使用

       ```js
       // Map
       
       // 1. 任意数据类型（包括对象）可以作为key
       const map1 = new Map()
       map1.set(obj1, 'aaa')
       map1.set(obj2, 'bbb')
       map1.set(1, 'ccc')
       console.log(map1) // Map(2) { { name: 'obj1' } => 'aaa', { name: 'obj2' } => 'bbb', 1 => 'ccc' }
       
       // 2.Map构造函数创建方式，传入一个entries
       const map2 = new Map([['a', 1], [2, 'b'], [map1, 'c']])
       console.log(map2)
       /**
        * Map(3) {
         'a' => 1,
          2 => 'b',
         Map(3) {
         	{ name: 'obj1' } => 'aaa',
           { name: 'obj2' } => 'bbb',
           1 => 'ccc'} 
           => 'c'
         }
        */
       
       // 3.get(key)、has(key)、delete(key)、clear()等方法
       console.log(map2.get(map1)) // c
       console.log(map2.has(map1)) // true
       map2.delete(map1)
       console.log(map2) // Map(2) { 'a' => 1, 2 => 'b' }
       map2.clear()
       console.log(map2) // Map(0) {}
       
       // 4.遍历Map
       map1.forEach((item, idx) => {
           console.log(item, idx)
           /**
            * aaa { name: 'obj1' }
              bbb { name: 'obj2' }
              ccc 1
            */
       })
       
       for (const [key, value] of map1) {
           console.log({ key, value })
           /**
            * { key: { name: 'obj1' }, value: 'aaa' }
              { key: { name: 'obj2' }, value: 'bbb' }
              { key: 1, value: 'ccc' }
            */
       }
       ```

   * WeakMap：和Map一样存储映射关系，但有区别

     * 区别一：WeakMap只能使用对象类型作为key

     * 区别二：WeakMap对对象的引用时弱引用，如果没有其他引用指向该对象，则GC会回收该对象

     * 区别三：不能遍历

       ```js
       // WeakMap
       
       const obj4 = { name: 'wall' }
       
       const map3 = new Map([[obj4, 1]]) // Map(1) { { name: 'wall' } => 1 }, 强引用 
       const weakmap = new WeakMap([[obj4, 2]]) // WeakMap { <items unknown> }, 弱引用
       
       console.log(map3, weakmap)
       
       // 1.常见方法get(key), has(key), detele(key)
       console.log(weakmap.get(obj4)) //2
       console.log(weakmap.has(obj4)) //true
       weakmap.delete(obj4)
       console.log(weakmap.has(obj4)) //false
       
       
       // 2.应用场景: Vue3响应式原理（后边实现）
       ```


## es7 新增

1. `Array includes`：判断数组中是否存在某个元素

   ```js
   const arr = [1, 2, 3, 4, 5, NaN]
   
   console.log(arr.includes(NaN)) //true
   console.log(arr.indexOf(NaN) !== -1) //false, indexOf无法判断数组中NaN
   ```

2. `**`：指数运算符

   ```js
   const res1 = Math.pow(3, 3) //9
   const res2 = 3 ** 3 //9
   ```

## es8 新增

1. `Object.values()`：获取一个对象所有value

   ```js
   const obj = {
       name: 'wall',
       age: 18
   }
   
   console.log(Object.values(obj)) // [ 'wall', 18 ]
   console.log(Object.values([1, 2, 3, 4, 5])) // [ 1, 2, 3, 4, 5 ]
   console.log(Object.values('12345')) // [ '1', '2', '3', '4', '5' ]
   ```

2. `Object.entries()`：获取一个数组，数组中存放着可枚举属性的键值对数组

   ```js
   const obj1 = {
       name: 'wall',
       age: 18
   }
   
   console.log(Object.entries(obj1)) // [ [ 'name', 'wall' ], [ 'age', 18 ] ]
   ```

3. `padStart padEnd`：字符串首尾添加内容

   ```js
   const str = 'hello world'
   console.log(str.padStart(15, '*').padEnd(19, '*')) // ****hello world****
   
   // 案例: 隐藏手机号前7位
   const phoneNum = '18379238027'
   const lastNum = phoneNum.slice(-4)
   const newPhoneNum = lastNum.padStart(11, '*')
   console.log(newPhoneNum) // *******8027
   ```

## es10 新增

1. `flat() 数组扁平化`：方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到子数组中的元素合并为一个新数组

   ```js
   const arr1 = [1, 2, [3, 4], [[5, 6], [7, 8]]]
   
   console.log(arr1.flat(1)) // [ 1, 2, 3, 4, [ 5, 6 ], [ 7, 8 ] ], 一次降维
   console.log(arr1.flat(2)) //[1, 2, 3, 4,5, 6, 7, 8], 二次降维
   ```

2. `flatMap(callback) 数组映射扁平化`： 先映射每一个元素，然后将结果压缩成一个新数组，即先map再flat

   ```js
   const arr2 = ['hello world', 'hello coder', 'hello wall']
   
   const newArr1 = arr2.flatMap(i => {
       return i.split(' ')
   })
   // 等价于
   const newArr2 = arr2.map(i => i.split(' ')).flat(1)
   
   console.log(newArr1, newArr2)
   /**
    * [ 'hello', 'world', 'hello', 'coder', 'hello', 'wall' ] 
    * [ 'hello', 'world', 'hello', 'coder', 'hello', 'wall' ]
    */
   ```

3. `Object.fromEntries()`：将entries转换为对象

   ```js
   const queryString = 'name=wall&id=114514'
   const queryParams = new URLSearchParams(queryString) // URLSearchParams { 'name' => 'wall', 'id' => '114514' }
   const queryObj = Object.fromEntries(queryParams)
   const obj4 = { name: 'wall', id: 18 }
   const res = Object.fromEntries(Object.entries(obj4))
   console.log(queryObj) // { name: 'wall', id: '114514' }
   console.log(res) // { name: 'wall', id: 18 }
   ```

4. `trim trimStart trimEnd`：去除首尾空格

## es 11 新增

1. `bigInt`：大数字数据类型，数字后面+n

   ```js
   const bigNum = Number.MAX_SAFE_INTEGER
   const newNum = bigNum + 10 //不能相加
   const newBigNum = bigNum + 10n //可以相加
   ```

2. `??`：空值合并运算符

   ```js
   const bol = '' || 0
   const isRight = bol ?? 'default value' // 只有当bol为undefined和null时，才会取右边值
   console.log(isRight) // default value
   ```

3. `globalThis`：不同环境下的全局对象，浏览器是window，node是this

   ```js
   console.log(globalThis) // node: global
   console.log(globalThis) // 浏览器: window
   ```

4. `for...in`：遍历对象中的key

   ```js
   const obj = {
       name: 'wall',
       age: 3600
   }
   
   for (const key in obj) {
       console.log(i) //name, age
   }
   ```

## es12 新增

1. `FinalizationRegistry 类` ：监听对象内存是否被销毁

   ```js
   const obj = { name: 'wall', age: 18 }
   const finalRegister = new FinalizationRegister((value) => console.log(`注册的对象${value}内存被销毁`))
   finalRegister.register(obj, 'obj') // 注册一个对象
   obj = null
   ```

2. `WeakRef 类 `：创建弱引用对象

   ```js
   const obj = { name: 'wall', age: 18 }
   const weakObj = new WeakRef(obj)
   const isDistory = weakObj.deref().name // 如果没有被销毁返回原对象，如果被销毁返回undefined
   ```

## Proxy Reflect

1.传统监听对象操作

* 使用对象属性描述符`Object.defineProperty(obj, key, {})`

* 该描述符被设计的初衷并不是为了监听对象操作，只是为了定义属性

* 新增属性、删除属性等操作，该方法没办法监听

  ```js
  // 1.通过对象属性描述符
  const obj = { name: 'wall', age: 18 }
  Object.keys(obj).forEach(key => {
      let value = obj[key]
      Object.defineProperty(obj, key, {
          get() {
              return value //此处不能直接返回对象的属性obj[key]，循环调用
          },
          set(newValue) {
              value = newValue
          }
      })
  })
  
  obj.name = 'zz'
  obj.age = 20
  
  console.log(obj) //{ name: [Getter/Setter], age: [Getter/Setter] }
  console.log(obj.name, obj.age) //zz 20
  ```

2.通过Proxy类创建代理对象，通过代理对象监听对象所有操作

* 先创建一个代理对象，之后对该原对象的操作都由代理对象完成，代理对象可以监听我们想要对原对象的操作

  ```js
  // 2.通过代理对象
  const obj2 = { name: 'wall', age: 20 }
  const proxyObj2 = new Proxy(obj2, {
      // get捕获器
      get(target, key) {
          // target: 正在被代理的原始对象
          console.log(target, key) // { name: 'wall', age: 30 } name
          return target[key]
      },
      // set捕获器
      set(target, key, newValue) {
          target[key] = newValue
          console.log(target, key, newValue) // { name: 'wall', age: 30 } age 30
      },
      // in捕获器
      has(target, key) {
          console.log(`监听到${key}属性in操作`) // 监听到name属性in操作
          return key in target
      },
      // delete捕获器
      deleteProperty(target, key) {
          delete target[key]
          console.log(`监听到${key}属性被删除`) // 监听到age属性被删除
      }
  })
  
  proxyObj2.age = 30
  proxyObj2.name
  
  if ('name' in proxyObj2) {
      console.log('存在name属性') // 存在name属性
  }
  
  delete proxyObj2.age
  
  console.log(obj2, proxyObj2) //{ name: 'wall' } { name: 'wall' }
  ```

  



