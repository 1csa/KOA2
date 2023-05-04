const {db,escape} = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const {createUser} = require('../service/user')

const register =async (ctx,next) =>{
	const {username,password} = ctx.request.body

	//操作数据库
	const res = await createUser(username,password)
  console.log(res);

	//返回结果
	ctx.body = new SuccessModel('注册成功')
}
const login = async (username, password) => {
	username = escape(username)

	// 生成加密密码
	password = genPassword(password)
	password = escape(password)

	const sql = `
        select name from cry.user where name=${username} and password=${password}
    `
	// console.log('sql is', sql)

	const rows = await db(sql)
	return rows.results[0] || {}
}

module.exports = {
	login,
	register
}