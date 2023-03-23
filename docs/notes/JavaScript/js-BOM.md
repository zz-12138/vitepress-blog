## jsBOM浏览器对象模型

1. ​	window对象

   | 方法或属性                 | 描述           | 返回值 |
   | -------------------------- | -------------- | ------ |
   | open(url,  target, params) | 打开窗口       |        |
   | close()                    | 关闭本页面     |        |
   | location                   | 当前页面的属性 |        |
   | navigator                  | 获取客户端信息 |        |

2. location对象

   | 方法或属性            | 描述                   | 返回值 |
   | --------------------- | ---------------------- | ------ |
   | location.assign(url)  | 跳转新页面             |        |
   | location.replace(url) | 替换当前页面，不能回退 |        |
   | location.reload()     | 重载当前页面           |        |
   | location.href = url   | 跳转新页面             |        |

3. navigator对象

   | 方法或属性          | 描述                                                     | 返回值 |
   | ------------------- | -------------------------------------------------------- | ------ |
   | navigator.userAgent | 用户浏览器信息，可以用来获取用户设备信息，完成响应式页面 |        |

4. frame对象

   | 方法或属性                           | 描述                                  | 返回值 |
   | ------------------------------------ | ------------------------------------- | ------ |
   | <iframe></iframe>                    | 属性：src height width name scrolling |        |
   | window.frame['name']                 | 获取iframe                            |        |
   | window.frame['name'].contentWindow   | 获取iframe的window                    |        |
   | window.frame['name'].contentDocument | 获取iframe的document                  |        |

5. 本地储存对象（适用于搜索记录）

   | 方法或属性                             | 描述                                                   | 返回值 |
   | -------------------------------------- | ------------------------------------------------------ | ------ |
   | localStorage                           | 可以永久存放到本地，但只要清除浏览器的缓存，即删除数据 |        |
   | sessionStorage                         | 本地储存的数据页面关闭就会清除掉                       |        |
   | localStorage.value                     | 存数据                                                 |        |
   | localStorage.setItem('index', 'value') | 存数据                                                 |        |
   | localStorage.removeItem('author')      | 清除一条数据                                           |        |
   | localStorage.clear()                   | 清楚所有数据                                           |        |

6. 媒体

   * audio标签

     | 属性                                     | 方法         | 事件                    |
     | ---------------------------------------- | ------------ | ----------------------- |
     | currentSrc controls  地址 是否显示控制器 | play() 播放  | onpause 暂停事件        |
     | muted 静音                               | pause() 暂停 | onplay 播放事件         |
     | volume  音量                             |              | onplaying 正在播放事件  |
     | currentTime 当前播放时间节点             |              | onvolumechange 音量事件 |

7. ajax

   * 定义：通过在后台和服务器进行少量数据交换，ajax可以实现网页异步更新，意味着在不重新加载网页的情况下，对网页进行局部更新

   * ```js
     //1.创建xhr对象
     const xhr = new XMLHttpRequest()
     //2.设置请求路径和方法
     xhr.open('GET', url)
     //3.发送请求
     shr.send('username=admin&password=123456')  
     //4.监听后台是否返回数据
     xhr.onreadystatechange = () => {
         if(xhr.status==200&&xhr.readyState==4) {
             //请求成功
             console.log(xhr)
             console.log(xhr.status)
             console.log(xhr.readyState)
             //处理数据
             const res = xhr.response
             const hdiv = document.createElement('div')
             hdiv,innerHtml = res
             document.body.appendChild(hdiv)
         }
     }
     ```
     
   
8. 移动端触摸事件

   | 事件名       | 描述     |      |
   | ------------ | -------- | ---- |
   | ontouchstart | 触摸开始 |      |
   | ontouchmove  | 触摸移动 |      |
   | ontouchend   | 触摸结束 |      |

9. offest、scroll

   | 属性           | 描述                                                         | 返回值                                                       |
   | -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
   | offsetLeft     | 返回距离上级盒子（带定位）边缘至左边框的距离， 如父元素无定位则以浏览器为准 | 父元素内边距+子元素外边距                                    |
   | offsetTop      | 返回距离上级盒子（带定位）边缘至上边框的距离， 如父元素无定位则以浏览器为准 | 父元素内边距+子元素外边距                                    |
   | offsetParent   | 检测所有父元素中带有定位的节点                               | 无定位返回body，有定位返回定位父元素节点                     |
   | scrollWidth    |                                                              | padding + width                                              |
   | scrollHeight   | 如果文字超出了盒子，scrollHeight为包含超出内容的高度         | padding + height                                             |
   | scrollTop      | 滚动的高度                                                   | 兼容写法：window.pageYOffset \|\| document.body.scorllTop \|\| document.documentElement.scrollTop |
   | scrollTo(x, y) | 滚动到固定位置                                               |                                                              |
   | scrollBy(x, y) | 滚动到相对于当前位置的y值                                    |                                                              |
   
10. try...catch..throw

    ```js
    try {
        //运行代码
        let err = new Error('自定义抛出的错误，也会被catch捕获')
        err.type = 'TYPE_ERROR'
        throw err  //中断后面代码的执行
    } catch(err) {
        //处理错误
    } finally {
        console.log('不论是否有错误都会运行')
    }
    ```

11. xml

    * XML被设计为传输和储存数据，其焦点是数据的内容
    * HTML被设计用来显示数据，其焦点是数据的外观
    * new DOMParser().parseFromString(str, 'text/xml') 解析后端响应的xml格式数据
    
12. svg

    * svg标签：

      ```html
      <svg width="100" height="100" viewBox="x y wdith height">
          <circle id="mycircle" cx="圆心x" cy="圆心y" r="50" fill="填充颜色" stroke="描边"></circle>
          <line x1="x1坐标" y1="y1坐标" x2="x2坐标" y2="y2坐标" style="stroke: red; stroke-width：5px"></line>
          <polyline points="坐标1 坐标2 坐标3" >折线</polyline>
          <rect x="中心x" y="中心y" width="宽" height="高">矩形</rect>
          <ellipse cx="圆心x" cy="圆心y" rx="圆心到x距离"	ry="圆心到y距离">椭圆</ellipse>
          <polygon points="坐标1 坐标2 坐标3">多边形</polygon>
          <path M 18,3 L 20,20 Z id="myPath">绘制路径</path> M 移动到， L 画直线到， Z 闭合路径
          <use href="#myPath" fill="orange">复制图形</use>
          <g id="mySvg">
          将多个形状组成一个组
          	<ellipse cx="圆心x" cy="圆心y" rx="圆心到x距离"	ry="圆心到y距离">椭圆</ellipse>
      	<polygon points="坐标1 坐标2 坐标3">多边形</polygon>
          </g>
          <defs>
              内部代码不会显示，仅供引用
              <g id="mySvg">
                  将多个形状组成一个组
                  <ellipse cx="圆心x" cy="圆心y" rx="圆心到x距离"	ry="圆心到y距离">椭圆</ellipse>
              <polygon points="坐标1 坐标2 坐标3">多边形</polygon>
              </g>
          </defs>
      </svg>
      ```
    
    * svg使用方式：
    
      ```html
      <img src="circle.svg" />
      <object id="object" data="circle.svg" type="image/svg+xml" />
      <embed id="embed" src="icon.svg" type="image/svg+xm" />
      <iframe id="iframe" src="icon.svg" />
      ```
    
13. canvas

    * <canvas>绘制图像的容器，通过getContext()返回一个对象，用于绘制图形

    * ```html
      <canvas width="500" height="500"></canvas>
      ```

      ### 颜色
      
      | 属性             | 描述                                 |
      | ---------------- | ------------------------------------ |
      | fillStyle        | 设置和返回填充绘画的颜色、渐变或模式 |
      | strokeStyle      | 设置和返回笔触的颜色、渐变或模式     |
      | shadowColor      | 设置和返回阴影的颜色                 |
| shadowBlur       | 设置和返回阴影的模糊级别             |
      | shadowOffsetX或Y | 设置和返回阴影与形状的水平、垂直距离 |
      
      ### 线条样式
      
      | 属性       | 描述                                   |
      | ---------- | -------------------------------------- |
      | lineCap    | 设置和返回线条结束断点的样式           |
      | lineJoin   | 设置和返回两点相交时，所创建的拐角类型 |
      | lineWidth  | 设置和返回当前线条宽度                 |
      | miterLimit | 设置和返回最大斜接长度                 |
      
      ### 矩形 
      
      | 方法         | 属性                     |
      | ------------ | ------------------------ |
      | rect()       | 创建矩形                 |
      | fillRect()   | 绘制被填充的矩形         |
      | strokeRect() | 绘制矩形（无填充）       |
      | clearRect()  | 在给定矩形内清除指定像素 |
      
      ### 路径 
      
      | 方法                                                       | 描述                                              |
      | ---------------------------------------------------------- | ------------------------------------------------- |
      | fill()                                                     | 填充当前绘图（路径）                              |
      | stroke()                                                   | 绘制已定义的路径                                  |
      | beginPath()                                                | 起始一条路径，或重置当前路径                      |
      | moveT(x, y)                                                | 把路径移动到画布中指定点，不创建线条              |
      | closePath()                                                | 创建从当前点回到起始点的路径                      |
      | lineTo(x, y)                                               | 创建到指定点的线条                                |
      | clip()                                                     | 从原始画布剪切任意形状和尺寸的区域                |
      | arc(x, y, r, 起始角度, 终止角度(2*Math.PI), true)、arcTo() | 创建弧线、创建两点至之间的弧线                    |
      | isPointinPath()                                            | 如果指定点位于当前路径中，返回true，否则返回false |
      
      ### 文本及图像
      
      | 方法或属性                              | 描述                                                    |
      | --------------------------------------- | ------------------------------------------------------- |
      | ctx.drawImage(src, x, y, width, height) | 在画布中添加图像、画布或视频                            |
      | ctx.fillText('zzz')                     | 在画布中添加文字                                        |
      | width、height                           | 返回imageData对象的宽度、高度                           |
      | data                                    | 返回一个对象，其包含指定的imageData对象的图像数据       |
      | createImageData()                       | 创建新的空白的imageData对象                             |
      | getImageData()                          | 返回ImageData()对象，该对象为画布上指定矩形复制像素数据 |
      | putImageData()                          | 把图像数据（从指定位置的ImageData对象上）放回画布上     |
      
      ### 合成
      
      | 属性                     | 描述                                 |
      | ------------------------ | ------------------------------------ |
      | globalAlpha              | 设置或返回绘图当前alpha或透明值      |
      | globalCompositeOperation | 设置或返回新图像如何绘制到已有图像中 |
      
      ```js
      //globalCompositeOperation用法
      context.globalCompositeOperation = 'source-over'
      //相关属性（第一个绘制的为目标图像，第二个绘制的为源图像）
      source-over: 在目标图上显示源图像
      source-atop：在目标顶部显示源图像，源图像位于目标图像之外部分不可见
      source-in：在目标图像之中显示源图像，只有在目标图像内部分才会显示，目标图像透明
      source-out：在目标图像之外显示源图像，只有在目标图像外部分才会显示，目标图像透明
      destination-over：在源图像上显示目标图像...
      ligther == xor ：源图像加目标图像（异或操作）
      ```
      
      ### 其他 
      
      | 方法      | 描述                           |
      | --------- | ------------------------------ |
      | save()    | 保留当前环境状态               |
      | restore() | 返回之前保存过的路径状态和属性 |
      
      

