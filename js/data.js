'use strict';

(function () {
  var AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
  var NAMES = ['Артем', 'Вася', 'Иннокентий', 'Юлька', 'Маша', 'Василиса'];
  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var PHOTO_URL_TEMPLATE = 'photos/{index}.jpg';
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var NUMBER_OF_USERS = 6;
  var MAX_COMMENTS = 15;
  var NUMBER_OF_PHOTOS = 25;

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
      var randomAvatar = window.util.withdrawRandomArrayItem(arrayOfAvatars);
      var randomName = window.util.withdrawRandomArrayItem(arrayOfNames);
      arrayOfUsers.push(createUser(randomAvatar, randomName));
    }

    return arrayOfUsers;
  };

  var createComment = function (user, message) {
    var comment = {
      avatar: user.avatar,
      message: message,
      name: user.name
    };

    return comment;
  };

  var createArrayOfComments = function (number, users) {
    var arrayOfComments = [];
    for (var i = 0; i < number; i++) {
      arrayOfComments.push(createComment(window.util.getRandomArrayItem(users), window.util.getRandomArrayItem(MESSAGES)));
    }

    return arrayOfComments;
  };

  var createPhoto = function (index, users) {
    var photo = {
      url: PHOTO_URL_TEMPLATE.replace('{index}', index),
      likes: window.util.getRandomIntBetween(MIN_LIKES, MAX_LIKES),
      comments: createArrayOfComments(window.util.getRandomIntBetween(0, MAX_COMMENTS), users)
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
      arrayOfRandomIndexes.push(window.util.withdrawRandomArrayItem(arrayOfIndexes));
    }

    var users = createArrayOfUsers(NUMBER_OF_USERS);
    var resultArray = [];
    for (var k = 0; k < number; k++) {
      resultArray.push(createPhoto(arrayOfRandomIndexes[k], users));
    }

    return resultArray;
  };

  var photos = createArrayOfPhotos(NUMBER_OF_PHOTOS);

  window.data = {
    photos: photos
  };
})();
