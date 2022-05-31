const axios = require('axios');
const router = require('koa-router')()

router.prefix('/api/proxy')

function mapToQueryString(map) {
  let qs = '';
  for (const key in map) {
    let val = map[key];
    if (typeof val === 'object') {
      val = JSON.stringify(val);
    }
    qs += `${key}=${val}&`;
  }

  return qs.substring(0, qs.length - 1);
}

router.all('/*', async function (ctx, next) {
  const method = ctx.request.method
  const params = ctx.request.query
  console.log(params.targetUrl)
  if (!/^(https?:)/.test(params.targetUrl)) {
   return ctx.body = {
      code: -1,
      status: 'failed',
      message: '/api/proxy/[targetUrl]，targetUrl 不合法',
    };
  }
   let targetUrl = params.targetUrl;
  targetUrl = targetUrl.replace(/http(s?):\//, 'http$1://');
  delete params.targetUrl;

  if (Object.keys(params).length > 0) {
    targetUrl += `?${mapToQueryString(params)}`;
  }

  const userInfo = ctx.request.header['x-user-info'];
  const baseHeaders = {
    cookie: ctx.request.header.cookie,
    'Content-Type': ctx.request.header['Content-Type'] || 'application/json',
  };

  const headers = userInfo
    ? Object.assign(baseHeaders, { 'X-User-Info': userInfo })
    : baseHeaders;

  const options = {
    method,
    headers,
  };


  if (method !== 'GET') {
    const isFormData = ctx.request.header['is-form-data'];
    if (isFormData === 'form-data') {
      // 兼容 body 参数需要这要的形式 key=value&key=value
      options.body = qs.stringify(this.post(), {
        arrayFormat: 'index',
      });
    } else {
      if (options.headers['Content-Type'].indexOf('json') > -1) {
        options.body = JSON.stringify(this.post());
      } else if (options.headers['Content-Type'].indexOf('x-www-form-urlencoded') > -1) {
        options.body = qs.stringify(this.post());
      }
    }
  }
  try {
    const ret = await axios(encodeURI(targetUrl), options).then(res => res.json());
    if (targetUrl.indexOf('/task/take') > 0 || targetUrl.indexOf('/mat/result') > 0 || targetUrl.indexOf('/memu/status/andtags') > 0) {
      console.log('这是正常输出===---===')
      console.log(targetUrl)
    }
    return  ctx.body = ret;
  } catch (e) {
    if (targetUrl.indexOf('/task/take') > 0 || targetUrl.indexOf('/mat/result') > 0 || targetUrl.indexOf('/memu/status/andtags') > 0) {
      console.log('这是error ++++++++===')
      console.log(targetUrl)
      console.log(e)
    }
    return  ctx.body = {
      code: -1,
      status: 'failed',
      message: e.toString(),
      targetUrl,
      options,
    };
  }
})

module.exports = router
