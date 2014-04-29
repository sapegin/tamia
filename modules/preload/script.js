(function() {
  'use strict';
  var $, parse, preload;

  $ = jQuery;

  preload = function(images, callback) {
    var counter, done, errors, image, imageIdx, img, _i, _len, _results;
    done = function() {
      counter--;
      if (!counter) {
        return callback(errors.length ? errors : null);
      }
    };
    images = parse(images);
    counter = images.length;
    errors = [];
    _results = [];
    for (imageIdx = _i = 0, _len = images.length; _i < _len; imageIdx = ++_i) {
      image = images[imageIdx];
      img = new Image();
      img.onload = done;
      img.onerror = function() {
        errors.push(this.src);
        return done();
      };
      _results.push(img.src = image);
    }
    return _results;
  };

  parse = function(images) {
    if (!$.isArray(images)) {
      images = [images];
    }
    return images;
  };

  tamia.preload = preload;

}).call(this);
