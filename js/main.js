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

var openEditingForm = function () {
  imageEditingForm.classList.remove('hidden');
  scaleControlValue.value = '100%';
  imagePreview.style = '';

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      closeEditingForm();
    }
  });
};

var closeEditingForm = function () {
  imageEditingForm.classList.add('hidden');
  uploadFileInput.value = '';
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
  imagePreview.style = 'transform: scale(' + scaleValue + ')';
};

var users = createArrayOfUsers(NUMBER_OF_USERS);
var photos = createArrayOfPhotos(NUMBER_OF_PHOTOS);

document.querySelector('.pictures').appendChild(createFragment(photos));

var imageEditingForm = document.querySelector('.img-upload__overlay');
var uploadFileInput = document.querySelector('#upload-file');
var closeButton = document.querySelector('#upload-cancel');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imagePreview = document.querySelector('.img-upload__preview');

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
