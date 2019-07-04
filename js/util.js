'use strict';

(function () {
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
    getRandomIntBetween: getRandomIntBetween,
    withdrawRandomArrayItem: withdrawRandomArrayItem,
    getRandomArrayItem: getRandomArrayItem
  };
})();
