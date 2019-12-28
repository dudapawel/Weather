"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPRequest = HTTPRequest;

var _constants = require("../constants");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var http = require('http');

function HTTPRequest(options) {
  //options - parameters for HTP request
  var connectedOptions = Object.assign({}, _constants.DEFAULT_REQUEST_OPTIONS);

  if (_typeof(options) === 'object') {
    connectedOptions = Object.assign(connectedOptions, options);
  }

  return new Promise(function (resolve, reject) {
    var req = http.get(connectedOptions);
    req.end();
    req.on('connect', function (response, socket, head) {});
    req.on('error', function onError(error) {
      reject(error.message);
    });
    req.on('response', function onResponse(response) {
      if (response.statusCode != 200) {
        reject(Error("Status code: ".concat(response.statusCode)));
      }

      var rawData = '';
      response.on('data', function (chunk) {
        rawData += chunk;
      });
      response.on('end', function onEnd() {
        try {
          var parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      });
      response.on('error', function onError(error) {
        reject(error);
      });
    });
  });
}