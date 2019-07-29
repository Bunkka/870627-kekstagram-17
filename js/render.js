'use strict';

(function () {
  var NEW_PHOTOS_COUNT = 10;
  var BASE_COMMENTS_COUNT = 5;

  var picturesContainer = document.querySelector('.pictures');
  var filtersContainer = document.querySelector('.img-filters');
  var filterPopular = filtersContainer.querySelector('#filter-popular');
  var filterNew = filtersContainer.querySelector('#filter-new');
  var filterDiscussed = filtersContainer.querySelector('#filter-discussed');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPicture.querySelector('#picture-cancel');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var socialComments = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentTemplate = socialComments.querySelector('.social__comment');

  var downloadedPhotos = [];

  var renderPicture = function (photo, template) {
    var pictureElement = template.cloneNode(true);

    var onPictureElementClick = function () {
      var closeBigPicture = function () {
        document.querySelector('body').classList.remove('modal-open');
        bigPicture.classList.add('hidden');
        commentsLoader.classList.remove('hidden');
        commentsLoader.removeEventListener('click', onCommentsLoaderClick);
        bigPictureCloseButton.removeEventListener('click', onBigPictureCloseButtonClick);
        document.removeEventListener('keydown', onBigPictureEscPress);
      };

      var onBigPictureCloseButtonClick = function () {
        closeBigPicture();
      };

      var onBigPictureEscPress = function (evt) {
        if (evt.keyCode === window.util.ESC_KEY_CODE) {
          closeBigPicture();
        }
      };

      var showedCommentsCount = 0;
      var commentsForShow = [];

      var addComments = function () {
        var createFragmentOfComments = function (arr) {
          var fragment = document.createDocumentFragment();

          arr.forEach(function (elem) {
            var newComment = commentTemplate.cloneNode(true);

            newComment.querySelector('.social__picture').src = elem.avatar;
            newComment.querySelector('.social__text').textContent = elem.message;

            fragment.appendChild(newComment);

            showedCommentsCount++;
          });

          return fragment;
        };

        commentsForShow = photo.comments.slice(showedCommentsCount, showedCommentsCount + BASE_COMMENTS_COUNT);

        socialComments.appendChild(createFragmentOfComments(commentsForShow));

        socialCommentsCount.textContent = showedCommentsCount + ' из ' + photo.comments.length + ' комментариев';

        if (showedCommentsCount >= photo.comments.length) {
          commentsLoader.classList.add('hidden');
        }
      };

      var onCommentsLoaderClick = function () {
        addComments();
      };

      document.querySelector('body').classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
      document.addEventListener('keydown', onBigPictureEscPress);
      commentsLoader.addEventListener('click', onCommentsLoaderClick);

      bigPictureImg.src = photo.url;
      bigPictureLikesCount.textContent = photo.likes;
      bigPictureDescription.textContent = photo.description;

      socialComments.querySelectorAll('li').forEach(function (elem) {
        elem.remove();
      });

      addComments();
    };

    pictureElement.querySelector('img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureElement.addEventListener('click', onPictureElementClick);

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

  var clearPicturesContainer = function () {
    var picturesInContainer = picturesContainer.querySelectorAll('a.picture');
    picturesInContainer.forEach(function (elem) {
      elem.remove();
    });
  };

  var renderPhotos = function (photos) {
    clearPicturesContainer();
    picturesContainer.appendChild(createFragmentOfPictures(photos));
  };

  var removeActiveClass = function () {
    filtersContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  };

  var onFilterPopularClick = function () {
    removeActiveClass();
    filterPopular.classList.add('img-filters__button--active');

    window.throttle(function () {
      renderPhotos(downloadedPhotos);
    });
  };

  var onFilterNewClick = function () {
    removeActiveClass();
    filterNew.classList.add('img-filters__button--active');

    window.throttle(function () {
      var downloadedPhotosCopy = downloadedPhotos.slice();
      var sortedPhotos = [];
      for (var i = 0; i < NEW_PHOTOS_COUNT; i++) {
        sortedPhotos.push(window.util.withdrawRandomArrayItem(downloadedPhotosCopy));
      }
      renderPhotos(sortedPhotos);
    });
  };

  var onFilterDiscussedClick = function () {
    removeActiveClass();
    filterDiscussed.classList.add('img-filters__button--active');

    window.throttle(function () {
      var sortedPhotos = downloadedPhotos.slice();
      sortedPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      renderPhotos(sortedPhotos);
    });
  };

  var onLoadPhotosSuccess = function (photos) {
    downloadedPhotos = photos;
    renderPhotos(downloadedPhotos);
    filtersContainer.classList.remove('img-filters--inactive');
    filterPopular.addEventListener('click', onFilterPopularClick);
    filterNew.addEventListener('click', onFilterNewClick);
    filterDiscussed.addEventListener('click', onFilterDiscussedClick);
  };

  var onLoadPhotosError = function (errorText) {
    window.messages.showError(errorText);
  };

  window.backend.load(onLoadPhotosSuccess, onLoadPhotosError);
})();
