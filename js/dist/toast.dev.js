"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showToast = showToast;

function showToast(message) {
  var element = document.createElement("div");
  document.body.appendChild(element);
  element.className = "toast";
  element.innerHTML = message;
  setTimeout(function () {
    element.classList.add("full-opacity");
  }, 50);
  setTimeout(function () {
    element.classList.remove("full-opacity");
  }, 2500);
}