const router = require('koa-router')()
const { login ,register,logout,logoff} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/register', register)

router.post('/logout', logout)

router.post('/logoff', logoff)


router.post('/login', async function (ctx, next) {
	const { username, password } = ctx.request.body
	const data = await login(username, password)
	if (data.name) {
		// 设置 session
		ctx.session.name = data.name
		ctx.session.password = data.password
		ctx.body = new SuccessModel('登录成功')
	}else{
    ctx.body = new ErrorModel('用户不存在，请先注册！')
	}
})

module.exports = router