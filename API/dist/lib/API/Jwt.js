"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Jwt = void 0;

var _constants = require("../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Name: Jwt.js
// Author: Pawel Duda
// Description: class which code and decode jwt
var nJwt = require('njwt');

var secureRandom = require('secure-random');

var Jwt =
/*#__PURE__*/
function () {
  function Jwt() {
    _classCallCheck(this, Jwt);

    this._signingKey = secureRandom(_constants.SIGNING_KEY_LENGTH, {
      type: 'Buffer'
    });
  }

  _createClass(Jwt, [{
    key: "create",
    value: function create(userId) {
      var claims = {
        iss: _constants.CLAIMS_ISS,
        sub: userId,
        scope: _constants.CLAIMS_SCOPE
      };
      var jwt = nJwt.create(claims, this._signingKey);
      var compactedJwt = jwt.compact();
      return compactedJwt;
    }
  }, {
    key: "verify",
    value: function verify(token) {
      try {
        var verifiedJwt = nJwt.verify(token, this._signingKey);
        return verifiedJwt.body.sub; //retrurns userID
      } catch (err) {
        return undefined;
      }
    }
  }]);

  return Jwt;
}();

exports.Jwt = Jwt;