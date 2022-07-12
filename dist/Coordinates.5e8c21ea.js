// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/ol/events/Event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.preventDefault = preventDefault;
exports.stopPropagation = stopPropagation;

/**
 * @module ol/events/Event
 */

/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */
var BaseEvent =
/** @class */
function () {
  /**
   * @param {string} type Type.
   */
  function BaseEvent(type) {
    /**
     * @type {boolean}
     */
    this.propagationStopped;
    /**
     * @type {boolean}
     */

    this.defaultPrevented;
    /**
     * The event type.
     * @type {string}
     * @api
     */

    this.type = type;
    /**
     * The event target.
     * @type {Object}
     * @api
     */

    this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */


  BaseEvent.prototype.preventDefault = function () {
    this.defaultPrevented = true;
  };
  /**
   * Stop event propagation.
   * @api
   */


  BaseEvent.prototype.stopPropagation = function () {
    this.propagationStopped = true;
  };

  return BaseEvent;
}();
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function stopPropagation(evt) {
  evt.stopPropagation();
}
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function preventDefault(evt) {
  evt.preventDefault();
}

var _default = BaseEvent;
exports.default = _default;
},{}],"node_modules/ol/ObjectEventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ObjectEventType
 */

/**
 * @enum {string}
 */
var _default = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: 'propertychange'
};
/**
 * @typedef {'propertychange'} Types
 */

exports.default = _default;
},{}],"node_modules/ol/Disposable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/Disposable
 */

/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
var Disposable =
/** @class */
function () {
  function Disposable() {
    /**
     * The object has already been disposed.
     * @type {boolean}
     * @protected
     */
    this.disposed = false;
  }
  /**
   * Clean up.
   */


  Disposable.prototype.dispose = function () {
    if (!this.disposed) {
      this.disposed = true;
      this.disposeInternal();
    }
  };
  /**
   * Extension point for disposable objects.
   * @protected
   */


  Disposable.prototype.disposeInternal = function () {};

  return Disposable;
}();

var _default = Disposable;
exports.default = _default;
},{}],"node_modules/ol/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearch = binarySearch;
exports.equals = equals;
exports.extend = extend;
exports.find = find;
exports.findIndex = findIndex;
exports.includes = includes;
exports.isSorted = isSorted;
exports.linearFindNearest = linearFindNearest;
exports.numberSafeCompareFunction = numberSafeCompareFunction;
exports.remove = remove;
exports.reverseSubArray = reverseSubArray;
exports.stableSort = stableSort;

/**
 * @module ol/array
 */

/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function} [opt_comparator] Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
function binarySearch(haystack, needle, opt_comparator) {
  var mid, cmp;
  var comparator = opt_comparator || numberSafeCompareFunction;
  var low = 0;
  var high = haystack.length;
  var found = false;

  while (low < high) {
    /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle);

    if (cmp < 0.0) {
      /* Too low. */
      low = mid + 1;
    } else {
      /* Key found or too high */
      high = mid;
      found = !cmp;
    }
  }
  /* Key not found. */


  return found ? low : ~low;
}
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */


function numberSafeCompareFunction(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * Whether the array contains the given object.
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */


function includes(arr, obj) {
  return arr.indexOf(obj) >= 0;
}
/**
 * {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution} can use a function
 * of this type to determine which nearest resolution to use.
 *
 * This function takes a `{number}` representing a value between two array entries,
 * a `{number}` representing the value of the nearest higher entry and
 * a `{number}` representing the value of the nearest lower entry
 * as arguments and returns a `{number}`. If a negative number or zero is returned
 * the lower value will be used, if a positive number is returned the higher value
 * will be used.
 * @typedef {function(number, number, number): number} NearestDirectionFunction
 * @api
 */

/**
 * @param {Array<number>} arr Array in descending order.
 * @param {number} target Target.
 * @param {number|NearestDirectionFunction} direction
 *    0 means return the nearest,
 *    > 0 means return the largest nearest,
 *    < 0 means return the smallest nearest.
 * @return {number} Index.
 */


function linearFindNearest(arr, target, direction) {
  var n = arr.length;

  if (arr[0] <= target) {
    return 0;
  } else if (target <= arr[n - 1]) {
    return n - 1;
  } else {
    var i = void 0;

    if (direction > 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] < target) {
          return i - 1;
        }
      }
    } else if (direction < 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] <= target) {
          return i;
        }
      }
    } else {
      for (i = 1; i < n; ++i) {
        if (arr[i] == target) {
          return i;
        } else if (arr[i] < target) {
          if (typeof direction === 'function') {
            if (direction(target, arr[i - 1], arr[i]) > 0) {
              return i - 1;
            } else {
              return i;
            }
          } else if (arr[i - 1] - target < target - arr[i]) {
            return i - 1;
          } else {
            return i;
          }
        }
      }
    }

    return n - 1;
  }
}
/**
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */


function reverseSubArray(arr, begin, end) {
  while (begin < end) {
    var tmp = arr[begin];
    arr[begin] = arr[end];
    arr[end] = tmp;
    ++begin;
    --end;
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */


function extend(arr, data) {
  var extension = Array.isArray(data) ? data : [data];
  var length = extension.length;

  for (var i = 0; i < length; i++) {
    arr[arr.length] = extension[i];
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */


function remove(arr, obj) {
  var i = arr.indexOf(obj);
  var found = i > -1;

  if (found) {
    arr.splice(i, 1);
  }

  return found;
}
/**
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */


function find(arr, func) {
  var length = arr.length >>> 0;
  var value;

  for (var i = 0; i < length; i++) {
    value = arr[i];

    if (func(value, i, arr)) {
      return value;
    }
  }

  return null;
}
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */


function equals(arr1, arr2) {
  var len1 = arr1.length;

  if (len1 !== arr2.length) {
    return false;
  }

  for (var i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
/**
 * Sort the passed array such that the relative order of equal elements is preserved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */


function stableSort(arr, compareFnc) {
  var length = arr.length;
  var tmp = Array(arr.length);
  var i;

  for (i = 0; i < length; i++) {
    tmp[i] = {
      index: i,
      value: arr[i]
    };
  }

  tmp.sort(function (a, b) {
    return compareFnc(a.value, b.value) || a.index - b.index;
  });

  for (i = 0; i < arr.length; i++) {
    arr[i] = tmp[i].value;
  }
}
/**
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */


function findIndex(arr, func) {
  var index;
  var found = !arr.every(function (el, idx) {
    index = idx;
    return !func(el, idx, arr);
  });
  return found ? index : -1;
}
/**
 * @param {Array<*>} arr The array to test.
 * @param {Function} [opt_func] Comparison function.
 * @param {boolean} [opt_strict] Strictly sorted (default false).
 * @return {boolean} Return index.
 */


function isSorted(arr, opt_func, opt_strict) {
  var compare = opt_func || numberSafeCompareFunction;
  return arr.every(function (currentVal, index) {
    if (index === 0) {
      return true;
    }

    var res = compare(arr[index - 1], currentVal);
    return !(res > 0 || opt_strict && res === 0);
  });
}
},{}],"node_modules/ol/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FALSE = FALSE;
exports.TRUE = TRUE;
exports.VOID = VOID;
exports.memoizeOne = memoizeOne;
exports.toPromise = toPromise;

var _array = require("./array.js");

/**
 * @module ol/functions
 */

/**
 * Always returns true.
 * @return {boolean} true.
 */
function TRUE() {
  return true;
}
/**
 * Always returns false.
 * @return {boolean} false.
 */


function FALSE() {
  return false;
}
/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {void} Nothing.
 */


function VOID() {}
/**
 * Wrap a function in another function that remembers the last return.  If the
 * returned function is called twice in a row with the same arguments and the same
 * this object, it will return the value from the first call in the second call.
 *
 * @param {function(...any): ReturnType} fn The function to memoize.
 * @return {function(...any): ReturnType} The memoized function.
 * @template ReturnType
 */


function memoizeOne(fn) {
  var called = false;
  /** @type {ReturnType} */

  var lastResult;
  /** @type {Array<any>} */

  var lastArgs;
  var lastThis;
  return function () {
    var nextArgs = Array.prototype.slice.call(arguments);

    if (!called || this !== lastThis || !(0, _array.equals)(nextArgs, lastArgs)) {
      called = true;
      lastThis = this;
      lastArgs = nextArgs;
      lastResult = fn.apply(this, arguments);
    }

    return lastResult;
  };
}
/**
 * @template T
 * @param {function(): (T | Promise<T>)} getter A function that returns a value or a promise for a value.
 * @return {Promise<T>} A promise for the value.
 */


function toPromise(getter) {
  function promiseGetter() {
    var value;

    try {
      value = getter();
    } catch (err) {
      return Promise.reject(err);
    }

    if (value instanceof Promise) {
      return value;
    }

    return Promise.resolve(value);
  }

  return promiseGetter();
}
},{"./array.js":"node_modules/ol/array.js"}],"node_modules/ol/obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = void 0;
exports.clear = clear;
exports.getValues = void 0;
exports.isEmpty = isEmpty;

/**
 * @module ol/obj
 */

/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
 *
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */
var assign = typeof Object.assign === 'function' ? Object.assign : function (target, var_sources) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);

  for (var i = 1, ii = arguments.length; i < ii; ++i) {
    var source = arguments[i];

    if (source !== undefined && source !== null) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          output[key] = source[key];
        }
      }
    }
  }

  return output;
};
/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */

exports.assign = assign;

function clear(object) {
  for (var property in object) {
    delete object[property];
  }
}
/**
 * Polyfill for Object.values().  Get an array of property values from an object.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 *
 * @param {!Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */


var getValues = typeof Object.values === 'function' ? Object.values : function (object) {
  var values = [];

  for (var property in object) {
    values.push(object[property]);
  }

  return values;
};
/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */

exports.getValues = getValues;

function isEmpty(object) {
  var property;

  for (property in object) {
    return false;
  }

  return !property;
}
},{}],"node_modules/ol/events/Target.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Disposable = _interopRequireDefault(require("../Disposable.js"));

var _Event = _interopRequireDefault(require("./Event.js"));

var _functions = require("../functions.js");

var _obj = require("../obj.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/events/Target
 */


/**
 * @typedef {EventTarget|Target} EventTargetLike
 */

/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */
var Target =
/** @class */
function (_super) {
  __extends(Target, _super);
  /**
   * @param {*} [opt_target] Default event target for dispatched events.
   */


  function Target(opt_target) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {*}
     */


    _this.eventTarget_ = opt_target;
    /**
     * @private
     * @type {Object<string, number>}
     */

    _this.pendingRemovals_ = null;
    /**
     * @private
     * @type {Object<string, number>}
     */

    _this.dispatching_ = null;
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").Listener>>}
     */

    _this.listeners_ = null;
    return _this;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */


  Target.prototype.addEventListener = function (type, listener) {
    if (!type || !listener) {
      return;
    }

    var listeners = this.listeners_ || (this.listeners_ = {});
    var listenersForType = listeners[type] || (listeners[type] = []);

    if (listenersForType.indexOf(listener) === -1) {
      listenersForType.push(listener);
    }
  };
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */


  Target.prototype.dispatchEvent = function (event) {
    var isString = typeof event === 'string';
    var type = isString ? event : event.type;
    var listeners = this.listeners_ && this.listeners_[type];

    if (!listeners) {
      return;
    }

    var evt = isString ? new _Event.default(event) :
    /** @type {Event} */
    event;

    if (!evt.target) {
      evt.target = this.eventTarget_ || this;
    }

    var dispatching = this.dispatching_ || (this.dispatching_ = {});
    var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});

    if (!(type in dispatching)) {
      dispatching[type] = 0;
      pendingRemovals[type] = 0;
    }

    ++dispatching[type];
    var propagate;

    for (var i = 0, ii = listeners.length; i < ii; ++i) {
      if ('handleEvent' in listeners[i]) {
        propagate =
        /** @type {import("../events.js").ListenerObject} */
        listeners[i].handleEvent(evt);
      } else {
        propagate =
        /** @type {import("../events.js").ListenerFunction} */
        listeners[i].call(this, evt);
      }

      if (propagate === false || evt.propagationStopped) {
        propagate = false;
        break;
      }
    }

    if (--dispatching[type] === 0) {
      var pr = pendingRemovals[type];
      delete pendingRemovals[type];

      while (pr--) {
        this.removeEventListener(type, _functions.VOID);
      }

      delete dispatching[type];
    }

    return propagate;
  };
  /**
   * Clean up.
   */


  Target.prototype.disposeInternal = function () {
    this.listeners_ && (0, _obj.clear)(this.listeners_);
  };
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */


  Target.prototype.getListeners = function (type) {
    return this.listeners_ && this.listeners_[type] || undefined;
  };
  /**
   * @param {string} [opt_type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */


  Target.prototype.hasListener = function (opt_type) {
    if (!this.listeners_) {
      return false;
    }

    return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
  };
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */


  Target.prototype.removeEventListener = function (type, listener) {
    var listeners = this.listeners_ && this.listeners_[type];

    if (listeners) {
      var index = listeners.indexOf(listener);

      if (index !== -1) {
        if (this.pendingRemovals_ && type in this.pendingRemovals_) {
          // make listener a no-op, and remove later in #dispatchEvent()
          listeners[index] = _functions.VOID;
          ++this.pendingRemovals_[type];
        } else {
          listeners.splice(index, 1);

          if (listeners.length === 0) {
            delete this.listeners_[type];
          }
        }
      }
    }
  };

  return Target;
}(_Disposable.default);

var _default = Target;
exports.default = _default;
},{"../Disposable.js":"node_modules/ol/Disposable.js","./Event.js":"node_modules/ol/events/Event.js","../functions.js":"node_modules/ol/functions.js","../obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/events/EventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/events/EventType
 */

/**
 * @enum {string}
 * @const
 */
var _default = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: 'change',

  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: 'error',
  BLUR: 'blur',
  CLEAR: 'clear',
  CONTEXTMENU: 'contextmenu',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  DRAGENTER: 'dragenter',
  DRAGOVER: 'dragover',
  DROP: 'drop',
  FOCUS: 'focus',
  KEYDOWN: 'keydown',
  KEYPRESS: 'keypress',
  LOAD: 'load',
  RESIZE: 'resize',
  TOUCHMOVE: 'touchmove',
  WHEEL: 'wheel'
};
exports.default = _default;
},{}],"node_modules/ol/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = listen;
exports.listenOnce = listenOnce;
exports.unlistenByKey = unlistenByKey;

var _obj = require("./obj.js");

/**
 * @module ol/events
 */

/**
 * Key to use with {@link module:ol/Observable.unByKey}.
 * @typedef {Object} EventsKey
 * @property {ListenerFunction} listener Listener.
 * @property {import("./events/Target.js").EventTargetLike} target Target.
 * @property {string} type Type.
 * @api
 */

/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 *
 * @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
 * @api
 */

/**
 * @typedef {Object} ListenerObject
 * @property {ListenerFunction} handleEvent HandleEvent listener function.
 */

/**
 * @typedef {ListenerFunction|ListenerObject} Listener
 */

/**
 * Registers an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link module:ol/events.unlistenByKey}.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object} [opt_this] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean} [opt_once] If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */
function listen(target, type, listener, opt_this, opt_once) {
  if (opt_this && opt_this !== target) {
    listener = listener.bind(opt_this);
  }

  if (opt_once) {
    var originalListener_1 = listener;

    listener = function () {
      target.removeEventListener(type, listener);
      originalListener_1.apply(this, arguments);
    };
  }

  var eventsKey = {
    target: target,
    type: type,
    listener: listener
  };
  target.addEventListener(type, listener);
  return eventsKey;
}
/**
 * Registers a one-off event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link module:ol/events.unlistenByKey} in case the listener needs to be
 * unregistered before it is called.
 *
 * When {@link module:ol/events.listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object} [opt_this] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */


function listenOnce(target, type, listener, opt_this) {
  return listen(target, type, listener, opt_this, true);
}
/**
 * Unregisters event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * The argument passed to this function is the key returned from
 * {@link module:ol/events.listen} or {@link module:ol/events.listenOnce}.
 *
 * @param {EventsKey} key The key.
 */


function unlistenByKey(key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.listener);
    (0, _obj.clear)(key);
  }
}
},{"./obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/Observable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.unByKey = unByKey;

var _Target = _interopRequireDefault(require("./events/Target.js"));

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

var _events = require("./events.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/Observable
 */


/***
 * @template {string} Type
 * @template {Event|import("./events/Event.js").default} EventClass
 * @template Return
 * @typedef {(type: Type, listener: (event: EventClass) => ?) => Return} OnSignature
 */

/***
 * @template {string} Type
 * @template Return
 * @typedef {(type: Type[], listener: (event: Event|import("./events/Event").default) => ?) => Return extends void ? void : Return[]} CombinedOnSignature
 */

/**
 * @typedef {'change'|'error'} EventTypes
 */

/***
 * @template Return
 * @typedef {OnSignature<EventTypes, import("./events/Event.js").default, Return> & CombinedOnSignature<EventTypes, Return>} ObservableOnSignature
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */
var Observable =
/** @class */
function (_super) {
  __extends(Observable, _super);

  function Observable() {
    var _this = _super.call(this) || this;

    _this.on =
    /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    _this.onInternal;
    _this.once =
    /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    _this.onceInternal;
    _this.un =
    /** @type {ObservableOnSignature<void>} */
    _this.unInternal;
    /**
     * @private
     * @type {number}
     */

    _this.revision_ = 0;
    return _this;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */


  Observable.prototype.changed = function () {
    ++this.revision_;
    this.dispatchEvent(_EventType.default.CHANGE);
  };
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */


  Observable.prototype.getRevision = function () {
    return this.revision_;
  };
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */


  Observable.prototype.onInternal = function (type, listener) {
    if (Array.isArray(type)) {
      var len = type.length;
      var keys = new Array(len);

      for (var i = 0; i < len; ++i) {
        keys[i] = (0, _events.listen)(this, type[i], listener);
      }

      return keys;
    } else {
      return (0, _events.listen)(this,
      /** @type {string} */
      type, listener);
    }
  };
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */


  Observable.prototype.onceInternal = function (type, listener) {
    var key;

    if (Array.isArray(type)) {
      var len = type.length;
      key = new Array(len);

      for (var i = 0; i < len; ++i) {
        key[i] = (0, _events.listenOnce)(this, type[i], listener);
      }
    } else {
      key = (0, _events.listenOnce)(this,
      /** @type {string} */
      type, listener);
    }
    /** @type {Object} */


    listener.ol_key = key;
    return key;
  };
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */


  Observable.prototype.unInternal = function (type, listener) {
    var key =
    /** @type {Object} */
    listener.ol_key;

    if (key) {
      unByKey(key);
    } else if (Array.isArray(type)) {
      for (var i = 0, ii = type.length; i < ii; ++i) {
        this.removeEventListener(type[i], listener);
      }
    } else {
      this.removeEventListener(type, listener);
    }
  };

  return Observable;
}(_Target.default);
/**
 * Listen for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */


Observable.prototype.on;
/**
 * Listen once for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */

Observable.prototype.once;
/**
 * Unlisten for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @api
 */

Observable.prototype.un;
/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */

function unByKey(key) {
  if (Array.isArray(key)) {
    for (var i = 0, ii = key.length; i < ii; ++i) {
      (0, _events.unlistenByKey)(key[i]);
    }
  } else {
    (0, _events.unlistenByKey)(
    /** @type {import("./events.js").EventsKey} */
    key);
  }
}

var _default = Observable;
exports.default = _default;
},{"./events/Target.js":"node_modules/ol/events/Target.js","./events/EventType.js":"node_modules/ol/events/EventType.js","./events.js":"node_modules/ol/events.js"}],"node_modules/ol/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = void 0;
exports.abstract = abstract;
exports.getUid = getUid;

/**
 * @module ol/util
 */

/**
 * @return {?} Any return.
 */
function abstract() {
  return (
    /** @type {?} */
    function () {
      throw new Error('Unimplemented abstract method.');
    }()
  );
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */


var uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @api
 */

function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
/**
 * OpenLayers version.
 * @type {string}
 */


var VERSION = '6.14.1';
exports.VERSION = VERSION;
},{}],"node_modules/ol/Object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ObjectEvent = void 0;

var _Event = _interopRequireDefault(require("./events/Event.js"));

var _ObjectEventType = _interopRequireDefault(require("./ObjectEventType.js"));

var _Observable = _interopRequireDefault(require("./Observable.js"));

var _obj = require("./obj.js");

var _util = require("./util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/Object
 */


/**
 * @classdesc
 * Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
 */
var ObjectEvent =
/** @class */
function (_super) {
  __extends(ObjectEvent, _super);
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */


  function ObjectEvent(type, key, oldValue) {
    var _this = _super.call(this, type) || this;
    /**
     * The name of the property whose value is changing.
     * @type {string}
     * @api
     */


    _this.key = key;
    /**
     * The old value. To get the new value use `e.target.get(e.key)` where
     * `e` is the event object.
     * @type {*}
     * @api
     */

    _this.oldValue = oldValue;
    return _this;
  }

  return ObjectEvent;
}(_Event.default);

exports.ObjectEvent = ObjectEvent;

/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *    import("./Observable").OnSignature<import("./ObjectEventType").Types, ObjectEvent, Return> &
 *    import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types, Return>} ObjectOnSignature
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable~Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */
var BaseObject =
/** @class */
function (_super) {
  __extends(BaseObject, _super);
  /**
   * @param {Object<string, *>} [opt_values] An object with key-value pairs.
   */


  function BaseObject(opt_values) {
    var _this = _super.call(this) || this;
    /***
     * @type {ObjectOnSignature<import("./events").EventsKey>}
     */


    _this.on;
    /***
     * @type {ObjectOnSignature<import("./events").EventsKey>}
     */

    _this.once;
    /***
     * @type {ObjectOnSignature<void>}
     */

    _this.un; // Call {@link module:ol/util.getUid} to ensure that the order of objects' ids is
    // the same as the order in which they were created.  This also helps to
    // ensure that object properties are always added in the same order, which
    // helps many JavaScript engines generate faster code.

    (0, _util.getUid)(_this);
    /**
     * @private
     * @type {Object<string, *>}
     */

    _this.values_ = null;

    if (opt_values !== undefined) {
      _this.setProperties(opt_values);
    }

    return _this;
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */


  BaseObject.prototype.get = function (key) {
    var value;

    if (this.values_ && this.values_.hasOwnProperty(key)) {
      value = this.values_[key];
    }

    return value;
  };
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */


  BaseObject.prototype.getKeys = function () {
    return this.values_ && Object.keys(this.values_) || [];
  };
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */


  BaseObject.prototype.getProperties = function () {
    return this.values_ && (0, _obj.assign)({}, this.values_) || {};
  };
  /**
   * @return {boolean} The object has properties.
   */


  BaseObject.prototype.hasProperties = function () {
    return !!this.values_;
  };
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */


  BaseObject.prototype.notify = function (key, oldValue) {
    var eventType;
    eventType = "change:".concat(key);

    if (this.hasListener(eventType)) {
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    }

    eventType = _ObjectEventType.default.PROPERTYCHANGE;

    if (this.hasListener(eventType)) {
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    }
  };
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */


  BaseObject.prototype.addChangeListener = function (key, listener) {
    this.addEventListener("change:".concat(key), listener);
  };
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */


  BaseObject.prototype.removeChangeListener = function (key, listener) {
    this.removeEventListener("change:".concat(key), listener);
  };
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [opt_silent] Update without triggering an event.
   * @api
   */


  BaseObject.prototype.set = function (key, value, opt_silent) {
    var values = this.values_ || (this.values_ = {});

    if (opt_silent) {
      values[key] = value;
    } else {
      var oldValue = values[key];
      values[key] = value;

      if (oldValue !== value) {
        this.notify(key, oldValue);
      }
    }
  };
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [opt_silent] Update without triggering an event.
   * @api
   */


  BaseObject.prototype.setProperties = function (values, opt_silent) {
    for (var key in values) {
      this.set(key, values[key], opt_silent);
    }
  };
  /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */


  BaseObject.prototype.applyProperties = function (source) {
    if (!source.values_) {
      return;
    }

    (0, _obj.assign)(this.values_ || (this.values_ = {}), source.values_);
  };
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [opt_silent] Unset without triggering an event.
   * @api
   */


  BaseObject.prototype.unset = function (key, opt_silent) {
    if (this.values_ && key in this.values_) {
      var oldValue = this.values_[key];
      delete this.values_[key];

      if ((0, _obj.isEmpty)(this.values_)) {
        this.values_ = null;
      }

      if (!opt_silent) {
        this.notify(key, oldValue);
      }
    }
  };

  return BaseObject;
}(_Observable.default);

var _default = BaseObject;
exports.default = _default;
},{"./events/Event.js":"node_modules/ol/events/Event.js","./ObjectEventType.js":"node_modules/ol/ObjectEventType.js","./Observable.js":"node_modules/ol/Observable.js","./obj.js":"node_modules/ol/obj.js","./util.js":"node_modules/ol/util.js"}],"node_modules/ol/MapEventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/MapEventType
 */

/**
 * @enum {string}
 */
var _default = {
  /**
   * Triggered after a map frame is rendered.
   * @event module:ol/MapEvent~MapEvent#postrender
   * @api
   */
  POSTRENDER: 'postrender',

  /**
   * Triggered when the map starts moving.
   * @event module:ol/MapEvent~MapEvent#movestart
   * @api
   */
  MOVESTART: 'movestart',

  /**
   * Triggered after the map is moved.
   * @event module:ol/MapEvent~MapEvent#moveend
   * @api
   */
  MOVEEND: 'moveend',

  /**
   * Triggered when loading of additional map data (tiles, images, features) starts.
   * @event module:ol/render/Event~RenderEvent#loadstart
   * @api
   */
  LOADSTART: 'loadstart',

  /**
   * Triggered when loading of additional map data has completed.
   * @event module:ol/render/Event~RenderEvent#loadend
   * @api
   */
  LOADEND: 'loadend'
};
/***
 * @typedef {'postrender'|'movestart'|'moveend'|'loadstart'|'loadend'} Types
 */

exports.default = _default;
},{}],"node_modules/ol/has.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WORKER_OFFSCREEN_CANVAS = exports.WEBKIT = exports.SAFARI_BUG_237906 = exports.SAFARI = exports.PASSIVE_EVENT_LISTENERS = exports.MAC = exports.IMAGE_DECODE = exports.FIREFOX = exports.DEVICE_PIXEL_RATIO = void 0;

/**
 * @module ol/has
 */
var ua = typeof navigator !== 'undefined' && typeof navigator.userAgent !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
/**
 * User agent string says we are dealing with Firefox as browser.
 * @type {boolean}
 */

var FIREFOX = ua.indexOf('firefox') !== -1;
/**
 * User agent string says we are dealing with Safari as browser.
 * @type {boolean}
 */

exports.FIREFOX = FIREFOX;
var SAFARI = ua.indexOf('safari') !== -1 && ua.indexOf('chrom') == -1;
/**
 * https://bugs.webkit.org/show_bug.cgi?id=237906
 * @type {boolean}
 */

exports.SAFARI = SAFARI;
var SAFARI_BUG_237906 = SAFARI && !!(ua.indexOf('version/15.4') >= 0 || ua.match(/cpu (os|iphone os) 15_4 like mac os x/));
/**
 * User agent string says we are dealing with a WebKit engine.
 * @type {boolean}
 */

exports.SAFARI_BUG_237906 = SAFARI_BUG_237906;
var WEBKIT = ua.indexOf('webkit') !== -1 && ua.indexOf('edge') == -1;
/**
 * User agent string says we are dealing with a Mac as platform.
 * @type {boolean}
 */

exports.WEBKIT = WEBKIT;
var MAC = ua.indexOf('macintosh') !== -1;
/**
 * The ratio between physical pixels and device-independent pixels
 * (dips) on the device (`window.devicePixelRatio`).
 * @const
 * @type {number}
 * @api
 */

exports.MAC = MAC;
var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1;
/**
 * The execution context is a worker with OffscreenCanvas available.
 * @const
 * @type {boolean}
 */

exports.DEVICE_PIXEL_RATIO = DEVICE_PIXEL_RATIO;
var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== 'undefined' && typeof OffscreenCanvas !== 'undefined' && self instanceof WorkerGlobalScope; //eslint-disable-line

/**
 * Image.prototype.decode() is supported.
 * @type {boolean}
 */

exports.WORKER_OFFSCREEN_CANVAS = WORKER_OFFSCREEN_CANVAS;
var IMAGE_DECODE = typeof Image !== 'undefined' && Image.prototype.decode;
/**
 * @type {boolean}
 */

exports.IMAGE_DECODE = IMAGE_DECODE;

var PASSIVE_EVENT_LISTENERS = function () {
  var passive = false;

  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function () {
        passive = true;
      }
    });
    window.addEventListener('_', null, options);
    window.removeEventListener('_', null, options);
  } catch (error) {// passive not supported
  }

  return passive;
}();

exports.PASSIVE_EVENT_LISTENERS = PASSIVE_EVENT_LISTENERS;
},{}],"node_modules/ol/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCanvasContext2D = createCanvasContext2D;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
exports.removeChildren = removeChildren;
exports.removeNode = removeNode;
exports.replaceChildren = replaceChildren;
exports.replaceNode = replaceNode;

var _has = require("./has.js");

/**
 * @module ol/dom
 */
//FIXME Move this function to the canvas module

/**
 * Create an html canvas element and returns its 2d context.
 * @param {number} [opt_width] Canvas width.
 * @param {number} [opt_height] Canvas height.
 * @param {Array<HTMLCanvasElement>} [opt_canvasPool] Canvas pool to take existing canvas from.
 * @param {CanvasRenderingContext2DSettings} [opt_Context2DSettings] CanvasRenderingContext2DSettings
 * @return {CanvasRenderingContext2D} The context.
 */
function createCanvasContext2D(opt_width, opt_height, opt_canvasPool, opt_Context2DSettings) {
  /** @type {HTMLCanvasElement|OffscreenCanvas} */
  var canvas;

  if (opt_canvasPool && opt_canvasPool.length) {
    canvas = opt_canvasPool.shift();
  } else if (_has.WORKER_OFFSCREEN_CANVAS) {
    canvas = new OffscreenCanvas(opt_width || 300, opt_height || 300);
  } else {
    canvas = document.createElement('canvas');
  }

  if (opt_width) {
    canvas.width = opt_width;
  }

  if (opt_height) {
    canvas.height = opt_height;
  } //FIXME Allow OffscreenCanvasRenderingContext2D as return type


  return (
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext('2d', opt_Context2DSettings)
  );
}
/**
 * Get the current computed width for the given element including margin,
 * padding and border.
 * Equivalent to jQuery's `$(el).outerWidth(true)`.
 * @param {!HTMLElement} element Element.
 * @return {number} The width.
 */


function outerWidth(element) {
  var width = element.offsetWidth;
  var style = getComputedStyle(element);
  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
/**
 * Get the current computed height for the given element including margin,
 * padding and border.
 * Equivalent to jQuery's `$(el).outerHeight(true)`.
 * @param {!HTMLElement} element Element.
 * @return {number} The height.
 */


function outerHeight(element) {
  var height = element.offsetHeight;
  var style = getComputedStyle(element);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}
/**
 * @param {Node} newNode Node to replace old node
 * @param {Node} oldNode The node to be replaced
 */


function replaceNode(newNode, oldNode) {
  var parent = oldNode.parentNode;

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}
/**
 * @param {Node} node The node to remove.
 * @return {Node|null} The node that was removed or null.
 */


function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
/**
 * @param {Node} node The node to remove the children from.
 */


function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
/**
 * Transform the children of a parent node so they match the
 * provided list of children.  This function aims to efficiently
 * remove, add, and reorder child nodes while maintaining a simple
 * implementation (it is not guaranteed to minimize DOM operations).
 * @param {Node} node The parent node whose children need reworking.
 * @param {Array<Node>} children The desired children.
 */


function replaceChildren(node, children) {
  var oldChildren = node.childNodes;

  for (var i = 0; true; ++i) {
    var oldChild = oldChildren[i];
    var newChild = children[i]; // check if our work is done

    if (!oldChild && !newChild) {
      break;
    } // check if children match


    if (oldChild === newChild) {
      continue;
    } // check if a new child needs to be added


    if (!oldChild) {
      node.appendChild(newChild);
      continue;
    } // check if an old child needs to be removed


    if (!newChild) {
      node.removeChild(oldChild);
      --i;
      continue;
    } // reorder


    node.insertBefore(newChild, oldChild);
  }
}
},{"./has.js":"node_modules/ol/has.js"}],"node_modules/ol/control/Control.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Object = _interopRequireDefault(require("../Object.js"));

var _MapEventType = _interopRequireDefault(require("../MapEventType.js"));

var _functions = require("../functions.js");

var _events = require("../events.js");

var _dom = require("../dom.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/control/Control
 */


/**
 * @typedef {Object} Options
 * @property {HTMLElement} [element] The element is the control's
 * container element. This only needs to be specified if you're developing
 * a custom control.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want
 * the control to be rendered outside of the map's viewport.
 */

/**
 * @classdesc
 * A control is a visible widget with a DOM element in a fixed position on the
 * screen. They can involve user input (buttons), or be informational only;
 * the position is determined using CSS. By default these are placed in the
 * container with CSS class name `ol-overlaycontainer-stopevent`, but can use
 * any outside DOM element.
 *
 * This is the base class for controls. You can use it for simple custom
 * controls by creating the element with listeners, creating an instance:
 * ```js
 * var myControl = new Control({element: myElement});
 * ```
 * and then adding this to the map.
 *
 * The main advantage of having this as a control rather than a simple separate
 * DOM element is that preventing propagation is handled for you. Controls
 * will also be objects in a {@link module:ol/Collection~Collection}, so you can use their methods.
 *
 * You can also extend this base for your own control class. See
 * examples/custom-controls for an example of how to do this.
 *
 * @api
 */
var Control =
/** @class */
function (_super) {
  __extends(Control, _super);
  /**
   * @param {Options} options Control options.
   */


  function Control(options) {
    var _this = _super.call(this) || this;

    var element = options.element;

    if (element && !options.target && !element.style.pointerEvents) {
      element.style.pointerEvents = 'auto';
    }
    /**
     * @protected
     * @type {HTMLElement}
     */


    _this.element = element ? element : null;
    /**
     * @private
     * @type {HTMLElement}
     */

    _this.target_ = null;
    /**
     * @private
     * @type {import("../PluggableMap.js").default|null}
     */

    _this.map_ = null;
    /**
     * @protected
     * @type {!Array<import("../events.js").EventsKey>}
     */

    _this.listenerKeys = [];

    if (options.render) {
      _this.render = options.render;
    }

    if (options.target) {
      _this.setTarget(options.target);
    }

    return _this;
  }
  /**
   * Clean up.
   */


  Control.prototype.disposeInternal = function () {
    (0, _dom.removeNode)(this.element);

    _super.prototype.disposeInternal.call(this);
  };
  /**
   * Get the map associated with this control.
   * @return {import("../PluggableMap.js").default|null} Map.
   * @api
   */


  Control.prototype.getMap = function () {
    return this.map_;
  };
  /**
   * Remove the control from its current map and attach it to the new map.
   * Pass `null` to just remove the control from the current map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../PluggableMap.js").default|null} map Map.
   * @api
   */


  Control.prototype.setMap = function (map) {
    if (this.map_) {
      (0, _dom.removeNode)(this.element);
    }

    for (var i = 0, ii = this.listenerKeys.length; i < ii; ++i) {
      (0, _events.unlistenByKey)(this.listenerKeys[i]);
    }

    this.listenerKeys.length = 0;
    this.map_ = map;

    if (map) {
      var target = this.target_ ? this.target_ : map.getOverlayContainerStopEvent();
      target.appendChild(this.element);

      if (this.render !== _functions.VOID) {
        this.listenerKeys.push((0, _events.listen)(map, _MapEventType.default.POSTRENDER, this.render, this));
      }

      map.render();
    }
  };
  /**
   * Renders the control.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @api
   */


  Control.prototype.render = function (mapEvent) {};
  /**
   * This function is used to set a target element for the control. It has no
   * effect if it is called after the control has been added to the map (i.e.
   * after `setMap` is called on the control). If no `target` is set in the
   * options passed to the control constructor and if `setTarget` is not called
   * then the control is added to the map's overlay container.
   * @param {HTMLElement|string} target Target.
   * @api
   */


  Control.prototype.setTarget = function (target) {
    this.target_ = typeof target === 'string' ? document.getElementById(target) : target;
  };

  return Control;
}(_Object.default);

var _default = Control;
exports.default = _default;
},{"../Object.js":"node_modules/ol/Object.js","../MapEventType.js":"node_modules/ol/MapEventType.js","../functions.js":"node_modules/ol/functions.js","../events.js":"node_modules/ol/events.js","../dom.js":"node_modules/ol/dom.js"}],"node_modules/ol/pointer/EventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/pointer/EventType
 */

/**
 * Constants for event names.
 * @enum {string}
 */
var _default = {
  POINTERMOVE: 'pointermove',
  POINTERDOWN: 'pointerdown',
  POINTERUP: 'pointerup',
  POINTEROVER: 'pointerover',
  POINTEROUT: 'pointerout',
  POINTERENTER: 'pointerenter',
  POINTERLEAVE: 'pointerleave',
  POINTERCANCEL: 'pointercancel'
};
exports.default = _default;
},{}],"node_modules/ol/proj/Units.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.METERS_PER_UNIT = void 0;
exports.fromCode = fromCode;

/**
 * @module ol/proj/Units
 */

/**
 * Projection units: `'degrees'`, `'ft'`, `'m'`, `'pixels'`, `'tile-pixels'` or
 * `'us-ft'`.
 * @enum {string}
 */
var Units = {
  /**
   * Radians
   * @api
   */
  RADIANS: 'radians',

  /**
   * Degrees
   * @api
   */
  DEGREES: 'degrees',

  /**
   * Feet
   * @api
   */
  FEET: 'ft',

  /**
   * Meters
   * @api
   */
  METERS: 'm',

  /**
   * Pixels
   * @api
   */
  PIXELS: 'pixels',

  /**
   * Tile Pixels
   * @api
   */
  TILE_PIXELS: 'tile-pixels',

  /**
   * US Feet
   * @api
   */
  USFEET: 'us-ft'
};
/**
 * See http://duff.ess.washington.edu/data/raster/drg/docs/geotiff.txt
 * @type {Object<number, Units>}
 */

var unitByCode = {
  '9001': Units.METERS,
  '9002': Units.FEET,
  '9003': Units.USFEET,
  '9101': Units.RADIANS,
  '9102': Units.DEGREES
};
/**
 * @param {number} code Unit code.
 * @return {Units} Units.
 */

function fromCode(code) {
  return unitByCode[code];
}
/**
 * Meters per unit lookup table.
 * @const
 * @type {Object<Units, number>}
 * @api
 */


var METERS_PER_UNIT = {}; // use the radius of the Normal sphere

exports.METERS_PER_UNIT = METERS_PER_UNIT;
METERS_PER_UNIT[Units.RADIANS] = 6370997 / (2 * Math.PI);
METERS_PER_UNIT[Units.DEGREES] = 2 * Math.PI * 6370997 / 360;
METERS_PER_UNIT[Units.FEET] = 0.3048;
METERS_PER_UNIT[Units.METERS] = 1;
METERS_PER_UNIT[Units.USFEET] = 1200 / 3937;
var _default = Units;
exports.default = _default;
},{}],"node_modules/ol/proj/Projection.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Units = require("./Units.js");

/**
 * @module ol/proj/Projection
 */

/**
 * @typedef {Object} Options
 * @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
 * @property {import("./Units.js").default|string} [units] Units. Required unless a
 * proj4 projection is defined for `code`.
 * @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
 * @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
 * @property {boolean} [global=false] Whether the projection is valid for the whole globe.
 * @property {number} [metersPerUnit] The meters per unit for the SRS.
 * If not provided, the `units` are used to get the meters per unit from the {@link module:ol/proj/Units~METERS_PER_UNIT}
 * lookup table.
 * @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
 * @property {function(number, import("../coordinate.js").Coordinate):number} [getPointResolution]
 * Function to determine resolution at a point. The function is called with a
 * `number` view resolution and a {@link module:ol/coordinate~Coordinate Coordinate} as arguments, and returns
 * the `number` resolution in projection units at the passed coordinate. If this is `undefined`,
 * the default {@link module:ol/proj.getPointResolution getPointResolution()} function will be used.
 */

/**
 * @classdesc
 * Projection definition class. One of these is created for each projection
 * supported in the application and stored in the {@link module:ol/proj} namespace.
 * You can use these in applications, but this is not required, as API params
 * and options use {@link module:ol/proj~ProjectionLike} which means the simple string
 * code will suffice.
 *
 * You can use {@link module:ol/proj.get} to retrieve the object for a particular
 * projection.
 *
 * The library includes definitions for `EPSG:4326` and `EPSG:3857`, together
 * with the following aliases:
 * * `EPSG:4326`: CRS:84, urn:ogc:def:crs:EPSG:6.6:4326,
 *     urn:ogc:def:crs:OGC:1.3:CRS84, urn:ogc:def:crs:OGC:2:84,
 *     http://www.opengis.net/gml/srs/epsg.xml#4326,
 *     urn:x-ogc:def:crs:EPSG:4326
 * * `EPSG:3857`: EPSG:102100, EPSG:102113, EPSG:900913,
 *     urn:ogc:def:crs:EPSG:6.18:3:3857,
 *     http://www.opengis.net/gml/srs/epsg.xml#3857
 *
 * If you use [proj4js](https://github.com/proj4js/proj4js), aliases can
 * be added using `proj4.defs()`. After all required projection definitions are
 * added, call the {@link module:ol/proj/proj4.register} function.
 *
 * @api
 */
var Projection =
/** @class */
function () {
  /**
   * @param {Options} options Projection options.
   */
  function Projection(options) {
    /**
     * @private
     * @type {string}
     */
    this.code_ = options.code;
    /**
     * Units of projected coordinates. When set to `TILE_PIXELS`, a
     * `this.extent_` and `this.worldExtent_` must be configured properly for each
     * tile.
     * @private
     * @type {import("./Units.js").default}
     */

    this.units_ =
    /** @type {import("./Units.js").default} */
    options.units;
    /**
     * Validity extent of the projection in projected coordinates. For projections
     * with `TILE_PIXELS` units, this is the extent of the tile in
     * tile pixel space.
     * @private
     * @type {import("../extent.js").Extent}
     */

    this.extent_ = options.extent !== undefined ? options.extent : null;
    /**
     * Extent of the world in EPSG:4326. For projections with
     * `TILE_PIXELS` units, this is the extent of the tile in
     * projected coordinate space.
     * @private
     * @type {import("../extent.js").Extent}
     */

    this.worldExtent_ = options.worldExtent !== undefined ? options.worldExtent : null;
    /**
     * @private
     * @type {string}
     */

    this.axisOrientation_ = options.axisOrientation !== undefined ? options.axisOrientation : 'enu';
    /**
     * @private
     * @type {boolean}
     */

    this.global_ = options.global !== undefined ? options.global : false;
    /**
     * @private
     * @type {boolean}
     */

    this.canWrapX_ = !!(this.global_ && this.extent_);
    /**
     * @private
     * @type {function(number, import("../coordinate.js").Coordinate):number|undefined}
     */

    this.getPointResolutionFunc_ = options.getPointResolution;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    this.defaultTileGrid_ = null;
    /**
     * @private
     * @type {number|undefined}
     */

    this.metersPerUnit_ = options.metersPerUnit;
  }
  /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */


  Projection.prototype.canWrapX = function () {
    return this.canWrapX_;
  };
  /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */


  Projection.prototype.getCode = function () {
    return this.code_;
  };
  /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */


  Projection.prototype.getExtent = function () {
    return this.extent_;
  };
  /**
   * Get the units of this projection.
   * @return {import("./Units.js").default} Units.
   * @api
   */


  Projection.prototype.getUnits = function () {
    return this.units_;
  };
  /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */


  Projection.prototype.getMetersPerUnit = function () {
    return this.metersPerUnit_ || _Units.METERS_PER_UNIT[this.units_];
  };
  /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */


  Projection.prototype.getWorldExtent = function () {
    return this.worldExtent_;
  };
  /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */


  Projection.prototype.getAxisOrientation = function () {
    return this.axisOrientation_;
  };
  /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */


  Projection.prototype.isGlobal = function () {
    return this.global_;
  };
  /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */


  Projection.prototype.setGlobal = function (global) {
    this.global_ = global;
    this.canWrapX_ = !!(global && this.extent_);
  };
  /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */


  Projection.prototype.getDefaultTileGrid = function () {
    return this.defaultTileGrid_;
  };
  /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */


  Projection.prototype.setDefaultTileGrid = function (tileGrid) {
    this.defaultTileGrid_ = tileGrid;
  };
  /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */


  Projection.prototype.setExtent = function (extent) {
    this.extent_ = extent;
    this.canWrapX_ = !!(this.global_ && extent);
  };
  /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */


  Projection.prototype.setWorldExtent = function (worldExtent) {
    this.worldExtent_ = worldExtent;
  };
  /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */


  Projection.prototype.setGetPointResolution = function (func) {
    this.getPointResolutionFunc_ = func;
  };
  /**
   * Get the custom point resolution function for this projection (if set).
   * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
   * resolution function (if set).
   */


  Projection.prototype.getPointResolutionFunc = function () {
    return this.getPointResolutionFunc_;
  };

  return Projection;
}();

var _default = Projection;
exports.default = _default;
},{"./Units.js":"node_modules/ol/proj/Units.js"}],"node_modules/ol/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ceil = ceil;
exports.clamp = clamp;
exports.cosh = void 0;
exports.floor = floor;
exports.lerp = lerp;
exports.log2 = void 0;
exports.modulo = modulo;
exports.round = round;
exports.solveLinearSystem = solveLinearSystem;
exports.squaredDistance = squaredDistance;
exports.squaredSegmentDistance = squaredSegmentDistance;
exports.toDegrees = toDegrees;
exports.toFixed = toFixed;
exports.toRadians = toRadians;

/**
 * @module ol/math
 */

/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
/**
 * Return the hyperbolic cosine of a given number. The method will use the
 * native `Math.cosh` function if it is available, otherwise the hyperbolic
 * cosine will be calculated via the reference implementation of the Mozilla
 * developer network.
 *
 * @param {number} x X.
 * @return {number} Hyperbolic cosine of x.
 */


var cosh = function () {
  // Wrapped in a iife, to save the overhead of checking for the native
  // implementation on every invocation.
  var cosh;

  if ('cosh' in Math) {
    // The environment supports the native Math.cosh function, use it…
    cosh = Math.cosh;
  } else {
    // … else, use the reference implementation of MDN:
    cosh = function (x) {
      var y =
      /** @type {Math} */
      Math.exp(x);
      return (y + 1 / y) / 2;
    };
  }

  return cosh;
}();
/**
 * Return the base 2 logarithm of a given number. The method will use the
 * native `Math.log2` function if it is available, otherwise the base 2
 * logarithm will be calculated via the reference implementation of the
 * Mozilla developer network.
 *
 * @param {number} x X.
 * @return {number} Base 2 logarithm of x.
 */


exports.cosh = cosh;

var log2 = function () {
  // Wrapped in a iife, to save the overhead of checking for the native
  // implementation on every invocation.
  var log2;

  if ('log2' in Math) {
    // The environment supports the native Math.log2 function, use it…
    log2 = Math.log2;
  } else {
    // … else, use the reference implementation of MDN:
    log2 = function (x) {
      return Math.log(x) * Math.LOG2E;
    };
  }

  return log2;
}();
/**
 * Returns the square of the closest distance between the point (x, y) and the
 * line segment (x1, y1) to (x2, y2).
 * @param {number} x X.
 * @param {number} y Y.
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */


exports.log2 = log2;

function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;

  if (dx !== 0 || dy !== 0) {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x1 = x2;
      y1 = y2;
    } else if (t > 0) {
      x1 += dx * t;
      y1 += dy * t;
    }
  }

  return squaredDistance(x, y, x1, y1);
}
/**
 * Returns the square of the distance between the points (x1, y1) and (x2, y2).
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */


function squaredDistance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return dx * dx + dy * dy;
}
/**
 * Solves system of linear equations using Gaussian elimination method.
 *
 * @param {Array<Array<number>>} mat Augmented matrix (n x n + 1 column)
 *                                     in row-major order.
 * @return {Array<number>} The resulting vector.
 */


function solveLinearSystem(mat) {
  var n = mat.length;

  for (var i = 0; i < n; i++) {
    // Find max in the i-th column (ignoring i - 1 first rows)
    var maxRow = i;
    var maxEl = Math.abs(mat[i][i]);

    for (var r = i + 1; r < n; r++) {
      var absValue = Math.abs(mat[r][i]);

      if (absValue > maxEl) {
        maxEl = absValue;
        maxRow = r;
      }
    }

    if (maxEl === 0) {
      return null; // matrix is singular
    } // Swap max row with i-th (current) row


    var tmp = mat[maxRow];
    mat[maxRow] = mat[i];
    mat[i] = tmp; // Subtract the i-th row to make all the remaining rows 0 in the i-th column

    for (var j = i + 1; j < n; j++) {
      var coef = -mat[j][i] / mat[i][i];

      for (var k = i; k < n + 1; k++) {
        if (i == k) {
          mat[j][k] = 0;
        } else {
          mat[j][k] += coef * mat[i][k];
        }
      }
    }
  } // Solve Ax=b for upper triangular matrix A (mat)


  var x = new Array(n);

  for (var l = n - 1; l >= 0; l--) {
    x[l] = mat[l][n] / mat[l][l];

    for (var m = l - 1; m >= 0; m--) {
      mat[m][n] -= mat[m][l] * x[l];
    }
  }

  return x;
}
/**
 * Converts radians to to degrees.
 *
 * @param {number} angleInRadians Angle in radians.
 * @return {number} Angle in degrees.
 */


function toDegrees(angleInRadians) {
  return angleInRadians * 180 / Math.PI;
}
/**
 * Converts degrees to radians.
 *
 * @param {number} angleInDegrees Angle in degrees.
 * @return {number} Angle in radians.
 */


function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}
/**
 * Returns the modulo of a / b, depending on the sign of b.
 *
 * @param {number} a Dividend.
 * @param {number} b Divisor.
 * @return {number} Modulo.
 */


function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
}
/**
 * Calculates the linearly interpolated value of x between a and b.
 *
 * @param {number} a Number
 * @param {number} b Number
 * @param {number} x Value to be interpolated.
 * @return {number} Interpolated value.
 */


function lerp(a, b, x) {
  return a + x * (b - a);
}
/**
 * Returns a number with a limited number of decimal digits.
 * @param {number} n The input number.
 * @param {number} decimals The maximum number of decimal digits.
 * @return {number} The input number with a limited number of decimal digits.
 */


function toFixed(n, decimals) {
  var factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}
/**
 * Rounds a number to the nearest integer value considering only the given number
 * of decimal digits (with rounding on the final digit).
 * @param {number} n The input number.
 * @param {number} decimals The maximum number of decimal digits.
 * @return {number} The nearest integer.
 */


function round(n, decimals) {
  return Math.round(toFixed(n, decimals));
}
/**
 * Rounds a number to the next smaller integer considering only the given number
 * of decimal digits (with rounding on the final digit).
 * @param {number} n The input number.
 * @param {number} decimals The maximum number of decimal digits.
 * @return {number} The next smaller integer.
 */


function floor(n, decimals) {
  return Math.floor(toFixed(n, decimals));
}
/**
 * Rounds a number to the next bigger integer considering only the given number
 * of decimal digits (with rounding on the final digit).
 * @param {number} n The input number.
 * @param {number} decimals The maximum number of decimal digits.
 * @return {number} The next bigger integer.
 */


function ceil(n, decimals) {
  return Math.ceil(toFixed(n, decimals));
}
},{}],"node_modules/ol/proj/epsg3857.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WORLD_EXTENT = exports.RADIUS = exports.PROJECTIONS = exports.MAX_SAFE_Y = exports.HALF_SIZE = exports.EXTENT = void 0;
exports.fromEPSG4326 = fromEPSG4326;
exports.toEPSG4326 = toEPSG4326;

var _Projection = _interopRequireDefault(require("./Projection.js"));

var _Units = _interopRequireDefault(require("./Units.js"));

var _math = require("../math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/proj/epsg3857
 */


/**
 * Radius of WGS84 sphere
 *
 * @const
 * @type {number}
 */
var RADIUS = 6378137;
/**
 * @const
 * @type {number}
 */

exports.RADIUS = RADIUS;
var HALF_SIZE = Math.PI * RADIUS;
/**
 * @const
 * @type {import("../extent.js").Extent}
 */

exports.HALF_SIZE = HALF_SIZE;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
/**
 * @const
 * @type {import("../extent.js").Extent}
 */

exports.EXTENT = EXTENT;
var WORLD_EXTENT = [-180, -85, 180, 85];
/**
 * Maximum safe value in y direction
 * @const
 * @type {number}
 */

exports.WORLD_EXTENT = WORLD_EXTENT;
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
/**
 * @classdesc
 * Projection object for web/spherical Mercator (EPSG:3857).
 */

exports.MAX_SAFE_Y = MAX_SAFE_Y;

var EPSG3857Projection =
/** @class */
function (_super) {
  __extends(EPSG3857Projection, _super);
  /**
   * @param {string} code Code.
   */


  function EPSG3857Projection(code) {
    return _super.call(this, {
      code: code,
      units: _Units.default.METERS,
      extent: EXTENT,
      global: true,
      worldExtent: WORLD_EXTENT,
      getPointResolution: function (resolution, point) {
        return resolution / (0, _math.cosh)(point[1] / RADIUS);
      }
    }) || this;
  }

  return EPSG3857Projection;
}(_Projection.default);
/**
 * Projections equal to EPSG:3857.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */


var PROJECTIONS = [new EPSG3857Projection('EPSG:3857'), new EPSG3857Projection('EPSG:102100'), new EPSG3857Projection('EPSG:102113'), new EPSG3857Projection('EPSG:900913'), new EPSG3857Projection('http://www.opengis.net/def/crs/EPSG/0/3857'), new EPSG3857Projection('http://www.opengis.net/gml/srs/epsg.xml#3857')];
/**
 * Transformation from EPSG:4326 to EPSG:3857.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>} [opt_output] Output array of coordinate values.
 * @param {number} [opt_dimension] Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */

exports.PROJECTIONS = PROJECTIONS;

function fromEPSG4326(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;

  if (output === undefined) {
    if (dimension > 2) {
      // preserve values beyond second dimension
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }

  for (var i = 0; i < length; i += dimension) {
    output[i] = HALF_SIZE * input[i] / 180;
    var y = RADIUS * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));

    if (y > MAX_SAFE_Y) {
      y = MAX_SAFE_Y;
    } else if (y < -MAX_SAFE_Y) {
      y = -MAX_SAFE_Y;
    }

    output[i + 1] = y;
  }

  return output;
}
/**
 * Transformation from EPSG:3857 to EPSG:4326.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>} [opt_output] Output array of coordinate values.
 * @param {number} [opt_dimension] Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */


function toEPSG4326(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;

  if (output === undefined) {
    if (dimension > 2) {
      // preserve values beyond second dimension
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }

  for (var i = 0; i < length; i += dimension) {
    output[i] = 180 * input[i] / HALF_SIZE;
    output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS)) / Math.PI - 90;
  }

  return output;
}
},{"./Projection.js":"node_modules/ol/proj/Projection.js","./Units.js":"node_modules/ol/proj/Units.js","../math.js":"node_modules/ol/math.js"}],"node_modules/ol/proj/epsg4326.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RADIUS = exports.PROJECTIONS = exports.METERS_PER_UNIT = exports.EXTENT = void 0;

var _Projection = _interopRequireDefault(require("./Projection.js"));

var _Units = _interopRequireDefault(require("./Units.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/proj/epsg4326
 */


/**
 * Semi-major radius of the WGS84 ellipsoid.
 *
 * @const
 * @type {number}
 */
var RADIUS = 6378137;
/**
 * Extent of the EPSG:4326 projection which is the whole world.
 *
 * @const
 * @type {import("../extent.js").Extent}
 */

exports.RADIUS = RADIUS;
var EXTENT = [-180, -90, 180, 90];
/**
 * @const
 * @type {number}
 */

exports.EXTENT = EXTENT;
var METERS_PER_UNIT = Math.PI * RADIUS / 180;
/**
 * @classdesc
 * Projection object for WGS84 geographic coordinates (EPSG:4326).
 *
 * Note that OpenLayers does not strictly comply with the EPSG definition.
 * The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
 * OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
 */

exports.METERS_PER_UNIT = METERS_PER_UNIT;

var EPSG4326Projection =
/** @class */
function (_super) {
  __extends(EPSG4326Projection, _super);
  /**
   * @param {string} code Code.
   * @param {string} [opt_axisOrientation] Axis orientation.
   */


  function EPSG4326Projection(code, opt_axisOrientation) {
    return _super.call(this, {
      code: code,
      units: _Units.default.DEGREES,
      extent: EXTENT,
      axisOrientation: opt_axisOrientation,
      global: true,
      metersPerUnit: METERS_PER_UNIT,
      worldExtent: EXTENT
    }) || this;
  }

  return EPSG4326Projection;
}(_Projection.default);
/**
 * Projections equal to EPSG:4326.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */


var PROJECTIONS = [new EPSG4326Projection('CRS:84'), new EPSG4326Projection('EPSG:4326', 'neu'), new EPSG4326Projection('urn:ogc:def:crs:OGC:1.3:CRS84'), new EPSG4326Projection('urn:ogc:def:crs:OGC:2:84'), new EPSG4326Projection('http://www.opengis.net/def/crs/OGC/1.3/CRS84'), new EPSG4326Projection('http://www.opengis.net/gml/srs/epsg.xml#4326', 'neu'), new EPSG4326Projection('http://www.opengis.net/def/crs/EPSG/0/4326', 'neu')];
exports.PROJECTIONS = PROJECTIONS;
},{"./Projection.js":"node_modules/ol/proj/Projection.js","./Units.js":"node_modules/ol/proj/Units.js"}],"node_modules/ol/proj/projections.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.clear = clear;
exports.get = get;

/**
 * @module ol/proj/projections
 */

/**
 * @type {Object<string, import("./Projection.js").default>}
 */
var cache = {};
/**
 * Clear the projections cache.
 */

function clear() {
  cache = {};
}
/**
 * Get a cached projection by code.
 * @param {string} code The code for the projection.
 * @return {import("./Projection.js").default} The projection (if cached).
 */


function get(code) {
  return cache[code] || cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, 'EPSG:$3')] || null;
}
/**
 * Add a projection to the cache.
 * @param {string} code The projection code.
 * @param {import("./Projection.js").default} projection The projection to cache.
 */


function add(code, projection) {
  cache[code] = projection;
}
},{}],"node_modules/ol/proj/transforms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.clear = clear;
exports.get = get;
exports.remove = remove;

var _obj = require("../obj.js");

/**
 * @module ol/proj/transforms
 */

/**
 * @private
 * @type {!Object<string, Object<string, import("../proj.js").TransformFunction>>}
 */
var transforms = {};
/**
 * Clear the transform cache.
 */

function clear() {
  transforms = {};
}
/**
 * Registers a conversion function to convert coordinates from the source
 * projection to the destination projection.
 *
 * @param {import("./Projection.js").default} source Source.
 * @param {import("./Projection.js").default} destination Destination.
 * @param {import("../proj.js").TransformFunction} transformFn Transform.
 */


function add(source, destination, transformFn) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();

  if (!(sourceCode in transforms)) {
    transforms[sourceCode] = {};
  }

  transforms[sourceCode][destinationCode] = transformFn;
}
/**
 * Unregisters the conversion function to convert coordinates from the source
 * projection to the destination projection.  This method is used to clean up
 * cached transforms during testing.
 *
 * @param {import("./Projection.js").default} source Source projection.
 * @param {import("./Projection.js").default} destination Destination projection.
 * @return {import("../proj.js").TransformFunction} transformFn The unregistered transform.
 */


function remove(source, destination) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();
  var transform = transforms[sourceCode][destinationCode];
  delete transforms[sourceCode][destinationCode];

  if ((0, _obj.isEmpty)(transforms[sourceCode])) {
    delete transforms[sourceCode];
  }

  return transform;
}
/**
 * Get a transform given a source code and a destination code.
 * @param {string} sourceCode The code for the source projection.
 * @param {string} destinationCode The code for the destination projection.
 * @return {import("../proj.js").TransformFunction|undefined} The transform function (if found).
 */


function get(sourceCode, destinationCode) {
  var transform;

  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform = transforms[sourceCode][destinationCode];
  }

  return transform;
}
},{"../obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/extent/Corner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/extent/Corner
 */

/**
 * Extent corner.
 * @enum {string}
 */
var _default = {
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right'
};
exports.default = _default;
},{}],"node_modules/ol/extent/Relationship.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/extent/Relationship
 */

/**
 * Relationship to an extent.
 * @enum {number}
 */
var _default = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
exports.default = _default;
},{}],"node_modules/ol/AssertionError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util.js");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * @module ol/AssertionError
 */


/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */
var AssertionError =
/** @class */
function (_super) {
  __extends(AssertionError, _super);
  /**
   * @param {number} code Error code.
   */


  function AssertionError(code) {
    var _this = this;

    var path = _util.VERSION === 'latest' ? _util.VERSION : 'v' + _util.VERSION.split('-')[0];
    var message = 'Assertion failed. See https://openlayers.org/en/' + path + '/doc/errors/#' + code + ' for details.';
    _this = _super.call(this, message) || this;
    /**
     * Error code. The meaning of the code can be found on
     * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
     * the version found in the OpenLayers script's header comment if a version
     * other than the latest is used).
     * @type {number}
     * @api
     */

    _this.code = code;
    /**
     * @type {string}
     */

    _this.name = 'AssertionError'; // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40

    _this.message = message;
    return _this;
  }

  return AssertionError;
}(Error);

var _default = AssertionError;
exports.default = _default;
},{"./util.js":"node_modules/ol/util.js"}],"node_modules/ol/asserts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;

var _AssertionError = _interopRequireDefault(require("./AssertionError.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/asserts
 */

/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */
function assert(assertion, errorCode) {
  if (!assertion) {
    throw new _AssertionError.default(errorCode);
  }
}
},{"./AssertionError.js":"node_modules/ol/AssertionError.js"}],"node_modules/ol/extent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyTransform = applyTransform;
exports.approximatelyEquals = approximatelyEquals;
exports.boundingExtent = boundingExtent;
exports.buffer = buffer;
exports.clone = clone;
exports.closestSquaredDistanceXY = closestSquaredDistanceXY;
exports.containsCoordinate = containsCoordinate;
exports.containsExtent = containsExtent;
exports.containsXY = containsXY;
exports.coordinateRelationship = coordinateRelationship;
exports.createEmpty = createEmpty;
exports.createOrUpdate = createOrUpdate;
exports.createOrUpdateEmpty = createOrUpdateEmpty;
exports.createOrUpdateFromCoordinate = createOrUpdateFromCoordinate;
exports.createOrUpdateFromCoordinates = createOrUpdateFromCoordinates;
exports.createOrUpdateFromFlatCoordinates = createOrUpdateFromFlatCoordinates;
exports.createOrUpdateFromRings = createOrUpdateFromRings;
exports.equals = equals;
exports.extend = extend;
exports.extendCoordinate = extendCoordinate;
exports.extendCoordinates = extendCoordinates;
exports.extendFlatCoordinates = extendFlatCoordinates;
exports.extendRings = extendRings;
exports.extendXY = extendXY;
exports.forEachCorner = forEachCorner;
exports.getArea = getArea;
exports.getBottomLeft = getBottomLeft;
exports.getBottomRight = getBottomRight;
exports.getCenter = getCenter;
exports.getCorner = getCorner;
exports.getEnlargedArea = getEnlargedArea;
exports.getForViewAndSize = getForViewAndSize;
exports.getHeight = getHeight;
exports.getIntersection = getIntersection;
exports.getIntersectionArea = getIntersectionArea;
exports.getMargin = getMargin;
exports.getSize = getSize;
exports.getTopLeft = getTopLeft;
exports.getTopRight = getTopRight;
exports.getWidth = getWidth;
exports.intersects = intersects;
exports.intersectsSegment = intersectsSegment;
exports.isEmpty = isEmpty;
exports.returnOrUpdate = returnOrUpdate;
exports.scaleFromCenter = scaleFromCenter;
exports.wrapX = wrapX;

var _Corner = _interopRequireDefault(require("./extent/Corner.js"));

var _Relationship = _interopRequireDefault(require("./extent/Relationship.js"));

var _asserts = require("./asserts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/extent
 */

/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 * @typedef {Array<number>} Extent
 * @api
 */

/**
 * Build an extent that includes all given coordinates.
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Bounding extent.
 * @api
 */
function boundingExtent(coordinates) {
  var extent = createEmpty();

  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }

  return extent;
}
/**
 * @param {Array<number>} xs Xs.
 * @param {Array<number>} ys Ys.
 * @param {Extent} [opt_extent] Destination extent.
 * @private
 * @return {Extent} Extent.
 */


function _boundingExtentXYs(xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}
/**
 * Return extent increased by the provided value.
 * @param {Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 * @api
 */


function buffer(extent, value, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0] - value;
    opt_extent[1] = extent[1] - value;
    opt_extent[2] = extent[2] + value;
    opt_extent[3] = extent[3] + value;
    return opt_extent;
  } else {
    return [extent[0] - value, extent[1] - value, extent[2] + value, extent[3] + value];
  }
}
/**
 * Creates a clone of an extent.
 *
 * @param {Extent} extent Extent to clone.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} The clone.
 */


function clone(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent.slice();
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */


function closestSquaredDistanceXY(extent, x, y) {
  var dx, dy;

  if (x < extent[0]) {
    dx = extent[0] - x;
  } else if (extent[2] < x) {
    dx = x - extent[2];
  } else {
    dx = 0;
  }

  if (y < extent[1]) {
    dy = extent[1] - y;
  } else if (extent[3] < y) {
    dy = y - extent[3];
  } else {
    dy = 0;
  }

  return dx * dx + dy * dy;
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */


function containsCoordinate(extent, coordinate) {
  return containsXY(extent, coordinate[0], coordinate[1]);
}
/**
 * Check if one extent contains another.
 *
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 *
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 * @api
 */


function containsExtent(extent1, extent2) {
  return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */


function containsXY(extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
/**
 * Get the relationship between a coordinate and extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
 * @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
 *     import("./extent/Relationship.js").Relationship).
 */


function coordinateRelationship(extent, coordinate) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var x = coordinate[0];
  var y = coordinate[1];
  var relationship = _Relationship.default.UNKNOWN;

  if (x < minX) {
    relationship = relationship | _Relationship.default.LEFT;
  } else if (x > maxX) {
    relationship = relationship | _Relationship.default.RIGHT;
  }

  if (y < minY) {
    relationship = relationship | _Relationship.default.BELOW;
  } else if (y > maxY) {
    relationship = relationship | _Relationship.default.ABOVE;
  }

  if (relationship === _Relationship.default.UNKNOWN) {
    relationship = _Relationship.default.INTERSECTING;
  }

  return relationship;
}
/**
 * Create an empty extent.
 * @return {Extent} Empty extent.
 * @api
 */


function createEmpty() {
  return [Infinity, Infinity, -Infinity, -Infinity];
}
/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent} [opt_extent] Destination extent.
 * @return {Extent} Extent.
 */


function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = minX;
    opt_extent[1] = minY;
    opt_extent[2] = maxX;
    opt_extent[3] = maxY;
    return opt_extent;
  } else {
    return [minX, minY, maxX, maxY];
  }
}
/**
 * Create a new empty extent or make the provided one empty.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateEmpty(opt_extent) {
  return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromCoordinate(coordinate, opt_extent) {
  var x = coordinate[0];
  var y = coordinate[1];
  return createOrUpdate(x, y, x, y, opt_extent);
}
/**
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromCoordinates(coordinates, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendCoordinates(extent, coordinates);
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
}
/**
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromRings(rings, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendRings(extent, rings);
}
/**
 * Determine if two extents are equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */


function equals(extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
/**
 * Determine if two extents are approximately equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {number} tolerance Tolerance in extent coordinate units.
 * @return {boolean} The two extents differ by less than the tolerance.
 */


function approximatelyEquals(extent1, extent2, tolerance) {
  return Math.abs(extent1[0] - extent2[0]) < tolerance && Math.abs(extent1[2] - extent2[2]) < tolerance && Math.abs(extent1[1] - extent2[1]) < tolerance && Math.abs(extent1[3] - extent2[3]) < tolerance;
}
/**
 * Modify an extent to include another extent.
 * @param {Extent} extent1 The extent to be modified.
 * @param {Extent} extent2 The extent that will be included in the first.
 * @return {Extent} A reference to the first (extended) extent.
 * @api
 */


function extend(extent1, extent2) {
  if (extent2[0] < extent1[0]) {
    extent1[0] = extent2[0];
  }

  if (extent2[2] > extent1[2]) {
    extent1[2] = extent2[2];
  }

  if (extent2[1] < extent1[1]) {
    extent1[1] = extent2[1];
  }

  if (extent2[3] > extent1[3]) {
    extent1[3] = extent2[3];
  }

  return extent1;
}
/**
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 */


function extendCoordinate(extent, coordinate) {
  if (coordinate[0] < extent[0]) {
    extent[0] = coordinate[0];
  }

  if (coordinate[0] > extent[2]) {
    extent[2] = coordinate[0];
  }

  if (coordinate[1] < extent[1]) {
    extent[1] = coordinate[1];
  }

  if (coordinate[1] > extent[3]) {
    extent[3] = coordinate[1];
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Extent.
 */


function extendCoordinates(extent, coordinates) {
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */


function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
  for (; offset < end; offset += stride) {
    extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @return {Extent} Extent.
 */


function extendRings(extent, rings) {
  for (var i = 0, ii = rings.length; i < ii; ++i) {
    extendCoordinates(extent, rings[i]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */


function extendXY(extent, x, y) {
  extent[0] = Math.min(extent[0], x);
  extent[1] = Math.min(extent[1], y);
  extent[2] = Math.max(extent[2], x);
  extent[3] = Math.max(extent[3], y);
}
/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {Extent} extent Extent.
 * @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
 * @return {S|boolean} Value.
 * @template S
 */


function forEachCorner(extent, callback) {
  var val;
  val = callback(getBottomLeft(extent));

  if (val) {
    return val;
  }

  val = callback(getBottomRight(extent));

  if (val) {
    return val;
  }

  val = callback(getTopRight(extent));

  if (val) {
    return val;
  }

  val = callback(getTopLeft(extent));

  if (val) {
    return val;
  }

  return false;
}
/**
 * Get the size of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Area.
 * @api
 */


function getArea(extent) {
  var area = 0;

  if (!isEmpty(extent)) {
    area = getWidth(extent) * getHeight(extent);
  }

  return area;
}
/**
 * Get the bottom left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
 * @api
 */


function getBottomLeft(extent) {
  return [extent[0], extent[1]];
}
/**
 * Get the bottom right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
 * @api
 */


function getBottomRight(extent) {
  return [extent[2], extent[1]];
}
/**
 * Get the center coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Center.
 * @api
 */


function getCenter(extent) {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
/**
 * Get a corner coordinate of an extent.
 * @param {Extent} extent Extent.
 * @param {import("./extent/Corner.js").default} corner Corner.
 * @return {import("./coordinate.js").Coordinate} Corner coordinate.
 */


function getCorner(extent, corner) {
  var coordinate;

  if (corner === _Corner.default.BOTTOM_LEFT) {
    coordinate = getBottomLeft(extent);
  } else if (corner === _Corner.default.BOTTOM_RIGHT) {
    coordinate = getBottomRight(extent);
  } else if (corner === _Corner.default.TOP_LEFT) {
    coordinate = getTopLeft(extent);
  } else if (corner === _Corner.default.TOP_RIGHT) {
    coordinate = getTopRight(extent);
  } else {
    (0, _asserts.assert)(false, 13); // Invalid corner
  }

  return coordinate;
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */


function getEnlargedArea(extent1, extent2) {
  var minX = Math.min(extent1[0], extent2[0]);
  var minY = Math.min(extent1[1], extent2[1]);
  var maxX = Math.max(extent1[2], extent2[2]);
  var maxY = Math.max(extent1[3], extent2[3]);
  return (maxX - minX) * (maxY - minY);
}
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @param {Extent} [opt_extent] Destination extent.
 * @return {Extent} Extent.
 */


function getForViewAndSize(center, resolution, rotation, size, opt_extent) {
  var dx = resolution * size[0] / 2;
  var dy = resolution * size[1] / 2;
  var cosRotation = Math.cos(rotation);
  var sinRotation = Math.sin(rotation);
  var xCos = dx * cosRotation;
  var xSin = dx * sinRotation;
  var yCos = dy * cosRotation;
  var ySin = dy * sinRotation;
  var x = center[0];
  var y = center[1];
  var x0 = x - xCos + ySin;
  var x1 = x - xCos - ySin;
  var x2 = x + xCos - ySin;
  var x3 = x + xCos + ySin;
  var y0 = y - xSin - yCos;
  var y1 = y - xSin + yCos;
  var y2 = y + xSin + yCos;
  var y3 = y + xSin - yCos;
  return createOrUpdate(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
}
/**
 * Get the height of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */


function getHeight(extent) {
  return extent[3] - extent[1];
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */


function getIntersectionArea(extent1, extent2) {
  var intersection = getIntersection(extent1, extent2);
  return getArea(intersection);
}
/**
 * Get the intersection of two extents.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent} [opt_extent] Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */


function getIntersection(extent1, extent2, opt_extent) {
  var intersection = opt_extent ? opt_extent : createEmpty();

  if (intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }

    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }

    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }

    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  } else {
    createOrUpdateEmpty(intersection);
  }

  return intersection;
}
/**
 * @param {Extent} extent Extent.
 * @return {number} Margin.
 */


function getMargin(extent) {
  return getWidth(extent) + getHeight(extent);
}
/**
 * Get the size (width, height) of an extent.
 * @param {Extent} extent The extent.
 * @return {import("./size.js").Size} The extent size.
 * @api
 */


function getSize(extent) {
  return [extent[2] - extent[0], extent[3] - extent[1]];
}
/**
 * Get the top left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top left coordinate.
 * @api
 */


function getTopLeft(extent) {
  return [extent[0], extent[3]];
}
/**
 * Get the top right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top right coordinate.
 * @api
 */


function getTopRight(extent) {
  return [extent[2], extent[3]];
}
/**
 * Get the width of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */


function getWidth(extent) {
  return extent[2] - extent[0];
}
/**
 * Determine if one extent intersects another.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */


function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}
/**
 * Determine if an extent is empty.
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */


function isEmpty(extent) {
  return extent[2] < extent[0] || extent[3] < extent[1];
}
/**
 * @param {Extent} extent Extent.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */


function returnOrUpdate(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent;
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */


function scaleFromCenter(extent, value) {
  var deltaX = (extent[2] - extent[0]) / 2 * (value - 1);
  var deltaY = (extent[3] - extent[1]) / 2 * (value - 1);
  extent[0] -= deltaX;
  extent[2] += deltaX;
  extent[1] -= deltaY;
  extent[3] += deltaY;
}
/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
 * @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */


function intersectsSegment(extent, start, end) {
  var intersects = false;
  var startRel = coordinateRelationship(extent, start);
  var endRel = coordinateRelationship(extent, end);

  if (startRel === _Relationship.default.INTERSECTING || endRel === _Relationship.default.INTERSECTING) {
    intersects = true;
  } else {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var startX = start[0];
    var startY = start[1];
    var endX = end[0];
    var endY = end[1];
    var slope = (endY - startY) / (endX - startX);
    var x = void 0,
        y = void 0;

    if (!!(endRel & _Relationship.default.ABOVE) && !(startRel & _Relationship.default.ABOVE)) {
      // potentially intersects top
      x = endX - (endY - maxY) / slope;
      intersects = x >= minX && x <= maxX;
    }

    if (!intersects && !!(endRel & _Relationship.default.RIGHT) && !(startRel & _Relationship.default.RIGHT)) {
      // potentially intersects right
      y = endY - (endX - maxX) * slope;
      intersects = y >= minY && y <= maxY;
    }

    if (!intersects && !!(endRel & _Relationship.default.BELOW) && !(startRel & _Relationship.default.BELOW)) {
      // potentially intersects bottom
      x = endX - (endY - minY) / slope;
      intersects = x >= minX && x <= maxX;
    }

    if (!intersects && !!(endRel & _Relationship.default.LEFT) && !(startRel & _Relationship.default.LEFT)) {
      // potentially intersects left
      y = endY - (endX - minX) * slope;
      intersects = y >= minY && y <= maxY;
    }
  }

  return intersects;
}
/**
 * Apply a transform function to the extent.
 * @param {Extent} extent Extent.
 * @param {import("./proj.js").TransformFunction} transformFn Transform function.
 * Called with `[minX, minY, maxX, maxY]` extent coordinates.
 * @param {Extent} [opt_extent] Destination extent.
 * @param {number} [opt_stops] Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {Extent} Extent.
 * @api
 */


function applyTransform(extent, transformFn, opt_extent, opt_stops) {
  var coordinates = [];

  if (opt_stops > 1) {
    var width = extent[2] - extent[0];
    var height = extent[3] - extent[1];

    for (var i = 0; i < opt_stops; ++i) {
      coordinates.push(extent[0] + width * i / opt_stops, extent[1], extent[2], extent[1] + height * i / opt_stops, extent[2] - width * i / opt_stops, extent[3], extent[0], extent[3] - height * i / opt_stops);
    }
  } else {
    coordinates = [extent[0], extent[1], extent[2], extent[1], extent[2], extent[3], extent[0], extent[3]];
  }

  transformFn(coordinates, coordinates, 2);
  var xs = [];
  var ys = [];

  for (var i = 0, l = coordinates.length; i < l; i += 2) {
    xs.push(coordinates[i]);
    ys.push(coordinates[i + 1]);
  }

  return _boundingExtentXYs(xs, ys, opt_extent);
}
/**
 * Modifies the provided extent in-place to be within the real world
 * extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./proj/Projection.js").default} projection Projection
 * @return {Extent} The extent within the real world extent.
 */


function wrapX(extent, projection) {
  var projectionExtent = projection.getExtent();
  var center = getCenter(extent);

  if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
    var worldWidth = getWidth(projectionExtent);
    var worldsAway = Math.floor((center[0] - projectionExtent[0]) / worldWidth);
    var offset = worldsAway * worldWidth;
    extent[0] -= offset;
    extent[2] -= offset;
  }

  return extent;
}
},{"./extent/Corner.js":"node_modules/ol/extent/Corner.js","./extent/Relationship.js":"node_modules/ol/extent/Relationship.js","./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareVersions = compareVersions;
exports.padNumber = padNumber;

/**
 * @module ol/string
 */

/**
 * @param {number} number Number to be formatted
 * @param {number} width The desired width
 * @param {number} [opt_precision] Precision of the output string (i.e. number of decimal places)
 * @return {string} Formatted string
 */
function padNumber(number, width, opt_precision) {
  var numberString = opt_precision !== undefined ? number.toFixed(opt_precision) : '' + number;
  var decimal = numberString.indexOf('.');
  decimal = decimal === -1 ? numberString.length : decimal;
  return decimal > width ? numberString : new Array(1 + width - decimal).join('0') + numberString;
}
/**
 * Adapted from https://github.com/omichelsen/compare-versions/blob/master/index.js
 * @param {string|number} v1 First version
 * @param {string|number} v2 Second version
 * @return {number} Value
 */


function compareVersions(v1, v2) {
  var s1 = ('' + v1).split('.');
  var s2 = ('' + v2).split('.');

  for (var i = 0; i < Math.max(s1.length, s2.length); i++) {
    var n1 = parseInt(s1[i] || '0', 10);
    var n2 = parseInt(s2[i] || '0', 10);

    if (n1 > n2) {
      return 1;
    }

    if (n2 > n1) {
      return -1;
    }
  }

  return 0;
}
},{}],"node_modules/ol/coordinate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.closestOnCircle = closestOnCircle;
exports.closestOnSegment = closestOnSegment;
exports.createStringXY = createStringXY;
exports.degreesToStringHDMS = degreesToStringHDMS;
exports.distance = distance;
exports.equals = equals;
exports.format = format;
exports.getWorldsAway = getWorldsAway;
exports.rotate = rotate;
exports.scale = scale;
exports.squaredDistance = squaredDistance;
exports.squaredDistanceToSegment = squaredDistanceToSegment;
exports.toStringHDMS = toStringHDMS;
exports.toStringXY = toStringXY;
exports.wrapX = wrapX;

var _extent = require("./extent.js");

var _math = require("./math.js");

var _string = require("./string.js");

/**
 * @module ol/coordinate
 */

/**
 * An array of numbers representing an xy coordinate. Example: `[16, 48]`.
 * @typedef {Array<number>} Coordinate
 * @api
 */

/**
 * A function that takes a {@link module:ol/coordinate~Coordinate} and
 * transforms it into a `{string}`.
 *
 * @typedef {function((Coordinate|undefined)): string} CoordinateFormat
 * @api
 */

/**
 * Add `delta` to `coordinate`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {add} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     add(coord, [-2, 4]);
 *     // coord is now [5.85, 51.983333]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {Coordinate} delta Delta.
 * @return {Coordinate} The input coordinate adjusted by
 * the given delta.
 * @api
 */
function add(coordinate, delta) {
  coordinate[0] += +delta[0];
  coordinate[1] += +delta[1];
  return coordinate;
}
/**
 * Calculates the point closest to the passed coordinate on the passed circle.
 *
 * @param {Coordinate} coordinate The coordinate.
 * @param {import("./geom/Circle.js").default} circle The circle.
 * @return {Coordinate} Closest point on the circumference.
 */


function closestOnCircle(coordinate, circle) {
  var r = circle.getRadius();
  var center = circle.getCenter();
  var x0 = center[0];
  var y0 = center[1];
  var x1 = coordinate[0];
  var y1 = coordinate[1];
  var dx = x1 - x0;
  var dy = y1 - y0;

  if (dx === 0 && dy === 0) {
    dx = 1;
  }

  var d = Math.sqrt(dx * dx + dy * dy);
  var x = x0 + r * dx / d;
  var y = y0 + r * dy / d;
  return [x, y];
}
/**
 * Calculates the point closest to the passed coordinate on the passed segment.
 * This is the foot of the perpendicular of the coordinate to the segment when
 * the foot is on the segment, or the closest segment coordinate when the foot
 * is outside the segment.
 *
 * @param {Coordinate} coordinate The coordinate.
 * @param {Array<Coordinate>} segment The two coordinates
 * of the segment.
 * @return {Coordinate} The foot of the perpendicular of
 * the coordinate to the segment.
 */


function closestOnSegment(coordinate, segment) {
  var x0 = coordinate[0];
  var y0 = coordinate[1];
  var start = segment[0];
  var end = segment[1];
  var x1 = start[0];
  var y1 = start[1];
  var x2 = end[0];
  var y2 = end[1];
  var dx = x2 - x1;
  var dy = y2 - y1;
  var along = dx === 0 && dy === 0 ? 0 : (dx * (x0 - x1) + dy * (y0 - y1)) / (dx * dx + dy * dy || 0);
  var x, y;

  if (along <= 0) {
    x = x1;
    y = y1;
  } else if (along >= 1) {
    x = x2;
    y = y2;
  } else {
    x = x1 + along * dx;
    y = y1 + along * dy;
  }

  return [x, y];
}
/**
 * Returns a {@link module:ol/coordinate~CoordinateFormat} function that can be
 * used to format
 * a {Coordinate} to a string.
 *
 * Example without specifying the fractional digits:
 *
 *     import {createStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var stringifyFunc = createStringXY();
 *     var out = stringifyFunc(coord);
 *     // out is now '8, 48'
 *
 * Example with explicitly specifying 2 fractional digits:
 *
 *     import {createStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var stringifyFunc = createStringXY(2);
 *     var out = stringifyFunc(coord);
 *     // out is now '7.85, 47.98'
 *
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {CoordinateFormat} Coordinate format.
 * @api
 */


function createStringXY(opt_fractionDigits) {
  return (
    /**
     * @param {Coordinate} coordinate Coordinate.
     * @return {string} String XY.
     */
    function (coordinate) {
      return toStringXY(coordinate, opt_fractionDigits);
    }
  );
}
/**
 * @param {string} hemispheres Hemispheres.
 * @param {number} degrees Degrees.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} String.
 */


function degreesToStringHDMS(hemispheres, degrees, opt_fractionDigits) {
  var normalizedDegrees = (0, _math.modulo)(degrees + 180, 360) - 180;
  var x = Math.abs(3600 * normalizedDegrees);
  var dflPrecision = opt_fractionDigits || 0;
  var precision = Math.pow(10, dflPrecision);
  var deg = Math.floor(x / 3600);
  var min = Math.floor((x - deg * 3600) / 60);
  var sec = x - deg * 3600 - min * 60;
  sec = Math.ceil(sec * precision) / precision;

  if (sec >= 60) {
    sec = 0;
    min += 1;
  }

  if (min >= 60) {
    min = 0;
    deg += 1;
  }

  return deg + '\u00b0 ' + (0, _string.padNumber)(min, 2) + '\u2032 ' + (0, _string.padNumber)(sec, 2, dflPrecision) + '\u2033' + (normalizedDegrees == 0 ? '' : ' ' + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0));
}
/**
 * Transforms the given {@link module:ol/coordinate~Coordinate} to a string
 * using the given string template. The strings `{x}` and `{y}` in the template
 * will be replaced with the first and second coordinate values respectively.
 *
 * Example without specifying the fractional digits:
 *
 *     import {format} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var template = 'Coordinate is ({x}|{y}).';
 *     var out = format(coord, template);
 *     // out is now 'Coordinate is (8|48).'
 *
 * Example explicitly specifying the fractional digits:
 *
 *     import {format} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var template = 'Coordinate is ({x}|{y}).';
 *     var out = format(coord, template, 2);
 *     // out is now 'Coordinate is (7.85|47.98).'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {string} template A template string with `{x}` and `{y}` placeholders
 *     that will be replaced by first and second coordinate values.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} Formatted coordinate.
 * @api
 */


function format(coordinate, template, opt_fractionDigits) {
  if (coordinate) {
    return template.replace('{x}', coordinate[0].toFixed(opt_fractionDigits)).replace('{y}', coordinate[1].toFixed(opt_fractionDigits));
  } else {
    return '';
  }
}
/**
 * @param {Coordinate} coordinate1 First coordinate.
 * @param {Coordinate} coordinate2 Second coordinate.
 * @return {boolean} The two coordinates are equal.
 */


function equals(coordinate1, coordinate2) {
  var equals = true;

  for (var i = coordinate1.length - 1; i >= 0; --i) {
    if (coordinate1[i] != coordinate2[i]) {
      equals = false;
      break;
    }
  }

  return equals;
}
/**
 * Rotate `coordinate` by `angle`. `coordinate` is modified in place and
 * returned by the function.
 *
 * Example:
 *
 *     import {rotate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var rotateRadians = Math.PI / 2; // 90 degrees
 *     rotate(coord, rotateRadians);
 *     // coord is now [-47.983333, 7.85]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} angle Angle in radian.
 * @return {Coordinate} Coordinate.
 * @api
 */


function rotate(coordinate, angle) {
  var cosAngle = Math.cos(angle);
  var sinAngle = Math.sin(angle);
  var x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  coordinate[0] = x;
  coordinate[1] = y;
  return coordinate;
}
/**
 * Scale `coordinate` by `scale`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {scale as scaleCoordinate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var scale = 1.2;
 *     scaleCoordinate(coord, scale);
 *     // coord is now [9.42, 57.5799996]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} scale Scale factor.
 * @return {Coordinate} Coordinate.
 */


function scale(coordinate, scale) {
  coordinate[0] *= scale;
  coordinate[1] *= scale;
  return coordinate;
}
/**
 * @param {Coordinate} coord1 First coordinate.
 * @param {Coordinate} coord2 Second coordinate.
 * @return {number} Squared distance between coord1 and coord2.
 */


function squaredDistance(coord1, coord2) {
  var dx = coord1[0] - coord2[0];
  var dy = coord1[1] - coord2[1];
  return dx * dx + dy * dy;
}
/**
 * @param {Coordinate} coord1 First coordinate.
 * @param {Coordinate} coord2 Second coordinate.
 * @return {number} Distance between coord1 and coord2.
 */


function distance(coord1, coord2) {
  return Math.sqrt(squaredDistance(coord1, coord2));
}
/**
 * Calculate the squared distance from a coordinate to a line segment.
 *
 * @param {Coordinate} coordinate Coordinate of the point.
 * @param {Array<Coordinate>} segment Line segment (2
 * coordinates).
 * @return {number} Squared distance from the point to the line segment.
 */


function squaredDistanceToSegment(coordinate, segment) {
  return squaredDistance(coordinate, closestOnSegment(coordinate, segment));
}
/**
 * Format a geographic coordinate with the hemisphere, degrees, minutes, and
 * seconds.
 *
 * Example without specifying fractional digits:
 *
 *     import {toStringHDMS} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringHDMS(coord);
 *     // out is now '47° 58′ 60″ N 7° 50′ 60″ E'
 *
 * Example explicitly specifying 1 fractional digit:
 *
 *     import {toStringHDMS} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringHDMS(coord, 1);
 *     // out is now '47° 58′ 60.0″ N 7° 50′ 60.0″ E'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} Hemisphere, degrees, minutes and seconds.
 * @api
 */


function toStringHDMS(coordinate, opt_fractionDigits) {
  if (coordinate) {
    return degreesToStringHDMS('NS', coordinate[1], opt_fractionDigits) + ' ' + degreesToStringHDMS('EW', coordinate[0], opt_fractionDigits);
  } else {
    return '';
  }
}
/**
 * Format a coordinate as a comma delimited string.
 *
 * Example without specifying fractional digits:
 *
 *     import {toStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringXY(coord);
 *     // out is now '8, 48'
 *
 * Example explicitly specifying 1 fractional digit:
 *
 *     import {toStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringXY(coord, 1);
 *     // out is now '7.8, 48.0'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} XY.
 * @api
 */


function toStringXY(coordinate, opt_fractionDigits) {
  return format(coordinate, '{x}, {y}', opt_fractionDigits);
}
/**
 * Modifies the provided coordinate in-place to be within the real world
 * extent. The lower projection extent boundary is inclusive, the upper one
 * exclusive.
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {Coordinate} The coordinate within the real world extent.
 */


function wrapX(coordinate, projection) {
  if (projection.canWrapX()) {
    var worldWidth = (0, _extent.getWidth)(projection.getExtent());
    var worldsAway = getWorldsAway(coordinate, projection, worldWidth);

    if (worldsAway) {
      coordinate[0] -= worldsAway * worldWidth;
    }
  }

  return coordinate;
}
/**
 * @param {Coordinate} coordinate Coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @param {number} [opt_sourceExtentWidth] Width of the source extent.
 * @return {number} Offset in world widths.
 */


function getWorldsAway(coordinate, projection, opt_sourceExtentWidth) {
  var projectionExtent = projection.getExtent();
  var worldsAway = 0;

  if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
    var sourceExtentWidth = opt_sourceExtentWidth || (0, _extent.getWidth)(projectionExtent);
    worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
  }

  return worldsAway;
}
},{"./extent.js":"node_modules/ol/extent.js","./math.js":"node_modules/ol/math.js","./string.js":"node_modules/ol/string.js"}],"node_modules/ol/geom/GeometryType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/geom/GeometryType
 */

/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 */
var _default = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  LINEAR_RING: 'LinearRing',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle'
};
exports.default = _default;
},{}],"node_modules/ol/sphere.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_RADIUS = void 0;
exports.getArea = getArea;
exports.getDistance = getDistance;
exports.getLength = getLength;
exports.offset = offset;

var _GeometryType = _interopRequireDefault(require("./geom/GeometryType.js"));

var _math = require("./math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/sphere
 */

/**
 * Object literal with options for the {@link getLength} or {@link getArea}
 * functions.
 * @typedef {Object} SphereMetricOptions
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857']
 * Projection of the  geometry.  By default, the geometry is assumed to be in
 * Web Mercator.
 * @property {number} [radius=6371008.8] Sphere radius.  By default, the
 * [mean Earth radius](https://en.wikipedia.org/wiki/Earth_radius#Mean_radius)
 * for the WGS84 ellipsoid is used.
 */

/**
 * The mean Earth radius (1/3 * (2a + b)) for the WGS84 ellipsoid.
 * https://en.wikipedia.org/wiki/Earth_radius#Mean_radius
 * @type {number}
 */
var DEFAULT_RADIUS = 6371008.8;
/**
 * Get the great circle distance (in meters) between two geographic coordinates.
 * @param {Array} c1 Starting coordinate.
 * @param {Array} c2 Ending coordinate.
 * @param {number} [opt_radius] The sphere radius to use.  Defaults to the Earth's
 *     mean radius using the WGS84 ellipsoid.
 * @return {number} The great circle distance between the points (in meters).
 * @api
 */

exports.DEFAULT_RADIUS = DEFAULT_RADIUS;

function getDistance(c1, c2, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = (0, _math.toRadians)(c1[1]);
  var lat2 = (0, _math.toRadians)(c2[1]);
  var deltaLatBy2 = (lat2 - lat1) / 2;
  var deltaLonBy2 = (0, _math.toRadians)(c2[0] - c1[0]) / 2;
  var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
/**
 * Get the cumulative great circle length of linestring coordinates (geographic).
 * @param {Array} coordinates Linestring coordinates.
 * @param {number} radius The sphere radius to use.
 * @return {number} The length (in meters).
 */


function getLengthInternal(coordinates, radius) {
  var length = 0;

  for (var i = 0, ii = coordinates.length; i < ii - 1; ++i) {
    length += getDistance(coordinates[i], coordinates[i + 1], radius);
  }

  return length;
}
/**
 * Get the spherical length of a geometry.  This length is the sum of the
 * great circle distances between coordinates.  For polygons, the length is
 * the sum of all rings.  For points, the length is zero.  For multi-part
 * geometries, the length is the sum of the length of each part.
 * @param {import("./geom/Geometry.js").default} geometry A geometry.
 * @param {SphereMetricOptions} [opt_options] Options for the
 * length calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 * You can change this by providing a `projection` option.
 * @return {number} The spherical length (in meters).
 * @api
 */


function getLength(geometry, opt_options) {
  var options = opt_options || {};
  var radius = options.radius || DEFAULT_RADIUS;
  var projection = options.projection || 'EPSG:3857';
  var type = geometry.getType();

  if (type !== _GeometryType.default.GEOMETRY_COLLECTION) {
    geometry = geometry.clone().transform(projection, 'EPSG:4326');
  }

  var length = 0;
  var coordinates, coords, i, ii, j, jj;

  switch (type) {
    case _GeometryType.default.POINT:
    case _GeometryType.default.MULTI_POINT:
      {
        break;
      }

    case _GeometryType.default.LINE_STRING:
    case _GeometryType.default.LINEAR_RING:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();
        length = getLengthInternal(coordinates, radius);
        break;
      }

    case _GeometryType.default.MULTI_LINE_STRING:
    case _GeometryType.default.POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          length += getLengthInternal(coordinates[i], radius);
        }

        break;
      }

    case _GeometryType.default.MULTI_POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          coords = coordinates[i];

          for (j = 0, jj = coords.length; j < jj; ++j) {
            length += getLengthInternal(coords[j], radius);
          }
        }

        break;
      }

    case _GeometryType.default.GEOMETRY_COLLECTION:
      {
        var geometries =
        /** @type {import("./geom/GeometryCollection.js").default} */
        geometry.getGeometries();

        for (i = 0, ii = geometries.length; i < ii; ++i) {
          length += getLength(geometries[i], opt_options);
        }

        break;
      }

    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }

  return length;
}
/**
 * Returns the spherical area for a list of coordinates.
 *
 * [Reference](https://trs.jpl.nasa.gov/handle/2014/40409)
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 * Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates List of coordinates of a linear
 * ring. If the ring is oriented clockwise, the area will be positive,
 * otherwise it will be negative.
 * @param {number} radius The sphere radius.
 * @return {number} Area (in square meters).
 */


function getAreaInternal(coordinates, radius) {
  var area = 0;
  var len = coordinates.length;
  var x1 = coordinates[len - 1][0];
  var y1 = coordinates[len - 1][1];

  for (var i = 0; i < len; i++) {
    var x2 = coordinates[i][0];
    var y2 = coordinates[i][1];
    area += (0, _math.toRadians)(x2 - x1) * (2 + Math.sin((0, _math.toRadians)(y1)) + Math.sin((0, _math.toRadians)(y2)));
    x1 = x2;
    y1 = y2;
  }

  return area * radius * radius / 2.0;
}
/**
 * Get the spherical area of a geometry.  This is the area (in meters) assuming
 * that polygon edges are segments of great circles on a sphere.
 * @param {import("./geom/Geometry.js").default} geometry A geometry.
 * @param {SphereMetricOptions} [opt_options] Options for the area
 *     calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 *     You can change this by providing a `projection` option.
 * @return {number} The spherical area (in square meters).
 * @api
 */


function getArea(geometry, opt_options) {
  var options = opt_options || {};
  var radius = options.radius || DEFAULT_RADIUS;
  var projection = options.projection || 'EPSG:3857';
  var type = geometry.getType();

  if (type !== _GeometryType.default.GEOMETRY_COLLECTION) {
    geometry = geometry.clone().transform(projection, 'EPSG:4326');
  }

  var area = 0;
  var coordinates, coords, i, ii, j, jj;

  switch (type) {
    case _GeometryType.default.POINT:
    case _GeometryType.default.MULTI_POINT:
    case _GeometryType.default.LINE_STRING:
    case _GeometryType.default.MULTI_LINE_STRING:
    case _GeometryType.default.LINEAR_RING:
      {
        break;
      }

    case _GeometryType.default.POLYGON:
      {
        coordinates =
        /** @type {import("./geom/Polygon.js").default} */
        geometry.getCoordinates();
        area = Math.abs(getAreaInternal(coordinates[0], radius));

        for (i = 1, ii = coordinates.length; i < ii; ++i) {
          area -= Math.abs(getAreaInternal(coordinates[i], radius));
        }

        break;
      }

    case _GeometryType.default.MULTI_POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          coords = coordinates[i];
          area += Math.abs(getAreaInternal(coords[0], radius));

          for (j = 1, jj = coords.length; j < jj; ++j) {
            area -= Math.abs(getAreaInternal(coords[j], radius));
          }
        }

        break;
      }

    case _GeometryType.default.GEOMETRY_COLLECTION:
      {
        var geometries =
        /** @type {import("./geom/GeometryCollection.js").default} */
        geometry.getGeometries();

        for (i = 0, ii = geometries.length; i < ii; ++i) {
          area += getArea(geometries[i], opt_options);
        }

        break;
      }

    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }

  return area;
}
/**
 * Returns the coordinate at the given distance and bearing from `c1`.
 *
 * @param {import("./coordinate.js").Coordinate} c1 The origin point (`[lon, lat]` in degrees).
 * @param {number} distance The great-circle distance between the origin
 *     point and the target point.
 * @param {number} bearing The bearing (in radians).
 * @param {number} [opt_radius] The sphere radius to use.  Defaults to the Earth's
 *     mean radius using the WGS84 ellipsoid.
 * @return {import("./coordinate.js").Coordinate} The target point.
 */


function offset(c1, distance, bearing, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = (0, _math.toRadians)(c1[1]);
  var lon1 = (0, _math.toRadians)(c1[0]);
  var dByR = distance / radius;
  var lat = Math.asin(Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
  var lon = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1), Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
  return [(0, _math.toDegrees)(lon), (0, _math.toDegrees)(lat)];
}
},{"./geom/GeometryType.js":"node_modules/ol/geom/GeometryType.js","./math.js":"node_modules/ol/math.js"}],"node_modules/ol/proj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "METERS_PER_UNIT", {
  enumerable: true,
  get: function () {
    return _Units.METERS_PER_UNIT;
  }
});
Object.defineProperty(exports, "Projection", {
  enumerable: true,
  get: function () {
    return _Projection.default;
  }
});
exports.addCommon = addCommon;
exports.addCoordinateTransforms = addCoordinateTransforms;
exports.addEquivalentProjections = addEquivalentProjections;
exports.addEquivalentTransforms = addEquivalentTransforms;
exports.addProjection = addProjection;
exports.addProjections = addProjections;
exports.clearAllProjections = clearAllProjections;
exports.clearUserProjection = clearUserProjection;
exports.cloneTransform = cloneTransform;
exports.createProjection = createProjection;
exports.createSafeCoordinateTransform = createSafeCoordinateTransform;
exports.createTransformFromCoordinateTransform = createTransformFromCoordinateTransform;
exports.disableCoordinateWarning = disableCoordinateWarning;
exports.equivalent = equivalent;
exports.fromLonLat = fromLonLat;
exports.fromUserCoordinate = fromUserCoordinate;
exports.fromUserExtent = fromUserExtent;
exports.fromUserResolution = fromUserResolution;
exports.get = get;
exports.getPointResolution = getPointResolution;
exports.getTransform = getTransform;
exports.getTransformFromProjections = getTransformFromProjections;
exports.getUserProjection = getUserProjection;
exports.identityTransform = identityTransform;
exports.setUserProjection = setUserProjection;
exports.toLonLat = toLonLat;
exports.toUserCoordinate = toUserCoordinate;
exports.toUserExtent = toUserExtent;
exports.toUserResolution = toUserResolution;
exports.transform = transform;
exports.transformExtent = transformExtent;
exports.transformWithProjections = transformWithProjections;
exports.useGeographic = useGeographic;

var _Projection = _interopRequireDefault(require("./proj/Projection.js"));

var _Units = _interopRequireWildcard(require("./proj/Units.js"));

var _epsg = require("./proj/epsg3857.js");

var _epsg2 = require("./proj/epsg4326.js");

var _projections = require("./proj/projections.js");

var _transforms = require("./proj/transforms.js");

var _extent = require("./extent.js");

var _math = require("./math.js");

var _coordinate = require("./coordinate.js");

var _sphere = require("./sphere.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/proj
 */

/**
 * The ol/proj module stores:
 * * a list of {@link module:ol/proj/Projection~Projection}
 * objects, one for each projection supported by the application
 * * a list of transform functions needed to convert coordinates in one projection
 * into another.
 *
 * The static functions are the methods used to maintain these.
 * Each transform function can handle not only simple coordinate pairs, but also
 * large arrays of coordinates such as vector geometries.
 *
 * When loaded, the library adds projection objects for EPSG:4326 (WGS84
 * geographic coordinates) and EPSG:3857 (Web or Spherical Mercator, as used
 * for example by Bing Maps or OpenStreetMap), together with the relevant
 * transform functions.
 *
 * Additional transforms may be added by using the http://proj4js.org/
 * library (version 2.2 or later). You can use the full build supplied by
 * Proj4js, or create a custom build to support those projections you need; see
 * the Proj4js website for how to do this. You also need the Proj4js definitions
 * for the required projections. These definitions can be obtained from
 * https://epsg.io/, and are a JS function, so can be loaded in a script
 * tag (as in the examples) or pasted into your application.
 *
 * After all required projection definitions are added to proj4's registry (by
 * using `proj4.defs()`), simply call `register(proj4)` from the `ol/proj/proj4`
 * package. Existing transforms are not changed by this function. See
 * examples/wms-image-custom-proj for an example of this.
 *
 * Additional projection definitions can be registered with `proj4.defs()` any
 * time. Just make sure to call `register(proj4)` again; for example, with user-supplied data where you don't
 * know in advance what projections are needed, you can initially load minimal
 * support and then load whichever are requested.
 *
 * Note that Proj4js does not support projection extents. If you want to add
 * one for creating default tile grids, you can add it after the Projection
 * object has been created with `setExtent`, for example,
 * `get('EPSG:1234').setExtent(extent)`.
 *
 * In addition to Proj4js support, any transform functions can be added with
 * {@link module:ol/proj.addCoordinateTransforms}. To use this, you must first create
 * a {@link module:ol/proj/Projection~Projection} object for the new projection and add it with
 * {@link module:ol/proj.addProjection}. You can then add the forward and inverse
 * functions with {@link module:ol/proj.addCoordinateTransforms}. See
 * examples/wms-custom-proj for an example of this.
 *
 * Note that if no transforms are needed and you only need to define the
 * projection, just add a {@link module:ol/proj/Projection~Projection} with
 * {@link module:ol/proj.addProjection}. See examples/wms-no-proj for an example of
 * this.
 */

/**
 * A projection as {@link module:ol/proj/Projection~Projection}, SRS identifier
 * string or undefined.
 * @typedef {Projection|string|undefined} ProjectionLike
 * @api
 */

/**
 * A transform function accepts an array of input coordinate values, an optional
 * output array, and an optional dimension (default should be 2).  The function
 * transforms the input coordinate values, populates the output array, and
 * returns the output array.
 *
 * @typedef {function(Array<number>, Array<number>=, number=): Array<number>} TransformFunction
 * @api
 */
var showCoordinateWarning = true;
/**
 * @param {boolean} [opt_disable = true] Disable console info about `useGeographic()`
 */

function disableCoordinateWarning(opt_disable) {
  var hide = opt_disable === undefined ? true : opt_disable;
  showCoordinateWarning = !hide;
}
/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>} [opt_output] Output array of coordinate values.
 * @param {number} [opt_dimension] Dimension.
 * @return {Array<number>} Output coordinate array (new array, same coordinate
 *     values).
 */


function cloneTransform(input, opt_output, opt_dimension) {
  var output;

  if (opt_output !== undefined) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }

    output = opt_output;
  } else {
    output = input.slice();
  }

  return output;
}
/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>} [opt_output] Output array of coordinate values.
 * @param {number} [opt_dimension] Dimension.
 * @return {Array<number>} Input coordinate array (same array as input).
 */


function identityTransform(input, opt_output, opt_dimension) {
  if (opt_output !== undefined && input !== opt_output) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }

    input = opt_output;
  }

  return input;
}
/**
 * Add a Projection object to the list of supported projections that can be
 * looked up by their code.
 *
 * @param {Projection} projection Projection instance.
 * @api
 */


function addProjection(projection) {
  (0, _projections.add)(projection.getCode(), projection);
  (0, _transforms.add)(projection, projection, cloneTransform);
}
/**
 * @param {Array<Projection>} projections Projections.
 */


function addProjections(projections) {
  projections.forEach(addProjection);
}
/**
 * Fetches a Projection object for the code specified.
 *
 * @param {ProjectionLike} projectionLike Either a code string which is
 *     a combination of authority and identifier such as "EPSG:4326", or an
 *     existing projection object, or undefined.
 * @return {Projection|null} Projection object, or null if not in list.
 * @api
 */


function get(projectionLike) {
  return typeof projectionLike === 'string' ? (0, _projections.get)(
  /** @type {string} */
  projectionLike) :
  /** @type {Projection} */
  projectionLike || null;
}
/**
 * Get the resolution of the point in degrees or distance units.
 * For projections with degrees as the unit this will simply return the
 * provided resolution. For other projections the point resolution is
 * by default estimated by transforming the `point` pixel to EPSG:4326,
 * measuring its width and height on the normal sphere,
 * and taking the average of the width and height.
 * A custom function can be provided for a specific projection, either
 * by setting the `getPointResolution` option in the
 * {@link module:ol/proj/Projection~Projection} constructor or by using
 * {@link module:ol/proj/Projection~Projection#setGetPointResolution} to change an existing
 * projection object.
 * @param {ProjectionLike} projection The projection.
 * @param {number} resolution Nominal resolution in projection units.
 * @param {import("./coordinate.js").Coordinate} point Point to find adjusted resolution at.
 * @param {import("./proj/Units.js").default} [opt_units] Units to get the point resolution in.
 * Default is the projection's units.
 * @return {number} Point resolution.
 * @api
 */


function getPointResolution(projection, resolution, point, opt_units) {
  projection = get(projection);
  var pointResolution;
  var getter = projection.getPointResolutionFunc();

  if (getter) {
    pointResolution = getter(resolution, point);

    if (opt_units && opt_units !== projection.getUnits()) {
      var metersPerUnit = projection.getMetersPerUnit();

      if (metersPerUnit) {
        pointResolution = pointResolution * metersPerUnit / _Units.METERS_PER_UNIT[opt_units];
      }
    }
  } else {
    var units = projection.getUnits();

    if (units == _Units.default.DEGREES && !opt_units || opt_units == _Units.default.DEGREES) {
      pointResolution = resolution;
    } else {
      // Estimate point resolution by transforming the center pixel to EPSG:4326,
      // measuring its width and height on the normal sphere, and taking the
      // average of the width and height.
      var toEPSG4326_1 = getTransformFromProjections(projection, get('EPSG:4326'));

      if (toEPSG4326_1 === identityTransform && units !== _Units.default.DEGREES) {
        // no transform is available
        pointResolution = resolution * projection.getMetersPerUnit();
      } else {
        var vertices = [point[0] - resolution / 2, point[1], point[0] + resolution / 2, point[1], point[0], point[1] - resolution / 2, point[0], point[1] + resolution / 2];
        vertices = toEPSG4326_1(vertices, vertices, 2);
        var width = (0, _sphere.getDistance)(vertices.slice(0, 2), vertices.slice(2, 4));
        var height = (0, _sphere.getDistance)(vertices.slice(4, 6), vertices.slice(6, 8));
        pointResolution = (width + height) / 2;
      }

      var metersPerUnit = opt_units ? _Units.METERS_PER_UNIT[opt_units] : projection.getMetersPerUnit();

      if (metersPerUnit !== undefined) {
        pointResolution /= metersPerUnit;
      }
    }
  }

  return pointResolution;
}
/**
 * Registers transformation functions that don't alter coordinates. Those allow
 * to transform between projections with equal meaning.
 *
 * @param {Array<Projection>} projections Projections.
 * @api
 */


function addEquivalentProjections(projections) {
  addProjections(projections);
  projections.forEach(function (source) {
    projections.forEach(function (destination) {
      if (source !== destination) {
        (0, _transforms.add)(source, destination, cloneTransform);
      }
    });
  });
}
/**
 * Registers transformation functions to convert coordinates in any projection
 * in projection1 to any projection in projection2.
 *
 * @param {Array<Projection>} projections1 Projections with equal
 *     meaning.
 * @param {Array<Projection>} projections2 Projections with equal
 *     meaning.
 * @param {TransformFunction} forwardTransform Transformation from any
 *   projection in projection1 to any projection in projection2.
 * @param {TransformFunction} inverseTransform Transform from any projection
 *   in projection2 to any projection in projection1..
 */


function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
  projections1.forEach(function (projection1) {
    projections2.forEach(function (projection2) {
      (0, _transforms.add)(projection1, projection2, forwardTransform);
      (0, _transforms.add)(projection2, projection1, inverseTransform);
    });
  });
}
/**
 * Clear all cached projections and transforms.
 */


function clearAllProjections() {
  (0, _projections.clear)();
  (0, _transforms.clear)();
}
/**
 * @param {Projection|string|undefined} projection Projection.
 * @param {string} defaultCode Default code.
 * @return {Projection} Projection.
 */


function createProjection(projection, defaultCode) {
  if (!projection) {
    return get(defaultCode);
  } else if (typeof projection === 'string') {
    return get(projection);
  } else {
    return (
      /** @type {Projection} */
      projection
    );
  }
}
/**
 * Creates a {@link module:ol/proj~TransformFunction} from a simple 2D coordinate transform
 * function.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} coordTransform Coordinate
 *     transform.
 * @return {TransformFunction} Transform function.
 */


function createTransformFromCoordinateTransform(coordTransform) {
  return (
    /**
     * @param {Array<number>} input Input.
     * @param {Array<number>} [opt_output] Output.
     * @param {number} [opt_dimension] Dimension.
     * @return {Array<number>} Output.
     */
    function (input, opt_output, opt_dimension) {
      var length = input.length;
      var dimension = opt_dimension !== undefined ? opt_dimension : 2;
      var output = opt_output !== undefined ? opt_output : new Array(length);

      for (var i = 0; i < length; i += dimension) {
        var point = coordTransform([input[i], input[i + 1]]);
        output[i] = point[0];
        output[i + 1] = point[1];

        for (var j = dimension - 1; j >= 2; --j) {
          output[i + j] = input[i + j];
        }
      }

      return output;
    }
  );
}
/**
 * Registers coordinate transform functions to convert coordinates between the
 * source projection and the destination projection.
 * The forward and inverse functions convert coordinate pairs; this function
 * converts these into the functions used internally which also handle
 * extents and coordinate arrays.
 *
 * @param {ProjectionLike} source Source projection.
 * @param {ProjectionLike} destination Destination projection.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} forward The forward transform
 *     function (that is, from the source projection to the destination
 *     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
 *     the transformed {@link module:ol/coordinate~Coordinate}.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} inverse The inverse transform
 *     function (that is, from the destination projection to the source
 *     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
 *     the transformed {@link module:ol/coordinate~Coordinate}.
 * @api
 */


function addCoordinateTransforms(source, destination, forward, inverse) {
  var sourceProj = get(source);
  var destProj = get(destination);
  (0, _transforms.add)(sourceProj, destProj, createTransformFromCoordinateTransform(forward));
  (0, _transforms.add)(destProj, sourceProj, createTransformFromCoordinateTransform(inverse));
}
/**
 * Transforms a coordinate from longitude/latitude to a different projection.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate as longitude and latitude, i.e.
 *     an array with longitude as 1st and latitude as 2nd element.
 * @param {ProjectionLike} [opt_projection] Target projection. The
 *     default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {import("./coordinate.js").Coordinate} Coordinate projected to the target projection.
 * @api
 */


function fromLonLat(coordinate, opt_projection) {
  disableCoordinateWarning();
  return transform(coordinate, 'EPSG:4326', opt_projection !== undefined ? opt_projection : 'EPSG:3857');
}
/**
 * Transforms a coordinate to longitude/latitude.
 * @param {import("./coordinate.js").Coordinate} coordinate Projected coordinate.
 * @param {ProjectionLike} [opt_projection] Projection of the coordinate.
 *     The default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {import("./coordinate.js").Coordinate} Coordinate as longitude and latitude, i.e. an array
 *     with longitude as 1st and latitude as 2nd element.
 * @api
 */


function toLonLat(coordinate, opt_projection) {
  var lonLat = transform(coordinate, opt_projection !== undefined ? opt_projection : 'EPSG:3857', 'EPSG:4326');
  var lon = lonLat[0];

  if (lon < -180 || lon > 180) {
    lonLat[0] = (0, _math.modulo)(lon + 180, 360) - 180;
  }

  return lonLat;
}
/**
 * Checks if two projections are the same, that is every coordinate in one
 * projection does represent the same geographic point as the same coordinate in
 * the other projection.
 *
 * @param {Projection} projection1 Projection 1.
 * @param {Projection} projection2 Projection 2.
 * @return {boolean} Equivalent.
 * @api
 */


function equivalent(projection1, projection2) {
  if (projection1 === projection2) {
    return true;
  }

  var equalUnits = projection1.getUnits() === projection2.getUnits();

  if (projection1.getCode() === projection2.getCode()) {
    return equalUnits;
  } else {
    var transformFunc = getTransformFromProjections(projection1, projection2);
    return transformFunc === cloneTransform && equalUnits;
  }
}
/**
 * Searches in the list of transform functions for the function for converting
 * coordinates from the source projection to the destination projection.
 *
 * @param {Projection} sourceProjection Source Projection object.
 * @param {Projection} destinationProjection Destination Projection
 *     object.
 * @return {TransformFunction} Transform function.
 */


function getTransformFromProjections(sourceProjection, destinationProjection) {
  var sourceCode = sourceProjection.getCode();
  var destinationCode = destinationProjection.getCode();
  var transformFunc = (0, _transforms.get)(sourceCode, destinationCode);

  if (!transformFunc) {
    transformFunc = identityTransform;
  }

  return transformFunc;
}
/**
 * Given the projection-like objects, searches for a transformation
 * function to convert a coordinates array from the source projection to the
 * destination projection.
 *
 * @param {ProjectionLike} source Source.
 * @param {ProjectionLike} destination Destination.
 * @return {TransformFunction} Transform function.
 * @api
 */


function getTransform(source, destination) {
  var sourceProjection = get(source);
  var destinationProjection = get(destination);
  return getTransformFromProjections(sourceProjection, destinationProjection);
}
/**
 * Transforms a coordinate from source projection to destination projection.
 * This returns a new coordinate (and does not modify the original).
 *
 * See {@link module:ol/proj.transformExtent} for extent transformation.
 * See the transform method of {@link module:ol/geom/Geometry~Geometry} and its
 * subclasses for geometry transforms.
 *
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {ProjectionLike} source Source projection-like.
 * @param {ProjectionLike} destination Destination projection-like.
 * @return {import("./coordinate.js").Coordinate} Coordinate.
 * @api
 */


function transform(coordinate, source, destination) {
  var transformFunc = getTransform(source, destination);
  return transformFunc(coordinate, undefined, coordinate.length);
}
/**
 * Transforms an extent from source projection to destination projection.  This
 * returns a new extent (and does not modify the original).
 *
 * @param {import("./extent.js").Extent} extent The extent to transform.
 * @param {ProjectionLike} source Source projection-like.
 * @param {ProjectionLike} destination Destination projection-like.
 * @param {number} [opt_stops] Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {import("./extent.js").Extent} The transformed extent.
 * @api
 */


function transformExtent(extent, source, destination, opt_stops) {
  var transformFunc = getTransform(source, destination);
  return (0, _extent.applyTransform)(extent, transformFunc, undefined, opt_stops);
}
/**
 * Transforms the given point to the destination projection.
 *
 * @param {import("./coordinate.js").Coordinate} point Point.
 * @param {Projection} sourceProjection Source projection.
 * @param {Projection} destinationProjection Destination projection.
 * @return {import("./coordinate.js").Coordinate} Point.
 */


function transformWithProjections(point, sourceProjection, destinationProjection) {
  var transformFunc = getTransformFromProjections(sourceProjection, destinationProjection);
  return transformFunc(point);
}
/**
 * @type {Projection|null}
 */


var userProjection = null;
/**
 * Set the projection for coordinates supplied from and returned by API methods.
 * This includes all API methods except for those interacting with tile grids.
 * @param {ProjectionLike} projection The user projection.
 * @api
 */

function setUserProjection(projection) {
  userProjection = get(projection);
}
/**
 * Clear the user projection if set.
 * @api
 */


function clearUserProjection() {
  userProjection = null;
}
/**
 * Get the projection for coordinates supplied from and returned by API methods.
 * Note that this method is not yet a part of the stable API.  Support for user
 * projections is not yet complete and should be considered experimental.
 * @return {Projection|null} The user projection (or null if not set).
 * @api
 */


function getUserProjection() {
  return userProjection;
}
/**
 * Use geographic coordinates (WGS-84 datum) in API methods.  This includes all API
 * methods except for those interacting with tile grids.
 * @api
 */


function useGeographic() {
  setUserProjection('EPSG:4326');
}
/**
 * Return a coordinate transformed into the user projection.  If no user projection
 * is set, the original coordinate is returned.
 * @param {Array<number>} coordinate Input coordinate.
 * @param {ProjectionLike} sourceProjection The input coordinate projection.
 * @return {Array<number>} The input coordinate in the user projection.
 */


function toUserCoordinate(coordinate, sourceProjection) {
  if (!userProjection) {
    return coordinate;
  }

  return transform(coordinate, sourceProjection, userProjection);
}
/**
 * Return a coordinate transformed from the user projection.  If no user projection
 * is set, the original coordinate is returned.
 * @param {Array<number>} coordinate Input coordinate.
 * @param {ProjectionLike} destProjection The destination projection.
 * @return {Array<number>} The input coordinate transformed.
 */


function fromUserCoordinate(coordinate, destProjection) {
  if (!userProjection) {
    if (showCoordinateWarning && !(0, _coordinate.equals)(coordinate, [0, 0]) && coordinate[0] >= -180 && coordinate[0] <= 180 && coordinate[1] >= -90 && coordinate[1] <= 90) {
      showCoordinateWarning = false; // eslint-disable-next-line no-console

      console.warn('Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.');
    }

    return coordinate;
  }

  return transform(coordinate, userProjection, destProjection);
}
/**
 * Return an extent transformed into the user projection.  If no user projection
 * is set, the original extent is returned.
 * @param {import("./extent.js").Extent} extent Input extent.
 * @param {ProjectionLike} sourceProjection The input extent projection.
 * @return {import("./extent.js").Extent} The input extent in the user projection.
 */


function toUserExtent(extent, sourceProjection) {
  if (!userProjection) {
    return extent;
  }

  return transformExtent(extent, sourceProjection, userProjection);
}
/**
 * Return an extent transformed from the user projection.  If no user projection
 * is set, the original extent is returned.
 * @param {import("./extent.js").Extent} extent Input extent.
 * @param {ProjectionLike} destProjection The destination projection.
 * @return {import("./extent.js").Extent} The input extent transformed.
 */


function fromUserExtent(extent, destProjection) {
  if (!userProjection) {
    return extent;
  }

  return transformExtent(extent, userProjection, destProjection);
}
/**
 * Return the resolution in user projection units per pixel. If no user projection
 * is set, or source or user projection are missing units, the original resolution
 * is returned.
 * @param {number} resolution Resolution in input projection units per pixel.
 * @param {ProjectionLike} sourceProjection The input projection.
 * @return {number} Resolution in user projection units per pixel.
 */


function toUserResolution(resolution, sourceProjection) {
  if (!userProjection) {
    return resolution;
  }

  var sourceUnits = get(sourceProjection).getUnits();
  var userUnits = userProjection.getUnits();
  return sourceUnits && userUnits ? resolution * _Units.METERS_PER_UNIT[sourceUnits] / _Units.METERS_PER_UNIT[userUnits] : resolution;
}
/**
 * Return the resolution in user projection units per pixel. If no user projection
 * is set, or source or user projection are missing units, the original resolution
 * is returned.
 * @param {number} resolution Resolution in user projection units per pixel.
 * @param {ProjectionLike} destProjection The destination projection.
 * @return {number} Resolution in destination projection units per pixel.
 */


function fromUserResolution(resolution, destProjection) {
  if (!userProjection) {
    return resolution;
  }

  var sourceUnits = get(destProjection).getUnits();
  var userUnits = userProjection.getUnits();
  return sourceUnits && userUnits ? resolution * _Units.METERS_PER_UNIT[userUnits] / _Units.METERS_PER_UNIT[sourceUnits] : resolution;
}
/**
 * Creates a safe coordinate transform function from a coordinate transform function.
 * "Safe" means that it can handle wrapping of x-coordinates for global projections,
 * and that coordinates exceeding the source projection validity extent's range will be
 * clamped to the validity range.
 * @param {Projection} sourceProj Source projection.
 * @param {Projection} destProj Destination projection.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} transform Transform function (source to destiation).
 * @return {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} Safe transform function (source to destiation).
 */


function createSafeCoordinateTransform(sourceProj, destProj, transform) {
  return function (coord) {
    var sourceX = coord[0];
    var sourceY = coord[1];
    var transformed, worldsAway;

    if (sourceProj.canWrapX()) {
      var sourceExtent = sourceProj.getExtent();
      var sourceExtentWidth = (0, _extent.getWidth)(sourceExtent);
      worldsAway = (0, _coordinate.getWorldsAway)(coord, sourceProj, sourceExtentWidth);

      if (worldsAway) {
        // Move x to the real world
        sourceX = sourceX - worldsAway * sourceExtentWidth;
      }

      sourceX = (0, _math.clamp)(sourceX, sourceExtent[0], sourceExtent[2]);
      sourceY = (0, _math.clamp)(sourceY, sourceExtent[1], sourceExtent[3]);
      transformed = transform([sourceX, sourceY]);
    } else {
      transformed = transform(coord);
    }

    if (worldsAway && destProj.canWrapX()) {
      // Move transformed coordinate back to the offset world
      transformed[0] += worldsAway * (0, _extent.getWidth)(destProj.getExtent());
    }

    return transformed;
  };
}
/**
 * Add transforms to and from EPSG:4326 and EPSG:3857.  This function is called
 * by when this module is executed and should only need to be called again after
 * `clearAllProjections()` is called (e.g. in tests).
 */


function addCommon() {
  // Add transformations that don't alter coordinates to convert within set of
  // projections with equal meaning.
  addEquivalentProjections(_epsg.PROJECTIONS);
  addEquivalentProjections(_epsg2.PROJECTIONS); // Add transformations to convert EPSG:4326 like coordinates to EPSG:3857 like
  // coordinates and back.

  addEquivalentTransforms(_epsg2.PROJECTIONS, _epsg.PROJECTIONS, _epsg.fromEPSG4326, _epsg.toEPSG4326);
}

addCommon();
},{"./proj/Projection.js":"node_modules/ol/proj/Projection.js","./proj/Units.js":"node_modules/ol/proj/Units.js","./proj/epsg3857.js":"node_modules/ol/proj/epsg3857.js","./proj/epsg4326.js":"node_modules/ol/proj/epsg4326.js","./proj/projections.js":"node_modules/ol/proj/projections.js","./proj/transforms.js":"node_modules/ol/proj/transforms.js","./extent.js":"node_modules/ol/extent.js","./math.js":"node_modules/ol/math.js","./coordinate.js":"node_modules/ol/coordinate.js","./sphere.js":"node_modules/ol/sphere.js"}],"node_modules/ol/control/MousePosition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Control = _interopRequireDefault(require("./Control.js"));

var _EventType = _interopRequireDefault(require("../pointer/EventType.js"));

var _proj = require("../proj.js");

var _events = require("../events.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/control/MousePosition
 */
var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 * @type {string}
 */
var PROJECTION = 'projection';
/**
 * @type {string}
 */

var COORDINATE_FORMAT = 'coordinateFormat';
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:coordinateFormat'|'change:projection', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:coordinateFormat'|'change:projection', Return>} MousePositionOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-mouse-position'] CSS class name.
 * @property {import("../coordinate.js").CoordinateFormat} [coordinateFormat] Coordinate format.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the
 * control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want the
 * control to be rendered outside of the map's viewport.
 * @property {string|boolean} [placeholder] Markup to show when the mouse position is not
 * available (e.g. when the pointer leaves the map viewport).  By default, a non-breaking space
 * is rendered when the mouse leaves the viewport.  To render something else, provide a string
 * to be used as the text content (e.g. 'no position' or '' for an empty string).  Set the placeholder
 * to `false` to retain the last position when the mouse leaves the viewport.  In a future release, this
 * will be the default behavior.
 * @property {string} [undefinedHTML='&#160;'] This option is deprecated.  Use the `placeholder` option instead.
 */

/**
 * @classdesc
 * A control to show the 2D coordinates of the mouse cursor. By default, these
 * are in the view projection, but can be in any supported projection.
 * By default the control is shown in the top right corner of the map, but this
 * can be changed by using the css selector `.ol-mouse-position`.
 *
 * On touch devices, which usually do not have a mouse cursor, the coordinates
 * of the currently touched position are shown.
 *
 * @api
 */

var MousePosition =
/** @class */
function (_super) {
  __extends(MousePosition, _super);
  /**
   * @param {Options} [opt_options] Mouse position options.
   */


  function MousePosition(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var element = document.createElement('div');
    element.className = options.className !== undefined ? options.className : 'ol-mouse-position';
    _this = _super.call(this, {
      element: element,
      render: options.render,
      target: options.target
    }) || this;
    /***
     * @type {MousePositionOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {MousePositionOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {MousePositionOnSignature<void>}
     */

    _this.un;

    _this.addChangeListener(PROJECTION, _this.handleProjectionChanged_);

    if (options.coordinateFormat) {
      _this.setCoordinateFormat(options.coordinateFormat);
    }

    if (options.projection) {
      _this.setProjection(options.projection);
    }
    /**
     * Change this to `false` when removing the deprecated `undefinedHTML` option.
     * @type {boolean}
     */


    var renderOnMouseOut = true;
    /**
     * @type {string}
     */

    var placeholder = '&#160;';

    if ('undefinedHTML' in options) {
      // deprecated behavior
      if (options.undefinedHTML !== undefined) {
        placeholder = options.undefinedHTML;
      }

      renderOnMouseOut = !!placeholder;
    } else if ('placeholder' in options) {
      if (options.placeholder === false) {
        renderOnMouseOut = false;
      } else {
        placeholder = String(options.placeholder);
      }
    }
    /**
     * @private
     * @type {string}
     */


    _this.placeholder_ = placeholder;
    /**
     * @private
     * @type {boolean}
     */

    _this.renderOnMouseOut_ = renderOnMouseOut;
    /**
     * @private
     * @type {string}
     */

    _this.renderedHTML_ = element.innerHTML;
    /**
     * @private
     * @type {?import("../proj/Projection.js").default}
     */

    _this.mapProjection_ = null;
    /**
     * @private
     * @type {?import("../proj.js").TransformFunction}
     */

    _this.transform_ = null;
    return _this;
  }
  /**
   * @private
   */


  MousePosition.prototype.handleProjectionChanged_ = function () {
    this.transform_ = null;
  };
  /**
   * Return the coordinate format type used to render the current position or
   * undefined.
   * @return {import("../coordinate.js").CoordinateFormat|undefined} The format to render the current
   *     position in.
   * @observable
   * @api
   */


  MousePosition.prototype.getCoordinateFormat = function () {
    return (
      /** @type {import("../coordinate.js").CoordinateFormat|undefined} */
      this.get(COORDINATE_FORMAT)
    );
  };
  /**
   * Return the projection that is used to report the mouse position.
   * @return {import("../proj/Projection.js").default|undefined} The projection to report mouse
   *     position in.
   * @observable
   * @api
   */


  MousePosition.prototype.getProjection = function () {
    return (
      /** @type {import("../proj/Projection.js").default|undefined} */
      this.get(PROJECTION)
    );
  };
  /**
   * @param {MouseEvent} event Browser event.
   * @protected
   */


  MousePosition.prototype.handleMouseMove = function (event) {
    var map = this.getMap();
    this.updateHTML_(map.getEventPixel(event));
  };
  /**
   * @param {Event} event Browser event.
   * @protected
   */


  MousePosition.prototype.handleMouseOut = function (event) {
    this.updateHTML_(null);
  };
  /**
   * Remove the control from its current map and attach it to the new map.
   * Pass `null` to just remove the control from the current map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../PluggableMap.js").default|null} map Map.
   * @api
   */


  MousePosition.prototype.setMap = function (map) {
    _super.prototype.setMap.call(this, map);

    if (map) {
      var viewport = map.getViewport();
      this.listenerKeys.push((0, _events.listen)(viewport, _EventType.default.POINTERMOVE, this.handleMouseMove, this));

      if (this.renderOnMouseOut_) {
        this.listenerKeys.push((0, _events.listen)(viewport, _EventType.default.POINTEROUT, this.handleMouseOut, this));
      }

      this.updateHTML_(null);
    }
  };
  /**
   * Set the coordinate format type used to render the current position.
   * @param {import("../coordinate.js").CoordinateFormat} format The format to render the current
   *     position in.
   * @observable
   * @api
   */


  MousePosition.prototype.setCoordinateFormat = function (format) {
    this.set(COORDINATE_FORMAT, format);
  };
  /**
   * Set the projection that is used to report the mouse position.
   * @param {import("../proj.js").ProjectionLike} projection The projection to report mouse
   *     position in.
   * @observable
   * @api
   */


  MousePosition.prototype.setProjection = function (projection) {
    this.set(PROJECTION, (0, _proj.get)(projection));
  };
  /**
   * @param {?import("../pixel.js").Pixel} pixel Pixel.
   * @private
   */


  MousePosition.prototype.updateHTML_ = function (pixel) {
    var html = this.placeholder_;

    if (pixel && this.mapProjection_) {
      if (!this.transform_) {
        var projection = this.getProjection();

        if (projection) {
          this.transform_ = (0, _proj.getTransformFromProjections)(this.mapProjection_, projection);
        } else {
          this.transform_ = _proj.identityTransform;
        }
      }

      var map = this.getMap();
      var coordinate = map.getCoordinateFromPixelInternal(pixel);

      if (coordinate) {
        var userProjection = (0, _proj.getUserProjection)();

        if (userProjection) {
          this.transform_ = (0, _proj.getTransformFromProjections)(this.mapProjection_, userProjection);
        }

        this.transform_(coordinate, coordinate);
        var coordinateFormat = this.getCoordinateFormat();

        if (coordinateFormat) {
          html = coordinateFormat(coordinate);
        } else {
          html = coordinate.toString();
        }
      }
    }

    if (!this.renderedHTML_ || html !== this.renderedHTML_) {
      this.element.innerHTML = html;
      this.renderedHTML_ = html;
    }
  };
  /**
   * Update the projection. Rendering of the coordinates is done in
   * `handleMouseMove` and `handleMouseUp`.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */


  MousePosition.prototype.render = function (mapEvent) {
    var frameState = mapEvent.frameState;

    if (!frameState) {
      this.mapProjection_ = null;
    } else {
      if (this.mapProjection_ != frameState.viewState.projection) {
        this.mapProjection_ = frameState.viewState.projection;
        this.transform_ = null;
      }
    }
  };

  return MousePosition;
}(_Control.default);

var _default = MousePosition;
exports.default = _default;
},{"./Control.js":"node_modules/ol/control/Control.js","../pointer/EventType.js":"node_modules/ol/pointer/EventType.js","../proj.js":"node_modules/ol/proj.js","../events.js":"node_modules/ol/events.js"}],"Scripts/Coordinates.js":[function(require,module,exports) {
"use strict";

var _MousePosition = _interopRequireDefault(require("ol/control/MousePosition"));

var _coordinate = require("ol/coordinate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = $("#map").data("map");
var mousePosition = new _MousePosition.default({
  coordinateFormat: (0, _coordinate.createStringXY)(5),
  className: "badge-pill badge-warning",
  target: "coordinates"
});
map.addControl(mousePosition);
},{"ol/control/MousePosition":"node_modules/ol/control/MousePosition.js","ol/coordinate":"node_modules/ol/coordinate.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56533" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Scripts/Coordinates.js"], null)
//# sourceMappingURL=/Coordinates.5e8c21ea.js.map