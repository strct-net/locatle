"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessHandler = void 0;

var _guess = require("./guess");

var _countries = require("./countries");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GuessHandler =
/*#__PURE__*/
function () {
  function GuessHandler(correctCountryCode, correctCoordinates, resultsElement) {
    _classCallCheck(this, GuessHandler);

    this.correctCountryCode = correctCountryCode;
    this.correctCoordinates = correctCoordinates;
    this.resultsElement = resultsElement;
    this.results = [];
    this.guesses = [];
    this.gameState = "inProgress";
  }

  _createClass(GuessHandler, [{
    key: "guess",
    value: function guess(guessedCountry) {
      if (!(guessedCountry in _countries.COUNTRY_CODES)) {
        return false;
      }

      var guessedCountryCode = _countries.COUNTRY_CODES[guessedCountry];
      var guess = new _guess.Guess(guessedCountry, guessedCountryCode, this.correctCoordinates);
      this.results.push(guess);
      var row = this.resultsElement.children[this.results.length - 1];
      row.querySelector(".given-country").innerHTML = guess.guessedCountry;
      row.querySelector(".distance").innerHTML = "".concat(Math.floor(guess.distance), " km");
      this.guesses.push({
        country: guess.guessedCountry,
        distance: guess.distance
      });

      if (guessedCountryCode == this.correctCountryCode) {
        row.querySelector(".distance").innerHTML = "0 km";
        this.gameWon();
      } else if (this.results.length == 5) {
        this.gameOver();
      }

      return true;
    }
  }, {
    key: "gameDone",
    value: function gameDone() {
      document.querySelector(".guess-area").hidden = true;
      document.querySelector(".end-area").hidden = false;
    }
  }, {
    key: "gameWon",
    value: function gameWon() {
      this.gameDone();
      this.gameState = "won";
      document.querySelector(".end-area").querySelector(".text").innerHTML = "Correct! You won.";
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.gameDone();
      this.gameState = "lost";
      document.querySelector(".end-area").querySelector(".text").innerHTML = "Incorrect! Better luck next time.";
    }
  }]);

  return GuessHandler;
}();

exports.GuessHandler = GuessHandler;