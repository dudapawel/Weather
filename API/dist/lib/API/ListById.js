"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListById = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Name: ListById.js
// Author: Pawel Duda
// Description: list in which elements can be called by ID
var ListById =
/*#__PURE__*/
function () {
  function ListById() {
    _classCallCheck(this, ListById);

    this._elements = {};
    this._nextNewId = 1;
    this._deletedId = [];
  }

  _createClass(ListById, [{
    key: "getElement",
    value: function getElement(id) {
      return this._elements[id]; //if no element return undefined
    }
  }, {
    key: "setElement",
    value: function setElement(id, newElement) {
      if (id in this._elements) {
        this._elements[id] = newElement;
      } else {
        throw Error('Can not set if element not exist');
      }
    }
  }, {
    key: "addElement",
    value: function addElement(newElement) {
      var idToAdd = 0;

      if (this._deletedId.length > 0) {
        idToAdd = this._deletedId.pop();
      } else {
        idToAdd = this._nextNewId;
        this._nextNewId += 1;
      }

      this._elements[idToAdd] = newElement;
      return idToAdd;
    }
  }, {
    key: "deleteElement",
    value: function deleteElement(id) {
      if (id in this._elements) {
        delete this._elements[id];

        this._deletedId.push(id);
      }
    }
  }]);

  return ListById;
}();

exports.ListById = ListById;