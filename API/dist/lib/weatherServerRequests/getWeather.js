"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeather = getWeather;

var _HTTPRequest = require("./HTTPRequest.js");

// Name: getWeather.js
// Author: Pawel Duda
// Description: 
function getWeather(cityId) {
  return new Promise(function (resolve, reject) {
    var requestOptions = {
      method: 'GET',
      path: "/api/weather/".concat(cityId)
    };
    var HTTPRequestPromise = (0, _HTTPRequest.HTTPRequest)(requestOptions);
    HTTPRequestPromise.then(function (value) {
      resolve(value);
    }, function (reason) {
      reject(reason);
    });
  });
}