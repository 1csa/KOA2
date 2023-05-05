const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')
const {Sequelize} = require('sequelize') 

// const {host, user,password,database} = MYSQL_CONF
//sequelize连接数据库
// const seq = new Sequelize(database,user,password,{
// 	host:host,
// 	dialect:'mysql'
// })
// seq.authenticate().then(()=>{
// 	console.log('数据库连接成功')
// 	}
// ).catch((err)=>{
// 	console.log('数据库连接失败',err)
// 	}
// )
// return seq
//普通连接数据库 

const pool = mysql.createPool({
  ...MYSQL_CONF
})
 
const db =  (sql, values)=> {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        console.log(err, "数据库连接失败");
        resolve({
          code: 500,
        })
      } else {
        console.log("数据库连接成功");
        connection.query(sql, values, (err, results) => {
          if (err) {
            reject(err)
            resolve({
              code: 400
            })
          } else {
            resolve({
              code: 200,
              results,
            })
            connection.release()
            //resolve(rows)
          }
          //connection.release() // 释放连接池
        })
      }
    })
  })
}


module.exports = {
	db,
	escape: mysql.escape
}
