## js数组

1. 数组的增删：

   |      方法       | 说明                                            | 返回值           |
   | :-------------: | ----------------------------------------------- | ---------------- |
   |  push(arg...)   | 末尾添加一个或多个元素，修改原数组              | 返回新的数组长度 |
   |      pop()      | 删除数组最后一个元素，数组长度减1，修改原数组   | 返回删除元素的值 |
   | unshift(arg...) | 在数组头部添加一个或多个元素，修改原数组        | 返回新的数组长度 |
   |     shift()     | 删除数组头部第一个元素，数组长度减1，修改原数组 | 返回第一个元素值 |

2. 数组的排序：

   | 方法      | 说明                         | 返回值                 |
   | --------- | ---------------------------- | ---------------------- |
   | reverse() | 颠倒数组中元素的顺序，无参数 | 改变原数组，返回新数组 |
   | sort()    | 对数组元素进行排序           | 改变原数组，返回新数组 |

   ```js
   let arr = [1, 3, 5, 7]
   arr.sort((a, b) => {
       return b - a //降序
       //return a - b 升序
   })
   console.log(arr) //[7, 5, 3, 1]
   ```

3. 数组的索引方法：

   | 方法                              | 说明                                                 | 返回值                            |
   | --------------------------------- | ---------------------------------------------------- | --------------------------------- |
   | indexOf(value)                    | 数组中查找给定元素的第一个索引                       | 存在，返回索引index；不存在返回-1 |
   | lastIndexOf(value)                | 数组中查找给定元素的最后一个索引                     | 存在，返回索引index；不存在返回-1 |
   | find(callback(item, i, arr))      | 找到第一个满足条件的元素，找到后不再遍历             | 返回找到的元素值                  |
   | findIndex(callback(item, i, arr)) | 找到第一个满足条件的元素，返回其索引，找到后不再遍历 | 返回找到元素的索引                |
   
4. 数组转换为字符串：

   | 方法           | 说明                                     | 返回值                       |
   | -------------- | ---------------------------------------- | ---------------------------- |
   | toString()     | 将数组转化为字符串，逗号分隔每一项       | 不改变原数组，返回一个字符串 |
   | join('分隔符') | 将数组转化为字符串，并用所传入分隔符连接 | 不改变原数组，返回一个字符串 |

5. 数组的截取或连接：

   | 方法     | 说明                                   | 返回值                           |
   | -------- | -------------------------------------- | -------------------------------- |
   | concat() | 连接两个或多个数组                     | 返回一个新数组，不改变原数组     |
   | slice()  | 数组截取：slice(begin, end)            | 返回被截取的新数组，不改变原数组 |
   | splice() | 数组修改：splice(begin, del, addvalue) | 返回被修改的新数组，会改变原数组 |

6. 数组的遍历：

   | 方法                                  | 说明                                                   | 返回值                              |
   | ------------------------------------- | ------------------------------------------------------ | ----------------------------------- |
   | for循环                               | ...                                                    |                                     |
   | forEach(callback(item, i, arr))       | 封装了for循环的数组原型对象方法                        | 无返回值（undefined），会改变原数组 |
   | map(callback(item, i, arr))           | 对数组的每一项进行加工，组成新数组                     | 返回新数组，不会改变原数组          |
   | filter(callback(item, i, arr))        | 对数组每一项进行过滤，返回为true元素组成的新数组       | 返回新数组，不会改变原数组          |
   | every(callback(item, i, arr))         | 对数组每一项进行遍历，全部满足条件返回true并组成新数组 | 返回新数组，不会改变原数组          |
   | reduce(callback(pre, cur, i, arr), 0) | 对数组每一个内容进行遍历，并最终输出一个结果时         | 返回新数组，不会改变原数组          |

   ```js
   //forEach原理
   const arr = [0, 1, 2, 3]
   arr.__proto__.myforEach = function(callback){
       for(let i = 0; i < this.length; i++){
           callback(this[i], i, this)
       }
   }
   arr.myforEach((item, index) => {
       console.log(`{item: ${item}, index: ${index}}`)
   })
   //{item: 0, index: 0}
   //{item: 1, index: 1}
   //{item: 2, index: 2}
   //{item: 3, index: 3}
   ```

   ```js
   //map原理
   const arr = [0, 1, 2, 3]
   arr.__proto__.mymap = function(callback){
       let newArr = []
       for(let i = 0; i < this.length; i++){
           newArr[i] = callback(this[i], i, this)
       }
       return newArr
   }
   let zz = arr.mymap((item, index) => {
       return item*3
   })
   console.log(zz) //[0, 3, 6, 9]
   ```

   ```js
   //filter原理
   const arr = [0, 1, 2, 3]
   arr.__proto__.myfliter = function(callback){
       let newArr = []
       for(let i = 0; i < this.length; i++){
           callback(this[i], i, this) ? newArr.push(this[i])  : ''
       }
       return newArr
   }
   let zz = arr.myfliter((item, index) => {
       if(item > 1) { return true }
   })
   console.log(zz) //[2, 3]
   ```

7. 数组的其他方法：

   | 方法              | 说明                                       | 返回值      |
   | ----------------- | ------------------------------------------ | ----------- |
   | isArray()         | Array.isArray(arr)判断被检测的值是否为数组 | true或flase |
   | Array.from(value) | 将伪数组或可遍历对象转换为真数组           | 新数组      |

   