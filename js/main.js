'use strict';

var NUMBER_OF_PHOTOS = 25;
var PHOTO_URL_TEMPLATE = 'photos/{index}.jpg';
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
var NAMES = ['Артем', 'Вася', 'Иннокентий', 'Юлька', 'Маша', 'Василиса'];
var NUMBER_OF_USERS = 6;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var MAX_COMMENTS = 2;
var ESC_KEY_CODE = 27;
var SCALE_STEP = 25;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var MAX_PERCENT_INSTENSITY = 100;

var getRandomIntBetween = function (min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
};

var createUser = function (avatar, name) {
  var user = {
    avatar: avatar,
    name: name
  };

  return user;
};

var createArrayOfUsers = function (number) {
  var arrayOfUsers = [];
  var arrayOfAvatars = AVATARS.slice();
  var arrayOfNames = NAMES.slice();
  for (var i = 0; i < number; i++) {
    var randomAvatar = arrayOfAvatars.splice(getRandomIntBetween(0, arrayOfAvatars.length - 1), 1)[0];
    var randomName = arrayOfNames.splice(getRandomIntBetween(0, arrayOfNames.length - 1), 1)[0];
    arrayOfUsers.push(createUser(randomAvatar, randomName));
  }

  return arrayOfUsers;
};

var getRandomElement = function (arr) {
  return arr[getRandomIntBetween(0, arr.length - 1)];
};

var createComment = function (user, message) {
  var comment = {
    avatar: user.avatar,
    message: message,
    name: user.name
  };

  return comment;
};

var createArrayOfComments = function (number) {
  var arrayOfComments = [];
  for (var i = 0; i < number; i++) {
    arrayOfComments.push(createComment(users[getRandomIntBetween(0, users.length - 1)], getRandomElement(MESSAGES)));
  }

  return arrayOfComments;
};

var createPhoto = function (index) {
  var photo = {
    url: PHOTO_URL_TEMPLATE.replace('{index}', index),
    likes: getRandomIntBetween(MIN_LIKES, MAX_LIKES),
    comments: createArrayOfComments(getRandomIntBetween(0, MAX_COMMENTS))
  };

  return photo;
};

var createArrayOfPhotos = function (number) {
  var arrayOfIndexes = [];
  for (var i = 1; i <= number; i++) {
    arrayOfIndexes.push(i);
  }

  var arrayOfRandomIndexes = [];
  for (var j = 0; j < number; j++) {
    arrayOfRandomIndexes.push(arrayOfIndexes.splice(getRandomIntBetween(0, arrayOfIndexes.length - 1), 1)[0]);
  }

  var resultArray = [];
  for (var k = 0; k < number; k++) {
    resultArray.push(createPhoto(arrayOfRandomIndexes[k]));
  }

  return resultArray;
};

var renderPicture = function (photo, template) {
  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector('img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

var createFragment = function (arr) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');

  var fragment = document.createDocumentFragment();

  arr.forEach(function (elem) {
    fragment.appendChild(renderPicture(elem, pictureTemplate));
  });

  return fragment;
};

var onEditingFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeEditingForm();
  }
};

var openEditingForm = function () {
  imageEditingForm.classList.remove('hidden');
  scaleControlValue.value = MAX_SCALE_VALUE + '%';
  imagePreview.style = '';
  effectNoneRadio.checked = true;
  effectLevelField.classList.add('hidden');
  document.addEventListener('keydown', onEditingFormEscPress);
};

var closeEditingForm = function () {
  imageEditingForm.classList.add('hidden');
  uploadFileInput.value = '';
  document.removeEventListener('keydown', onEditingFormEscPress);
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

var scaleImage = function (percents) {
  var scaleValue = percents / 100;
  imagePreview.style.transform = 'scale(' + scaleValue + ')';
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

var setFilterNone = function () {
  effectLevelField.classList.add('hidden');
  imagePreview.style.filter = 'none';
};

var setFilterChrome = function (percentIntensity) {
  effectLevelField.classList.remove('hidden');
  var intensity = percentIntensity / 100;
  imagePreview.style.filter = 'grayscale(' + intensity + ')';
};

var setFilterSepia = function (percentIntensity) {
  effectLevelField.classList.remove('hidden');
  var intensity = percentIntensity / 100;
  imagePreview.style.filter = 'sepia(' + intensity + ')';
};

var setFilterMarvin = function (percentIntensity) {
  effectLevelField.classList.remove('hidden');
  var intensity = percentIntensity + '%';
  imagePreview.style.filter = 'invert(' + intensity + ')';
};

var setFilterPhobos = function (percentIntensity) {
  effectLevelField.classList.remove('hidden');
  var intensity = percentIntensity / 100 * 3 + 'px';
  imagePreview.style.filter = 'blur(' + intensity + ')';
};

var setFilterHeat = function (percentIntensity) {
  effectLevelField.classList.remove('hidden');
  var intensity = percentIntensity / 100 * 2 + 1;
  imagePreview.style.filter = 'brightness(' + intensity + ')';
};

var users = createArrayOfUsers(NUMBER_OF_USERS);
var photos = createArrayOfPhotos(NUMBER_OF_PHOTOS);

document.querySelector('.pictures').appendChild(createFragment(photos));

var uploadFileInput = document.querySelector('#upload-file');

var imageEditingForm = document.querySelector('.img-upload__overlay');
var closeButton = imageEditingForm.querySelector('#upload-cancel');
var scaleControlSmaller = imageEditingForm.querySelector('.scale__control--smaller');
var scaleControlBigger = imageEditingForm.querySelector('.scale__control--bigger');
var scaleControlValue = imageEditingForm.querySelector('.scale__control--value');
var imagePreview = imageEditingForm.querySelector('.img-upload__preview');

var effectLevelField = document.querySelector('.img-upload__effect-level');
var effectLevelPin = effectLevelField.querySelector('.effect-level__pin');
var effectLevelValue = effectLevelField.querySelector('.effect-level__value');

var effectsField = document.querySelector('.img-upload__effects');
var effectNoneRadio = effectsField.querySelector('#effect-none');
var effectChromeRadio = effectsField.querySelector('#effect-chrome');
var effectSepiaRadio = effectsField.querySelector('#effect-sepia');
var effectMarvinRadio = effectsField.querySelector('#effect-marvin');
var effectPhobosRadio = effectsField.querySelector('#effect-phobos');
var effectHeatRadio = effectsField.querySelector('#effect-heat');

uploadFileInput.addEventListener('change', function () {
  openEditingForm();
});

closeButton.addEventListener('click', function () {
  closeEditingForm();
});

scaleControlSmaller.addEventListener('click', function () {
  reduceImageScale();
});

scaleControlBigger.addEventListener('click', function () {
  increaseImageScale();
});

effectLevelPin.addEventListener('mouseup', function () {
  setEffectLevel();
});

effectNoneRadio.addEventListener('change', function () {
  setFilterNone();
});

effectChromeRadio.addEventListener('change', function () {
  setFilterChrome(MAX_PERCENT_INSTENSITY);
});

effectSepiaRadio.addEventListener('change', function () {
  setFilterSepia(MAX_PERCENT_INSTENSITY);
});

effectMarvinRadio.addEventListener('change', function () {
  setFilterMarvin(MAX_PERCENT_INSTENSITY);
});

effectPhobosRadio.addEventListener('change', function () {
  setFilterPhobos(MAX_PERCENT_INSTENSITY);
});

effectHeatRadio.addEventListener('change', function () {
  setFilterHeat(MAX_PERCENT_INSTENSITY);
});
