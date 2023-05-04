const router = require('koa-router')()
const { login ,register} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/register', register)

router.post('/login', async function (ctx, next) {
	console.log(ctx.request.body,'====== ctx.request.body');
	const { username, password } = ctx.request.body
	const data = await login(username, password)
	if (data.name) {
		// 设置 session
		// ctx.session.name = data[0].name
		// ctx.session.password = data[0].password
		ctx.body = new SuccessModel('登录成功')
		return
	}else{
    ctx.body = new ErrorModel('登录失败')
	}
})

module.exports = router