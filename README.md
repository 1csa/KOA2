## koa2

## Build Setup
* 开发环境启动
``` bash

npm run dev

http://127.0.0.1:4000

```

* 生产环境启动
``` bash
PORT=$port pm2 start pm2.json

```

## 已提供功能
1. 静态server访问前端打包后工程, 默认静态路径在dist
    * 前端打包后路由访问：需要前端打包后放在dist/xxx/里面，前端路由base router设置成/app/xxx，即可访问页面 http://127.0.0.1:4000/app/xxx 
2. 前端跨域请求，http://127.0.0.1:4000/api/proxy/[targetUrl]

