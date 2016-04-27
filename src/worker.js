import { parseSteps } from './parse'

self.onmessage = function (event) {
  function cb (err, data) {
    if (err) { throw err } else {
      self.postMessage({data}, [data])
      self.close()
    }
  }

  parse(event.data.data, cb)
}
