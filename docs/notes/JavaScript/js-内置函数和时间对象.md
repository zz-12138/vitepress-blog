---
outline: deep
---

# 内置函数和事件对象

## 间隔函数和延迟函数（事件队列最后执行）

   | 方法                                                         | 描述         | 返回值 |
   | ------------------------------------------------------------ | ------------ | ------ |
   | setTimeout(callback(arg), time, arg) //第三个参数给回调函数传参 | 延时函数     |        |
   | clearTimeout(fn)                                             | 取消延时函数 |        |
   | setInterval(callback(arg), time, arg) //第三个参数给回调函数传参 | 间隔函数     |        |
   | clearInterval(fn)                                            | 取消间隔函数 |        |

## 时间对象(Date)

   | 属性或方法          | 描述                       | 返回值 |
   | ------------------- | -------------------------- | ------ |
   | getTime()/setTime() | 时间戳（获取和设置，下同） |        |
   | getFullYear()       | 获取年份                   |        |
   | getMonth()  + 1     | 获取月份（从0开始计算）    |        |
   | getDate()           | 获取当天                   |        |
   | getDay()            | 获取周几                   |        |
   | getHours()          | 获取小时                   |        |
   | getMinutes()        | 获取分钟                   |        |
   | getSeconds()        | 获取秒                     |        |
