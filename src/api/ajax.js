import axios from 'axios'

export default function ajax(url, data = {}, method = 'GET') {
    return new Promise((res, rej) => {
      let promise
      if (method === 'GET') {
        let dataStr = ''
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
          dataStr = dataStr.substring(0, dataStr.length - 1)
          url = url + '?' + dataStr
        }
      }

      if (method === 'GET') {
        promise = axios.get(url)
      } else {
        promise = axios.post(url, data)
      }

      promise.then((response) => {
        res(response.data)
      }).catch((error) => {
        rej(error)
      })
    })
}
