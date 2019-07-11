'use strict';

(function () {
  var mainBlock = document.querySelector('main');

  var showSuccess = function () {
    var successMessage = document.querySelector('#success')
    .content.querySelector('.success').cloneNode(true);
    var successMessageCloseButton = successMessage.querySelector('.success__button');

    var onSuccessMessageCloseButtonClick = function () {
      closeSuccessMessage();
    };

    var onSuccessMessageEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEY_CODE) {
        closeSuccessMessage();
      }
    };

    var onSuccessMessageClick = function (evt) {
      if (evt.target === successMessage) {
        closeSuccessMessage();
      }
    };

    var closeSuccessMessage = function () {
      successMessageCloseButton.removeEventListener('click', onSuccessMessageCloseButtonClick);
      document.removeEventListener('keydown', onSuccessMessageEscPress);
      document.removeEventListener('click', onSuccessMessageClick);

      mainBlock.removeChild(successMessage);
    };

    successMessageCloseButton.addEventListener('click', onSuccessMessageCloseButtonClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);

    mainBlock.appendChild(successMessage);
  };

  var showError = function (text) {
    var errorMessage = document.querySelector('#error')
    .content.querySelector('.error').cloneNode(true);

    var errorMessageCloseButtons = errorMessage.querySelectorAll('.error__button');

    var onErrorMessageEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEY_CODE) {
        closeErrorMessage();
      }
    };

    var onErrorMessageClick = function (evt) {
      if (evt.target === errorMessage) {
        closeErrorMessage();
      }
    };

    var closeErrorMessage = function () {
      errorMessageCloseButtons.forEach(function (elem) {
        elem.removeEventListener('click', closeErrorMessage);
      });
      document.removeEventListener('keydown', onErrorMessageEscPress);
      document.removeEventListener('click', onErrorMessageClick);

      mainBlock.removeChild(errorMessage);
    };

    errorMessage.querySelector('.error__title').textContent = text;

    errorMessageCloseButtons.forEach(function (elem) {
      elem.addEventListener('click', closeErrorMessage);
    });
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorMessageClick);

    mainBlock.appendChild(errorMessage);
  };

  var showLoading = function () {
    var loadingMessage = document.querySelector('#messages')
    .content.querySelector('.img-upload__message--loading').cloneNode(true);
    mainBlock.appendChild(loadingMessage);
  };

  var hideLoading = function () {
    var loadingMessage = document.querySelector('main .img-upload__message--loading');
    mainBlock.removeChild(loadingMessage);
  };

  window.messages = {
    showSuccess: showSuccess,
    showError: showError,
    showLoading: showLoading,
    hideLoading: hideLoading
  };
})();
