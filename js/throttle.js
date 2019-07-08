'use strict';
(function () {
  var THROTTLING_INTERVAL = 500;

  var isThrottle = false;
  var params = null;

  var throttle = function (cb) {
    if (isThrottle) {
      params = arguments;
    } else {
      cb.apply(null, arguments);
      isThrottle = true;
      setTimeout(function () {
        isThrottle = false;
        if (params) {
          throttle.apply(null, params);
          params = null;
        }
      }, THROTTLING_INTERVAL);
    }
  };

  window.throttle = throttle;
})();
