const fs = require('fs')
const path = require('path')

const apps = async (ctx, next) => {
  let name = ctx.params.name
  let data = ''

  try {
    let path_app = path.join(process.cwd(), `./public/${name}/index.html`)
    data = fs.readFileSync(path_app, { encoding: 'utf8' })
  } catch (e) {
    console.error(e);
  }

  ctx.type = 'html'
  ctx.body = data
  next()
}

module.exports = {
	apps
}