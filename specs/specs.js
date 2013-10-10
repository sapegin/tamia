var $__getDescriptors = function(object) {
  var descriptors = {}, name, names = Object.getOwnPropertyNames(object);
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    descriptors[name] = Object.getOwnPropertyDescriptor(object, name);
  }
  return descriptors;
}, $__createClassNoExtends = function(object, staticObject) {
  var ctor = object.constructor;
  Object.defineProperty(object, 'constructor', {enumerable: false});
  ctor.prototype = object;
  Object.defineProperties(ctor, $__getDescriptors(staticObject));
  return ctor;
}, $__superDescriptor = function(proto, name) {
  if (!proto) throw new TypeError('super is null');
  return Object.getPropertyDescriptor(proto, name);
}, $__superCall = function(self, proto, name, args) {
  var descriptor = $__superDescriptor(proto, name);
  if (descriptor) {
    if ('value'in descriptor) return descriptor.value.apply(self, args);
    if (descriptor.get) return descriptor.get.call(self).apply(self, args);
  }
  throw new TypeError("Object has no method '" + name + "'.");
}, $__getProtoParent = function(superClass) {
  if (typeof superClass === 'function') {
    var prototype = superClass.prototype;
    if (Object(prototype) === prototype || prototype === null) return superClass.prototype;
  }
  if (superClass === null) return null;
  throw new TypeError();
}, $__createClass = function(object, staticObject, protoParent, superClass, hasConstructor) {
  var ctor = object.constructor;
  if (typeof superClass === 'function') ctor.__proto__ = superClass;
  if (!hasConstructor && protoParent === null) ctor = object.constructor = function() {};
  var descriptors = $__getDescriptors(object);
  descriptors.constructor.enumerable = false;
  ctor.prototype = Object.create(protoParent, descriptors);
  Object.defineProperties(ctor, $__getDescriptors(staticObject));
  return ctor;
}, $__toObject = function(value) {
  if (value == null) throw TypeError();
  return Object(value);
}, $__spread = function() {
  var rv = [], k = 0;
  for (var i = 0; i < arguments.length; i++) {
    var value = $__toObject(arguments[i]);
    for (var j = 0; j < value.length; j++) {
      rv[k++] = value[j];
    }
  }
  return rv;
};
var $__tamia_tamia_js = (function() {
  "use strict";
  if (typeof window.DEBUG === 'undefined') window.DEBUG = true;
  ;
  (function(window, jQuery, Modernizr, undefined) {
    'use strict';
    if (DEBUG) {
      var logger = function() {
        var args = Array.prototype.slice.call(arguments);
        var func = args.shift();
        args[0] = 'Tâmia: ' + args[0];
        console[func].apply(console, args);
      };
      var log = logger.bind(null, 'log');
      var warn = logger.bind(null, 'warn');
      if (!jQuery) warn('jQuery not found.');
      if (!Modernizr) warn('Modernizr not found.');
    }
    if (!document.querySelectorAll) return;
    var tamia = window.tamia = {};
    var _containersCache;
    var _components = {};
    function _getContainers(parent) {
      return (parent || document).querySelectorAll('[data-component]');
    }
    tamia.initComponents = function(components, parent) {
      var containers;
      if (parent === undefined) {
        containers = _containersCache || (_containersCache = _getContainers());
      } else {
        containers = _getContainers(parent);
        components = _components;
      }
      for (var containerIdx = 0, containerCnt = containers.length; containerIdx < containerCnt; containerIdx++) {
        var container = containers[containerIdx];
        var component = components[container.getAttribute('data-component')];
        if (!component || container.hasAttribute('_tamia-yep')) continue;
        if ('__tamia_cmpnt__'in component) {
          new component(container);
        } else if (typeof component === 'function') {
          component(container);
        } else if (jQuery) {
          for (var method in component) {
            jQuery(container)[method](component[method]);
          }
        }
        container.setAttribute('_tamia-yep', 'yes');
      }
      for (var name in components) {
        _components[name] = components[name];
      }
    };
    if (jQuery) {
      var _doc = jQuery(document);
      var _hiddenClass = 'is-hidden';
      var _transitionClass = 'is-transit';
      var _fallbackTimeout = 1000;
      var _transitionEndEvent = Modernizr && {
        WebkitTransition: 'webkitTransitionEnd',
        transition: 'transitionend'
      }[Modernizr.prefixed('transition')];
      var _removeTransitionClass = function(elem) {
        var called = false;
        elem.one(_transitionEndEvent, function() {
          elem.removeClass(_transitionClass);
          called = true;
        });
        setTimeout(function() {
          if (!called) {
            elem.removeClass(_transitionClass);
          }
        }, _fallbackTimeout);
      };
      var _handlers = {};
      _handlers.init = function(elem) {
        tamia.initComponents(undefined, elem);
      };
      _handlers.appear = function(elem) {
        elem = $(elem);
        if (Modernizr && Modernizr.csstransitions) {
          if (elem.hasClass(_transitionClass)) return;
          elem.addClass(_transitionClass);
          setTimeout(function() {
            elem.removeClass(_hiddenClass);
            _removeTransitionClass(elem);
          }, 0);
        } else {
          elem.removeClass(_hiddenClass);
        }
      };
      _handlers.disappear = function(elem) {
        elem = $(elem);
        if (Modernizr && Modernizr.csstransitions) {
          if (elem.hasClass(_transitionClass)) return;
          elem.addClass(_transitionClass);
          elem.addClass(_hiddenClass);
          _removeTransitionClass(elem);
        } else {
          elem.addClass(_hiddenClass);
        }
      };
      _handlers.toggle = function(elem) {
        elem = $(elem);
        if (elem.hasClass(_transitionClass)) return;
        if (elem.hasClass(_hiddenClass)) {
          _handlers.appear(elem);
        } else {
          _handlers.disappear(elem);
        }
      };
      var _tamiaze = function(handler, name) {
        return name + '.tamia';
      };
      var _events = $.map(_handlers, _tamiaze).join(' ');
      _doc.on(_events, function(event) {
        if (DEBUG) log('Event "%s":', event.type, event.target);
        _handlers[event.type](event.target);
      });
      _doc.click(function(e) {
        var target = e.target;
        var parent = target.parentNode;
        if (parent && parent.getAttribute && parent.getAttribute('data-fire')) target = parent;
        if (target.getAttribute('data-fire') && target.getAttribute('data-target')) {
          target = jQuery(target);
          var attrs = ('' + target.data('attrs')).split(/[;, ]/);
          jQuery(target.data('target')).trigger(target.data('fire'), attrs);
          e.preventDefault();
        }
      });
      if (DEBUG) tamia.initComponents({grid: function(elem) {
          elem = $(elem);
          elem.addClass('g-row').html(new Array((elem.data('columns') || 12) + 1).join('<b class="g-debug-col" style="height:' + document.documentElement.scrollHeight + 'px"></b>'));
          ;
        }});
    }
  }(window, window.jQuery, window.Modernizr));
  return Object.preventExtensions(Object.create(null, {}));
}).call(this);
var $__tamia_component_js = (function() {
  "use strict";
  ;
  (function(window, $, undefined) {
    'use strict';
    var Component = function() {
      'use strict';
      var $Component = ($__createClassNoExtends)({
        constructor: function(elem) {
          if (!this.isSupported()) return;
          this.elemNode = elem;
          this.elem = $(elem);
          this._fillStates();
          this.init();
          this.addState('ok');
        },
        isSupported: function() {
          return true;
        },
        init: function() {},
        find: function(name) {
          return this.elem.find('.js-' + name).first();
        },
        on: function() {
          var $__6;
          for (var args = [], $__3 = 0; $__3 < arguments.length; $__3++) args[$__3] = arguments[$__3];
          ($__6 = this)._toggleEvent.apply($__6, $__spread(['on'], args));
        },
        off: function() {
          var $__6;
          for (var args = [], $__4 = 0; $__4 < arguments.length; $__4++) args[$__4] = arguments[$__4];
          ($__6 = this)._toggleEvent.apply($__6, $__spread(['off'], args));
        },
        state: function(name, value) {
          if (!arguments.length) {
            return this.states;
          }
          if (typeof name === 'string') {
            if (value === undefined) {
              return this.states[name];
            } else {
              this.states[name] = value;
            }
          } else {
            Object.mixin(this.states, name);
          }
          this._updateStates();
        },
        hasState: function(name) {
          return !!this.states[name];
        },
        addState: function(name) {
          this.toggleState(name, true);
        },
        removeState: function(name) {
          this.toggleState(name, false);
        },
        toggleState: function(name) {
          var value = arguments[1] !== (void 0) ? arguments[1]: !this.states[name];
          this.states[name] = value;
          this._updateStates();
        },
        _toggleEvent: function(func) {
          var $__6;
          for (var args = [], $__5 = 1; $__5 < arguments.length; $__5++) args[$__5 - 1] = arguments[$__5];
          if (typeof args[1] === 'string') {
            args[1] = '.js-' + args[1];
          }
          var funcArg = (typeof args[1] === 'function') ? 1: 2;
          args[funcArg] = args[funcArg].bind(this);
          ($__6 = this.elem)[func].apply($__6, $__toObject(args));
        },
        _fillStates: function() {
          var states = {};
          var classes = this.elemNode.className.split(' ');
          for (var $__1 = $traceurRuntime.getIterator(classes), $__2; !($__2 = $__1.next()).done;) {
            try {
              throw undefined;
            } catch (cls) {
              cls = $__2.value;
              {
                if (cls.startsWith('is-')) {
                  states[cls.replace(/^is-/, '')] = true;
                }
              }
            }
          }
          this.states = states;
        },
        _updateStates: function() {
          var classes = this.elemNode.className.replace(/\bis-[\w]+/g, '').split(' ');
          ;
          for (var $name in this.states) {
            try {
              throw undefined;
            } catch (name) {
              name = $name;
              if (this.states[name]) {
                classes.push('is-' + name);
              }
            }
          }
          this.elemNode.className = classes.join(' ');
        }
      }, {});
      return $Component;
    }();
    Component.__tamia_cmpnt__ = true;
    window.Component = Component;
  }(window, window.jQuery));
  return Object.preventExtensions(Object.create(null, {}));
}).call(this);
var $__blocks_flippable_script_js = (function() {
  "use strict";
  ;
  (function(window, $, undefined) {
    'use strict';
    var Flippable = function($__super) {
      'use strict';
      var $__proto = $__getProtoParent($__super);
      var $Flippable = ($__createClass)({
        constructor: function() {
          $__superCall(this, $__proto, "constructor", arguments);
        },
        init: function() {
          if (this.elem.hasClass('js-flip')) {
            this.on('click', this.toggle);
          } else {
            this.on('click', 'flip', this.toggle);
          }
        },
        toggle: function() {
          this.toggleState('flipped');
        }
      }, {}, $__proto, $__super, false);
      return $Flippable;
    }(Component);
    tamia.initComponents({flippable: Flippable});
  }(window, window.jQuery));
  return Object.preventExtensions(Object.create(null, {}));
}).call(this);
var $__blocks_password_script_js = (function() {
  "use strict";
  ;
  (function(window, $, undefined) {
    'use strict';
    var supported;
    var Password = function($__super) {
      'use strict';
      var $__proto = $__getProtoParent($__super);
      var $Password = ($__createClass)({
        constructor: function() {
          $__superCall(this, $__proto, "constructor", arguments);
        },
        init: function() {
          this.types = {
            locked: 'password',
            unlocked: 'text'
          };
          this.states = {locked: true};
          this.fieldElem = this.find('field');
          this.toggleElem = this.find('toggle');
          this.on('mousedown', 'toggle', this.toggle);
        },
        isSupported: function() {
          if (supported !== undefined) return supported;
          supported = $('<!--[if lte IE 8]><i></i><![endif]-->').find('i').length !== 1;
          return supported;
        },
        toggle: function() {
          var focused = document.activeElement === this.fieldElem[0];
          var locked = !this.hasState('locked');
          var fieldType = this.fieldElem.attr('type');
          this.toggleState('locked');
          if (fieldType === this.types.locked && !locked) {
            this.fieldElem.attr('type', this.types.unlocked);
          } else if (fieldType === this.types.unlocked && locked) {
            this.fieldElem.attr('type', this.types.locked);
          }
          if (focused) {
            setTimeout((function() {
              return this.fieldElem.focus();
            }).bind(this), 0);
          }
        }
      }, {}, $__proto, $__super, false);
      return $Password;
    }(Component);
    tamia.initComponents({password: Password});
  }(window, jQuery));
  return Object.preventExtensions(Object.create(null, {}));
}).call(this);
var $__blocks_select_script_js = (function() {
  "use strict";
  ;
  (function(window, $, undefined) {
    'use strict';
    var Select = function($__super) {
      'use strict';
      var $__proto = $__getProtoParent($__super);
      var $Select = ($__createClass)({
        constructor: function() {
          $__superCall(this, $__proto, "constructor", arguments);
        },
        init: function() {
          this.selectElem = this.find('select');
          this.boxElem = this.find('box');
          this.on('focus', 'select', this.focus);
          this.on('blur', 'select', this.blur);
          this.on('change', 'select', this.change);
          this.change();
        },
        focus: function() {
          this.addState('focused');
        },
        blur: function() {
          this.removeState('focused');
        },
        change: function() {
          this.boxElem.text(this.selectElem.find(':selected').text());
        }
      }, {}, $__proto, $__super, false);
      return $Select;
    }(Component);
    tamia.initComponents({select: Select});
  }(window, jQuery));
  return Object.preventExtensions(Object.create(null, {}));
}).call(this);

//@ sourceMappingURL=specs.js.map