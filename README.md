## Usco-gcode-parser

[![GitHub version](https://badge.fury.io/gh/usco%2Fusco-gcode-parser.svg)](https://badge.fury.io/gh/usco%2Fusco-gcode-parser)

gcode format parser for USCO project

Optimized for speed in the browser (webworkers etc) and node.js



## General information

  - returns raw buffer data wrapped in an RxJs observable (soon to be most.js)
  - useable both on Node.js & client side


## Usage

    import parse,  {outputs} from '../lib/gcode-parser'

    let data = fs.readFileSync("foo.gcode",'binary')

    let gcodeObs = parse(data) //we get an observable back

    gcodeObs.forEach(function(parsedGCode){
      //DO what you want with the data wich is something like {vertices,normals,etc}
      console.log(parsedGCode)
    })



## LICENSE

[The MIT License (MIT)](https://github.com/usco/usco-gcode-parser/blob/master/LICENSE)

- - -

[![Build Status](https://travis-ci.org/usco/usco-gcode-parser.svg?branch=master)](https://travis-ci.org/usco/usco-gcode-parser)
[![Dependency Status](https://david-dm.org/usco/usco-gcode-parser.svg)](https://david-dm.org/usco/usco-gcode-parser)
[![devDependency Status](https://david-dm.org/usco/usco-gcode-parser/dev-status.svg)](https://david-dm.org/usco/usco-gcode-parser#info=devDependencies)
