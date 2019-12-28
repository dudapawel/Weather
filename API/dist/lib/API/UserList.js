"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserList = void 0;

var _ListById = require("./ListById");

var _UserProperties = require("./UserProperties.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserList =
/*#__PURE__*/
function () {
  function UserList() {
    _classCallCheck(this, UserList);

    this._list = new _ListById.ListById();
  }

  _createClass(UserList, [{
    key: "newUser",
    value: function newUser() {
      return this._list.addElement(new _UserProperties.UserProperties());
    }
  }, {
    key: "getUser",
    value: function getUser(userId) {
      return this._list.getElement(userId);
    }
  }]);

  return UserList;
}();

exports.UserList = UserList;