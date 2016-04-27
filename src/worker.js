// importScripts('./stl-utils.js')
import { parse } from './parse'

self.onmessage = function (event) {
  function cb (data) {
    self.postMessage({data}, [data])
    self.close()
  }

  parse(event.data.data, cb)
}
