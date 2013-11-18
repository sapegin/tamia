(function() {
  'use strict';
  var Hidden, Test, Unsupported, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Hidden = (function(_super) {
    __extends(Hidden, _super);

    function Hidden() {
      _ref = Hidden.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Hidden.prototype.init = function() {
      return this.addState('pony');
    };

    Hidden.prototype.isInitializable = function() {
      return this.isVisible();
    };

    return Hidden;

  })(Component);

  tamia.initComponents({
    hidden: Hidden
  });

  Unsupported = (function(_super) {
    __extends(Unsupported, _super);

    function Unsupported() {
      _ref1 = Unsupported.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Unsupported.prototype.init = function() {
      return this.addState('pony');
    };

    Unsupported.prototype.fallback = function() {
      return this.addState('no-pony');
    };

    Unsupported.prototype.isSupported = function() {
      return false;
    };

    return Unsupported;

  })(Component);

  tamia.initComponents({
    unsupported: Unsupported
  });

  Test = (function(_super) {
    __extends(Test, _super);

    function Test() {
      _ref2 = Test.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Test.prototype.init = function() {
      this.reset();
      this.on('test1', 'elem', this.handler);
      return this.on('test2', 'elem', this.handler);
    };

    Test.prototype.detachFirstHandler = function() {
      return this.off('test1', 'elem', this.handler);
    };

    Test.prototype.detachSecondHandler = function() {
      return this.off('test2', 'elem', this.handler);
    };

    Test.prototype.reset = function() {
      return this.handled = false;
    };

    Test.prototype.handler = function() {
      return this.handled = true;
    };

    return Test;

  })(Component);

  window.Test = Test;

}).call(this);
