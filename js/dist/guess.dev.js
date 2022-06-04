"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Guess = void 0;

var _haversineDistance = _interopRequireDefault(require("haversine-distance"));

var _countries = require("./countries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Guess = function Guess(guessedCountry, guessedCountryCode, correctCoordinates) {
  _classCallCheck(this, Guess);

  this.guessedCountry = guessedCountry;
  this.guessedCoords = _countries.COUNTRY_COORDINATES[guessedCountryCode];
  this.correctCoords = correctCoordinates;
  this.distance = (0, _haversineDistance["default"])({
    latitude: this.guessedCoords[0],
    longitude: this.guessedCoords[1]
  }, {
    latitude: this.correctCoords[0],
    longitude: this.correctCoords[1]
  }) / 1000;
};

exports.Guess = Guess;