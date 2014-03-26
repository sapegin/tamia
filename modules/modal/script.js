(function() {
  'use strict';
  var $, Modal, _body, _bodyClass, _doc, _hiddenClass, _opened, _ref, _switchingClass, _wrapperTmpl,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  _body = $('body');

  _doc = $(document);

  _bodyClass = 'modal-opened';

  _switchingClass = 'is-switching';

  _hiddenClass = 'is-hidden';

  _wrapperTmpl = '<div class="modal-shade is-hidden">\n	<div class="l-center">\n		<div class="l-center-i js-modal"></div>\n	</div>\n</div>';

  _opened = null;

  Modal = (function(_super) {
    __extends(Modal, _super);

    function Modal() {
      _ref = Modal.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Modal.prototype.init = function() {
      this.elem.data('modal', this);
      this.on('click', 'modal-commit', this.commit);
      this.on('click', 'modal-dismiss', this.dismiss);
      this.keyup_ = this.keyup.bind(this);
      if (this.elem.data('modal-open')) {
        return this.open();
      }
    };

    Modal.prototype.initHtml = function() {
      if (this.wrapper) {
        return;
      }
      this.wrapper = $(_wrapperTmpl);
      this.wrapper.find('.js-modal').append(this.elem);
      this.wrapper.on('click', this.shadeClick.bind(this));
      _body.append(this.wrapper);
      return this.removeState('hidden');
    };

    Modal.prototype.open = function() {
      var hide, opened,
        _this = this;
      if (this === _opened) {
        return;
      }
      opened = _opened;
      this.initHtml();
      _body.addClass(_bodyClass);
      if (opened) {
        opened.close(hide = true);
        this.wrapper.addClass(_switchingClass);
        this.wrapper.on('appeared.tamia', function() {
          _this.wrapper.removeClass(_switchingClass);
          opened.wrapper.addClass(_hiddenClass);
          return opened.elem.removeClass(_hiddenClass);
        });
      }
      this.wrapper.trigger('appear.tamia');
      _doc.on('keyup', this.keyup_);
      return _opened = this;
    };

    Modal.prototype.close = function(hide) {
      var elem;
      if (hide == null) {
        hide = false;
      }
      elem = hide ? this.elem : this.wrapper;
      elem.trigger('disappear.tamia');
      if (!hide) {
        _body.removeClass(_bodyClass);
      }
      _doc.off('keyup', this.keyup_);
      return _opened = null;
    };

    Modal.prototype.commit = function(event) {
      return this.done(event, 'commit');
    };

    Modal.prototype.dismiss = function(event) {
      return this.done(event, 'dismiss');
    };

    Modal.prototype.done = function(event, type) {
      var typeEvent;
      if (event != null) {
        event.preventDefault();
      }
      typeEvent = $.Event(type + '.modal.tamia');
      this.elem.trigger(typeEvent);
      if (typeEvent.isDefaultPrevented()) {
        return;
      }
      return this.close();
    };

    Modal.prototype.keyup = function(event) {
      if (event.which === 27) {
        return this.dismiss(event);
      }
    };

    Modal.prototype.shadeClick = function(event) {
      if ($(event.target).hasClass('js-modal')) {
        return this.dismiss(event);
      }
    };

    return Modal;

  })(Component);

  tamia.registerEvents({
    'open.modal': function(elem) {
      var container, modal;
      container = $(elem);
      modal = container.data('modal');
      if (!modal) {
        modal = new Modal(elem);
      }
      return modal.open();
    }
  });

}).call(this);
