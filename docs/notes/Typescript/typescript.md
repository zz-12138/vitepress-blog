---
outline: deep
---

# TypeScript

## 变量的声明

1. string和String的区别
    * string: ts中的字符串类型
    * String: js中的字符串包装类的类型

2. 类型推导

    ```typescript
    let name = 'wall' //默认情况下进行赋值，会将值的类型作为标识符的类型
    // let/const 标识符: 数据类型（类型注解） = 赋值
    ```

## 通用类型

1. 基本类型
    * ts和js一样不区分整数（int）和浮点数（float）类型
    * 类型注解：默认情况下如果可以推导出对应标识符的类型时，一般情况是不加的（常量不加，变量加）

2. 数组类型
    * 常用类型注解`const arr: string[] = []`，推荐写法
    * 使用泛型类型注解`const arr: Array<string> = []`，不推荐容易和jsx语法起冲突

3. null和undefined
    * 一般都要加上类型注解`let n: null = null`
   
```typescript
/* 基本类型*/
let num: number = 100
let num2: number = 0b111  //二进制
let num3: number = 0o456  //八进制
let num4: number = 0X777  //十六进制
let n: null = null

//类型注解：默认情况下如果可以推导出对应标识符的类型时，一般情况是不加的（常量不加，变量加）
const name = 'wall' 
const isWall = false

console.log(num, num2, num3, num4, name, isWall, n)

/*引用类型*/
const arr1: string[] = ['wall', 'wall', 'wall']
const arr2: Array<number> = [1, 2, 3]

console.log(arr1, arr2)

/*symbol*/
const title1 = Symbol('wall')
const title2 = Symbol('wall')

const obj = {
    [title1]: 'wall',
    [title2]: 'zz'
}

console.log(obj)
```
   
## 特有类型

1. any和unknown类型都是用于描述类型不确定的对象

2. any
    * 当进行一些类型断言时，as any
    * 当不想给某些变量添加具体的类型注解时 `fn(value: any) {}`

3. unknow
    * unknown类型只能赋值给any和unknown类型
    * any类型可以赋值给任意类型

4. void
    * void通常用来指定一个函数是没有返回值的，那么他的返回值就是void
    * 可以将null和undefined作为void类型函数的返回值

5. never
    * never表示永远不会发生值的类型，比如一个函数是死循环或者抛出异常，可以用never类型

6. tuple
    * 元组类型用于表示多种类型元素的组合：`const info: [string, number, boolean] = ['wall', 18, 'true']`
     
```typescript
let msg: any = 'wall' //any类型
let msg2: unknown = 'zz' //unknown类型
msg = 12
msg = false
msg = msg2

//never应用场景，用于检测参数类型是否正确
function handleMessage(msg: string | number ) {
    switch (typeof msg) {
        case 'string':
            console.log('string handle')
            break;
        case 'number':
            console.log('number handle')
            break;
        default:
            const check: never = msg
    }
}

// tuple应用场景，用于接收不同类型的元素数组
function useState<T>(state: T) {
    let currentState = state
    const changeState = (newState: T) => {
        currentState = newState
    }

    const tuple: [T, (newState: T) => void] = [currentState, changeState]

    return tuple
}

const [counter, setCounter] = useState(10)
const [title, setTitle] = useState('wall')
```
   
## 参数类型

1. 函数的参数和返回值类型
    * 参数的类型：`function A(num: number, num2: number){}`
    * 返回值的类型：`function B(num: number): number {}`，返回值类型一般不写，会自动推导

2. 对象的类型
    * 对象类型及可选类型：`function C(point: {x: number, y: number, z?:number}) {}`

3. 联合类型
    * 联合类型可以由两个或多个其他类型组成，表示可以是这些类型中的任何一个值

4. 类型别名
    * 用于定义多个参数的类型：`type unionType = number | string | boolean`
     
```typescript
// 函数的参数和返回值类型
// 会自动推断返回值类型
function fn1(num: number, title: string) {
    console.log(num, title)
}
// 会自动推断参数类型
const arrOfFn: [string, string, number] = ['wall', 'zz', 99]
arrOfFn.forEach(item => {
    console.log(item) 
})
// 联合类型的使用
function D(value: number|string|boolean) {
    //参数要做范围缩小,边界判断
    if (value == 'string') {
        value.toLowerCase()
    } else if (value == 'number') {
        console.log(value)
    } else {
        console.log(value)
    }
}
D(18)
D('wall')
D(false)
```
   
## 类型断言as

1. 有些时候ts无法获取具体类型信息，这个时候我们需要类型断言
2. 将某些宽泛的类型转化为具体的类型

```typescript
// as：类型断言
// 1、将el对象断言为HTMLImageElement对象
const el = document.querySelector('#wall') as HTMLImageElement
el.src = 'https://wall.com'


class Person {

}

class Student extends Person {
    study() {

    }
}

function sayHello(p: Person) {
    // 2、通过类型断言将p类型断言为Student
    (p as Student).study()
}

const stu = new Student()
sayHello(stu)

// 3、将具体类型转换为不确定的类型再断言（不推荐使用）
const msg = 'wall'
const num: number = (msg as any) as number
```

3. 非空类型断言

```typescript
function printMsgLength(msg: string) {
    console.log(msg!.length)
    //等于
    // if (msg) {
    //     console.log(msg)
    // }
}

console.log('wall')
```

4. 可选链

```typescript
//可选链使用可选操作符?.
//作用是当对象属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行
type Person {
name: string
friend?: {
        name: string
        age?: number
    }
}

const info: Person = {
    name: 'why',
    friend: {
        name: 'wall'
    }
}

console.log(info.name)
console.log(info.friend?.name) //wall
console.log(info.friend?.age) //undefind
```

## 字面量类型

```typescript
//字面量类型的意义就是必须结合联合类型
type Alignment = 'left' | 'right' | 'center'
let align: Alignment = 'left'
align = 'right'
align = 'center'
```

## 字面量推理

```typescript
//如果传入的参数是对象字面量的属性值，需要将类型确定为字面量类型
type Method = 'GET' | 'POST'
function request(url: string, method: Method) {}
const options = {
    url: 'http://xxx.com',
    method: 'POST'
} as const ///断言为字面量类型
request(options.url, options.method)
```
     
## 类型缩小
1. typeof：类型判断
2. ===、==、!=、switch
3. Instanceof：判断实例是否属于某个类
4. in：判断属性是否属于某个实例

## 函数的类型

```typescript
//案例1：函数作为参数
function foo() {}
type FooType = () => {}
function bar(fn: FooType) {
    fn()
}
bar(foo) 

//案例2：函数表达式中使用
type fnType = (num1: number, num2: number) => number
const add: fnType = (a, b) => {
    return a + b
}

//案例3：
function calc(n1: number, n2: number, fn: fnType) {
    return fn(n1, n2)
}

const res1 = calc(2, 3, function(n1, n2) {
    return n1 + n2
})

const res2 = calc(2, 3, function(n1, n2) {
    return n1 * n2
})
```

## 函数的重载

```typescript
//函数的重载：名称相同，参数不同的几个函数，就是重载
function add(n1: number, n2: number): number 
function add(n1: string, n2: string): string
//函数的声明和实现分开
function add(n1: any, n2: any): any {
    return n1 + n2
}
add(1, 2)
add('a', 'b')

//tips:能使用联合类型实现的，优先使用联合类型
```

## 类的使用

```typescript
//在ts中属性必须定义，而js中可以不写动态添加
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    eating() {
        console.log(`${this.name} eating`)
    }
}

const person = new Person('wall', 18)
person.eating()

//类的继承
class Student extends Person {
    sid: number
    constructor(sid: number, name: string, age: number) {
        super(name, age)
        this.sid = sid
    }
    studying() {
        console.log(`${this.sid} studing`)
    }
}

const student = new Student(0, 'zz', 18)
student.studying()

//类的多态
class Animal {
    action() {
        console.log('animal action')
    }
}

class Dog extends Animal {
    action() {
        console.log('dog action')
    }
}

class Fish extends Animal {
    action() {
        console.log('fish action')
    }
}

//父类引用指向子类对象
//animal: fish/dog
function makeAction(animal: Animal[]) {
    animal.forEach(i => {
        i.action()
    })
}

makeAction([new Dog(), new Fish()])

//类成员的修饰符
class A {
    public sex: string //公有修饰符，默认
    private _name: string //私有修饰符，只能在类中访问，一般用类中方法来访问类中属性或方法
    protected age: number = 18 //仅在自身及子类中可见，受保护的属性或方法
    readonly friend?: A //只读修饰符，只能在构造函数中赋值，赋值后不可修改;属性本身不能修改，但是如果是对象类型，对象中的属性是可以修改的
    
    constructor(sex: string, name: string, friend?: A) {
        this.sex = sex
        this._name = name
        this.friend = friend
    }
    
    //getter访问器
    get name() {
        return this._name
    }

    //setter访问器
    set name(newName: string) {
        this._name = newName
    } 
}

class B extends A {
    getFarAge() {
        return this.age
    }
}

const a = new A('man', 'wall', new A('wuman', 'mm'))
const b = new B('women', 'zz')
// a.friend = new A('man')  不可以直接修改
if (a.friend) {
    a.friend.sex = 'man'
}
a.name = 'xiaomin'
console.log(a.name)
console.log(b.getFarAge())

//类的静态成员（类成员）
class D {
    static time: string = '20:00'

    static go() {
        console.log('go to school')
    }
}

console.log(D.time, D.go())

//抽象类：父类定义抽象方法，子类实现
abstract class Sharp {
    abstract getArea(): number;
}

class Rectangle extends Sharp {
    private width: number
    private height: number

    constructor(width: number, height: number) {
        super()
        this.width = width
        this.height = height
    }

    getArea() {
        return this.width * this.height
    }
}

class Circle extends Sharp {
    private r: number

    constructor(r: number) {
        super()
        this.r = r
    }

    getArea() {
        return this.r **2 * 3.14
    }

}

function makeArea(sharp: Sharp) {
    return sharp.getArea()
}

const rec = new Rectangle(10, 20)
const circle = new Circle(5)

console.log(makeArea(rec))
console.log(makeArea(circle))

//tips：抽象类不能被实例化；抽象类的方法必须被子类实现，否则该子类也必须是一个抽象类

//类的类型
class F {
    name: string = 'wall'
}
const f1: F = {
    name: 'why'
}
```
     
## 接口Interface

```typescript
//另外一种用来声明对象类型的方式（类似type）
interface InfoType {
    readonly name: string //只读属性
    age: number
    friend?: string //可选类型
}

const p: InfoType = {
    name: 'wall',
    age: 18
}

//定义索引类型
interface ILanguageRank {
    [index: string]: number
}

const language: ILanguageRank = {
    'java': 3,
    'javascript': 1,
    'typescript': 2
}

//定义函数类型
interface ICalcFunc {
    (num1: number, num2: number): number
}

const add: ICalcFunc = (num1, num2) => num1 + num2
// type ICalcFunc = (num1: number, num2: number) => number  推荐使用函数类型别名来定义函数

//接口的继承，可以实现多继承
interface Person {
    name: string
    eating: () => void
}

interface Animal {
    running: () => void
}

interface Student extends Person, Animal {
    sno: string
}

const stu: Student = {
    name: 'wall',
    sno: '18',
    eating() {

    },
    running() {
        
    }
}

//接口的实现：所有实现了接口的类对应的对象，都是可以传入的
interface ISwim {
    swimming: () => void
}

interface IRun {
    running: () => void
}

class G implements ISwim, IRun {
    swimming() {

    }
    running() {

    }
}

function swim(swimmer: ISwim) {
    swimmer.swimming()
}

const g = new G()
swim(g)

//字面量赋值
interface Iinfo {
name: string
    age: number
}

const info = {
    name: 'wall'
    age: 18
    address: 'xxx'
}

const newInfo: Iinfo = info //当将某个对象的引用进行赋值时，ts会对该引用的对象属性进行擦除操作，使其符合类型检测
```

## interface和type的区别
1. 如果是定义非对象类型，通常推荐使用type：比如联合类型、function
2. interface可以重复对某个接口来定义属性和方法（会合并）
3. type定义的是别名，是不允许重复的

## 枚举类型：将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举

```typescript
enum Direction {
    LEFT,
    RIGHT,
    TOP,
    BOTTOM
}

function turnDirection(direction: Direction) {}
turnDirection(Direction.LEFT)
turnDirection(Direction.RIGHT)
turnDirection(Direction.TOP)
```

## **泛型（重点）**:通过函数来封装一些api，传入不同的参数，已完成不同的操作，**对于函数的参数的类型进行参数化**

```typescript
//泛型的使用
//类型的参数化：在定义函数时，先不决定这些参数的类型，而是让调用者以参数的形式告知此时参数是什么类型

function sum<T>(value: T) {
    return value
}

//调用方式一
console.log(sum<number>(18))
console.log(sum<{value: number}>({value: 20}))
console.log(sum<any[]>(['a', 'b', 'c', 'd', 'e']))

//调用方式二：类型推导,推导出的类型是字面量类型
console.log(sum(50))

//传入多个类型
function foo<T, E, O>(arg1: T, arg2: E, arg3: O, ...arg4: T[]) {}
foo<number, string, boolean>(10, 'abc', true, [1, 2, 3])

//泛型接口的使用
interface IPerson<T1, T2> {
    name: T1
    age: T2
}

const p: IPerson<string, number> = {
    //此处不能类型推导
    name: 'John',
    age: 13
}


//泛型类的使用
class Point<T> {
    x: T
    y: T
    z: T

    constructor(x: T, y: T, z: T) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

//会自动进行类型推导
const p1 = new Point('1', '2', '3')
const p2: Point<number> = new Point(1, 2, 3)


//泛型类型的约束
interface ILength {
    length: number
}


function getLength<T extends ILength>(value: T) {
    return value.length
}

getLength('wall')
getLength([1, 2, 2])
```

* ts模块化（不推荐）

```typescript
//模块化命名空间
export namespace time {
    export function format(time: string) {
        return time
    }

    export const name: string = 'wall'
}
```

* typescript如何查找类型声明（xx.d.ts）

* 内置类型声明

* 内置api，ts源码内部已经进行了类型声明

* 外部定义类型声明

* 通常使用一些库需要的类型声明：一般分为库内部自己定义和使用社区公有库

* 自己定义的类型声明

```typescript
declare module 'lodash' {
    export function join(arr: any[]): void
}
```