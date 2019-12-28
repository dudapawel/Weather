"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListWithoutRepeat = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Name: ListWithoutRepeat.js
// Author: Pawel Duda
// Description: This is array based list in which do not add the same element second time
var ListWithoutRepeat =
/*#__PURE__*/
function () {
  function ListWithoutRepeat(elements) {
    _classCallCheck(this, ListWithoutRepeat);

    this._elements = [];
    this.addElements(elements);
  }

  _createClass(ListWithoutRepeat, [{
    key: "addOneElement",
    value: function addOneElement(newElement, compareFunction) {
      if (this._elements.findIndex(function (element) {
        return compareFunction(newElement, element);
      }) === -1 && newElement !== undefined) {
        this._elements.push(newElement);
      }
    }
  }, {
    key: "addElements",
    value: function addElements(newElements, compareFunction) {
      var _this = this;

      if (typeof newElements === 'array') {
        newElements.forEach(function (element) {
          _this.addOneElement(element, compareFunction);
        });
      } else {
        this.addOneElement(newElements, compareFunction);
      }
    }
  }, {
    key: "removeOneElement",
    value: function removeOneElement(toRemoveArgument, compareFunction) {
      var indexOfElement = this._elements.findIndex(function (element) {
        return compareFunction(toRemoveArgument, element);
      });

      if (indexOfElement !== -1) {
        this._elements.splice(indexOfElement, 1);
      }
    }
  }, {
    key: "removeElements",
    value: function removeElements(toRemoveArguments, compareFunction) {
      var _this2 = this;

      if (typeof elements === 'array') {
        toRemoveArguments.forEach(function (element) {
          _this2.removeOneElement(element, compareFunction);
        });
      } else {
        this.removeOneElement(toRemoveArguments, compareFunction);
      }
    }
  }, {
    key: "elements",
    get: function get() {
      return this._elements;
    }
  }]);

  return ListWithoutRepeat;
}();

exports.ListWithoutRepeat = ListWithoutRepeat;