/*!
* Tabler v1.0.0-alpha.24 (https://tabler.io)
* @version 1.0.0-alpha.24
* @link https://tabler.io
* Copyright 2018-2021 The Tabler Authors
* Copyright 2018-2021 codecalm.net Paweł Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
*/
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	/*!
		autosize 4.0.2
		license: MIT
		http://www.jacklmoore.com/autosize
	*/
	var autosize = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		{
			factory(module, exports);
		}
	})(commonjsGlobal, function (module, exports) {
		var map = typeof Map === "function" ? new Map() : function () {
			var keys = [];
			var values = [];
			return {
				has: function has(key) {
					return keys.indexOf(key) > -1;
				},
				get: function get(key) {
					return values[keys.indexOf(key)];
				},
				set: function set(key, value) {
					if (keys.indexOf(key) === -1) {
						keys.push(key);
						values.push(value);
					}
				},
				delete: function _delete(key) {
					var index = keys.indexOf(key);
					if (index > -1) {
						keys.splice(index, 1);
						values.splice(index, 1);
					}
				}
			};
		}();
		var createEvent = function createEvent(name) {
			return new Event(name, { bubbles: true });
		};
		try {
			new Event('test');
		} catch (e) {
			createEvent = function createEvent(name) {
				var evt = document.createEvent('Event');
				evt.initEvent(name, true, false);
				return evt;
			};
		}
		function assign(ta) {
			if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;
			var heightOffset = null;
			var clientWidth = null;
			var cachedHeight = null;
			function init() {
				var style = window.getComputedStyle(ta, null);
				if (style.resize === 'vertical') {
					ta.style.resize = 'none';
				} else if (style.resize === 'both') {
					ta.style.resize = 'horizontal';
				}
				if (style.boxSizing === 'content-box') {
					heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
				} else {
					heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
				}
				if (isNaN(heightOffset)) {
					heightOffset = 0;
				}
				update();
			}
			function changeOverflow(value) {
				{
					var width = ta.style.width;
					ta.style.width = '0px';
					ta.offsetWidth;
					ta.style.width = width;
				}
				ta.style.overflowY = value;
			}
			function getParentOverflows(el) {
				var arr = [];
				while (el && el.parentNode && el.parentNode instanceof Element) {
					if (el.parentNode.scrollTop) {
						arr.push({
							node: el.parentNode,
							scrollTop: el.parentNode.scrollTop
						});
					}
					el = el.parentNode;
				}
				return arr;
			}
			function resize() {
				if (ta.scrollHeight === 0) {
					return;
				}
				var overflows = getParentOverflows(ta);
				var docTop = document.documentElement && document.documentElement.scrollTop;
				ta.style.height = '';
				ta.style.height = ta.scrollHeight + heightOffset + 'px';
				clientWidth = ta.clientWidth;
				overflows.forEach(function (el) {
					el.node.scrollTop = el.scrollTop;
				});
				if (docTop) {
					document.documentElement.scrollTop = docTop;
				}
			}
			function update() {
				resize();
				var styleHeight = Math.round(parseFloat(ta.style.height));
				var computed = window.getComputedStyle(ta, null);
				var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;
				if (actualHeight < styleHeight) {
					if (computed.overflowY === 'hidden') {
						changeOverflow('scroll');
						resize();
						actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
					}
				} else {
					if (computed.overflowY !== 'hidden') {
						changeOverflow('hidden');
						resize();
						actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
					}
				}
				if (cachedHeight !== actualHeight) {
					cachedHeight = actualHeight;
					var evt = createEvent('autosize:resized');
					try {
						ta.dispatchEvent(evt);
					} catch (err) {
					}
				}
			}
			var pageResize = function pageResize() {
				if (ta.clientWidth !== clientWidth) {
					update();
				}
			};
			var destroy = function (style) {
				window.removeEventListener('resize', pageResize, false);
				ta.removeEventListener('input', update, false);
				ta.removeEventListener('keyup', update, false);
				ta.removeEventListener('autosize:destroy', destroy, false);
				ta.removeEventListener('autosize:update', update, false);
				Object.keys(style).forEach(function (key) {
					ta.style[key] = style[key];
				});
				map.delete(ta);
			}.bind(ta, {
				height: ta.style.height,
				resize: ta.style.resize,
				overflowY: ta.style.overflowY,
				overflowX: ta.style.overflowX,
				wordWrap: ta.style.wordWrap
			});
			ta.addEventListener('autosize:destroy', destroy, false);
			if ('onpropertychange' in ta && 'oninput' in ta) {
				ta.addEventListener('keyup', update, false);
			}
			window.addEventListener('resize', pageResize, false);
			ta.addEventListener('input', update, false);
			ta.addEventListener('autosize:update', update, false);
			ta.style.overflowX = 'hidden';
			ta.style.wordWrap = 'break-word';
			map.set(ta, {
				destroy: destroy,
				update: update
			});
			init();
		}
		function destroy(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.destroy();
			}
		}
		function update(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.update();
			}
		}
		var autosize = null;
		if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
			autosize = function autosize(el) {
				return el;
			};
			autosize.destroy = function (el) {
				return el;
			};
			autosize.update = function (el) {
				return el;
			};
		} else {
			autosize = function autosize(el, options) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], function (x) {
						return assign(x);
					});
				}
				return el;
			};
			autosize.destroy = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], destroy);
				}
				return el;
			};
			autosize.update = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], update);
				}
				return el;
			};
		}
		exports.default = autosize;
		module.exports = exports['default'];
	});
	});

	var elements = document.querySelectorAll('[data-bs-toggle="autosize"]');
	if (elements.length) {
	  elements.forEach(function (element) {
	    autosize(element);
	  });
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }
	  return _typeof(obj);
	}
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	  return obj;
	}
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }
	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}
	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}
	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}
	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;
	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }
	  return target;
	}
	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = _objectWithoutPropertiesLoose(source, excluded);
	  var key, i;
	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }
	  return target;
	}
	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	  return self;
	}
	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }
	  return _assertThisInitialized(self);
	}
	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }
	  return object;
	}
	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);
	      if (desc.get) {
	        return desc.get.call(receiver);
	      }
	      return desc.value;
	    };
	  }
	  return _get(target, property, receiver || target);
	}
	function set(target, property, value, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.set) {
	    set = Reflect.set;
	  } else {
	    set = function set(target, property, value, receiver) {
	      var base = _superPropBase(target, property);
	      var desc;
	      if (base) {
	        desc = Object.getOwnPropertyDescriptor(base, property);
	        if (desc.set) {
	          desc.set.call(receiver, value);
	          return true;
	        } else if (!desc.writable) {
	          return false;
	        }
	      }
	      desc = Object.getOwnPropertyDescriptor(receiver, property);
	      if (desc) {
	        if (!desc.writable) {
	          return false;
	        }
	        desc.value = value;
	        Object.defineProperty(receiver, property, desc);
	      } else {
	        _defineProperty(receiver, property, value);
	      }
	      return true;
	    };
	  }
	  return set(target, property, value, receiver);
	}
	function _set(target, property, value, receiver, isStrict) {
	  var s = set(target, property, value, receiver || target);
	  if (!s && isStrict) {
	    throw new Error('failed to set property');
	  }
	  return value;
	}
	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}
	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}
	function _iterableToArrayLimit(arr, i) {
	  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
	    return;
	  }
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;
	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);
	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }
	  return _arr;
	}
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	function isString(str) {
	  return typeof str === 'string' || str instanceof String;
	}
	var DIRECTION = {
	  NONE: 'NONE',
	  LEFT: 'LEFT',
	  FORCE_LEFT: 'FORCE_LEFT',
	  RIGHT: 'RIGHT',
	  FORCE_RIGHT: 'FORCE_RIGHT'
	};
	function forceDirection(direction) {
	  switch (direction) {
	    case DIRECTION.LEFT:
	      return DIRECTION.FORCE_LEFT;
	    case DIRECTION.RIGHT:
	      return DIRECTION.FORCE_RIGHT;
	    default:
	      return direction;
	  }
	}
	function escapeRegExp(str) {
	  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
	}
	function objectIncludes(b, a) {
	  if (a === b) return true;
	  var arrA = Array.isArray(a),
	      arrB = Array.isArray(b),
	      i;
	  if (arrA && arrB) {
	    if (a.length != b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (!objectIncludes(a[i], b[i])) return false;
	    }
	    return true;
	  }
	  if (arrA != arrB) return false;
	  if (a && b && _typeof(a) === 'object' && _typeof(b) === 'object') {
	    var dateA = a instanceof Date,
	        dateB = b instanceof Date;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    if (dateA != dateB) return false;
	    var regexpA = a instanceof RegExp,
	        regexpB = b instanceof RegExp;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    if (regexpA != regexpB) return false;
	    var keys = Object.keys(a);
	    for (i = 0; i < keys.length; i++) {
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	    }
	    for (i = 0; i < keys.length; i++) {
	      if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
	    }
	    return true;
	  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
	    return a.toString() === b.toString();
	  }
	  return false;
	}

	var ActionDetails =
	function () {
	  function ActionDetails(value, cursorPos, oldValue, oldSelection) {
	    _classCallCheck(this, ActionDetails);
	    this.value = value;
	    this.cursorPos = cursorPos;
	    this.oldValue = oldValue;
	    this.oldSelection = oldSelection;
	    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
	      --this.oldSelection.start;
	    }
	  }
	  _createClass(ActionDetails, [{
	    key: "startChangePos",
	    get: function get() {
	      return Math.min(this.cursorPos, this.oldSelection.start);
	    }
	  }, {
	    key: "insertedCount",
	    get: function get() {
	      return this.cursorPos - this.startChangePos;
	    }
	  }, {
	    key: "inserted",
	    get: function get() {
	      return this.value.substr(this.startChangePos, this.insertedCount);
	    }
	  }, {
	    key: "removedCount",
	    get: function get() {
	      return Math.max(this.oldSelection.end - this.startChangePos ||
	      this.oldValue.length - this.value.length, 0);
	    }
	  }, {
	    key: "removed",
	    get: function get() {
	      return this.oldValue.substr(this.startChangePos, this.removedCount);
	    }
	  }, {
	    key: "head",
	    get: function get() {
	      return this.value.substring(0, this.startChangePos);
	    }
	  }, {
	    key: "tail",
	    get: function get() {
	      return this.value.substring(this.startChangePos + this.insertedCount);
	    }
	  }, {
	    key: "removeDirection",
	    get: function get() {
	      if (!this.removedCount || this.insertedCount) return DIRECTION.NONE;
	      return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
	    }
	  }]);
	  return ActionDetails;
	}();

	var ChangeDetails =
	function () {
	  function ChangeDetails(details) {
	    _classCallCheck(this, ChangeDetails);
	    Object.assign(this, {
	      inserted: '',
	      rawInserted: '',
	      skip: false,
	      tailShift: 0
	    }, details);
	  }
	  _createClass(ChangeDetails, [{
	    key: "aggregate",
	    value: function aggregate(details) {
	      this.rawInserted += details.rawInserted;
	      this.skip = this.skip || details.skip;
	      this.inserted += details.inserted;
	      this.tailShift += details.tailShift;
	      return this;
	    }
	  }, {
	    key: "offset",
	    get: function get() {
	      return this.tailShift + this.inserted.length;
	    }
	  }]);
	  return ChangeDetails;
	}();

	var ContinuousTailDetails =
	function () {
	  function ContinuousTailDetails() {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var stop = arguments.length > 2 ? arguments[2] : undefined;
	    _classCallCheck(this, ContinuousTailDetails);
	    this.value = value;
	    this.from = from;
	    this.stop = stop;
	  }
	  _createClass(ContinuousTailDetails, [{
	    key: "toString",
	    value: function toString() {
	      return this.value;
	    }
	  }, {
	    key: "extend",
	    value: function extend(tail) {
	      this.value += String(tail);
	    }
	  }, {
	    key: "appendTo",
	    value: function appendTo(masked) {
	      return masked.append(this.toString(), {
	        tail: true
	      }).aggregate(masked._appendPlaceholder());
	    }
	  }, {
	    key: "shiftBefore",
	    value: function shiftBefore(pos) {
	      if (this.from >= pos || !this.value.length) return '';
	      var shiftChar = this.value[0];
	      this.value = this.value.slice(1);
	      return shiftChar;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        value: this.value,
	        from: this.from,
	        stop: this.stop
	      };
	    },
	    set: function set(state) {
	      Object.assign(this, state);
	    }
	  }]);
	  return ContinuousTailDetails;
	}();

	function IMask(el) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return new IMask.InputMask(el, opts);
	}

	var Masked =
	function () {
	  function Masked(opts) {
	    _classCallCheck(this, Masked);
	    this._value = '';
	    this._update(Object.assign({}, Masked.DEFAULTS, {}, opts));
	    this.isInitialized = true;
	  }
	  _createClass(Masked, [{
	    key: "updateOptions",
	    value: function updateOptions(opts) {
	      if (!Object.keys(opts).length) return;
	      this.withValueRefresh(this._update.bind(this, opts));
	    }
	  }, {
	    key: "_update",
	    value: function _update(opts) {
	      Object.assign(this, opts);
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this._value = '';
	    }
	  }, {
	    key: "resolve",
	    value: function resolve(value) {
	      this.reset();
	      this.append(value, {
	        input: true
	      }, '');
	      this.doCommit();
	      return this.value;
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos, direction) {
	      return cursorPos;
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return this.value.slice(fromPos, toPos);
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	      return tail.appendTo(this);
	    }
	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      ch = this.doPrepare(ch, flags);
	      if (!ch) return new ChangeDetails();
	      this._value += ch;
	      return new ChangeDetails({
	        inserted: ch,
	        rawInserted: ch
	      });
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var checkTail = arguments.length > 2 ? arguments[2] : undefined;
	      var consistentState = this.state;
	      var details = this._appendCharRaw(ch, flags);
	      if (details.inserted) {
	        var consistentTail;
	        var appended = this.doValidate(flags) !== false;
	        if (appended && checkTail != null) {
	          var beforeTailState = this.state;
	          if (this.overwrite) {
	            consistentTail = checkTail.state;
	            checkTail.shiftBefore(this.value.length);
	          }
	          var tailDetails = this.appendTail(checkTail);
	          appended = tailDetails.rawInserted === checkTail.toString();
	          if (appended && tailDetails.inserted) this.state = beforeTailState;
	        }
	        if (!appended) {
	          details = new ChangeDetails();
	          this.state = consistentState;
	          if (checkTail && consistentTail) checkTail.state = consistentTail;
	        }
	      }
	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      return new ChangeDetails();
	    }
	  }, {
	    key: "append",
	    value: function append(str, flags, tail) {
	      if (!isString(str)) throw new Error('value should be string');
	      var details = new ChangeDetails();
	      var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
	      if (flags.tail) flags._beforeTailState = this.state;
	      for (var ci = 0; ci < str.length; ++ci) {
	        details.aggregate(this._appendChar(str[ci], flags, checkTail));
	      }
	      if (checkTail != null) {
	        details.tailShift += this.appendTail(checkTail).tailShift;
	      }
	      return details;
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
	      return new ChangeDetails();
	    }
	  }, {
	    key: "withValueRefresh",
	    value: function withValueRefresh(fn) {
	      if (this._refreshing || !this.isInitialized) return fn();
	      this._refreshing = true;
	      var rawInput = this.rawInputValue;
	      var value = this.value;
	      var ret = fn();
	      this.rawInputValue = rawInput;
	      if (this.value !== value && value.indexOf(this.value) === 0) {
	        this.append(value.slice(this.value.length), {}, '');
	      }
	      delete this._refreshing;
	      return ret;
	    }
	  }, {
	    key: "runIsolated",
	    value: function runIsolated(fn) {
	      if (this._isolated || !this.isInitialized) return fn(this);
	      this._isolated = true;
	      var state = this.state;
	      var ret = fn(this);
	      this.state = state;
	      delete this._isolated;
	      return ret;
	    }
	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.prepare ? this.prepare(str, this, flags) : str;
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate(flags) {
	      return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.commit) this.commit(this.value, this);
	    }
	  }, {
	    key: "doFormat",
	    value: function doFormat(value) {
	      return this.format ? this.format(value, this) : value;
	    }
	  }, {
	    key: "doParse",
	    value: function doParse(str) {
	      return this.parse ? this.parse(str, this) : str;
	    }
	  }, {
	    key: "splice",
	    value: function splice(start, deleteCount, inserted, removeDirection) {
	      var tailPos = start + deleteCount;
	      var tail = this.extractTail(tailPos);
	      var startChangePos = this.nearestInputPos(start, removeDirection);
	      var changeDetails = new ChangeDetails({
	        tailShift: startChangePos - start
	      }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
	        input: true
	      }, tail));
	      return changeDetails;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this.value
	      };
	    },
	    set: function set(state) {
	      this._value = state._value;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(value) {
	      this.resolve(value);
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.value;
	    },
	    set: function set(value) {
	      this.reset();
	      this.append(value, {}, '');
	      this.doCommit();
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.doParse(this.value);
	    },
	    set: function set(value) {
	      this.value = this.doFormat(value);
	    }
	  }, {
	    key: "rawInputValue",
	    get: function get() {
	      return this.extractInput(0, this.value.length, {
	        raw: true
	      });
	    },
	    set: function set(value) {
	      this.reset();
	      this.append(value, {
	        raw: true
	      }, '');
	      this.doCommit();
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }]);
	  return Masked;
	}();
	Masked.DEFAULTS = {
	  format: function format(v) {
	    return v;
	  },
	  parse: function parse(v) {
	    return v;
	  }
	};
	IMask.Masked = Masked;

	function maskedClass(mask) {
	  if (mask == null) {
	    throw new Error('mask property should be defined');
	  }
	  if (mask instanceof RegExp) return IMask.MaskedRegExp;
	  if (isString(mask)) return IMask.MaskedPattern;
	  if (mask instanceof Date || mask === Date) return IMask.MaskedDate;
	  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return IMask.MaskedNumber;
	  if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic;
	  if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask;
	  if (mask instanceof Function) return IMask.MaskedFunction;
	  if (mask instanceof IMask.Masked) return mask.constructor;
	  console.warn('Mask not found for mask', mask);
	  return IMask.Masked;
	}
	function createMask(opts) {
	  if (IMask.Masked && opts instanceof IMask.Masked) return opts;
	  opts = Object.assign({}, opts);
	  var mask = opts.mask;
	  if (IMask.Masked && mask instanceof IMask.Masked) return mask;
	  var MaskedClass = maskedClass(mask);
	  if (!MaskedClass) throw new Error('Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask.');
	  return new MaskedClass(opts);
	}
	IMask.createMask = createMask;

	var DEFAULT_INPUT_DEFINITIONS = {
	  '0': /\d/,
	  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
	  '*': /./
	};
	var PatternInputDefinition =
	function () {
	  function PatternInputDefinition(opts) {
	    _classCallCheck(this, PatternInputDefinition);
	    var mask = opts.mask,
	        blockOpts = _objectWithoutProperties(opts, ["mask"]);
	    this.masked = createMask({
	      mask: mask
	    });
	    Object.assign(this, blockOpts);
	  }
	  _createClass(PatternInputDefinition, [{
	    key: "reset",
	    value: function reset() {
	      this._isFilled = false;
	      this.masked.reset();
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      if (fromPos === 0 && toPos >= 1) {
	        this._isFilled = false;
	        return this.masked.remove(fromPos, toPos);
	      }
	      return new ChangeDetails();
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      if (this._isFilled) return new ChangeDetails();
	      var state = this.masked.state;
	      var details = this.masked._appendChar(str, flags);
	      if (details.inserted && this.doValidate(flags) === false) {
	        details.inserted = details.rawInserted = '';
	        this.masked.state = state;
	      }
	      if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
	        details.inserted = this.placeholderChar;
	      }
	      details.skip = !details.inserted && !this.isOptional;
	      this._isFilled = Boolean(details.inserted);
	      return details;
	    }
	  }, {
	    key: "append",
	    value: function append() {
	      var _this$masked;
	      return (_this$masked = this.masked).append.apply(_this$masked, arguments);
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = new ChangeDetails();
	      if (this._isFilled || this.isOptional) return details;
	      this._isFilled = true;
	      details.inserted = this.placeholderChar;
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this$masked2;
	      return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail() {
	      var _this$masked3;
	      return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 ? arguments[2] : undefined;
	      return this.masked.extractInput(fromPos, toPos, flags);
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var minPos = 0;
	      var maxPos = this.value.length;
	      var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
	      switch (direction) {
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          return this.isComplete ? boundPos : minPos;
	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	          return this.isComplete ? boundPos : maxPos;
	        case DIRECTION.NONE:
	        default:
	          return boundPos;
	      }
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _this$masked4, _this$parent;
	      return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      this.masked.doCommit();
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.masked.unmaskedValue;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return Boolean(this.masked.value) || this.isOptional;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        masked: this.masked.state,
	        _isFilled: this._isFilled
	      };
	    },
	    set: function set(state) {
	      this.masked.state = state.masked;
	      this._isFilled = state._isFilled;
	    }
	  }]);
	  return PatternInputDefinition;
	}();

	var PatternFixedDefinition =
	function () {
	  function PatternFixedDefinition(opts) {
	    _classCallCheck(this, PatternFixedDefinition);
	    Object.assign(this, opts);
	    this._value = '';
	  }
	  _createClass(PatternFixedDefinition, [{
	    key: "reset",
	    value: function reset() {
	      this._isRawInput = false;
	      this._value = '';
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	      this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
	      if (!this._value) this._isRawInput = false;
	      return new ChangeDetails();
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var minPos = 0;
	      var maxPos = this._value.length;
	      switch (direction) {
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          return minPos;
	        case DIRECTION.NONE:
	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	        default:
	          return maxPos;
	      }
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var details = new ChangeDetails();
	      if (this._value) return details;
	      var appended = this.char === str[0];
	      var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
	      if (isResolved) details.rawInserted = this.char;
	      this._value = details.inserted = this.char;
	      this._isRawInput = isResolved && (flags.raw || flags.input);
	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = new ChangeDetails();
	      if (this._value) return details;
	      this._value = details.inserted = this.char;
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return new ContinuousTailDetails('');
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	      return tail.appendTo(this);
	    }
	  }, {
	    key: "append",
	    value: function append(str, flags, tail) {
	      var details = this._appendChar(str, flags);
	      if (tail != null) {
	        details.tailShift += this.appendTail(tail).tailShift;
	      }
	      return details;
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {}
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.isUnmasking ? this.value : '';
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this._value,
	        _isRawInput: this._isRawInput
	      };
	    },
	    set: function set(state) {
	      Object.assign(this, state);
	    }
	  }]);
	  return PatternFixedDefinition;
	}();

	var ChunksTailDetails =
	function () {
	  function ChunksTailDetails() {
	    var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    _classCallCheck(this, ChunksTailDetails);
	    this.chunks = chunks;
	    this.from = from;
	  }
	  _createClass(ChunksTailDetails, [{
	    key: "toString",
	    value: function toString() {
	      return this.chunks.map(String).join('');
	    }
	  }, {
	    key: "extend",
	    value: function extend(tailChunk) {
	      if (!String(tailChunk)) return;
	      if (isString(tailChunk)) tailChunk = new ContinuousTailDetails(String(tailChunk));
	      var lastChunk = this.chunks[this.chunks.length - 1];
	      var extendLast = lastChunk && (
	      lastChunk.stop === tailChunk.stop || tailChunk.stop == null) &&
	      tailChunk.from === lastChunk.from + lastChunk.toString().length;
	      if (tailChunk instanceof ContinuousTailDetails) {
	        if (extendLast) {
	          lastChunk.extend(tailChunk.toString());
	        } else {
	          this.chunks.push(tailChunk);
	        }
	      } else if (tailChunk instanceof ChunksTailDetails) {
	        if (tailChunk.stop == null) {
	          var firstTailChunk;
	          while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
	            firstTailChunk = tailChunk.chunks.shift();
	            firstTailChunk.from += tailChunk.from;
	            this.extend(firstTailChunk);
	          }
	        }
	        if (tailChunk.toString()) {
	          tailChunk.stop = tailChunk.blockIndex;
	          this.chunks.push(tailChunk);
	        }
	      }
	    }
	  }, {
	    key: "appendTo",
	    value: function appendTo(masked) {
	      if (!(masked instanceof IMask.MaskedPattern)) {
	        var tail = new ContinuousTailDetails(this.toString());
	        return tail.appendTo(masked);
	      }
	      var details = new ChangeDetails();
	      for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
	        var chunk = this.chunks[ci];
	        var lastBlockIter = masked._mapPosToBlock(masked.value.length);
	        var stop = chunk.stop;
	        var chunkBlock = void 0;
	        if (stop != null && (
	        !lastBlockIter || lastBlockIter.index <= stop)) {
	          if (chunk instanceof ChunksTailDetails ||
	          masked._stops.indexOf(stop) >= 0) {
	            details.aggregate(masked._appendPlaceholder(stop));
	          }
	          chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
	        }
	        if (chunkBlock) {
	          var tailDetails = chunkBlock.appendTail(chunk);
	          tailDetails.skip = false;
	          details.aggregate(tailDetails);
	          masked._value += tailDetails.inserted;
	          var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
	          if (remainChars) details.aggregate(masked.append(remainChars, {
	            tail: true
	          }));
	        } else {
	          details.aggregate(masked.append(chunk.toString(), {
	            tail: true
	          }));
	        }
	      }
	      return details;
	    }
	  }, {
	    key: "shiftBefore",
	    value: function shiftBefore(pos) {
	      if (this.from >= pos || !this.chunks.length) return '';
	      var chunkShiftPos = pos - this.from;
	      var ci = 0;
	      while (ci < this.chunks.length) {
	        var chunk = this.chunks[ci];
	        var shiftChar = chunk.shiftBefore(chunkShiftPos);
	        if (chunk.toString()) {
	          if (!shiftChar) break;
	          ++ci;
	        } else {
	          this.chunks.splice(ci, 1);
	        }
	        if (shiftChar) return shiftChar;
	      }
	      return '';
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        chunks: this.chunks.map(function (c) {
	          return c.state;
	        }),
	        from: this.from,
	        stop: this.stop,
	        blockIndex: this.blockIndex
	      };
	    },
	    set: function set(state) {
	      var chunks = state.chunks,
	          props = _objectWithoutProperties(state, ["chunks"]);
	      Object.assign(this, props);
	      this.chunks = chunks.map(function (cstate) {
	        var chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails();
	        chunk.state = cstate;
	        return chunk;
	      });
	    }
	  }]);
	  return ChunksTailDetails;
	}();

	var MaskedRegExp =
	function (_Masked) {
	  _inherits(MaskedRegExp, _Masked);
	  function MaskedRegExp() {
	    _classCallCheck(this, MaskedRegExp);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRegExp).apply(this, arguments));
	  }
	  _createClass(MaskedRegExp, [{
	    key: "_update",
	    value: function _update(opts) {
	      if (opts.mask) opts.validate = function (value) {
	        return value.search(opts.mask) >= 0;
	      };
	      _get(_getPrototypeOf(MaskedRegExp.prototype), "_update", this).call(this, opts);
	    }
	  }]);
	  return MaskedRegExp;
	}(Masked);
	IMask.MaskedRegExp = MaskedRegExp;

	var MaskedPattern =
	function (_Masked) {
	  _inherits(MaskedPattern, _Masked);
	  function MaskedPattern() {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    _classCallCheck(this, MaskedPattern);
	    opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedPattern).call(this, Object.assign({}, MaskedPattern.DEFAULTS, {}, opts)));
	  }
	  _createClass(MaskedPattern, [{
	    key: "_update",
	    value: function _update() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      opts.definitions = Object.assign({}, this.definitions, opts.definitions);
	      _get(_getPrototypeOf(MaskedPattern.prototype), "_update", this).call(this, opts);
	      this._rebuildMask();
	    }
	  }, {
	    key: "_rebuildMask",
	    value: function _rebuildMask() {
	      var _this = this;
	      var defs = this.definitions;
	      this._blocks = [];
	      this._stops = [];
	      this._maskedBlocks = {};
	      var pattern = this.mask;
	      if (!pattern || !defs) return;
	      var unmaskingBlock = false;
	      var optionalBlock = false;
	      for (var i = 0; i < pattern.length; ++i) {
	        if (this.blocks) {
	          var _ret = function () {
	            var p = pattern.slice(i);
	            var bNames = Object.keys(_this.blocks).filter(function (bName) {
	              return p.indexOf(bName) === 0;
	            });
	            bNames.sort(function (a, b) {
	              return b.length - a.length;
	            });
	            var bName = bNames[0];
	            if (bName) {
	              var maskedBlock = createMask(Object.assign({
	                parent: _this,
	                lazy: _this.lazy,
	                placeholderChar: _this.placeholderChar,
	                overwrite: _this.overwrite
	              }, _this.blocks[bName]));
	              if (maskedBlock) {
	                _this._blocks.push(maskedBlock);
	                if (!_this._maskedBlocks[bName]) _this._maskedBlocks[bName] = [];
	                _this._maskedBlocks[bName].push(_this._blocks.length - 1);
	              }
	              i += bName.length - 1;
	              return "continue";
	            }
	          }();
	          if (_ret === "continue") continue;
	        }
	        var char = pattern[i];
	        var _isInput = char in defs;
	        if (char === MaskedPattern.STOP_CHAR) {
	          this._stops.push(this._blocks.length);
	          continue;
	        }
	        if (char === '{' || char === '}') {
	          unmaskingBlock = !unmaskingBlock;
	          continue;
	        }
	        if (char === '[' || char === ']') {
	          optionalBlock = !optionalBlock;
	          continue;
	        }
	        if (char === MaskedPattern.ESCAPE_CHAR) {
	          ++i;
	          char = pattern[i];
	          if (!char) break;
	          _isInput = false;
	        }
	        var def = _isInput ? new PatternInputDefinition({
	          parent: this,
	          lazy: this.lazy,
	          placeholderChar: this.placeholderChar,
	          mask: defs[char],
	          isOptional: optionalBlock
	        }) : new PatternFixedDefinition({
	          char: char,
	          isUnmasking: unmaskingBlock
	        });
	        this._blocks.push(def);
	      }
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      _get(_getPrototypeOf(MaskedPattern.prototype), "reset", this).call(this);
	      this._blocks.forEach(function (b) {
	        return b.reset();
	      });
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      this._blocks.forEach(function (b) {
	        return b.doCommit();
	      });
	      _get(_getPrototypeOf(MaskedPattern.prototype), "doCommit", this).call(this);
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      return _get(_getPrototypeOf(MaskedPattern.prototype), "appendTail", this).call(this, tail).aggregate(this._appendPlaceholder());
	    }
	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      ch = this.doPrepare(ch, flags);
	      var blockIter = this._mapPosToBlock(this.value.length);
	      var details = new ChangeDetails();
	      if (!blockIter) return details;
	      for (var bi = blockIter.index;; ++bi) {
	        var _block = this._blocks[bi];
	        if (!_block) break;
	        var blockDetails = _block._appendChar(ch, flags);
	        var skip = blockDetails.skip;
	        details.aggregate(blockDetails);
	        if (skip || blockDetails.rawInserted) break;
	      }
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this2 = this;
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var chunkTail = new ChunksTailDetails();
	      if (fromPos === toPos) return chunkTail;
	      this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
	        var blockChunk = b.extractTail(bFromPos, bToPos);
	        blockChunk.stop = _this2._findStopBefore(bi);
	        blockChunk.from = _this2._blockStartPos(bi);
	        if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
	        chunkTail.extend(blockChunk);
	      });
	      return chunkTail;
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      if (fromPos === toPos) return '';
	      var input = '';
	      this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
	        input += b.extractInput(fromPos, toPos, flags);
	      });
	      return input;
	    }
	  }, {
	    key: "_findStopBefore",
	    value: function _findStopBefore(blockIndex) {
	      var stopBefore;
	      for (var si = 0; si < this._stops.length; ++si) {
	        var stop = this._stops[si];
	        if (stop <= blockIndex) stopBefore = stop;else break;
	      }
	      return stopBefore;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder(toBlockIndex) {
	      var _this3 = this;
	      var details = new ChangeDetails();
	      if (this.lazy && toBlockIndex == null) return details;
	      var startBlockIter = this._mapPosToBlock(this.value.length);
	      if (!startBlockIter) return details;
	      var startBlockIndex = startBlockIter.index;
	      var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
	      this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function (b) {
	        if (!b.lazy || toBlockIndex != null) {
	          var args = b._blocks != null ? [b._blocks.length] : [];
	          var bDetails = b._appendPlaceholder.apply(b, args);
	          _this3._value += bDetails.inserted;
	          details.aggregate(bDetails);
	        }
	      });
	      return details;
	    }
	  }, {
	    key: "_mapPosToBlock",
	    value: function _mapPosToBlock(pos) {
	      var accVal = '';
	      for (var bi = 0; bi < this._blocks.length; ++bi) {
	        var _block2 = this._blocks[bi];
	        var blockStartPos = accVal.length;
	        accVal += _block2.value;
	        if (pos <= accVal.length) {
	          return {
	            index: bi,
	            offset: pos - blockStartPos
	          };
	        }
	      }
	    }
	  }, {
	    key: "_blockStartPos",
	    value: function _blockStartPos(blockIndex) {
	      return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
	        return pos += b.value.length;
	      }, 0);
	    }
	  }, {
	    key: "_forEachBlocksInRange",
	    value: function _forEachBlocksInRange(fromPos) {
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var fn = arguments.length > 2 ? arguments[2] : undefined;
	      var fromBlockIter = this._mapPosToBlock(fromPos);
	      if (fromBlockIter) {
	        var toBlockIter = this._mapPosToBlock(toPos);
	        var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
	        var fromBlockStartPos = fromBlockIter.offset;
	        var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
	        fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
	        if (toBlockIter && !isSameBlock) {
	          for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
	            fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
	          }
	          fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
	        }
	      }
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var removeDetails = _get(_getPrototypeOf(MaskedPattern.prototype), "remove", this).call(this, fromPos, toPos);
	      this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
	        removeDetails.aggregate(b.remove(bFromPos, bToPos));
	      });
	      return removeDetails;
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var beginBlockData = this._mapPosToBlock(cursorPos) || {
	        index: 0,
	        offset: 0
	      };
	      var beginBlockOffset = beginBlockData.offset,
	          beginBlockIndex = beginBlockData.index;
	      var beginBlock = this._blocks[beginBlockIndex];
	      if (!beginBlock) return cursorPos;
	      var beginBlockCursorPos = beginBlockOffset;
	      if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
	        beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
	      }
	      var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
	      var cursorAtLeft = beginBlockCursorPos === 0;
	      if (!cursorAtLeft && !cursorAtRight) return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
	      var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;
	      if (direction === DIRECTION.NONE) {
	        if (searchBlockIndex > 0) {
	          var blockIndexAtLeft = searchBlockIndex - 1;
	          var blockAtLeft = this._blocks[blockIndexAtLeft];
	          var blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE);
	          if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
	            return this._blockStartPos(searchBlockIndex);
	          }
	        }
	        var firstInputAtRight = searchBlockIndex;
	        for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
	          var blockAtRight = this._blocks[bi];
	          var _blockInputPos = blockAtRight.nearestInputPos(0, DIRECTION.NONE);
	          if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
	            return this._blockStartPos(bi) + _blockInputPos;
	          }
	        }
	        for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
	          var _block3 = this._blocks[_bi];
	          var _blockInputPos2 = _block3.nearestInputPos(0, DIRECTION.NONE);
	          if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
	            return this._blockStartPos(_bi) + _block3.value.length;
	          }
	        }
	        return cursorPos;
	      }
	      if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
	        var firstFilledBlockIndexAtRight;
	        for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
	          if (this._blocks[_bi2].value) {
	            firstFilledBlockIndexAtRight = _bi2;
	            break;
	          }
	        }
	        if (firstFilledBlockIndexAtRight != null) {
	          var filledBlock = this._blocks[firstFilledBlockIndexAtRight];
	          var _blockInputPos3 = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);
	          if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
	            return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
	          }
	        }
	        var firstFilledInputBlockIndex = -1;
	        var firstEmptyInputBlockIndex;
	        for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
	          var _block4 = this._blocks[_bi3];
	          var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, DIRECTION.FORCE_LEFT);
	          if (!_block4.value || _blockInputPos4 !== 0) firstEmptyInputBlockIndex = _bi3;
	          if (_blockInputPos4 !== 0) {
	            if (_blockInputPos4 !== _block4.value.length) {
	              return this._blockStartPos(_bi3) + _blockInputPos4;
	            } else {
	              firstFilledInputBlockIndex = _bi3;
	              break;
	            }
	          }
	        }
	        if (direction === DIRECTION.LEFT) {
	          for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
	            var _block5 = this._blocks[_bi4];
	            var _blockInputPos5 = _block5.nearestInputPos(0, DIRECTION.NONE);
	            var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;
	            if (blockAlignedPos > cursorPos) break;
	            if (_blockInputPos5 !== _block5.value.length) return blockAlignedPos;
	          }
	        }
	        if (firstFilledInputBlockIndex >= 0) {
	          return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
	        }
	        if (direction === DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
	          return 0;
	        }
	        if (firstEmptyInputBlockIndex != null) {
	          return this._blockStartPos(firstEmptyInputBlockIndex);
	        }
	        for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
	          var _block6 = this._blocks[_bi5];
	          var _blockInputPos6 = _block6.nearestInputPos(0, DIRECTION.NONE);
	          if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
	            return this._blockStartPos(_bi5) + _blockInputPos6;
	          }
	        }
	        return 0;
	      }
	      if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
	        var firstInputBlockAlignedIndex;
	        var firstInputBlockAlignedPos;
	        for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
	          var _block7 = this._blocks[_bi6];
	          var _blockInputPos7 = _block7.nearestInputPos(0, DIRECTION.NONE);
	          if (_blockInputPos7 !== _block7.value.length) {
	            firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
	            firstInputBlockAlignedIndex = _bi6;
	            break;
	          }
	        }
	        if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
	          for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
	            var _block8 = this._blocks[_bi7];
	            var _blockInputPos8 = _block8.nearestInputPos(0, DIRECTION.FORCE_RIGHT);
	            if (_blockInputPos8 !== _block8.value.length) {
	              return this._blockStartPos(_bi7) + _blockInputPos8;
	            }
	          }
	          return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
	        }
	        for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
	          var _block9 = this._blocks[_bi8];
	          var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, DIRECTION.LEFT);
	          if (_blockInputPos9 !== 0) {
	            var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;
	            if (alignedPos >= cursorPos) return alignedPos;
	            break;
	          }
	        }
	      }
	      return cursorPos;
	    }
	  }, {
	    key: "maskedBlock",
	    value: function maskedBlock(name) {
	      return this.maskedBlocks(name)[0];
	    }
	  }, {
	    key: "maskedBlocks",
	    value: function maskedBlocks(name) {
	      var _this4 = this;
	      var indices = this._maskedBlocks[name];
	      if (!indices) return [];
	      return indices.map(function (gi) {
	        return _this4._blocks[gi];
	      });
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.assign({}, _get(_getPrototypeOf(MaskedPattern.prototype), "state", this), {
	        _blocks: this._blocks.map(function (b) {
	          return b.state;
	        })
	      });
	    },
	    set: function set(state) {
	      var _blocks = state._blocks,
	          maskedState = _objectWithoutProperties(state, ["_blocks"]);
	      this._blocks.forEach(function (b, bi) {
	        return b.state = _blocks[bi];
	      });
	      _set(_getPrototypeOf(MaskedPattern.prototype), "state", maskedState, this, true);
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return this._blocks.every(function (b) {
	        return b.isComplete;
	      });
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._blocks.reduce(function (str, b) {
	        return str += b.unmaskedValue;
	      }, '');
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedPattern.prototype), "unmaskedValue", unmaskedValue, this, true);
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._blocks.reduce(function (str, b) {
	        return str += b.value;
	      }, '');
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedPattern.prototype), "value", value, this, true);
	    }
	  }]);
	  return MaskedPattern;
	}(Masked);
	MaskedPattern.DEFAULTS = {
	  lazy: true,
	  placeholderChar: '_'
	};
	MaskedPattern.STOP_CHAR = '`';
	MaskedPattern.ESCAPE_CHAR = '\\';
	MaskedPattern.InputDefinition = PatternInputDefinition;
	MaskedPattern.FixedDefinition = PatternFixedDefinition;
	function isInput(block) {
	  if (!block) return false;
	  var value = block.value;
	  return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
	}
	IMask.MaskedPattern = MaskedPattern;

	var MaskedRange =
	function (_MaskedPattern) {
	  _inherits(MaskedRange, _MaskedPattern);
	  function MaskedRange() {
	    _classCallCheck(this, MaskedRange);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRange).apply(this, arguments));
	  }
	  _createClass(MaskedRange, [{
	    key: "_update",
	    value: function _update(opts) {
	      opts = Object.assign({
	        to: this.to || 0,
	        from: this.from || 0
	      }, opts);
	      var maxLength = String(opts.to).length;
	      if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
	      opts.maxLength = maxLength;
	      var fromStr = String(opts.from).padStart(maxLength, '0');
	      var toStr = String(opts.to).padStart(maxLength, '0');
	      var sameCharsCount = 0;
	      while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
	        ++sameCharsCount;
	      }
	      opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);
	      _get(_getPrototypeOf(MaskedRange.prototype), "_update", this).call(this, opts);
	    }
	  }, {
	    key: "boundaries",
	    value: function boundaries(str) {
	      var minstr = '';
	      var maxstr = '';
	      var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
	          _ref2 = _slicedToArray(_ref, 3),
	          placeholder = _ref2[1],
	          num = _ref2[2];
	      if (num) {
	        minstr = '0'.repeat(placeholder.length) + num;
	        maxstr = '9'.repeat(placeholder.length) + num;
	      }
	      minstr = minstr.padEnd(this.maxLength, '0');
	      maxstr = maxstr.padEnd(this.maxLength, '9');
	      return [minstr, maxstr];
	    }
	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      str = _get(_getPrototypeOf(MaskedRange.prototype), "doPrepare", this).call(this, str, flags).replace(/\D/g, '');
	      if (!this.autofix) return str;
	      var fromStr = String(this.from).padStart(this.maxLength, '0');
	      var toStr = String(this.to).padStart(this.maxLength, '0');
	      var val = this.value;
	      var prepStr = '';
	      for (var ci = 0; ci < str.length; ++ci) {
	        var nextVal = val + prepStr + str[ci];
	        var _this$boundaries = this.boundaries(nextVal),
	            _this$boundaries2 = _slicedToArray(_this$boundaries, 2),
	            minstr = _this$boundaries2[0],
	            maxstr = _this$boundaries2[1];
	        if (Number(maxstr) < this.from) prepStr += fromStr[nextVal.length - 1];else if (Number(minstr) > this.to) prepStr += toStr[nextVal.length - 1];else prepStr += str[ci];
	      }
	      return prepStr;
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2;
	      var str = this.value;
	      var firstNonZero = str.search(/[^0]/);
	      if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
	      var _this$boundaries3 = this.boundaries(str),
	          _this$boundaries4 = _slicedToArray(_this$boundaries3, 2),
	          minstr = _this$boundaries4[0],
	          maxstr = _this$boundaries4[1];
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = _get(_getPrototypeOf(MaskedRange.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
	    }
	  }, {
	    key: "_matchFrom",
	    get: function get() {
	      return this.maxLength - String(this.from).length;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return _get(_getPrototypeOf(MaskedRange.prototype), "isComplete", this) && Boolean(this.value);
	    }
	  }]);
	  return MaskedRange;
	}(MaskedPattern);
	IMask.MaskedRange = MaskedRange;

	var MaskedDate =
	function (_MaskedPattern) {
	  _inherits(MaskedDate, _MaskedPattern);
	  function MaskedDate(opts) {
	    _classCallCheck(this, MaskedDate);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedDate).call(this, Object.assign({}, MaskedDate.DEFAULTS, {}, opts)));
	  }
	  _createClass(MaskedDate, [{
	    key: "_update",
	    value: function _update(opts) {
	      if (opts.mask === Date) delete opts.mask;
	      if (opts.pattern) opts.mask = opts.pattern;
	      var blocks = opts.blocks;
	      opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS());
	      if (opts.min) opts.blocks.Y.from = opts.min.getFullYear();
	      if (opts.max) opts.blocks.Y.to = opts.max.getFullYear();
	      if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
	        opts.blocks.m.from = opts.min.getMonth() + 1;
	        opts.blocks.m.to = opts.max.getMonth() + 1;
	        if (opts.blocks.m.from === opts.blocks.m.to) {
	          opts.blocks.d.from = opts.min.getDate();
	          opts.blocks.d.to = opts.max.getDate();
	        }
	      }
	      Object.assign(opts.blocks, blocks);
	      Object.keys(opts.blocks).forEach(function (bk) {
	        var b = opts.blocks[bk];
	        if (!('autofix' in b)) b.autofix = opts.autofix;
	      });
	      _get(_getPrototypeOf(MaskedDate.prototype), "_update", this).call(this, opts);
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2;
	      var date = this.date;
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return (_get2 = _get(_getPrototypeOf(MaskedDate.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
	    }
	  }, {
	    key: "isDateExist",
	    value: function isDateExist(str) {
	      return this.format(this.parse(str, this), this).indexOf(str) >= 0;
	    }
	  }, {
	    key: "date",
	    get: function get() {
	      return this.typedValue;
	    },
	    set: function set(date) {
	      this.typedValue = date;
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.isComplete ? _get(_getPrototypeOf(MaskedDate.prototype), "typedValue", this) : null;
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedDate.prototype), "typedValue", value, this, true);
	    }
	  }]);
	  return MaskedDate;
	}(MaskedPattern);
	MaskedDate.DEFAULTS = {
	  pattern: 'd{.}`m{.}`Y',
	  format: function format(date) {
	    var day = String(date.getDate()).padStart(2, '0');
	    var month = String(date.getMonth() + 1).padStart(2, '0');
	    var year = date.getFullYear();
	    return [day, month, year].join('.');
	  },
	  parse: function parse(str) {
	    var _str$split = str.split('.'),
	        _str$split2 = _slicedToArray(_str$split, 3),
	        day = _str$split2[0],
	        month = _str$split2[1],
	        year = _str$split2[2];
	    return new Date(year, month - 1, day);
	  }
	};
	MaskedDate.GET_DEFAULT_BLOCKS = function () {
	  return {
	    d: {
	      mask: MaskedRange,
	      from: 1,
	      to: 31,
	      maxLength: 2
	    },
	    m: {
	      mask: MaskedRange,
	      from: 1,
	      to: 12,
	      maxLength: 2
	    },
	    Y: {
	      mask: MaskedRange,
	      from: 1900,
	      to: 9999
	    }
	  };
	};
	IMask.MaskedDate = MaskedDate;

	var MaskElement =
	function () {
	  function MaskElement() {
	    _classCallCheck(this, MaskElement);
	  }
	  _createClass(MaskElement, [{
	    key: "select",
	    value: function select(start, end) {
	      if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;
	      try {
	        this._unsafeSelect(start, end);
	      } catch (e) {}
	    }
	  }, {
	    key: "_unsafeSelect",
	    value: function _unsafeSelect(start, end) {}
	  }, {
	    key: "bindEvents",
	    value: function bindEvents(handlers) {}
	  }, {
	    key: "unbindEvents",
	    value: function unbindEvents() {}
	  }, {
	    key: "selectionStart",
	    get: function get() {
	      var start;
	      try {
	        start = this._unsafeSelectionStart;
	      } catch (e) {}
	      return start != null ? start : this.value.length;
	    }
	  }, {
	    key: "selectionEnd",
	    get: function get() {
	      var end;
	      try {
	        end = this._unsafeSelectionEnd;
	      } catch (e) {}
	      return end != null ? end : this.value.length;
	    }
	  }, {
	    key: "isActive",
	    get: function get() {
	      return false;
	    }
	  }]);
	  return MaskElement;
	}();
	IMask.MaskElement = MaskElement;

	var HTMLMaskElement =
	function (_MaskElement) {
	  _inherits(HTMLMaskElement, _MaskElement);
	  function HTMLMaskElement(input) {
	    var _this;
	    _classCallCheck(this, HTMLMaskElement);
	    _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLMaskElement).call(this));
	    _this.input = input;
	    _this._handlers = {};
	    return _this;
	  }
	  _createClass(HTMLMaskElement, [{
	    key: "_unsafeSelect",
	    value: function _unsafeSelect(start, end) {
	      this.input.setSelectionRange(start, end);
	    }
	  }, {
	    key: "bindEvents",
	    value: function bindEvents(handlers) {
	      var _this2 = this;
	      Object.keys(handlers).forEach(function (event) {
	        return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
	      });
	    }
	  }, {
	    key: "unbindEvents",
	    value: function unbindEvents() {
	      var _this3 = this;
	      Object.keys(this._handlers).forEach(function (event) {
	        return _this3._toggleEventHandler(event);
	      });
	    }
	  }, {
	    key: "_toggleEventHandler",
	    value: function _toggleEventHandler(event, handler) {
	      if (this._handlers[event]) {
	        this.input.removeEventListener(event, this._handlers[event]);
	        delete this._handlers[event];
	      }
	      if (handler) {
	        this.input.addEventListener(event, handler);
	        this._handlers[event] = handler;
	      }
	    }
	  }, {
	    key: "rootElement",
	    get: function get() {
	      return this.input.getRootNode ? this.input.getRootNode() : document;
	    }
	  }, {
	    key: "isActive",
	    get: function get() {
	      return this.input === this.rootElement.activeElement;
	    }
	  }, {
	    key: "_unsafeSelectionStart",
	    get: function get() {
	      return this.input.selectionStart;
	    }
	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      return this.input.selectionEnd;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.input.value;
	    },
	    set: function set(value) {
	      this.input.value = value;
	    }
	  }]);
	  return HTMLMaskElement;
	}(MaskElement);
	HTMLMaskElement.EVENTS_MAP = {
	  selectionChange: 'keydown',
	  input: 'input',
	  drop: 'drop',
	  click: 'click',
	  focus: 'focus',
	  commit: 'blur'
	};
	IMask.HTMLMaskElement = HTMLMaskElement;

	var HTMLContenteditableMaskElement =
	function (_HTMLMaskElement) {
	  _inherits(HTMLContenteditableMaskElement, _HTMLMaskElement);
	  function HTMLContenteditableMaskElement() {
	    _classCallCheck(this, HTMLContenteditableMaskElement);
	    return _possibleConstructorReturn(this, _getPrototypeOf(HTMLContenteditableMaskElement).apply(this, arguments));
	  }
	  _createClass(HTMLContenteditableMaskElement, [{
	    key: "_unsafeSelect",
	    value: function _unsafeSelect(start, end) {
	      if (!this.rootElement.createRange) return;
	      var range = this.rootElement.createRange();
	      range.setStart(this.input.firstChild || this.input, start);
	      range.setEnd(this.input.lastChild || this.input, end);
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      if (selection) {
	        selection.removeAllRanges();
	        selection.addRange(range);
	      }
	    }
	  }, {
	    key: "_unsafeSelectionStart",
	    get: function get() {
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      return selection && selection.anchorOffset;
	    }
	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      return selection && this._unsafeSelectionStart + String(selection).length;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.input.textContent;
	    },
	    set: function set(value) {
	      this.input.textContent = value;
	    }
	  }]);
	  return HTMLContenteditableMaskElement;
	}(HTMLMaskElement);
	IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;

	var InputMask =
	function () {
	  function InputMask(el, opts) {
	    _classCallCheck(this, InputMask);
	    this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new HTMLContenteditableMaskElement(el) : new HTMLMaskElement(el);
	    this.masked = createMask(opts);
	    this._listeners = {};
	    this._value = '';
	    this._unmaskedValue = '';
	    this._saveSelection = this._saveSelection.bind(this);
	    this._onInput = this._onInput.bind(this);
	    this._onChange = this._onChange.bind(this);
	    this._onDrop = this._onDrop.bind(this);
	    this._onFocus = this._onFocus.bind(this);
	    this._onClick = this._onClick.bind(this);
	    this.alignCursor = this.alignCursor.bind(this);
	    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
	    this._bindEvents();
	    this.updateValue();
	    this._onChange();
	  }
	  _createClass(InputMask, [{
	    key: "maskEquals",
	    value: function maskEquals(mask) {
	      return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate;
	    }
	  }, {
	    key: "_bindEvents",
	    value: function _bindEvents() {
	      this.el.bindEvents({
	        selectionChange: this._saveSelection,
	        input: this._onInput,
	        drop: this._onDrop,
	        click: this._onClick,
	        focus: this._onFocus,
	        commit: this._onChange
	      });
	    }
	  }, {
	    key: "_unbindEvents",
	    value: function _unbindEvents() {
	      if (this.el) this.el.unbindEvents();
	    }
	  }, {
	    key: "_fireEvent",
	    value: function _fireEvent(ev) {
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	      var listeners = this._listeners[ev];
	      if (!listeners) return;
	      listeners.forEach(function (l) {
	        return l.apply(void 0, args);
	      });
	    }
	  }, {
	    key: "_saveSelection",
	    value: function _saveSelection()
	    {
	      if (this.value !== this.el.value) {
	        console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.');
	      }
	      this._selection = {
	        start: this.selectionStart,
	        end: this.cursorPos
	      };
	    }
	  }, {
	    key: "updateValue",
	    value: function updateValue() {
	      this.masked.value = this.el.value;
	      this._value = this.masked.value;
	    }
	  }, {
	    key: "updateControl",
	    value: function updateControl() {
	      var newUnmaskedValue = this.masked.unmaskedValue;
	      var newValue = this.masked.value;
	      var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
	      this._unmaskedValue = newUnmaskedValue;
	      this._value = newValue;
	      if (this.el.value !== newValue) this.el.value = newValue;
	      if (isChanged) this._fireChangeEvents();
	    }
	  }, {
	    key: "updateOptions",
	    value: function updateOptions(opts) {
	      var mask = opts.mask,
	          restOpts = _objectWithoutProperties(opts, ["mask"]);
	      var updateMask = !this.maskEquals(mask);
	      var updateOpts = !objectIncludes(this.masked, restOpts);
	      if (updateMask) this.mask = mask;
	      if (updateOpts) this.masked.updateOptions(restOpts);
	      if (updateMask || updateOpts) this.updateControl();
	    }
	  }, {
	    key: "updateCursor",
	    value: function updateCursor(cursorPos) {
	      if (cursorPos == null) return;
	      this.cursorPos = cursorPos;
	      this._delayUpdateCursor(cursorPos);
	    }
	  }, {
	    key: "_delayUpdateCursor",
	    value: function _delayUpdateCursor(cursorPos) {
	      var _this = this;
	      this._abortUpdateCursor();
	      this._changingCursorPos = cursorPos;
	      this._cursorChanging = setTimeout(function () {
	        if (!_this.el) return;
	        _this.cursorPos = _this._changingCursorPos;
	        _this._abortUpdateCursor();
	      }, 10);
	    }
	  }, {
	    key: "_fireChangeEvents",
	    value: function _fireChangeEvents() {
	      this._fireEvent('accept', this._inputEvent);
	      if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
	    }
	  }, {
	    key: "_abortUpdateCursor",
	    value: function _abortUpdateCursor() {
	      if (this._cursorChanging) {
	        clearTimeout(this._cursorChanging);
	        delete this._cursorChanging;
	      }
	    }
	  }, {
	    key: "alignCursor",
	    value: function alignCursor() {
	      this.cursorPos = this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT);
	    }
	  }, {
	    key: "alignCursorFriendly",
	    value: function alignCursorFriendly() {
	      if (this.selectionStart !== this.cursorPos) return;
	      this.alignCursor();
	    }
	  }, {
	    key: "on",
	    value: function on(ev, handler) {
	      if (!this._listeners[ev]) this._listeners[ev] = [];
	      this._listeners[ev].push(handler);
	      return this;
	    }
	  }, {
	    key: "off",
	    value: function off(ev, handler) {
	      if (!this._listeners[ev]) return this;
	      if (!handler) {
	        delete this._listeners[ev];
	        return this;
	      }
	      var hIndex = this._listeners[ev].indexOf(handler);
	      if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
	      return this;
	    }
	  }, {
	    key: "_onInput",
	    value: function _onInput(e) {
	      this._inputEvent = e;
	      this._abortUpdateCursor();
	      if (!this._selection) return this.updateValue();
	      var details = new ActionDetails(
	      this.el.value, this.cursorPos,
	      this.value, this._selection);
	      var oldRawValue = this.masked.rawInputValue;
	      var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset;
	      var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
	      var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
	      this.updateControl();
	      this.updateCursor(cursorPos);
	      delete this._inputEvent;
	    }
	  }, {
	    key: "_onChange",
	    value: function _onChange() {
	      if (this.value !== this.el.value) {
	        this.updateValue();
	      }
	      this.masked.doCommit();
	      this.updateControl();
	      this._saveSelection();
	    }
	  }, {
	    key: "_onDrop",
	    value: function _onDrop(ev) {
	      ev.preventDefault();
	      ev.stopPropagation();
	    }
	  }, {
	    key: "_onFocus",
	    value: function _onFocus(ev) {
	      this.alignCursorFriendly();
	    }
	  }, {
	    key: "_onClick",
	    value: function _onClick(ev) {
	      this.alignCursorFriendly();
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this._unbindEvents();
	      this._listeners.length = 0;
	      delete this.el;
	    }
	  }, {
	    key: "mask",
	    get: function get() {
	      return this.masked.mask;
	    },
	    set: function set(mask) {
	      if (this.maskEquals(mask)) return;
	      if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
	        this.masked.updateOptions({
	          mask: mask
	        });
	        return;
	      }
	      var masked = createMask({
	        mask: mask
	      });
	      masked.unmaskedValue = this.masked.unmaskedValue;
	      this.masked = masked;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(str) {
	      this.masked.value = str;
	      this.updateControl();
	      this.alignCursor();
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._unmaskedValue;
	    },
	    set: function set(str) {
	      this.masked.unmaskedValue = str;
	      this.updateControl();
	      this.alignCursor();
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.masked.typedValue;
	    },
	    set: function set(val) {
	      this.masked.typedValue = val;
	      this.updateControl();
	      this.alignCursor();
	    }
	  }, {
	    key: "selectionStart",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
	    }
	  }, {
	    key: "cursorPos",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
	    },
	    set: function set(pos) {
	      if (!this.el || !this.el.isActive) return;
	      this.el.select(pos, pos);
	      this._saveSelection();
	    }
	  }]);
	  return InputMask;
	}();
	IMask.InputMask = InputMask;

	var MaskedEnum =
	function (_MaskedPattern) {
	  _inherits(MaskedEnum, _MaskedPattern);
	  function MaskedEnum() {
	    _classCallCheck(this, MaskedEnum);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedEnum).apply(this, arguments));
	  }
	  _createClass(MaskedEnum, [{
	    key: "_update",
	    value: function _update(opts) {
	      if (opts.enum) opts.mask = '*'.repeat(opts.enum[0].length);
	      _get(_getPrototypeOf(MaskedEnum.prototype), "_update", this).call(this, opts);
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _this = this,
	          _get2;
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return this.enum.some(function (e) {
	        return e.indexOf(_this.unmaskedValue) >= 0;
	      }) && (_get2 = _get(_getPrototypeOf(MaskedEnum.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
	    }
	  }]);
	  return MaskedEnum;
	}(MaskedPattern);
	IMask.MaskedEnum = MaskedEnum;

	var MaskedNumber =
	function (_Masked) {
	  _inherits(MaskedNumber, _Masked);
	  function MaskedNumber(opts) {
	    _classCallCheck(this, MaskedNumber);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedNumber).call(this, Object.assign({}, MaskedNumber.DEFAULTS, {}, opts)));
	  }
	  _createClass(MaskedNumber, [{
	    key: "_update",
	    value: function _update(opts) {
	      _get(_getPrototypeOf(MaskedNumber.prototype), "_update", this).call(this, opts);
	      this._updateRegExps();
	    }
	  }, {
	    key: "_updateRegExps",
	    value: function _updateRegExps() {
	      var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
	      var midInput = '(0|([1-9]+\\d*))?';
	      var mid = '\\d*';
	      var end = (this.scale ? '(' + escapeRegExp(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
	      this._numberRegExpInput = new RegExp(start + midInput + end);
	      this._numberRegExp = new RegExp(start + mid + end);
	      this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
	      this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
	    }
	  }, {
	    key: "_removeThousandsSeparators",
	    value: function _removeThousandsSeparators(value) {
	      return value.replace(this._thousandsSeparatorRegExp, '');
	    }
	  }, {
	    key: "_insertThousandsSeparators",
	    value: function _insertThousandsSeparators(value) {
	      var parts = value.split(this.radix);
	      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
	      return parts.join(this.radix);
	    }
	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var _get2;
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	      return (_get2 = _get(_getPrototypeOf(MaskedNumber.prototype), "doPrepare", this)).call.apply(_get2, [this, this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix))].concat(args));
	    }
	  }, {
	    key: "_separatorsCount",
	    value: function _separatorsCount(to) {
	      var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var count = 0;
	      for (var pos = 0; pos < to; ++pos) {
	        if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
	          ++count;
	          if (extendOnSeparators) to += this.thousandsSeparator.length;
	        }
	      }
	      return count;
	    }
	  }, {
	    key: "_separatorsCountFromSlice",
	    value: function _separatorsCountFromSlice() {
	      var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
	      return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 ? arguments[2] : undefined;
	      var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);
	      var _this$_adjustRangeWit2 = _slicedToArray(_this$_adjustRangeWit, 2);
	      fromPos = _this$_adjustRangeWit2[0];
	      toPos = _this$_adjustRangeWit2[1];
	      return this._removeThousandsSeparators(_get(_getPrototypeOf(MaskedNumber.prototype), "extractInput", this).call(this, fromPos, toPos, flags));
	    }
	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      if (!this.thousandsSeparator) return _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
	      var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
	      var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
	      this._value = this._removeThousandsSeparators(this.value);
	      var appendDetails = _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
	      this._value = this._insertThousandsSeparators(this._value);
	      var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
	      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
	      appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
	      appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
	      return appendDetails;
	    }
	  }, {
	    key: "_findSeparatorAround",
	    value: function _findSeparatorAround(pos) {
	      if (this.thousandsSeparator) {
	        var searchFrom = pos - this.thousandsSeparator.length + 1;
	        var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
	        if (separatorPos <= pos) return separatorPos;
	      }
	      return -1;
	    }
	  }, {
	    key: "_adjustRangeWithSeparators",
	    value: function _adjustRangeWithSeparators(from, to) {
	      var separatorAroundFromPos = this._findSeparatorAround(from);
	      if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;
	      var separatorAroundToPos = this._findSeparatorAround(to);
	      if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
	      return [from, to];
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);
	      var _this$_adjustRangeWit4 = _slicedToArray(_this$_adjustRangeWit3, 2);
	      fromPos = _this$_adjustRangeWit4[0];
	      toPos = _this$_adjustRangeWit4[1];
	      var valueBeforePos = this.value.slice(0, fromPos);
	      var valueAfterPos = this.value.slice(toPos);
	      var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
	      this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
	      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
	      return new ChangeDetails({
	        tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
	      });
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos, direction) {
	      if (!this.thousandsSeparator) return cursorPos;
	      switch (direction) {
	        case DIRECTION.NONE:
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          {
	            var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
	            if (separatorAtLeftPos >= 0) {
	              var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
	              if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
	                return separatorAtLeftPos;
	              }
	            }
	            break;
	          }
	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	          {
	            var separatorAtRightPos = this._findSeparatorAround(cursorPos);
	            if (separatorAtRightPos >= 0) {
	              return separatorAtRightPos + this.thousandsSeparator.length;
	            }
	          }
	      }
	      return cursorPos;
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate(flags) {
	      var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp;
	      var valid = regexp.test(this._removeThousandsSeparators(this.value));
	      if (valid) {
	        var number = this.number;
	        valid = valid && !isNaN(number) && (
	        this.min == null || this.min >= 0 || this.min <= this.number) && (
	        this.max == null || this.max <= 0 || this.number <= this.max);
	      }
	      return valid && _get(_getPrototypeOf(MaskedNumber.prototype), "doValidate", this).call(this, flags);
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.value) {
	        var number = this.number;
	        var validnum = number;
	        if (this.min != null) validnum = Math.max(validnum, this.min);
	        if (this.max != null) validnum = Math.min(validnum, this.max);
	        if (validnum !== number) this.unmaskedValue = String(validnum);
	        var formatted = this.value;
	        if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
	        if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);
	        this._value = formatted;
	      }
	      _get(_getPrototypeOf(MaskedNumber.prototype), "doCommit", this).call(this);
	    }
	  }, {
	    key: "_normalizeZeros",
	    value: function _normalizeZeros(value) {
	      var parts = this._removeThousandsSeparators(value).split(this.radix);
	      parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
	        return sign + num;
	      });
	      if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';
	      if (parts.length > 1) {
	        parts[1] = parts[1].replace(/0*$/, '');
	        if (!parts[1].length) parts.length = 1;
	      }
	      return this._insertThousandsSeparators(parts.join(this.radix));
	    }
	  }, {
	    key: "_padFractionalZeros",
	    value: function _padFractionalZeros(value) {
	      if (!value) return value;
	      var parts = value.split(this.radix);
	      if (parts.length < 2) parts.push('');
	      parts[1] = parts[1].padEnd(this.scale, '0');
	      return parts.join(this.radix);
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", unmaskedValue.replace('.', this.radix), this, true);
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return Number(this.unmaskedValue);
	    },
	    set: function set(n) {
	      _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", String(n), this, true);
	    }
	  }, {
	    key: "number",
	    get: function get() {
	      return this.typedValue;
	    },
	    set: function set(number) {
	      this.typedValue = number;
	    }
	  }, {
	    key: "allowNegative",
	    get: function get() {
	      return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
	    }
	  }]);
	  return MaskedNumber;
	}(Masked);
	MaskedNumber.DEFAULTS = {
	  radix: ',',
	  thousandsSeparator: '',
	  mapToRadix: ['.'],
	  scale: 2,
	  signed: false,
	  normalizeZeros: true,
	  padFractionalZeros: false
	};
	IMask.MaskedNumber = MaskedNumber;

	var MaskedFunction =
	function (_Masked) {
	  _inherits(MaskedFunction, _Masked);
	  function MaskedFunction() {
	    _classCallCheck(this, MaskedFunction);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedFunction).apply(this, arguments));
	  }
	  _createClass(MaskedFunction, [{
	    key: "_update",
	    value: function _update(opts) {
	      if (opts.mask) opts.validate = opts.mask;
	      _get(_getPrototypeOf(MaskedFunction.prototype), "_update", this).call(this, opts);
	    }
	  }]);
	  return MaskedFunction;
	}(Masked);
	IMask.MaskedFunction = MaskedFunction;

	var MaskedDynamic =
	function (_Masked) {
	  _inherits(MaskedDynamic, _Masked);
	  function MaskedDynamic(opts) {
	    var _this;
	    _classCallCheck(this, MaskedDynamic);
	    _this = _possibleConstructorReturn(this, _getPrototypeOf(MaskedDynamic).call(this, Object.assign({}, MaskedDynamic.DEFAULTS, {}, opts)));
	    _this.currentMask = null;
	    return _this;
	  }
	  _createClass(MaskedDynamic, [{
	    key: "_update",
	    value: function _update(opts) {
	      _get(_getPrototypeOf(MaskedDynamic.prototype), "_update", this).call(this, opts);
	      if ('mask' in opts) {
	        this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function (m) {
	          return createMask(m);
	        }) : [];
	      }
	    }
	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw() {
	      var details = this._applyDispatch.apply(this, arguments);
	      if (this.currentMask) {
	        var _this$currentMask;
	        details.aggregate((_this$currentMask = this.currentMask)._appendChar.apply(_this$currentMask, arguments));
	      }
	      return details;
	    }
	  }, {
	    key: "_applyDispatch",
	    value: function _applyDispatch() {
	      var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
	      var inputValue = this.rawInputValue;
	      var insertValue = flags.tail && flags._beforeTailState != null ?
	      flags._beforeTailState._rawInputValue : inputValue;
	      var tailValue = inputValue.slice(insertValue.length);
	      var prevMask = this.currentMask;
	      var details = new ChangeDetails();
	      var prevMaskState = prevMask && prevMask.state;
	      this.currentMask = this.doDispatch(appended, Object.assign({}, flags));
	      if (this.currentMask) {
	        if (this.currentMask !== prevMask) {
	          this.currentMask.reset();
	          var d = this.currentMask.append(insertValue, {
	            raw: true
	          });
	          details.tailShift = d.inserted.length - prevValueBeforeTail.length;
	          if (tailValue) {
	            details.tailShift += this.currentMask.append(tailValue, {
	              raw: true,
	              tail: true
	            }).tailShift;
	          }
	        } else {
	          this.currentMask.state = prevMaskState;
	        }
	      }
	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = this._applyDispatch.apply(this, arguments);
	      if (this.currentMask) {
	        details.aggregate(this.currentMask._appendPlaceholder());
	      }
	      return details;
	    }
	  }, {
	    key: "doDispatch",
	    value: function doDispatch(appended) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.dispatch(appended, this, flags);
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2, _this$currentMask2;
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return (_get2 = _get(_getPrototypeOf(MaskedDynamic.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask2 = this.currentMask).doValidate.apply(_this$currentMask2, args));
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      if (this.currentMask) this.currentMask.reset();
	      this.compiledMasks.forEach(function (m) {
	        return m.reset();
	      });
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var details = new ChangeDetails();
	      if (this.currentMask) {
	        var _this$currentMask3;
	        details.aggregate((_this$currentMask3 = this.currentMask).remove.apply(_this$currentMask3, arguments))
	        .aggregate(this._applyDispatch());
	      }
	      return details;
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var _this$currentMask4;
	      return this.currentMask ? (_this$currentMask4 = this.currentMask).extractInput.apply(_this$currentMask4, arguments) : '';
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this$currentMask5, _get3;
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	      return this.currentMask ? (_this$currentMask5 = this.currentMask).extractTail.apply(_this$currentMask5, args) : (_get3 = _get(_getPrototypeOf(MaskedDynamic.prototype), "extractTail", this)).call.apply(_get3, [this].concat(args));
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.currentMask) this.currentMask.doCommit();
	      _get(_getPrototypeOf(MaskedDynamic.prototype), "doCommit", this).call(this);
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos() {
	      var _this$currentMask6, _get4;
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	      return this.currentMask ? (_this$currentMask6 = this.currentMask).nearestInputPos.apply(_this$currentMask6, args) : (_get4 = _get(_getPrototypeOf(MaskedDynamic.prototype), "nearestInputPos", this)).call.apply(_get4, [this].concat(args));
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.currentMask ? this.currentMask.value : '';
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "value", value, this, true);
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.unmaskedValue : '';
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "unmaskedValue", unmaskedValue, this, true);
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.typedValue : '';
	    }
	    ,
	    set: function set(value) {
	      var unmaskedValue = String(value);
	      if (this.currentMask) {
	        this.currentMask.typedValue = value;
	        unmaskedValue = this.currentMask.unmaskedValue;
	      }
	      this.unmaskedValue = unmaskedValue;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return !!this.currentMask && this.currentMask.isComplete;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.assign({}, _get(_getPrototypeOf(MaskedDynamic.prototype), "state", this), {
	        _rawInputValue: this.rawInputValue,
	        compiledMasks: this.compiledMasks.map(function (m) {
	          return m.state;
	        }),
	        currentMaskRef: this.currentMask,
	        currentMask: this.currentMask && this.currentMask.state
	      });
	    },
	    set: function set(state) {
	      var compiledMasks = state.compiledMasks,
	          currentMaskRef = state.currentMaskRef,
	          currentMask = state.currentMask,
	          maskedState = _objectWithoutProperties(state, ["compiledMasks", "currentMaskRef", "currentMask"]);
	      this.compiledMasks.forEach(function (m, mi) {
	        return m.state = compiledMasks[mi];
	      });
	      if (currentMaskRef != null) {
	        this.currentMask = currentMaskRef;
	        this.currentMask.state = currentMask;
	      }
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "state", maskedState, this, true);
	    }
	  }, {
	    key: "overwrite",
	    get: function get() {
	      return this.currentMask ? this.currentMask.overwrite : _get(_getPrototypeOf(MaskedDynamic.prototype), "overwrite", this);
	    },
	    set: function set(overwrite) {
	      console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
	    }
	  }]);
	  return MaskedDynamic;
	}(Masked);
	MaskedDynamic.DEFAULTS = {
	  dispatch: function dispatch(appended, masked, flags) {
	    if (!masked.compiledMasks.length) return;
	    var inputValue = masked.rawInputValue;
	    var inputs = masked.compiledMasks.map(function (m, index) {
	      m.reset();
	      m.append(inputValue, {
	        raw: true
	      });
	      m.append(appended, flags);
	      var weight = m.rawInputValue.length;
	      return {
	        weight: weight,
	        index: index
	      };
	    });
	    inputs.sort(function (i1, i2) {
	      return i2.weight - i1.weight;
	    });
	    return masked.compiledMasks[inputs[0].index];
	  }
	};
	IMask.MaskedDynamic = MaskedDynamic;

	var PIPE_TYPE = {
	  MASKED: 'value',
	  UNMASKED: 'unmaskedValue',
	  TYPED: 'typedValue'
	};
	function createPipe(mask) {
	  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIPE_TYPE.MASKED;
	  var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PIPE_TYPE.MASKED;
	  var masked = createMask(mask);
	  return function (value) {
	    return masked.runIsolated(function (m) {
	      m[from] = value;
	      return m[to];
	    });
	  };
	}
	function pipe(value) {
	  for (var _len = arguments.length, pipeArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    pipeArgs[_key - 1] = arguments[_key];
	  }
	  return createPipe.apply(void 0, pipeArgs)(value);
	}
	IMask.PIPE_TYPE = PIPE_TYPE;
	IMask.createPipe = createPipe;
	IMask.pipe = pipe;

	try {
	  globalThis.IMask = IMask;
	} catch (e) {}

	var maskElementList = [].slice.call(document.querySelectorAll('[data-mask]'));
	maskElementList.map(function (maskEl) {
	  return new IMask(maskEl, {
	    mask: maskEl.dataset.mask,
	    lazy: maskEl.dataset['mask-visible'] === 'true'
	  });
	});

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = [].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []);
	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead';
	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain';
	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name];
	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    }
	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {});
	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	}
	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	function getLayoutRect(element) {
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: element.offsetWidth,
	    height: element.offsetHeight
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode();
	  if (parent.contains(child)) {
	    return true;
	  }
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;
	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        }
	        next = next.parentNode || next.host;
	      } while (next);
	    }
	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  return ((isElement(element) ? element.ownerDocument :
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    element.assignedSlot ||
	    element.parentNode ||
	    element.host ||
	    getDocumentElement(element)
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) ||
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  var offsetParent = element.offsetParent;
	  if (offsetParent) {
	    var html = getDocumentElement(offsetParent);
	    if (getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && getComputedStyle$1(html).position !== 'static') {
	      return html;
	    }
	  }
	  return offsetParent;
	}
	function getContainingBlock(element) {
	  var currentNode = getParentNode(element);
	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode);
	    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	}
	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static') {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min, value, max) {
	  return Math.max(min, Math.min(value, max));
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	      name = _ref.name;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = state.modifiersData[name + "#persistent"].padding;
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2;
	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max);
	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
	      _options$padding = options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  if (arrowElement == null) {
	    return;
	  }
	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	  state.modifiersData[name + "#persistent"] = {
	    padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
	  };
	}
	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	};
	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: Math.round(x * dpr) / dpr || 0,
	    y: Math.round(y * dpr) / dpr || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets;
	  var _ref3 = roundOffsets ? roundOffsetsByDPR(offsets) : offsets,
	      _ref3$x = _ref3.x,
	      x = _ref3$x === void 0 ? 0 : _ref3$x,
	      _ref3$y = _ref3.y,
	      y = _ref3$y === void 0 ? 0 : _ref3$y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	    }
	    if (placement === top) {
	      sideY = bottom;
	      y -= offsetParent.clientHeight - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left) {
	      sideX = right;
	      x -= offsetParent.clientWidth - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref4) {
	  var state = _ref4.state,
	      options = _ref4.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
	    'data-popper-placement': state.placement
	  });
	}
	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect$2(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	}
	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect$2,
	  data: {}
	};

	var hash = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash[matched];
	  });
	}

	var hash$1 = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	function getBoundingClientRect(element) {
	  var rect = element.getBoundingClientRect();
	  return {
	    width: rect.width,
	    height: rect.height,
	    top: rect.top,
	    right: rect.right,
	    bottom: rect.bottom,
	    left: rect.left,
	    x: rect.left,
	    y: rect.top
	  };
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	function getDocumentRect(element) {
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = element.ownerDocument.body;
	  var width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  var _getComputedStyle = getComputedStyle$1(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	function listScrollParents(element, list) {
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = getNodeName(scrollParent) === 'body';
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign(Object.assign({}, rect), {}, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	}
	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
	  if (!isElement(clipperElement)) {
	    return [];
	  }
	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	}
	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = Math.max(rect.top, accRect.top);
	    accRect.right = Math.min(rect.right, accRect.right);
	    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
	    accRect.left = Math.max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var referenceElement = state.elements.reference;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(referenceElement);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign(Object.assign({}, popperRect), popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset;
	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  }
	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	}
	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	}
	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	}
	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	}
	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
	    placement: state.placement
	  })) : tetherOffset;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis) {
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min = popperOffsets[mainAxis] + overflow[mainSide];
	    var max = popperOffsets[mainAxis] - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide];
	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
	    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }
	  if (checkAltAxis) {
	    var _mainSide = mainAxis === 'x' ? top : left;
	    var _altSide = mainAxis === 'x' ? bottom : right;
	    var _offset = popperOffsets[altAxis];
	    var _min = _offset + overflow[_mainSide];
	    var _max = _offset - overflow[_altSide];
	    var _preventedOffset = within(_min, _offset, _max);
	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }
	  state.modifiersData[name] = data;
	}
	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement);
	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }
	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  });
	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  var orderedModifiers = order(modifiers);
	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
	      options: Object.assign(Object.assign({}, existing.options), current.options),
	      data: Object.assign(Object.assign({}, existing.data), current.data)
	    }) : current;
	    return merged;
	  }, {});
	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(options) {
	        cleanupModifierEffects();
	        state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        };
	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        });
	        runModifierEffects();
	        return instance.update();
	      },
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper;
	        if (!areValidElements(reference, popper)) {
	          return;
	        }
	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        };
	        state.reset = false;
	        state.placement = state.options.placement;
	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    });
	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper = popperGenerator();

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = popperGenerator({
	  defaultModifiers: defaultModifiers
	});

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper$2 = popperGenerator({
	  defaultModifiers: defaultModifiers$1
	});

	var Popper = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper,
		createPopper: createPopper$2,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	/*!
	  * Bootstrap v5.0.0-beta1 (https://getbootstrap.com/)
	  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */
	function _defineProperties$1(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}
	function _createClass$1(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties$1(Constructor, staticProps);
	  return Constructor;
	}
	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];
	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	    return target;
	  };
	  return _extends.apply(this, arguments);
	}
	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}
	var MAX_UID = 1000000;
	var MILLISECONDS_MULTIPLIER = 1000;
	var TRANSITION_END = 'transitionend';
	var toType = function toType(obj) {
	  if (obj === null || obj === undefined) {
	    return "" + obj;
	  }
	  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	};
	var getUID = function getUID(prefix) {
	  do {
	    prefix += Math.floor(Math.random() * MAX_UID);
	  } while (document.getElementById(prefix));
	  return prefix;
	};
	var getSelector = function getSelector(element) {
	  var selector = element.getAttribute('data-bs-target');
	  if (!selector || selector === '#') {
	    var hrefAttr = element.getAttribute('href');
	    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	  }
	  return selector;
	};
	var getSelectorFromElement = function getSelectorFromElement(element) {
	  var selector = getSelector(element);
	  if (selector) {
	    return document.querySelector(selector) ? selector : null;
	  }
	  return null;
	};
	var getElementFromSelector = function getElementFromSelector(element) {
	  var selector = getSelector(element);
	  return selector ? document.querySelector(selector) : null;
	};
	var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
	  if (!element) {
	    return 0;
	  }
	  var _window$getComputedSt = window.getComputedStyle(element),
	      transitionDuration = _window$getComputedSt.transitionDuration,
	      transitionDelay = _window$getComputedSt.transitionDelay;
	  var floatTransitionDuration = Number.parseFloat(transitionDuration);
	  var floatTransitionDelay = Number.parseFloat(transitionDelay);
	  if (!floatTransitionDuration && !floatTransitionDelay) {
	    return 0;
	  }
	  transitionDuration = transitionDuration.split(',')[0];
	  transitionDelay = transitionDelay.split(',')[0];
	  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	};
	var triggerTransitionEnd = function triggerTransitionEnd(element) {
	  element.dispatchEvent(new Event(TRANSITION_END));
	};
	var isElement$1 = function isElement(obj) {
	  return (obj[0] || obj).nodeType;
	};
	var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
	  var called = false;
	  var durationPadding = 5;
	  var emulatedDuration = duration + durationPadding;
	  function listener() {
	    called = true;
	    element.removeEventListener(TRANSITION_END, listener);
	  }
	  element.addEventListener(TRANSITION_END, listener);
	  setTimeout(function () {
	    if (!called) {
	      triggerTransitionEnd(element);
	    }
	  }, emulatedDuration);
	};
	var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
	  Object.keys(configTypes).forEach(function (property) {
	    var expectedTypes = configTypes[property];
	    var value = config[property];
	    var valueType = value && isElement$1(value) ? 'element' : toType(value);
	    if (!new RegExp(expectedTypes).test(valueType)) {
	      throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
	    }
	  });
	};
	var isVisible = function isVisible(element) {
	  if (!element) {
	    return false;
	  }
	  if (element.style && element.parentNode && element.parentNode.style) {
	    var elementStyle = getComputedStyle(element);
	    var parentNodeStyle = getComputedStyle(element.parentNode);
	    return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
	  }
	  return false;
	};
	var findShadowRoot = function findShadowRoot(element) {
	  if (!document.documentElement.attachShadow) {
	    return null;
	  }
	  if (typeof element.getRootNode === 'function') {
	    var root = element.getRootNode();
	    return root instanceof ShadowRoot ? root : null;
	  }
	  if (element instanceof ShadowRoot) {
	    return element;
	  }
	  if (!element.parentNode) {
	    return null;
	  }
	  return findShadowRoot(element.parentNode);
	};
	var noop = function noop() {
	  return function () {};
	};
	var reflow = function reflow(element) {
	  return element.offsetHeight;
	};
	var getjQuery = function getjQuery() {
	  var _window = window,
	      jQuery = _window.jQuery;
	  if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	    return jQuery;
	  }
	  return null;
	};
	var onDOMContentLoaded = function onDOMContentLoaded(callback) {
	  if (document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded', callback);
	  } else {
	    callback();
	  }
	};
	var isRTL = document.documentElement.dir === 'rtl';
	var mapData = function () {
	  var storeData = {};
	  var id = 1;
	  return {
	    set: function set(element, key, data) {
	      if (typeof element.bsKey === 'undefined') {
	        element.bsKey = {
	          key: key,
	          id: id
	        };
	        id++;
	      }
	      storeData[element.bsKey.id] = data;
	    },
	    get: function get(element, key) {
	      if (!element || typeof element.bsKey === 'undefined') {
	        return null;
	      }
	      var keyProperties = element.bsKey;
	      if (keyProperties.key === key) {
	        return storeData[keyProperties.id];
	      }
	      return null;
	    },
	    delete: function _delete(element, key) {
	      if (typeof element.bsKey === 'undefined') {
	        return;
	      }
	      var keyProperties = element.bsKey;
	      if (keyProperties.key === key) {
	        delete storeData[keyProperties.id];
	        delete element.bsKey;
	      }
	    }
	  };
	}();
	var Data = {
	  setData: function setData(instance, key, data) {
	    mapData.set(instance, key, data);
	  },
	  getData: function getData(instance, key) {
	    return mapData.get(instance, key);
	  },
	  removeData: function removeData(instance, key) {
	    mapData.delete(instance, key);
	  }
	};
	var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	var stripNameRegex = /\..*/;
	var stripUidRegex = /::\d+$/;
	var eventRegistry = {};
	var uidEvent = 1;
	var customEvents = {
	  mouseenter: 'mouseover',
	  mouseleave: 'mouseout'
	};
	var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	function getUidEvent(element, uid) {
	  return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
	}
	function getEvent(element) {
	  var uid = getUidEvent(element);
	  element.uidEvent = uid;
	  eventRegistry[uid] = eventRegistry[uid] || {};
	  return eventRegistry[uid];
	}
	function bootstrapHandler(element, fn) {
	  return function handler(event) {
	    event.delegateTarget = element;
	    if (handler.oneOff) {
	      EventHandler.off(element, event.type, fn);
	    }
	    return fn.apply(element, [event]);
	  };
	}
	function bootstrapDelegationHandler(element, selector, fn) {
	  return function handler(event) {
	    var domElements = element.querySelectorAll(selector);
	    for (var target = event.target; target && target !== this; target = target.parentNode) {
	      for (var i = domElements.length; i--;) {
	        if (domElements[i] === target) {
	          event.delegateTarget = target;
	          if (handler.oneOff) {
	            EventHandler.off(element, event.type, fn);
	          }
	          return fn.apply(target, [event]);
	        }
	      }
	    }
	    return null;
	  };
	}
	function findHandler(events, handler, delegationSelector) {
	  if (delegationSelector === void 0) {
	    delegationSelector = null;
	  }
	  var uidEventList = Object.keys(events);
	  for (var i = 0, len = uidEventList.length; i < len; i++) {
	    var event = events[uidEventList[i]];
	    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
	      return event;
	    }
	  }
	  return null;
	}
	function normalizeParams(originalTypeEvent, handler, delegationFn) {
	  var delegation = typeof handler === 'string';
	  var originalHandler = delegation ? delegationFn : handler;
	  var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
	  var custom = customEvents[typeEvent];
	  if (custom) {
	    typeEvent = custom;
	  }
	  var isNative = nativeEvents.has(typeEvent);
	  if (!isNative) {
	    typeEvent = originalTypeEvent;
	  }
	  return [delegation, originalHandler, typeEvent];
	}
	function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
	  if (typeof originalTypeEvent !== 'string' || !element) {
	    return;
	  }
	  if (!handler) {
	    handler = delegationFn;
	    delegationFn = null;
	  }
	  var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
	      delegation = _normalizeParams[0],
	      originalHandler = _normalizeParams[1],
	      typeEvent = _normalizeParams[2];
	  var events = getEvent(element);
	  var handlers = events[typeEvent] || (events[typeEvent] = {});
	  var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
	  if (previousFn) {
	    previousFn.oneOff = previousFn.oneOff && oneOff;
	    return;
	  }
	  var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
	  var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
	  fn.delegationSelector = delegation ? handler : null;
	  fn.originalHandler = originalHandler;
	  fn.oneOff = oneOff;
	  fn.uidEvent = uid;
	  handlers[uid] = fn;
	  element.addEventListener(typeEvent, fn, delegation);
	}
	function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	  var fn = findHandler(events[typeEvent], handler, delegationSelector);
	  if (!fn) {
	    return;
	  }
	  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	  delete events[typeEvent][fn.uidEvent];
	}
	function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	  var storeElementEvent = events[typeEvent] || {};
	  Object.keys(storeElementEvent).forEach(function (handlerKey) {
	    if (handlerKey.includes(namespace)) {
	      var event = storeElementEvent[handlerKey];
	      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	    }
	  });
	}
	var EventHandler = {
	  on: function on(element, event, handler, delegationFn) {
	    addHandler(element, event, handler, delegationFn, false);
	  },
	  one: function one(element, event, handler, delegationFn) {
	    addHandler(element, event, handler, delegationFn, true);
	  },
	  off: function off(element, originalTypeEvent, handler, delegationFn) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }
	    var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
	        delegation = _normalizeParams2[0],
	        originalHandler = _normalizeParams2[1],
	        typeEvent = _normalizeParams2[2];
	    var inNamespace = typeEvent !== originalTypeEvent;
	    var events = getEvent(element);
	    var isNamespace = originalTypeEvent.startsWith('.');
	    if (typeof originalHandler !== 'undefined') {
	      if (!events || !events[typeEvent]) {
	        return;
	      }
	      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
	      return;
	    }
	    if (isNamespace) {
	      Object.keys(events).forEach(function (elementEvent) {
	        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	      });
	    }
	    var storeElementEvent = events[typeEvent] || {};
	    Object.keys(storeElementEvent).forEach(function (keyHandlers) {
	      var handlerKey = keyHandlers.replace(stripUidRegex, '');
	      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	        var event = storeElementEvent[keyHandlers];
	        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	      }
	    });
	  },
	  trigger: function trigger(element, event, args) {
	    if (typeof event !== 'string' || !element) {
	      return null;
	    }
	    var $ = getjQuery();
	    var typeEvent = event.replace(stripNameRegex, '');
	    var inNamespace = event !== typeEvent;
	    var isNative = nativeEvents.has(typeEvent);
	    var jQueryEvent;
	    var bubbles = true;
	    var nativeDispatch = true;
	    var defaultPrevented = false;
	    var evt = null;
	    if (inNamespace && $) {
	      jQueryEvent = $.Event(event, args);
	      $(element).trigger(jQueryEvent);
	      bubbles = !jQueryEvent.isPropagationStopped();
	      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	      defaultPrevented = jQueryEvent.isDefaultPrevented();
	    }
	    if (isNative) {
	      evt = document.createEvent('HTMLEvents');
	      evt.initEvent(typeEvent, bubbles, true);
	    } else {
	      evt = new CustomEvent(event, {
	        bubbles: bubbles,
	        cancelable: true
	      });
	    }
	    if (typeof args !== 'undefined') {
	      Object.keys(args).forEach(function (key) {
	        Object.defineProperty(evt, key, {
	          get: function get() {
	            return args[key];
	          }
	        });
	      });
	    }
	    if (defaultPrevented) {
	      evt.preventDefault();
	    }
	    if (nativeDispatch) {
	      element.dispatchEvent(evt);
	    }
	    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
	      jQueryEvent.preventDefault();
	    }
	    return evt;
	  }
	};
	var VERSION = '5.0.0-beta1';
	var BaseComponent = function () {
	  function BaseComponent(element) {
	    if (!element) {
	      return;
	    }
	    this._element = element;
	    Data.setData(element, this.constructor.DATA_KEY, this);
	  }
	  var _proto = BaseComponent.prototype;
	  _proto.dispose = function dispose() {
	    Data.removeData(this._element, this.constructor.DATA_KEY);
	    this._element = null;
	  }
	  ;
	  BaseComponent.getInstance = function getInstance(element) {
	    return Data.getData(element, this.DATA_KEY);
	  };
	  _createClass$1(BaseComponent, null, [{
	    key: "VERSION",
	    get: function get() {
	      return VERSION;
	    }
	  }]);
	  return BaseComponent;
	}();
	var NAME = 'alert';
	var DATA_KEY = 'bs.alert';
	var EVENT_KEY = "." + DATA_KEY;
	var DATA_API_KEY = '.data-api';
	var SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
	var EVENT_CLOSE = "close" + EVENT_KEY;
	var EVENT_CLOSED = "closed" + EVENT_KEY;
	var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
	var CLASSNAME_ALERT = 'alert';
	var CLASSNAME_FADE = 'fade';
	var CLASSNAME_SHOW = 'show';
	var Alert = function (_BaseComponent) {
	  _inheritsLoose(Alert, _BaseComponent);
	  function Alert() {
	    return _BaseComponent.apply(this, arguments) || this;
	  }
	  var _proto = Alert.prototype;
	  _proto.close = function close(element) {
	    var rootElement = element ? this._getRootElement(element) : this._element;
	    var customEvent = this._triggerCloseEvent(rootElement);
	    if (customEvent === null || customEvent.defaultPrevented) {
	      return;
	    }
	    this._removeElement(rootElement);
	  }
	  ;
	  _proto._getRootElement = function _getRootElement(element) {
	    return getElementFromSelector(element) || element.closest("." + CLASSNAME_ALERT);
	  };
	  _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
	    return EventHandler.trigger(element, EVENT_CLOSE);
	  };
	  _proto._removeElement = function _removeElement(element) {
	    var _this = this;
	    element.classList.remove(CLASSNAME_SHOW);
	    if (!element.classList.contains(CLASSNAME_FADE)) {
	      this._destroyElement(element);
	      return;
	    }
	    var transitionDuration = getTransitionDurationFromElement(element);
	    EventHandler.one(element, TRANSITION_END, function () {
	      return _this._destroyElement(element);
	    });
	    emulateTransitionEnd(element, transitionDuration);
	  };
	  _proto._destroyElement = function _destroyElement(element) {
	    if (element.parentNode) {
	      element.parentNode.removeChild(element);
	    }
	    EventHandler.trigger(element, EVENT_CLOSED);
	  }
	  ;
	  Alert.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Data.getData(this, DATA_KEY);
	      if (!data) {
	        data = new Alert(this);
	      }
	      if (config === 'close') {
	        data[config](this);
	      }
	    });
	  };
	  Alert.handleDismiss = function handleDismiss(alertInstance) {
	    return function (event) {
	      if (event) {
	        event.preventDefault();
	      }
	      alertInstance.close(this);
	    };
	  };
	  _createClass$1(Alert, null, [{
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY;
	    }
	  }]);
	  return Alert;
	}(BaseComponent);
	EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME];
	    $.fn[NAME] = Alert.jQueryInterface;
	    $.fn[NAME].Constructor = Alert;
	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Alert.jQueryInterface;
	    };
	  }
	});
	var NAME$1 = 'button';
	var DATA_KEY$1 = 'bs.button';
	var EVENT_KEY$1 = "." + DATA_KEY$1;
	var DATA_API_KEY$1 = '.data-api';
	var CLASS_NAME_ACTIVE = 'active';
	var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
	var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
	var Button = function (_BaseComponent) {
	  _inheritsLoose(Button, _BaseComponent);
	  function Button() {
	    return _BaseComponent.apply(this, arguments) || this;
	  }
	  var _proto = Button.prototype;
	  _proto.toggle = function toggle() {
	    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
	  }
	  ;
	  Button.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Data.getData(this, DATA_KEY$1);
	      if (!data) {
	        data = new Button(this);
	      }
	      if (config === 'toggle') {
	        data[config]();
	      }
	    });
	  };
	  _createClass$1(Button, null, [{
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$1;
	    }
	  }]);
	  return Button;
	}(BaseComponent);
	EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function (event) {
	  event.preventDefault();
	  var button = event.target.closest(SELECTOR_DATA_TOGGLE);
	  var data = Data.getData(button, DATA_KEY$1);
	  if (!data) {
	    data = new Button(button);
	  }
	  data.toggle();
	});
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$1];
	    $.fn[NAME$1] = Button.jQueryInterface;
	    $.fn[NAME$1].Constructor = Button;
	    $.fn[NAME$1].noConflict = function () {
	      $.fn[NAME$1] = JQUERY_NO_CONFLICT;
	      return Button.jQueryInterface;
	    };
	  }
	});
	function normalizeData(val) {
	  if (val === 'true') {
	    return true;
	  }
	  if (val === 'false') {
	    return false;
	  }
	  if (val === Number(val).toString()) {
	    return Number(val);
	  }
	  if (val === '' || val === 'null') {
	    return null;
	  }
	  return val;
	}
	function normalizeDataKey(key) {
	  return key.replace(/[A-Z]/g, function (chr) {
	    return "-" + chr.toLowerCase();
	  });
	}
	var Manipulator = {
	  setDataAttribute: function setDataAttribute(element, key, value) {
	    element.setAttribute("data-bs-" + normalizeDataKey(key), value);
	  },
	  removeDataAttribute: function removeDataAttribute(element, key) {
	    element.removeAttribute("data-bs-" + normalizeDataKey(key));
	  },
	  getDataAttributes: function getDataAttributes(element) {
	    if (!element) {
	      return {};
	    }
	    var attributes = {};
	    Object.keys(element.dataset).filter(function (key) {
	      return key.startsWith('bs');
	    }).forEach(function (key) {
	      var pureKey = key.replace(/^bs/, '');
	      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	      attributes[pureKey] = normalizeData(element.dataset[key]);
	    });
	    return attributes;
	  },
	  getDataAttribute: function getDataAttribute(element, key) {
	    return normalizeData(element.getAttribute("data-bs-" + normalizeDataKey(key)));
	  },
	  offset: function offset(element) {
	    var rect = element.getBoundingClientRect();
	    return {
	      top: rect.top + document.body.scrollTop,
	      left: rect.left + document.body.scrollLeft
	    };
	  },
	  position: function position(element) {
	    return {
	      top: element.offsetTop,
	      left: element.offsetLeft
	    };
	  }
	};
	var NODE_TEXT = 3;
	var SelectorEngine = {
	  matches: function matches(element, selector) {
	    return element.matches(selector);
	  },
	  find: function find(selector, element) {
	    var _ref;
	    if (element === void 0) {
	      element = document.documentElement;
	    }
	    return (_ref = []).concat.apply(_ref, Element.prototype.querySelectorAll.call(element, selector));
	  },
	  findOne: function findOne(selector, element) {
	    if (element === void 0) {
	      element = document.documentElement;
	    }
	    return Element.prototype.querySelector.call(element, selector);
	  },
	  children: function children(element, selector) {
	    var _ref2;
	    var children = (_ref2 = []).concat.apply(_ref2, element.children);
	    return children.filter(function (child) {
	      return child.matches(selector);
	    });
	  },
	  parents: function parents(element, selector) {
	    var parents = [];
	    var ancestor = element.parentNode;
	    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
	      if (this.matches(ancestor, selector)) {
	        parents.push(ancestor);
	      }
	      ancestor = ancestor.parentNode;
	    }
	    return parents;
	  },
	  prev: function prev(element, selector) {
	    var previous = element.previousElementSibling;
	    while (previous) {
	      if (previous.matches(selector)) {
	        return [previous];
	      }
	      previous = previous.previousElementSibling;
	    }
	    return [];
	  },
	  next: function next(element, selector) {
	    var next = element.nextElementSibling;
	    while (next) {
	      if (this.matches(next, selector)) {
	        return [next];
	      }
	      next = next.nextElementSibling;
	    }
	    return [];
	  }
	};
	var NAME$2 = 'carousel';
	var DATA_KEY$2 = 'bs.carousel';
	var EVENT_KEY$2 = "." + DATA_KEY$2;
	var DATA_API_KEY$2 = '.data-api';
	var ARROW_LEFT_KEY = 'ArrowLeft';
	var ARROW_RIGHT_KEY = 'ArrowRight';
	var TOUCHEVENT_COMPAT_WAIT = 500;
	var SWIPE_THRESHOLD = 40;
	var Default = {
	  interval: 5000,
	  keyboard: true,
	  slide: false,
	  pause: 'hover',
	  wrap: true,
	  touch: true
	};
	var DefaultType = {
	  interval: '(number|boolean)',
	  keyboard: 'boolean',
	  slide: '(boolean|string)',
	  pause: '(string|boolean)',
	  wrap: 'boolean',
	  touch: 'boolean'
	};
	var DIRECTION_NEXT = 'next';
	var DIRECTION_PREV = 'prev';
	var DIRECTION_LEFT = 'left';
	var DIRECTION_RIGHT = 'right';
	var EVENT_SLIDE = "slide" + EVENT_KEY$2;
	var EVENT_SLID = "slid" + EVENT_KEY$2;
	var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
	var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
	var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
	var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
	var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
	var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
	var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
	var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
	var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
	var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
	var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
	var CLASS_NAME_CAROUSEL = 'carousel';
	var CLASS_NAME_ACTIVE$1 = 'active';
	var CLASS_NAME_SLIDE = 'slide';
	var CLASS_NAME_END = 'carousel-item-end';
	var CLASS_NAME_START = 'carousel-item-start';
	var CLASS_NAME_NEXT = 'carousel-item-next';
	var CLASS_NAME_PREV = 'carousel-item-prev';
	var CLASS_NAME_POINTER_EVENT = 'pointer-event';
	var SELECTOR_ACTIVE = '.active';
	var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
	var SELECTOR_ITEM = '.carousel-item';
	var SELECTOR_ITEM_IMG = '.carousel-item img';
	var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
	var SELECTOR_INDICATORS = '.carousel-indicators';
	var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	var PointerType = {
	  TOUCH: 'touch',
	  PEN: 'pen'
	};
	var Carousel = function (_BaseComponent) {
	  _inheritsLoose(Carousel, _BaseComponent);
	  function Carousel(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element) || this;
	    _this._items = null;
	    _this._interval = null;
	    _this._activeElement = null;
	    _this._isPaused = false;
	    _this._isSliding = false;
	    _this.touchTimeout = null;
	    _this.touchStartX = 0;
	    _this.touchDeltaX = 0;
	    _this._config = _this._getConfig(config);
	    _this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this._element);
	    _this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	    _this._pointerEvent = Boolean(window.PointerEvent);
	    _this._addEventListeners();
	    return _this;
	  }
	  var _proto = Carousel.prototype;
	  _proto.next = function next() {
	    if (!this._isSliding) {
	      this._slide(DIRECTION_NEXT);
	    }
	  };
	  _proto.nextWhenVisible = function nextWhenVisible() {
	    if (!document.hidden && isVisible(this._element)) {
	      this.next();
	    }
	  };
	  _proto.prev = function prev() {
	    if (!this._isSliding) {
	      this._slide(DIRECTION_PREV);
	    }
	  };
	  _proto.pause = function pause(event) {
	    if (!event) {
	      this._isPaused = true;
	    }
	    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
	      triggerTransitionEnd(this._element);
	      this.cycle(true);
	    }
	    clearInterval(this._interval);
	    this._interval = null;
	  };
	  _proto.cycle = function cycle(event) {
	    if (!event) {
	      this._isPaused = false;
	    }
	    if (this._interval) {
	      clearInterval(this._interval);
	      this._interval = null;
	    }
	    if (this._config && this._config.interval && !this._isPaused) {
	      this._updateInterval();
	      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
	    }
	  };
	  _proto.to = function to(index) {
	    var _this2 = this;
	    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	    var activeIndex = this._getItemIndex(this._activeElement);
	    if (index > this._items.length - 1 || index < 0) {
	      return;
	    }
	    if (this._isSliding) {
	      EventHandler.one(this._element, EVENT_SLID, function () {
	        return _this2.to(index);
	      });
	      return;
	    }
	    if (activeIndex === index) {
	      this.pause();
	      this.cycle();
	      return;
	    }
	    var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;
	    this._slide(direction, this._items[index]);
	  };
	  _proto.dispose = function dispose() {
	    _BaseComponent.prototype.dispose.call(this);
	    EventHandler.off(this._element, EVENT_KEY$2);
	    this._items = null;
	    this._config = null;
	    this._interval = null;
	    this._isPaused = null;
	    this._isSliding = null;
	    this._activeElement = null;
	    this._indicatorsElement = null;
	  }
	  ;
	  _proto._getConfig = function _getConfig(config) {
	    config = _extends({}, Default, config);
	    typeCheckConfig(NAME$2, config, DefaultType);
	    return config;
	  };
	  _proto._handleSwipe = function _handleSwipe() {
	    var absDeltax = Math.abs(this.touchDeltaX);
	    if (absDeltax <= SWIPE_THRESHOLD) {
	      return;
	    }
	    var direction = absDeltax / this.touchDeltaX;
	    this.touchDeltaX = 0;
	    if (direction > 0) {
	      this.prev();
	    }
	    if (direction < 0) {
	      this.next();
	    }
	  };
	  _proto._addEventListeners = function _addEventListeners() {
	    var _this3 = this;
	    if (this._config.keyboard) {
	      EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
	        return _this3._keydown(event);
	      });
	    }
	    if (this._config.pause === 'hover') {
	      EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
	        return _this3.pause(event);
	      });
	      EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
	        return _this3.cycle(event);
	      });
	    }
	    if (this._config.touch && this._touchSupported) {
	      this._addTouchEventListeners();
	    }
	  };
	  _proto._addTouchEventListeners = function _addTouchEventListeners() {
	    var _this4 = this;
	    var start = function start(event) {
	      if (_this4._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
	        _this4.touchStartX = event.clientX;
	      } else if (!_this4._pointerEvent) {
	        _this4.touchStartX = event.touches[0].clientX;
	      }
	    };
	    var move = function move(event) {
	      if (event.touches && event.touches.length > 1) {
	        _this4.touchDeltaX = 0;
	      } else {
	        _this4.touchDeltaX = event.touches[0].clientX - _this4.touchStartX;
	      }
	    };
	    var end = function end(event) {
	      if (_this4._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
	        _this4.touchDeltaX = event.clientX - _this4.touchStartX;
	      }
	      _this4._handleSwipe();
	      if (_this4._config.pause === 'hover') {
	        _this4.pause();
	        if (_this4.touchTimeout) {
	          clearTimeout(_this4.touchTimeout);
	        }
	        _this4.touchTimeout = setTimeout(function (event) {
	          return _this4.cycle(event);
	        }, TOUCHEVENT_COMPAT_WAIT + _this4._config.interval);
	      }
	    };
	    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
	      EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
	        return e.preventDefault();
	      });
	    });
	    if (this._pointerEvent) {
	      EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
	        return start(event);
	      });
	      EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
	        return end(event);
	      });
	      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	    } else {
	      EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
	        return start(event);
	      });
	      EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
	        return move(event);
	      });
	      EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
	        return end(event);
	      });
	    }
	  };
	  _proto._keydown = function _keydown(event) {
	    if (/input|textarea/i.test(event.target.tagName)) {
	      return;
	    }
	    switch (event.key) {
	      case ARROW_LEFT_KEY:
	        event.preventDefault();
	        this.prev();
	        break;
	      case ARROW_RIGHT_KEY:
	        event.preventDefault();
	        this.next();
	        break;
	    }
	  };
	  _proto._getItemIndex = function _getItemIndex(element) {
	    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
	    return this._items.indexOf(element);
	  };
	  _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
	    var isNextDirection = direction === DIRECTION_NEXT;
	    var isPrevDirection = direction === DIRECTION_PREV;
	    var activeIndex = this._getItemIndex(activeElement);
	    var lastItemIndex = this._items.length - 1;
	    var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;
	    if (isGoingToWrap && !this._config.wrap) {
	      return activeElement;
	    }
	    var delta = direction === DIRECTION_PREV ? -1 : 1;
	    var itemIndex = (activeIndex + delta) % this._items.length;
	    return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
	  };
	  _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
	    var targetIndex = this._getItemIndex(relatedTarget);
	    var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
	    return EventHandler.trigger(this._element, EVENT_SLIDE, {
	      relatedTarget: relatedTarget,
	      direction: eventDirectionName,
	      from: fromIndex,
	      to: targetIndex
	    });
	  };
	  _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
	    if (this._indicatorsElement) {
	      var indicators = SelectorEngine.find(SELECTOR_ACTIVE, this._indicatorsElement);
	      for (var i = 0; i < indicators.length; i++) {
	        indicators[i].classList.remove(CLASS_NAME_ACTIVE$1);
	      }
	      var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];
	      if (nextIndicator) {
	        nextIndicator.classList.add(CLASS_NAME_ACTIVE$1);
	      }
	    }
	  };
	  _proto._updateInterval = function _updateInterval() {
	    var element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	    if (!element) {
	      return;
	    }
	    var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
	    if (elementInterval) {
	      this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
	      this._config.interval = elementInterval;
	    } else {
	      this._config.interval = this._config.defaultInterval || this._config.interval;
	    }
	  };
	  _proto._slide = function _slide(direction, element) {
	    var _this5 = this;
	    var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	    var activeElementIndex = this._getItemIndex(activeElement);
	    var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
	    var nextElementIndex = this._getItemIndex(nextElement);
	    var isCycling = Boolean(this._interval);
	    var directionalClassName;
	    var orderClassName;
	    var eventDirectionName;
	    if (direction === DIRECTION_NEXT) {
	      directionalClassName = CLASS_NAME_START;
	      orderClassName = CLASS_NAME_NEXT;
	      eventDirectionName = DIRECTION_LEFT;
	    } else {
	      directionalClassName = CLASS_NAME_END;
	      orderClassName = CLASS_NAME_PREV;
	      eventDirectionName = DIRECTION_RIGHT;
	    }
	    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$1)) {
	      this._isSliding = false;
	      return;
	    }
	    var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
	    if (slideEvent.defaultPrevented) {
	      return;
	    }
	    if (!activeElement || !nextElement) {
	      return;
	    }
	    this._isSliding = true;
	    if (isCycling) {
	      this.pause();
	    }
	    this._setActiveIndicatorElement(nextElement);
	    this._activeElement = nextElement;
	    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
	      nextElement.classList.add(orderClassName);
	      reflow(nextElement);
	      activeElement.classList.add(directionalClassName);
	      nextElement.classList.add(directionalClassName);
	      var transitionDuration = getTransitionDurationFromElement(activeElement);
	      EventHandler.one(activeElement, TRANSITION_END, function () {
	        nextElement.classList.remove(directionalClassName, orderClassName);
	        nextElement.classList.add(CLASS_NAME_ACTIVE$1);
	        activeElement.classList.remove(CLASS_NAME_ACTIVE$1, orderClassName, directionalClassName);
	        _this5._isSliding = false;
	        setTimeout(function () {
	          EventHandler.trigger(_this5._element, EVENT_SLID, {
	            relatedTarget: nextElement,
	            direction: eventDirectionName,
	            from: activeElementIndex,
	            to: nextElementIndex
	          });
	        }, 0);
	      });
	      emulateTransitionEnd(activeElement, transitionDuration);
	    } else {
	      activeElement.classList.remove(CLASS_NAME_ACTIVE$1);
	      nextElement.classList.add(CLASS_NAME_ACTIVE$1);
	      this._isSliding = false;
	      EventHandler.trigger(this._element, EVENT_SLID, {
	        relatedTarget: nextElement,
	        direction: eventDirectionName,
	        from: activeElementIndex,
	        to: nextElementIndex
	      });
	    }
	    if (isCycling) {
	      this.cycle();
	    }
	  }
	  ;
	  Carousel.carouselInterface = function carouselInterface(element, config) {
	    var data = Data.getData(element, DATA_KEY$2);
	    var _config = _extends({}, Default, Manipulator.getDataAttributes(element));
	    if (typeof config === 'object') {
	      _config = _extends({}, _config, config);
	    }
	    var action = typeof config === 'string' ? config : _config.slide;
	    if (!data) {
	      data = new Carousel(element, _config);
	    }
	    if (typeof config === 'number') {
	      data.to(config);
	    } else if (typeof action === 'string') {
	      if (typeof data[action] === 'undefined') {
	        throw new TypeError("No method named \"" + action + "\"");
	      }
	      data[action]();
	    } else if (_config.interval && _config.ride) {
	      data.pause();
	      data.cycle();
	    }
	  };
	  Carousel.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      Carousel.carouselInterface(this, config);
	    });
	  };
	  Carousel.dataApiClickHandler = function dataApiClickHandler(event) {
	    var target = getElementFromSelector(this);
	    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	      return;
	    }
	    var config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));
	    var slideIndex = this.getAttribute('data-bs-slide-to');
	    if (slideIndex) {
	      config.interval = false;
	    }
	    Carousel.carouselInterface(target, config);
	    if (slideIndex) {
	      Data.getData(target, DATA_KEY$2).to(slideIndex);
	    }
	    event.preventDefault();
	  };
	  _createClass$1(Carousel, null, [{
	    key: "Default",
	    get: function get() {
	      return Default;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$2;
	    }
	  }]);
	  return Carousel;
	}(BaseComponent);
	EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
	EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
	  var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
	  for (var i = 0, len = carousels.length; i < len; i++) {
	    Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$2));
	  }
	});
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$2];
	    $.fn[NAME$2] = Carousel.jQueryInterface;
	    $.fn[NAME$2].Constructor = Carousel;
	    $.fn[NAME$2].noConflict = function () {
	      $.fn[NAME$2] = JQUERY_NO_CONFLICT;
	      return Carousel.jQueryInterface;
	    };
	  }
	});
	var NAME$3 = 'collapse';
	var DATA_KEY$3 = 'bs.collapse';
	var EVENT_KEY$3 = "." + DATA_KEY$3;
	var DATA_API_KEY$3 = '.data-api';
	var Default$1 = {
	  toggle: true,
	  parent: ''
	};
	var DefaultType$1 = {
	  toggle: 'boolean',
	  parent: '(string|element)'
	};
	var EVENT_SHOW = "show" + EVENT_KEY$3;
	var EVENT_SHOWN = "shown" + EVENT_KEY$3;
	var EVENT_HIDE = "hide" + EVENT_KEY$3;
	var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
	var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
	var CLASS_NAME_SHOW = 'show';
	var CLASS_NAME_COLLAPSE = 'collapse';
	var CLASS_NAME_COLLAPSING = 'collapsing';
	var CLASS_NAME_COLLAPSED = 'collapsed';
	var WIDTH = 'width';
	var HEIGHT = 'height';
	var SELECTOR_ACTIVES = '.show, .collapsing';
	var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="collapse"]';
	var Collapse = function (_BaseComponent) {
	  _inheritsLoose(Collapse, _BaseComponent);
	  function Collapse(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element) || this;
	    _this._isTransitioning = false;
	    _this._config = _this._getConfig(config);
	    _this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + "[href=\"#" + element.id + "\"]," + (SELECTOR_DATA_TOGGLE$1 + "[data-bs-target=\"#" + element.id + "\"]"));
	    var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);
	    for (var i = 0, len = toggleList.length; i < len; i++) {
	      var elem = toggleList[i];
	      var selector = getSelectorFromElement(elem);
	      var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
	        return foundElem === element;
	      });
	      if (selector !== null && filterElement.length) {
	        _this._selector = selector;
	        _this._triggerArray.push(elem);
	      }
	    }
	    _this._parent = _this._config.parent ? _this._getParent() : null;
	    if (!_this._config.parent) {
	      _this._addAriaAndCollapsedClass(_this._element, _this._triggerArray);
	    }
	    if (_this._config.toggle) {
	      _this.toggle();
	    }
	    return _this;
	  }
	  var _proto = Collapse.prototype;
	  _proto.toggle = function toggle() {
	    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  };
	  _proto.show = function show() {
	    var _this2 = this;
	    if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW)) {
	      return;
	    }
	    var actives;
	    var activesData;
	    if (this._parent) {
	      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
	        if (typeof _this2._config.parent === 'string') {
	          return elem.getAttribute('data-bs-parent') === _this2._config.parent;
	        }
	        return elem.classList.contains(CLASS_NAME_COLLAPSE);
	      });
	      if (actives.length === 0) {
	        actives = null;
	      }
	    }
	    var container = SelectorEngine.findOne(this._selector);
	    if (actives) {
	      var tempActiveData = actives.find(function (elem) {
	        return container !== elem;
	      });
	      activesData = tempActiveData ? Data.getData(tempActiveData, DATA_KEY$3) : null;
	      if (activesData && activesData._isTransitioning) {
	        return;
	      }
	    }
	    var startEvent = EventHandler.trigger(this._element, EVENT_SHOW);
	    if (startEvent.defaultPrevented) {
	      return;
	    }
	    if (actives) {
	      actives.forEach(function (elemActive) {
	        if (container !== elemActive) {
	          Collapse.collapseInterface(elemActive, 'hide');
	        }
	        if (!activesData) {
	          Data.setData(elemActive, DATA_KEY$3, null);
	        }
	      });
	    }
	    var dimension = this._getDimension();
	    this._element.classList.remove(CLASS_NAME_COLLAPSE);
	    this._element.classList.add(CLASS_NAME_COLLAPSING);
	    this._element.style[dimension] = 0;
	    if (this._triggerArray.length) {
	      this._triggerArray.forEach(function (element) {
	        element.classList.remove(CLASS_NAME_COLLAPSED);
	        element.setAttribute('aria-expanded', true);
	      });
	    }
	    this.setTransitioning(true);
	    var complete = function complete() {
	      _this2._element.classList.remove(CLASS_NAME_COLLAPSING);
	      _this2._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
	      _this2._element.style[dimension] = '';
	      _this2.setTransitioning(false);
	      EventHandler.trigger(_this2._element, EVENT_SHOWN);
	    };
	    var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	    var scrollSize = "scroll" + capitalizedDimension;
	    var transitionDuration = getTransitionDurationFromElement(this._element);
	    EventHandler.one(this._element, TRANSITION_END, complete);
	    emulateTransitionEnd(this._element, transitionDuration);
	    this._element.style[dimension] = this._element[scrollSize] + "px";
	  };
	  _proto.hide = function hide() {
	    var _this3 = this;
	    if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW)) {
	      return;
	    }
	    var startEvent = EventHandler.trigger(this._element, EVENT_HIDE);
	    if (startEvent.defaultPrevented) {
	      return;
	    }
	    var dimension = this._getDimension();
	    this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_COLLAPSING);
	    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
	    var triggerArrayLength = this._triggerArray.length;
	    if (triggerArrayLength > 0) {
	      for (var i = 0; i < triggerArrayLength; i++) {
	        var trigger = this._triggerArray[i];
	        var elem = getElementFromSelector(trigger);
	        if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
	          trigger.classList.add(CLASS_NAME_COLLAPSED);
	          trigger.setAttribute('aria-expanded', false);
	        }
	      }
	    }
	    this.setTransitioning(true);
	    var complete = function complete() {
	      _this3.setTransitioning(false);
	      _this3._element.classList.remove(CLASS_NAME_COLLAPSING);
	      _this3._element.classList.add(CLASS_NAME_COLLAPSE);
	      EventHandler.trigger(_this3._element, EVENT_HIDDEN);
	    };
	    this._element.style[dimension] = '';
	    var transitionDuration = getTransitionDurationFromElement(this._element);
	    EventHandler.one(this._element, TRANSITION_END, complete);
	    emulateTransitionEnd(this._element, transitionDuration);
	  };
	  _proto.setTransitioning = function setTransitioning(isTransitioning) {
	    this._isTransitioning = isTransitioning;
	  };
	  _proto.dispose = function dispose() {
	    _BaseComponent.prototype.dispose.call(this);
	    this._config = null;
	    this._parent = null;
	    this._triggerArray = null;
	    this._isTransitioning = null;
	  }
	  ;
	  _proto._getConfig = function _getConfig(config) {
	    config = _extends({}, Default$1, config);
	    config.toggle = Boolean(config.toggle);
	    typeCheckConfig(NAME$3, config, DefaultType$1);
	    return config;
	  };
	  _proto._getDimension = function _getDimension() {
	    return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
	  };
	  _proto._getParent = function _getParent() {
	    var _this4 = this;
	    var parent = this._config.parent;
	    if (isElement$1(parent)) {
	      if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
	        parent = parent[0];
	      }
	    } else {
	      parent = SelectorEngine.findOne(parent);
	    }
	    var selector = SELECTOR_DATA_TOGGLE$1 + "[data-bs-parent=\"" + parent + "\"]";
	    SelectorEngine.find(selector, parent).forEach(function (element) {
	      var selected = getElementFromSelector(element);
	      _this4._addAriaAndCollapsedClass(selected, [element]);
	    });
	    return parent;
	  };
	  _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
	    if (!element || !triggerArray.length) {
	      return;
	    }
	    var isOpen = element.classList.contains(CLASS_NAME_SHOW);
	    triggerArray.forEach(function (elem) {
	      if (isOpen) {
	        elem.classList.remove(CLASS_NAME_COLLAPSED);
	      } else {
	        elem.classList.add(CLASS_NAME_COLLAPSED);
	      }
	      elem.setAttribute('aria-expanded', isOpen);
	    });
	  }
	  ;
	  Collapse.collapseInterface = function collapseInterface(element, config) {
	    var data = Data.getData(element, DATA_KEY$3);
	    var _config = _extends({}, Default$1, Manipulator.getDataAttributes(element), typeof config === 'object' && config ? config : {});
	    if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
	      _config.toggle = false;
	    }
	    if (!data) {
	      data = new Collapse(element, _config);
	    }
	    if (typeof config === 'string') {
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config]();
	    }
	  };
	  Collapse.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      Collapse.collapseInterface(this, config);
	    });
	  };
	  _createClass$1(Collapse, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$1;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$3;
	    }
	  }]);
	  return Collapse;
	}(BaseComponent);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
	  if (event.target.tagName === 'A') {
	    event.preventDefault();
	  }
	  var triggerData = Manipulator.getDataAttributes(this);
	  var selector = getSelectorFromElement(this);
	  var selectorElements = SelectorEngine.find(selector);
	  selectorElements.forEach(function (element) {
	    var data = Data.getData(element, DATA_KEY$3);
	    var config;
	    if (data) {
	      if (data._parent === null && typeof triggerData.parent === 'string') {
	        data._config.parent = triggerData.parent;
	        data._parent = data._getParent();
	      }
	      config = 'toggle';
	    } else {
	      config = triggerData;
	    }
	    Collapse.collapseInterface(element, config);
	  });
	});
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$3];
	    $.fn[NAME$3] = Collapse.jQueryInterface;
	    $.fn[NAME$3].Constructor = Collapse;
	    $.fn[NAME$3].noConflict = function () {
	      $.fn[NAME$3] = JQUERY_NO_CONFLICT;
	      return Collapse.jQueryInterface;
	    };
	  }
	});
	var NAME$4 = 'dropdown';
	var DATA_KEY$4 = 'bs.dropdown';
	var EVENT_KEY$4 = "." + DATA_KEY$4;
	var DATA_API_KEY$4 = '.data-api';
	var ESCAPE_KEY = 'Escape';
	var SPACE_KEY = 'Space';
	var TAB_KEY = 'Tab';
	var ARROW_UP_KEY = 'ArrowUp';
	var ARROW_DOWN_KEY = 'ArrowDown';
	var RIGHT_MOUSE_BUTTON = 2;
	var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + "|" + ARROW_DOWN_KEY + "|" + ESCAPE_KEY);
	var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
	var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
	var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
	var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
	var EVENT_CLICK = "click" + EVENT_KEY$4;
	var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
	var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
	var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
	var CLASS_NAME_DISABLED = 'disabled';
	var CLASS_NAME_SHOW$1 = 'show';
	var CLASS_NAME_DROPUP = 'dropup';
	var CLASS_NAME_DROPEND = 'dropend';
	var CLASS_NAME_DROPSTART = 'dropstart';
	var CLASS_NAME_NAVBAR = 'navbar';
	var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="dropdown"]';
	var SELECTOR_FORM_CHILD = '.dropdown form';
	var SELECTOR_MENU = '.dropdown-menu';
	var SELECTOR_NAVBAR_NAV = '.navbar-nav';
	var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	var PLACEMENT_TOP = isRTL ? 'top-end' : 'top-start';
	var PLACEMENT_TOPEND = isRTL ? 'top-start' : 'top-end';
	var PLACEMENT_BOTTOM = isRTL ? 'bottom-end' : 'bottom-start';
	var PLACEMENT_BOTTOMEND = isRTL ? 'bottom-start' : 'bottom-end';
	var PLACEMENT_RIGHT = isRTL ? 'left-start' : 'right-start';
	var PLACEMENT_LEFT = isRTL ? 'right-start' : 'left-start';
	var Default$2 = {
	  offset: 0,
	  flip: true,
	  boundary: 'clippingParents',
	  reference: 'toggle',
	  display: 'dynamic',
	  popperConfig: null
	};
	var DefaultType$2 = {
	  offset: '(number|string|function)',
	  flip: 'boolean',
	  boundary: '(string|element)',
	  reference: '(string|element)',
	  display: 'string',
	  popperConfig: '(null|object)'
	};
	var Dropdown = function (_BaseComponent) {
	  _inheritsLoose(Dropdown, _BaseComponent);
	  function Dropdown(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element) || this;
	    _this._popper = null;
	    _this._config = _this._getConfig(config);
	    _this._menu = _this._getMenuElement();
	    _this._inNavbar = _this._detectNavbar();
	    _this._addEventListeners();
	    return _this;
	  }
	  var _proto = Dropdown.prototype;
	  _proto.toggle = function toggle() {
	    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
	      return;
	    }
	    var isActive = this._element.classList.contains(CLASS_NAME_SHOW$1);
	    Dropdown.clearMenus();
	    if (isActive) {
	      return;
	    }
	    this.show();
	  };
	  _proto.show = function show() {
	    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
	      return;
	    }
	    var parent = Dropdown.getParentFromElement(this._element);
	    var relatedTarget = {
	      relatedTarget: this._element
	    };
	    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    if (!this._inNavbar) {
	      if (typeof Popper === 'undefined') {
	        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
	      }
	      var referenceElement = this._element;
	      if (this._config.reference === 'parent') {
	        referenceElement = parent;
	      } else if (isElement$1(this._config.reference)) {
	        referenceElement = this._config.reference;
	        if (typeof this._config.reference.jquery !== 'undefined') {
	          referenceElement = this._config.reference[0];
	        }
	      }
	      this._popper = createPopper$2(referenceElement, this._menu, this._getPopperConfig());
	    }
	    if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
	      var _ref;
	      (_ref = []).concat.apply(_ref, document.body.children).forEach(function (elem) {
	        return EventHandler.on(elem, 'mouseover', null, noop());
	      });
	    }
	    this._element.focus();
	    this._element.setAttribute('aria-expanded', true);
	    this._menu.classList.toggle(CLASS_NAME_SHOW$1);
	    this._element.classList.toggle(CLASS_NAME_SHOW$1);
	    EventHandler.trigger(parent, EVENT_SHOWN$1, relatedTarget);
	  };
	  _proto.hide = function hide() {
	    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
	      return;
	    }
	    var parent = Dropdown.getParentFromElement(this._element);
	    var relatedTarget = {
	      relatedTarget: this._element
	    };
	    var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    if (this._popper) {
	      this._popper.destroy();
	    }
	    this._menu.classList.toggle(CLASS_NAME_SHOW$1);
	    this._element.classList.toggle(CLASS_NAME_SHOW$1);
	    EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
	  };
	  _proto.dispose = function dispose() {
	    _BaseComponent.prototype.dispose.call(this);
	    EventHandler.off(this._element, EVENT_KEY$4);
	    this._menu = null;
	    if (this._popper) {
	      this._popper.destroy();
	      this._popper = null;
	    }
	  };
	  _proto.update = function update() {
	    this._inNavbar = this._detectNavbar();
	    if (this._popper) {
	      this._popper.update();
	    }
	  }
	  ;
	  _proto._addEventListeners = function _addEventListeners() {
	    var _this2 = this;
	    EventHandler.on(this._element, EVENT_CLICK, function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      _this2.toggle();
	    });
	  };
	  _proto._getConfig = function _getConfig(config) {
	    config = _extends({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), config);
	    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
	    return config;
	  };
	  _proto._getMenuElement = function _getMenuElement() {
	    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
	  };
	  _proto._getPlacement = function _getPlacement() {
	    var parentDropdown = this._element.parentNode;
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
	      return PLACEMENT_RIGHT;
	    }
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
	      return PLACEMENT_LEFT;
	    }
	    var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
	      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
	    }
	    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	  };
	  _proto._detectNavbar = function _detectNavbar() {
	    return this._element.closest("." + CLASS_NAME_NAVBAR) !== null;
	  };
	  _proto._getPopperConfig = function _getPopperConfig() {
	    var popperConfig = {
	      placement: this._getPlacement(),
	      modifiers: [{
	        name: 'preventOverflow',
	        options: {
	          altBoundary: this._config.flip,
	          rootBoundary: this._config.boundary
	        }
	      }]
	    };
	    if (this._config.display === 'static') {
	      popperConfig.modifiers = [{
	        name: 'applyStyles',
	        enabled: false
	      }];
	    }
	    return _extends({}, popperConfig, this._config.popperConfig);
	  }
	  ;
	  Dropdown.dropdownInterface = function dropdownInterface(element, config) {
	    var data = Data.getData(element, DATA_KEY$4);
	    var _config = typeof config === 'object' ? config : null;
	    if (!data) {
	      data = new Dropdown(element, _config);
	    }
	    if (typeof config === 'string') {
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError("No method named \"" + config + "\"");
	      }
	      data[config]();
	    }
	  };
	  Dropdown.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      Dropdown.dropdownInterface(this, config);
	    });
	  };
	  Dropdown.clearMenus = function clearMenus(event) {
	    if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
	      return;
	    }
	    var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2);
	    for (var i = 0, len = toggles.length; i < len; i++) {
	      var parent = Dropdown.getParentFromElement(toggles[i]);
	      var context = Data.getData(toggles[i], DATA_KEY$4);
	      var relatedTarget = {
	        relatedTarget: toggles[i]
	      };
	      if (event && event.type === 'click') {
	        relatedTarget.clickEvent = event;
	      }
	      if (!context) {
	        continue;
	      }
	      var dropdownMenu = context._menu;
	      if (!toggles[i].classList.contains(CLASS_NAME_SHOW$1)) {
	        continue;
	      }
	      if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.key === TAB_KEY) && dropdownMenu.contains(event.target)) {
	        continue;
	      }
	      var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);
	      if (hideEvent.defaultPrevented) {
	        continue;
	      }
	      if ('ontouchstart' in document.documentElement) {
	        var _ref2;
	        (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (elem) {
	          return EventHandler.off(elem, 'mouseover', null, noop());
	        });
	      }
	      toggles[i].setAttribute('aria-expanded', 'false');
	      if (context._popper) {
	        context._popper.destroy();
	      }
	      dropdownMenu.classList.remove(CLASS_NAME_SHOW$1);
	      toggles[i].classList.remove(CLASS_NAME_SHOW$1);
	      EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
	    }
	  };
	  Dropdown.getParentFromElement = function getParentFromElement(element) {
	    return getElementFromSelector(element) || element.parentNode;
	  };
	  Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
	    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
	      return;
	    }
	    event.preventDefault();
	    event.stopPropagation();
	    if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
	      return;
	    }
	    var parent = Dropdown.getParentFromElement(this);
	    var isActive = this.classList.contains(CLASS_NAME_SHOW$1);
	    if (event.key === ESCAPE_KEY) {
	      var button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0];
	      button.focus();
	      Dropdown.clearMenus();
	      return;
	    }
	    if (!isActive || event.key === SPACE_KEY) {
	      Dropdown.clearMenus();
	      return;
	    }
	    var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);
	    if (!items.length) {
	      return;
	    }
	    var index = items.indexOf(event.target);
	    if (event.key === ARROW_UP_KEY && index > 0) {
	      index--;
	    }
	    if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
	      index++;
	    }
	    index = index === -1 ? 0 : index;
	    items[index].focus();
	  };
	  _createClass$1(Dropdown, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$2;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$2;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$4;
	    }
	  }]);
	  return Dropdown;
	}(BaseComponent);
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
	  event.preventDefault();
	  event.stopPropagation();
	  Dropdown.dropdownInterface(this, 'toggle');
	});
	EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
	  return e.stopPropagation();
	});
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$4];
	    $.fn[NAME$4] = Dropdown.jQueryInterface;
	    $.fn[NAME$4].Constructor = Dropdown;
	    $.fn[NAME$4].noConflict = function () {
	      $.fn[NAME$4] = JQUERY_NO_CONFLICT;
	      return Dropdown.jQueryInterface;
	    };
	  }
	});
	var NAME$5 = 'modal';
	var DATA_KEY$5 = 'bs.modal';
	var EVENT_KEY$5 = "." + DATA_KEY$5;
	var DATA_API_KEY$5 = '.data-api';
	var ESCAPE_KEY$1 = 'Escape';
	var Default$3 = {
	  backdrop: true,
	  keyboard: true,
	  focus: true
	};
	var DefaultType$3 = {
	  backdrop: '(boolean|string)',
	  keyboard: 'boolean',
	  focus: 'boolean'
	};
	var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
	var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
	var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
	var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
	var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
	var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
	var EVENT_RESIZE = "resize" + EVENT_KEY$5;
	var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
	var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
	var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
	var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
	var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
	var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
	var CLASS_NAME_BACKDROP = 'modal-backdrop';
	var CLASS_NAME_OPEN = 'modal-open';
	var CLASS_NAME_FADE = 'fade';
	var CLASS_NAME_SHOW$2 = 'show';
	var CLASS_NAME_STATIC = 'modal-static';
	var SELECTOR_DIALOG = '.modal-dialog';
	var SELECTOR_MODAL_BODY = '.modal-body';
	var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="modal"]';
	var SELECTOR_DATA_DISMISS = '[data-bs-dismiss="modal"]';
	var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	var SELECTOR_STICKY_CONTENT = '.sticky-top';
	var Modal = function (_BaseComponent) {
	  _inheritsLoose(Modal, _BaseComponent);
	  function Modal(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element) || this;
	    _this._config = _this._getConfig(config);
	    _this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element);
	    _this._backdrop = null;
	    _this._isShown = false;
	    _this._isBodyOverflowing = false;
	    _this._ignoreBackdropClick = false;
	    _this._isTransitioning = false;
	    _this._scrollbarWidth = 0;
	    return _this;
	  }
	  var _proto = Modal.prototype;
	  _proto.toggle = function toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  };
	  _proto.show = function show(relatedTarget) {
	    var _this2 = this;
	    if (this._isShown || this._isTransitioning) {
	      return;
	    }
	    if (this._element.classList.contains(CLASS_NAME_FADE)) {
	      this._isTransitioning = true;
	    }
	    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
	      relatedTarget: relatedTarget
	    });
	    if (this._isShown || showEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = true;
	    this._checkScrollbar();
	    this._setScrollbar();
	    this._adjustDialog();
	    this._setEscapeEvent();
	    this._setResizeEvent();
	    EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
	      return _this2.hide(event);
	    });
	    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
	      EventHandler.one(_this2._element, EVENT_MOUSEUP_DISMISS, function (event) {
	        if (event.target === _this2._element) {
	          _this2._ignoreBackdropClick = true;
	        }
	      });
	    });
	    this._showBackdrop(function () {
	      return _this2._showElement(relatedTarget);
	    });
	  };
	  _proto.hide = function hide(event) {
	    var _this3 = this;
	    if (event) {
	      event.preventDefault();
	    }
	    if (!this._isShown || this._isTransitioning) {
	      return;
	    }
	    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = false;
	    var transition = this._element.classList.contains(CLASS_NAME_FADE);
	    if (transition) {
	      this._isTransitioning = true;
	    }
	    this._setEscapeEvent();
	    this._setResizeEvent();
	    EventHandler.off(document, EVENT_FOCUSIN);
	    this._element.classList.remove(CLASS_NAME_SHOW$2);
	    EventHandler.off(this._element, EVENT_CLICK_DISMISS);
	    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
	    if (transition) {
	      var transitionDuration = getTransitionDurationFromElement(this._element);
	      EventHandler.one(this._element, TRANSITION_END, function (event) {
	        return _this3._hideModal(event);
	      });
	      emulateTransitionEnd(this._element, transitionDuration);
	    } else {
	      this._hideModal();
	    }
	  };
	  _proto.dispose = function dispose() {
	    [window, this._element, this._dialog].forEach(function (htmlElement) {
	      return EventHandler.off(htmlElement, EVENT_KEY$5);
	    });
	    _BaseComponent.prototype.dispose.call(this);
	    EventHandler.off(document, EVENT_FOCUSIN);
	    this._config = null;
	    this._dialog = null;
	    this._backdrop = null;
	    this._isShown = null;
	    this._isBodyOverflowing = null;
	    this._ignoreBackdropClick = null;
	    this._isTransitioning = null;
	    this._scrollbarWidth = null;
	  };
	  _proto.handleUpdate = function handleUpdate() {
	    this._adjustDialog();
	  }
	  ;
	  _proto._getConfig = function _getConfig(config) {
	    config = _extends({}, Default$3, config);
	    typeCheckConfig(NAME$5, config, DefaultType$3);
	    return config;
	  };
	  _proto._showElement = function _showElement(relatedTarget) {
	    var _this4 = this;
	    var transition = this._element.classList.contains(CLASS_NAME_FADE);
	    var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
	    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
	      document.body.appendChild(this._element);
	    }
	    this._element.style.display = 'block';
	    this._element.removeAttribute('aria-hidden');
	    this._element.setAttribute('aria-modal', true);
	    this._element.setAttribute('role', 'dialog');
	    this._element.scrollTop = 0;
	    if (modalBody) {
	      modalBody.scrollTop = 0;
	    }
	    if (transition) {
	      reflow(this._element);
	    }
	    this._element.classList.add(CLASS_NAME_SHOW$2);
	    if (this._config.focus) {
	      this._enforceFocus();
	    }
	    var transitionComplete = function transitionComplete() {
	      if (_this4._config.focus) {
	        _this4._element.focus();
	      }
	      _this4._isTransitioning = false;
	      EventHandler.trigger(_this4._element, EVENT_SHOWN$2, {
	        relatedTarget: relatedTarget
	      });
	    };
	    if (transition) {
	      var transitionDuration = getTransitionDurationFromElement(this._dialog);
	      EventHandler.one(this._dialog, TRANSITION_END, transitionComplete);
	      emulateTransitionEnd(this._dialog, transitionDuration);
	    } else {
	      transitionComplete();
	    }
	  };
	  _proto._enforceFocus = function _enforceFocus() {
	    var _this5 = this;
	    EventHandler.off(document, EVENT_FOCUSIN);
	    EventHandler.on(document, EVENT_FOCUSIN, function (event) {
	      if (document !== event.target && _this5._element !== event.target && !_this5._element.contains(event.target)) {
	        _this5._element.focus();
	      }
	    });
	  };
	  _proto._setEscapeEvent = function _setEscapeEvent() {
	    var _this6 = this;
	    if (this._isShown) {
	      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
	        if (_this6._config.keyboard && event.key === ESCAPE_KEY$1) {
	          event.preventDefault();
	          _this6.hide();
	        } else if (!_this6._config.keyboard && event.key === ESCAPE_KEY$1) {
	          _this6._triggerBackdropTransition();
	        }
	      });
	    } else {
	      EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
	    }
	  };
	  _proto._setResizeEvent = function _setResizeEvent() {
	    var _this7 = this;
	    if (this._isShown) {
	      EventHandler.on(window, EVENT_RESIZE, function () {
	        return _this7._adjustDialog();
	      });
	    } else {
	      EventHandler.off(window, EVENT_RESIZE);
	    }
	  };
	  _proto._hideModal = function _hideModal() {
	    var _this8 = this;
	    this._element.style.display = 'none';
	    this._element.setAttribute('aria-hidden', true);
	    this._element.removeAttribute('aria-modal');
	    this._element.removeAttribute('role');
	    this._isTransitioning = false;
	    this._showBackdrop(function () {
	      document.body.classList.remove(CLASS_NAME_OPEN);
	      _this8._resetAdjustments();
	      _this8._resetScrollbar();
	      EventHandler.trigger(_this8._element, EVENT_HIDDEN$2);
	    });
	  };
	  _proto._removeBackdrop = function _removeBackdrop() {
	    this._backdrop.parentNode.removeChild(this._backdrop);
	    this._backdrop = null;
	  };
	  _proto._showBackdrop = function _showBackdrop(callback) {
	    var _this9 = this;
	    var animate = this._element.classList.contains(CLASS_NAME_FADE) ? CLASS_NAME_FADE : '';
	    if (this._isShown && this._config.backdrop) {
	      this._backdrop = document.createElement('div');
	      this._backdrop.className = CLASS_NAME_BACKDROP;
	      if (animate) {
	        this._backdrop.classList.add(animate);
	      }
	      document.body.appendChild(this._backdrop);
	      EventHandler.on(this._element, EVENT_CLICK_DISMISS, function (event) {
	        if (_this9._ignoreBackdropClick) {
	          _this9._ignoreBackdropClick = false;
	          return;
	        }
	        if (event.target !== event.currentTarget) {
	          return;
	        }
	        if (_this9._config.backdrop === 'static') {
	          _this9._triggerBackdropTransition();
	        } else {
	          _this9.hide();
	        }
	      });
	      if (animate) {
	        reflow(this._backdrop);
	      }
	      this._backdrop.classList.add(CLASS_NAME_SHOW$2);
	      if (!animate) {
	        callback();
	        return;
	      }
	      var backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
	      EventHandler.one(this._backdrop, TRANSITION_END, callback);
	      emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
	    } else if (!this._isShown && this._backdrop) {
	      this._backdrop.classList.remove(CLASS_NAME_SHOW$2);
	      var callbackRemove = function callbackRemove() {
	        _this9._removeBackdrop();
	        callback();
	      };
	      if (this._element.classList.contains(CLASS_NAME_FADE)) {
	        var _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
	        EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove);
	        emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
	      } else {
	        callbackRemove();
	      }
	    } else {
	      callback();
	    }
	  };
	  _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
	    var _this10 = this;
	    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	    if (!isModalOverflowing) {
	      this._element.style.overflowY = 'hidden';
	    }
	    this._element.classList.add(CLASS_NAME_STATIC);
	    var modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
	    EventHandler.off(this._element, TRANSITION_END);
	    EventHandler.one(this._element, TRANSITION_END, function () {
	      _this10._element.classList.remove(CLASS_NAME_STATIC);
	      if (!isModalOverflowing) {
	        EventHandler.one(_this10._element, TRANSITION_END, function () {
	          _this10._element.style.overflowY = '';
	        });
	        emulateTransitionEnd(_this10._element, modalTransitionDuration);
	      }
	    });
	    emulateTransitionEnd(this._element, modalTransitionDuration);
	    this._element.focus();
	  }
	  ;
	  _proto._adjustDialog = function _adjustDialog() {
	    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	    if (!this._isBodyOverflowing && isModalOverflowing && !isRTL || this._isBodyOverflowing && !isModalOverflowing && isRTL) {
	      this._element.style.paddingLeft = this._scrollbarWidth + "px";
	    }
	    if (this._isBodyOverflowing && !isModalOverflowing && !isRTL || !this._isBodyOverflowing && isModalOverflowing && isRTL) {
	      this._element.style.paddingRight = this._scrollbarWidth + "px";
	    }
	  };
	  _proto._resetAdjustments = function _resetAdjustments() {
	    this._element.style.paddingLeft = '';
	    this._element.style.paddingRight = '';
	  };
	  _proto._checkScrollbar = function _checkScrollbar() {
	    var rect = document.body.getBoundingClientRect();
	    this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
	    this._scrollbarWidth = this._getScrollbarWidth();
	  };
	  _proto._setScrollbar = function _setScrollbar() {
	    var _this11 = this;
	    if (this._isBodyOverflowing) {
	      SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
	        var actualPadding = element.style.paddingRight;
	        var calculatedPadding = window.getComputedStyle(element)['padding-right'];
	        Manipulator.setDataAttribute(element, 'padding-right', actualPadding);
	        element.style.paddingRight = Number.parseFloat(calculatedPadding) + _this11._scrollbarWidth + "px";
	      });
	      SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach(function (element) {
	        var actualMargin = element.style.marginRight;
	        var calculatedMargin = window.getComputedStyle(element)['margin-right'];
	        Manipulator.setDataAttribute(element, 'margin-right', actualMargin);
	        element.style.marginRight = Number.parseFloat(calculatedMargin) - _this11._scrollbarWidth + "px";
	      });
	      var actualPadding = document.body.style.paddingRight;
	      var calculatedPadding = window.getComputedStyle(document.body)['padding-right'];
	      Manipulator.setDataAttribute(document.body, 'padding-right', actualPadding);
	      document.body.style.paddingRight = Number.parseFloat(calculatedPadding) + this._scrollbarWidth + "px";
	    }
	    document.body.classList.add(CLASS_NAME_OPEN);
	  };
	  _proto._resetScrollbar = function _resetScrollbar() {
	    SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
	      var padding = Manipulator.getDataAttribute(element, 'padding-right');
	      if (typeof padding !== 'undefined') {
	        Manipulator.removeDataAttribute(element, 'padding-right');
	        element.style.paddingRight = padding;
	      }
	    });
	    SelectorEngine.find("" + SELECTOR_STICKY_CONTENT).forEach(function (element) {
	      var margin = Manipulator.getDataAttribute(element, 'margin-right');
	      if (typeof margin !== 'undefined') {
	        Manipulator.removeDataAttribute(element, 'margin-right');
	        element.style.marginRight = margin;
	      }
	    });
	    var padding = Manipulator.getDataAttribute(document.body, 'padding-right');
	    if (typeof padding === 'undefined') {
	      document.body.style.paddingRight = '';
	    } else {
	      Manipulator.removeDataAttribute(document.body, 'padding-right');
	      document.body.style.paddingRight = padding;
	    }
	  };
	  _proto._getScrollbarWidth = function _getScrollbarWidth() {
	    var scrollDiv = document.createElement('div');
	    scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
	    document.body.appendChild(scrollDiv);
	    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
	    document.body.removeChild(scrollDiv);
	    return scrollbarWidth;
	  }
	  ;
	  Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
	    return this.each(function () {
	      var data = Data.getData(this, DATA_KEY$5);
	      var _config = _extends({}, Default$3, Manipulator.getDataAttributes(this), typeof config === 'object' && config ? config : {});
	      if (!data) {
	        data = new Modal(this, _config);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config](relatedTarget);
	      }
	    });
	  };
	  _createClass$1(Modal, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$3;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$5;
	    }
	  }]);
	  return Modal;
	}(BaseComponent);
	EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
	  var _this12 = this;
	  var target = getElementFromSelector(this);
	  if (this.tagName === 'A' || this.tagName === 'AREA') {
	    event.preventDefault();
	  }
	  EventHandler.one(target, EVENT_SHOW$2, function (showEvent) {
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    EventHandler.one(target, EVENT_HIDDEN$2, function () {
	      if (isVisible(_this12)) {
	        _this12.focus();
	      }
	    });
	  });
	  var data = Data.getData(target, DATA_KEY$5);
	  if (!data) {
	    var config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));
	    data = new Modal(target, config);
	  }
	  data.show(this);
	});
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$5];
	    $.fn[NAME$5] = Modal.jQueryInterface;
	    $.fn[NAME$5].Constructor = Modal;
	    $.fn[NAME$5].noConflict = function () {
	      $.fn[NAME$5] = JQUERY_NO_CONFLICT;
	      return Modal.jQueryInterface;
	    };
	  }
	});
	var uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
	var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
	var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
	var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
	  var attrName = attr.nodeName.toLowerCase();
	  if (allowedAttributeList.includes(attrName)) {
	    if (uriAttrs.has(attrName)) {
	      return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
	    }
	    return true;
	  }
	  var regExp = allowedAttributeList.filter(function (attrRegex) {
	    return attrRegex instanceof RegExp;
	  });
	  for (var i = 0, len = regExp.length; i < len; i++) {
	    if (attrName.match(regExp[i])) {
	      return true;
	    }
	  }
	  return false;
	};
	var DefaultAllowlist = {
	  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
	  a: ['target', 'href', 'title', 'rel'],
	  area: [],
	  b: [],
	  br: [],
	  col: [],
	  code: [],
	  div: [],
	  em: [],
	  hr: [],
	  h1: [],
	  h2: [],
	  h3: [],
	  h4: [],
	  h5: [],
	  h6: [],
	  i: [],
	  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
	  li: [],
	  ol: [],
	  p: [],
	  pre: [],
	  s: [],
	  small: [],
	  span: [],
	  sub: [],
	  sup: [],
	  strong: [],
	  u: [],
	  ul: []
	};
	function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
	  var _ref;
	  if (!unsafeHtml.length) {
	    return unsafeHtml;
	  }
	  if (sanitizeFn && typeof sanitizeFn === 'function') {
	    return sanitizeFn(unsafeHtml);
	  }
	  var domParser = new window.DOMParser();
	  var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	  var allowlistKeys = Object.keys(allowList);
	  var elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));
	  var _loop = function _loop(i, len) {
	    var _ref2;
	    var el = elements[i];
	    var elName = el.nodeName.toLowerCase();
	    if (!allowlistKeys.includes(elName)) {
	      el.parentNode.removeChild(el);
	      return "continue";
	    }
	    var attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes);
	    var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
	    attributeList.forEach(function (attr) {
	      if (!allowedAttribute(attr, allowedAttributes)) {
	        el.removeAttribute(attr.nodeName);
	      }
	    });
	  };
	  for (var i = 0, len = elements.length; i < len; i++) {
	    var _ret = _loop(i);
	    if (_ret === "continue") continue;
	  }
	  return createdDocument.body.innerHTML;
	}
	var NAME$6 = 'tooltip';
	var DATA_KEY$6 = 'bs.tooltip';
	var EVENT_KEY$6 = "." + DATA_KEY$6;
	var CLASS_PREFIX = 'bs-tooltip';
	var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
	var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	var DefaultType$4 = {
	  animation: 'boolean',
	  template: 'string',
	  title: '(string|element|function)',
	  trigger: 'string',
	  delay: '(number|object)',
	  html: 'boolean',
	  selector: '(string|boolean)',
	  placement: '(string|function)',
	  container: '(string|element|boolean)',
	  fallbackPlacements: '(null|array)',
	  boundary: '(string|element)',
	  customClass: '(string|function)',
	  sanitize: 'boolean',
	  sanitizeFn: '(null|function)',
	  allowList: 'object',
	  popperConfig: '(null|object)'
	};
	var AttachmentMap = {
	  AUTO: 'auto',
	  TOP: 'top',
	  RIGHT: isRTL ? 'left' : 'right',
	  BOTTOM: 'bottom',
	  LEFT: isRTL ? 'right' : 'left'
	};
	var Default$4 = {
	  animation: true,
	  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	  trigger: 'hover focus',
	  title: '',
	  delay: 0,
	  html: false,
	  selector: false,
	  placement: 'top',
	  container: false,
	  fallbackPlacements: null,
	  boundary: 'clippingParents',
	  customClass: '',
	  sanitize: true,
	  sanitizeFn: null,
	  allowList: DefaultAllowlist,
	  popperConfig: null
	};
	var Event$1 = {
	  HIDE: "hide" + EVENT_KEY$6,
	  HIDDEN: "hidden" + EVENT_KEY$6,
	  SHOW: "show" + EVENT_KEY$6,
	  SHOWN: "shown" + EVENT_KEY$6,
	  INSERTED: "inserted" + EVENT_KEY$6,
	  CLICK: "click" + EVENT_KEY$6,
	  FOCUSIN: "focusin" + EVENT_KEY$6,
	  FOCUSOUT: "focusout" + EVENT_KEY$6,
	  MOUSEENTER: "mouseenter" + EVENT_KEY$6,
	  MOUSELEAVE: "mouseleave" + EVENT_KEY$6
	};
	var CLASS_NAME_FADE$1 = 'fade';
	var CLASS_NAME_MODAL = 'modal';
	var CLASS_NAME_SHOW$3 = 'show';
	var HOVER_STATE_SHOW = 'show';
	var HOVER_STATE_OUT = 'out';
	var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	var TRIGGER_HOVER = 'hover';
	var TRIGGER_FOCUS = 'focus';
	var TRIGGER_CLICK = 'click';
	var TRIGGER_MANUAL = 'manual';
	var Tooltip = function (_BaseComponent) {
	  _inheritsLoose(Tooltip, _BaseComponent);
	  function Tooltip(element, config) {
	    var _this;
	    if (typeof Popper === 'undefined') {
	      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
	    }
	    _this = _BaseComponent.call(this, element) || this;
	    _this._isEnabled = true;
	    _this._timeout = 0;
	    _this._hoverState = '';
	    _this._activeTrigger = {};
	    _this._popper = null;
	    _this.config = _this._getConfig(config);
	    _this.tip = null;
	    _this._setListeners();
	    return _this;
	  }
	  var _proto = Tooltip.prototype;
	  _proto.enable = function enable() {
	    this._isEnabled = true;
	  };
	  _proto.disable = function disable() {
	    this._isEnabled = false;
	  };
	  _proto.toggleEnabled = function toggleEnabled() {
	    this._isEnabled = !this._isEnabled;
	  };
	  _proto.toggle = function toggle(event) {
	    if (!this._isEnabled) {
	      return;
	    }
	    if (event) {
	      var dataKey = this.constructor.DATA_KEY;
	      var context = Data.getData(event.delegateTarget, dataKey);
	      if (!context) {
	        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	        Data.setData(event.delegateTarget, dataKey, context);
	      }
	      context._activeTrigger.click = !context._activeTrigger.click;
	      if (context._isWithActiveTrigger()) {
	        context._enter(null, context);
	      } else {
	        context._leave(null, context);
	      }
	    } else {
	      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
	        this._leave(null, this);
	        return;
	      }
	      this._enter(null, this);
	    }
	  };
	  _proto.dispose = function dispose() {
	    clearTimeout(this._timeout);
	    EventHandler.off(this._element, this.constructor.EVENT_KEY);
	    EventHandler.off(this._element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);
	    if (this.tip) {
	      this.tip.parentNode.removeChild(this.tip);
	    }
	    this._isEnabled = null;
	    this._timeout = null;
	    this._hoverState = null;
	    this._activeTrigger = null;
	    if (this._popper) {
	      this._popper.destroy();
	    }
	    this._popper = null;
	    this.config = null;
	    this.tip = null;
	    _BaseComponent.prototype.dispose.call(this);
	  };
	  _proto.show = function show() {
	    var _this2 = this;
	    if (this._element.style.display === 'none') {
	      throw new Error('Please use show on visible elements');
	    }
	    if (this.isWithContent() && this._isEnabled) {
	      var showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
	      var shadowRoot = findShadowRoot(this._element);
	      var isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
	      if (showEvent.defaultPrevented || !isInTheDom) {
	        return;
	      }
	      var tip = this.getTipElement();
	      var tipId = getUID(this.constructor.NAME);
	      tip.setAttribute('id', tipId);
	      this._element.setAttribute('aria-describedby', tipId);
	      this.setContent();
	      if (this.config.animation) {
	        tip.classList.add(CLASS_NAME_FADE$1);
	      }
	      var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this._element) : this.config.placement;
	      var attachment = this._getAttachment(placement);
	      this._addAttachmentClass(attachment);
	      var container = this._getContainer();
	      Data.setData(tip, this.constructor.DATA_KEY, this);
	      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	        container.appendChild(tip);
	      }
	      EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
	      this._popper = createPopper$2(this._element, tip, this._getPopperConfig(attachment));
	      tip.classList.add(CLASS_NAME_SHOW$3);
	      var customClass = typeof this.config.customClass === 'function' ? this.config.customClass() : this.config.customClass;
	      if (customClass) {
	        var _tip$classList;
	        (_tip$classList = tip.classList).add.apply(_tip$classList, customClass.split(' '));
	      }
	      if ('ontouchstart' in document.documentElement) {
	        var _ref;
	        (_ref = []).concat.apply(_ref, document.body.children).forEach(function (element) {
	          EventHandler.on(element, 'mouseover', noop());
	        });
	      }
	      var complete = function complete() {
	        var prevHoverState = _this2._hoverState;
	        _this2._hoverState = null;
	        EventHandler.trigger(_this2._element, _this2.constructor.Event.SHOWN);
	        if (prevHoverState === HOVER_STATE_OUT) {
	          _this2._leave(null, _this2);
	        }
	      };
	      if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
	        var transitionDuration = getTransitionDurationFromElement(this.tip);
	        EventHandler.one(this.tip, TRANSITION_END, complete);
	        emulateTransitionEnd(this.tip, transitionDuration);
	      } else {
	        complete();
	      }
	    }
	  };
	  _proto.hide = function hide() {
	    var _this3 = this;
	    if (!this._popper) {
	      return;
	    }
	    var tip = this.getTipElement();
	    var complete = function complete() {
	      if (_this3._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
	        tip.parentNode.removeChild(tip);
	      }
	      _this3._cleanTipClass();
	      _this3._element.removeAttribute('aria-describedby');
	      EventHandler.trigger(_this3._element, _this3.constructor.Event.HIDDEN);
	      if (_this3._popper) {
	        _this3._popper.destroy();
	        _this3._popper = null;
	      }
	    };
	    var hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    tip.classList.remove(CLASS_NAME_SHOW$3);
	    if ('ontouchstart' in document.documentElement) {
	      var _ref2;
	      (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (element) {
	        return EventHandler.off(element, 'mouseover', noop);
	      });
	    }
	    this._activeTrigger[TRIGGER_CLICK] = false;
	    this._activeTrigger[TRIGGER_FOCUS] = false;
	    this._activeTrigger[TRIGGER_HOVER] = false;
	    if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
	      var transitionDuration = getTransitionDurationFromElement(tip);
	      EventHandler.one(tip, TRANSITION_END, complete);
	      emulateTransitionEnd(tip, transitionDuration);
	    } else {
	      complete();
	    }
	    this._hoverState = '';
	  };
	  _proto.update = function update() {
	    if (this._popper !== null) {
	      this._popper.update();
	    }
	  }
	  ;
	  _proto.isWithContent = function isWithContent() {
	    return Boolean(this.getTitle());
	  };
	  _proto.getTipElement = function getTipElement() {
	    if (this.tip) {
	      return this.tip;
	    }
	    var element = document.createElement('div');
	    element.innerHTML = this.config.template;
	    this.tip = element.children[0];
	    return this.tip;
	  };
	  _proto.setContent = function setContent() {
	    var tip = this.getTipElement();
	    this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
	    tip.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$3);
	  };
	  _proto.setElementContent = function setElementContent(element, content) {
	    if (element === null) {
	      return;
	    }
	    if (typeof content === 'object' && isElement$1(content)) {
	      if (content.jquery) {
	        content = content[0];
	      }
	      if (this.config.html) {
	        if (content.parentNode !== element) {
	          element.innerHTML = '';
	          element.appendChild(content);
	        }
	      } else {
	        element.textContent = content.textContent;
	      }
	      return;
	    }
	    if (this.config.html) {
	      if (this.config.sanitize) {
	        content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
	      }
	      element.innerHTML = content;
	    } else {
	      element.textContent = content;
	    }
	  };
	  _proto.getTitle = function getTitle() {
	    var title = this._element.getAttribute('data-bs-original-title');
	    if (!title) {
	      title = typeof this.config.title === 'function' ? this.config.title.call(this._element) : this.config.title;
	    }
	    return title;
	  };
	  _proto.updateAttachment = function updateAttachment(attachment) {
	    if (attachment === 'right') {
	      return 'end';
	    }
	    if (attachment === 'left') {
	      return 'start';
	    }
	    return attachment;
	  }
	  ;
	  _proto._getPopperConfig = function _getPopperConfig(attachment) {
	    var _this4 = this;
	    var flipModifier = {
	      name: 'flip',
	      options: {
	        altBoundary: true
	      }
	    };
	    if (this.config.fallbackPlacements) {
	      flipModifier.options.fallbackPlacements = this.config.fallbackPlacements;
	    }
	    var defaultBsConfig = {
	      placement: attachment,
	      modifiers: [flipModifier, {
	        name: 'preventOverflow',
	        options: {
	          rootBoundary: this.config.boundary
	        }
	      }, {
	        name: 'arrow',
	        options: {
	          element: "." + this.constructor.NAME + "-arrow"
	        }
	      }, {
	        name: 'onChange',
	        enabled: true,
	        phase: 'afterWrite',
	        fn: function fn(data) {
	          return _this4._handlePopperPlacementChange(data);
	        }
	      }],
	      onFirstUpdate: function onFirstUpdate(data) {
	        if (data.options.placement !== data.placement) {
	          _this4._handlePopperPlacementChange(data);
	        }
	      }
	    };
	    return _extends({}, defaultBsConfig, this.config.popperConfig);
	  };
	  _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
	    this.getTipElement().classList.add(CLASS_PREFIX + "-" + this.updateAttachment(attachment));
	  };
	  _proto._getContainer = function _getContainer() {
	    if (this.config.container === false) {
	      return document.body;
	    }
	    if (isElement$1(this.config.container)) {
	      return this.config.container;
	    }
	    return SelectorEngine.findOne(this.config.container);
	  };
	  _proto._getAttachment = function _getAttachment(placement) {
	    return AttachmentMap[placement.toUpperCase()];
	  };
	  _proto._setListeners = function _setListeners() {
	    var _this5 = this;
	    var triggers = this.config.trigger.split(' ');
	    triggers.forEach(function (trigger) {
	      if (trigger === 'click') {
	        EventHandler.on(_this5._element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
	          return _this5.toggle(event);
	        });
	      } else if (trigger !== TRIGGER_MANUAL) {
	        var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
	        var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
	        EventHandler.on(_this5._element, eventIn, _this5.config.selector, function (event) {
	          return _this5._enter(event);
	        });
	        EventHandler.on(_this5._element, eventOut, _this5.config.selector, function (event) {
	          return _this5._leave(event);
	        });
	      }
	    });
	    this._hideModalHandler = function () {
	      if (_this5._element) {
	        _this5.hide();
	      }
	    };
	    EventHandler.on(this._element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);
	    if (this.config.selector) {
	      this.config = _extends({}, this.config, {
	        trigger: 'manual',
	        selector: ''
	      });
	    } else {
	      this._fixTitle();
	    }
	  };
	  _proto._fixTitle = function _fixTitle() {
	    var title = this._element.getAttribute('title');
	    var originalTitleType = typeof this._element.getAttribute('data-bs-original-title');
	    if (title || originalTitleType !== 'string') {
	      this._element.setAttribute('data-bs-original-title', title || '');
	      if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
	        this._element.setAttribute('aria-label', title);
	      }
	      this._element.setAttribute('title', '');
	    }
	  };
	  _proto._enter = function _enter(event, context) {
	    var dataKey = this.constructor.DATA_KEY;
	    context = context || Data.getData(event.delegateTarget, dataKey);
	    if (!context) {
	      context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	      Data.setData(event.delegateTarget, dataKey, context);
	    }
	    if (event) {
	      context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
	    }
	    if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
	      context._hoverState = HOVER_STATE_SHOW;
	      return;
	    }
	    clearTimeout(context._timeout);
	    context._hoverState = HOVER_STATE_SHOW;
	    if (!context.config.delay || !context.config.delay.show) {
	      context.show();
	      return;
	    }
	    context._timeout = setTimeout(function () {
	      if (context._hoverState === HOVER_STATE_SHOW) {
	        context.show();
	      }
	    }, context.config.delay.show);
	  };
	  _proto._leave = function _leave(event, context) {
	    var dataKey = this.constructor.DATA_KEY;
	    context = context || Data.getData(event.delegateTarget, dataKey);
	    if (!context) {
	      context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	      Data.setData(event.delegateTarget, dataKey, context);
	    }
	    if (event) {
	      context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
	    }
	    if (context._isWithActiveTrigger()) {
	      return;
	    }
	    clearTimeout(context._timeout);
	    context._hoverState = HOVER_STATE_OUT;
	    if (!context.config.delay || !context.config.delay.hide) {
	      context.hide();
	      return;
	    }
	    context._timeout = setTimeout(function () {
	      if (context._hoverState === HOVER_STATE_OUT) {
	        context.hide();
	      }
	    }, context.config.delay.hide);
	  };
	  _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
	    for (var trigger in this._activeTrigger) {
	      if (this._activeTrigger[trigger]) {
	        return true;
	      }
	    }
	    return false;
	  };
	  _proto._getConfig = function _getConfig(config) {
	    var dataAttributes = Manipulator.getDataAttributes(this._element);
	    Object.keys(dataAttributes).forEach(function (dataAttr) {
	      if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
	        delete dataAttributes[dataAttr];
	      }
	    });
	    if (config && typeof config.container === 'object' && config.container.jquery) {
	      config.container = config.container[0];
	    }
	    config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});
	    if (typeof config.delay === 'number') {
	      config.delay = {
	        show: config.delay,
	        hide: config.delay
	      };
	    }
	    if (typeof config.title === 'number') {
	      config.title = config.title.toString();
	    }
	    if (typeof config.content === 'number') {
	      config.content = config.content.toString();
	    }
	    typeCheckConfig(NAME$6, config, this.constructor.DefaultType);
	    if (config.sanitize) {
	      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
	    }
	    return config;
	  };
	  _proto._getDelegateConfig = function _getDelegateConfig() {
	    var config = {};
	    if (this.config) {
	      for (var key in this.config) {
	        if (this.constructor.Default[key] !== this.config[key]) {
	          config[key] = this.config[key];
	        }
	      }
	    }
	    return config;
	  };
	  _proto._cleanTipClass = function _cleanTipClass() {
	    var tip = this.getTipElement();
	    var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);
	    if (tabClass !== null && tabClass.length > 0) {
	      tabClass.map(function (token) {
	        return token.trim();
	      }).forEach(function (tClass) {
	        return tip.classList.remove(tClass);
	      });
	    }
	  };
	  _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
	    var state = popperData.state;
	    if (!state) {
	      return;
	    }
	    this.tip = state.elements.popper;
	    this._cleanTipClass();
	    this._addAttachmentClass(this._getAttachment(state.placement));
	  }
	  ;
	  Tooltip.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Data.getData(this, DATA_KEY$6);
	      var _config = typeof config === 'object' && config;
	      if (!data && /dispose|hide/.test(config)) {
	        return;
	      }
	      if (!data) {
	        data = new Tooltip(this, _config);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config]();
	      }
	    });
	  };
	  _createClass$1(Tooltip, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$4;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$6;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$6;
	    }
	  }, {
	    key: "Event",
	    get: function get() {
	      return Event$1;
	    }
	  }, {
	    key: "EVENT_KEY",
	    get: function get() {
	      return EVENT_KEY$6;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$4;
	    }
	  }]);
	  return Tooltip;
	}(BaseComponent);
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$6];
	    $.fn[NAME$6] = Tooltip.jQueryInterface;
	    $.fn[NAME$6].Constructor = Tooltip;
	    $.fn[NAME$6].noConflict = function () {
	      $.fn[NAME$6] = JQUERY_NO_CONFLICT;
	      return Tooltip.jQueryInterface;
	    };
	  }
	});
	var NAME$7 = 'popover';
	var DATA_KEY$7 = 'bs.popover';
	var EVENT_KEY$7 = "." + DATA_KEY$7;
	var CLASS_PREFIX$1 = 'bs-popover';
	var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');
	var Default$5 = _extends({}, Tooltip.Default, {
	  placement: 'right',
	  trigger: 'click',
	  content: '',
	  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
	});
	var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
	  content: '(string|element|function)'
	});
	var Event$2 = {
	  HIDE: "hide" + EVENT_KEY$7,
	  HIDDEN: "hidden" + EVENT_KEY$7,
	  SHOW: "show" + EVENT_KEY$7,
	  SHOWN: "shown" + EVENT_KEY$7,
	  INSERTED: "inserted" + EVENT_KEY$7,
	  CLICK: "click" + EVENT_KEY$7,
	  FOCUSIN: "focusin" + EVENT_KEY$7,
	  FOCUSOUT: "focusout" + EVENT_KEY$7,
	  MOUSEENTER: "mouseenter" + EVENT_KEY$7,
	  MOUSELEAVE: "mouseleave" + EVENT_KEY$7
	};
	var CLASS_NAME_FADE$2 = 'fade';
	var CLASS_NAME_SHOW$4 = 'show';
	var SELECTOR_TITLE = '.popover-header';
	var SELECTOR_CONTENT = '.popover-body';
	var Popover = function (_Tooltip) {
	  _inheritsLoose(Popover, _Tooltip);
	  function Popover() {
	    return _Tooltip.apply(this, arguments) || this;
	  }
	  var _proto = Popover.prototype;
	  _proto.isWithContent = function isWithContent() {
	    return this.getTitle() || this._getContent();
	  };
	  _proto.setContent = function setContent() {
	    var tip = this.getTipElement();
	    this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());
	    var content = this._getContent();
	    if (typeof content === 'function') {
	      content = content.call(this._element);
	    }
	    this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
	    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4);
	  }
	  ;
	  _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
	    this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + this.updateAttachment(attachment));
	  };
	  _proto._getContent = function _getContent() {
	    return this._element.getAttribute('data-bs-content') || this.config.content;
	  };
	  _proto._cleanTipClass = function _cleanTipClass() {
	    var tip = this.getTipElement();
	    var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);
	    if (tabClass !== null && tabClass.length > 0) {
	      tabClass.map(function (token) {
	        return token.trim();
	      }).forEach(function (tClass) {
	        return tip.classList.remove(tClass);
	      });
	    }
	  }
	  ;
	  Popover.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Data.getData(this, DATA_KEY$7);
	      var _config = typeof config === 'object' ? config : null;
	      if (!data && /dispose|hide/.test(config)) {
	        return;
	      }
	      if (!data) {
	        data = new Popover(this, _config);
	        Data.setData(this, DATA_KEY$7, data);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config]();
	      }
	    });
	  };
	  _createClass$1(Popover, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$5;
	    }
	  }, {
	    key: "NAME",
	    get: function get() {
	      return NAME$7;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$7;
	    }
	  }, {
	    key: "Event",
	    get: function get() {
	      return Event$2;
	    }
	  }, {
	    key: "EVENT_KEY",
	    get: function get() {
	      return EVENT_KEY$7;
	    }
	  }, {
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$5;
	    }
	  }]);
	  return Popover;
	}(Tooltip);
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$7];
	    $.fn[NAME$7] = Popover.jQueryInterface;
	    $.fn[NAME$7].Constructor = Popover;
	    $.fn[NAME$7].noConflict = function () {
	      $.fn[NAME$7] = JQUERY_NO_CONFLICT;
	      return Popover.jQueryInterface;
	    };
	  }
	});
	var NAME$8 = 'scrollspy';
	var DATA_KEY$8 = 'bs.scrollspy';
	var EVENT_KEY$8 = "." + DATA_KEY$8;
	var DATA_API_KEY$6 = '.data-api';
	var Default$6 = {
	  offset: 10,
	  method: 'auto',
	  target: ''
	};
	var DefaultType$6 = {
	  offset: 'number',
	  method: 'string',
	  target: '(string|element)'
	};
	var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
	var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
	var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
	var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	var CLASS_NAME_ACTIVE$2 = 'active';
	var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	var SELECTOR_NAV_LINKS = '.nav-link';
	var SELECTOR_NAV_ITEMS = '.nav-item';
	var SELECTOR_LIST_ITEMS = '.list-group-item';
	var SELECTOR_DROPDOWN = '.dropdown';
	var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	var METHOD_OFFSET = 'offset';
	var METHOD_POSITION = 'position';
	var ScrollSpy = function (_BaseComponent) {
	  _inheritsLoose(ScrollSpy, _BaseComponent);
	  function ScrollSpy(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element) || this;
	    _this._scrollElement = element.tagName === 'BODY' ? window : element;
	    _this._config = _this._getConfig(config);
	    _this._selector = _this._config.target + " " + SELECTOR_NAV_LINKS + ", " + _this._config.target + " " + SELECTOR_LIST_ITEMS + ", " + _this._config.target + " ." + CLASS_NAME_DROPDOWN_ITEM;
	    _this._offsets = [];
	    _this._targets = [];
	    _this._activeTarget = null;
	    _this._scrollHeight = 0;
	    EventHandler.on(_this._scrollElement, EVENT_SCROLL, function (event) {
	      return _this._process(event);
	    });
	    _this.refresh();
	    _this._process();
	    return _this;
	  }
	  var _proto = ScrollSpy.prototype;
	  _proto.refresh = function refresh() {
	    var _this2 = this;
	    var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
	    var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
	    var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
	    this._offsets = [];
	    this._targets = [];
	    this._scrollHeight = this._getScrollHeight();
	    var targets = SelectorEngine.find(this._selector);
	    targets.map(function (element) {
	      var targetSelector = getSelectorFromElement(element);
	      var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;
	      if (target) {
	        var targetBCR = target.getBoundingClientRect();
	        if (targetBCR.width || targetBCR.height) {
	          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
	        }
	      }
	      return null;
	    }).filter(function (item) {
	      return item;
	    }).sort(function (a, b) {
	      return a[0] - b[0];
	    }).forEach(function (item) {
	      _this2._offsets.push(item[0]);
	      _this2._targets.push(item[1]);
	    });
	  };
	  _proto.dispose = function dispose() {
	    _BaseComponent.prototype.dispose.call(this);
	    EventHandler.off(this._scrollElement, EVENT_KEY$8);
	    this._scrollElement = null;
	    this._config = null;
	    this._selector = null;
	    this._offsets = null;
	    this._targets = null;
	    this._activeTarget = null;
	    this._scrollHeight = null;
	  }
	  ;
	  _proto._getConfig = function _getConfig(config) {
	    config = _extends({}, Default$6, typeof config === 'object' && config ? config : {});
	    if (typeof config.target !== 'string' && isElement$1(config.target)) {
	      var id = config.target.id;
	      if (!id) {
	        id = getUID(NAME$8);
	        config.target.id = id;
	      }
	      config.target = "#" + id;
	    }
	    typeCheckConfig(NAME$8, config, DefaultType$6);
	    return config;
	  };
	  _proto._getScrollTop = function _getScrollTop() {
	    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
	  };
	  _proto._getScrollHeight = function _getScrollHeight() {
	    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	  };
	  _proto._getOffsetHeight = function _getOffsetHeight() {
	    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
	  };
	  _proto._process = function _process() {
	    var scrollTop = this._getScrollTop() + this._config.offset;
	    var scrollHeight = this._getScrollHeight();
	    var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
	    if (this._scrollHeight !== scrollHeight) {
	      this.refresh();
	    }
	    if (scrollTop >= maxScroll) {
	      var target = this._targets[this._targets.length - 1];
	      if (this._activeTarget !== target) {
	        this._activate(target);
	      }
	      return;
	    }
	    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
	      this._activeTarget = null;
	      this._clear();
	      return;
	    }
	    for (var i = this._offsets.length; i--;) {
	      var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);
	      if (isActiveTarget) {
	        this._activate(this._targets[i]);
	      }
	    }
	  };
	  _proto._activate = function _activate(target) {
	    this._activeTarget = target;
	    this._clear();
	    var queries = this._selector.split(',').map(function (selector) {
	      return selector + "[data-bs-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
	    });
	    var link = SelectorEngine.findOne(queries.join(','));
	    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
	      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2);
	      link.classList.add(CLASS_NAME_ACTIVE$2);
	    } else {
	      link.classList.add(CLASS_NAME_ACTIVE$2);
	      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function (listGroup) {
	        SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).forEach(function (item) {
	          return item.classList.add(CLASS_NAME_ACTIVE$2);
	        });
	        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
	          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
	            return item.classList.add(CLASS_NAME_ACTIVE$2);
	          });
	        });
	      });
	    }
	    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
	      relatedTarget: target
	    });
	  };
	  _proto._clear = function _clear() {
	    SelectorEngine.find(this._selector).filter(function (node) {
	      return node.classList.contains(CLASS_NAME_ACTIVE$2);
	    }).forEach(function (node) {
	      return node.classList.remove(CLASS_NAME_ACTIVE$2);
	    });
	  }
	  ;
	  ScrollSpy.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Data.getData(this, DATA_KEY$8);
	      var _config = typeof config === 'object' && config;
	      if (!data) {
	        data = new ScrollSpy(this, _config);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config]();
	      }
	    });
	  };
	  _createClass$1(ScrollSpy, null, [{
	    key: "Default",
	    get: function get() {
	      return Default$6;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$8;
	    }
	  }]);
	  return ScrollSpy;
	}(BaseComponent);
	EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
	  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
	    return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
	  });
	});
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$8];
	    $.fn[NAME$8] = ScrollSpy.jQueryInterface;
	    $.fn[NAME$8].Constructor = ScrollSpy;
	    $.fn[NAME$8].noConflict = function () {
	      $.fn[NAME$8] = JQUERY_NO_CONFLICT;
	      return ScrollSpy.jQueryInterface;
	    };
	  }
	});
	var NAME$9 = 'tab';
	var DATA_KEY$9 = 'bs.tab';
	var EVENT_KEY$9 = "." + DATA_KEY$9;
	var DATA_API_KEY$7 = '.data-api';
	var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
	var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
	var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
	var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
	var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
	var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
	var CLASS_NAME_ACTIVE$3 = 'active';
	var CLASS_NAME_DISABLED$1 = 'disabled';
	var CLASS_NAME_FADE$3 = 'fade';
	var CLASS_NAME_SHOW$5 = 'show';
	var SELECTOR_DROPDOWN$1 = '.dropdown';
	var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
	var SELECTOR_ACTIVE$1 = '.active';
	var SELECTOR_ACTIVE_UL = ':scope > li > .active';
	var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
	var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
	var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
	var Tab = function (_BaseComponent) {
	  _inheritsLoose(Tab, _BaseComponent);
	  function Tab() {
	    return _BaseComponent.apply(this, arguments) || this;
	  }
	  var _proto = Tab.prototype;
	  _proto.show = function show() {
	    var _this = this;
	    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1)) {
	      return;
	    }
	    var previous;
	    var target = getElementFromSelector(this._element);
	    var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP$1);
	    if (listElement) {
	      var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1;
	      previous = SelectorEngine.find(itemSelector, listElement);
	      previous = previous[previous.length - 1];
	    }
	    var hideEvent = null;
	    if (previous) {
	      hideEvent = EventHandler.trigger(previous, EVENT_HIDE$3, {
	        relatedTarget: this._element
	      });
	    }
	    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
	      relatedTarget: previous
	    });
	    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
	      return;
	    }
	    this._activate(this._element, listElement);
	    var complete = function complete() {
	      EventHandler.trigger(previous, EVENT_HIDDEN$3, {
	        relatedTarget: _this._element
	      });
	      EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
	        relatedTarget: previous
	      });
	    };
	    if (target) {
	      this._activate(target, target.parentNode, complete);
	    } else {
	      complete();
	    }
	  }
	  ;
	  _proto._activate = function _activate(element, container, callback) {
	    var _this2 = this;
	    var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE$1);
	    var active = activeElements[0];
	    var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$3);
	    var complete = function complete() {
	      return _this2._transitionComplete(element, active, callback);
	    };
	    if (active && isTransitioning) {
	      var transitionDuration = getTransitionDurationFromElement(active);
	      active.classList.remove(CLASS_NAME_SHOW$5);
	      EventHandler.one(active, TRANSITION_END, complete);
	      emulateTransitionEnd(active, transitionDuration);
	    } else {
	      complete();
	    }
	  };
	  _proto._transitionComplete = function _transitionComplete(element, active, callback) {
	    if (active) {
	      active.classList.remove(CLASS_NAME_ACTIVE$3);
	      var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
	      if (dropdownChild) {
	        dropdownChild.classList.remove(CLASS_NAME_ACTIVE$3);
	      }
	      if (active.getAttribute('role') === 'tab') {
	        active.setAttribute('aria-selected', false);
	      }
	    }
	    element.classList.add(CLASS_NAME_ACTIVE$3);
	    if (element.getAttribute('role') === 'tab') {
	      element.setAttribute('aria-selected', true);
	    }
	    reflow(element);
	    if (element.classList.contains(CLASS_NAME_FADE$3)) {
	      element.classList.add(CLASS_NAME_SHOW$5);
	    }
	    if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
	      var dropdownElement = element.closest(SELECTOR_DROPDOWN$1);
	      if (dropdownElement) {
	        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function (dropdown) {
	          return dropdown.classList.add(CLASS_NAME_ACTIVE$3);
	        });
	      }
	      element.setAttribute('aria-expanded', true);
	    }
	    if (callback) {
	      callback();
	    }
	  }
	  ;
	  Tab.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config]();
	      }
	    });
	  };
	  _createClass$1(Tab, null, [{
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$9;
	    }
	  }]);
	  return Tab;
	}(BaseComponent);
	EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
	  event.preventDefault();
	  var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
	  data.show();
	});
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$9];
	    $.fn[NAME$9] = Tab.jQueryInterface;
	    $.fn[NAME$9].Constructor = Tab;
	    $.fn[NAME$9].noConflict = function () {
	      $.fn[NAME$9] = JQUERY_NO_CONFLICT;
	      return Tab.jQueryInterface;
	    };
	  }
	});
	var NAME$a = 'toast';
	var DATA_KEY$a = 'bs.toast';
	var EVENT_KEY$a = "." + DATA_KEY$a;
	var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
	var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
	var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
	var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
	var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
	var CLASS_NAME_FADE$4 = 'fade';
	var CLASS_NAME_HIDE = 'hide';
	var CLASS_NAME_SHOW$6 = 'show';
	var CLASS_NAME_SHOWING = 'showing';
	var DefaultType$7 = {
	  animation: 'boolean',
	  autohide: 'boolean',
	  delay: 'number'
	};
	var Default$7 = {
	  animation: true,
	  autohide: true,
	  delay: 5000
	};
	var SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="toast"]';
	var Toast = function (_BaseComponent) {
	  _inheritsLoose(Toast, _BaseComponent);
	  function Toast(element, config) {
	    var _this;
	    _this = _BaseComponent.call(this, element) || this;
	    _this._config = _this._getConfig(config);
	    _this._timeout = null;
	    _this._setListeners();
	    return _this;
	  }
	  var _proto = Toast.prototype;
	  _proto.show = function show() {
	    var _this2 = this;
	    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4);
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._clearTimeout();
	    if (this._config.animation) {
	      this._element.classList.add(CLASS_NAME_FADE$4);
	    }
	    var complete = function complete() {
	      _this2._element.classList.remove(CLASS_NAME_SHOWING);
	      _this2._element.classList.add(CLASS_NAME_SHOW$6);
	      EventHandler.trigger(_this2._element, EVENT_SHOWN$4);
	      if (_this2._config.autohide) {
	        _this2._timeout = setTimeout(function () {
	          _this2.hide();
	        }, _this2._config.delay);
	      }
	    };
	    this._element.classList.remove(CLASS_NAME_HIDE);
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_SHOWING);
	    if (this._config.animation) {
	      var transitionDuration = getTransitionDurationFromElement(this._element);
	      EventHandler.one(this._element, TRANSITION_END, complete);
	      emulateTransitionEnd(this._element, transitionDuration);
	    } else {
	      complete();
	    }
	  };
	  _proto.hide = function hide() {
	    var _this3 = this;
	    if (!this._element.classList.contains(CLASS_NAME_SHOW$6)) {
	      return;
	    }
	    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    var complete = function complete() {
	      _this3._element.classList.add(CLASS_NAME_HIDE);
	      EventHandler.trigger(_this3._element, EVENT_HIDDEN$4);
	    };
	    this._element.classList.remove(CLASS_NAME_SHOW$6);
	    if (this._config.animation) {
	      var transitionDuration = getTransitionDurationFromElement(this._element);
	      EventHandler.one(this._element, TRANSITION_END, complete);
	      emulateTransitionEnd(this._element, transitionDuration);
	    } else {
	      complete();
	    }
	  };
	  _proto.dispose = function dispose() {
	    this._clearTimeout();
	    if (this._element.classList.contains(CLASS_NAME_SHOW$6)) {
	      this._element.classList.remove(CLASS_NAME_SHOW$6);
	    }
	    EventHandler.off(this._element, EVENT_CLICK_DISMISS$1);
	    _BaseComponent.prototype.dispose.call(this);
	    this._config = null;
	  }
	  ;
	  _proto._getConfig = function _getConfig(config) {
	    config = _extends({}, Default$7, Manipulator.getDataAttributes(this._element), typeof config === 'object' && config ? config : {});
	    typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
	    return config;
	  };
	  _proto._setListeners = function _setListeners() {
	    var _this4 = this;
	    EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
	      return _this4.hide();
	    });
	  };
	  _proto._clearTimeout = function _clearTimeout() {
	    clearTimeout(this._timeout);
	    this._timeout = null;
	  }
	  ;
	  Toast.jQueryInterface = function jQueryInterface(config) {
	    return this.each(function () {
	      var data = Data.getData(this, DATA_KEY$a);
	      var _config = typeof config === 'object' && config;
	      if (!data) {
	        data = new Toast(this, _config);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError("No method named \"" + config + "\"");
	        }
	        data[config](this);
	      }
	    });
	  };
	  _createClass$1(Toast, null, [{
	    key: "DefaultType",
	    get: function get() {
	      return DefaultType$7;
	    }
	  }, {
	    key: "Default",
	    get: function get() {
	      return Default$7;
	    }
	  }, {
	    key: "DATA_KEY",
	    get: function get() {
	      return DATA_KEY$a;
	    }
	  }]);
	  return Toast;
	}(BaseComponent);
	onDOMContentLoaded(function () {
	  var $ = getjQuery();
	  if ($) {
	    var JQUERY_NO_CONFLICT = $.fn[NAME$a];
	    $.fn[NAME$a] = Toast.jQueryInterface;
	    $.fn[NAME$a].Constructor = Toast;
	    $.fn[NAME$a].noConflict = function () {
	      $.fn[NAME$a] = JQUERY_NO_CONFLICT;
	      return Toast.jQueryInterface;
	    };
	  }
	});

	var dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
	dropdownTriggerList.map(function (dropdownTriggerEl) {
	  return new Dropdown(dropdownTriggerEl);
	});
	var selectors = '.dropdown, .dropup, .dropend, .dropstart',
	    dropdowns = document.querySelectorAll(selectors);
	var currentTarget = undefined;
	dropdowns.forEach(function (dropdown) {
	  dropdown.addEventListener('mousedown', function (e) {
	    e.stopPropagation();
	    if (e.target.dataset.bsToggle && e.target.dataset.bsToggle === 'dropdown') {
	      currentTarget = e.currentTarget;
	    }
	  });
	  dropdown.addEventListener('hide.bs.dropdown', function (e) {
	    e.stopPropagation();
	    var parent = currentTarget ? currentTarget.parentElement.closest(selectors) : undefined;
	    if (parent && parent === dropdown) {
	      e.preventDefault();
	    }
	    currentTarget = undefined;
	  });
	});

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
	  var _ref, _tooltipTriggerEl$get;
	  var options = {
	    delay: {
	      show: 50,
	      hide: 50
	    },
	    html: (_ref = tooltipTriggerEl.getAttribute("data-bs-html") === "true") !== null && _ref !== void 0 ? _ref : false,
	    placement: (_tooltipTriggerEl$get = tooltipTriggerEl.getAttribute('data-bs-placement')) !== null && _tooltipTriggerEl$get !== void 0 ? _tooltipTriggerEl$get : 'auto'
	  };
	  return new Tooltip(tooltipTriggerEl, options);
	});

	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	popoverTriggerList.map(function (popoverTriggerEl) {
	  var _ref, _popoverTriggerEl$get;
	  var options = {
	    delay: {
	      show: 50,
	      hide: 50
	    },
	    html: (_ref = popoverTriggerEl.getAttribute('data-bs-html') === "true") !== null && _ref !== void 0 ? _ref : false,
	    placement: (_popoverTriggerEl$get = popoverTriggerEl.getAttribute('data-bs-placement')) !== null && _popoverTriggerEl$get !== void 0 ? _popoverTriggerEl$get : 'auto'
	  };
	  return new Popover(popoverTriggerEl, options);
	});

	var switchesTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="switch-icon"]'));
	switchesTriggerList.map(function (switchTriggerEl) {
	  switchTriggerEl.addEventListener('click', function (e) {
	    e.stopPropagation();
	    switchTriggerEl.classList.toggle('active');
	  });
	});

	var toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
	toastsTriggerList.map(function (toastTriggerEl) {
	  return new Toast(toastTriggerEl);
	});

})));
