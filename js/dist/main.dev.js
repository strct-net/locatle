"use strict";

var _countries = require("./countries");

var _image_list = _interopRequireDefault(require("../data/image_list.json"));

var _guessHandler = require("./guessHandler");

var _suggestionsHandler = require("./suggestionsHandler");

var _toast = require("./toast");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var startDate = new Date(2022, 5, 4);
var day = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
var imageData = _image_list["default"][day];
document.getElementById("picture").src = "data/images/".concat(imageData.id, ".jpeg");
var guessHandler = new _guessHandler.GuessHandler(imageData.country, imageData.coordinates, document.querySelector(".results"));

if (localStorage.getItem("lastPlayedDay") == day && localStorage.getItem("guessedCountries")) {
  var plays = JSON.parse(localStorage.getItem("guessedCountries"));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = plays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var previouslyGuessedCountry = _step.value;
      guessHandler.guess(previouslyGuessedCountry);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
} else {
  localStorage.setItem("lastPlayedDay", day);
  localStorage.setItem("guessedCountries", "");
}

var countries = Object.keys(_countries.COUNTRY_CODES);
var inputElement = document.getElementById("input");
var suggestionsHandler = new _suggestionsHandler.SuggestionsHandler(document.getElementById("suggestions"), countries, inputElement);
inputElement.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    if (inputElement.value in _countries.COUNTRY_CODES) {
      document.getElementById("guess-button").click();
    } else if (suggestionsHandler.getSelected()) {
      inputElement.value = suggestionsHandler.getSelected();
    }

    suggestionsHandler.hide();
  }
});
inputElement.addEventListener("input", function () {
  suggestionsHandler.update(inputElement.value);
});
document.getElementById("guess-button").addEventListener("click", function () {
  var inputElement = document.getElementById("input");

  if (guessHandler.guess(inputElement.value)) {
    inputElement.value = "";
  }

  localStorage.setItem("guessedCountries", JSON.stringify(guessHandler.guesses.map(function (x) {
    return x.country;
  })));
});
document.getElementById("share-button").addEventListener("click", function () {
  (0, _toast.showToast)("Copied results to clipboard!");
  var guessesString = guessHandler.guesses.map(function (x) {
    return Math.round(x.distance) + " km";
  }).join("\n");
  var message = guessHandler.gameState == "won" ? "Locatle #".concat(day, " with ").concat(guessHandler.guesses.length, " guesses.\n").concat(guessesString, " \uD83C\uDF89") : "Locatle #".concat(day, ". Game was lost.\n").concat(guessesString, " \u274C");
  navigator.clipboard.writeText(message);
});