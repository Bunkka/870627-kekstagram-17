'use strict';

(function () {
  var renderPicture = function (photo, template) {
    var pictureElement = template.cloneNode(true);

    pictureElement.querySelector('img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  var createFragmentOfPictures = function (arr) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
    var fragment = document.createDocumentFragment();

    arr.forEach(function (elem) {
      fragment.appendChild(renderPicture(elem, pictureTemplate));
    });

    return fragment;
  };

  var onLoadPhotosSuccess = function (photos) {
    document.querySelector('.pictures').appendChild(createFragmentOfPictures(photos));
  };

  var onLoadPhotosError = function () {
    onLoadPhotosSuccess(window.data.photos);
  };

  window.backend.load(onLoadPhotosSuccess, onLoadPhotosError);
})();
