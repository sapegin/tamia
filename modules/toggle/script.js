(function() {
  'use strict';
  var $, Toggle, hiddenEvents, togglers, _body, _doc;

  $ = jQuery;

  _body = $('body');

  _doc = $(document);

  togglers = {
    hidden: {
      set: function(elem) {
        return elem.trigger('disappear.tamia');
      },
      clear: function(elem) {
        return elem.trigger('appear.tamia');
      }
    },
    disabled: {
      set: function(elem) {
        elem.addClass('is-disabled');
        return elem.prop('disabled', true);
      },
      clear: function(elem) {
        elem.removeClass('is-disabled');
        return elem.prop('disabled', false);
      }
    },
    _default: {
      set: function(elem, name) {
        return elem.addClass("is-" + name);
      },
      clear: function(elem, name) {
        return elem.removeClass("is-" + name);
      }
    }
  };

  hiddenEvents = 'appeared.tamia disappeared.tamia';

  Toggle = (function() {
    function Toggle(wrapper) {
      this.wrapper = wrapper;
      this.elems = this.findElems();
    }

    Toggle.prototype.findElems = function() {
      var elems, tags,
        _this = this;
      elems = [];
      tags = this.wrapper.find('[data-states]');
      tags.each(function(index, elem) {
        var parent, prev;
        elem = $(elem);
        console.log('elem', elem[0].outerHTML);
        elem.addClass('toggle-element');
        elems.push({
          elem: elem,
          states: _this.parseState(elem.data('states'))
        });
        prev = elems[index - 1];
        if (prev) {
          parent = elem.parent();
          if (parent.children().length === 2 && parent[0] === prev.elem.parent()[0]) {
            return prev.crossfade = true;
          }
        }
      });
      return elems;
    };

    Toggle.prototype.parseState = function(data) {
      var elemStates, name, set, state, stateData, states, statesData, _i, _j, _len, _len1, _ref;
      statesData = {};
      data = data.replace(/\s+/g, '');
      states = data.split(';');
      for (_i = 0, _len = states.length; _i < _len; _i++) {
        stateData = states[_i];
        _ref = stateData.split(':'), name = _ref[0], elemStates = _ref[1];
        elemStates = elemStates.split(',');
        statesData[name] = {};
        for (_j = 0, _len1 = elemStates.length; _j < _len1; _j++) {
          state = elemStates[_j];
          set = true;
          if (state[0] === '-') {
            set = false;
            state = state.slice(1);
          }
          statesData[name][state] = set;
        }
      }
      return statesData;
    };

    Toggle.prototype.toggle = function(link) {
      var action, actions, func, _results;
      actions = link.data('toggle');
      actions = this.parseToggle(actions);
      _results = [];
      for (action in actions) {
        func = "" + action + "States";
        if (!this[func]) {
          throw new tamia.Error("Toggle: wrong action " + action + ".", 'Available actions: toggle, set, clear.');
        }
        _results.push(this[func](actions[action]));
      }
      return _results;
    };

    Toggle.prototype.parseToggle = function(data) {
      var action, actions, elemStates, name, toggleData, _i, _len, _ref;
      toggleData = {};
      data = data.replace(/\s+/g, '');
      actions = data.split(';');
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        _ref = action.split(':'), name = _ref[0], elemStates = _ref[1];
        elemStates = elemStates.split(',');
        toggleData[name] = elemStates;
      }
      return toggleData;
    };

    Toggle.prototype.hasStateClass = function(state) {
      return this.wrapper.hasClass("state-" + state);
    };

    Toggle.prototype.toggleStateClass = function(state, set) {
      return this.wrapper.toggleClass("state-" + state, set);
    };

    Toggle.prototype.toggleStates = function(states) {
      var state, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = states.length; _i < _len; _i++) {
        state = states[_i];
        _results.push(this.toggleState(state));
      }
      return _results;
    };

    Toggle.prototype.toggleState = function(state) {
      var action, elem, elemIdx, elemState, elemStates, next, parent, position, set, toggler, visibleElem, _i, _len, _ref, _results;
      set = !this.hasStateClass(state);
      this.toggleStateClass(state, set);
      _ref = this.elems;
      _results = [];
      for (elemIdx = _i = 0, _len = _ref.length; _i < _len; elemIdx = ++_i) {
        elem = _ref[elemIdx];
        elemStates = elem.states[state];
        if (!elemStates) {
          continue;
        }
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (elemState in elemStates) {
            toggler = this.getToggler(elemState);
            action = set === elemStates[elemState] ? 'set' : 'clear';
            if (elemState === 'hidden') {
              next = this.elems[elemIdx + 1];
              if (next && next.states[state][elemState] === !elemStates[elemState]) {
                visibleElem = elem.elem[0].offsetHeight ? elem.elem : next.elem;
                position = visibleElem.position();
                position.width = visibleElem.width();
                parent = elem.elem.parent();
                parent.height(parent.height());
                elem.elem.css(position);
                next.elem.css(position);
                parent.addClass('toggle-crossfade-wrapper');
                elem.elem.one(hiddenEvents, (function(elem, next, parent) {
                  elem.elem.off(hiddenEvents);
                  return setTimeout((function() {
                    parent.height('');
                    position = {
                      left: '',
                      top: '',
                      width: ''
                    };
                    elem.elem.css(position);
                    next.elem.css(position);
                    return parent.removeClass('toggle-crossfade-wrapper');
                  }), 100);
                }).bind(this, elem, next, parent));
              }
            }
            _results1.push(toggler[action](elem.elem, elemState));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Toggle.prototype.getToggler = function(state) {
      return togglers[state] || togglers._default;
    };

    return Toggle;

  })();

  _doc.on('click', '[data-toggle]', function(event) {
    var elem, toggle, wrapper;
    elem = $(event.currentTarget);
    wrapper = elem.closest('.js-toggle-wrapper');
    if (!wrapper.length) {
      throw new tamia.Error('Toggle: .js-toggle-wrapper not found.', elem);
    }
    toggle = wrapper.data('tamia-toggle');
    if (!toggle) {
      toggle = new Toggle(wrapper);
      wrapper.data('tamia-toggle', toggle);
    }
    toggle.toggle(elem);
    return event.preventDefault();
  });

}).call(this);
