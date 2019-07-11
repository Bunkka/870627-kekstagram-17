'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };
  var DEFAULT_TIMEOUT = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = DEFAULT_TIMEOUT;

    var onXhrLoad = function () {
      var errorMessage = '';
      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.BAD_REQUEST:
          errorMessage = 'ОШИБКА! Неверный запрос! (400)';
          break;
        case Code.UNAUTHORIZED:
          errorMessage = 'ОШИБКА! Пользователь не авторизован! (401)';
          break;
        case Code.NOT_FOUND:
          errorMessage = 'ОШИБКА! Файл не найден! (404)';
          break;
        case Code.SERVER_ERROR:
          errorMessage = 'ОШИБКА! На сервере произошла ошибка! (500)';
          break;
        default:
          errorMessage = 'ОШИБКА! Статус ошибки: ' + xhr.status;
      }
      if (errorMessage) {
        onError(errorMessage);
      }
    };

    xhr.addEventListener('load', onXhrLoad);

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' миллисекунд!');
    });

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var save = function () {

  };

  window.backend = {
    load: load,
    save: save
  };
})();
