(function() {
  'use strict';
  var supported;

  supported = void 0;

  jQuery.prototype.tamiaPassword = function() {
    if (supported === void 0) {
      supported = (((jQuery('<b>')).html('<!--[if lte IE 8]><i></i><![endif]-->')).find('i')).length !== 1;
    }
    if (!supported) {
      return this;
    }
    return this.each(function() {
      var container, field, locked, lockedType, toggle, unlockedClass, unlockedType;

      container = jQuery(this);
      unlockedClass = 'is-unlocked';
      lockedType = 'password';
      unlockedType = 'text';
      toggle = container.find('.password__toggle');
      field = container.find('.password__field');
      locked = !container.hasClass(unlockedClass);
      container.addClass('is-ok');
      return toggle.mousedown(function() {
        var fieldType, focused;

        focused = document.activeElement === field[0];
        locked = !locked;
        fieldType = field.attr('type');
        container.toggleClass(unlockedClass, !locked);
        if (fieldType === lockedType && !locked) {
          field.attr('type', unlockedType);
        } else if (fieldType === unlockedType && locked) {
          field.attr('type', lockedType);
        }
        if (focused) {
          return setTimeout((function() {
            return field.focus();
          }), 0);
        }
      });
    });
  };

  utils.initComponents({
    password: {
      tamiaPassword: void 0
    }
  });

}).call(this);
