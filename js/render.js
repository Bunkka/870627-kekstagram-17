'use strict';

(function () {
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

  document.querySelector('.pictures').appendChild(createFragment(window.data.photos));
})();
