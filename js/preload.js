// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', function () {
  var replaceText = function replaceText(selector, text) {
    var element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
});