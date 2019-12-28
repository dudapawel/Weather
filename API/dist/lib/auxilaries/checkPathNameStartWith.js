"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPathNameStartWith = checkPathNameStartWith;

// Name: checkPathNameStartWith.js
// Author: Pawel Duda
// Description: Check begining of URL and returns object {valid: <true if pathName starts with pathNameBegining>, 
//             arguments: array of text after '/'}
function checkPathNameStartWith(pathName, pathNameBegining) {
  //check arguments type
  if (typeof pathName !== 'string' || typeof pathNameBegining !== 'string') {
    return {
      valid: false,
      arguments: []
    };
  }

  if (pathName.startsWith(pathNameBegining) !== true) {
    return {
      valid: false,
      arguments: []
    };
  }

  var restOfPathName = pathName.slice(pathNameBegining.length);
  var allArguments = restOfPathName.split('/');
  var argumentsWithoutEmpty = allArguments.filter(function (element) {
    return element.length > 0;
  });
  return {
    valid: true,
    arguments: argumentsWithoutEmpty
  };
}