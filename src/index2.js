import Rx from 'rx'
import { GCodeToolpath } from 'gcode-toolpath'

export default function parse (str) {
  const obs = new Rx.ReplaySubject(1)

  const defaultColor = [0, 0, 0, 255]
  const motionColor = {
    'G0': [255, 158, 2, 255],
    'G1': [7, 169, 255, 255],
    'G2': [125, 255, 255, 255],
    'G3': [125, 255, 125, 255]
  }

  let group = {}
  let geometry = {}
  let posArray = []
  let colArray = []

  function addLine (modalState, v1, v2) {
    const { motion } = modalState

    posArray.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z)
    let color = (motionColor[motion] || defaultColor).map(e => (e / 255))
    colArray.push(color[0], color[1], color[2], color[3], color[0], color[1], color[2], color[3])
  }

  const toolpath = new GCodeToolpath({
    modalState: {},
    addLine: (modalState, v1, v2) => {
      addLine(modalState, v1, v2)
    },
    addArcCurve: (modalState, v1, v2, v0) => {
      //this.addArcCurve(modalState, v1, v2, v0);
    }
  })
  toolpath.loadFromString (str, function (err, data) {
    const positions = new Float32Array(posArray) // posArray.length  )
    const colors = new Float32Array(colArray) // posArray.length/3 * 4  )
    // positions.set( posArray )
    // colors.set ( colArray )
    //geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
    //geometry.addAttribute('color', new THREE.BufferAttribute(colors, 4))
    geometry = {colors, positions}

    group = geometry
    geometry = {}
  })
  .on('data', (data) => {
    //console.log('data',data)
  })
  .on('end', (results) => {
    //console.log('done', geometry)
    obs.onNext([group])
    obs.onNext({progress: 1, total: 1})
  })

  /*const runner = new GCodeRunner()
  runner.loadFromString(str, function(err, data) {
    if(!err) {
      obs.onNext(data)
    }
    else
    {
      obs.onError(err)
    }
  })
  .on('end', (results) => {
        // 'end' event listener
      //obs.onEnd()
    })*/

  return obs
}
