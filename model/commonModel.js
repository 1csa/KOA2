const db = require('../db/mysql')
 
class CommonModel {
  async getUserByName () {
    console.log('212222222');
    return await db.query(`select * from cry_users`)
  }
  async getUserById (id) {
    return await db.query(`select * from shop.s_users where id='${id}'`)
  }
}
 
module.exports = new CommonModel()