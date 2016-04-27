'use strict';

var _parse = require('./parse');

self.onmessage = function (event) {
  function cb(err, data) {
    if (err) {
      throw err;
    } else {
      self.postMessage({ data: data }, [data]);
      self.close();
    }
  }

  parse(event.data.data, cb);
};