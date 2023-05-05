const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')


const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')
const apiProxy = require('./routes/api/proxy')
const routeApp = require('./routes/app')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/dist'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const ENV = process.env.NODE_ENV

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
// app.use(blog.routes(), blog.allowedMethods())
// app.use(apiProxy.routes(), apiProxy.allowedMethods())
// app.use(routeApp.routes(), routeApp.allowedMethods())

//session
app.keys = ['some secret hurr'];		//cookie的签名
const CONFIG = {
    key: 'koa:sess', 		//默认为cookie的key；可以不管
    maxAge: 86400000,			//cookie的过期时间，需要设置
    overwrite: true, 		//设置没有效果，可以默认   
    httpOnly: true,             //true表示只有服务器端可以获取
    signed: true,           //签名默认
    rolling: false,         //每次访问都去更新session
    renew: true,            //快要过期时候访问重新设置session
};
app.use(session(CONFIG, app));

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
