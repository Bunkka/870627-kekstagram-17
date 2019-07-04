'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var SCALE_STEP = 25;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;

  var uploadFileInput = document.querySelector('#upload-file');

  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var closeButton = imageEditingForm.querySelector('#upload-cancel');
  var scaleControlSmaller = imageEditingForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = imageEditingForm.querySelector('.scale__control--bigger');
  var scaleControlValue = imageEditingForm.querySelector('.scale__control--value');
  var imagePreviewContainer = imageEditingForm.querySelector('.img-upload__preview');
  var imagePreview = imagePreviewContainer.querySelector('img');

  var effectLevelField = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevelField.querySelector('.effect-level__pin');
  var effectLevelValue = effectLevelField.querySelector('.effect-level__value');
  var effectLevelLine = effectLevelField.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevelField.querySelector('.effect-level__depth');

  var effectsField = document.querySelector('.img-upload__effects');
  var effectNoneRadio = effectsField.querySelector('#effect-none');
  var effectChromeRadio = effectsField.querySelector('#effect-chrome');
  var effectSepiaRadio = effectsField.querySelector('#effect-sepia');
  var effectMarvinRadio = effectsField.querySelector('#effect-marvin');
  var effectPhobosRadio = effectsField.querySelector('#effect-phobos');
  var effectHeatRadio = effectsField.querySelector('#effect-heat');

  var commentField = document.querySelector('.text__description');

  var openEditingForm = function () {
    imageEditingForm.classList.remove('hidden');
    scaleControlValue.value = MAX_SCALE_VALUE + '%';
    imagePreviewContainer.style = '';
    imagePreview.style = '';
    effectNoneRadio.checked = true;
    effectLevelField.classList.add('hidden');
    document.addEventListener('keydown', onEditingFormEscPress);
    closeButton.addEventListener('click', onCloseButtonClick);
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    effectNoneRadio.addEventListener('change', onEffectNoneRadioChange);
    effectChromeRadio.addEventListener('change', onEffectChromeRadioChange);
    effectSepiaRadio.addEventListener('change', onEffectSepiaRadioChange);
    effectMarvinRadio.addEventListener('change', onEffectMarvinRadioChange);
    effectPhobosRadio.addEventListener('change', onEffectPhobosRadioChange);
    effectHeatRadio.addEventListener('change', onEffectHeatRadioChange);
    effectLevelPin.addEventListener('mousedown', onEffectLevelPinMousedown);
    commentField.addEventListener('focus', onCommentFieldFocus);
    commentField.addEventListener('blur', onCommentFieldBlur);
    commentField.addEventListener('invalid', onCommentFieldInvalid);
  };

  var closeEditingForm = function () {
    imageEditingForm.classList.add('hidden');
    uploadFileInput.value = '';
    removeEffectsClasses(imagePreviewContainer);
    document.removeEventListener('keydown', onEditingFormEscPress);
    closeButton.removeEventListener('click', onCloseButtonClick);
    scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
    effectNoneRadio.removeEventListener('change', onEffectNoneRadioChange);
    effectChromeRadio.removeEventListener('change', onEffectChromeRadioChange);
    effectSepiaRadio.removeEventListener('change', onEffectSepiaRadioChange);
    effectMarvinRadio.removeEventListener('change', onEffectMarvinRadioChange);
    effectPhobosRadio.removeEventListener('change', onEffectPhobosRadioChange);
    effectHeatRadio.removeEventListener('change', onEffectHeatRadioChange);
    effectLevelPin.removeEventListener('mousedown', onEffectLevelPinMousedown);
    commentField.removeEventListener('focus', onCommentFieldFocus);
    commentField.removeEventListener('blur', onCommentFieldBlur);
    commentField.removeEventListener('invalid', onCommentFieldInvalid);
  };

  var scaleImage = function (percents) {
    var scaleValue = percents / 100;
    imagePreview.style.transform = 'scale(' + scaleValue + ')';
  };

  var reduceImageScale = function () {
    var scaleControlValueInt = parseInt(scaleControlValue.value, 10);
    scaleControlValueInt -= SCALE_STEP;
    if (scaleControlValueInt < MIN_SCALE_VALUE) {
      scaleControlValueInt = MIN_SCALE_VALUE;
    }
    scaleControlValue.value = scaleControlValueInt + '%';
    scaleImage(scaleControlValueInt);
  };

  var increaseImageScale = function () {
    var scaleControlValueInt = parseInt(scaleControlValue.value, 10);
    scaleControlValueInt += SCALE_STEP;
    if (scaleControlValueInt > MAX_SCALE_VALUE) {
      scaleControlValueInt = MAX_SCALE_VALUE;
    }
    scaleControlValue.value = scaleControlValueInt + '%';
    scaleImage(scaleControlValueInt);
  };

  var removeEffectsClasses = function (elem) {
    elem.classList.remove('effects__preview--chrome');
    elem.classList.remove('effects__preview--sepia');
    elem.classList.remove('effects__preview--marvin');
    elem.classList.remove('effects__preview--phobos');
    elem.classList.remove('effects__preview--heat');
  };

  var setFilterNone = function () {
    effectLevelField.classList.add('hidden');
    imagePreviewContainer.style.filter = 'none';
  };

  var setFilterChrome = function (percentIntensity) {
    var intensity = percentIntensity / 100;
    imagePreviewContainer.style.filter = 'grayscale(' + intensity + ')';
  };

  var setFilterSepia = function (percentIntensity) {
    var intensity = percentIntensity / 100;
    imagePreviewContainer.style.filter = 'sepia(' + intensity + ')';
  };

  var setFilterMarvin = function (percentIntensity) {
    var intensity = percentIntensity + '%';
    imagePreviewContainer.style.filter = 'invert(' + intensity + ')';
  };

  var setFilterPhobos = function (percentIntensity) {
    var intensity = percentIntensity / 100 * 3 + 'px';
    imagePreviewContainer.style.filter = 'blur(' + intensity + ')';
  };

  var setFilterHeat = function (percentIntensity) {
    var intensity = percentIntensity / 100 * 2 + 1;
    imagePreviewContainer.style.filter = 'brightness(' + intensity + ')';
  };

  var setEffectLevel = function () {
    switch (effectsField.querySelector('input:checked').value) {
      case 'chrome':
        setFilterChrome(effectLevelValue.value);
        break;
      case 'sepia':
        setFilterSepia(effectLevelValue.value);
        break;
      case 'marvin':
        setFilterMarvin(effectLevelValue.value);
        break;
      case 'phobos':
        setFilterPhobos(effectLevelValue.value);
        break;
      case 'heat':
        setFilterHeat(effectLevelValue.value);
        break;
    }
  };

  var setPinToDefault = function () {
    effectLevelField.classList.remove('hidden');
    effectLevelPin.style.left = effectLevelLine.clientWidth + 'px';
    effectLevelDepth.style.width = '100%';
    effectLevelValue.value = 100;
  };

  var onUploadFileInputChange = function () {
    openEditingForm();
  };

  var onEditingFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      closeEditingForm();
    }
  };

  var onCloseButtonClick = function () {
    closeEditingForm();
  };

  var onScaleControlSmallerClick = function () {
    reduceImageScale();
  };

  var onScaleControlBiggerClick = function () {
    increaseImageScale();
  };

  var onEffectNoneRadioChange = function () {
    removeEffectsClasses(imagePreviewContainer);
    setFilterNone();
  };

  var onEffectChromeRadioChange = function () {
    removeEffectsClasses(imagePreviewContainer);
    imagePreviewContainer.classList.add('effects__preview--chrome');
    setPinToDefault();
    setEffectLevel();
  };

  var onEffectSepiaRadioChange = function () {
    removeEffectsClasses(imagePreviewContainer);
    imagePreviewContainer.classList.add('effects__preview--sepia');
    setPinToDefault();
    setEffectLevel();
  };

  var onEffectMarvinRadioChange = function () {
    removeEffectsClasses(imagePreviewContainer);
    imagePreviewContainer.classList.add('effects__preview--marvin');
    setPinToDefault();
    setEffectLevel();
  };

  var onEffectPhobosRadioChange = function () {
    removeEffectsClasses(imagePreviewContainer);
    imagePreviewContainer.classList.add('effects__preview--phobos');
    setPinToDefault();
    setEffectLevel();
  };

  var onEffectHeatRadioChange = function () {
    removeEffectsClasses(imagePreviewContainer);
    imagePreviewContainer.classList.add('effects__preview--heat');
    setPinToDefault();
    setEffectLevel();
  };

  var onEffectLevelPinMousedown = function (downEvt) {
    downEvt.preventDefault();

    var startCoordX = downEvt.clientX;
    var offsetLeft = effectLevelPin.offsetLeft;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX - moveEvt.clientX;
      offsetLeft = offsetLeft - shiftX;
      startCoordX = moveEvt.clientX;

      if (offsetLeft < 0) {
        effectLevelPin.style.left = 0;
      } else if (offsetLeft > effectLevelLine.clientWidth) {
        effectLevelPin.style.left = effectLevelLine.clientWidth + 'px';
      } else {
        effectLevelPin.style.left = offsetLeft + 'px';
      }

      effectLevelDepth.style.width = parseInt(effectLevelPin.style.left, 10) / effectLevelLine.clientWidth * 100 + '%';
      effectLevelValue.value = parseInt(effectLevelPin.style.left, 10) / effectLevelLine.clientWidth * 100 + '';

      setEffectLevel();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onCommentFieldFocus = function () {
    document.removeEventListener('keydown', onEditingFormEscPress);
  };

  var onCommentFieldBlur = function () {
    document.addEventListener('keydown', onEditingFormEscPress);
  };

  var onCommentFieldInvalid = function () {
    if (commentField.validity.tooLong) {
      commentField.setCustomValidity('Имя не должно превышать 140 символов');
    }
  };

  uploadFileInput.addEventListener('change', onUploadFileInputChange);
})();
