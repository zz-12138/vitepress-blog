## curd指令

| 参数 | 说明                             | 示例                                                       |
| ---- | -------------------------------- | ---------------------------------------------------------- |
| -A   | 设置user-agent                   | curl -A 'Chrome' https://www.baidu.com/                    |
| -X   | 使用指定方法请求                 | curl -X POST https://www.baidu.com/                        |
| -I   | 只返回请求头的信息               | curl -I POST https://www.baidu.com/                        |
| -d   | 以POST方法请求url,并发送相应参数 | -d a=1 -d b=2 -d c=3<br/>-d "a=1&b=2&c=3"<br/>-d @filename |
| -O   | 下载文件并以远程的文件名保存     |                                                            |
| -o   | 下载文件自定义文件名保存         |                                                            |
| -L   | 跟随重定向请求                   | curl -IL https://www.baidu.com/                            |
| -k   | 允许发起不安全的SSL请求          |                                                            |
| -b   | 设置Cookies                      | curl -b a=test http://httpbin.org/                         |
| -s   | 不显示无关信息                   |                                                            |





