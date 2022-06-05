"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionsHandler = void 0;

var _fuse = _interopRequireDefault(require("fuse.js"));

var _countries = require("./countries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SuggestionsHandler =
/*#__PURE__*/
function () {
  function SuggestionsHandler(element, suggestionList, inputElement) {
    var _this = this;

    _classCallCheck(this, SuggestionsHandler);

    this.element = element;
    this.fuse = new _fuse["default"](suggestionList);
    this.inputElement = inputElement;
    this.maxLength = 6;
    this.selectedIndex = 0;
    this.inputElement.addEventListener("input", function (e) {
      _this.update(_this.inputElement.value);
    });
    this.inputElement.addEventListener("keydown", function (e) {
      if (e.key == "ArrowUp") e.preventDefault();
    });
    this.inputElement.addEventListener("keydown", function (e) {
      if (e.key == "ArrowUp") {
        _this.selectedIndex += 1;

        _this.render();
      } else if (e.key == "ArrowDown") {
        _this.selectedIndex = Math.max(0, _this.selectedIndex - 1);

        _this.render();
      } else if (e.key == "Enter") {
        var selected = _this.getSelected();

        if (inputElement.value.trim() in _countries.COUNTRY_CODES) {
          document.getElementById("guess-button").click();
        } else if (selected) {
          inputElement.value = selected;
        }

        _this.hide();
      }
    });
    this.inputElement.addEventListener("focus", function () {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  _createClass(SuggestionsHandler, [{
    key: "getSelected",
    value: function getSelected() {
      return this.matches.length > 0 ? this.matches[this.selectedIndex] : "";
    }
  }, {
    key: "hide",
    value: function hide() {
      this.element.innerHTML = "";
      this.selectedIndex = 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.element.innerHTML = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var match = _step.value;
          var entry = document.createElement("span");
          entry.className = "entry";
          entry.innerHTML = match;
          this.element.appendChild(entry);
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

      if (this.selectedIndex >= this.matches.length) {
        this.selectedIndex = this.matches.length - 1;
      }

      this.element.children[this.selectedIndex].classList.add("selected");
      this.element.style.width = this.inputElement.parentElement.offsetWidth + "px";
      this.element.style.top = this.inputElement.offsetTop - this.element.offsetHeight + "px";
      this.element.style.left = this.inputElement.offsetLeft - 0.5 + "px";
      this.element.addEventListener("click", function (e) {
        _this2.inputElement.value = e.target.innerHTML;

        _this2.hide();
      });
    }
  }, {
    key: "update",
    value: function update(input) {
      if (input.trim() == "" || input.trim() in _countries.COUNTRY_CODES) {
        this.hide();
        return;
      }

      this.matches = this.fuse.search(input).map(function (x) {
        return x.item;
      }).splice(0, this.maxLength);
      this.render();
    }
  }]);

  return SuggestionsHandler;
}();

exports.SuggestionsHandler = SuggestionsHandler;