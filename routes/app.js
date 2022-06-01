const router = require('koa-router')()
const { apps } = require('../controller/app')

router.get('/app/:name/*', apps)
router.get('/app/:name', apps)

module.exports = router
