(function() {
  'use strict';
  tamia.initComponents({
    flippable: function(container) {
      var toggle;
      toggle = function() {
        return ($(this)).toggleClass('is-flipped');
      };
      container = $(container);
      (container.find('.js-flip')).click(toggle);
      if (container.is('.js-flip')) {
        return container.click(toggle);
      }
    }
  });

}).call(this);
