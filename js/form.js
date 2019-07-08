'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var SCALE_STEP = 25;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;

  var uploadForm = document.querySelector('.img-upload__form');

  var uploadFileInput = uploadForm.querySelector('#upload-file');

  var imageEditingForm = uploadForm.querySelector('.img-upload__overlay');
  var closeButton = imageEditingForm.querySelector('#upload-cancel');
  var scaleControlSmaller = imageEditingForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = imageEditingForm.querySelector('.scale__control--bigger');
  var scaleControlValue = imageEditingForm.querySelector('.scale__control--value');
  var imagePreviewContainer = imageEditingForm.querySelector('.img-upload__preview');
  var imagePreview = imagePreviewContainer.querySelector('img');

  var effectLevelField = imageEditingForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevelField.querySelector('.effect-level__pin');
  var effectLevelValue = effectLevelField.querySelector('.effect-level__value');
  var effectLevelLine = effectLevelField.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevelField.querySelector('.effect-level__depth');

  var effectsField = imageEditingForm.querySelector('.img-upload__effects');
  var effectNoneRadio = effectsField.querySelector('#effect-none');
  var effectChromeRadio = effectsField.querySelector('#effect-chrome');
  var effectSepiaRadio = effectsField.querySelector('#effect-sepia');
  var effectMarvinRadio = effectsField.querySelector('#effect-marvin');
  var effectPhobosRadio = effectsField.querySelector('#effect-phobos');
  var effectHeatRadio = effectsField.querySelector('#effect-heat');

  var commentField = imageEditingForm.querySelector('.text__description');

  var openEditingForm = function () {
    imageEditingForm.classList.remove('hidden');
    scaleControlValue.value = MAX_SCALE_VALUE + '%';
    imagePreviewContainer.style = '';
    imagePreview.style = '';
    effectNoneRadio.checked = true;
    effectLevelField.classList.add('hidden');
    listenersMapings.forEach(function (elem) {
      elem.element.addEventListener(elem.event, elem.listener);
    });
  };

  var closeEditingForm = function () {
    imageEditingForm.classList.add('hidden');
    uploadFileInput.value = '';
    removeEffectsClasses(imagePreviewContainer);
    listenersMapings.forEach(function (elem) {
      elem.element.removeEventListener(elem.event, elem.listener);
    });
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

  var invokeEffects = {
    chrome: setFilterChrome,
    sepia: setFilterSepia,
    marvin: setFilterMarvin,
    phobos: setFilterPhobos,
    heat: setFilterHeat
  };

  var setEffectLevel = function () {
    var setEffect = invokeEffects[effectsField.querySelector('input:checked').value];
    setEffect(effectLevelValue.value);
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
      commentField.setCustomValidity('Текст не должен превышать 140 символов');
    } else {
      commentField.setCustomValidity('');
    }
  };

  var listenersMapings = [
    {element: document, event: 'keydown', listener: onEditingFormEscPress},
    {element: closeButton, event: 'click', listener: onCloseButtonClick},
    {element: scaleControlSmaller, event: 'click', listener: onScaleControlSmallerClick},
    {element: scaleControlBigger, event: 'click', listener: onScaleControlBiggerClick},
    {element: effectNoneRadio, event: 'change', listener: onEffectNoneRadioChange},
    {element: effectChromeRadio, event: 'change', listener: onEffectChromeRadioChange},
    {element: effectSepiaRadio, event: 'change', listener: onEffectSepiaRadioChange},
    {element: effectMarvinRadio, event: 'change', listener: onEffectMarvinRadioChange},
    {element: effectPhobosRadio, event: 'change', listener: onEffectPhobosRadioChange},
    {element: effectHeatRadio, event: 'change', listener: onEffectHeatRadioChange},
    {element: effectLevelPin, event: 'mousedown', listener: onEffectLevelPinMousedown},
    {element: commentField, event: 'focus', listener: onCommentFieldFocus},
    {element: commentField, event: 'blur', listener: onCommentFieldBlur},
    {element: commentField, event: 'invalid', listener: onCommentFieldInvalid}
  ];

  uploadFileInput.addEventListener('change', onUploadFileInputChange);
})();
