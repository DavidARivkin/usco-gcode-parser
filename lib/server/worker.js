'use strict';

var _parse = require('./parse');

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

self.onmessage = function (event) {
  function cb(err, data) {
    if (err) {
      throw err;
    } else {
      self.postMessage({ data: data }); //, [data])
      self.close();
    }
  }

  var s = new _stream2.default.Readable();
  s.push(event.data.data);
  s.push(null);

  (0, _parse.parseSteps)(s, cb);
};