"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProperties = void 0;

var _ListWithoutRepeat = require("./ListWithoutRepeat.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserProperties =
/*#__PURE__*/
function () {
  function UserProperties() {
    _classCallCheck(this, UserProperties);

    this._cityList = new _ListWithoutRepeat.ListWithoutRepeat(); //list of objects {id:<cityId> ,name:<cityName> }
  }

  _createClass(UserProperties, [{
    key: "addCity",
    value: function addCity(cities) {
      var compareFunction = function compareFunction(newElement, listElement) {
        return newElement.id === listElement.id;
      };

      this._cityList.addElements(cities, compareFunction);
    }
  }, {
    key: "removeCity",
    value: function removeCity(cityIds) {
      var compareFunction = function compareFunction(toRemoveArgument, listElement) {
        return toRemoveArgument === listElement.id;
      };

      this._cityList.removeElements(cityIds, compareFunction);
    }
  }, {
    key: "getCities",
    value: function getCities() {
      return this._cityList.elements;
    }
  }]);

  return UserProperties;
}();

exports.UserProperties = UserProperties;