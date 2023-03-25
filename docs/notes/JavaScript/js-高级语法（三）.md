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
           1 => 'ccc'
         } => 'c'
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

       