const {db,escape} = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// const {createUser} = require('../service/user')

//用户注册
const register =async (ctx,next) =>{
	let {username,password} = ctx.request.body
	username = escape(username)
	// 生成加密密码
	password = genPassword(password)
	password = escape(password)
  const sql = `
        select name from cry.user where name=${username} and password=${password}
    `
	const rows = await db(sql)
	if (rows.results.length !== 0 ) {
		ctx.body = new ErrorModel('用户已经存在,不需要在注册!')
		return
	}
  // %:可以任意的远程机器登录，如果指定了那个机器登录可以写机器的ip
	const create_sql = `INSERT INTO cry.user(name, password,is_admin) VALUES (${username}, ${password},'0');`

	const create_rows = await db(create_sql)
	if (create_rows.results) {
		ctx.body = new SuccessModel('注册成功')
	}
}

//用户登录
const login = async (username, password) => {
	username = escape(username)
	// 生成加密密码
	password = genPassword(password)
	password = escape(password)

	const sql = `
        select name,password from cry.user where name=${username} and password=${password}
    `
	// console.log('sql is', sql)

	const rows = await db(sql)
	return rows.results[0] || {}
}

//用户退出登录
const logout = async (ctx, next) => {
	ctx.body = new SuccessModel('退出成功')
}

//用户注销
const logoff= async (ctx, next) => {
  let {username,password} = ctx.request.body
	username = escape(username)
	// 生成加密密码
	password = genPassword(password)
	password = escape(password)
	const sql = `
        select name from cry.user where name=${username} and password=${password}
    `
	const rows = await db(sql)
	if (rows.results.length === 0 ) {
		ctx.body = new ErrorModel('用户不存在，无法注销！')
		return
	}

	const delete_sql = `
        delete from cry.user where name = ${username} and password=${password}
    `
	const delete_rows = await db(delete_sql)
  ctx.body = new SuccessModel('注销成功')
}
module.exports = {
	login,
	register,
	logoff,
  logout
}