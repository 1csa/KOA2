const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF

if (env === 'dev') {
	// mysql
	MYSQL_CONF = {
		host: '127.0.0.1',
		user: 'root',
		password: 'admin',
		// port: '3306',
		database: 'cry',
	}
}

if (env === 'production') {
	// mysql
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: '12345678',
		port: '3306',
		database: 'igp',
	}
}

module.exports = {
	MYSQL_CONF,
}