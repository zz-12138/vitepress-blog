## axios  

1. axios请求方法

   * get：获取数据
   * post：提交数据（表单提交/文件上传）
   * put：更新数据（将所有数据均推送到服务器
   * patch：更新数据（只将修改的数据推送到服务器）
   * delete：删除数据

2. 写法

   * ```js
     //get()
     //调用型
     axios.get('/data.json',{params: {id: 12}}).then(res => console.log(res))
     //函数型
     axios({method: 'get', url: '/data.json', params: {id: 12}}).then(res => console.log(res))
     ```

   * ```js
     //post(url, data, config)
     let data = {id: 2} //此时network请求头显示application/json: charset=utf-8
     //调用型
     axios.post('/post.html', data).then(res => console.log(res))
     //函数型
     axios({method: 'post', url: '/post.html', data: data}).then(res => console.log(res))
     ```

   * ```js
     //delete()
     //url删除法：network显示Query String Parameters
     axios.delete('/data.json', {params: {id: 2}}).then(res => console.log(res))
     //请求体删除法：network显示Request Payload
     axios.delete('/data.json', {data: {id: 2}}).then(res => console.log(res))
     ```

3. 并发请求：同时进行多个请求，并统一处理返回值

   * ```js
     function getUserAccount() {
         return axios.get('/user/11.html')
     }
     
     function getUserPermissions() {
         return axions.get('user/11/permission')
     }
     
     axios.all([getUserAccount(), getUserPermissions()]).then(axios.spread(acct, perms) => {
         //两个请求都返回后，acc是前者的返回值，perms是后者的返回值
     })
     ```

4. axios实例：当需要不同的后端域名，可以采用创建实例的方式相对应

   * ```js
     //1.全局配置
     axios.default.timeout = 3000
     //2.实例配置
     let instance = axios.create({
         baseUrl: 'http://localhost:13700', //请求的域名，基本地址
         timeout: 1000, //请求超时时长
         url: '/data.json', //请求路径
         method: 'get/post/delete/patch/put', //请求方法
         header: {
             token: '' //代表当前登陆人身份信息
         },
         params: {}, //将请求的参数拼接到url上
         data: {} //将请求的参数放在请求体中
     })
     //3.axios单独配置
     instance.get('/data.json', {timeout: 2000})
     //3 > 2 > 1
     ```

5. 拦截器

   * ```js
     //1.请求拦截器(通过拦截token，判断是用户还是游客)
     axios.interceptors.request.use(
     	config => {
             //发送请求前的操作
             return config
         },
         err => {
             //在请求时发生错误的操作
             return Promise.reject(err) //返回一个promise
         }
     )
     //2.响应拦截器
     let responseInterceptors = axios.interceptors.response.use(
     	res => {
             //请求成功对响应数据的处理
             return res
         },
         err => {
             //响应错误时的操作
             return Promise.reject(err)
         }
     )
     //3.取消拦截器
     axios.interceptors.request.eject(responseInterceptors)
     //tips：拦截器返回的err返回的promise都会进入catch中（axios.get('/data.json').then().catch(err => {})
     ```

6. 使用ts封装一个axios

   * ```typescript
     import type { AxiosRequestConfig, AxiosResponse } from 'axios'
     interface CMSRequestInterceptor<T = AxiosResponse> {
         //请求拦截类型
         requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
         requestInterceptorCatch?: (error: any) => any
         //响应拦截类型
         responseInterceptor?: (res: T) => T
         responseInterceptorCatch?: (error: any) => any
     }
     
     // 扩展拦截数据类型
     interface CMSRequestConfig<T = AxiosResponse>
         extends AxiosRequestConfig {
         interceptors?: CMSRequestInterceptor<T>
     }
     ```
   
   * ```typescript
     //封装一个axios类
     class CMSRequest {
         //定义axios实例
         instance: AxiosInstance 
     
         constructor(config: CMSRequestConfig) {
             this.instance = axios.create(config) //创建axios实例
        
            //实例拦截器
            this.instance.interceptors.request.use(
              config.interceptors?.requestInterceptor,
              config.interceptors?.requestInterceptorCatch
            )
            this.instance.interceptors.response.use(
              config.interceptors?.responseInterceptor,
              config.interceptors?.responseInterceptorCatch
            )
        
            //全局拦截器
            this.instance.interceptors.request.use(
              (config) => {
                console.log('all requests will be intercepted')
                return config
              },
              (err) => {
                console.log('all requests intercept error')
                return err
              }
            )
             
            this.instance.interceptors.response.use(
              (res) => {
                console.log('all responses will be intercepted')
                return res
              },
              (err) => {
                console.log('all responses intercept error')
                return err
              }
            )  
      	}
        
         request<T = any>(config: CMSRequestConfig<T>) {
             //请求方法的拦截器
             if (config.interceptors?.requestInterceptor) {
                 config = config.interceptors.requestInterceptor(config)
         }
     
         return new Promise<T>((resolve, reject) => {
             this.instance
                 .request<any, T>(config)
                 .then((res) => {
                 if (config.interceptors?.responseInterceptor) {
                     res = config.interceptors.responseInterceptor(res)
             	}
             	resolve(res)
             	})
                 .catch((err: any) => {
                 if (config.interceptors?.responseInterceptorCatch) {
                     err = config.interceptors.responseInterceptorCatch(err)
             	}
             	reject(err)
             	})
        		 })
       	}
        
          get<T = any>(config: CMSRequestConfig<T>) {
            return this.request<T>({ ...config, method: 'GET' })
          }
          post<T = any>(config: CMSRequestConfig<T>) {
            return this.request<T>({ ...config, method: 'POST' })
          }
     
          delete<T = any>(config: CMSRequestConfig<T>) {
            return this.request<T>({ ...config, method: 'DELETE' })
          }
     
          patch<T = any>(config: CMSRequestConfig<T>) {
            return this.request<T>({ ...config, method: 'PATCH' })
          }
     }
     ```
   
   * ```typescript
     const BASE_URL = 'http://152.136.185.210:5000'
     const TIME_OUT = 10000
        
     //创建一个cms系统请求实例
     const cmsRequest = new CMSRequest({
         baseURL: BASE_URL,
         timeout: TIME_OUT,
         interceptors: {
             requestInterceptor: (config) => {
                 // 携带token拦截
                 const token = localCache.getCache('token')
                 if (config && config.headers && token) {
                     config.headers.Authorization = `Bearer ${token}`
                 }
     
                 console.log('this instance request will be intercepted')
                 return config
             },
             requestInterceptorCatch: (err) => {
                 console.log('this instance request err intercept')
                 return err
             },
             responseInterceptor: (res) => {
                 console.log('this instance response will be intercepted')
                 return res.data
             },
             responseInterceptorCatch: (err) => {
                 console.log('this instance response err intercept')
                 return err
             }
         }
     })
     ```
   
   * ```typescript
     interface IloginResult {
         id: number
         name: string
         token: string
     }
     
     interface IDataType<T = any> {
         code: number
         data: T
     }
     
     enum LoginAPI {
         emailLoginRequest = '/login',
         userInfoRequest = '/users/',
         userMenusRequest = '/role/'
     }
     
     //登录请求
     export function emailLoginRequest(emailData: any) {
         return cmsRequest.post<IDataType<IloginResult>>({
             url: LoginAPI.emailLoginRequest,
             data: emailData
         })
     }
     
     //请求用户信息
     export function userInfoRequestById(id: number) {
         return cmsRequest.get<IDataType>({
             url: LoginAPI.userInfoRequest + id
         })
     }
     ```
   
     

 

   



