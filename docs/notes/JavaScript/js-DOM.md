---
outline: deep
---

# DOM文档对象模型

## dom的作用

1. 找元素节点对象
2. 设置元素的属性
3. 设置元素的样式
4. 动态创建和删除元素
5. 事件的触发和响应：事件源、事件、事件驱动程序（传入事件对象event）
6. 注意渲染dom的函数和其他函数解耦，将要渲染的dom拼入数组
   
## 查找dom元素节点的方法

| 方法                               | 描述                     | 返回值                 |
| ---------------------------------- | ------------------------ | ---------------------- |
| getElementsByTagName('div')        | 查找所有该标签节点对象   | 所有找到的节点对象集合 |
| getElementById('#id')              | 查找此id的节点对象       | 此id节点对象           |
| getElementsByClassName('.class')   | 查找所有该类名的节点对象 | 所有找到的节点对象集合 |
| querySelector('id, class, div')    | 具备以上所有功能         | 返回找到的第一个对象   |
| querySelectorAll('id, class, div') | 具备以上所有功能         | 返回找到的所有对象     |

## 创建、插入、删除dom元素节点的方法

| 方法                                                         | 描述                     | 返回值 |
| ------------------------------------------------------------ | ------------------------ | ------ |
| document.createElement('div')                                | 创建一个元素节点         |        |
| createElement('div').innerHTML = '<p>xx</p>'                 | 设置元素的内容           |        |
| body.appendChild(createElement('div'))                       | 追加子元素节点           |        |
| body.insertBefore(createElement('div'), querySelector('id')) | 在某元素前面追加元素节点 |        |
| removeChild(createElement('div'))                            | 移除子元素               |        |

## dom元素节点属性的相关方法

| 方法                     | 描述           | 返回值 |
| ------------------------ | -------------- | ------ |
| getAttribute('id')       | 获取节点的属性 |        |
| setAttribute('id', '01') | 设置节点的属性 |        |
| removeAttribute('id'')   | 删除节点的属性 |        |

## dom元素节点的常用熟悉

| 属性名    | 描述                                        | 返回值 |
| --------- | ------------------------------------------- | ------ |
| innerHTML | 获取节点元素的所有子元素                    |        |
| innerText | 获取节点元素的文本内容                      |        |
| style     | 修改样式                                    |        |
| className | 修改类名                                    |        |
| classList | 通过add()、replace()、remove()修改className |        |

## 事件

| 事件名       | 描述             | 返回值 |
| ------------ | ---------------- | ------ |
| onclick      | 点击事件         |        |
| onkeydown    | 键盘按下事件     |        |
| onkeypress   | 键盘抬起事件     |        |
| onfocus      | 得到焦点         |        |
| onblur       | 失去焦点         |        |
| onchange     | 输入选项内容改变 |        |
| onmouseenter | 鼠标移入         |        |
| onmouseleave | 鼠标移出         |        |
| onmousemove  | 鼠标移动         |        |
   
## 事件监听

| 事件名                                       | 描述                      | 返回值 |
| -------------------------------------------- | ------------------------- | ------ |
| addElementListener('click', () => {}, false) | true表示捕获触发          |        |
|                                              | false表示冒泡触发（默认） |        |

   

   

   


