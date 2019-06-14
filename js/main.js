'use strict';

var NUMBER_OF_PHOTOS = 25;
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

var users = createArrayOfUsers(NUMBER_OF_USERS);

var getRandomMessage = function () {
  return MESSAGES[getRandomIntBetween(0, MESSAGES.length - 1)];
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
    arrayOfComments.push(createComment(users[getRandomIntBetween(0, users.length - 1)], getRandomMessage()));
  }

  return arrayOfComments;
};

var createPhoto = function (i) {
  var photo = {
    url: 'photos/i.jpg'.replace('i', i),
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

var photos = createArrayOfPhotos(NUMBER_OF_PHOTOS);

var pictureTemplate = document.querySelector('#picture').content.querySelector('a');

var renderPicture = function (photo, template) {
  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector('img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

photos.forEach(function (elem) {
  fragment.appendChild(renderPicture(elem, pictureTemplate));
});

document.querySelector('.pictures').appendChild(fragment);
