"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPServer = HTTPServer;

var _checkPathNameStartWith = require("../auxilaries/checkPathNameStartWith.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Name: HTTPServer.js
// Author: Pawel Duda
// Description: function which return HttpServer
//argument:requestList - array of objects{pathName:<pathname string>, numberOfArguments:<number of arguments in pathname>, 
//requestFunction:<function>, checkAutorisation:<bool - if check jwt >}
//
// request list - list of responses for diferent requests url. It have additional argument: authorisation 
//for jwt
var http = require('http');

var url = require('url');

function HTTPServer(requestList, jwtToken) {
  return http.createServer(function server(request, response) {
    var requestUrl = url.parse(request.url);
    var requestPathname = requestUrl.pathname;
    requestList.forEach(function (element) {
      //for each response check if corresponding path was reveived
      var checkedURL = (0, _checkPathNameStartWith.checkPathNameStartWith)(requestPathname, element.pathName);

      if (checkedURL.valid === true && checkedURL.arguments.length <= element.numberOfAguments) {
        //function is only call if request URL was valid
        if (element.checkAutorisation === false) {
          //
          element.requestFunction.apply(element, [request, response].concat(_toConsumableArray(checkedURL.arguments)));
        } else {
          var auth = request.headers.authorization;

          if (auth.startsWith('Bearer ')) {
            var token = auth.slice('Bearer '.length);
            var userId = jwtToken.verify(token);

            if (userId !== undefined) {
              //verification was OK
              element.requestFunction.apply(element, [request, response, userId].concat(_toConsumableArray(checkedURL.arguments)));
            } else {
              response.writeHead(401, {
                'Content-Type': 'application/json'
              });
              response.end();
            }
          }
        }
      }
    });
  });
}