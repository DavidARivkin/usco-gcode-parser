'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSteps = parseSteps;

var _gcodeToolpath = require('gcode-toolpath');

function parseSteps(data, cb) {
  var defaultColor = [0, 0, 0, 255];
  var motionColor = {
    'G0': [255, 158, 2, 255],
    'G1': [7, 169, 255, 255],
    'G2': [125, 255, 255, 255],
    'G3': [125, 255, 125, 255]
  };

  var group = {};
  var geometry = {};
  var posArray = [];
  var colArray = [];

  function _addLine(modalState, v1, v2) {
    var motion = modalState.motion;


    posArray.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    var color = (motionColor[motion] || defaultColor).map(function (e) {
      return e / 255;
    });
    colArray.push(color[0], color[1], color[2], color[3], color[0], color[1], color[2], color[3]);
  }

  function _addArcCurve(modalState, v1, v2, v0) {}

  var toolpath = new _gcodeToolpath.GCodeToolpath({
    modalState: {},
    addLine: function addLine(modalState, v1, v2) {
      _addLine(modalState, v1, v2);
    },
    addArcCurve: function addArcCurve(modalState, v1, v2, v0) {
      _addArcCurve(modalState, v1, v2, v0);
    }
  });
  toolpath.loadFromString(data, function (err, data) {
    if (err) {
      //obs.onError(err)
      cb(err, undefined);
    }
  }).on('end', function (results) {
    console.log('end');
    //obs.onNext([group])
    //obs.onNext({progress: 1, total: 1})
    var positions = new Float32Array(posArray); // posArray.length  )
    var colors = new Float32Array(colArray); // posArray.length/3 * 4  )
    geometry = { colors: colors, positions: positions };
    group = geometry;
    geometry = {};

    cb(undefined, [group]);
  });
}