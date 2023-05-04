const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')


 
const pool = mysql.createPool({
  ...MYSQL_CONF
})
 
const db =  (sql, values)=> {
	console.log(sql,'=======');
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
						console.log(results,'====results');
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
// const  getUserByName = async (username) =>{
//     return await db(`select * from user`)
//   }
  
// getUserByName()
