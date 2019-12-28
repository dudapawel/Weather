"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCityList = getCityList;

var _HTTPRequest = require("./HTTPRequest.js");

// Name: getCityList.js
// Author: Pawel Duda
// Description: 
var requestOptions = {
  method: 'GET',
  path: '/api/city-list'
};

function getCityList() {
  return new Promise(function (resolve, reject) {
    var HTTPRequestPromise = (0, _HTTPRequest.HTTPRequest)(requestOptions);
    HTTPRequestPromise.then(function (value) {
      resolve(value);
    }, function (reason) {
      reject(reason);
    });
  });
}