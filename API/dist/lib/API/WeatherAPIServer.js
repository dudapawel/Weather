"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherAPIServer = void 0;

var _Jwt = require("./Jwt.js");

var _UserList = require("./UserList");

var _getWeather = require("../weatherServerRequests/getWeather.js");

var _getCityList = require("../weatherServerRequests/getCityList.js");

var _HTTPServer = require("./HTTPServer");

var _constants = require("../constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Name: WeatherAPIServer.js
// Author: Pawel Duda
// Description: class which adds functions to HTTPServer.js 
// there are all functions to response requests to API
var fs = require('fs');

var WeatherAPIServer =
/*#__PURE__*/
function () {
  function WeatherAPIServer() {
    _classCallCheck(this, WeatherAPIServer);

    this._lastCityListFromServer = [];
    this.users = new _UserList.UserList();
    this.jwtToken = new _Jwt.Jwt(); //binds

    this.returnFile = this.returnFile.bind(this);
    this.getToken = this.getToken.bind(this);
    this.getAvailableCity = this.getAvailableCity.bind(this);
    this.addCityToUser = this.addCityToUser.bind(this);
    this.removeCityFromUser = this.removeCityFromUser.bind(this);
    this.getWeatherList = this.getWeatherList.bind(this);
    this.requestList = [{
      pathName: '/',
      numberOfAguments: 0,
      requestFunction: this.returnFile(_constants.INDEX_HTML_PATH, 'text/html'),
      checkAutorisation: false
    }, {
      pathName: '/main.js',
      numberOfAguments: 0,
      requestFunction: this.returnFile(_constants.MAIN_JS_PATH, 'application/javascript'),
      checkAutorisation: false
    }, {
      pathName: '/getToken',
      numberOfAguments: 0,
      requestFunction: this.getToken,
      checkAutorisation: false
    }, {
      pathName: '/API/city-list',
      numberOfAguments: 1,
      requestFunction: this.getAvailableCity,
      checkAutorisation: false
    }, {
      pathName: '/API/add-city',
      numberOfAguments: 1,
      requestFunction: this.addCityToUser,
      checkAutorisation: true
    }, {
      pathName: '/API/remove-city',
      numberOfAguments: 1,
      requestFunction: this.removeCityFromUser,
      checkAutorisation: true
    }, {
      pathName: '/API/get-weather',
      numberOfAguments: 0,
      requestFunction: this.getWeatherList,
      checkAutorisation: true
    }];
    this.server = (0, _HTTPServer.HTTPServer)(this.requestList, this.jwtToken);
    this.server.listen(_constants.SERVER_PORT);
    console.log("server is listening on ".concat(_constants.SERVER_PORT));
  } //API functions


  _createClass(WeatherAPIServer, [{
    key: "returnFile",
    value: function returnFile(fileDirectory, contentType) {
      return function (request, response) {
        fs.readFile(fileDirectory, function (err, data) {
          if (err) throw err;
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.end(data);
        });
      };
    }
  }, {
    key: "getToken",
    value: function getToken(request, response) {
      var newUserId = this.users.newUser();
      var token = this.jwtToken.create(newUserId);
      response.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      response.end(token);
    }
  }, {
    key: "getAvailableCity",
    value: function getAvailableCity(request, response, filterString) {
      var _this = this;

      //filtered list of available cities
      return (0, _getCityList.getCityList)().then(function (cityList) {
        _this._lastCityListFromServer = cityList;
        var filterStringWithOutProcent = filterString.replace(/%20/g, ' '); // %20 exchange ' ' in url

        var filteredCityList = cityList.filter(function (city) {
          var cityMatchToFilter = city.name.toLowerCase().startsWith(filterStringWithOutProcent.toLowerCase());
          return cityMatchToFilter;
        });
        var cityListWithoutDoubles = filteredCityList.filter(function (city, index, list) {
          //remove cities with the same names and different index
          var noDouble = true;

          for (var i = 0; i < index && noDouble; i++) {
            if (city.name === list[i].name) {
              noDouble = false;
            }
          }

          return noDouble;
        });
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.end(JSON.stringify(cityListWithoutDoubles));
      });
    }
  }, {
    key: "addCityToUser",
    value: function addCityToUser(request, response, userId, cityId) {
      var cityIdNumber = Number(cityId);
      var userToModify = this.users.getUser(userId);

      var cityFromCityList = this._lastCityListFromServer.find(function (element) {
        return element.id === cityIdNumber;
      });

      userToModify.addCity(cityFromCityList);
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end();
    }
  }, {
    key: "removeCityFromUser",
    value: function removeCityFromUser(request, response, userId, cityId) {
      var cityIdNumber = Number(cityId);
      var userToModify = this.users.getUser(userId);
      userToModify.removeCity(cityIdNumber);
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end();
    }
  }, {
    key: "getWeatherList",
    value: function getWeatherList(request, response, userId) {
      //list of cities with weather for user's cities
      var userDemanded = this.users.getUser(userId);

      if (userDemanded === undefined) {
        return [];
      }

      var citiesToGet = userDemanded.getCities();

      var cityWeathers = _toConsumableArray(citiesToGet);

      var cityWeatherPromises = citiesToGet.map(function (city, index) {
        return (0, _getWeather.getWeather)(city.id).then(function (weather) {
          cityWeathers[index] = {
            'city': city,
            'weather': weather
          };
        });
      });
      Promise.all(cityWeatherPromises).then(function (resolve, reject) {
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.end(JSON.stringify(cityWeathers));
      });
    }
  }]);

  return WeatherAPIServer;
}();

exports.WeatherAPIServer = WeatherAPIServer;