/**
 * @author kaosat-dev / https://github.com/kaosat-dev
 *
 *
 * Limitations:
 *
 */

import Rx from 'rx'
import assign from 'fast.js/object/assign'
import detectEnv from 'composite-detect'
import { parseSteps } from './parse'

export default function parse (data, parameters = {}) {
  const defaults = {
    useWorker: (detectEnv.isBrowser === true)
  }
  parameters = assign({}, defaults, parameters)
  const {useWorker} = {useWorker: false}//parameters

  const obs = new Rx.ReplaySubject(1)
  console.log('useWorker', useWorker)
  if (useWorker) {
    // var Worker = require("./worker.js")//Webpack worker!
    // TODO: for node.js side use https://github.com/audreyt/node-webworker-threads for similar speedups
    let worker = new Worker('./worker.js') // browserify
    worker.onmessage = function (event) {
      //const positions = new Float32Array(event.data.positions)
      //const colors = new Float32Array(event.data.colors)
      //const geometry = {positions, colors}
      console.log('worker on message', event.data)
      const data = event.data.data
      obs.onNext({progress: 1, total: 1})
      obs.onNext(data)
      obs.onCompleted()
    }
    worker.onerror = function (event) {
      obs.onError(`filename:${event.filename} lineno: ${event.lineno} error: ${event.message}`)
    }

    worker.postMessage({data})
      obs.catch(e => worker.terminate())
  } else {
    parseSteps(data, (err, result) => {
      if (err) {
        obs.onError(err)
      } else {
        obs.onNext({progress: 1, total: 1})
        obs.onNext(result)
        obs.onCompleted()
      }
    })
  }

  return obs
}
