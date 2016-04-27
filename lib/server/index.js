'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _assign = require('fast.js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _compositeDetect = require('composite-detect');

var _compositeDetect2 = _interopRequireDefault(_compositeDetect);

var _parse = require('./parse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author kaosat-dev / https://github.com/kaosat-dev
 *
 *
 * Limitations:
 *
 */

function parse(data) {
  var parameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var defaults = {
    useWorker: false // (detectEnv.isBrowser === true)
  };
  parameters = (0, _assign2.default)({}, defaults, parameters);
  var _parameters = parameters;
  var useWorker = _parameters.useWorker;


  var obs = new _rx2.default.ReplaySubject(1);

  if (useWorker) {
    (function () {
      // var Worker = require("./worker.js")//Webpack worker!
      // var worker = new Worker
      // TODO: for node.js side use https://github.com/audreyt/node-webworker-threads for similar speedups
      var worker = new Worker('./worker.js'); // browserify
      worker.onmessage = function (event) {
        var positions = new Float32Array(event.data.positions);
        var normals = new Float32Array(event.data.normals);
        var geometry = { positions: positions, normals: normals };

        obs.onNext({ progress: 1, total: positions.length });
        obs.onNext(geometry);
        obs.onCompleted();
      };
      worker.onerror = function (event) {
        obs.onError('filename:' + event.filename + ' lineno: ' + event.lineno + ' error: ' + event.message);
      };

      worker.postMessage({ data: data });
      obs.catch(function (e) {
        return worker.terminate();
      });
    })();
  } else {
    (0, _parse.parseSteps)(data, function (err, result) {
      if (err) {
        obs.onError(error);
      } else {
        //obs.onNext({progress: 1, total: 1})
        obs.onNext(result);
        obs.onCompleted();
      }
    });
  }

  return obs;
}