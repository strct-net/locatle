"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionsHandler = void 0;

var _fuse = _interopRequireDefault(require("fuse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SuggestionsHandler =
/*#__PURE__*/
function () {
  function SuggestionsHandler(element, suggestionList, inputElement) {
    _classCallCheck(this, SuggestionsHandler);

    this.element = element;
    this.fuse = new _fuse["default"](suggestionList);
    this.inputElement = inputElement;
    this.maxLength = 6;
  }

  _createClass(SuggestionsHandler, [{
    key: "getSelected",
    value: function getSelected() {
      return this.element.children.length > 0 ? this.element.lastChild.innerHTML : "";
    }
  }, {
    key: "hide",
    value: function hide() {
      this.element.innerHTML = "";
    }
  }, {
    key: "update",
    value: function update(input) {
      this.element.innerHTML = "";
      if (input == "") return;
      var matches = this.fuse.search(input).map(function (x) {
        return x.item;
      }).splice(0, this.maxLength).reverse();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

      this.element.style.width = this.inputElement.parentElement.offsetWidth + "px";
      this.element.style.top = this.inputElement.offsetTop - this.element.offsetHeight + "px";
      this.element.style.left = this.inputElement.offsetLeft - 0.5 + "px";
    }
  }]);

  return SuggestionsHandler;
}();

exports.SuggestionsHandler = SuggestionsHandler;