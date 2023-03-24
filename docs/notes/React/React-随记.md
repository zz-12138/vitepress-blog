## React随记

1. react/vue中的key有什么作用（key的内部原理是什么）

   * 简单的说：key是虚拟DOM对象的标识，在更新显示时key起着关键作用
   * 详细的说：当状态中的数据发生改变时，react会根据新的数据生成新的虚拟DOM，

   随后react进行新旧虚拟DOM的diff比较

   * 若找到了相同的key，则进行比较
   * 若未找到相同的key，则根据数据创建新的真实DOM，随后渲染到页面上

2. 用index作为key可能回引发的问题

   * 若对数据进行逆序添加、逆序删除邓破坏顺序的操作，会产生没有必要的真实DOM更新

   页面效果没问题，但效率低

   * 如果结构中包含输入类的DOM，会产生错误的真实DOM，页面出错
   * 如果不存在逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表，index作为key没有问题

3. 开发中如何选择key

   * 最好每条数据使用唯一的标识作为key，如id
   * 如果确定只是展示数据，用index也可以

4. 状态在哪里，操作状态的方法就在哪里。

5. 动态初始化列表时：

   * 某个组件使用时：放在自身state中
   * 某些组件使用时：放在他们共同的父类组件中（状态提升）

6. 父子组件通信：

   * 父==>子：通过props
   * 子==>父：父类给子类传一个回调函数，子类通过props调用传参

7. 注意defaultChecked和checked区别：前者只起一次作用，后者需配合onChange使用

8. 判断变量是否可以作为state的条件：

   * 变量如果是通过props从父组件中获取，就不是一个状态
   * 如果这个变量可以通过其他的状态state或者属性props通过数据处理得到，就不是一个状态
   * 如果变量在render中没有使用到，那就不是一个state
   * 变量在整个生命周期中都保持不变时，也不是一个状态

9. setState()是一个异步操作，不能立即被修改

   * ```js
     cliclChangeState() {
         this.setState({isActive: true})
         console.log(this.state.isActive) //false
     }
     //方法一,使用回调函数
     cliclChangeState() {
         this.setState({isActive: true},
         () => {console.log(this.state.isActive) //true
               })
     }
     //方法二，异步处理
     async clickChangeState() {
         await this.setState({isActive: true})
         console.log(this.state.isActive) //true
     }
     ```

10. setState更新状态的2种写法

	* ```
		(1). setState(stateChange, [callback])------对象式的setState
	   1.stateChange为状态改变对象(该对象可以体现出状态的更改)
	   2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
	   
	   (2). setState(updater, [callback])------函数式的setState
	   1.updater为返回stateChange对象的函数。
	   2.updater可以接收到state和props。
	   4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
	  
	  总结:
	  1.对象式的setState是函数式的setState的简写方式(语法糖)
	  2.使用原则：
	  (1).如果新状态不依赖于原状态 ===> 使用对象方式
	  (2).如果新状态依赖于原状态 ===> 使用函数方式
	  (3).如果需要在setState()执行后获取最新的状态数据, 
	  要在第二个callback函数中读取
	  ```

11. 路由组件的lazyLoad

	* ```js
		//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	   const Login = lazy(()=>import('@/pages/Login'))
	   
	   //2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	   <Suspense fallback={<h1>loading.....</h1>}>
			<Switch>
			   <Route path="/xxx" component={Xxxx}/>
				<Redirect to="/login"/>
			</Switch>
	   </Suspense>
	  ```

12. Hooks

	* React Hook/Hooks是什么?

	  * ```
		(1). Hook是React 16.8.0版本增加的新特性/新语法
		(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
		```

	* 三个常用的Hook

	  * ```
		(1). State Hook: React.useState()
		(2). Effect Hook: React.useEffect()
		(3). Ref Hook: React.useRef()
		```

	* State Hook

	  * ```
		(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
		(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
		(3). useState()说明:
				参数: 第一次初始化指定的值在内部作缓存
				返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
		(4). setXxx()2种写法:
				setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
				setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
		```

	* Effect Hook

	  * ```
		(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
		(2). React中的副作用操作:
				发ajax请求数据获取
				设置订阅 / 启动定时器
				手动更改真实DOM
		(3). 语法和说明: 
				useEffect(() => { 
				  // 在此可以执行任何带副作用操作
				  return () => { // 在组件卸载前执行
					// 在此做一些收尾工作, 比如清除定时器/取消订阅等
				  }
				}, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
			
		(4). 可以把 useEffect Hook 看做如下三个函数的组合
				componentDidMount()
				componentDidUpdate()
				componentWillUnmount() 
		```

	* Ref Hook

	  * ```
		(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
		(2). 语法: const refContainer = useRef()
		(3). 作用:保存标签对象,功能与React.createRef()一样
		```

13. Fragment

	* ```
	  //可以不用必须有一个真实的DOM根标签了
	  <Fragment><Fragment>
	  <></>
	  ```

14. Context

	* ```
	  //一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信
	  //注意：在应用开发中一般不用context, 一般都用它的封装react插件
	  1) 创建Context容器对象：
		const XxxContext = React.createContext()  
		
	  2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
		<xxxContext.Provider value={数据}>
			子组件
		  </xxxContext.Provider>
		  
	  3) 后代组件读取数据：
	  
		//第一种方式:仅适用于类组件 
		  static contextType = xxxContext  // 声明接收context
		  this.context // 读取context中的value数据
		  
		//第二种方式: 函数组件与类组件都可以
		  <xxxContext.Consumer>
			{
			  value => ( // value就是context中的value数据
				要显示的内容
			  )
			}
		  </xxxContext.Consumer>
	  ```

15. 组件优化

	* Component的2个问题 

	  * 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
	  * 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

	* 效率高的做法

	  * 只有当组件的state或props数据发生改变时才重新render()

	* 原因

	  * Component中的shouldComponentUpdate()总是返回true

	* 解决

	  * ```
		办法1: 
			重写shouldComponentUpdate()方法
			比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
		办法2:  
			使用PureComponent
			PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
			注意: 
				只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
				不要直接修改state数据, 而是要产生新数据
		项目中一般使用PureComponent来优化
		```

16. render props

	* 如何向组件内部动态传入带内容的结构(标签)?

	  ```
	  Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
	  React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性
	  ```

	* children props

	  ```
	  <A>
		<B>xxxx</B>
	  </A>
	  {this.props.children}
	  问题: 如果B组件需要A组件内的数据, ==> 做不到 
	  ```

	* render props

	  ```
	  <A render={(data) => <C data={data}></C>}></A>
	  A组件: {this.props.render(内部state数据)}
	  C组件: 读取A组件传入的数据显示 {this.props.data} 
	  ```

17. 错误边界

	* ```
	  //理解：错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面
	  //特点：只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误
	  //使用方式：getDerivedStateFromError配合componentDidCatch
	  // 生命周期函数，一旦后台组件报错，就会触发
	  static getDerivedStateFromError(error) {
		  console.log(error);
		  // 在render之前触发
		  // 返回新的state
		  return {
			  hasError: true,
		  };
	  }
	  
	  componentDidCatch(error, info) {
		  // 统计页面的错误。发送请求发送到后台去
		  console.log(error, info);
	  }
	  ```

18.  组件通信方式总结

* 组件间的关系

	* 父子组件
	* 兄弟组件（非嵌套组件）
	* 祖孙组件（跨级组件）
	
* 几种通信方式

  ```
	1.props：
		(1).children props
		(2).render props
	2.消息订阅-发布：
		pubs-sub、event等等
	3.集中式管理：
		redux、dva等等
	4.conText:
		生产者-消费者模式
  ```
	
* 比较好的搭配方式

  ```
	父子组件：props
	兄弟组件：消息订阅-发布、集中式管理
	祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)
  ```
    
      
