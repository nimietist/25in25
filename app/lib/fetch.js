import { extend } from 'lodash'
import fetch from 'isomorphic-fetch'

export default function (url, options) {
  options = options || {}
  options = extend({
    credentials: 'same-origin'
  }, options)
  if (url.indexOf('http') !== 0) {
    const HOST = __SERVER__ ? `http://localhost:${process.env.PORT}` : ''
    url = `${HOST}${url}`
  }
  return fetch(url, options).then(res => {
    if (options.empty) return ''
    return res.json()
  })
}
