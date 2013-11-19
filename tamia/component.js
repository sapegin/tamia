(function() {
  'use strict';
  var $, Component,
    __slice = [].slice;

  $ = jQuery;

  Component = (function() {
    function Component(elem) {
      if (!elem || elem.nodeType !== 1) {
        throw new ReferenceError('No DOM node passed to Component constructor.');
      }
      this.elemNode = elem;
      this.elem = $(elem);
      this.initializable = this.isInitializable();
      if (!this.initializable) {
        return;
      }
      this._fillStates();
      if (this.isSupported()) {
        this.handlers = {};
        this.init();
        this.addState('ok');
      } else {
        this.fallback();
        this.addState('unsupported');
      }
    }

    Component.prototype.init = function() {};

    Component.prototype.destroy = function() {};

    Component.prototype.isSupported = function() {
      return true;
    };

    Component.prototype.isInitializable = function() {
      return true;
    };

    Component.prototype.fallback = function() {};

    Component.prototype.find = function(name) {
      return this.elem.find(".js-" + name).first();
    };

    Component.prototype.on = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._toggleEvent.apply(this, ['on'].concat(__slice.call(args)));
    };

    Component.prototype.off = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._toggleEvent.apply(this, ['off'].concat(__slice.call(args)));
    };

    Component.prototype.hasState = function(name) {
      return !!this.states[name];
    };

    Component.prototype.addState = function(name, callback) {
      if (callback == null) {
        callback = void 0;
      }
      return this.toggleState(name, true);
    };

    Component.prototype.removeState = function(name, callback) {
      if (callback == null) {
        callback = void 0;
      }
      return this.toggleState(name, false);
    };

    Component.prototype.toggleState = function(name, value) {
      if (value == null) {
        value = !this.states[name];
      }
      this.states[name] = value;
      return this._updateStates();
    };

    Component.prototype.isVisible = function() {
      return !!(this.elemNode.offsetWidth || this.elemNode.offsetHeight);
    };

    Component.prototype._toggleEvent = function() {
      var action, args, func, funcArg, handler, _ref;
      action = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (typeof args[1] === 'string') {
        args[1] = ".js-" + args[1];
      }
      funcArg = args.length - 1;
      func = args[funcArg];
      handler;
      if (this.handlers[func]) {
        handler = this.handlers[func];
      }
      if (action === 'on') {
        if (handler) {
          handler.counter++;
        } else {
          this.handlers[func] = handler = {
            counter: 1,
            func: func.bind(this)
          };
        }
      }
      if (!handler) {
        return;
      }
      args[funcArg] = handler.func;
      (_ref = this.elem)[action].apply(_ref, args);
      if (action === 'off') {
        handler.counter--;
        if (handler.counter <= 0) {
          return this.handlers[func] = null;
        }
      }
    };

    Component.prototype._fillStates = function() {
      var classes, cls, clsName, re, states;
      states = {};
      classes = this.elemNode.className.split(' ');
      for (clsName in classes) {
        cls = classes[clsName];
        re = /^is-/;
        if (re.test(cls)) {
          states[cls.replace(re, '')] = true;
        }
      }
      return this.states = states;
    };

    Component.prototype._updateStates = function() {
      var classes, name;
      classes = this.elemNode.className;
      classes = $.trim(classes.replace(/\bis-[-\w]+/g, ''));
      classes = classes.split(/\s+/);
      for (name in this.states) {
        if (this.states[name]) {
          classes.push("is-" + name);
        }
      }
      return this.elemNode.className = classes.join(' ');
    };

    return Component;

  })();

  Component.__tamia_cmpnt__ = true;

  window.Component = Component;

}).call(this);
