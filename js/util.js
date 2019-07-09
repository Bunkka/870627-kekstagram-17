'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  var getRandomIntBetween = function (min, max) {
    return Math.floor(min + (max - min + 1) * Math.random());
  };

  var withdrawRandomArrayItem = function (arr) {
    return arr.splice(getRandomIntBetween(0, arr.length - 1), 1)[0];
  };

  var getRandomArrayItem = function (arr) {
    return arr[getRandomIntBetween(0, arr.length - 1)];
  };

  window.util = {
    ESC_KEY_CODE: ESC_KEY_CODE,
    getRandomIntBetween: getRandomIntBetween,
    withdrawRandomArrayItem: withdrawRandomArrayItem,
    getRandomArrayItem: getRandomArrayItem
  };
})();
