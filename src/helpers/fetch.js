import { extend } from 'lodash'
import fetch from 'isomorphic-fetch'

export default function (url, options) {
  options = options || {}
  options = extend({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }, options)

  if (options.data) {
    if (options.method && options.method.toLowerCase() === 'post') {
      options.body = JSON.stringify(options.data)
    } else if (!options.method || options.method.toLowerCase() === 'get') {
      url += '?' + Object.keys(options.data).map((key, value) => `${key}=${options.data[key]}`).join('&')
    }
  }
  if (url.indexOf('http') !== 0) {
    const HOST = __SERVER__ ? `http://localhost:${process.env.PORT}` : ''
    url = `${HOST}${url}`
  }
  return fetch(url, options).then(res => {
    if (options.empty) return ''
    return res.json()
  })
}
