import axios from 'axios'
const service = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000, // 请求超时时间
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      }
  })

export default service