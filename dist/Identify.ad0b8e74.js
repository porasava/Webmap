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
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/ol/ol.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/ol/events/Event.js":[function(require,module,exports) {
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
},{}],"node_modules/ol/OverlayPositioning.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/OverlayPositioning
 */

/**
 * Overlay position: `'bottom-left'`, `'bottom-center'`,  `'bottom-right'`,
 * `'center-left'`, `'center-center'`, `'center-right'`, `'top-left'`,
 * `'top-center'`, `'top-right'`
 * @enum {string}
 */
var _default = {
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
  CENTER_LEFT: 'center-left',
  CENTER_CENTER: 'center-center',
  CENTER_RIGHT: 'center-right',
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right'
};
exports.default = _default;
},{}],"node_modules/ol/css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLASS_UNSUPPORTED = exports.CLASS_UNSELECTABLE = exports.CLASS_SELECTABLE = exports.CLASS_HIDDEN = exports.CLASS_CONTROL = exports.CLASS_COLLAPSED = void 0;
exports.cssOpacity = cssOpacity;
exports.getFontParameters = void 0;

/**
 * @module ol/css
 */

/**
 * @typedef {Object} FontParameters
 * @property {string} style Style.
 * @property {string} variant Variant.
 * @property {string} weight Weight.
 * @property {string} size Size.
 * @property {string} lineHeight LineHeight.
 * @property {string} family Family.
 * @property {Array<string>} families Families.
 */

/**
 * The CSS class for hidden feature.
 *
 * @const
 * @type {string}
 */
var CLASS_HIDDEN = 'ol-hidden';
/**
 * The CSS class that we'll give the DOM elements to have them selectable.
 *
 * @const
 * @type {string}
 */

exports.CLASS_HIDDEN = CLASS_HIDDEN;
var CLASS_SELECTABLE = 'ol-selectable';
/**
 * The CSS class that we'll give the DOM elements to have them unselectable.
 *
 * @const
 * @type {string}
 */

exports.CLASS_SELECTABLE = CLASS_SELECTABLE;
var CLASS_UNSELECTABLE = 'ol-unselectable';
/**
 * The CSS class for unsupported feature.
 *
 * @const
 * @type {string}
 */

exports.CLASS_UNSELECTABLE = CLASS_UNSELECTABLE;
var CLASS_UNSUPPORTED = 'ol-unsupported';
/**
 * The CSS class for controls.
 *
 * @const
 * @type {string}
 */

exports.CLASS_UNSUPPORTED = CLASS_UNSUPPORTED;
var CLASS_CONTROL = 'ol-control';
/**
 * The CSS class that we'll give the DOM elements that are collapsed, i.e.
 * to those elements which usually can be expanded.
 *
 * @const
 * @type {string}
 */

exports.CLASS_CONTROL = CLASS_CONTROL;
var CLASS_COLLAPSED = 'ol-collapsed';
/**
 * From https://stackoverflow.com/questions/10135697/regex-to-parse-any-css-font
 * @type {RegExp}
 */

exports.CLASS_COLLAPSED = CLASS_COLLAPSED;
var fontRegEx = new RegExp(['^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)', '(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)', '(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)', '(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?', '(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))', '(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))', '?\\s*([-,\\"\\\'\\sa-z]+?)\\s*$'].join(''), 'i');
var fontRegExMatchIndex = ['style', 'variant', 'weight', 'size', 'lineHeight', 'family'];
/**
 * Get the list of font families from a font spec.  Note that this doesn't work
 * for font families that have commas in them.
 * @param {string} fontSpec The CSS font property.
 * @return {FontParameters|null} The font parameters (or null if the input spec is invalid).
 */

var getFontParameters = function (fontSpec) {
  var match = fontSpec.match(fontRegEx);

  if (!match) {
    return null;
  }

  var style =
  /** @type {FontParameters} */
  {
    lineHeight: 'normal',
    size: '1.2em',
    style: 'normal',
    weight: 'normal',
    variant: 'normal'
  };

  for (var i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
    var value = match[i + 1];

    if (value !== undefined) {
      style[fontRegExMatchIndex[i]] = value;
    }
  }

  style.families = style.family.split(/,\s?/);
  return style;
};
/**
 * @param {number} opacity Opacity (0..1).
 * @return {string} CSS opacity.
 */


exports.getFontParameters = getFontParameters;

function cssOpacity(opacity) {
  return opacity === 1 ? '' : String(Math.round(opacity * 100) / 100);
}
},{}],"node_modules/ol/extent/Corner.js":[function(require,module,exports) {
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
},{"./extent/Corner.js":"node_modules/ol/extent/Corner.js","./extent/Relationship.js":"node_modules/ol/extent/Relationship.js","./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/has.js":[function(require,module,exports) {
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
},{"./has.js":"node_modules/ol/has.js"}],"node_modules/ol/Overlay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Object = _interopRequireDefault(require("./Object.js"));

var _MapEventType = _interopRequireDefault(require("./MapEventType.js"));

var _OverlayPositioning = _interopRequireDefault(require("./OverlayPositioning.js"));

var _css = require("./css.js");

var _extent = require("./extent.js");

var _events = require("./events.js");

var _dom = require("./dom.js");

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
 * @module ol/Overlay
 */


/**
 * @typedef {Object} Options
 * @property {number|string} [id] Set the overlay id. The overlay id can be used
 * with the {@link module:ol/Map~Map#getOverlayById} method.
 * @property {HTMLElement} [element] The overlay element.
 * @property {Array<number>} [offset=[0, 0]] Offsets in pixels used when positioning
 * the overlay. The first element in the
 * array is the horizontal offset. A positive value shifts the overlay right.
 * The second element in the array is the vertical offset. A positive value
 * shifts the overlay down.
 * @property {import("./coordinate.js").Coordinate} [position] The overlay position
 * in map projection.
 * @property {import("./OverlayPositioning.js").default} [positioning='top-left'] Defines how
 * the overlay is actually positioned with respect to its `position` property.
 * Possible values are `'bottom-left'`, `'bottom-center'`, `'bottom-right'`,
 * `'center-left'`, `'center-center'`, `'center-right'`, `'top-left'`,
 * `'top-center'`, and `'top-right'`.
 * @property {boolean} [stopEvent=true] Whether event propagation to the map
 * viewport should be stopped. If `true` the overlay is placed in the same
 * container as that of the controls (CSS class name
 * `ol-overlaycontainer-stopevent`); if `false` it is placed in the container
 * with CSS class name specified by the `className` property.
 * @property {boolean} [insertFirst=true] Whether the overlay is inserted first
 * in the overlay container, or appended. If the overlay is placed in the same
 * container as that of the controls (see the `stopEvent` option) you will
 * probably set `insertFirst` to `true` so the overlay is displayed below the
 * controls.
 * @property {PanIntoViewOptions|boolean} [autoPan=false] Pan the map when calling
 * `setPosition`, so that the overlay is entirely visible in the current viewport?
 * If `true` (deprecated), then `autoPanAnimation` and `autoPanMargin` will be
 * used to determine the panning parameters; if an object is supplied then other
 * parameters are ignored.
 * @property {PanOptions} [autoPanAnimation] The animation options used to pan
 * the overlay into view. This animation is only used when `autoPan` is enabled.
 * A `duration` and `easing` may be provided to customize the animation.
 * Deprecated and ignored if `autoPan` is supplied as an object.
 * @property {number} [autoPanMargin=20] The margin (in pixels) between the
 * overlay and the borders of the map when autopanning. Deprecated and ignored
 * if `autoPan` is supplied as an object.
 * @property {PanIntoViewOptions} [autoPanOptions] The options to use for the
 * autoPan. This is only used when `autoPan` is enabled and has preference over
 * the individual `autoPanMargin` and `autoPanOptions`.
 * @property {string} [className='ol-overlay-container ol-selectable'] CSS class
 * name.
 */

/**
 * @typedef {Object} PanOptions
 * @property {number} [duration=1000] The duration of the animation in
 * milliseconds.
 * @property {function(number):number} [easing] The easing function to use. Can
 * be one from {@link module:ol/easing} or a custom function.
 * Default is {@link module:ol/easing.inAndOut}.
 */

/**
 * @typedef {Object} PanIntoViewOptions
 * @property {PanOptions} [animation={}] The animation parameters for the pan
 * @property {number} [margin=20] The margin (in pixels) between the
 * overlay and the borders of the map when panning into view.
 */

/**
 * @enum {string}
 * @protected
 */
var Property = {
  ELEMENT: 'element',
  MAP: 'map',
  OFFSET: 'offset',
  POSITION: 'position',
  POSITIONING: 'positioning'
};
/**
 * @typedef {import("./ObjectEventType").Types|'change:element'|'change:map'|'change:offset'|'change:position'|
 *   'change:positioning'} OverlayObjectEventTypes
 */

/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<OverlayObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|OverlayObjectEventTypes, Return>} OverlayOnSignature
 */

/**
 * @classdesc
 * An element to be displayed over the map and attached to a single map
 * location.  Like {@link module:ol/control/Control~Control}, Overlays are
 * visible widgets. Unlike Controls, they are not in a fixed position on the
 * screen, but are tied to a geographical coordinate, so panning the map will
 * move an Overlay but not a Control.
 *
 * Example:
 *
 *     import Overlay from 'ol/Overlay';
 *
 *     var popup = new Overlay({
 *       element: document.getElementById('popup')
 *     });
 *     popup.setPosition(coordinate);
 *     map.addOverlay(popup);
 *
 * @api
 */

var Overlay =
/** @class */
function (_super) {
  __extends(Overlay, _super);
  /**
   * @param {Options} options Overlay options.
   */


  function Overlay(options) {
    var _this = _super.call(this) || this;
    /***
     * @type {OverlayOnSignature<import("./events").EventsKey>}
     */


    _this.on;
    /***
     * @type {OverlayOnSignature<import("./events").EventsKey>}
     */

    _this.once;
    /***
     * @type {OverlayOnSignature<void>}
     */

    _this.un;
    /**
     * @protected
     * @type {Options}
     */

    _this.options = options;
    /**
     * @protected
     * @type {number|string|undefined}
     */

    _this.id = options.id;
    /**
     * @protected
     * @type {boolean}
     */

    _this.insertFirst = options.insertFirst !== undefined ? options.insertFirst : true;
    /**
     * @protected
     * @type {boolean}
     */

    _this.stopEvent = options.stopEvent !== undefined ? options.stopEvent : true;
    /**
     * @protected
     * @type {HTMLElement}
     */

    _this.element = document.createElement('div');
    _this.element.className = options.className !== undefined ? options.className : 'ol-overlay-container ' + _css.CLASS_SELECTABLE;
    _this.element.style.position = 'absolute';
    _this.element.style.pointerEvents = 'auto';
    var autoPan = options.autoPan;

    if (autoPan && 'object' !== typeof autoPan) {
      autoPan = {
        animation: options.autoPanAnimation,
        margin: options.autoPanMargin
      };
    }
    /**
     * @protected
     * @type {PanIntoViewOptions|false}
     */


    _this.autoPan =
    /** @type {PanIntoViewOptions} */
    autoPan || false;
    /**
     * @protected
     * @type {{transform_: string,
     *         visible: boolean}}
     */

    _this.rendered = {
      transform_: '',
      visible: true
    };
    /**
     * @protected
     * @type {?import("./events.js").EventsKey}
     */

    _this.mapPostrenderListenerKey = null;

    _this.addChangeListener(Property.ELEMENT, _this.handleElementChanged);

    _this.addChangeListener(Property.MAP, _this.handleMapChanged);

    _this.addChangeListener(Property.OFFSET, _this.handleOffsetChanged);

    _this.addChangeListener(Property.POSITION, _this.handlePositionChanged);

    _this.addChangeListener(Property.POSITIONING, _this.handlePositioningChanged);

    if (options.element !== undefined) {
      _this.setElement(options.element);
    }

    _this.setOffset(options.offset !== undefined ? options.offset : [0, 0]);

    _this.setPositioning(options.positioning !== undefined ?
    /** @type {import("./OverlayPositioning.js").default} */
    options.positioning : _OverlayPositioning.default.TOP_LEFT);

    if (options.position !== undefined) {
      _this.setPosition(options.position);
    }

    return _this;
  }
  /**
   * Get the DOM element of this overlay.
   * @return {HTMLElement|undefined} The Element containing the overlay.
   * @observable
   * @api
   */


  Overlay.prototype.getElement = function () {
    return (
      /** @type {HTMLElement|undefined} */
      this.get(Property.ELEMENT)
    );
  };
  /**
   * Get the overlay identifier which is set on constructor.
   * @return {number|string|undefined} Id.
   * @api
   */


  Overlay.prototype.getId = function () {
    return this.id;
  };
  /**
   * Get the map associated with this overlay.
   * @return {import("./PluggableMap.js").default|null} The map that the
   * overlay is part of.
   * @observable
   * @api
   */


  Overlay.prototype.getMap = function () {
    return (
      /** @type {import("./PluggableMap.js").default|null} */
      this.get(Property.MAP) || null
    );
  };
  /**
   * Get the offset of this overlay.
   * @return {Array<number>} The offset.
   * @observable
   * @api
   */


  Overlay.prototype.getOffset = function () {
    return (
      /** @type {Array<number>} */
      this.get(Property.OFFSET)
    );
  };
  /**
   * Get the current position of this overlay.
   * @return {import("./coordinate.js").Coordinate|undefined} The spatial point that the overlay is
   *     anchored at.
   * @observable
   * @api
   */


  Overlay.prototype.getPosition = function () {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(Property.POSITION)
    );
  };
  /**
   * Get the current positioning of this overlay.
   * @return {import("./OverlayPositioning.js").default} How the overlay is positioned
   *     relative to its point on the map.
   * @observable
   * @api
   */


  Overlay.prototype.getPositioning = function () {
    return (
      /** @type {import("./OverlayPositioning.js").default} */
      this.get(Property.POSITIONING)
    );
  };
  /**
   * @protected
   */


  Overlay.prototype.handleElementChanged = function () {
    (0, _dom.removeChildren)(this.element);
    var element = this.getElement();

    if (element) {
      this.element.appendChild(element);
    }
  };
  /**
   * @protected
   */


  Overlay.prototype.handleMapChanged = function () {
    if (this.mapPostrenderListenerKey) {
      (0, _dom.removeNode)(this.element);
      (0, _events.unlistenByKey)(this.mapPostrenderListenerKey);
      this.mapPostrenderListenerKey = null;
    }

    var map = this.getMap();

    if (map) {
      this.mapPostrenderListenerKey = (0, _events.listen)(map, _MapEventType.default.POSTRENDER, this.render, this);
      this.updatePixelPosition();
      var container = this.stopEvent ? map.getOverlayContainerStopEvent() : map.getOverlayContainer();

      if (this.insertFirst) {
        container.insertBefore(this.element, container.childNodes[0] || null);
      } else {
        container.appendChild(this.element);
      }

      this.performAutoPan();
    }
  };
  /**
   * @protected
   */


  Overlay.prototype.render = function () {
    this.updatePixelPosition();
  };
  /**
   * @protected
   */


  Overlay.prototype.handleOffsetChanged = function () {
    this.updatePixelPosition();
  };
  /**
   * @protected
   */


  Overlay.prototype.handlePositionChanged = function () {
    this.updatePixelPosition();
    this.performAutoPan();
  };
  /**
   * @protected
   */


  Overlay.prototype.handlePositioningChanged = function () {
    this.updatePixelPosition();
  };
  /**
   * Set the DOM element to be associated with this overlay.
   * @param {HTMLElement|undefined} element The Element containing the overlay.
   * @observable
   * @api
   */


  Overlay.prototype.setElement = function (element) {
    this.set(Property.ELEMENT, element);
  };
  /**
   * Set the map to be associated with this overlay.
   * @param {import("./PluggableMap.js").default|null} map The map that the
   * overlay is part of. Pass `null` to just remove the overlay from the current map.
   * @observable
   * @api
   */


  Overlay.prototype.setMap = function (map) {
    this.set(Property.MAP, map);
  };
  /**
   * Set the offset for this overlay.
   * @param {Array<number>} offset Offset.
   * @observable
   * @api
   */


  Overlay.prototype.setOffset = function (offset) {
    this.set(Property.OFFSET, offset);
  };
  /**
   * Set the position for this overlay. If the position is `undefined` the
   * overlay is hidden.
   * @param {import("./coordinate.js").Coordinate|undefined} position The spatial point that the overlay
   *     is anchored at.
   * @observable
   * @api
   */


  Overlay.prototype.setPosition = function (position) {
    this.set(Property.POSITION, position);
  };
  /**
   * Pan the map so that the overlay is entirely visible in the current viewport
   * (if necessary) using the configured autoPan parameters
   * @protected
   */


  Overlay.prototype.performAutoPan = function () {
    if (this.autoPan) {
      this.panIntoView(this.autoPan);
    }
  };
  /**
   * Pan the map so that the overlay is entirely visible in the current viewport
   * (if necessary).
   * @param {PanIntoViewOptions} [opt_panIntoViewOptions] Options for the pan action
   * @api
   */


  Overlay.prototype.panIntoView = function (opt_panIntoViewOptions) {
    var map = this.getMap();

    if (!map || !map.getTargetElement() || !this.get(Property.POSITION)) {
      return;
    }

    var mapRect = this.getRect(map.getTargetElement(), map.getSize());
    var element = this.getElement();
    var overlayRect = this.getRect(element, [(0, _dom.outerWidth)(element), (0, _dom.outerHeight)(element)]);
    var panIntoViewOptions = opt_panIntoViewOptions || {};
    var myMargin = panIntoViewOptions.margin === undefined ? 20 : panIntoViewOptions.margin;

    if (!(0, _extent.containsExtent)(mapRect, overlayRect)) {
      // the overlay is not completely inside the viewport, so pan the map
      var offsetLeft = overlayRect[0] - mapRect[0];
      var offsetRight = mapRect[2] - overlayRect[2];
      var offsetTop = overlayRect[1] - mapRect[1];
      var offsetBottom = mapRect[3] - overlayRect[3];
      var delta = [0, 0];

      if (offsetLeft < 0) {
        // move map to the left
        delta[0] = offsetLeft - myMargin;
      } else if (offsetRight < 0) {
        // move map to the right
        delta[0] = Math.abs(offsetRight) + myMargin;
      }

      if (offsetTop < 0) {
        // move map up
        delta[1] = offsetTop - myMargin;
      } else if (offsetBottom < 0) {
        // move map down
        delta[1] = Math.abs(offsetBottom) + myMargin;
      }

      if (delta[0] !== 0 || delta[1] !== 0) {
        var center =
        /** @type {import("./coordinate.js").Coordinate} */
        map.getView().getCenterInternal();
        var centerPx = map.getPixelFromCoordinateInternal(center);

        if (!centerPx) {
          return;
        }

        var newCenterPx = [centerPx[0] + delta[0], centerPx[1] + delta[1]];
        var panOptions = panIntoViewOptions.animation || {};
        map.getView().animateInternal({
          center: map.getCoordinateFromPixelInternal(newCenterPx),
          duration: panOptions.duration,
          easing: panOptions.easing
        });
      }
    }
  };
  /**
   * Get the extent of an element relative to the document
   * @param {HTMLElement} element The element.
   * @param {import("./size.js").Size} size The size of the element.
   * @return {import("./extent.js").Extent} The extent.
   * @protected
   */


  Overlay.prototype.getRect = function (element, size) {
    var box = element.getBoundingClientRect();
    var offsetX = box.left + window.pageXOffset;
    var offsetY = box.top + window.pageYOffset;
    return [offsetX, offsetY, offsetX + size[0], offsetY + size[1]];
  };
  /**
   * Set the positioning for this overlay.
   * @param {import("./OverlayPositioning.js").default} positioning how the overlay is
   *     positioned relative to its point on the map.
   * @observable
   * @api
   */


  Overlay.prototype.setPositioning = function (positioning) {
    this.set(Property.POSITIONING, positioning);
  };
  /**
   * Modify the visibility of the element.
   * @param {boolean} visible Element visibility.
   * @protected
   */


  Overlay.prototype.setVisible = function (visible) {
    if (this.rendered.visible !== visible) {
      this.element.style.display = visible ? '' : 'none';
      this.rendered.visible = visible;
    }
  };
  /**
   * Update pixel position.
   * @protected
   */


  Overlay.prototype.updatePixelPosition = function () {
    var map = this.getMap();
    var position = this.getPosition();

    if (!map || !map.isRendered() || !position) {
      this.setVisible(false);
      return;
    }

    var pixel = map.getPixelFromCoordinate(position);
    var mapSize = map.getSize();
    this.updateRenderedPosition(pixel, mapSize);
  };
  /**
   * @param {import("./pixel.js").Pixel} pixel The pixel location.
   * @param {import("./size.js").Size|undefined} mapSize The map size.
   * @protected
   */


  Overlay.prototype.updateRenderedPosition = function (pixel, mapSize) {
    var style = this.element.style;
    var offset = this.getOffset();
    var positioning = this.getPositioning();
    this.setVisible(true);
    var x = Math.round(pixel[0] + offset[0]) + 'px';
    var y = Math.round(pixel[1] + offset[1]) + 'px';
    var posX = '0%';
    var posY = '0%';

    if (positioning == _OverlayPositioning.default.BOTTOM_RIGHT || positioning == _OverlayPositioning.default.CENTER_RIGHT || positioning == _OverlayPositioning.default.TOP_RIGHT) {
      posX = '-100%';
    } else if (positioning == _OverlayPositioning.default.BOTTOM_CENTER || positioning == _OverlayPositioning.default.CENTER_CENTER || positioning == _OverlayPositioning.default.TOP_CENTER) {
      posX = '-50%';
    }

    if (positioning == _OverlayPositioning.default.BOTTOM_LEFT || positioning == _OverlayPositioning.default.BOTTOM_CENTER || positioning == _OverlayPositioning.default.BOTTOM_RIGHT) {
      posY = '-100%';
    } else if (positioning == _OverlayPositioning.default.CENTER_LEFT || positioning == _OverlayPositioning.default.CENTER_CENTER || positioning == _OverlayPositioning.default.CENTER_RIGHT) {
      posY = '-50%';
    }

    var transform = "translate(".concat(posX, ", ").concat(posY, ") translate(").concat(x, ", ").concat(y, ")");

    if (this.rendered.transform_ != transform) {
      this.rendered.transform_ = transform;
      style.transform = transform; // @ts-ignore IE9

      style.msTransform = transform;
    }
  };
  /**
   * returns the options this Overlay has been created with
   * @return {Options} overlay options
   */


  Overlay.prototype.getOptions = function () {
    return this.options;
  };

  return Overlay;
}(_Object.default);

var _default = Overlay;
exports.default = _default;
},{"./Object.js":"node_modules/ol/Object.js","./MapEventType.js":"node_modules/ol/MapEventType.js","./OverlayPositioning.js":"node_modules/ol/OverlayPositioning.js","./css.js":"node_modules/ol/css.js","./extent.js":"node_modules/ol/extent.js","./events.js":"node_modules/ol/events.js","./dom.js":"node_modules/ol/dom.js"}],"node_modules/ol/layer/Property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/layer/Property
 */

/**
 * @enum {string}
 */
var _default = {
  OPACITY: 'opacity',
  VISIBLE: 'visible',
  EXTENT: 'extent',
  Z_INDEX: 'zIndex',
  MAX_RESOLUTION: 'maxResolution',
  MIN_RESOLUTION: 'minResolution',
  MAX_ZOOM: 'maxZoom',
  MIN_ZOOM: 'minZoom',
  SOURCE: 'source',
  MAP: 'map'
};
exports.default = _default;
},{}],"node_modules/ol/math.js":[function(require,module,exports) {
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
},{}],"node_modules/ol/layer/Base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Object = _interopRequireDefault(require("../Object.js"));

var _Property = _interopRequireDefault(require("./Property.js"));

var _util = require("../util.js");

var _asserts = require("../asserts.js");

var _obj = require("../obj.js");

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
 * @module ol/layer/Base
 */


/**
 * A css color, or a function called with a view resolution returning a css color.
 *
 * @typedef {string|function(number):string} BackgroundColor
 * @api
 */

/**
 * @typedef {import("../ObjectEventType").Types|'change:extent'|'change:maxResolution'|'change:maxZoom'|
 *    'change:minResolution'|'change:minZoom'|'change:opacity'|'change:visible'|'change:zIndex'} BaseLayerObjectEventTypes
 */

/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<BaseLayerObjectEventTypes, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|BaseLayerObjectEventTypes, Return>} BaseLayerOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {BackgroundColor} [background] Background color for the layer. If not specified, no background
 * will be rendered.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Note that with {@link module:ol/layer/Base~BaseLayer} and all its subclasses, any property set in
 * the options is set as a {@link module:ol/Object~BaseObject} property on the layer object, so
 * is observable, and has get/set accessors.
 *
 * @api
 */
var BaseLayer =
/** @class */
function (_super) {
  __extends(BaseLayer, _super);
  /**
   * @param {Options} options Layer options.
   */


  function BaseLayer(options) {
    var _this = _super.call(this) || this;
    /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */


    _this.on;
    /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {BaseLayerOnSignature<void>}
     */

    _this.un;
    /**
     * @type {BackgroundColor|false}
     * @private
     */

    _this.background_ = options.background;
    /**
     * @type {Object<string, *>}
     */

    var properties = (0, _obj.assign)({}, options);

    if (typeof options.properties === 'object') {
      delete properties.properties;
      (0, _obj.assign)(properties, options.properties);
    }

    properties[_Property.default.OPACITY] = options.opacity !== undefined ? options.opacity : 1;
    (0, _asserts.assert)(typeof properties[_Property.default.OPACITY] === 'number', 64); // Layer opacity must be a number

    properties[_Property.default.VISIBLE] = options.visible !== undefined ? options.visible : true;
    properties[_Property.default.Z_INDEX] = options.zIndex;
    properties[_Property.default.MAX_RESOLUTION] = options.maxResolution !== undefined ? options.maxResolution : Infinity;
    properties[_Property.default.MIN_RESOLUTION] = options.minResolution !== undefined ? options.minResolution : 0;
    properties[_Property.default.MIN_ZOOM] = options.minZoom !== undefined ? options.minZoom : -Infinity;
    properties[_Property.default.MAX_ZOOM] = options.maxZoom !== undefined ? options.maxZoom : Infinity;
    /**
     * @type {string}
     * @private
     */

    _this.className_ = properties.className !== undefined ? properties.className : 'ol-layer';
    delete properties.className;

    _this.setProperties(properties);
    /**
     * @type {import("./Layer.js").State}
     * @private
     */


    _this.state_ = null;
    return _this;
  }
  /**
   * Get the background for this layer.
   * @return {BackgroundColor|false} Layer background.
   */


  BaseLayer.prototype.getBackground = function () {
    return this.background_;
  };
  /**
   * @return {string} CSS class name.
   */


  BaseLayer.prototype.getClassName = function () {
    return this.className_;
  };
  /**
   * This method is not meant to be called by layers or layer renderers because the state
   * is incorrect if the layer is included in a layer group.
   *
   * @param {boolean} [opt_managed] Layer is managed.
   * @return {import("./Layer.js").State} Layer state.
   */


  BaseLayer.prototype.getLayerState = function (opt_managed) {
    /** @type {import("./Layer.js").State} */
    var state = this.state_ ||
    /** @type {?} */
    {
      layer: this,
      managed: opt_managed === undefined ? true : opt_managed
    };
    var zIndex = this.getZIndex();
    state.opacity = (0, _math.clamp)(Math.round(this.getOpacity() * 100) / 100, 0, 1);
    state.visible = this.getVisible();
    state.extent = this.getExtent();
    state.zIndex = zIndex === undefined && !state.managed ? Infinity : zIndex;
    state.maxResolution = this.getMaxResolution();
    state.minResolution = Math.max(this.getMinResolution(), 0);
    state.minZoom = this.getMinZoom();
    state.maxZoom = this.getMaxZoom();
    this.state_ = state;
    return state;
  };
  /**
   * @abstract
   * @param {Array<import("./Layer.js").default>} [opt_array] Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */


  BaseLayer.prototype.getLayersArray = function (opt_array) {
    return (0, _util.abstract)();
  };
  /**
   * @abstract
   * @param {Array<import("./Layer.js").State>} [opt_states] Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */


  BaseLayer.prototype.getLayerStatesArray = function (opt_states) {
    return (0, _util.abstract)();
  };
  /**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */


  BaseLayer.prototype.getExtent = function () {
    return (
      /** @type {import("../extent.js").Extent|undefined} */
      this.get(_Property.default.EXTENT)
    );
  };
  /**
   * Return the maximum resolution of the layer.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMaxResolution = function () {
    return (
      /** @type {number} */
      this.get(_Property.default.MAX_RESOLUTION)
    );
  };
  /**
   * Return the minimum resolution of the layer.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMinResolution = function () {
    return (
      /** @type {number} */
      this.get(_Property.default.MIN_RESOLUTION)
    );
  };
  /**
   * Return the minimum zoom level of the layer.
   * @return {number} The minimum zoom level of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMinZoom = function () {
    return (
      /** @type {number} */
      this.get(_Property.default.MIN_ZOOM)
    );
  };
  /**
   * Return the maximum zoom level of the layer.
   * @return {number} The maximum zoom level of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMaxZoom = function () {
    return (
      /** @type {number} */
      this.get(_Property.default.MAX_ZOOM)
    );
  };
  /**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getOpacity = function () {
    return (
      /** @type {number} */
      this.get(_Property.default.OPACITY)
    );
  };
  /**
   * @abstract
   * @return {import("../source/State.js").default} Source state.
   */


  BaseLayer.prototype.getSourceState = function () {
    return (0, _util.abstract)();
  };
  /**
   * Return the visibility of the layer (`true` or `false`).
   * @return {boolean} The visibility of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getVisible = function () {
    return (
      /** @type {boolean} */
      this.get(_Property.default.VISIBLE)
    );
  };
  /**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. The default Z-index is 0.
   * @return {number} The Z-index of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getZIndex = function () {
    return (
      /** @type {number} */
      this.get(_Property.default.Z_INDEX)
    );
  };
  /**
   * Sets the background color.
   * @param {BackgroundColor} [opt_background] Background color.
   */


  BaseLayer.prototype.setBackground = function (opt_background) {
    this.background_ = opt_background;
    this.changed();
  };
  /**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setExtent = function (extent) {
    this.set(_Property.default.EXTENT, extent);
  };
  /**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMaxResolution = function (maxResolution) {
    this.set(_Property.default.MAX_RESOLUTION, maxResolution);
  };
  /**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMinResolution = function (minResolution) {
    this.set(_Property.default.MIN_RESOLUTION, minResolution);
  };
  /**
   * Set the maximum zoom (exclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} maxZoom The maximum zoom of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMaxZoom = function (maxZoom) {
    this.set(_Property.default.MAX_ZOOM, maxZoom);
  };
  /**
   * Set the minimum zoom (inclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} minZoom The minimum zoom of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMinZoom = function (minZoom) {
    this.set(_Property.default.MIN_ZOOM, minZoom);
  };
  /**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setOpacity = function (opacity) {
    (0, _asserts.assert)(typeof opacity === 'number', 64); // Layer opacity must be a number

    this.set(_Property.default.OPACITY, opacity);
  };
  /**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setVisible = function (visible) {
    this.set(_Property.default.VISIBLE, visible);
  };
  /**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setZIndex = function (zindex) {
    this.set(_Property.default.Z_INDEX, zindex);
  };
  /**
   * Clean up.
   */


  BaseLayer.prototype.disposeInternal = function () {
    if (this.state_) {
      this.state_.layer = null;
      this.state_ = null;
    }

    _super.prototype.disposeInternal.call(this);
  };

  return BaseLayer;
}(_Object.default);

var _default = BaseLayer;
exports.default = _default;
},{"../Object.js":"node_modules/ol/Object.js","./Property.js":"node_modules/ol/layer/Property.js","../util.js":"node_modules/ol/util.js","../asserts.js":"node_modules/ol/asserts.js","../obj.js":"node_modules/ol/obj.js","../math.js":"node_modules/ol/math.js"}],"node_modules/ol/render/EventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/render/EventType
 */

/**
 * @enum {string}
 */
var _default = {
  /**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */
  PRERENDER: 'prerender',

  /**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */
  POSTRENDER: 'postrender',

  /**
   * Triggered before layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */
  PRECOMPOSE: 'precompose',

  /**
   * Triggered after layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */
  POSTCOMPOSE: 'postcompose',

  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */
  RENDERCOMPLETE: 'rendercomplete'
};
/**
 * @typedef {'postrender'|'precompose'|'postcompose'|'rendercomplete'} MapRenderEventTypes
 */

/**
 * @typedef {'postrender'|'prerender'} LayerRenderEventTypes
 */

exports.default = _default;
},{}],"node_modules/ol/source/State.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/source/State
 */

/**
 * @enum {string}
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */
var _default = {
  UNDEFINED: 'undefined',
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
};
exports.default = _default;
},{}],"node_modules/ol/layer/Layer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.inView = inView;

var _Base = _interopRequireDefault(require("./Base.js"));

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _Property = _interopRequireDefault(require("./Property.js"));

var _EventType2 = _interopRequireDefault(require("../render/EventType.js"));

var _State = _interopRequireDefault(require("../source/State.js"));

var _asserts = require("../asserts.js");

var _obj = require("../obj.js");

var _events = require("../events.js");

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
 * @module ol/layer/Layer
 */


/**
 * @typedef {function(import("../PluggableMap.js").FrameState):HTMLElement} RenderFunction
 */

/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:source', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|'change:source'|
 *     import("../render/EventType").LayerRenderEventTypes, Return>} LayerOnSignature
 */

/**
 * @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {SourceType} [source] Source for this layer.  If not provided to the constructor,
 * the source can be set by calling {@link module:ol/layer/Layer~Layer#setSource layer.setSource(source)} after
 * construction.
 * @property {import("../PluggableMap.js").default|null} [map] Map.
 * @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
 * HTML element. Will overwrite the default rendering for the layer.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @typedef {Object} State
 * @property {import("./Layer.js").default} layer Layer.
 * @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
 * @property {boolean} visible Visible.
 * @property {boolean} managed Managed.
 * @property {import("../extent.js").Extent} [extent] Extent.
 * @property {number} zIndex ZIndex.
 * @property {number} maxResolution Maximum resolution.
 * @property {number} minResolution Minimum resolution.
 * @property {number} minZoom Minimum zoom.
 * @property {number} maxZoom Maximum zoom.
 */

/**
 * @classdesc
 * Base class from which all layer types are derived. This should only be instantiated
 * in the case where a custom layer is added to the map with a custom `render` function.
 * Such a function can be specified in the `options` object, and is expected to return an HTML element.
 *
 * A visual representation of raster or vector map data.
 * Layers group together those properties that pertain to how the data is to be
 * displayed, irrespective of the source of that data.
 *
 * Layers are usually added to a map with {@link import("../PluggableMap.js").default#addLayer map.addLayer()}. Components
 * like {@link module:ol/interaction/Draw~Draw} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * {@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 *
 * Please note that for performance reasons several layers might get rendered to
 * the same HTML element, which will cause {@link import("../PluggableMap.js").default#forEachLayerAtPixel map.forEachLayerAtPixel()} to
 * give false positives. To avoid this, apply different `className` properties to the
 * layers at creation time.
 *
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 *
 * @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
 * @template {import("../renderer/Layer.js").default} [RendererType=import("../renderer/Layer.js").default]
 * @api
 */
var Layer =
/** @class */
function (_super) {
  __extends(Layer, _super);
  /**
   * @param {Options<SourceType>} options Layer options.
   */


  function Layer(options) {
    var _this = this;

    var baseOptions = (0, _obj.assign)({}, options);
    delete baseOptions.source;
    _this = _super.call(this, baseOptions) || this;
    /***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {LayerOnSignature<void>}
     */

    _this.un;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    _this.mapPrecomposeKey_ = null;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    _this.mapRenderKey_ = null;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    _this.sourceChangeKey_ = null;
    /**
     * @private
     * @type {RendererType}
     */

    _this.renderer_ = null;
    /**
     * @protected
     * @type {boolean}
     */

    _this.rendered = false; // Overwrite default render method with a custom one

    if (options.render) {
      _this.render = options.render;
    }

    if (options.map) {
      _this.setMap(options.map);
    }

    _this.addChangeListener(_Property.default.SOURCE, _this.handleSourcePropertyChange_);

    var source = options.source ?
    /** @type {SourceType} */
    options.source : null;

    _this.setSource(source);

    return _this;
  }
  /**
   * @param {Array<import("./Layer.js").default>} [opt_array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */


  Layer.prototype.getLayersArray = function (opt_array) {
    var array = opt_array ? opt_array : [];
    array.push(this);
    return array;
  };
  /**
   * @param {Array<import("./Layer.js").State>} [opt_states] Optional list of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */


  Layer.prototype.getLayerStatesArray = function (opt_states) {
    var states = opt_states ? opt_states : [];
    states.push(this.getLayerState());
    return states;
  };
  /**
   * Get the layer source.
   * @return {SourceType|null} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */


  Layer.prototype.getSource = function () {
    return (
      /** @type {SourceType} */
      this.get(_Property.default.SOURCE) || null
    );
  };
  /**
   * @return {SourceType|null} The source being rendered.
   */


  Layer.prototype.getRenderSource = function () {
    return this.getSource();
  };
  /**
   * @return {import("../source/State.js").default} Source state.
   */


  Layer.prototype.getSourceState = function () {
    var source = this.getSource();
    return !source ? _State.default.UNDEFINED : source.getState();
  };
  /**
   * @private
   */


  Layer.prototype.handleSourceChange_ = function () {
    this.changed();
  };
  /**
   * @private
   */


  Layer.prototype.handleSourcePropertyChange_ = function () {
    if (this.sourceChangeKey_) {
      (0, _events.unlistenByKey)(this.sourceChangeKey_);
      this.sourceChangeKey_ = null;
    }

    var source = this.getSource();

    if (source) {
      this.sourceChangeKey_ = (0, _events.listen)(source, _EventType.default.CHANGE, this.handleSourceChange_, this);
    }

    this.changed();
  };
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
   * an array of features.
   */


  Layer.prototype.getFeatures = function (pixel) {
    if (!this.renderer_) {
      return new Promise(function (resolve) {
        return resolve([]);
      });
    }

    return this.renderer_.getFeatures(pixel);
  };
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */


  Layer.prototype.getData = function (pixel) {
    if (!this.renderer_ || !this.rendered) {
      return null;
    }

    return this.renderer_.getData(pixel);
  };
  /**
   * In charge to manage the rendering of the layer. One layer type is
   * bounded with one layer renderer.
   * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement} The rendered element.
   */


  Layer.prototype.render = function (frameState, target) {
    var layerRenderer = this.getRenderer();

    if (layerRenderer.prepareFrame(frameState)) {
      this.rendered = true;
      return layerRenderer.renderFrame(frameState, target);
    }
  };
  /**
   * Called when a layer is not visible during a map render.
   */


  Layer.prototype.unrender = function () {
    this.rendered = false;
  };
  /**
   * For use inside the library only.
   * @param {import("../PluggableMap.js").default|null} map Map.
   */


  Layer.prototype.setMapInternal = function (map) {
    if (!map) {
      this.unrender();
    }

    this.set(_Property.default.MAP, map);
  };
  /**
   * For use inside the library only.
   * @return {import("../PluggableMap.js").default|null} Map.
   */


  Layer.prototype.getMapInternal = function () {
    return this.get(_Property.default.MAP);
  };
  /**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection, and the callback in
   * {@link module:ol/Map~Map#forEachLayerAtPixel} will receive `null` as layer. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map~Map#addLayer} instead.
   * @param {import("../PluggableMap.js").default|null} map Map.
   * @api
   */


  Layer.prototype.setMap = function (map) {
    if (this.mapPrecomposeKey_) {
      (0, _events.unlistenByKey)(this.mapPrecomposeKey_);
      this.mapPrecomposeKey_ = null;
    }

    if (!map) {
      this.changed();
    }

    if (this.mapRenderKey_) {
      (0, _events.unlistenByKey)(this.mapRenderKey_);
      this.mapRenderKey_ = null;
    }

    if (map) {
      this.mapPrecomposeKey_ = (0, _events.listen)(map, _EventType2.default.PRECOMPOSE, function (evt) {
        var renderEvent =
        /** @type {import("../render/Event.js").default} */
        evt;
        var layerStatesArray = renderEvent.frameState.layerStatesArray;
        var layerState = this.getLayerState(false); // A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both.

        (0, _asserts.assert)(!layerStatesArray.some(function (arrayLayerState) {
          return arrayLayerState.layer === layerState.layer;
        }), 67);
        layerStatesArray.push(layerState);
      }, this);
      this.mapRenderKey_ = (0, _events.listen)(this, _EventType.default.CHANGE, map.render, map);
      this.changed();
    }
  };
  /**
   * Set the layer source.
   * @param {SourceType|null} source The layer source.
   * @observable
   * @api
   */


  Layer.prototype.setSource = function (source) {
    this.set(_Property.default.SOURCE, source);
  };
  /**
   * Get the renderer for this layer.
   * @return {RendererType|null} The layer renderer.
   */


  Layer.prototype.getRenderer = function () {
    if (!this.renderer_) {
      this.renderer_ = this.createRenderer();
    }

    return this.renderer_;
  };
  /**
   * @return {boolean} The layer has a renderer.
   */


  Layer.prototype.hasRenderer = function () {
    return !!this.renderer_;
  };
  /**
   * Create a renderer for this layer.
   * @return {RendererType} A layer renderer.
   * @protected
   */


  Layer.prototype.createRenderer = function () {
    return null;
  };
  /**
   * Clean up.
   */


  Layer.prototype.disposeInternal = function () {
    if (this.renderer_) {
      this.renderer_.dispose();
      delete this.renderer_;
    }

    this.setSource(null);

    _super.prototype.disposeInternal.call(this);
  };

  return Layer;
}(_Base.default);
/**
 * Return `true` if the layer is visible and if the provided view state
 * has resolution and zoom levels that are in range of the layer's min/max.
 * @param {State} layerState Layer state.
 * @param {import("../View.js").State} viewState View state.
 * @return {boolean} The layer is visible at the given view state.
 */


function inView(layerState, viewState) {
  if (!layerState.visible) {
    return false;
  }

  var resolution = viewState.resolution;

  if (resolution < layerState.minResolution || resolution >= layerState.maxResolution) {
    return false;
  }

  var zoom = viewState.zoom;
  return zoom > layerState.minZoom && zoom <= layerState.maxZoom;
}

var _default = Layer;
exports.default = _default;
},{"./Base.js":"node_modules/ol/layer/Base.js","../events/EventType.js":"node_modules/ol/events/EventType.js","./Property.js":"node_modules/ol/layer/Property.js","../render/EventType.js":"node_modules/ol/render/EventType.js","../source/State.js":"node_modules/ol/source/State.js","../asserts.js":"node_modules/ol/asserts.js","../obj.js":"node_modules/ol/obj.js","../events.js":"node_modules/ol/events.js"}],"node_modules/ol/layer/TileProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/layer/TileProperty
 */

/**
 * @enum {string}
 */
var _default = {
  PRELOAD: 'preload',
  USE_INTERIM_TILES_ON_ERROR: 'useInterimTilesOnError'
};
exports.default = _default;
},{}],"node_modules/ol/layer/BaseTile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Layer = _interopRequireDefault(require("./Layer.js"));

var _TileProperty = _interopRequireDefault(require("./TileProperty.js"));

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
 * @module ol/layer/BaseTile
 */


/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:source'|'change:preload'|'change:useInterimTilesOnError', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|
 *   'change:source'|'change:preload'|'change:useInterimTilesOnError'|import("../render/EventType").LayerRenderEventTypes, Return>} BaseTileLayerOnSignature
 */

/**
 * @template {import("../source/Tile.js").default} TileSourceType
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {TileSourceType} [source] Source for this layer.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */

/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Tile.js").default} TileSourceType
 * @template {import("../renderer/Layer.js").default} RendererType
 * @extends {Layer<TileSourceType, RendererType>}
 * @api
 */
var BaseTileLayer =
/** @class */
function (_super) {
  __extends(BaseTileLayer, _super);
  /**
   * @param {Options<TileSourceType>} [opt_options] Tile layer options.
   */


  function BaseTileLayer(opt_options) {
    var _this = this;

    var options = opt_options ? opt_options : {};
    var baseOptions = (0, _obj.assign)({}, options);
    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;
    _this = _super.call(this, baseOptions) || this;
    /***
     * @type {BaseTileLayerOnSignature<import("../events").EventsKey>}
     */

    _this.on;
    /***
     * @type {BaseTileLayerOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {BaseTileLayerOnSignature<void>}
     */

    _this.un;

    _this.setPreload(options.preload !== undefined ? options.preload : 0);

    _this.setUseInterimTilesOnError(options.useInterimTilesOnError !== undefined ? options.useInterimTilesOnError : true);

    return _this;
  }
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */


  BaseTileLayer.prototype.getPreload = function () {
    return (
      /** @type {number} */
      this.get(_TileProperty.default.PRELOAD)
    );
  };
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */


  BaseTileLayer.prototype.setPreload = function (preload) {
    this.set(_TileProperty.default.PRELOAD, preload);
  };
  /**
   * Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */


  BaseTileLayer.prototype.getUseInterimTilesOnError = function () {
    return (
      /** @type {boolean} */
      this.get(_TileProperty.default.USE_INTERIM_TILES_ON_ERROR)
    );
  };
  /**
   * Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */


  BaseTileLayer.prototype.setUseInterimTilesOnError = function (useInterimTilesOnError) {
    this.set(_TileProperty.default.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
  };
  /**
   * Get data for a pixel location.  The return type depends on the source data.  For image tiles,
   * a four element RGBA array will be returned.  For data tiles, the array length will match the
   * number of bands in the dataset.  For requests outside the layer extent, `null` will be returned.
   * Data for a image tiles can only be retrieved if the source's `crossOrigin` property is set.
   *
   * ```js
   * // display layer data on every pointer move
   * map.on('pointermove', (event) => {
   *   console.log(layer.getData(event.pixel));
   * });
   * ```
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   * @api
   */


  BaseTileLayer.prototype.getData = function (pixel) {
    return _super.prototype.getData.call(this, pixel);
  };

  return BaseTileLayer;
}(_Layer.default);

var _default = BaseTileLayer;
exports.default = _default;
},{"./Layer.js":"node_modules/ol/layer/Layer.js","./TileProperty.js":"node_modules/ol/layer/TileProperty.js","../obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/ImageState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ImageState
 */

/**
 * @enum {number}
 */
var _default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
exports.default = _default;
},{}],"node_modules/ol/renderer/Layer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _ImageState = _interopRequireDefault(require("../ImageState.js"));

var _Observable = _interopRequireDefault(require("../Observable.js"));

var _State = _interopRequireDefault(require("../source/State.js"));

var _util = require("../util.js");

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
 * @module ol/renderer/Layer
 */


/**
 * @template {import("../layer/Layer.js").default} LayerType
 */
var LayerRenderer =
/** @class */
function (_super) {
  __extends(LayerRenderer, _super);
  /**
   * @param {LayerType} layer Layer.
   */


  function LayerRenderer(layer) {
    var _this = _super.call(this) || this;
    /**
     * The renderer is initialized and ready to render.
     * @type {boolean}
     */


    _this.ready = true;
    /** @private */

    _this.boundHandleImageChange_ = _this.handleImageChange_.bind(_this);
    /**
     * @protected
     * @type {LayerType}
     */

    _this.layer_ = layer;
    /**
     * @type {import("../render/canvas/ExecutorGroup").default}
     */

    _this.declutterExecutorGroup = null;
    return _this;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
   * an array of features.
   */


  LayerRenderer.prototype.getFeatures = function (pixel) {
    return (0, _util.abstract)();
  };
  /**
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */


  LayerRenderer.prototype.getData = function (pixel) {
    return null;
  };
  /**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */


  LayerRenderer.prototype.prepareFrame = function (frameState) {
    return (0, _util.abstract)();
  };
  /**
   * Render the layer.
   * @abstract
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */


  LayerRenderer.prototype.renderFrame = function (frameState, target) {
    return (0, _util.abstract)();
  };
  /**
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */


  LayerRenderer.prototype.loadedTileCallback = function (tiles, zoom, tile) {
    if (!tiles[zoom]) {
      tiles[zoom] = {};
    }

    tiles[zoom][tile.tileCoord.toString()] = tile;
    return undefined;
  };
  /**
   * Create a function that adds loaded tiles to the tile lookup.
   * @param {import("../source/Tile.js").default} source Tile source.
   * @param {import("../proj/Projection.js").default} projection Projection of the tiles.
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @return {function(number, import("../TileRange.js").default):boolean} A function that can be
   *     called with a zoom level and a tile range to add loaded tiles to the lookup.
   * @protected
   */


  LayerRenderer.prototype.createLoadedTileFinder = function (source, projection, tiles) {
    return (
      /**
       * @param {number} zoom Zoom level.
       * @param {import("../TileRange.js").default} tileRange Tile range.
       * @return {boolean} The tile range is fully loaded.
       * @this {LayerRenderer}
       */
      function (zoom, tileRange) {
        var callback = this.loadedTileCallback.bind(this, tiles, zoom);
        return source.forEachLoadedTile(projection, zoom, tileRange, callback);
      }.bind(this)
    );
  };
  /**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */


  LayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
    return undefined;
  };
  /**
   * @abstract
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
   *    location, null will be returned.  If there is data, but pixel values cannot be
   *    returned, and empty array will be returned.
   */


  LayerRenderer.prototype.getDataAtPixel = function (pixel, frameState, hitTolerance) {
    return null;
  };
  /**
   * @return {LayerType} Layer.
   */


  LayerRenderer.prototype.getLayer = function () {
    return this.layer_;
  };
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */


  LayerRenderer.prototype.handleFontsChanged = function () {};
  /**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */


  LayerRenderer.prototype.handleImageChange_ = function (event) {
    var image =
    /** @type {import("../Image.js").default} */
    event.target;

    if (image.getState() === _ImageState.default.LOADED) {
      this.renderIfReadyAndVisible();
    }
  };
  /**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../ImageBase.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */


  LayerRenderer.prototype.loadImage = function (image) {
    var imageState = image.getState();

    if (imageState != _ImageState.default.LOADED && imageState != _ImageState.default.ERROR) {
      image.addEventListener(_EventType.default.CHANGE, this.boundHandleImageChange_);
    }

    if (imageState == _ImageState.default.IDLE) {
      image.load();
      imageState = image.getState();
    }

    return imageState == _ImageState.default.LOADED;
  };
  /**
   * @protected
   */


  LayerRenderer.prototype.renderIfReadyAndVisible = function () {
    var layer = this.getLayer();

    if (layer.getVisible() && layer.getSourceState() == _State.default.READY) {
      layer.changed();
    }
  };
  /**
   * Clean up.
   */


  LayerRenderer.prototype.disposeInternal = function () {
    delete this.layer_;

    _super.prototype.disposeInternal.call(this);
  };

  return LayerRenderer;
}(_Observable.default);

var _default = LayerRenderer;
exports.default = _default;
},{"../events/EventType.js":"node_modules/ol/events/EventType.js","../ImageState.js":"node_modules/ol/ImageState.js","../Observable.js":"node_modules/ol/Observable.js","../source/State.js":"node_modules/ol/source/State.js","../util.js":"node_modules/ol/util.js"}],"node_modules/ol/render/Event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Event = _interopRequireDefault(require("../events/Event.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/render/Event
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

var RenderEvent =
/** @class */
function (_super) {
  __extends(RenderEvent, _super);
  /**
   * @param {import("./EventType.js").default} type Type.
   * @param {import("../transform.js").Transform} [opt_inversePixelTransform] Transform for
   *     CSS pixels to rendered pixels.
   * @param {import("../PluggableMap.js").FrameState} [opt_frameState] Frame state.
   * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [opt_context] Context.
   */


  function RenderEvent(type, opt_inversePixelTransform, opt_frameState, opt_context) {
    var _this = _super.call(this, type) || this;
    /**
     * Transform from CSS pixels (relative to the top-left corner of the map viewport)
     * to rendered pixels on this event's `context`. Only available when a Canvas renderer is used, null otherwise.
     * @type {import("../transform.js").Transform|undefined}
     * @api
     */


    _this.inversePixelTransform = opt_inversePixelTransform;
    /**
     * An object representing the current render frame state.
     * @type {import("../PluggableMap.js").FrameState|undefined}
     * @api
     */

    _this.frameState = opt_frameState;
    /**
     * Canvas context. Not available when the event is dispatched by the map. For Canvas 2D layers,
     * the context will be the 2D rendering context.  For WebGL layers, the context will be the WebGL
     * context.
     * @type {CanvasRenderingContext2D|WebGLRenderingContext|undefined}
     * @api
     */

    _this.context = opt_context;
    return _this;
  }

  return RenderEvent;
}(_Event.default);

var _default = RenderEvent;
exports.default = _default;
},{"../events/Event.js":"node_modules/ol/events/Event.js"}],"node_modules/ol/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = apply;
exports.compose = compose;
exports.composeCssTransform = composeCssTransform;
exports.create = create;
exports.determinant = determinant;
exports.invert = invert;
exports.makeInverse = makeInverse;
exports.makeScale = makeScale;
exports.multiply = multiply;
exports.reset = reset;
exports.rotate = rotate;
exports.scale = scale;
exports.set = set;
exports.setFromArray = setFromArray;
exports.toString = toString;
exports.translate = translate;

var _has = require("./has.js");

var _asserts = require("./asserts.js");

/**
 * @module ol/transform
 */

/**
 * An array representing an affine 2d transformation for use with
 * {@link module:ol/transform} functions. The array has 6 elements.
 * @typedef {!Array<number>} Transform
 * @api
 */

/**
 * Collection of affine 2d transformation functions. The functions work on an
 * array of 6 elements. The element order is compatible with the [SVGMatrix
 * interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
 * a subset (elements a to f) of a 3×3 matrix:
 * ```
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 * ```
 */

/**
 * @private
 * @type {Transform}
 */
var tmp_ = new Array(6);
/**
 * Create an identity transform.
 * @return {!Transform} Identity transform.
 */

function create() {
  return [1, 0, 0, 1, 0, 0];
}
/**
 * Resets the given transform to an identity transform.
 * @param {!Transform} transform Transform.
 * @return {!Transform} Transform.
 */


function reset(transform) {
  return set(transform, 1, 0, 0, 1, 0, 0);
}
/**
 * Multiply the underlying matrices of two transforms and return the result in
 * the first transform.
 * @param {!Transform} transform1 Transform parameters of matrix 1.
 * @param {!Transform} transform2 Transform parameters of matrix 2.
 * @return {!Transform} transform1 multiplied with transform2.
 */


function multiply(transform1, transform2) {
  var a1 = transform1[0];
  var b1 = transform1[1];
  var c1 = transform1[2];
  var d1 = transform1[3];
  var e1 = transform1[4];
  var f1 = transform1[5];
  var a2 = transform2[0];
  var b2 = transform2[1];
  var c2 = transform2[2];
  var d2 = transform2[3];
  var e2 = transform2[4];
  var f2 = transform2[5];
  transform1[0] = a1 * a2 + c1 * b2;
  transform1[1] = b1 * a2 + d1 * b2;
  transform1[2] = a1 * c2 + c1 * d2;
  transform1[3] = b1 * c2 + d1 * d2;
  transform1[4] = a1 * e2 + c1 * f2 + e1;
  transform1[5] = b1 * e2 + d1 * f2 + f1;
  return transform1;
}
/**
 * Set the transform components a-f on a given transform.
 * @param {!Transform} transform Transform.
 * @param {number} a The a component of the transform.
 * @param {number} b The b component of the transform.
 * @param {number} c The c component of the transform.
 * @param {number} d The d component of the transform.
 * @param {number} e The e component of the transform.
 * @param {number} f The f component of the transform.
 * @return {!Transform} Matrix with transform applied.
 */


function set(transform, a, b, c, d, e, f) {
  transform[0] = a;
  transform[1] = b;
  transform[2] = c;
  transform[3] = d;
  transform[4] = e;
  transform[5] = f;
  return transform;
}
/**
 * Set transform on one matrix from another matrix.
 * @param {!Transform} transform1 Matrix to set transform to.
 * @param {!Transform} transform2 Matrix to set transform from.
 * @return {!Transform} transform1 with transform from transform2 applied.
 */


function setFromArray(transform1, transform2) {
  transform1[0] = transform2[0];
  transform1[1] = transform2[1];
  transform1[2] = transform2[2];
  transform1[3] = transform2[3];
  transform1[4] = transform2[4];
  transform1[5] = transform2[5];
  return transform1;
}
/**
 * Transforms the given coordinate with the given transform returning the
 * resulting, transformed coordinate. The coordinate will be modified in-place.
 *
 * @param {Transform} transform The transformation.
 * @param {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} coordinate The coordinate to transform.
 * @return {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} return coordinate so that operations can be
 *     chained together.
 */


function apply(transform, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
}
/**
 * Applies rotation to the given transform.
 * @param {!Transform} transform Transform.
 * @param {number} angle Angle in radians.
 * @return {!Transform} The rotated transform.
 */


function rotate(transform, angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return multiply(transform, set(tmp_, cos, sin, -sin, cos, 0, 0));
}
/**
 * Applies scale to a given transform.
 * @param {!Transform} transform Transform.
 * @param {number} x Scale factor x.
 * @param {number} y Scale factor y.
 * @return {!Transform} The scaled transform.
 */


function scale(transform, x, y) {
  return multiply(transform, set(tmp_, x, 0, 0, y, 0, 0));
}
/**
 * Creates a scale transform.
 * @param {!Transform} target Transform to overwrite.
 * @param {number} x Scale factor x.
 * @param {number} y Scale factor y.
 * @return {!Transform} The scale transform.
 */


function makeScale(target, x, y) {
  return set(target, x, 0, 0, y, 0, 0);
}
/**
 * Applies translation to the given transform.
 * @param {!Transform} transform Transform.
 * @param {number} dx Translation x.
 * @param {number} dy Translation y.
 * @return {!Transform} The translated transform.
 */


function translate(transform, dx, dy) {
  return multiply(transform, set(tmp_, 1, 0, 0, 1, dx, dy));
}
/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative).
 * @param {!Transform} transform The transform (will be modified in place).
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {!Transform} The composite transform.
 */


function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  transform[0] = sx * cos;
  transform[1] = sy * sin;
  transform[2] = -sx * sin;
  transform[3] = sy * cos;
  transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform;
}
/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative). The resulting transform
 * string can be applied as `transform` property of an HTMLElement's style.
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {string} The composite css transform.
 * @api
 */


function composeCssTransform(dx1, dy1, sx, sy, angle, dx2, dy2) {
  return toString(compose(create(), dx1, dy1, sx, sy, angle, dx2, dy2));
}
/**
 * Invert the given transform.
 * @param {!Transform} source The source transform to invert.
 * @return {!Transform} The inverted (source) transform.
 */


function invert(source) {
  return makeInverse(source, source);
}
/**
 * Invert the given transform.
 * @param {!Transform} target Transform to be set as the inverse of
 *     the source transform.
 * @param {!Transform} source The source transform to invert.
 * @return {!Transform} The inverted (target) transform.
 */


function makeInverse(target, source) {
  var det = determinant(source);
  (0, _asserts.assert)(det !== 0, 32); // Transformation matrix cannot be inverted

  var a = source[0];
  var b = source[1];
  var c = source[2];
  var d = source[3];
  var e = source[4];
  var f = source[5];
  target[0] = d / det;
  target[1] = -b / det;
  target[2] = -c / det;
  target[3] = a / det;
  target[4] = (c * f - d * e) / det;
  target[5] = -(a * f - b * e) / det;
  return target;
}
/**
 * Returns the determinant of the given matrix.
 * @param {!Transform} mat Matrix.
 * @return {number} Determinant.
 */


function determinant(mat) {
  return mat[0] * mat[3] - mat[1] * mat[2];
}
/**
 * @type {HTMLElement}
 * @private
 */


var transformStringDiv;
/**
 * A rounded string version of the transform.  This can be used
 * for CSS transforms.
 * @param {!Transform} mat Matrix.
 * @return {string} The transform as a string.
 */

function toString(mat) {
  var transformString = 'matrix(' + mat.join(', ') + ')';

  if (_has.WORKER_OFFSCREEN_CANVAS) {
    return transformString;
  }

  var node = transformStringDiv || (transformStringDiv = document.createElement('div'));
  node.style.transform = transformString;
  return node.style.transform;
}
},{"./has.js":"node_modules/ol/has.js","./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asArray = asArray;
exports.asString = asString;
exports.fromString = void 0;
exports.isStringColor = isStringColor;
exports.normalize = normalize;
exports.toString = toString;

var _asserts = require("./asserts.js");

var _math = require("./math.js");

/**
 * @module ol/color
 */

/**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 * @typedef {Array<number>} Color
 * @api
 */

/**
 * This RegExp matches # followed by 3, 4, 6, or 8 hex digits.
 * @const
 * @type {RegExp}
 * @private
 */
var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
/**
 * Regular expression for matching potential named color style strings.
 * @const
 * @type {RegExp}
 * @private
 */

var NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
/**
 * Return the color as an rgba string.
 * @param {Color|string} color Color.
 * @return {string} Rgba string.
 * @api
 */

function asString(color) {
  if (typeof color === 'string') {
    return color;
  } else {
    return toString(color);
  }
}
/**
 * Return named color as an rgba string.
 * @param {string} color Named color.
 * @return {string} Rgb string.
 */


function fromNamed(color) {
  var el = document.createElement('div');
  el.style.color = color;

  if (el.style.color !== '') {
    document.body.appendChild(el);
    var rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    return rgb;
  } else {
    return '';
  }
}
/**
 * @param {string} s String.
 * @return {Color} Color.
 */


var fromString = function () {
  // We maintain a small cache of parsed strings.  To provide cheap LRU-like
  // semantics, whenever the cache grows too large we simply delete an
  // arbitrary 25% of the entries.

  /**
   * @const
   * @type {number}
   */
  var MAX_CACHE_SIZE = 1024;
  /**
   * @type {Object<string, Color>}
   */

  var cache = {};
  /**
   * @type {number}
   */

  var cacheSize = 0;
  return (
    /**
     * @param {string} s String.
     * @return {Color} Color.
     */
    function (s) {
      var color;

      if (cache.hasOwnProperty(s)) {
        color = cache[s];
      } else {
        if (cacheSize >= MAX_CACHE_SIZE) {
          var i = 0;

          for (var key in cache) {
            if ((i++ & 3) === 0) {
              delete cache[key];
              --cacheSize;
            }
          }
        }

        color = fromStringInternal_(s);
        cache[s] = color;
        ++cacheSize;
      }

      return color;
    }
  );
}();
/**
 * Return the color as an array. This function maintains a cache of calculated
 * arrays which means the result should not be modified.
 * @param {Color|string} color Color.
 * @return {Color} Color.
 * @api
 */


exports.fromString = fromString;

function asArray(color) {
  if (Array.isArray(color)) {
    return color;
  } else {
    return fromString(color);
  }
}
/**
 * @param {string} s String.
 * @private
 * @return {Color} Color.
 */


function fromStringInternal_(s) {
  var r, g, b, a, color;

  if (NAMED_COLOR_RE_.exec(s)) {
    s = fromNamed(s);
  }

  if (HEX_COLOR_RE_.exec(s)) {
    // hex
    var n = s.length - 1; // number of hex digits

    var d = // number of digits per channel
    void 0; // number of digits per channel

    if (n <= 4) {
      d = 1;
    } else {
      d = 2;
    }

    var hasAlpha = n === 4 || n === 8;
    r = parseInt(s.substr(1 + 0 * d, d), 16);
    g = parseInt(s.substr(1 + 1 * d, d), 16);
    b = parseInt(s.substr(1 + 2 * d, d), 16);

    if (hasAlpha) {
      a = parseInt(s.substr(1 + 3 * d, d), 16);
    } else {
      a = 255;
    }

    if (d == 1) {
      r = (r << 4) + r;
      g = (g << 4) + g;
      b = (b << 4) + b;

      if (hasAlpha) {
        a = (a << 4) + a;
      }
    }

    color = [r, g, b, a / 255];
  } else if (s.indexOf('rgba(') == 0) {
    // rgba()
    color = s.slice(5, -1).split(',').map(Number);
    normalize(color);
  } else if (s.indexOf('rgb(') == 0) {
    // rgb()
    color = s.slice(4, -1).split(',').map(Number);
    color.push(1);
    normalize(color);
  } else {
    (0, _asserts.assert)(false, 14); // Invalid color
  }

  return color;
}
/**
 * TODO this function is only used in the test, we probably shouldn't export it
 * @param {Color} color Color.
 * @return {Color} Clamped color.
 */


function normalize(color) {
  color[0] = (0, _math.clamp)(color[0] + 0.5 | 0, 0, 255);
  color[1] = (0, _math.clamp)(color[1] + 0.5 | 0, 0, 255);
  color[2] = (0, _math.clamp)(color[2] + 0.5 | 0, 0, 255);
  color[3] = (0, _math.clamp)(color[3], 0, 1);
  return color;
}
/**
 * @param {Color} color Color.
 * @return {string} String.
 */


function toString(color) {
  var r = color[0];

  if (r != (r | 0)) {
    r = r + 0.5 | 0;
  }

  var g = color[1];

  if (g != (g | 0)) {
    g = g + 0.5 | 0;
  }

  var b = color[2];

  if (b != (b | 0)) {
    b = b + 0.5 | 0;
  }

  var a = color[3] === undefined ? 1 : Math.round(color[3] * 100) / 100;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}
/**
 * @param {string} s String.
 * @return {boolean} Whether the string is actually a valid color
 */


function isStringColor(s) {
  if (NAMED_COLOR_RE_.test(s)) {
    s = fromNamed(s);
  }

  return HEX_COLOR_RE_.test(s) || s.indexOf('rgba(') === 0 || s.indexOf('rgb(') === 0;
}
},{"./asserts.js":"node_modules/ol/asserts.js","./math.js":"node_modules/ol/math.js"}],"node_modules/ol/renderer/canvas/Layer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Layer = _interopRequireDefault(require("../Layer.js"));

var _Event = _interopRequireDefault(require("../../render/Event.js"));

var _EventType = _interopRequireDefault(require("../../render/EventType.js"));

var _transform = require("../../transform.js");

var _color = require("../../color.js");

var _extent = require("../../extent.js");

var _dom = require("../../dom.js");

var _array = require("../../array.js");

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
 * @module ol/renderer/canvas/Layer
 */


/**
 * @type {CanvasRenderingContext2D}
 */
var pixelContext = null;

function createPixelContext() {
  var canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  pixelContext = canvas.getContext('2d');
}
/**
 * @abstract
 * @template {import("../../layer/Layer.js").default} LayerType
 * @extends {LayerRenderer<LayerType>}
 */


var CanvasLayerRenderer =
/** @class */
function (_super) {
  __extends(CanvasLayerRenderer, _super);
  /**
   * @param {LayerType} layer Layer.
   */


  function CanvasLayerRenderer(layer) {
    var _this = _super.call(this, layer) || this;
    /**
     * @protected
     * @type {HTMLElement}
     */


    _this.container = null;
    /**
     * @protected
     * @type {number}
     */

    _this.renderedResolution;
    /**
     * A temporary transform.  The values in this transform should only be used in a
     * function that sets the values.
     * @protected
     * @type {import("../../transform.js").Transform}
     */

    _this.tempTransform = (0, _transform.create)();
    /**
     * The transform for rendered pixels to viewport CSS pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */

    _this.pixelTransform = (0, _transform.create)();
    /**
     * The transform for viewport CSS pixels to rendered pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */

    _this.inversePixelTransform = (0, _transform.create)();
    /**
     * @type {CanvasRenderingContext2D}
     */

    _this.context = null;
    /**
     * @type {boolean}
     */

    _this.containerReused = false;
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */

    _this.pixelContext_ = null;
    /**
     * @protected
     * @type {import("../../PluggableMap.js").FrameState|null}
     */

    _this.frameState = null;
    return _this;
  }
  /**
   * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
   * @param {number} col The column index.
   * @param {number} row The row index.
   * @return {Uint8ClampedArray|null} The image data.
   */


  CanvasLayerRenderer.prototype.getImageData = function (image, col, row) {
    if (!pixelContext) {
      createPixelContext();
    }

    pixelContext.clearRect(0, 0, 1, 1);
    var data;

    try {
      pixelContext.drawImage(image, col, row, 1, 1, 0, 0, 1, 1);
      data = pixelContext.getImageData(0, 0, 1, 1).data;
    } catch (err) {
      return null;
    }

    return data;
  };
  /**
   * @param {import('../../PluggableMap.js').FrameState} frameState Frame state.
   * @return {string} Background color.
   */


  CanvasLayerRenderer.prototype.getBackground = function (frameState) {
    var layer = this.getLayer();
    var background = layer.getBackground();

    if (typeof background === 'function') {
      background = background(frameState.viewState.resolution);
    }

    return background || undefined;
  };
  /**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {number} opacity Opacity.
   * @param {string} [opt_backgroundColor] Background color.
   */


  CanvasLayerRenderer.prototype.useContainer = function (target, transform, opacity, opt_backgroundColor) {
    var layerClassName = this.getLayer().getClassName();
    var container, context;

    if (target && target.className === layerClassName && target.style.opacity === '' && opacity === 1 && (!opt_backgroundColor || target.style.backgroundColor && (0, _array.equals)((0, _color.asArray)(target.style.backgroundColor), (0, _color.asArray)(opt_backgroundColor)))) {
      var canvas = target.firstElementChild;

      if (canvas instanceof HTMLCanvasElement) {
        context = canvas.getContext('2d');
      }
    }

    if (context && context.canvas.style.transform === transform) {
      // Container of the previous layer renderer can be used.
      this.container = target;
      this.context = context;
      this.containerReused = true;
    } else if (this.containerReused) {
      // Previously reused container cannot be used any more.
      this.container = null;
      this.context = null;
      this.containerReused = false;
    }

    if (!this.container) {
      container = document.createElement('div');
      container.className = layerClassName;
      var style = container.style;
      style.position = 'absolute';
      style.width = '100%';
      style.height = '100%';

      if (opt_backgroundColor) {
        style.backgroundColor = opt_backgroundColor;
      }

      context = (0, _dom.createCanvasContext2D)();
      var canvas = context.canvas;
      container.appendChild(canvas);
      style = canvas.style;
      style.position = 'absolute';
      style.left = '0';
      style.transformOrigin = 'top left';
      this.container = container;
      this.context = context;
    }
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent Clip extent.
   * @protected
   */


  CanvasLayerRenderer.prototype.clipUnrotated = function (context, frameState, extent) {
    var topLeft = (0, _extent.getTopLeft)(extent);
    var topRight = (0, _extent.getTopRight)(extent);
    var bottomRight = (0, _extent.getBottomRight)(extent);
    var bottomLeft = (0, _extent.getBottomLeft)(extent);
    (0, _transform.apply)(frameState.coordinateToPixelTransform, topLeft);
    (0, _transform.apply)(frameState.coordinateToPixelTransform, topRight);
    (0, _transform.apply)(frameState.coordinateToPixelTransform, bottomRight);
    (0, _transform.apply)(frameState.coordinateToPixelTransform, bottomLeft);
    var inverted = this.inversePixelTransform;
    (0, _transform.apply)(inverted, topLeft);
    (0, _transform.apply)(inverted, topRight);
    (0, _transform.apply)(inverted, bottomRight);
    (0, _transform.apply)(inverted, bottomLeft);
    context.save();
    context.beginPath();
    context.moveTo(Math.round(topLeft[0]), Math.round(topLeft[1]));
    context.lineTo(Math.round(topRight[0]), Math.round(topRight[1]));
    context.lineTo(Math.round(bottomRight[0]), Math.round(bottomRight[1]));
    context.lineTo(Math.round(bottomLeft[0]), Math.round(bottomLeft[1]));
    context.clip();
  };
  /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @private
   */


  CanvasLayerRenderer.prototype.dispatchRenderEvent_ = function (type, context, frameState) {
    var layer = this.getLayer();

    if (layer.hasListener(type)) {
      var event_1 = new _Event.default(type, this.inversePixelTransform, frameState, context);
      layer.dispatchEvent(event_1);
    }
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @protected
   */


  CanvasLayerRenderer.prototype.preRender = function (context, frameState) {
    this.frameState = frameState;
    this.dispatchRenderEvent_(_EventType.default.PRERENDER, context, frameState);
  };
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @protected
   */


  CanvasLayerRenderer.prototype.postRender = function (context, frameState) {
    this.dispatchRenderEvent_(_EventType.default.POSTRENDER, context, frameState);
  };
  /**
   * Creates a transform for rendering to an element that will be rotated after rendering.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} width Width of the rendered element (in pixels).
   * @param {number} height Height of the rendered element (in pixels).
   * @param {number} offsetX Offset on the x-axis in view coordinates.
   * @protected
   * @return {!import("../../transform.js").Transform} Transform.
   */


  CanvasLayerRenderer.prototype.getRenderTransform = function (center, resolution, rotation, pixelRatio, width, height, offsetX) {
    var dx1 = width / 2;
    var dy1 = height / 2;
    var sx = pixelRatio / resolution;
    var sy = -sx;
    var dx2 = -center[0] + offsetX;
    var dy2 = -center[1];
    return (0, _transform.compose)(this.tempTransform, dx1, dy1, sx, sy, -rotation, dx2, dy2);
  };
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @param {import("../../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
   *    location, null will be returned.  If there is data, but pixel values cannot be
   *    returned, and empty array will be returned.
   */


  CanvasLayerRenderer.prototype.getDataAtPixel = function (pixel, frameState, hitTolerance) {
    var renderPixel = (0, _transform.apply)(this.inversePixelTransform, pixel.slice());
    var context = this.context;
    var layer = this.getLayer();
    var layerExtent = layer.getExtent();

    if (layerExtent) {
      var renderCoordinate = (0, _transform.apply)(frameState.pixelToCoordinateTransform, pixel.slice());
      /** get only data inside of the layer extent */

      if (!(0, _extent.containsCoordinate)(layerExtent, renderCoordinate)) {
        return null;
      }
    }

    var x = Math.round(renderPixel[0]);
    var y = Math.round(renderPixel[1]);
    var pixelContext = this.pixelContext_;

    if (!pixelContext) {
      var pixelCanvas = document.createElement('canvas');
      pixelCanvas.width = 1;
      pixelCanvas.height = 1;
      pixelContext = pixelCanvas.getContext('2d');
      this.pixelContext_ = pixelContext;
    }

    pixelContext.clearRect(0, 0, 1, 1);
    var data;

    try {
      pixelContext.drawImage(context.canvas, x, y, 1, 1, 0, 0, 1, 1);
      data = pixelContext.getImageData(0, 0, 1, 1).data;
    } catch (err) {
      if (err.name === 'SecurityError') {
        // tainted canvas, we assume there is data at the given pixel (although there might not be)
        this.pixelContext_ = null;
        return new Uint8Array();
      }

      return data;
    }

    if (data[3] === 0) {
      return null;
    }

    return data;
  };
  /**
   * Clean up.
   */


  CanvasLayerRenderer.prototype.disposeInternal = function () {
    delete this.frameState;

    _super.prototype.disposeInternal.call(this);
  };

  return CanvasLayerRenderer;
}(_Layer.default);

var _default = CanvasLayerRenderer;
exports.default = _default;
},{"../Layer.js":"node_modules/ol/renderer/Layer.js","../../render/Event.js":"node_modules/ol/render/Event.js","../../render/EventType.js":"node_modules/ol/render/EventType.js","../../transform.js":"node_modules/ol/transform.js","../../color.js":"node_modules/ol/color.js","../../extent.js":"node_modules/ol/extent.js","../../dom.js":"node_modules/ol/dom.js","../../array.js":"node_modules/ol/array.js"}],"node_modules/ol/TileState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/TileState
 */

/**
 * @enum {number}
 */
var _default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,

  /**
   * Indicates that tile loading failed
   * @type {number}
   */
  ERROR: 3,
  EMPTY: 4
};
exports.default = _default;
},{}],"node_modules/ol/easing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easeIn = easeIn;
exports.easeOut = easeOut;
exports.inAndOut = inAndOut;
exports.linear = linear;
exports.upAndDown = upAndDown;

/**
 * @module ol/easing
 */

/**
 * Start slow and speed up.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */
function easeIn(t) {
  return Math.pow(t, 3);
}
/**
 * Start fast and slow down.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */


function easeOut(t) {
  return 1 - easeIn(1 - t);
}
/**
 * Start slow, speed up, and then slow down again.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */


function inAndOut(t) {
  return 3 * t * t - 2 * t * t * t;
}
/**
 * Maintain a constant speed over time.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */


function linear(t) {
  return t;
}
/**
 * Start slow, speed up, and at the very end slow down again.  This has the
 * same general behavior as {@link module:ol/easing.inAndOut}, but the final
 * slowdown is delayed.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */


function upAndDown(t) {
  if (t < 0.5) {
    return inAndOut(2 * t);
  } else {
    return 1 - inAndOut(2 * (t - 0.5));
  }
}
},{}],"node_modules/ol/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Target = _interopRequireDefault(require("./events/Target.js"));

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

var _TileState = _interopRequireDefault(require("./TileState.js"));

var _util = require("./util.js");

var _easing = require("./easing.js");

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
 * @module ol/Tile
 */


/**
 * A function that takes an {@link module:ol/Tile~Tile} for the tile and a
 * `{string}` for the url as arguments. The default is
 * ```js
 * source.setTileLoadFunction(function(tile, src) {
 *   tile.getImage().src = src;
 * });
 * ```
 * For more fine grained control, the load function can use fetch or XMLHttpRequest and involve
 * error handling:
 *
 * ```js
 * import TileState from 'ol/TileState';
 *
 * source.setTileLoadFunction(function(tile, src) {
 *   var xhr = new XMLHttpRequest();
 *   xhr.responseType = 'blob';
 *   xhr.addEventListener('loadend', function (evt) {
 *     var data = this.response;
 *     if (data !== undefined) {
 *       tile.getImage().src = URL.createObjectURL(data);
 *     } else {
 *       tile.setState(TileState.ERROR);
 *     }
 *   });
 *   xhr.addEventListener('error', function () {
 *     tile.setState(TileState.ERROR);
 *   });
 *   xhr.open('GET', src);
 *   xhr.send();
 * });
 * ```
 *
 * @typedef {function(Tile, string): void} LoadFunction
 * @api
 */

/**
 * {@link module:ol/source/Tile~TileSource} sources use a function of this type to get
 * the url that provides a tile for a given tile coordinate.
 *
 * This function takes an {@link module:ol/tilecoord~TileCoord} for the tile
 * coordinate, a `{number}` representing the pixel ratio and a
 * {@link module:ol/proj/Projection~Projection} for the projection  as arguments
 * and returns a `{string}` representing the tile URL, or undefined if no tile
 * should be requested for the passed tile coordinate.
 *
 * @typedef {function(import("./tilecoord.js").TileCoord, number,
 *           import("./proj/Projection.js").default): (string|undefined)} UrlFunction
 * @api
 */

/**
 * @typedef {Object} Options
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 * @api
 */

/**
 * @classdesc
 * Base class for tiles.
 *
 * @abstract
 */
var Tile =
/** @class */
function (_super) {
  __extends(Tile, _super);
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {Options} [opt_options] Tile options.
   */


  function Tile(tileCoord, state, opt_options) {
    var _this = _super.call(this) || this;

    var options = opt_options ? opt_options : {};
    /**
     * @type {import("./tilecoord.js").TileCoord}
     */

    _this.tileCoord = tileCoord;
    /**
     * @protected
     * @type {import("./TileState.js").default}
     */

    _this.state = state;
    /**
     * An "interim" tile for this tile. The interim tile may be used while this
     * one is loading, for "smooth" transitions when changing params/dimensions
     * on the source.
     * @type {Tile}
     */

    _this.interimTile = null;
    /**
     * A key assigned to the tile. This is used by the tile source to determine
     * if this tile can effectively be used, or if a new tile should be created
     * and this one be used as an interim tile for this new tile.
     * @type {string}
     */

    _this.key = '';
    /**
     * The duration for the opacity transition.
     * @type {number}
     */

    _this.transition_ = options.transition === undefined ? 250 : options.transition;
    /**
     * Lookup of start times for rendering transitions.  If the start time is
     * equal to -1, the transition is complete.
     * @type {Object<string, number>}
     */

    _this.transitionStarts_ = {};
    /**
     * @type {boolean}
     */

    _this.interpolate = !!options.interpolate;
    return _this;
  }
  /**
   * @protected
   */


  Tile.prototype.changed = function () {
    this.dispatchEvent(_EventType.default.CHANGE);
  };
  /**
   * Called by the tile cache when the tile is removed from the cache due to expiry
   */


  Tile.prototype.release = function () {};
  /**
   * @return {string} Key.
   */


  Tile.prototype.getKey = function () {
    return this.key + '/' + this.tileCoord;
  };
  /**
   * Get the interim tile most suitable for rendering using the chain of interim
   * tiles. This corresponds to the  most recent tile that has been loaded, if no
   * such tile exists, the original tile is returned.
   * @return {!Tile} Best tile for rendering.
   */


  Tile.prototype.getInterimTile = function () {
    if (!this.interimTile) {
      //empty chain
      return this;
    }

    var tile = this.interimTile; // find the first loaded tile and return it. Since the chain is sorted in
    // decreasing order of creation time, there is no need to search the remainder
    // of the list (all those tiles correspond to older requests and will be
    // cleaned up by refreshInterimChain)

    do {
      if (tile.getState() == _TileState.default.LOADED) {
        // Show tile immediately instead of fading it in after loading, because
        // the interim tile is in place already
        this.transition_ = 0;
        return tile;
      }

      tile = tile.interimTile;
    } while (tile); // we can not find a better tile


    return this;
  };
  /**
   * Goes through the chain of interim tiles and discards sections of the chain
   * that are no longer relevant.
   */


  Tile.prototype.refreshInterimChain = function () {
    if (!this.interimTile) {
      return;
    }

    var tile = this.interimTile;
    /**
     * @type {Tile}
     */

    var prev = this;

    do {
      if (tile.getState() == _TileState.default.LOADED) {
        //we have a loaded tile, we can discard the rest of the list
        //we would could abort any LOADING tile request
        //older than this tile (i.e. any LOADING tile following this entry in the chain)
        tile.interimTile = null;
        break;
      } else if (tile.getState() == _TileState.default.LOADING) {
        //keep this LOADING tile any loaded tiles later in the chain are
        //older than this tile, so we're still interested in the request
        prev = tile;
      } else if (tile.getState() == _TileState.default.IDLE) {
        //the head of the list is the most current tile, we don't need
        //to start any other requests for this chain
        prev.interimTile = tile.interimTile;
      } else {
        prev = tile;
      }

      tile = prev.interimTile;
    } while (tile);
  };
  /**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */


  Tile.prototype.getTileCoord = function () {
    return this.tileCoord;
  };
  /**
   * @return {import("./TileState.js").default} State.
   */


  Tile.prototype.getState = function () {
    return this.state;
  };
  /**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {import("./TileState.js").default} state State.
   * @api
   */


  Tile.prototype.setState = function (state) {
    if (this.state !== _TileState.default.ERROR && this.state > state) {
      throw new Error('Tile load sequence violation');
    }

    this.state = state;
    this.changed();
  };
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */


  Tile.prototype.load = function () {
    (0, _util.abstract)();
  };
  /**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */


  Tile.prototype.getAlpha = function (id, time) {
    if (!this.transition_) {
      return 1;
    }

    var start = this.transitionStarts_[id];

    if (!start) {
      start = time;
      this.transitionStarts_[id] = start;
    } else if (start === -1) {
      return 1;
    }

    var delta = time - start + 1000 / 60; // avoid rendering at 0

    if (delta >= this.transition_) {
      return 1;
    }

    return (0, _easing.easeIn)(delta / this.transition_);
  };
  /**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */


  Tile.prototype.inTransition = function (id) {
    if (!this.transition_) {
      return false;
    }

    return this.transitionStarts_[id] !== -1;
  };
  /**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */


  Tile.prototype.endTransition = function (id) {
    if (this.transition_) {
      this.transitionStarts_[id] = -1;
    }
  };

  return Tile;
}(_Target.default);

var _default = Tile;
exports.default = _default;
},{"./events/Target.js":"node_modules/ol/events/Target.js","./events/EventType.js":"node_modules/ol/events/EventType.js","./TileState.js":"node_modules/ol/TileState.js","./util.js":"node_modules/ol/util.js","./easing.js":"node_modules/ol/easing.js"}],"node_modules/ol/ImageBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Target = _interopRequireDefault(require("./events/Target.js"));

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

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
 * @module ol/ImageBase
 */


/**
 * @abstract
 */
var ImageBase =
/** @class */
function (_super) {
  __extends(ImageBase, _super);
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|undefined} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("./ImageState.js").default} state State.
   */


  function ImageBase(extent, resolution, pixelRatio, state) {
    var _this = _super.call(this) || this;
    /**
     * @protected
     * @type {import("./extent.js").Extent}
     */


    _this.extent = extent;
    /**
     * @private
     * @type {number}
     */

    _this.pixelRatio_ = pixelRatio;
    /**
     * @protected
     * @type {number|undefined}
     */

    _this.resolution = resolution;
    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */

    _this.state = state;
    return _this;
  }
  /**
   * @protected
   */


  ImageBase.prototype.changed = function () {
    this.dispatchEvent(_EventType.default.CHANGE);
  };
  /**
   * @return {import("./extent.js").Extent} Extent.
   */


  ImageBase.prototype.getExtent = function () {
    return this.extent;
  };
  /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   */


  ImageBase.prototype.getImage = function () {
    return (0, _util.abstract)();
  };
  /**
   * @return {number} PixelRatio.
   */


  ImageBase.prototype.getPixelRatio = function () {
    return this.pixelRatio_;
  };
  /**
   * @return {number} Resolution.
   */


  ImageBase.prototype.getResolution = function () {
    return (
      /** @type {number} */
      this.resolution
    );
  };
  /**
   * @return {import("./ImageState.js").default} State.
   */


  ImageBase.prototype.getState = function () {
    return this.state;
  };
  /**
   * Load not yet loaded URI.
   * @abstract
   */


  ImageBase.prototype.load = function () {
    (0, _util.abstract)();
  };

  return ImageBase;
}(_Target.default);

var _default = ImageBase;
exports.default = _default;
},{"./events/Target.js":"node_modules/ol/events/Target.js","./events/EventType.js":"node_modules/ol/events/EventType.js","./util.js":"node_modules/ol/util.js"}],"node_modules/ol/Image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.listenImage = listenImage;

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

var _ImageBase = _interopRequireDefault(require("./ImageBase.js"));

var _ImageState = _interopRequireDefault(require("./ImageState.js"));

var _has = require("./has.js");

var _extent = require("./extent.js");

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
 * @module ol/Image
 */


/**
 * A function that takes an {@link module:ol/Image~ImageWrapper} for the image and a
 * `{string}` for the src as arguments. It is supposed to make it so the
 * underlying image {@link module:ol/Image~ImageWrapper#getImage} is assigned the
 * content specified by the src. If not specified, the default is
 *
 *     function(image, src) {
 *       image.getImage().src = src;
 *     }
 *
 * Providing a custom `imageLoadFunction` can be useful to load images with
 * post requests or - in general - through XHR requests, where the src of the
 * image element would be set to a data URI when the content is loaded.
 *
 * @typedef {function(ImageWrapper, string): void} LoadFunction
 * @api
 */
var ImageWrapper =
/** @class */
function (_super) {
  __extends(ImageWrapper, _super);
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|undefined} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {LoadFunction} imageLoadFunction Image load function.
   */


  function ImageWrapper(extent, resolution, pixelRatio, src, crossOrigin, imageLoadFunction) {
    var _this = _super.call(this, extent, resolution, pixelRatio, _ImageState.default.IDLE) || this;
    /**
     * @private
     * @type {string}
     */


    _this.src_ = src;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
     */

    _this.image_ = new Image();

    if (crossOrigin !== null) {
      _this.image_.crossOrigin = crossOrigin;
    }
    /**
     * @private
     * @type {?function():void}
     */


    _this.unlisten_ = null;
    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */

    _this.state = _ImageState.default.IDLE;
    /**
     * @private
     * @type {LoadFunction}
     */

    _this.imageLoadFunction_ = imageLoadFunction;
    return _this;
  }
  /**
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */


  ImageWrapper.prototype.getImage = function () {
    return this.image_;
  };
  /**
   * Tracks loading or read errors.
   *
   * @private
   */


  ImageWrapper.prototype.handleImageError_ = function () {
    this.state = _ImageState.default.ERROR;
    this.unlistenImage_();
    this.changed();
  };
  /**
   * Tracks successful image load.
   *
   * @private
   */


  ImageWrapper.prototype.handleImageLoad_ = function () {
    if (this.resolution === undefined) {
      this.resolution = (0, _extent.getHeight)(this.extent) / this.image_.height;
    }

    this.state = _ImageState.default.LOADED;
    this.unlistenImage_();
    this.changed();
  };
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @api
   */


  ImageWrapper.prototype.load = function () {
    if (this.state == _ImageState.default.IDLE || this.state == _ImageState.default.ERROR) {
      this.state = _ImageState.default.LOADING;
      this.changed();
      this.imageLoadFunction_(this, this.src_);
      this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  /**
   * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
   */


  ImageWrapper.prototype.setImage = function (image) {
    this.image_ = image;
    this.resolution = (0, _extent.getHeight)(this.extent) / this.image_.height;
  };
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */


  ImageWrapper.prototype.unlistenImage_ = function () {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };

  return ImageWrapper;
}(_ImageBase.default);
/**
 * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image element.
 * @param {function():any} loadHandler Load callback function.
 * @param {function():any} errorHandler Error callback function.
 * @return {function():void} Callback to stop listening.
 */


function listenImage(image, loadHandler, errorHandler) {
  var img =
  /** @type {HTMLImageElement} */
  image;
  var listening = true;
  var decoding = false;
  var loaded = false;
  var listenerKeys = [(0, _events.listenOnce)(img, _EventType.default.LOAD, function () {
    loaded = true;

    if (!decoding) {
      loadHandler();
    }
  })];

  if (img.src && _has.IMAGE_DECODE) {
    decoding = true;
    img.decode().then(function () {
      if (listening) {
        loadHandler();
      }
    }).catch(function (error) {
      if (listening) {
        if (loaded) {
          loadHandler();
        } else {
          errorHandler();
        }
      }
    });
  } else {
    listenerKeys.push((0, _events.listenOnce)(img, _EventType.default.ERROR, errorHandler));
  }

  return function unlisten() {
    listening = false;
    listenerKeys.forEach(_events.unlistenByKey);
  };
}

var _default = ImageWrapper;
exports.default = _default;
},{"./events/EventType.js":"node_modules/ol/events/EventType.js","./ImageBase.js":"node_modules/ol/ImageBase.js","./ImageState.js":"node_modules/ol/ImageState.js","./has.js":"node_modules/ol/has.js","./extent.js":"node_modules/ol/extent.js","./events.js":"node_modules/ol/events.js"}],"node_modules/ol/ImageTile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Tile = _interopRequireDefault(require("./Tile.js"));

var _TileState = _interopRequireDefault(require("./TileState.js"));

var _dom = require("./dom.js");

var _Image = require("./Image.js");

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
 * @module ol/ImageTile
 */


var ImageTile =
/** @class */
function (_super) {
  __extends(ImageTile, _super);
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [opt_options] Tile options.
   */


  function ImageTile(tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {
    var _this = _super.call(this, tileCoord, state, opt_options) || this;
    /**
     * @private
     * @type {?string}
     */


    _this.crossOrigin_ = crossOrigin;
    /**
     * Image URI
     *
     * @private
     * @type {string}
     */

    _this.src_ = src;
    _this.key = src;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */

    _this.image_ = new Image();

    if (crossOrigin !== null) {
      _this.image_.crossOrigin = crossOrigin;
    }
    /**
     * @private
     * @type {?function():void}
     */


    _this.unlisten_ = null;
    /**
     * @private
     * @type {import("./Tile.js").LoadFunction}
     */

    _this.tileLoadFunction_ = tileLoadFunction;
    return _this;
  }
  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */


  ImageTile.prototype.getImage = function () {
    return this.image_;
  };
  /**
   * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
   * @param {HTMLCanvasElement|HTMLImageElement} element Element.
   */


  ImageTile.prototype.setImage = function (element) {
    this.image_ = element;
    this.state = _TileState.default.LOADED;
    this.unlistenImage_();
    this.changed();
  };
  /**
   * Tracks loading or read errors.
   *
   * @private
   */


  ImageTile.prototype.handleImageError_ = function () {
    this.state = _TileState.default.ERROR;
    this.unlistenImage_();
    this.image_ = getBlankImage();
    this.changed();
  };
  /**
   * Tracks successful image load.
   *
   * @private
   */


  ImageTile.prototype.handleImageLoad_ = function () {
    var image =
    /** @type {HTMLImageElement} */
    this.image_;

    if (image.naturalWidth && image.naturalHeight) {
      this.state = _TileState.default.LOADED;
    } else {
      this.state = _TileState.default.EMPTY;
    }

    this.unlistenImage_();
    this.changed();
  };
  /**
   * Load not yet loaded URI.
   * @api
   */


  ImageTile.prototype.load = function () {
    if (this.state == _TileState.default.ERROR) {
      this.state = _TileState.default.IDLE;
      this.image_ = new Image();

      if (this.crossOrigin_ !== null) {
        this.image_.crossOrigin = this.crossOrigin_;
      }
    }

    if (this.state == _TileState.default.IDLE) {
      this.state = _TileState.default.LOADING;
      this.changed();
      this.tileLoadFunction_(this, this.src_);
      this.unlisten_ = (0, _Image.listenImage)(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  };
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */


  ImageTile.prototype.unlistenImage_ = function () {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  };

  return ImageTile;
}(_Tile.default);
/**
 * Get a 1-pixel blank image.
 * @return {HTMLCanvasElement} Blank image.
 */


function getBlankImage() {
  var ctx = (0, _dom.createCanvasContext2D)(1, 1);
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 1, 1);
  return ctx.canvas;
}

var _default = ImageTile;
exports.default = _default;
},{"./Tile.js":"node_modules/ol/Tile.js","./TileState.js":"node_modules/ol/TileState.js","./dom.js":"node_modules/ol/dom.js","./Image.js":"node_modules/ol/Image.js"}],"node_modules/ol/reproj/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_THRESHOLD = exports.ENABLE_RASTER_REPROJECTION = void 0;

/**
 * @module ol/reproj/common
 */

/**
 * Default maximum allowed threshold  (in pixels) for reprojection
 * triangulation.
 * @type {number}
 */
var ERROR_THRESHOLD = 0.5;
/**
 * Enable automatic reprojection of raster sources. Default is `true`.
 * TODO: decide if we want to expose this as a build flag or remove it
 * @type {boolean}
 */

exports.ERROR_THRESHOLD = ERROR_THRESHOLD;
var ENABLE_RASTER_REPROJECTION = true;
exports.ENABLE_RASTER_REPROJECTION = ENABLE_RASTER_REPROJECTION;
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
},{"./Units.js":"node_modules/ol/proj/Units.js"}],"node_modules/ol/proj/epsg3857.js":[function(require,module,exports) {
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
},{"../obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/string.js":[function(require,module,exports) {
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
},{"./proj/Projection.js":"node_modules/ol/proj/Projection.js","./proj/Units.js":"node_modules/ol/proj/Units.js","./proj/epsg3857.js":"node_modules/ol/proj/epsg3857.js","./proj/epsg4326.js":"node_modules/ol/proj/epsg4326.js","./proj/projections.js":"node_modules/ol/proj/projections.js","./proj/transforms.js":"node_modules/ol/proj/transforms.js","./extent.js":"node_modules/ol/extent.js","./math.js":"node_modules/ol/math.js","./coordinate.js":"node_modules/ol/coordinate.js","./sphere.js":"node_modules/ol/sphere.js"}],"node_modules/ol/reproj/Triangulation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extent = require("../extent.js");

var _proj = require("../proj.js");

var _math = require("../math.js");

/**
 * @module ol/reproj/Triangulation
 */

/**
 * Single triangle; consists of 3 source points and 3 target points.
 * @typedef {Object} Triangle
 * @property {Array<import("../coordinate.js").Coordinate>} source Source.
 * @property {Array<import("../coordinate.js").Coordinate>} target Target.
 */

/**
 * Maximum number of subdivision steps during raster reprojection triangulation.
 * Prevents high memory usage and large number of proj4 calls (for certain
 * transformations and areas). At most `2*(2^this)` triangles are created for
 * each triangulated extent (tile/image).
 * @type {number}
 */
var MAX_SUBDIVISION = 10;
/**
 * Maximum allowed size of triangle relative to world width. When transforming
 * corners of world extent between certain projections, the resulting
 * triangulation seems to have zero error and no subdivision is performed. If
 * the triangle width is more than this (relative to world width; 0-1),
 * subdivison is forced (up to `MAX_SUBDIVISION`). Default is `0.25`.
 * @type {number}
 */

var MAX_TRIANGLE_WIDTH = 0.25;
/**
 * @classdesc
 * Class containing triangulation of the given target extent.
 * Used for determining source data and the reprojection itself.
 */

var Triangulation =
/** @class */
function () {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
   * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
   * @param {number} errorThreshold Acceptable error (in source units).
   * @param {?number} opt_destinationResolution The (optional) resolution of the destination.
   */
  function Triangulation(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, opt_destinationResolution) {
    /**
     * @type {import("../proj/Projection.js").default}
     * @private
     */
    this.sourceProj_ = sourceProj;
    /**
     * @type {import("../proj/Projection.js").default}
     * @private
     */

    this.targetProj_ = targetProj;
    /** @type {!Object<string, import("../coordinate.js").Coordinate>} */

    var transformInvCache = {};
    var transformInv = (0, _proj.getTransform)(this.targetProj_, this.sourceProj_);
    /**
     * @param {import("../coordinate.js").Coordinate} c A coordinate.
     * @return {import("../coordinate.js").Coordinate} Transformed coordinate.
     * @private
     */

    this.transformInv_ = function (c) {
      var key = c[0] + '/' + c[1];

      if (!transformInvCache[key]) {
        transformInvCache[key] = transformInv(c);
      }

      return transformInvCache[key];
    };
    /**
     * @type {import("../extent.js").Extent}
     * @private
     */


    this.maxSourceExtent_ = maxSourceExtent;
    /**
     * @type {number}
     * @private
     */

    this.errorThresholdSquared_ = errorThreshold * errorThreshold;
    /**
     * @type {Array<Triangle>}
     * @private
     */

    this.triangles_ = [];
    /**
     * Indicates that the triangulation crosses edge of the source projection.
     * @type {boolean}
     * @private
     */

    this.wrapsXInSource_ = false;
    /**
     * @type {boolean}
     * @private
     */

    this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && (0, _extent.getWidth)(maxSourceExtent) == (0, _extent.getWidth)(this.sourceProj_.getExtent());
    /**
     * @type {?number}
     * @private
     */

    this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? (0, _extent.getWidth)(this.sourceProj_.getExtent()) : null;
    /**
     * @type {?number}
     * @private
     */

    this.targetWorldWidth_ = this.targetProj_.getExtent() ? (0, _extent.getWidth)(this.targetProj_.getExtent()) : null;
    var destinationTopLeft = (0, _extent.getTopLeft)(targetExtent);
    var destinationTopRight = (0, _extent.getTopRight)(targetExtent);
    var destinationBottomRight = (0, _extent.getBottomRight)(targetExtent);
    var destinationBottomLeft = (0, _extent.getBottomLeft)(targetExtent);
    var sourceTopLeft = this.transformInv_(destinationTopLeft);
    var sourceTopRight = this.transformInv_(destinationTopRight);
    var sourceBottomRight = this.transformInv_(destinationBottomRight);
    var sourceBottomLeft = this.transformInv_(destinationBottomLeft);
    /*
     * The maxSubdivision controls how many splittings of the target area can
     * be done. The idea here is to do a linear mapping of the target areas
     * but the actual overal reprojection (can be) extremely non-linear. The
     * default value of MAX_SUBDIVISION was chosen based on mapping a 256x256
     * tile size. However this function is also called to remap canvas rendered
     * layers which can be much larger. This calculation increases the maxSubdivision
     * value by the right factor so that each 256x256 pixel area has
     * MAX_SUBDIVISION divisions.
     */

    var maxSubdivision = MAX_SUBDIVISION + (opt_destinationResolution ? Math.max(0, Math.ceil((0, _math.log2)((0, _extent.getArea)(targetExtent) / (opt_destinationResolution * opt_destinationResolution * 256 * 256)))) : 0);
    this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);

    if (this.wrapsXInSource_) {
      var leftBound_1 = Infinity;
      this.triangles_.forEach(function (triangle, i, arr) {
        leftBound_1 = Math.min(leftBound_1, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
      }); // Shift triangles to be as close to `leftBound` as possible
      // (if the distance is more than `worldWidth / 2` it can be closer.

      this.triangles_.forEach(function (triangle) {
        if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound_1 > this.sourceWorldWidth_ / 2) {
          var newTriangle = [[triangle.source[0][0], triangle.source[0][1]], [triangle.source[1][0], triangle.source[1][1]], [triangle.source[2][0], triangle.source[2][1]]];

          if (newTriangle[0][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[0][0] -= this.sourceWorldWidth_;
          }

          if (newTriangle[1][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[1][0] -= this.sourceWorldWidth_;
          }

          if (newTriangle[2][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
            newTriangle[2][0] -= this.sourceWorldWidth_;
          } // Rarely (if the extent contains both the dateline and prime meridian)
          // the shift can in turn break some triangles.
          // Detect this here and don't shift in such cases.


          var minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
          var maxX = Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);

          if (maxX - minX < this.sourceWorldWidth_ / 2) {
            triangle.source = newTriangle;
          }
        }
      }.bind(this));
    }

    transformInvCache = {};
  }
  /**
   * Adds triangle to the triangulation.
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @private
   */


  Triangulation.prototype.addTriangle_ = function (a, b, c, aSrc, bSrc, cSrc) {
    this.triangles_.push({
      source: [aSrc, bSrc, cSrc],
      target: [a, b, c]
    });
  };
  /**
   * Adds quad (points in clock-wise order) to the triangulation
   * (and reprojects the vertices) if valid.
   * Performs quad subdivision if needed to increase precision.
   *
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
   * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
   * @private
   */


  Triangulation.prototype.addQuad_ = function (a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
    var sourceQuadExtent = (0, _extent.boundingExtent)([aSrc, bSrc, cSrc, dSrc]);
    var sourceCoverageX = this.sourceWorldWidth_ ? (0, _extent.getWidth)(sourceQuadExtent) / this.sourceWorldWidth_ : null;
    var sourceWorldWidth =
    /** @type {number} */
    this.sourceWorldWidth_; // when the quad is wrapped in the source projection
    // it covers most of the projection extent, but not fully

    var wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > 0.5 && sourceCoverageX < 1;
    var needsSubdivision = false;

    if (maxSubdivision > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        var targetQuadExtent = (0, _extent.boundingExtent)([a, b, c, d]);
        var targetCoverageX = (0, _extent.getWidth)(targetQuadExtent) / this.targetWorldWidth_;
        needsSubdivision = targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
      }

      if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
        needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
      }
    }

    if (!needsSubdivision && this.maxSourceExtent_) {
      if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
        if (!(0, _extent.intersects)(sourceQuadExtent, this.maxSourceExtent_)) {
          // whole quad outside source projection extent -> ignore
          return;
        }
      }
    }

    var isNotFinite = 0;

    if (!needsSubdivision) {
      if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) {
        if (maxSubdivision > 0) {
          needsSubdivision = true;
        } else {
          // It might be the case that only 1 of the points is infinite. In this case
          // we can draw a single triangle with the other three points
          isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);

          if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) {
            return;
          }
        }
      }
    }

    if (maxSubdivision > 0) {
      if (!needsSubdivision) {
        var center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
        var centerSrc = this.transformInv_(center);
        var dx = void 0;

        if (wrapsX) {
          var centerSrcEstimX = ((0, _math.modulo)(aSrc[0], sourceWorldWidth) + (0, _math.modulo)(cSrc[0], sourceWorldWidth)) / 2;
          dx = centerSrcEstimX - (0, _math.modulo)(centerSrc[0], sourceWorldWidth);
        } else {
          dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
        }

        var dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
        var centerSrcErrorSquared = dx * dx + dy * dy;
        needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
      }

      if (needsSubdivision) {
        if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
          // split horizontally (top & bottom)
          var bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
          var bcSrc = this.transformInv_(bc);
          var da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
          var daSrc = this.transformInv_(da);
          this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
          this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
        } else {
          // split vertically (left & right)
          var ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          var abSrc = this.transformInv_(ab);
          var cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
          var cdSrc = this.transformInv_(cd);
          this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
          this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
        }

        return;
      }
    }

    if (wrapsX) {
      if (!this.canWrapXInSource_) {
        return;
      }

      this.wrapsXInSource_ = true;
    } // Exactly zero or one of *Src is not finite
    // The triangles must have the diagonal line as the first side
    // This is to allow easy code in reproj.s to make it straight for broken
    // browsers that can't handle diagonal clipping


    if ((isNotFinite & 0xb) == 0) {
      this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
    }

    if ((isNotFinite & 0xe) == 0) {
      this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
    }

    if (isNotFinite) {
      // Try the other two triangles
      if ((isNotFinite & 0xd) == 0) {
        this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
      }

      if ((isNotFinite & 0x7) == 0) {
        this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
      }
    }
  };
  /**
   * Calculates extent of the `source` coordinates from all the triangles.
   *
   * @return {import("../extent.js").Extent} Calculated extent.
   */


  Triangulation.prototype.calculateSourceExtent = function () {
    var extent = (0, _extent.createEmpty)();
    this.triangles_.forEach(function (triangle, i, arr) {
      var src = triangle.source;
      (0, _extent.extendCoordinate)(extent, src[0]);
      (0, _extent.extendCoordinate)(extent, src[1]);
      (0, _extent.extendCoordinate)(extent, src[2]);
    });
    return extent;
  };
  /**
   * @return {Array<Triangle>} Array of the calculated triangles.
   */


  Triangulation.prototype.getTriangles = function () {
    return this.triangles_;
  };

  return Triangulation;
}();

var _default = Triangulation;
exports.default = _default;
},{"../extent.js":"node_modules/ol/extent.js","../proj.js":"node_modules/ol/proj.js","../math.js":"node_modules/ol/math.js"}],"node_modules/ol/renderer/canvas/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IMAGE_SMOOTHING_ENABLED = exports.IMAGE_SMOOTHING_DISABLED = void 0;

/**
 * @module ol/renderer/canvas/common
 */

/**
 * Context options to disable image smoothing.
 * @type {Object}
 */
var IMAGE_SMOOTHING_DISABLED = {
  imageSmoothingEnabled: false,
  msImageSmoothingEnabled: false
};
/**
 * Context options to enable image smoothing.
 * @type {Object}
 */

exports.IMAGE_SMOOTHING_DISABLED = IMAGE_SMOOTHING_DISABLED;
var IMAGE_SMOOTHING_ENABLED = {
  imageSmoothingEnabled: true,
  msImageSmoothingEnabled: true
};
exports.IMAGE_SMOOTHING_ENABLED = IMAGE_SMOOTHING_ENABLED;
},{}],"node_modules/ol/reproj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSourceExtentResolution = calculateSourceExtentResolution;
exports.calculateSourceResolution = calculateSourceResolution;
exports.render = render;

var _common = require("./renderer/canvas/common.js");

var _obj = require("./obj.js");

var _extent = require("./extent.js");

var _dom = require("./dom.js");

var _proj = require("./proj.js");

var _math = require("./math.js");

/**
 * @module ol/reproj
 */
var brokenDiagonalRendering_;
/**
 * This draws a small triangle into a canvas by setting the triangle as the clip region
 * and then drawing a (too large) rectangle
 *
 * @param {CanvasRenderingContext2D} ctx The context in which to draw the triangle
 * @param {number} u1 The x-coordinate of the second point. The first point is 0,0.
 * @param {number} v1 The y-coordinate of the second point.
 * @param {number} u2 The x-coordinate of the third point.
 * @param {number} v2 The y-coordinate of the third point.
 */

function drawTestTriangle(ctx, u1, v1, u2, v2) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(u1, v1);
  ctx.lineTo(u2, v2);
  ctx.closePath();
  ctx.save();
  ctx.clip();
  ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
  ctx.restore();
}
/**
 * Given the data from getImageData, see if the right values appear at the provided offset.
 * Returns true if either the color or transparency is off
 *
 * @param {Uint8ClampedArray} data The data returned from getImageData
 * @param {number} offset The pixel offset from the start of data.
 * @return {boolean} true if the diagonal rendering is broken
 */


function verifyBrokenDiagonalRendering(data, offset) {
  // the values ought to be close to the rgba(210, 0, 0, 0.75)
  return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - 0.75 * 255) > 2;
}
/**
 * Determines if the current browser configuration can render triangular clip regions correctly.
 * This value is cached so the function is only expensive the first time called.
 * Firefox on Windows (as of now) does not if HWA is enabled. See https://bugzilla.mozilla.org/show_bug.cgi?id=1606976
 * IE also doesn't. Chrome works, and everything seems to work on OSX and Android. This function caches the
 * result. I suppose that it is conceivably possible that a browser might flip modes while the app is
 * running, but lets hope not.
 *
 * @return {boolean} true if the Diagonal Rendering is broken.
 */


function isBrokenDiagonalRendering() {
  if (brokenDiagonalRendering_ === undefined) {
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgba(210, 0, 0, 0.75)';
    drawTestTriangle(ctx, 4, 5, 4, 0);
    drawTestTriangle(ctx, 4, 5, 0, 5);
    var data = ctx.getImageData(0, 0, 3, 3).data;
    brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
  }

  return brokenDiagonalRendering_;
}
/**
 * Calculates ideal resolution to use from the source in order to achieve
 * pixel mapping as close as possible to 1:1 during reprojection.
 * The resolution is calculated regardless of what resolutions
 * are actually available in the dataset (TileGrid, Image, ...).
 *
 * @param {import("./proj/Projection.js").default} sourceProj Source projection.
 * @param {import("./proj/Projection.js").default} targetProj Target projection.
 * @param {import("./coordinate.js").Coordinate} targetCenter Target center.
 * @param {number} targetResolution Target resolution.
 * @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
 */


function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
  var sourceCenter = (0, _proj.transform)(targetCenter, targetProj, sourceProj); // calculate the ideal resolution of the source data

  var sourceResolution = (0, _proj.getPointResolution)(targetProj, targetResolution, targetCenter);
  var targetMetersPerUnit = targetProj.getMetersPerUnit();

  if (targetMetersPerUnit !== undefined) {
    sourceResolution *= targetMetersPerUnit;
  }

  var sourceMetersPerUnit = sourceProj.getMetersPerUnit();

  if (sourceMetersPerUnit !== undefined) {
    sourceResolution /= sourceMetersPerUnit;
  } // Based on the projection properties, the point resolution at the specified
  // coordinates may be slightly different. We need to reverse-compensate this
  // in order to achieve optimal results.


  var sourceExtent = sourceProj.getExtent();

  if (!sourceExtent || (0, _extent.containsCoordinate)(sourceExtent, sourceCenter)) {
    var compensationFactor = (0, _proj.getPointResolution)(sourceProj, sourceResolution, sourceCenter) / sourceResolution;

    if (isFinite(compensationFactor) && compensationFactor > 0) {
      sourceResolution /= compensationFactor;
    }
  }

  return sourceResolution;
}
/**
 * Calculates ideal resolution to use from the source in order to achieve
 * pixel mapping as close as possible to 1:1 during reprojection.
 * The resolution is calculated regardless of what resolutions
 * are actually available in the dataset (TileGrid, Image, ...).
 *
 * @param {import("./proj/Projection.js").default} sourceProj Source projection.
 * @param {import("./proj/Projection.js").default} targetProj Target projection.
 * @param {import("./extent.js").Extent} targetExtent Target extent
 * @param {number} targetResolution Target resolution.
 * @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
 */


function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
  var targetCenter = (0, _extent.getCenter)(targetExtent);
  var sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);

  if (!isFinite(sourceResolution) || sourceResolution <= 0) {
    (0, _extent.forEachCorner)(targetExtent, function (corner) {
      sourceResolution = calculateSourceResolution(sourceProj, targetProj, corner, targetResolution);
      return isFinite(sourceResolution) && sourceResolution > 0;
    });
  }

  return sourceResolution;
}
/**
 * @typedef {Object} ImageExtent
 * @property {import("./extent.js").Extent} extent Extent.
 * @property {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
 */

/**
 * Renders the source data into new canvas based on the triangulation.
 *
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @param {number} pixelRatio Pixel ratio.
 * @param {number} sourceResolution Source resolution.
 * @param {import("./extent.js").Extent} sourceExtent Extent of the data source.
 * @param {number} targetResolution Target resolution.
 * @param {import("./extent.js").Extent} targetExtent Target extent.
 * @param {import("./reproj/Triangulation.js").default} triangulation Calculated triangulation.
 * @param {Array<ImageExtent>} sources Array of sources.
 * @param {number} gutter Gutter of the sources.
 * @param {boolean} [opt_renderEdges] Render reprojection edges.
 * @param {object} [opt_interpolate] Use linear interpolation when resampling.
 * @return {HTMLCanvasElement} Canvas with reprojected data.
 */


function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, opt_renderEdges, opt_interpolate) {
  var context = (0, _dom.createCanvasContext2D)(Math.round(pixelRatio * width), Math.round(pixelRatio * height));

  if (!opt_interpolate) {
    (0, _obj.assign)(context, _common.IMAGE_SMOOTHING_DISABLED);
  }

  if (sources.length === 0) {
    return context.canvas;
  }

  context.scale(pixelRatio, pixelRatio);

  function pixelRound(value) {
    return Math.round(value * pixelRatio) / pixelRatio;
  }

  context.globalCompositeOperation = 'lighter';
  var sourceDataExtent = (0, _extent.createEmpty)();
  sources.forEach(function (src, i, arr) {
    (0, _extent.extend)(sourceDataExtent, src.extent);
  });
  var canvasWidthInUnits = (0, _extent.getWidth)(sourceDataExtent);
  var canvasHeightInUnits = (0, _extent.getHeight)(sourceDataExtent);
  var stitchContext = (0, _dom.createCanvasContext2D)(Math.round(pixelRatio * canvasWidthInUnits / sourceResolution), Math.round(pixelRatio * canvasHeightInUnits / sourceResolution));

  if (!opt_interpolate) {
    (0, _obj.assign)(stitchContext, _common.IMAGE_SMOOTHING_DISABLED);
  }

  var stitchScale = pixelRatio / sourceResolution;
  sources.forEach(function (src, i, arr) {
    var xPos = src.extent[0] - sourceDataExtent[0];
    var yPos = -(src.extent[3] - sourceDataExtent[3]);
    var srcWidth = (0, _extent.getWidth)(src.extent);
    var srcHeight = (0, _extent.getHeight)(src.extent); // This test should never fail -- but it does. Need to find a fix the upstream condition

    if (src.image.width > 0 && src.image.height > 0) {
      stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, xPos * stitchScale, yPos * stitchScale, srcWidth * stitchScale, srcHeight * stitchScale);
    }
  });
  var targetTopLeft = (0, _extent.getTopLeft)(targetExtent);
  triangulation.getTriangles().forEach(function (triangle, i, arr) {
    /* Calculate affine transform (src -> dst)
     * Resulting matrix can be used to transform coordinate
     * from `sourceProjection` to destination pixels.
     *
     * To optimize number of context calls and increase numerical stability,
     * we also do the following operations:
     * trans(-topLeftExtentCorner), scale(1 / targetResolution), scale(1, -1)
     * here before solving the linear system so [ui, vi] are pixel coordinates.
     *
     * Src points: xi, yi
     * Dst points: ui, vi
     * Affine coefficients: aij
     *
     * | x0 y0 1  0  0 0 |   |a00|   |u0|
     * | x1 y1 1  0  0 0 |   |a01|   |u1|
     * | x2 y2 1  0  0 0 | x |a02| = |u2|
     * |  0  0 0 x0 y0 1 |   |a10|   |v0|
     * |  0  0 0 x1 y1 1 |   |a11|   |v1|
     * |  0  0 0 x2 y2 1 |   |a12|   |v2|
     */
    var source = triangle.source;
    var target = triangle.target;
    var x0 = source[0][0],
        y0 = source[0][1];
    var x1 = source[1][0],
        y1 = source[1][1];
    var x2 = source[2][0],
        y2 = source[2][1]; // Make sure that everything is on pixel boundaries

    var u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
    var v0 = pixelRound(-(target[0][1] - targetTopLeft[1]) / targetResolution);
    var u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
    var v1 = pixelRound(-(target[1][1] - targetTopLeft[1]) / targetResolution);
    var u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
    var v2 = pixelRound(-(target[2][1] - targetTopLeft[1]) / targetResolution); // Shift all the source points to improve numerical stability
    // of all the subsequent calculations. The [x0, y0] is used here.
    // This is also used to simplify the linear system.

    var sourceNumericalShiftX = x0;
    var sourceNumericalShiftY = y0;
    x0 = 0;
    y0 = 0;
    x1 -= sourceNumericalShiftX;
    y1 -= sourceNumericalShiftY;
    x2 -= sourceNumericalShiftX;
    y2 -= sourceNumericalShiftY;
    var augmentedMatrix = [[x1, y1, 0, 0, u1 - u0], [x2, y2, 0, 0, u2 - u0], [0, 0, x1, y1, v1 - v0], [0, 0, x2, y2, v2 - v0]];
    var affineCoefs = (0, _math.solveLinearSystem)(augmentedMatrix);

    if (!affineCoefs) {
      return;
    }

    context.save();
    context.beginPath();

    if (isBrokenDiagonalRendering() || !opt_interpolate) {
      // Make sure that all lines are horizontal or vertical
      context.moveTo(u1, v1); // This is the diagonal line. Do it in 4 steps

      var steps = 4;
      var ud = u0 - u1;
      var vd = v0 - v1;

      for (var step = 0; step < steps; step++) {
        // Go horizontally
        context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound(step * vd / (steps - 1))); // Go vertically

        if (step != steps - 1) {
          context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound((step + 1) * vd / (steps - 1)));
        }
      } // We are almost at u0r, v0r


      context.lineTo(u2, v2);
    } else {
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
    }

    context.clip();
    context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
    context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
    context.scale(sourceResolution / pixelRatio, -sourceResolution / pixelRatio);
    context.drawImage(stitchContext.canvas, 0, 0);
    context.restore();
  });

  if (opt_renderEdges) {
    context.save();
    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    triangulation.getTriangles().forEach(function (triangle, i, arr) {
      var target = triangle.target;
      var u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
      var v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
      var u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
      var v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
      var u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
      var v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
      context.beginPath();
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
      context.closePath();
      context.stroke();
    });
    context.restore();
  }

  return context.canvas;
}
},{"./renderer/canvas/common.js":"node_modules/ol/renderer/canvas/common.js","./obj.js":"node_modules/ol/obj.js","./extent.js":"node_modules/ol/extent.js","./dom.js":"node_modules/ol/dom.js","./proj.js":"node_modules/ol/proj.js","./math.js":"node_modules/ol/math.js"}],"node_modules/ol/reproj/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("./common.js");

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _Tile = _interopRequireDefault(require("../Tile.js"));

var _TileState = _interopRequireDefault(require("../TileState.js"));

var _Triangulation = _interopRequireDefault(require("./Triangulation.js"));

var _reproj = require("../reproj.js");

var _math = require("../math.js");

var _extent = require("../extent.js");

var _events = require("../events.js");

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
 * @module ol/reproj/Tile
 */


/**
 * @typedef {function(number, number, number, number) : import("../Tile.js").default} FunctionType
 */

/**
 * @classdesc
 * Class encapsulating single reprojected tile.
 * See {@link module:ol/source/TileImage~TileImage}.
 *
 */
var ReprojTile =
/** @class */
function (_super) {
  __extends(ReprojTile, _super);
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
   * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} gutter Gutter of the source tiles.
   * @param {FunctionType} getTileFunction
   *     Function returning source tiles (z, x, y, pixelRatio).
   * @param {number} [opt_errorThreshold] Acceptable reprojection error (in px).
   * @param {boolean} [opt_renderEdges] Render reprojection edges.
   * @param {boolean} [opt_interpolate] Use linear interpolation when resampling.
   */


  function ReprojTile(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, opt_errorThreshold, opt_renderEdges, opt_interpolate) {
    var _this = _super.call(this, tileCoord, _TileState.default.IDLE, {
      interpolate: !!opt_interpolate
    }) || this;
    /**
     * @private
     * @type {boolean}
     */


    _this.renderEdges_ = opt_renderEdges !== undefined ? opt_renderEdges : false;
    /**
     * @private
     * @type {number}
     */

    _this.pixelRatio_ = pixelRatio;
    /**
     * @private
     * @type {number}
     */

    _this.gutter_ = gutter;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */

    _this.canvas_ = null;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    _this.sourceTileGrid_ = sourceTileGrid;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    _this.targetTileGrid_ = targetTileGrid;
    /**
     * @private
     * @type {import("../tilecoord.js").TileCoord}
     */

    _this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
    /**
     * @private
     * @type {!Array<import("../Tile.js").default>}
     */

    _this.sourceTiles_ = [];
    /**
     * @private
     * @type {?Array<import("../events.js").EventsKey>}
     */

    _this.sourcesListenerKeys_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.sourceZ_ = 0;
    var targetExtent = targetTileGrid.getTileCoordExtent(_this.wrappedTileCoord_);

    var maxTargetExtent = _this.targetTileGrid_.getExtent();

    var maxSourceExtent = _this.sourceTileGrid_.getExtent();

    var limitedTargetExtent = maxTargetExtent ? (0, _extent.getIntersection)(targetExtent, maxTargetExtent) : targetExtent;

    if ((0, _extent.getArea)(limitedTargetExtent) === 0) {
      // Tile is completely outside range -> EMPTY
      // TODO: is it actually correct that the source even creates the tile ?
      _this.state = _TileState.default.EMPTY;
      return _this;
    }

    var sourceProjExtent = sourceProj.getExtent();

    if (sourceProjExtent) {
      if (!maxSourceExtent) {
        maxSourceExtent = sourceProjExtent;
      } else {
        maxSourceExtent = (0, _extent.getIntersection)(maxSourceExtent, sourceProjExtent);
      }
    }

    var targetResolution = targetTileGrid.getResolution(_this.wrappedTileCoord_[0]);
    var sourceResolution = (0, _reproj.calculateSourceExtentResolution)(sourceProj, targetProj, limitedTargetExtent, targetResolution);

    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      // invalid sourceResolution -> EMPTY
      // probably edges of the projections when no extent is defined
      _this.state = _TileState.default.EMPTY;
      return _this;
    }

    var errorThresholdInPixels = opt_errorThreshold !== undefined ? opt_errorThreshold : _common.ERROR_THRESHOLD;
    /**
     * @private
     * @type {!import("./Triangulation.js").default}
     */

    _this.triangulation_ = new _Triangulation.default(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);

    if (_this.triangulation_.getTriangles().length === 0) {
      // no valid triangles -> EMPTY
      _this.state = _TileState.default.EMPTY;
      return _this;
    }

    _this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);

    var sourceExtent = _this.triangulation_.calculateSourceExtent();

    if (maxSourceExtent) {
      if (sourceProj.canWrapX()) {
        sourceExtent[1] = (0, _math.clamp)(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
        sourceExtent[3] = (0, _math.clamp)(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
      } else {
        sourceExtent = (0, _extent.getIntersection)(sourceExtent, maxSourceExtent);
      }
    }

    if (!(0, _extent.getArea)(sourceExtent)) {
      _this.state = _TileState.default.EMPTY;
    } else {
      var sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(sourceExtent, _this.sourceZ_);

      for (var srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
        for (var srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
          var tile = getTileFunction(_this.sourceZ_, srcX, srcY, pixelRatio);

          if (tile) {
            _this.sourceTiles_.push(tile);
          }
        }
      }

      if (_this.sourceTiles_.length === 0) {
        _this.state = _TileState.default.EMPTY;
      }
    }

    return _this;
  }
  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */


  ReprojTile.prototype.getImage = function () {
    return this.canvas_;
  };
  /**
   * @private
   */


  ReprojTile.prototype.reproject_ = function () {
    var sources = [];
    this.sourceTiles_.forEach(function (tile, i, arr) {
      if (tile && tile.getState() == _TileState.default.LOADED) {
        sources.push({
          extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
          image: tile.getImage()
        });
      }
    }.bind(this));
    this.sourceTiles_.length = 0;

    if (sources.length === 0) {
      this.state = _TileState.default.ERROR;
    } else {
      var z = this.wrappedTileCoord_[0];
      var size = this.targetTileGrid_.getTileSize(z);
      var width = typeof size === 'number' ? size : size[0];
      var height = typeof size === 'number' ? size : size[1];
      var targetResolution = this.targetTileGrid_.getResolution(z);
      var sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
      var targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
      this.canvas_ = (0, _reproj.render)(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_, this.interpolate);
      this.state = _TileState.default.LOADED;
    }

    this.changed();
  };
  /**
   * Load not yet loaded URI.
   */


  ReprojTile.prototype.load = function () {
    if (this.state == _TileState.default.IDLE) {
      this.state = _TileState.default.LOADING;
      this.changed();
      var leftToLoad_1 = 0;
      this.sourcesListenerKeys_ = [];
      this.sourceTiles_.forEach(function (tile, i, arr) {
        var state = tile.getState();

        if (state == _TileState.default.IDLE || state == _TileState.default.LOADING) {
          leftToLoad_1++;
          var sourceListenKey_1 = (0, _events.listen)(tile, _EventType.default.CHANGE, function (e) {
            var state = tile.getState();

            if (state == _TileState.default.LOADED || state == _TileState.default.ERROR || state == _TileState.default.EMPTY) {
              (0, _events.unlistenByKey)(sourceListenKey_1);
              leftToLoad_1--;

              if (leftToLoad_1 === 0) {
                this.unlistenSources_();
                this.reproject_();
              }
            }
          }, this);
          this.sourcesListenerKeys_.push(sourceListenKey_1);
        }
      }.bind(this));

      if (leftToLoad_1 === 0) {
        setTimeout(this.reproject_.bind(this), 0);
      } else {
        this.sourceTiles_.forEach(function (tile, i, arr) {
          var state = tile.getState();

          if (state == _TileState.default.IDLE) {
            tile.load();
          }
        });
      }
    }
  };
  /**
   * @private
   */


  ReprojTile.prototype.unlistenSources_ = function () {
    this.sourcesListenerKeys_.forEach(_events.unlistenByKey);
    this.sourcesListenerKeys_ = null;
  };

  return ReprojTile;
}(_Tile.default);

var _default = ReprojTile;
exports.default = _default;
},{"./common.js":"node_modules/ol/reproj/common.js","../events/EventType.js":"node_modules/ol/events/EventType.js","../Tile.js":"node_modules/ol/Tile.js","../TileState.js":"node_modules/ol/TileState.js","./Triangulation.js":"node_modules/ol/reproj/Triangulation.js","../reproj.js":"node_modules/ol/reproj.js","../math.js":"node_modules/ol/math.js","../extent.js":"node_modules/ol/extent.js","../events.js":"node_modules/ol/events.js"}],"node_modules/ol/TileRange.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrUpdate = createOrUpdate;
exports.default = void 0;

/**
 * @module ol/TileRange
 */

/**
 * A representation of a contiguous block of tiles.  A tile range is specified
 * by its min/max tile coordinates and is inclusive of coordinates.
 */
var TileRange =
/** @class */
function () {
  /**
   * @param {number} minX Minimum X.
   * @param {number} maxX Maximum X.
   * @param {number} minY Minimum Y.
   * @param {number} maxY Maximum Y.
   */
  function TileRange(minX, maxX, minY, maxY) {
    /**
     * @type {number}
     */
    this.minX = minX;
    /**
     * @type {number}
     */

    this.maxX = maxX;
    /**
     * @type {number}
     */

    this.minY = minY;
    /**
     * @type {number}
     */

    this.maxY = maxY;
  }
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {boolean} Contains tile coordinate.
   */


  TileRange.prototype.contains = function (tileCoord) {
    return this.containsXY(tileCoord[1], tileCoord[2]);
  };
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Contains.
   */


  TileRange.prototype.containsTileRange = function (tileRange) {
    return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
  };
  /**
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @return {boolean} Contains coordinate.
   */


  TileRange.prototype.containsXY = function (x, y) {
    return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
  };
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Equals.
   */


  TileRange.prototype.equals = function (tileRange) {
    return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
  };
  /**
   * @param {TileRange} tileRange Tile range.
   */


  TileRange.prototype.extend = function (tileRange) {
    if (tileRange.minX < this.minX) {
      this.minX = tileRange.minX;
    }

    if (tileRange.maxX > this.maxX) {
      this.maxX = tileRange.maxX;
    }

    if (tileRange.minY < this.minY) {
      this.minY = tileRange.minY;
    }

    if (tileRange.maxY > this.maxY) {
      this.maxY = tileRange.maxY;
    }
  };
  /**
   * @return {number} Height.
   */


  TileRange.prototype.getHeight = function () {
    return this.maxY - this.minY + 1;
  };
  /**
   * @return {import("./size.js").Size} Size.
   */


  TileRange.prototype.getSize = function () {
    return [this.getWidth(), this.getHeight()];
  };
  /**
   * @return {number} Width.
   */


  TileRange.prototype.getWidth = function () {
    return this.maxX - this.minX + 1;
  };
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Intersects.
   */


  TileRange.prototype.intersects = function (tileRange) {
    return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
  };

  return TileRange;
}();
/**
 * @param {number} minX Minimum X.
 * @param {number} maxX Maximum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxY Maximum Y.
 * @param {TileRange} [tileRange] TileRange.
 * @return {TileRange} Tile range.
 */


function createOrUpdate(minX, maxX, minY, maxY, tileRange) {
  if (tileRange !== undefined) {
    tileRange.minX = minX;
    tileRange.maxX = maxX;
    tileRange.minY = minY;
    tileRange.maxY = maxY;
    return tileRange;
  } else {
    return new TileRange(minX, maxX, minY, maxY);
  }
}

var _default = TileRange;
exports.default = _default;
},{}],"node_modules/ol/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buffer = buffer;
exports.hasArea = hasArea;
exports.scale = scale;
exports.toSize = toSize;

/**
 * @module ol/size
 */

/**
 * An array of numbers representing a size: `[width, height]`.
 * @typedef {Array<number>} Size
 * @api
 */

/**
 * Returns a buffered size.
 * @param {Size} size Size.
 * @param {number} num The amount by which to buffer.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} The buffered size.
 */
function buffer(size, num, opt_size) {
  if (opt_size === undefined) {
    opt_size = [0, 0];
  }

  opt_size[0] = size[0] + 2 * num;
  opt_size[1] = size[1] + 2 * num;
  return opt_size;
}
/**
 * Determines if a size has a positive area.
 * @param {Size} size The size to test.
 * @return {boolean} The size has a positive area.
 */


function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
}
/**
 * Returns a size scaled by a ratio. The result will be an array of integers.
 * @param {Size} size Size.
 * @param {number} ratio Ratio.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} The scaled size.
 */


function scale(size, ratio, opt_size) {
  if (opt_size === undefined) {
    opt_size = [0, 0];
  }

  opt_size[0] = size[0] * ratio + 0.5 | 0;
  opt_size[1] = size[1] * ratio + 0.5 | 0;
  return opt_size;
}
/**
 * Returns an `Size` array for the passed in number (meaning: square) or
 * `Size` array.
 * (meaning: non-square),
 * @param {number|Size} size Width and height.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} Size.
 * @api
 */


function toSize(size, opt_size) {
  if (Array.isArray(size)) {
    return size;
  } else {
    if (opt_size === undefined) {
      opt_size = [size, size];
    } else {
      opt_size[0] = size;
      opt_size[1] = size;
    }

    return opt_size;
  }
}
},{}],"node_modules/ol/renderer/canvas/TileLayer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Layer = _interopRequireDefault(require("./Layer.js"));

var _ImageTile = _interopRequireDefault(require("../../ImageTile.js"));

var _Tile = _interopRequireDefault(require("../../reproj/Tile.js"));

var _TileRange = _interopRequireDefault(require("../../TileRange.js"));

var _TileState = _interopRequireDefault(require("../../TileState.js"));

var _common = require("./common.js");

var _transform = require("../../transform.js");

var _obj = require("../../obj.js");

var _extent = require("../../extent.js");

var _css = require("../../css.js");

var _proj = require("../../proj.js");

var _util = require("../../util.js");

var _array = require("../../array.js");

var _size = require("../../size.js");

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
 * @module ol/renderer/canvas/TileLayer
 */


/**
 * @classdesc
 * Canvas renderer for tile layers.
 * @api
 * @template {import("../../layer/Tile.js").default<import("../../source/Tile.js").default>|import("../../layer/VectorTile.js").default} [LayerType=import("../../layer/Tile.js").default<import("../../source/Tile.js").default>|import("../../layer/VectorTile.js").default]
 * @extends {CanvasLayerRenderer<LayerType>}
 */
var CanvasTileLayerRenderer =
/** @class */
function (_super) {
  __extends(CanvasTileLayerRenderer, _super);
  /**
   * @param {LayerType} tileLayer Tile layer.
   */


  function CanvasTileLayerRenderer(tileLayer) {
    var _this = _super.call(this, tileLayer) || this;
    /**
     * Rendered extent has changed since the previous `renderFrame()` call
     * @type {boolean}
     */


    _this.extentChanged = true;
    /**
     * @private
     * @type {?import("../../extent.js").Extent}
     */

    _this.renderedExtent_ = null;
    /**
     * @protected
     * @type {number}
     */

    _this.renderedPixelRatio;
    /**
     * @protected
     * @type {import("../../proj/Projection.js").default}
     */

    _this.renderedProjection = null;
    /**
     * @protected
     * @type {number}
     */

    _this.renderedRevision;
    /**
     * @protected
     * @type {!Array<import("../../Tile.js").default>}
     */

    _this.renderedTiles = [];
    /**
     * @private
     * @type {boolean}
     */

    _this.newTiles_ = false;
    /**
     * @protected
     * @type {import("../../extent.js").Extent}
     */

    _this.tmpExtent = (0, _extent.createEmpty)();
    /**
     * @private
     * @type {import("../../TileRange.js").default}
     */

    _this.tmpTileRange_ = new _TileRange.default(0, 0, 0, 0);
    return _this;
  }
  /**
   * @protected
   * @param {import("../../Tile.js").default} tile Tile.
   * @return {boolean} Tile is drawable.
   */


  CanvasTileLayerRenderer.prototype.isDrawableTile = function (tile) {
    var tileLayer = this.getLayer();
    var tileState = tile.getState();
    var useInterimTilesOnError = tileLayer.getUseInterimTilesOnError();
    return tileState == _TileState.default.LOADED || tileState == _TileState.default.EMPTY || tileState == _TileState.default.ERROR && !useInterimTilesOnError;
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {!import("../../Tile.js").default} Tile.
   */


  CanvasTileLayerRenderer.prototype.getTile = function (z, x, y, frameState) {
    var pixelRatio = frameState.pixelRatio;
    var projection = frameState.viewState.projection;
    var tileLayer = this.getLayer();
    var tileSource = tileLayer.getSource();
    var tile = tileSource.getTile(z, x, y, pixelRatio, projection);

    if (tile.getState() == _TileState.default.ERROR) {
      if (!tileLayer.getUseInterimTilesOnError()) {
        // When useInterimTilesOnError is false, we consider the error tile as loaded.
        tile.setState(_TileState.default.LOADED);
      } else if (tileLayer.getPreload() > 0) {
        // Preloaded tiles for lower resolutions might have finished loading.
        this.newTiles_ = true;
      }
    }

    if (!this.isDrawableTile(tile)) {
      tile = tile.getInterimTile();
    }

    return tile;
  };
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray} Data at the pixel location.
   */


  CanvasTileLayerRenderer.prototype.getData = function (pixel) {
    var frameState = this.frameState;

    if (!frameState) {
      return null;
    }

    var layer = this.getLayer();
    var coordinate = (0, _transform.apply)(frameState.pixelToCoordinateTransform, pixel.slice());
    var layerExtent = layer.getExtent();

    if (layerExtent) {
      if (!(0, _extent.containsCoordinate)(layerExtent, coordinate)) {
        return null;
      }
    }

    var pixelRatio = frameState.pixelRatio;
    var projection = frameState.viewState.projection;
    var viewState = frameState.viewState;
    var source = layer.getRenderSource();
    var tileGrid = source.getTileGridForProjection(viewState.projection);
    var tilePixelRatio = source.getTilePixelRatio(frameState.pixelRatio);

    for (var z = tileGrid.getZForResolution(viewState.resolution); z >= tileGrid.getMinZoom(); --z) {
      var tileCoord = tileGrid.getTileCoordForCoordAndZ(coordinate, z);
      var tile = source.getTile(z, tileCoord[1], tileCoord[2], pixelRatio, projection);

      if (!(tile instanceof _ImageTile.default || tile instanceof _Tile.default)) {
        return null;
      }

      if (tile.getState() !== _TileState.default.LOADED) {
        continue;
      }

      var tileOrigin = tileGrid.getOrigin(z);
      var tileSize = (0, _size.toSize)(tileGrid.getTileSize(z));
      var tileResolution = tileGrid.getResolution(z);
      var col = Math.floor(tilePixelRatio * ((coordinate[0] - tileOrigin[0]) / tileResolution - tileCoord[1] * tileSize[0]));
      var row = Math.floor(tilePixelRatio * ((tileOrigin[1] - coordinate[1]) / tileResolution - tileCoord[2] * tileSize[1]));
      return this.getImageData(tile.getImage(), col, row);
    }

    return null;
  };
  /**
   * @param {Object<number, Object<string, import("../../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */


  CanvasTileLayerRenderer.prototype.loadedTileCallback = function (tiles, zoom, tile) {
    if (this.isDrawableTile(tile)) {
      return _super.prototype.loadedTileCallback.call(this, tiles, zoom, tile);
    }

    return false;
  };
  /**
   * Determine whether render should be called.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */


  CanvasTileLayerRenderer.prototype.prepareFrame = function (frameState) {
    return !!this.getLayer().getSource();
  };
  /**
   * Render the layer.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */


  CanvasTileLayerRenderer.prototype.renderFrame = function (frameState, target) {
    var layerState = frameState.layerStatesArray[frameState.layerIndex];
    var viewState = frameState.viewState;
    var projection = viewState.projection;
    var viewResolution = viewState.resolution;
    var viewCenter = viewState.center;
    var rotation = viewState.rotation;
    var pixelRatio = frameState.pixelRatio;
    var tileLayer = this.getLayer();
    var tileSource = tileLayer.getSource();
    var sourceRevision = tileSource.getRevision();
    var tileGrid = tileSource.getTileGridForProjection(projection);
    var z = tileGrid.getZForResolution(viewResolution, tileSource.zDirection);
    var tileResolution = tileGrid.getResolution(z);
    var extent = frameState.extent;
    var layerExtent = layerState.extent && (0, _proj.fromUserExtent)(layerState.extent, projection);

    if (layerExtent) {
      extent = (0, _extent.getIntersection)(extent, (0, _proj.fromUserExtent)(layerState.extent, projection));
    }

    var tilePixelRatio = tileSource.getTilePixelRatio(pixelRatio); // desired dimensions of the canvas in pixels

    var width = Math.round(frameState.size[0] * tilePixelRatio);
    var height = Math.round(frameState.size[1] * tilePixelRatio);

    if (rotation) {
      var size = Math.round(Math.sqrt(width * width + height * height));
      width = size;
      height = size;
    }

    var dx = tileResolution * width / 2 / tilePixelRatio;
    var dy = tileResolution * height / 2 / tilePixelRatio;
    var canvasExtent = [viewCenter[0] - dx, viewCenter[1] - dy, viewCenter[0] + dx, viewCenter[1] + dy];
    var tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z);
    /**
     * @type {Object<number, Object<string, import("../../Tile.js").default>>}
     */

    var tilesToDrawByZ = {};
    tilesToDrawByZ[z] = {};
    var findLoadedTiles = this.createLoadedTileFinder(tileSource, projection, tilesToDrawByZ);
    var tmpExtent = this.tmpExtent;
    var tmpTileRange = this.tmpTileRange_;
    this.newTiles_ = false;

    for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
        var tile = this.getTile(z, x, y, frameState);

        if (this.isDrawableTile(tile)) {
          var uid = (0, _util.getUid)(this);

          if (tile.getState() == _TileState.default.LOADED) {
            tilesToDrawByZ[z][tile.tileCoord.toString()] = tile;
            var inTransition = tile.inTransition(uid);

            if (!this.newTiles_ && (inTransition || this.renderedTiles.indexOf(tile) === -1)) {
              this.newTiles_ = true;
            }
          }

          if (tile.getAlpha(uid, frameState.time) === 1) {
            // don't look for alt tiles if alpha is 1
            continue;
          }
        }

        var childTileRange = tileGrid.getTileCoordChildTileRange(tile.tileCoord, tmpTileRange, tmpExtent);
        var covered = false;

        if (childTileRange) {
          covered = findLoadedTiles(z + 1, childTileRange);
        }

        if (!covered) {
          tileGrid.forEachTileCoordParentTileRange(tile.tileCoord, findLoadedTiles, tmpTileRange, tmpExtent);
        }
      }
    }

    var canvasScale = tileResolution / viewResolution; // set forward and inverse pixel transforms

    (0, _transform.compose)(this.pixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / tilePixelRatio, 1 / tilePixelRatio, rotation, -width / 2, -height / 2);
    var canvasTransform = (0, _transform.toString)(this.pixelTransform);
    this.useContainer(target, canvasTransform, layerState.opacity, this.getBackground(frameState));
    var context = this.context;
    var canvas = context.canvas;
    (0, _transform.makeInverse)(this.inversePixelTransform, this.pixelTransform); // set scale transform for calculating tile positions on the canvas

    (0, _transform.compose)(this.tempTransform, width / 2, height / 2, canvasScale, canvasScale, 0, -width / 2, -height / 2);

    if (canvas.width != width || canvas.height != height) {
      canvas.width = width;
      canvas.height = height;
    } else if (!this.containerReused) {
      context.clearRect(0, 0, width, height);
    }

    if (layerExtent) {
      this.clipUnrotated(context, frameState, layerExtent);
    }

    if (!tileSource.getInterpolate()) {
      (0, _obj.assign)(context, _common.IMAGE_SMOOTHING_DISABLED);
    }

    this.preRender(context, frameState);
    this.renderedTiles.length = 0;
    /** @type {Array<number>} */

    var zs = Object.keys(tilesToDrawByZ).map(Number);
    zs.sort(_array.numberSafeCompareFunction);
    var clips, clipZs, currentClip;

    if (layerState.opacity === 1 && (!this.containerReused || tileSource.getOpaque(frameState.viewState.projection))) {
      zs = zs.reverse();
    } else {
      clips = [];
      clipZs = [];
    }

    for (var i = zs.length - 1; i >= 0; --i) {
      var currentZ = zs[i];
      var currentTilePixelSize = tileSource.getTilePixelSize(currentZ, pixelRatio, projection);
      var currentResolution = tileGrid.getResolution(currentZ);
      var currentScale = currentResolution / tileResolution;
      var dx_1 = currentTilePixelSize[0] * currentScale * canvasScale;
      var dy_1 = currentTilePixelSize[1] * currentScale * canvasScale;
      var originTileCoord = tileGrid.getTileCoordForCoordAndZ((0, _extent.getTopLeft)(canvasExtent), currentZ);
      var originTileExtent = tileGrid.getTileCoordExtent(originTileCoord);
      var origin_1 = (0, _transform.apply)(this.tempTransform, [tilePixelRatio * (originTileExtent[0] - canvasExtent[0]) / tileResolution, tilePixelRatio * (canvasExtent[3] - originTileExtent[3]) / tileResolution]);
      var tileGutter = tilePixelRatio * tileSource.getGutterForProjection(projection);
      var tilesToDraw = tilesToDrawByZ[currentZ];

      for (var tileCoordKey in tilesToDraw) {
        var tile =
        /** @type {import("../../ImageTile.js").default} */
        tilesToDraw[tileCoordKey];
        var tileCoord = tile.tileCoord; // Calculate integer positions and sizes so that tiles align

        var xIndex = originTileCoord[1] - tileCoord[1];
        var nextX = Math.round(origin_1[0] - (xIndex - 1) * dx_1);
        var yIndex = originTileCoord[2] - tileCoord[2];
        var nextY = Math.round(origin_1[1] - (yIndex - 1) * dy_1);
        var x = Math.round(origin_1[0] - xIndex * dx_1);
        var y = Math.round(origin_1[1] - yIndex * dy_1);
        var w = nextX - x;
        var h = nextY - y;
        var transition = z === currentZ;
        var inTransition = transition && tile.getAlpha((0, _util.getUid)(this), frameState.time) !== 1;
        var contextSaved = false;

        if (!inTransition) {
          if (clips) {
            // Clip mask for regions in this tile that already filled by a higher z tile
            currentClip = [x, y, x + w, y, x + w, y + h, x, y + h];

            for (var i_1 = 0, ii = clips.length; i_1 < ii; ++i_1) {
              if (z !== currentZ && currentZ < clipZs[i_1]) {
                var clip = clips[i_1];

                if ((0, _extent.intersects)([x, y, x + w, y + h], [clip[0], clip[3], clip[4], clip[7]])) {
                  if (!contextSaved) {
                    context.save();
                    contextSaved = true;
                  }

                  context.beginPath(); // counter-clockwise (outer ring) for current tile

                  context.moveTo(currentClip[0], currentClip[1]);
                  context.lineTo(currentClip[2], currentClip[3]);
                  context.lineTo(currentClip[4], currentClip[5]);
                  context.lineTo(currentClip[6], currentClip[7]); // clockwise (inner ring) for higher z tile

                  context.moveTo(clip[6], clip[7]);
                  context.lineTo(clip[4], clip[5]);
                  context.lineTo(clip[2], clip[3]);
                  context.lineTo(clip[0], clip[1]);
                  context.clip();
                }
              }
            }

            clips.push(currentClip);
            clipZs.push(currentZ);
          } else {
            context.clearRect(x, y, w, h);
          }
        }

        this.drawTileImage(tile, frameState, x, y, w, h, tileGutter, transition);

        if (clips && !inTransition) {
          if (contextSaved) {
            context.restore();
          }

          this.renderedTiles.unshift(tile);
        } else {
          this.renderedTiles.push(tile);
        }

        this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
      }
    }

    this.renderedRevision = sourceRevision;
    this.renderedResolution = tileResolution;
    this.extentChanged = !this.renderedExtent_ || !(0, _extent.equals)(this.renderedExtent_, canvasExtent);
    this.renderedExtent_ = canvasExtent;
    this.renderedPixelRatio = pixelRatio;
    this.renderedProjection = projection;
    this.manageTilePyramid(frameState, tileSource, tileGrid, pixelRatio, projection, extent, z, tileLayer.getPreload());
    this.scheduleExpireCache(frameState, tileSource);
    this.postRender(context, frameState);

    if (layerState.extent) {
      context.restore();
    }

    (0, _obj.assign)(context, _common.IMAGE_SMOOTHING_ENABLED);

    if (canvasTransform !== canvas.style.transform) {
      canvas.style.transform = canvasTransform;
    }

    var opacity = (0, _css.cssOpacity)(layerState.opacity);
    var container = this.container;

    if (opacity !== container.style.opacity) {
      container.style.opacity = opacity;
    }

    return this.container;
  };
  /**
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   */


  CanvasTileLayerRenderer.prototype.drawTileImage = function (tile, frameState, x, y, w, h, gutter, transition) {
    var image = this.getTileImage(tile);

    if (!image) {
      return;
    }

    var uid = (0, _util.getUid)(this);
    var alpha = transition ? tile.getAlpha(uid, frameState.time) : 1;
    var alphaChanged = alpha !== this.context.globalAlpha;

    if (alphaChanged) {
      this.context.save();
      this.context.globalAlpha = alpha;
    }

    this.context.drawImage(image, gutter, gutter, image.width - 2 * gutter, image.height - 2 * gutter, x, y, w, h);

    if (alphaChanged) {
      this.context.restore();
    }

    if (alpha !== 1) {
      frameState.animate = true;
    } else if (transition) {
      tile.endTransition(uid);
    }
  };
  /**
   * @return {HTMLCanvasElement} Image
   */


  CanvasTileLayerRenderer.prototype.getImage = function () {
    var context = this.context;
    return context ? context.canvas : null;
  };
  /**
   * Get the image from a tile.
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @protected
   */


  CanvasTileLayerRenderer.prototype.getTileImage = function (tile) {
    return tile.getImage();
  };
  /**
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @protected
   */


  CanvasTileLayerRenderer.prototype.scheduleExpireCache = function (frameState, tileSource) {
    if (tileSource.canExpireCache()) {
      /**
       * @param {import("../../source/Tile.js").default} tileSource Tile source.
       * @param {import("../../PluggableMap.js").default} map Map.
       * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
       */
      var postRenderFunction = function (tileSource, map, frameState) {
        var tileSourceKey = (0, _util.getUid)(tileSource);

        if (tileSourceKey in frameState.usedTiles) {
          tileSource.expireCache(frameState.viewState.projection, frameState.usedTiles[tileSourceKey]);
        }
      }.bind(null, tileSource);

      frameState.postRenderFunctions.push(
      /** @type {import("../../PluggableMap.js").PostRenderFunction} */
      postRenderFunction);
    }
  };
  /**
   * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import('../../Tile.js').default} tile Tile.
   * @protected
   */


  CanvasTileLayerRenderer.prototype.updateUsedTiles = function (usedTiles, tileSource, tile) {
    // FIXME should we use tilesToDrawByZ instead?
    var tileSourceKey = (0, _util.getUid)(tileSource);

    if (!(tileSourceKey in usedTiles)) {
      usedTiles[tileSourceKey] = {};
    }

    usedTiles[tileSourceKey][tile.getKey()] = true;
  };
  /**
   * Manage tile pyramid.
   * This function performs a number of functions related to the tiles at the
   * current zoom and lower zoom levels:
   * - registers idle tiles in frameState.wantedTiles so that they are not
   *   discarded by the tile queue
   * - enqueues missing tiles
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid Tile grid.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection.js").default} projection Projection.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {number} currentZ Current Z.
   * @param {number} preload Load low resolution tiles up to `preload` levels.
   * @param {function(import("../../Tile.js").default):void} [opt_tileCallback] Tile callback.
   * @protected
   */


  CanvasTileLayerRenderer.prototype.manageTilePyramid = function (frameState, tileSource, tileGrid, pixelRatio, projection, extent, currentZ, preload, opt_tileCallback) {
    var tileSourceKey = (0, _util.getUid)(tileSource);

    if (!(tileSourceKey in frameState.wantedTiles)) {
      frameState.wantedTiles[tileSourceKey] = {};
    }

    var wantedTiles = frameState.wantedTiles[tileSourceKey];
    var tileQueue = frameState.tileQueue;
    var minZoom = tileGrid.getMinZoom();
    var tileCount = 0;
    var tile, tileRange, tileResolution, x, y, z;

    for (z = minZoom; z <= currentZ; ++z) {
      tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, tileRange);
      tileResolution = tileGrid.getResolution(z);

      for (x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (y = tileRange.minY; y <= tileRange.maxY; ++y) {
          if (currentZ - z <= preload) {
            ++tileCount;
            tile = tileSource.getTile(z, x, y, pixelRatio, projection);

            if (tile.getState() == _TileState.default.IDLE) {
              wantedTiles[tile.getKey()] = true;

              if (!tileQueue.isKeyQueued(tile.getKey())) {
                tileQueue.enqueue([tile, tileSourceKey, tileGrid.getTileCoordCenter(tile.tileCoord), tileResolution]);
              }
            }

            if (opt_tileCallback !== undefined) {
              opt_tileCallback(tile);
            }
          } else {
            tileSource.useTile(z, x, y, projection);
          }
        }
      }
    }

    tileSource.updateCacheSize(tileCount, projection);
  };

  return CanvasTileLayerRenderer;
}(_Layer.default);

var _default = CanvasTileLayerRenderer;
exports.default = _default;
},{"./Layer.js":"node_modules/ol/renderer/canvas/Layer.js","../../ImageTile.js":"node_modules/ol/ImageTile.js","../../reproj/Tile.js":"node_modules/ol/reproj/Tile.js","../../TileRange.js":"node_modules/ol/TileRange.js","../../TileState.js":"node_modules/ol/TileState.js","./common.js":"node_modules/ol/renderer/canvas/common.js","../../transform.js":"node_modules/ol/transform.js","../../obj.js":"node_modules/ol/obj.js","../../extent.js":"node_modules/ol/extent.js","../../css.js":"node_modules/ol/css.js","../../proj.js":"node_modules/ol/proj.js","../../util.js":"node_modules/ol/util.js","../../array.js":"node_modules/ol/array.js","../../size.js":"node_modules/ol/size.js"}],"node_modules/ol/layer/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseTile = _interopRequireDefault(require("./BaseTile.js"));

var _TileLayer = _interopRequireDefault(require("../renderer/canvas/TileLayer.js"));

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
 * @module ol/layer/Tile
 */


/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Tile.js").default} TileSourceType
 * @extends BaseTileLayer<TileSourceType, CanvasTileLayerRenderer>
 * @api
 */
var TileLayer =
/** @class */
function (_super) {
  __extends(TileLayer, _super);
  /**
   * @param {import("./BaseTile.js").Options<TileSourceType>} [opt_options] Tile layer options.
   */


  function TileLayer(opt_options) {
    return _super.call(this, opt_options) || this;
  }

  TileLayer.prototype.createRenderer = function () {
    return new _TileLayer.default(this);
  };

  return TileLayer;
}(_BaseTile.default);

var _default = TileLayer;
exports.default = _default;
},{"./BaseTile.js":"node_modules/ol/layer/BaseTile.js","../renderer/canvas/TileLayer.js":"node_modules/ol/renderer/canvas/TileLayer.js"}],"node_modules/ol/ViewHint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ViewHint
 */

/**
 * @enum {number}
 */
var _default = {
  ANIMATING: 0,
  INTERACTING: 1
};
exports.default = _default;
},{}],"node_modules/ol/ViewProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ViewProperty
 */

/**
 * @enum {string}
 */
var _default = {
  CENTER: 'center',
  RESOLUTION: 'resolution',
  ROTATION: 'rotation'
};
exports.default = _default;
},{}],"node_modules/ol/tilegrid/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_TILE_SIZE = exports.DEFAULT_MAX_ZOOM = void 0;

/**
 * @module ol/tilegrid/common
 */

/**
 * Default maximum zoom for default tile grids.
 * @type {number}
 */
var DEFAULT_MAX_ZOOM = 42;
/**
 * Default tile size.
 * @type {number}
 */

exports.DEFAULT_MAX_ZOOM = DEFAULT_MAX_ZOOM;
var DEFAULT_TILE_SIZE = 256;
exports.DEFAULT_TILE_SIZE = DEFAULT_TILE_SIZE;
},{}],"node_modules/ol/centerconstraint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExtent = createExtent;
exports.none = none;

var _math = require("./math.js");

/**
 * @module ol/centerconstraint
 */

/**
 * @typedef {function((import("./coordinate.js").Coordinate|undefined), number, import("./size.js").Size, boolean=, Array<number>=): (import("./coordinate.js").Coordinate|undefined)} Type
 */

/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {boolean} onlyCenter If true, the constraint will only apply to the view center.
 * @param {boolean} smooth If true, the view will be able to go slightly out of the given extent
 * (only during interaction and animation).
 * @return {Type} The constraint.
 */
function createExtent(extent, onlyCenter, smooth) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number|undefined} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [opt_centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function (center, resolution, size, opt_isMoving, opt_centerShift) {
      if (!center) {
        return undefined;
      }

      if (!resolution && !onlyCenter) {
        return center;
      }

      var viewWidth = onlyCenter ? 0 : size[0] * resolution;
      var viewHeight = onlyCenter ? 0 : size[1] * resolution;
      var shiftX = opt_centerShift ? opt_centerShift[0] : 0;
      var shiftY = opt_centerShift ? opt_centerShift[1] : 0;
      var minX = extent[0] + viewWidth / 2 + shiftX;
      var maxX = extent[2] - viewWidth / 2 + shiftX;
      var minY = extent[1] + viewHeight / 2 + shiftY;
      var maxY = extent[3] - viewHeight / 2 + shiftY; // note: when zooming out of bounds, min and max values for x and y may
      // end up inverted (min > max); this has to be accounted for

      if (minX > maxX) {
        minX = (maxX + minX) / 2;
        maxX = minX;
      }

      if (minY > maxY) {
        minY = (maxY + minY) / 2;
        maxY = minY;
      }

      var x = (0, _math.clamp)(center[0], minX, maxX);
      var y = (0, _math.clamp)(center[1], minY, maxY); // during an interaction, allow some overscroll

      if (opt_isMoving && smooth && resolution) {
        var ratio = 30 * resolution;
        x += -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) + ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
        y += -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) + ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
      }

      return [x, y];
    }
  );
}
/**
 * @param {import("./coordinate.js").Coordinate} [center] Center.
 * @return {import("./coordinate.js").Coordinate|undefined} Center.
 */


function none(center) {
  return center;
}
},{"./math.js":"node_modules/ol/math.js"}],"node_modules/ol/resolutionconstraint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMinMaxResolution = createMinMaxResolution;
exports.createSnapToPower = createSnapToPower;
exports.createSnapToResolutions = createSnapToResolutions;

var _math = require("./math.js");

var _extent = require("./extent.js");

var _array = require("./array.js");

/**
 * @module ol/resolutionconstraint
 */

/**
 * @typedef {function((number|undefined), number, import("./size.js").Size, boolean=): (number|undefined)} Type
 */

/**
 * Returns a modified resolution taking into account the viewport size and maximum
 * allowed extent.
 * @param {number} resolution Resolution
 * @param {import("./extent.js").Extent} maxExtent Maximum allowed extent.
 * @param {import("./size.js").Size} viewportSize Viewport size.
 * @param {boolean} showFullExtent Whether to show the full extent.
 * @return {number} Capped resolution.
 */
function getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
  var xResolution = (0, _extent.getWidth)(maxExtent) / viewportSize[0];
  var yResolution = (0, _extent.getHeight)(maxExtent) / viewportSize[1];

  if (showFullExtent) {
    return Math.min(resolution, Math.max(xResolution, yResolution));
  }

  return Math.min(resolution, Math.min(xResolution, yResolution));
}
/**
 * Returns a modified resolution to be between maxResolution and minResolution while
 * still allowing the value to be slightly out of bounds.
 * Note: the computation is based on the logarithm function (ln):
 *  - at 1, ln(x) is 0
 *  - above 1, ln(x) keeps increasing but at a much slower pace than x
 * The final result is clamped to prevent getting too far away from bounds.
 * @param {number} resolution Resolution.
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @return {number} Smoothed resolution.
 */


function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
  var result = Math.min(resolution, maxResolution);
  var ratio = 50;
  result *= Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio + 1;

  if (minResolution) {
    result = Math.max(result, minResolution);
    result /= Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) / ratio + 1;
  }

  return (0, _math.clamp)(result, minResolution / 2, maxResolution * 2);
}
/**
 * @param {Array<number>} resolutions Resolutions.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */


function createSnapToResolutions(resolutions, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
      if (resolution !== undefined) {
        var maxResolution = resolutions[0];
        var minResolution = resolutions[resolutions.length - 1];
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution; // during interacting or animating, allow intermediary values

        if (opt_isMoving) {
          var smooth = opt_smooth !== undefined ? opt_smooth : true;

          if (!smooth) {
            return (0, _math.clamp)(resolution, minResolution, cappedMaxRes);
          }

          return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }

        var capped = Math.min(cappedMaxRes, resolution);
        var z = Math.floor((0, _array.linearFindNearest)(resolutions, capped, direction));

        if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) {
          return resolutions[z + 1];
        }

        return resolutions[z];
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {number} power Power.
 * @param {number} maxResolution Maximum resolution.
 * @param {number} [opt_minResolution] Minimum resolution.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */


function createSnapToPower(power, maxResolution, opt_minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
      if (resolution !== undefined) {
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        var minResolution = opt_minResolution !== undefined ? opt_minResolution : 0; // during interacting or animating, allow intermediary values

        if (opt_isMoving) {
          var smooth = opt_smooth !== undefined ? opt_smooth : true;

          if (!smooth) {
            return (0, _math.clamp)(resolution, minResolution, cappedMaxRes);
          }

          return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }

        var tolerance = 1e-9;
        var minZoomLevel = Math.ceil(Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance);
        var offset = -direction * (0.5 - tolerance) + 0.5;
        var capped = Math.min(cappedMaxRes, resolution);
        var cappedZoomLevel = Math.floor(Math.log(maxResolution / capped) / Math.log(power) + offset);
        var zoomLevel = Math.max(minZoomLevel, cappedZoomLevel);
        var newResolution = maxResolution / Math.pow(power, zoomLevel);
        return (0, _math.clamp)(newResolution, minResolution, cappedMaxRes);
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */


function createMinMaxResolution(maxResolution, minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
      if (resolution !== undefined) {
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        var smooth = opt_smooth !== undefined ? opt_smooth : true;

        if (!smooth || !opt_isMoving) {
          return (0, _math.clamp)(resolution, minResolution, cappedMaxRes);
        }

        return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
      } else {
        return undefined;
      }
    }
  );
}
},{"./math.js":"node_modules/ol/math.js","./extent.js":"node_modules/ol/extent.js","./array.js":"node_modules/ol/array.js"}],"node_modules/ol/rotationconstraint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSnapToN = createSnapToN;
exports.createSnapToZero = createSnapToZero;
exports.disable = disable;
exports.none = none;

var _math = require("./math.js");

/**
 * @module ol/rotationconstraint
 */

/**
 * @typedef {function((number|undefined), boolean=): (number|undefined)} Type
 */

/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */
function disable(rotation) {
  if (rotation !== undefined) {
    return 0;
  } else {
    return undefined;
  }
}
/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */


function none(rotation) {
  if (rotation !== undefined) {
    return rotation;
  } else {
    return undefined;
  }
}
/**
 * @param {number} n N.
 * @return {Type} Rotation constraint.
 */


function createSnapToN(n) {
  var theta = 2 * Math.PI / n;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function (rotation, opt_isMoving) {
      if (opt_isMoving) {
        return rotation;
      }

      if (rotation !== undefined) {
        rotation = Math.floor(rotation / theta + 0.5) * theta;
        return rotation;
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {number} [opt_tolerance] Tolerance.
 * @return {Type} Rotation constraint.
 */


function createSnapToZero(opt_tolerance) {
  var tolerance = opt_tolerance || (0, _math.toRadians)(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [opt_isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function (rotation, opt_isMoving) {
      if (opt_isMoving) {
        return rotation;
      }

      if (rotation !== undefined) {
        if (Math.abs(rotation) <= tolerance) {
          return 0;
        } else {
          return rotation;
        }
      } else {
        return undefined;
      }
    }
  );
}
},{"./math.js":"node_modules/ol/math.js"}],"node_modules/ol/geom/GeometryLayout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/geom/GeometryLayout
 */

/**
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available. Supported values are `'XY'`,
 * `'XYZ'`, `'XYM'`, `'XYZM'`.
 * @enum {string}
 */
var _default = {
  XY: 'XY',
  XYZ: 'XYZ',
  XYM: 'XYM',
  XYZM: 'XYZM'
};
exports.default = _default;
},{}],"node_modules/ol/geom/flat/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotate = rotate;
exports.scale = scale;
exports.transform2D = transform2D;
exports.translate = translate;

/**
 * @module ol/geom/flat/transform
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../transform.js").Transform} transform Transform.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
function transform2D(flatCoordinates, offset, end, stride, transform, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var x = flatCoordinates[j];
    var y = flatCoordinates[j + 1];
    dest[i++] = transform[0] * x + transform[2] * y + transform[4];
    dest[i++] = transform[1] * x + transform[3] * y + transform[5];
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} angle Angle.
 * @param {Array<number>} anchor Rotation anchor point.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */


function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + deltaX * cos - deltaY * sin;
    dest[i++] = anchorY + deltaX * sin + deltaY * cos;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * Scale the coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} sx Scale factor in the x-direction.
 * @param {number} sy Scale factor in the y-direction.
 * @param {Array<number>} anchor Scale anchor point.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */


function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + sx * deltaX;
    dest[i++] = anchorY + sy * deltaY;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} deltaX Delta X.
 * @param {number} deltaY Delta Y.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */


function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    dest[i++] = flatCoordinates[j] + deltaX;
    dest[i++] = flatCoordinates[j + 1] + deltaY;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
},{}],"node_modules/ol/geom/Geometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Object = _interopRequireDefault(require("../Object.js"));

var _Units = _interopRequireDefault(require("../proj/Units.js"));

var _util = require("../util.js");

var _transform = require("../transform.js");

var _extent = require("../extent.js");

var _proj = require("../proj.js");

var _functions = require("../functions.js");

var _transform2 = require("./flat/transform.js");

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
 * @module ol/geom/Geometry
 */


/**
 * @type {import("../transform.js").Transform}
 */
var tmpTransform = (0, _transform.create)();
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * To get notified of changes to the geometry, register a listener for the
 * generic `change` event on your geometry instance.
 *
 * @abstract
 * @api
 */

var Geometry =
/** @class */
function (_super) {
  __extends(Geometry, _super);

  function Geometry() {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */


    _this.extent_ = (0, _extent.createEmpty)();
    /**
     * @private
     * @type {number}
     */

    _this.extentRevision_ = -1;
    /**
     * @protected
     * @type {number}
     */

    _this.simplifiedGeometryMaxMinSquaredTolerance = 0;
    /**
     * @protected
     * @type {number}
     */

    _this.simplifiedGeometryRevision = 0;
    /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} revision The geometry revision.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
     * @return {Geometry} Simplified geometry.
     */

    _this.simplifyTransformedInternal = (0, _functions.memoizeOne)(function (revision, squaredTolerance, opt_transform) {
      if (!opt_transform) {
        return this.getSimplifiedGeometry(squaredTolerance);
      }

      var clone = this.clone();
      clone.applyTransform(opt_transform);
      return clone.getSimplifiedGeometry(squaredTolerance);
    });
    return _this;
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */


  Geometry.prototype.simplifyTransformed = function (squaredTolerance, opt_transform) {
    return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, opt_transform);
  };
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */


  Geometry.prototype.clone = function () {
    return (0, _util.abstract)();
  };
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  Geometry.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    return (0, _util.abstract)();
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */


  Geometry.prototype.containsXY = function (x, y) {
    var coord = this.getClosestPoint([x, y]);
    return coord[0] === x && coord[1] === y;
  };
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [opt_closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */


  Geometry.prototype.getClosestPoint = function (point, opt_closestPoint) {
    var closestPoint = opt_closestPoint ? opt_closestPoint : [NaN, NaN];
    this.closestPointXY(point[0], point[1], closestPoint, Infinity);
    return closestPoint;
  };
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */


  Geometry.prototype.intersectsCoordinate = function (coordinate) {
    return this.containsXY(coordinate[0], coordinate[1]);
  };
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  Geometry.prototype.computeExtent = function (extent) {
    return (0, _util.abstract)();
  };
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [opt_extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */


  Geometry.prototype.getExtent = function (opt_extent) {
    if (this.extentRevision_ != this.getRevision()) {
      var extent = this.computeExtent(this.extent_);

      if (isNaN(extent[0]) || isNaN(extent[1])) {
        (0, _extent.createOrUpdateEmpty)(extent);
      }

      this.extentRevision_ = this.getRevision();
    }

    return (0, _extent.returnOrUpdate)(this.extent_, opt_extent);
  };
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */


  Geometry.prototype.rotate = function (angle, anchor) {
    (0, _util.abstract)();
  };
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [opt_sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [opt_anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */


  Geometry.prototype.scale = function (sx, opt_sy, opt_anchor) {
    (0, _util.abstract)();
  };
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */


  Geometry.prototype.simplify = function (tolerance) {
    return this.getSimplifiedGeometry(tolerance * tolerance);
  };
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */


  Geometry.prototype.getSimplifiedGeometry = function (squaredTolerance) {
    return (0, _util.abstract)();
  };
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {import("./GeometryType.js").default} Geometry type.
   */


  Geometry.prototype.getType = function () {
    return (0, _util.abstract)();
  };
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */


  Geometry.prototype.applyTransform = function (transformFn) {
    (0, _util.abstract)();
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */


  Geometry.prototype.intersectsExtent = function (extent) {
    return (0, _util.abstract)();
  };
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */


  Geometry.prototype.translate = function (deltaX, deltaY) {
    (0, _util.abstract)();
  };
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {Geometry} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */


  Geometry.prototype.transform = function (source, destination) {
    /** @type {import("../proj/Projection.js").default} */
    var sourceProj = (0, _proj.get)(source);
    var transformFn = sourceProj.getUnits() == _Units.default.TILE_PIXELS ? function (inCoordinates, outCoordinates, stride) {
      var pixelExtent = sourceProj.getExtent();
      var projectedExtent = sourceProj.getWorldExtent();
      var scale = (0, _extent.getHeight)(projectedExtent) / (0, _extent.getHeight)(pixelExtent);
      (0, _transform.compose)(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
      (0, _transform2.transform2D)(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
      return (0, _proj.getTransform)(sourceProj, destination)(inCoordinates, outCoordinates, stride);
    } : (0, _proj.getTransform)(sourceProj, destination);
    this.applyTransform(transformFn);
    return this;
  };

  return Geometry;
}(_Object.default);

var _default = Geometry;
exports.default = _default;
},{"../Object.js":"node_modules/ol/Object.js","../proj/Units.js":"node_modules/ol/proj/Units.js","../util.js":"node_modules/ol/util.js","../transform.js":"node_modules/ol/transform.js","../extent.js":"node_modules/ol/extent.js","../proj.js":"node_modules/ol/proj.js","../functions.js":"node_modules/ol/functions.js","./flat/transform.js":"node_modules/ol/geom/flat/transform.js"}],"node_modules/ol/geom/SimpleGeometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStrideForLayout = getStrideForLayout;
exports.transformGeom2D = transformGeom2D;

var _Geometry = _interopRequireDefault(require("./Geometry.js"));

var _GeometryLayout = _interopRequireDefault(require("./GeometryLayout.js"));

var _util = require("../util.js");

var _extent = require("../extent.js");

var _transform = require("./flat/transform.js");

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
 * @module ol/geom/SimpleGeometry
 */


/**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @abstract
 * @api
 */
var SimpleGeometry =
/** @class */
function (_super) {
  __extends(SimpleGeometry, _super);

  function SimpleGeometry() {
    var _this = _super.call(this) || this;
    /**
     * @protected
     * @type {import("./GeometryLayout.js").default}
     */


    _this.layout = _GeometryLayout.default.XY;
    /**
     * @protected
     * @type {number}
     */

    _this.stride = 2;
    /**
     * @protected
     * @type {Array<number>}
     */

    _this.flatCoordinates = null;
    return _this;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  SimpleGeometry.prototype.computeExtent = function (extent) {
    return (0, _extent.createOrUpdateFromFlatCoordinates)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
  };
  /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */


  SimpleGeometry.prototype.getCoordinates = function () {
    return (0, _util.abstract)();
  };
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */


  SimpleGeometry.prototype.getFirstCoordinate = function () {
    return this.flatCoordinates.slice(0, this.stride);
  };
  /**
   * @return {Array<number>} Flat coordinates.
   */


  SimpleGeometry.prototype.getFlatCoordinates = function () {
    return this.flatCoordinates;
  };
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */


  SimpleGeometry.prototype.getLastCoordinate = function () {
    return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
  };
  /**
   * Return the {@link module:ol/geom/GeometryLayout layout} of the geometry.
   * @return {import("./GeometryLayout.js").default} Layout.
   * @api
   */


  SimpleGeometry.prototype.getLayout = function () {
    return this.layout;
  };
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   */


  SimpleGeometry.prototype.getSimplifiedGeometry = function (squaredTolerance) {
    if (this.simplifiedGeometryRevision !== this.getRevision()) {
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    } // If squaredTolerance is negative or if we know that simplification will not
    // have any effect then just return this.


    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }

    var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
    var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();

    if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
      return simplifiedGeometry;
    } else {
      // Simplification did not actually remove any coordinates.  We now know
      // that any calls to getSimplifiedGeometry with a squaredTolerance less
      // than or equal to the current squaredTolerance will also not have any
      // effect.  This allows us to short circuit simplification (saving CPU
      // cycles) and prevents the cache of simplified geometries from filling
      // up with useless identical copies of this geometry (saving memory).
      this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
      return this;
    }
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */


  SimpleGeometry.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    return this;
  };
  /**
   * @return {number} Stride.
   */


  SimpleGeometry.prototype.getStride = function () {
    return this.stride;
  };
  /**
   * @param {import("./GeometryLayout.js").default} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */


  SimpleGeometry.prototype.setFlatCoordinates = function (layout, flatCoordinates) {
    this.stride = getStrideForLayout(layout);
    this.layout = layout;
    this.flatCoordinates = flatCoordinates;
  };
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  SimpleGeometry.prototype.setCoordinates = function (coordinates, opt_layout) {
    (0, _util.abstract)();
  };
  /**
   * @param {import("./GeometryLayout.js").default|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */


  SimpleGeometry.prototype.setLayout = function (layout, coordinates, nesting) {
    /** @type {number} */
    var stride;

    if (layout) {
      stride = getStrideForLayout(layout);
    } else {
      for (var i = 0; i < nesting; ++i) {
        if (coordinates.length === 0) {
          this.layout = _GeometryLayout.default.XY;
          this.stride = 2;
          return;
        } else {
          coordinates =
          /** @type {Array} */
          coordinates[0];
        }
      }

      stride = coordinates.length;
      layout = getLayoutForStride(stride);
    }

    this.layout = layout;
    this.stride = stride;
  };
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */


  SimpleGeometry.prototype.applyTransform = function (transformFn) {
    if (this.flatCoordinates) {
      transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
      this.changed();
    }
  };
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */


  SimpleGeometry.prototype.rotate = function (angle, anchor) {
    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0, _transform.rotate)(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
      this.changed();
    }
  };
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [opt_sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [opt_anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */


  SimpleGeometry.prototype.scale = function (sx, opt_sy, opt_anchor) {
    var sy = opt_sy;

    if (sy === undefined) {
      sy = sx;
    }

    var anchor = opt_anchor;

    if (!anchor) {
      anchor = (0, _extent.getCenter)(this.getExtent());
    }

    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0, _transform.scale)(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
      this.changed();
    }
  };
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */


  SimpleGeometry.prototype.translate = function (deltaX, deltaY) {
    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0, _transform.translate)(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
      this.changed();
    }
  };

  return SimpleGeometry;
}(_Geometry.default);
/**
 * @param {number} stride Stride.
 * @return {import("./GeometryLayout.js").default} layout Layout.
 */


function getLayoutForStride(stride) {
  var layout;

  if (stride == 2) {
    layout = _GeometryLayout.default.XY;
  } else if (stride == 3) {
    layout = _GeometryLayout.default.XYZ;
  } else if (stride == 4) {
    layout = _GeometryLayout.default.XYZM;
  }

  return (
    /** @type {import("./GeometryLayout.js").default} */
    layout
  );
}
/**
 * @param {import("./GeometryLayout.js").default} layout Layout.
 * @return {number} Stride.
 */


function getStrideForLayout(layout) {
  var stride;

  if (layout == _GeometryLayout.default.XY) {
    stride = 2;
  } else if (layout == _GeometryLayout.default.XYZ || layout == _GeometryLayout.default.XYM) {
    stride = 3;
  } else if (layout == _GeometryLayout.default.XYZM) {
    stride = 4;
  }

  return (
    /** @type {number} */
    stride
  );
}
/**
 * @param {SimpleGeometry} simpleGeometry Simple geometry.
 * @param {import("../transform.js").Transform} transform Transform.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed flat coordinates.
 */


function transformGeom2D(simpleGeometry, transform, opt_dest) {
  var flatCoordinates = simpleGeometry.getFlatCoordinates();

  if (!flatCoordinates) {
    return null;
  } else {
    var stride = simpleGeometry.getStride();
    return (0, _transform.transform2D)(flatCoordinates, 0, flatCoordinates.length, stride, transform, opt_dest);
  }
}

var _default = SimpleGeometry;
exports.default = _default;
},{"./Geometry.js":"node_modules/ol/geom/Geometry.js","./GeometryLayout.js":"node_modules/ol/geom/GeometryLayout.js","../util.js":"node_modules/ol/util.js","../extent.js":"node_modules/ol/extent.js","./flat/transform.js":"node_modules/ol/geom/flat/transform.js"}],"node_modules/ol/geom/flat/closest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayMaxSquaredDelta = arrayMaxSquaredDelta;
exports.assignClosestArrayPoint = assignClosestArrayPoint;
exports.assignClosestMultiArrayPoint = assignClosestMultiArrayPoint;
exports.assignClosestPoint = assignClosestPoint;
exports.maxSquaredDelta = maxSquaredDelta;
exports.multiArrayMaxSquaredDelta = multiArrayMaxSquaredDelta;

var _math = require("../../math.js");

/**
 * @module ol/geom/flat/closest
 */

/**
 * Returns the point on the 2D line segment flatCoordinates[offset1] to
 * flatCoordinates[offset2] that is closest to the point (x, y).  Extra
 * dimensions are linearly interpolated.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset1 Offset 1.
 * @param {number} offset2 Offset 2.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 */
function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
  var x1 = flatCoordinates[offset1];
  var y1 = flatCoordinates[offset1 + 1];
  var dx = flatCoordinates[offset2] - x1;
  var dy = flatCoordinates[offset2 + 1] - y1;
  var offset;

  if (dx === 0 && dy === 0) {
    offset = offset1;
  } else {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      offset = offset2;
    } else if (t > 0) {
      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = (0, _math.lerp)(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
      }

      closestPoint.length = stride;
      return;
    } else {
      offset = offset1;
    }
  }

  for (var i = 0; i < stride; ++i) {
    closestPoint[i] = flatCoordinates[offset + i];
  }

  closestPoint.length = stride;
}
/**
 * Return the squared of the largest distance between any pair of consecutive
 * coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */


function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1];

  for (offset += stride; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    var squaredDelta = (0, _math.squaredDistance)(x1, y1, x2, y2);

    if (squaredDelta > max) {
      max = squaredDelta;
    }

    x1 = x2;
    y1 = y2;
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */


function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
    offset = end;
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */


function multiArrayMaxSquaredDelta(flatCoordinates, offset, endss, stride, max) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    max = arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max);
    offset = ends[ends.length - 1];
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */


function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  if (offset == end) {
    return minSquaredDistance;
  }

  var i, squaredDistance;

  if (maxDelta === 0) {
    // All points are identical, so just test the first point.
    squaredDistance = (0, _math.squaredDistance)(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);

    if (squaredDistance < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset + i];
      }

      closestPoint.length = stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  }

  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  var index = offset + stride;

  while (index < end) {
    assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
    squaredDistance = (0, _math.squaredDistance)(x, y, tmpPoint[0], tmpPoint[1]);

    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;

      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }

      closestPoint.length = stride;
      index += stride;
    } else {
      // Skip ahead multiple points, because we know that all the skipped
      // points cannot be any closer than the closest point we have found so
      // far.  We know this because we know how close the current point is, how
      // close the closest point we have found so far is, and the maximum
      // distance between consecutive points.  For example, if we're currently
      // at distance 10, the best we've found so far is 3, and that the maximum
      // distance between consecutive points is 2, then we'll need to skip at
      // least (10 - 3) / 2 == 3 (rounded down) points to have any chance of
      // finding a closer point.  We use Math.max(..., 1) to ensure that we
      // always advance at least one point, to avoid an infinite loop.
      index += stride * Math.max((Math.sqrt(squaredDistance) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
    }
  }

  if (isRing) {
    // Check the closing segment.
    assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
    squaredDistance = (0, _math.squaredDistance)(x, y, tmpPoint[0], tmpPoint[1]);

    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;

      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }

      closestPoint.length = stride;
    }
  }

  return minSquaredDistance;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */


function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    minSquaredDistance = assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset = end;
  }

  return minSquaredDistance;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */


function assignClosestMultiArrayPoint(flatCoordinates, offset, endss, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    minSquaredDistance = assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset = ends[ends.length - 1];
  }

  return minSquaredDistance;
}
},{"../../math.js":"node_modules/ol/math.js"}],"node_modules/ol/geom/flat/deflate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deflateCoordinate = deflateCoordinate;
exports.deflateCoordinates = deflateCoordinates;
exports.deflateCoordinatesArray = deflateCoordinatesArray;
exports.deflateMultiCoordinatesArray = deflateMultiCoordinatesArray;

/**
 * @module ol/geom/flat/deflate
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
  for (var i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset++] = coordinate[i];
  }

  return offset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<import("../../coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */


function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    var coordinate = coordinates[i];

    for (var j = 0; j < stride; ++j) {
      flatCoordinates[offset++] = coordinate[j];
    }
  }

  return offset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} coordinatess Coordinatess.
 * @param {number} stride Stride.
 * @param {Array<number>} [opt_ends] Ends.
 * @return {Array<number>} Ends.
 */


function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, opt_ends) {
  var ends = opt_ends ? opt_ends : [];
  var i = 0;

  for (var j = 0, jj = coordinatess.length; j < jj; ++j) {
    var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
    ends[i++] = end;
    offset = end;
  }

  ends.length = i;
  return ends;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} coordinatesss Coordinatesss.
 * @param {number} stride Stride.
 * @param {Array<Array<number>>} [opt_endss] Endss.
 * @return {Array<Array<number>>} Endss.
 */


function deflateMultiCoordinatesArray(flatCoordinates, offset, coordinatesss, stride, opt_endss) {
  var endss = opt_endss ? opt_endss : [];
  var i = 0;

  for (var j = 0, jj = coordinatesss.length; j < jj; ++j) {
    var ends = deflateCoordinatesArray(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
    endss[i++] = ends;
    offset = ends[ends.length - 1];
  }

  endss.length = i;
  return endss;
}
},{}],"node_modules/ol/geom/flat/simplify.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.douglasPeucker = douglasPeucker;
exports.douglasPeuckerArray = douglasPeuckerArray;
exports.douglasPeuckerMultiArray = douglasPeuckerMultiArray;
exports.quantize = quantize;
exports.quantizeArray = quantizeArray;
exports.quantizeMultiArray = quantizeMultiArray;
exports.radialDistance = radialDistance;
exports.simplifyLineString = simplifyLineString;
exports.snap = snap;

var _math = require("../../math.js");

/**
 * @module ol/geom/flat/simplify
 */
// Based on simplify-js https://github.com/mourner/simplify-js
// Copyright (c) 2012, Vladimir Agafonkin
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//    1. Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//
//    2. Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {boolean} highQuality Highest quality.
 * @param {Array<number>} [opt_simplifiedFlatCoordinates] Simplified flat
 *     coordinates.
 * @return {Array<number>} Simplified line string.
 */
function simplifyLineString(flatCoordinates, offset, end, stride, squaredTolerance, highQuality, opt_simplifiedFlatCoordinates) {
  var simplifiedFlatCoordinates = opt_simplifiedFlatCoordinates !== undefined ? opt_simplifiedFlatCoordinates : [];

  if (!highQuality) {
    end = radialDistance(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    flatCoordinates = simplifiedFlatCoordinates;
    offset = 0;
    stride = 2;
  }

  simplifiedFlatCoordinates.length = douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, 0);
  return simplifiedFlatCoordinates;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */


function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  var n = (end - offset) / stride;

  if (n < 3) {
    for (; offset < end; offset += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
    }

    return simplifiedOffset;
  }
  /** @type {Array<number>} */


  var markers = new Array(n);
  markers[0] = 1;
  markers[n - 1] = 1;
  /** @type {Array<number>} */

  var stack = [offset, end - stride];
  var index = 0;

  while (stack.length > 0) {
    var last = stack.pop();
    var first = stack.pop();
    var maxSquaredDistance = 0;
    var x1 = flatCoordinates[first];
    var y1 = flatCoordinates[first + 1];
    var x2 = flatCoordinates[last];
    var y2 = flatCoordinates[last + 1];

    for (var i = first + stride; i < last; i += stride) {
      var x = flatCoordinates[i];
      var y = flatCoordinates[i + 1];
      var squaredDistance_1 = (0, _math.squaredSegmentDistance)(x, y, x1, y1, x2, y2);

      if (squaredDistance_1 > maxSquaredDistance) {
        index = i;
        maxSquaredDistance = squaredDistance_1;
      }
    }

    if (maxSquaredDistance > squaredTolerance) {
      markers[(index - offset) / stride] = 1;

      if (first + stride < index) {
        stack.push(first, index);
      }

      if (index + stride < last) {
        stack.push(index, last);
      }
    }
  }

  for (var i = 0; i < n; ++i) {
    if (markers[i]) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride + 1];
    }
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */


function douglasPeuckerArray(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    simplifiedOffset = douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset);
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<Array<number>>} simplifiedEndss Simplified endss.
 * @return {number} Simplified offset.
 */


function douglasPeuckerMultiArray(flatCoordinates, offset, endss, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    var simplifiedEnds = [];
    simplifiedOffset = douglasPeuckerArray(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
    simplifiedEndss.push(simplifiedEnds);
    offset = ends[ends.length - 1];
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */


function radialDistance(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  if (end <= offset + stride) {
    // zero or one point, no simplification possible, so copy and return
    for (; offset < end; offset += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
    }

    return simplifiedOffset;
  }

  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1]; // copy first point

  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1;
  var x2 = x1;
  var y2 = y1;

  for (offset += stride; offset < end; offset += stride) {
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];

    if ((0, _math.squaredDistance)(x1, y1, x2, y2) > squaredTolerance) {
      // copy point at offset
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      x1 = x2;
      y1 = y2;
    }
  }

  if (x2 != x1 || y2 != y1) {
    // copy last point
    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
  }

  return simplifiedOffset;
}
/**
 * @param {number} value Value.
 * @param {number} tolerance Tolerance.
 * @return {number} Rounded value.
 */


function snap(value, tolerance) {
  return tolerance * Math.round(value / tolerance);
}
/**
 * Simplifies a line string using an algorithm designed by Tim Schaub.
 * Coordinates are snapped to the nearest value in a virtual grid and
 * consecutive duplicate coordinates are discarded.  This effectively preserves
 * topology as the simplification of any subsection of a line string is
 * independent of the rest of the line string.  This means that, for examples,
 * the common edge between two polygons will be simplified to the same line
 * string independently in both polygons.  This implementation uses a single
 * pass over the coordinates and eliminates intermediate collinear points.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */


function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  // do nothing if the line is empty
  if (offset == end) {
    return simplifiedOffset;
  } // snap the first coordinate (P1)


  var x1 = snap(flatCoordinates[offset], tolerance);
  var y1 = snap(flatCoordinates[offset + 1], tolerance);
  offset += stride; // add the first coordinate to the output

  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1; // find the next coordinate that does not snap to the same value as the first
  // coordinate (P2)

  var x2, y2;

  do {
    x2 = snap(flatCoordinates[offset], tolerance);
    y2 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;

    if (offset == end) {
      // all coordinates snap to the same value, the line collapses to a point
      // push the last snapped value anyway to ensure that the output contains
      // at least two points
      // FIXME should we really return at least two points anyway?
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      return simplifiedOffset;
    }
  } while (x2 == x1 && y2 == y1);

  while (offset < end) {
    // snap the next coordinate (P3)
    var x3 = snap(flatCoordinates[offset], tolerance);
    var y3 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride; // skip P3 if it is equal to P2

    if (x3 == x2 && y3 == y2) {
      continue;
    } // calculate the delta between P1 and P2


    var dx1 = x2 - x1;
    var dy1 = y2 - y1; // calculate the delta between P3 and P1

    var dx2 = x3 - x1;
    var dy2 = y3 - y1; // if P1, P2, and P3 are colinear and P3 is further from P1 than P2 is from
    // P1 in the same direction then P2 is on the straight line between P1 and
    // P3

    if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
      // discard P2 and set P2 = P3
      x2 = x3;
      y2 = y3;
      continue;
    } // either P1, P2, and P3 are not colinear, or they are colinear but P3 is
    // between P3 and P1 or on the opposite half of the line to P2.  add P2,
    // and continue with P1 = P2 and P2 = P3


    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    x1 = x2;
    y1 = y2;
    x2 = x3;
    y2 = y3;
  } // add the last point (P2)


  simplifiedFlatCoordinates[simplifiedOffset++] = x2;
  simplifiedFlatCoordinates[simplifiedOffset++] = y2;
  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */


function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    simplifiedOffset = quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<Array<number>>} simplifiedEndss Simplified endss.
 * @return {number} Simplified offset.
 */


function quantizeMultiArray(flatCoordinates, offset, endss, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    var simplifiedEnds = [];
    simplifiedOffset = quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
    simplifiedEndss.push(simplifiedEnds);
    offset = ends[ends.length - 1];
  }

  return simplifiedOffset;
}
},{"../../math.js":"node_modules/ol/math.js"}],"node_modules/ol/geom/flat/inflate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inflateCoordinates = inflateCoordinates;
exports.inflateCoordinatesArray = inflateCoordinatesArray;
exports.inflateMultiCoordinatesArray = inflateMultiCoordinatesArray;

/**
 * @module ol/geom/flat/inflate
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Array<import("../../coordinate.js").Coordinate>} [opt_coordinates] Coordinates.
 * @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
 */
function inflateCoordinates(flatCoordinates, offset, end, stride, opt_coordinates) {
  var coordinates = opt_coordinates !== undefined ? opt_coordinates : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    coordinates[i++] = flatCoordinates.slice(j, j + stride);
  }

  coordinates.length = i;
  return coordinates;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} [opt_coordinatess] Coordinatess.
 * @return {Array<Array<import("../../coordinate.js").Coordinate>>} Coordinatess.
 */


function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, opt_coordinatess) {
  var coordinatess = opt_coordinatess !== undefined ? opt_coordinatess : [];
  var i = 0;

  for (var j = 0, jj = ends.length; j < jj; ++j) {
    var end = ends[j];
    coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
    offset = end;
  }

  coordinatess.length = i;
  return coordinatess;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} [opt_coordinatesss]
 *     Coordinatesss.
 * @return {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} Coordinatesss.
 */


function inflateMultiCoordinatesArray(flatCoordinates, offset, endss, stride, opt_coordinatesss) {
  var coordinatesss = opt_coordinatesss !== undefined ? opt_coordinatesss : [];
  var i = 0;

  for (var j = 0, jj = endss.length; j < jj; ++j) {
    var ends = endss[j];
    coordinatesss[i++] = inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatesss[i]);
    offset = ends[ends.length - 1];
  }

  coordinatesss.length = i;
  return coordinatesss;
}
},{}],"node_modules/ol/geom/flat/area.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linearRing = linearRing;
exports.linearRings = linearRings;
exports.linearRingss = linearRingss;

/**
 * @module ol/geom/flat/area
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
function linearRing(flatCoordinates, offset, end, stride) {
  var twiceArea = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    twiceArea += y1 * x2 - x1 * y2;
    x1 = x2;
    y1 = y2;
  }

  return twiceArea / 2;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @return {number} Area.
 */


function linearRings(flatCoordinates, offset, ends, stride) {
  var area = 0;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    area += linearRing(flatCoordinates, offset, end, stride);
    offset = end;
  }

  return area;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @return {number} Area.
 */


function linearRingss(flatCoordinates, offset, endss, stride) {
  var area = 0;

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    area += linearRings(flatCoordinates, offset, ends, stride);
    offset = ends[ends.length - 1];
  }

  return area;
}
},{}],"node_modules/ol/geom/LinearRing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GeometryLayout = _interopRequireDefault(require("./GeometryLayout.js"));

var _GeometryType = _interopRequireDefault(require("./GeometryType.js"));

var _SimpleGeometry = _interopRequireDefault(require("./SimpleGeometry.js"));

var _closest = require("./flat/closest.js");

var _extent = require("../extent.js");

var _deflate = require("./flat/deflate.js");

var _simplify = require("./flat/simplify.js");

var _inflate = require("./flat/inflate.js");

var _area = require("./flat/area.js");

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
 * @module ol/geom/LinearRing
 */


/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */
var LinearRing =
/** @class */
function (_super) {
  __extends(LinearRing, _super);
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  function LinearRing(coordinates, opt_layout) {
    var _this = _super.call(this) || this;
    /**
     * @private
     * @type {number}
     */


    _this.maxDelta_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.maxDeltaRevision_ = -1;

    if (opt_layout !== undefined && !Array.isArray(coordinates[0])) {
      _this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);
    } else {
      _this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      coordinates, opt_layout);
    }

    return _this;
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   */


  LinearRing.prototype.clone = function () {
    return new LinearRing(this.flatCoordinates.slice(), this.layout);
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  LinearRing.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0, _extent.closestSquaredDistanceXY)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0, _closest.maxSquaredDelta)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0, _closest.assignClosestPoint)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */


  LinearRing.prototype.getArea = function () {
    return (0, _area.linearRing)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */


  LinearRing.prototype.getCoordinates = function () {
    return (0, _inflate.inflateCoordinates)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   */


  LinearRing.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = (0, _simplify.douglasPeucker)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    return new LinearRing(simplifiedFlatCoordinates, _GeometryLayout.default.XY);
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  LinearRing.prototype.getType = function () {
    return _GeometryType.default.LINEAR_RING;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  LinearRing.prototype.intersectsExtent = function (extent) {
    return false;
  };
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  LinearRing.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 1);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    this.flatCoordinates.length = (0, _deflate.deflateCoordinates)(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return LinearRing;
}(_SimpleGeometry.default);

var _default = LinearRing;
exports.default = _default;
},{"./GeometryLayout.js":"node_modules/ol/geom/GeometryLayout.js","./GeometryType.js":"node_modules/ol/geom/GeometryType.js","./SimpleGeometry.js":"node_modules/ol/geom/SimpleGeometry.js","./flat/closest.js":"node_modules/ol/geom/flat/closest.js","../extent.js":"node_modules/ol/extent.js","./flat/deflate.js":"node_modules/ol/geom/flat/deflate.js","./flat/simplify.js":"node_modules/ol/geom/flat/simplify.js","./flat/inflate.js":"node_modules/ol/geom/flat/inflate.js","./flat/area.js":"node_modules/ol/geom/flat/area.js"}],"node_modules/ol/geom/Point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GeometryType = _interopRequireDefault(require("./GeometryType.js"));

var _SimpleGeometry = _interopRequireDefault(require("./SimpleGeometry.js"));

var _extent = require("../extent.js");

var _deflate = require("./flat/deflate.js");

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
 * @module ol/geom/Point
 */


/**
 * @classdesc
 * Point geometry.
 *
 * @api
 */
var Point =
/** @class */
function (_super) {
  __extends(Point, _super);
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   */


  function Point(coordinates, opt_layout) {
    var _this = _super.call(this) || this;

    _this.setCoordinates(coordinates, opt_layout);

    return _this;
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   */


  Point.prototype.clone = function () {
    var point = new Point(this.flatCoordinates.slice(), this.layout);
    point.applyProperties(this);
    return point;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  Point.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    var flatCoordinates = this.flatCoordinates;
    var squaredDistance = (0, _math.squaredDistance)(x, y, flatCoordinates[0], flatCoordinates[1]);

    if (squaredDistance < minSquaredDistance) {
      var stride = this.stride;

      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[i];
      }

      closestPoint.length = stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  };
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   */


  Point.prototype.getCoordinates = function () {
    return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
  };
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  Point.prototype.computeExtent = function (extent) {
    return (0, _extent.createOrUpdateFromCoordinate)(this.flatCoordinates, extent);
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  Point.prototype.getType = function () {
    return _GeometryType.default.POINT;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  Point.prototype.intersectsExtent = function (extent) {
    return (0, _extent.containsXY)(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
  };
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  Point.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 0);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    this.flatCoordinates.length = (0, _deflate.deflateCoordinate)(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return Point;
}(_SimpleGeometry.default);

var _default = Point;
exports.default = _default;
},{"./GeometryType.js":"node_modules/ol/geom/GeometryType.js","./SimpleGeometry.js":"node_modules/ol/geom/SimpleGeometry.js","../extent.js":"node_modules/ol/extent.js","./flat/deflate.js":"node_modules/ol/geom/flat/deflate.js","../math.js":"node_modules/ol/math.js"}],"node_modules/ol/geom/flat/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linearRingContainsExtent = linearRingContainsExtent;
exports.linearRingContainsXY = linearRingContainsXY;
exports.linearRingsContainsXY = linearRingsContainsXY;
exports.linearRingssContainsXY = linearRingssContainsXY;

var _extent = require("../../extent.js");

/**
 * @module ol/geom/flat/contains
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} Contains extent.
 */
function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
  var outside = (0, _extent.forEachCorner)(extent,
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains (x, y).
   */
  function (coordinate) {
    return !linearRingContainsXY(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
  });
  return !outside;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */


function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
  // https://geomalgorithms.com/a03-_inclusion.html
  // Copyright 2000 softSurfer, 2012 Dan Sunday
  // This code may be freely used and modified for any purpose
  // providing that this copyright notice is included with it.
  // SoftSurfer makes no warranty for this code, and cannot be held
  // liable for any real or imagined damage resulting from its use.
  // Users of this code must verify correctness for their application.
  var wn = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];

    if (y1 <= y) {
      if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) {
        wn++;
      }
    } else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) {
      wn--;
    }

    x1 = x2;
    y1 = y2;
  }

  return wn !== 0;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */


function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
  if (ends.length === 0) {
    return false;
  }

  if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) {
    return false;
  }

  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
      return false;
    }
  }

  return true;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */


function linearRingssContainsXY(flatCoordinates, offset, endss, stride, x, y) {
  if (endss.length === 0) {
    return false;
  }

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];

    if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
      return true;
    }

    offset = ends[ends.length - 1];
  }

  return false;
}
},{"../../extent.js":"node_modules/ol/extent.js"}],"node_modules/ol/geom/flat/interiorpoint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInteriorPointOfArray = getInteriorPointOfArray;
exports.getInteriorPointsOfMultiArray = getInteriorPointsOfMultiArray;

var _contains = require("./contains.js");

var _array = require("../../array.js");

/**
 * @module ol/geom/flat/interiorpoint
 */

/**
 * Calculates a point that is likely to lie in the interior of the linear rings.
 * Inspired by JTS's com.vividsolutions.jts.geom.Geometry#getInteriorPoint.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @param {number} flatCentersOffset Flat center offset.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Destination point as XYM coordinate, where M is the
 * length of the horizontal intersection that the point belongs to.
 */
function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, opt_dest) {
  var i, ii, x, x1, x2, y1, y2;
  var y = flatCenters[flatCentersOffset + 1];
  /** @type {Array<number>} */

  var intersections = []; // Calculate intersections with the horizontal line

  for (var r = 0, rr = ends.length; r < rr; ++r) {
    var end = ends[r];
    x1 = flatCoordinates[end - stride];
    y1 = flatCoordinates[end - stride + 1];

    for (i = offset; i < end; i += stride) {
      x2 = flatCoordinates[i];
      y2 = flatCoordinates[i + 1];

      if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
        x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        intersections.push(x);
      }

      x1 = x2;
      y1 = y2;
    }
  } // Find the longest segment of the horizontal line that has its center point
  // inside the linear ring.


  var pointX = NaN;
  var maxSegmentLength = -Infinity;
  intersections.sort(_array.numberSafeCompareFunction);
  x1 = intersections[0];

  for (i = 1, ii = intersections.length; i < ii; ++i) {
    x2 = intersections[i];
    var segmentLength = Math.abs(x2 - x1);

    if (segmentLength > maxSegmentLength) {
      x = (x1 + x2) / 2;

      if ((0, _contains.linearRingsContainsXY)(flatCoordinates, offset, ends, stride, x, y)) {
        pointX = x;
        maxSegmentLength = segmentLength;
      }
    }

    x1 = x2;
  }

  if (isNaN(pointX)) {
    // There is no horizontal line that has its center point inside the linear
    // ring.  Use the center of the the linear ring's extent.
    pointX = flatCenters[flatCentersOffset];
  }

  if (opt_dest) {
    opt_dest.push(pointX, y, maxSegmentLength);
    return opt_dest;
  } else {
    return [pointX, y, maxSegmentLength];
  }
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @return {Array<number>} Interior points as XYM coordinates, where M is the
 * length of the horizontal intersection that the point belongs to.
 */


function getInteriorPointsOfMultiArray(flatCoordinates, offset, endss, stride, flatCenters) {
  var interiorPoints = [];

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    interiorPoints = getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, 2 * i, interiorPoints);
    offset = ends[ends.length - 1];
  }

  return interiorPoints;
}
},{"./contains.js":"node_modules/ol/geom/flat/contains.js","../../array.js":"node_modules/ol/array.js"}],"node_modules/ol/geom/flat/segments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;

/**
 * @module ol/geom/flat/segments
 */

/**
 * This function calls `callback` for each segment of the flat coordinates
 * array. If the callback returns a truthy value the function returns that
 * value immediately. Otherwise the function returns `false`.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {function(import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
 *     called for each segment.
 * @return {T|boolean} Value.
 * @template T
 */
function forEach(flatCoordinates, offset, end, stride, callback) {
  var ret;
  offset += stride;

  for (; offset < end; offset += stride) {
    ret = callback(flatCoordinates.slice(offset - stride, offset), flatCoordinates.slice(offset, offset + stride));

    if (ret) {
      return ret;
    }
  }

  return false;
}
},{}],"node_modules/ol/geom/flat/intersectsextent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersectsLineString = intersectsLineString;
exports.intersectsLineStringArray = intersectsLineStringArray;
exports.intersectsLinearRing = intersectsLinearRing;
exports.intersectsLinearRingArray = intersectsLinearRingArray;
exports.intersectsLinearRingMultiArray = intersectsLinearRingMultiArray;

var _extent = require("../../extent.js");

var _segments = require("./segments.js");

var _contains = require("./contains.js");

/**
 * @module ol/geom/flat/intersectsextent
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
function intersectsLineString(flatCoordinates, offset, end, stride, extent) {
  var coordinatesExtent = (0, _extent.extendFlatCoordinates)((0, _extent.createEmpty)(), flatCoordinates, offset, end, stride);

  if (!(0, _extent.intersects)(extent, coordinatesExtent)) {
    return false;
  }

  if ((0, _extent.containsExtent)(extent, coordinatesExtent)) {
    return true;
  }

  if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) {
    return true;
  }

  if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) {
    return true;
  }

  return (0, _segments.forEach)(flatCoordinates, offset, end, stride,
  /**
   * @param {import("../../coordinate.js").Coordinate} point1 Start point.
   * @param {import("../../coordinate.js").Coordinate} point2 End point.
   * @return {boolean} `true` if the segment and the extent intersect,
   *     `false` otherwise.
   */
  function (point1, point2) {
    return (0, _extent.intersectsSegment)(extent, point1, point2);
  });
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */


function intersectsLineStringArray(flatCoordinates, offset, ends, stride, extent) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    if (intersectsLineString(flatCoordinates, offset, ends[i], stride, extent)) {
      return true;
    }

    offset = ends[i];
  }

  return false;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */


function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
  if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
    return true;
  }

  if ((0, _contains.linearRingContainsXY)(flatCoordinates, offset, end, stride, extent[0], extent[1])) {
    return true;
  }

  if ((0, _contains.linearRingContainsXY)(flatCoordinates, offset, end, stride, extent[0], extent[3])) {
    return true;
  }

  if ((0, _contains.linearRingContainsXY)(flatCoordinates, offset, end, stride, extent[2], extent[1])) {
    return true;
  }

  if ((0, _contains.linearRingContainsXY)(flatCoordinates, offset, end, stride, extent[2], extent[3])) {
    return true;
  }

  return false;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */


function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
  if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) {
    return false;
  }

  if (ends.length === 1) {
    return true;
  }

  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if ((0, _contains.linearRingContainsExtent)(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
      if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
        return false;
      }
    }
  }

  return true;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */


function intersectsLinearRingMultiArray(flatCoordinates, offset, endss, stride, extent) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];

    if (intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent)) {
      return true;
    }

    offset = ends[ends.length - 1];
  }

  return false;
}
},{"../../extent.js":"node_modules/ol/extent.js","./segments.js":"node_modules/ol/geom/flat/segments.js","./contains.js":"node_modules/ol/geom/flat/contains.js"}],"node_modules/ol/geom/flat/reverse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coordinates = coordinates;

/**
 * @module ol/geom/flat/reverse
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 */
function coordinates(flatCoordinates, offset, end, stride) {
  while (offset < end - stride) {
    for (var i = 0; i < stride; ++i) {
      var tmp = flatCoordinates[offset + i];
      flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
      flatCoordinates[end - stride + i] = tmp;
    }

    offset += stride;
    end -= stride;
  }
}
},{}],"node_modules/ol/geom/flat/orient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inflateEnds = inflateEnds;
exports.linearRingIsClockwise = linearRingIsClockwise;
exports.linearRingsAreOriented = linearRingsAreOriented;
exports.linearRingssAreOriented = linearRingssAreOriented;
exports.orientLinearRings = orientLinearRings;
exports.orientLinearRingsArray = orientLinearRingsArray;

var _reverse = require("./reverse.js");

/**
 * @module ol/geom/flat/orient
 */

/**
 * Is the linear ring oriented clockwise in a coordinate system with a bottom-left
 * coordinate origin? For a coordinate system with a top-left coordinate origin,
 * the ring's orientation is clockwise when this function returns false.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {boolean} Is clockwise.
 */
function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
  // https://stackoverflow.com/q/1165647/clockwise-method#1165943
  // https://github.com/OSGeo/gdal/blob/master/gdal/ogr/ogrlinearring.cpp
  var edge = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    edge += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }

  return edge === 0 ? undefined : edge > 0;
}
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [opt_right] Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */


function linearRingsAreOriented(flatCoordinates, offset, ends, stride, opt_right) {
  var right = opt_right !== undefined ? opt_right : false;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);

    if (i === 0) {
      if (right && isClockwise || !right && !isClockwise) {
        return false;
      }
    } else {
      if (right && !isClockwise || !right && isClockwise) {
        return false;
      }
    }

    offset = end;
  }

  return true;
}
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Array of array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [opt_right] Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */


function linearRingssAreOriented(flatCoordinates, offset, endss, stride, opt_right) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];

    if (!linearRingsAreOriented(flatCoordinates, offset, ends, stride, opt_right)) {
      return false;
    }

    if (ends.length) {
      offset = ends[ends.length - 1];
    }
  }

  return true;
}
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {boolean} [opt_right] Follow the right-hand rule for orientation.
 * @return {number} End.
 */


function orientLinearRings(flatCoordinates, offset, ends, stride, opt_right) {
  var right = opt_right !== undefined ? opt_right : false;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
    var reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;

    if (reverse) {
      (0, _reverse.coordinates)(flatCoordinates, offset, end, stride);
    }

    offset = end;
  }

  return offset;
}
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Array of array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [opt_right] Follow the right-hand rule for orientation.
 * @return {number} End.
 */


function orientLinearRingsArray(flatCoordinates, offset, endss, stride, opt_right) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    offset = orientLinearRings(flatCoordinates, offset, endss[i], stride, opt_right);
  }

  return offset;
}
/**
 * Return a two-dimensional endss
 * @param {Array<number>} flatCoordinates Flat coordinates
 * @param {Array<number>} ends Linear ring end indexes
 * @return {Array<Array<number>>} Two dimensional endss array that can
 * be used to contruct a MultiPolygon
 */


function inflateEnds(flatCoordinates, ends) {
  var endss = [];
  var offset = 0;
  var prevEndIndex = 0;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i]; // classifies an array of rings into polygons with outer rings and holes

    if (!linearRingIsClockwise(flatCoordinates, offset, end, 2)) {
      endss.push(ends.slice(prevEndIndex, i + 1));
    } else {
      if (endss.length === 0) {
        continue;
      }

      endss[endss.length - 1].push(ends[prevEndIndex]);
    }

    prevEndIndex = i + 1;
    offset = end;
  }

  return endss;
}
},{"./reverse.js":"node_modules/ol/geom/flat/reverse.js"}],"node_modules/ol/geom/Polygon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circular = circular;
exports.default = void 0;
exports.fromCircle = fromCircle;
exports.fromExtent = fromExtent;
exports.makeRegular = makeRegular;

var _GeometryLayout = _interopRequireDefault(require("./GeometryLayout.js"));

var _GeometryType = _interopRequireDefault(require("./GeometryType.js"));

var _LinearRing = _interopRequireDefault(require("./LinearRing.js"));

var _Point = _interopRequireDefault(require("./Point.js"));

var _SimpleGeometry = _interopRequireDefault(require("./SimpleGeometry.js"));

var _closest = require("./flat/closest.js");

var _extent = require("../extent.js");

var _deflate = require("./flat/deflate.js");

var _array = require("../array.js");

var _interiorpoint = require("./flat/interiorpoint.js");

var _inflate = require("./flat/inflate.js");

var _intersectsextent = require("./flat/intersectsextent.js");

var _orient = require("./flat/orient.js");

var _area = require("./flat/area.js");

var _contains = require("./flat/contains.js");

var _math = require("../math.js");

var _simplify = require("./flat/simplify.js");

var _sphere = require("../sphere.js");

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
 * @module ol/geom/Polygon
 */


/**
 * @classdesc
 * Polygon geometry.
 *
 * @api
 */
var Polygon =
/** @class */
function (_super) {
  __extends(Polygon, _super);
  /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `opt_layout` and `opt_ends` are also accepted.)
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @param {Array<number>} [opt_ends] Ends (for internal use with flat coordinates).
   */


  function Polygon(coordinates, opt_layout, opt_ends) {
    var _this = _super.call(this) || this;
    /**
     * @type {Array<number>}
     * @private
     */


    _this.ends_ = [];
    /**
     * @private
     * @type {number}
     */

    _this.flatInteriorPointRevision_ = -1;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */

    _this.flatInteriorPoint_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.maxDelta_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.maxDeltaRevision_ = -1;
    /**
     * @private
     * @type {number}
     */

    _this.orientedRevision_ = -1;
    /**
     * @private
     * @type {Array<number>}
     */

    _this.orientedFlatCoordinates_ = null;

    if (opt_layout !== undefined && opt_ends) {
      _this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);

      _this.ends_ = opt_ends;
    } else {
      _this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      coordinates, opt_layout);
    }

    return _this;
  }
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */


  Polygon.prototype.appendLinearRing = function (linearRing) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = linearRing.getFlatCoordinates().slice();
    } else {
      (0, _array.extend)(this.flatCoordinates, linearRing.getFlatCoordinates());
    }

    this.ends_.push(this.flatCoordinates.length);
    this.changed();
  };
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   */


  Polygon.prototype.clone = function () {
    var polygon = new Polygon(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
    polygon.applyProperties(this);
    return polygon;
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  Polygon.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0, _extent.closestSquaredDistanceXY)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0, _closest.arrayMaxSquaredDelta)(this.flatCoordinates, 0, this.ends_, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0, _closest.assignClosestArrayPoint)(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */


  Polygon.prototype.containsXY = function (x, y) {
    return (0, _contains.linearRingsContainsXY)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
  };
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */


  Polygon.prototype.getArea = function () {
    return (0, _area.linearRings)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
  };
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [opt_right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */


  Polygon.prototype.getCoordinates = function (opt_right) {
    var flatCoordinates;

    if (opt_right !== undefined) {
      flatCoordinates = this.getOrientedFlatCoordinates().slice();
      (0, _orient.orientLinearRings)(flatCoordinates, 0, this.ends_, this.stride, opt_right);
    } else {
      flatCoordinates = this.flatCoordinates;
    }

    return (0, _inflate.inflateCoordinatesArray)(flatCoordinates, 0, this.ends_, this.stride);
  };
  /**
   * @return {Array<number>} Ends.
   */


  Polygon.prototype.getEnds = function () {
    return this.ends_;
  };
  /**
   * @return {Array<number>} Interior point.
   */


  Polygon.prototype.getFlatInteriorPoint = function () {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      var flatCenter = (0, _extent.getCenter)(this.getExtent());
      this.flatInteriorPoint_ = (0, _interiorpoint.getInteriorPointOfArray)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
      this.flatInteriorPointRevision_ = this.getRevision();
    }

    return this.flatInteriorPoint_;
  };
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */


  Polygon.prototype.getInteriorPoint = function () {
    return new _Point.default(this.getFlatInteriorPoint(), _GeometryLayout.default.XYM);
  };
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */


  Polygon.prototype.getLinearRingCount = function () {
    return this.ends_.length;
  };
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */


  Polygon.prototype.getLinearRing = function (index) {
    if (index < 0 || this.ends_.length <= index) {
      return null;
    }

    return new _LinearRing.default(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
  };
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */


  Polygon.prototype.getLinearRings = function () {
    var layout = this.layout;
    var flatCoordinates = this.flatCoordinates;
    var ends = this.ends_;
    var linearRings = [];
    var offset = 0;

    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var linearRing = new _LinearRing.default(flatCoordinates.slice(offset, end), layout);
      linearRings.push(linearRing);
      offset = end;
    }

    return linearRings;
  };
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */


  Polygon.prototype.getOrientedFlatCoordinates = function () {
    if (this.orientedRevision_ != this.getRevision()) {
      var flatCoordinates = this.flatCoordinates;

      if ((0, _orient.linearRingsAreOriented)(flatCoordinates, 0, this.ends_, this.stride)) {
        this.orientedFlatCoordinates_ = flatCoordinates;
      } else {
        this.orientedFlatCoordinates_ = flatCoordinates.slice();
        this.orientedFlatCoordinates_.length = (0, _orient.orientLinearRings)(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
      }

      this.orientedRevision_ = this.getRevision();
    }

    return this.orientedFlatCoordinates_;
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   */


  Polygon.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    var simplifiedEnds = [];
    simplifiedFlatCoordinates.length = (0, _simplify.quantizeArray)(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
    return new Polygon(simplifiedFlatCoordinates, _GeometryLayout.default.XY, simplifiedEnds);
  };
  /**
   * Get the type of this geometry.
   * @return {import("./GeometryType.js").default} Geometry type.
   * @api
   */


  Polygon.prototype.getType = function () {
    return _GeometryType.default.POLYGON;
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */


  Polygon.prototype.intersectsExtent = function (extent) {
    return (0, _intersectsextent.intersectsLinearRingArray)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
  };
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
   * @api
   */


  Polygon.prototype.setCoordinates = function (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 2);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    var ends = (0, _deflate.deflateCoordinatesArray)(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
    this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
    this.changed();
  };

  return Polygon;
}(_SimpleGeometry.default);

var _default = Polygon;
/**
 * Create an approximation of a circle on the surface of a sphere.
 * @param {import("../coordinate.js").Coordinate} center Center (`[lon, lat]` in degrees).
 * @param {number} radius The great-circle distance from the center to
 *     the polygon vertices in meters.
 * @param {number} [opt_n] Optional number of vertices for the resulting
 *     polygon. Default is `32`.
 * @param {number} [opt_sphereRadius] Optional radius for the sphere (defaults to
 *     the Earth's mean radius using the WGS84 ellipsoid).
 * @return {Polygon} The "circular" polygon.
 * @api
 */

exports.default = _default;

function circular(center, radius, opt_n, opt_sphereRadius) {
  var n = opt_n ? opt_n : 32;
  /** @type {Array<number>} */

  var flatCoordinates = [];

  for (var i = 0; i < n; ++i) {
    (0, _array.extend)(flatCoordinates, (0, _sphere.offset)(center, radius, 2 * Math.PI * i / n, opt_sphereRadius));
  }

  flatCoordinates.push(flatCoordinates[0], flatCoordinates[1]);
  return new Polygon(flatCoordinates, _GeometryLayout.default.XY, [flatCoordinates.length]);
}
/**
 * Create a polygon from an extent. The layout used is `XY`.
 * @param {import("../extent.js").Extent} extent The extent.
 * @return {Polygon} The polygon.
 * @api
 */


function fromExtent(extent) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var flatCoordinates = [minX, minY, minX, maxY, maxX, maxY, maxX, minY, minX, minY];
  return new Polygon(flatCoordinates, _GeometryLayout.default.XY, [flatCoordinates.length]);
}
/**
 * Create a regular polygon from a circle.
 * @param {import("./Circle.js").default} circle Circle geometry.
 * @param {number} [opt_sides] Number of sides of the polygon. Default is 32.
 * @param {number} [opt_angle] Start angle for the first vertex of the polygon in
 *     counter-clockwise radians. 0 means East. Default is 0.
 * @return {Polygon} Polygon geometry.
 * @api
 */


function fromCircle(circle, opt_sides, opt_angle) {
  var sides = opt_sides ? opt_sides : 32;
  var stride = circle.getStride();
  var layout = circle.getLayout();
  var center = circle.getCenter();
  var arrayLength = stride * (sides + 1);
  var flatCoordinates = new Array(arrayLength);

  for (var i = 0; i < arrayLength; i += stride) {
    flatCoordinates[i] = 0;
    flatCoordinates[i + 1] = 0;

    for (var j = 2; j < stride; j++) {
      flatCoordinates[i + j] = center[j];
    }
  }

  var ends = [flatCoordinates.length];
  var polygon = new Polygon(flatCoordinates, layout, ends);
  makeRegular(polygon, center, circle.getRadius(), opt_angle);
  return polygon;
}
/**
 * Modify the coordinates of a polygon to make it a regular polygon.
 * @param {Polygon} polygon Polygon geometry.
 * @param {import("../coordinate.js").Coordinate} center Center of the regular polygon.
 * @param {number} radius Radius of the regular polygon.
 * @param {number} [opt_angle] Start angle for the first vertex of the polygon in
 *     counter-clockwise radians. 0 means East. Default is 0.
 */


function makeRegular(polygon, center, radius, opt_angle) {
  var flatCoordinates = polygon.getFlatCoordinates();
  var stride = polygon.getStride();
  var sides = flatCoordinates.length / stride - 1;
  var startAngle = opt_angle ? opt_angle : 0;

  for (var i = 0; i <= sides; ++i) {
    var offset = i * stride;
    var angle = startAngle + (0, _math.modulo)(i, sides) * 2 * Math.PI / sides;
    flatCoordinates[offset] = center[0] + radius * Math.cos(angle);
    flatCoordinates[offset + 1] = center[1] + radius * Math.sin(angle);
  }

  polygon.changed();
}
},{"./GeometryLayout.js":"node_modules/ol/geom/GeometryLayout.js","./GeometryType.js":"node_modules/ol/geom/GeometryType.js","./LinearRing.js":"node_modules/ol/geom/LinearRing.js","./Point.js":"node_modules/ol/geom/Point.js","./SimpleGeometry.js":"node_modules/ol/geom/SimpleGeometry.js","./flat/closest.js":"node_modules/ol/geom/flat/closest.js","../extent.js":"node_modules/ol/extent.js","./flat/deflate.js":"node_modules/ol/geom/flat/deflate.js","../array.js":"node_modules/ol/array.js","./flat/interiorpoint.js":"node_modules/ol/geom/flat/interiorpoint.js","./flat/inflate.js":"node_modules/ol/geom/flat/inflate.js","./flat/intersectsextent.js":"node_modules/ol/geom/flat/intersectsextent.js","./flat/orient.js":"node_modules/ol/geom/flat/orient.js","./flat/area.js":"node_modules/ol/geom/flat/area.js","./flat/contains.js":"node_modules/ol/geom/flat/contains.js","../math.js":"node_modules/ol/math.js","./flat/simplify.js":"node_modules/ol/geom/flat/simplify.js","../sphere.js":"node_modules/ol/sphere.js"}],"node_modules/ol/View.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCenterConstraint = createCenterConstraint;
exports.createResolutionConstraint = createResolutionConstraint;
exports.createRotationConstraint = createRotationConstraint;
exports.default = void 0;
exports.isNoopAnimation = isNoopAnimation;

var _Object = _interopRequireDefault(require("./Object.js"));

var _GeometryType = _interopRequireDefault(require("./geom/GeometryType.js"));

var _Units = _interopRequireDefault(require("./proj/Units.js"));

var _ViewHint = _interopRequireDefault(require("./ViewHint.js"));

var _ViewProperty = _interopRequireDefault(require("./ViewProperty.js"));

var _common = require("./tilegrid/common.js");

var _proj = require("./proj.js");

var _functions = require("./functions.js");

var _coordinate = require("./coordinate.js");

var _asserts = require("./asserts.js");

var _obj = require("./obj.js");

var _centerconstraint = require("./centerconstraint.js");

var _math = require("./math.js");

var _resolutionconstraint = require("./resolutionconstraint.js");

var _rotationconstraint = require("./rotationconstraint.js");

var _easing = require("./easing.js");

var _extent = require("./extent.js");

var _array = require("./array.js");

var _Polygon = require("./geom/Polygon.js");

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
 * @module ol/View
 */


/**
 * An animation configuration
 *
 * @typedef {Object} Animation
 * @property {import("./coordinate.js").Coordinate} [sourceCenter] Source center.
 * @property {import("./coordinate.js").Coordinate} [targetCenter] Target center.
 * @property {number} [sourceResolution] Source resolution.
 * @property {number} [targetResolution] Target resolution.
 * @property {number} [sourceRotation] Source rotation.
 * @property {number} [targetRotation] Target rotation.
 * @property {import("./coordinate.js").Coordinate} [anchor] Anchor.
 * @property {number} start Start.
 * @property {number} duration Duration.
 * @property {boolean} complete Complete.
 * @property {function(number):number} easing Easing.
 * @property {function(boolean):void} callback Callback.
 */

/**
 * @typedef {Object} Constraints
 * @property {import("./centerconstraint.js").Type} center Center.
 * @property {import("./resolutionconstraint.js").Type} resolution Resolution.
 * @property {import("./rotationconstraint.js").Type} rotation Rotation.
 */

/**
 * @typedef {Object} FitOptions
 * @property {import("./size.js").Size} [size] The size in pixels of the box to fit
 * the extent into. Default is the current size of the first map in the DOM that
 * uses this view, or `[100, 100]` if no such map is found.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in pixels) to be
 * cleared inside the view. Values in the array are top, right, bottom and left
 * padding.
 * @property {boolean} [nearest=false] If the view `constrainResolution` option is `true`,
 * get the nearest extent instead of the closest that actually fits the view.
 * @property {number} [minResolution=0] Minimum resolution that we zoom to.
 * @property {number} [maxZoom] Maximum zoom level that we zoom to. If
 * `minResolution` is given, this property is ignored.
 * @property {number} [duration] The duration of the animation in milliseconds.
 * By default, there is no animation to the target extent.
 * @property {function(number):number} [easing] The easing function used during
 * the animation (defaults to {@link module:ol/easing.inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 * @property {function(boolean):void} [callback] Function called when the view is in
 * its final position. The callback will be called with `true` if the animation
 * series completed on its own or `false` if it was cancelled.
 */

/**
 * @typedef {Object} ViewOptions
 * @property {import("./coordinate.js").Coordinate} [center] The initial center for
 * the view. If a user projection is not set, the coordinate system for the center is
 * specified with the `projection` option. Layer sources will not be fetched if this
 * is not set, but the center can be set later with {@link #setCenter}.
 * @property {boolean|number} [constrainRotation=true] Rotation constraint.
 * `false` means no constraint. `true` means no constraint, but snap to zero
 * near zero. A number constrains the rotation to that number of values. For
 * example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
 * @property {boolean} [enableRotation=true] Enable rotation.
 * If `false`, a rotation constraint that always sets the rotation to zero is
 * used. The `constrainRotation` option has no effect if `enableRotation` is
 * `false`.
 * @property {import("./extent.js").Extent} [extent] The extent that constrains the
 * view, in other words, nothing outside of this extent can be visible on the map.
 * @property {boolean} [constrainOnlyCenter=false] If true, the extent
 * constraint will only apply to the view center and not the whole extent.
 * @property {boolean} [smoothExtentConstraint=true] If true, the extent
 * constraint will be applied smoothly, i.e. allow the view to go slightly outside
 * of the given `extent`.
 * @property {number} [maxResolution] The maximum resolution used to determine
 * the resolution constraint. It is used together with `minResolution` (or
 * `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
 * that the projection's validity extent fits in a 256x256 px tile. If the
 * projection is Spherical Mercator (the default) then `maxResolution` defaults
 * to `40075016.68557849 / 256 = 156543.03392804097`.
 * @property {number} [minResolution] The minimum resolution used to determine
 * the resolution constraint.  It is used together with `maxResolution` (or
 * `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
 * zoom levels (with a factor of 2). If the projection is Spherical Mercator
 * (the default) then `minResolution` defaults to
 * `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
 * @property {number} [maxZoom=28] The maximum zoom level used to determine the
 * resolution constraint. It is used together with `minZoom` (or
 * `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
 * provided, it is given precedence over `maxZoom`.
 * @property {number} [minZoom=0] The minimum zoom level used to determine the
 * resolution constraint. It is used together with `maxZoom` (or
 * `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
 * provided, it is given precedence over `minZoom`.
 * @property {boolean} [multiWorld=false] If `false` the view is constrained so
 * only one world is visible, and you cannot pan off the edge.  If `true` the map
 * may show multiple worlds at low zoom levels.  Only used if the `projection` is
 * global.  Note that if `extent` is also provided it is given precedence.
 * @property {boolean} [constrainResolution=false] If true, the view will always
 * animate to the closest zoom level after an interaction; false means
 * intermediary zoom levels are allowed.
 * @property {boolean} [smoothResolutionConstraint=true] If true, the resolution
 * min/max values will be applied smoothly, i. e. allow the view to exceed slightly
 * the given resolution or zoom bounds.
 * @property {boolean} [showFullExtent=false] Allow the view to be zoomed out to
 * show the full configured extent. By default, when a view is configured with an
 * extent, users will not be able to zoom out so the viewport exceeds the extent in
 * either dimension. This means the full extent may not be visible if the viewport
 * is taller or wider than the aspect ratio of the configured extent. If
 * showFullExtent is true, the user will be able to zoom out so that the viewport
 * exceeds the height or width of the configured extent, but not both, allowing the
 * full extent to be shown.
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857'] The
 * projection. The default is Spherical Mercator.
 * @property {number} [resolution] The initial resolution for the view. The
 * units are `projection` units per pixel (e.g. meters per pixel). An
 * alternative to setting this is to set `zoom`. Layer sources will not be
 * fetched if neither this nor `zoom` are defined, but they can be set later
 * with {@link #setZoom} or {@link #setResolution}.
 * @property {Array<number>} [resolutions] Resolutions that determine the
 * zoom levels if specified. The index in the array corresponds to the zoom level,
 * therefore the resolution values have to be in descending order. It also constrains
 * the resolution by the minimum and maximum value. If set the `maxResolution`,
 * `minResolution`, `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
 * @property {number} [rotation=0] The initial rotation for the view in radians
 * (positive rotation clockwise, 0 means North).
 * @property {number} [zoom] Only used if `resolution` is not defined. Zoom
 * level used to calculate the initial resolution for the view.
 * @property {number} [zoomFactor=2] The zoom factor used to compute the
 * corresponding resolution.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in css pixels).
 * If the map viewport is partially covered with other content (overlays) along
 * its edges, this setting allows to shift the center of the viewport away from
 * that content. The order of the values is top, right, bottom, left.
 */

/**
 * @typedef {Object} AnimationOptions
 * @property {import("./coordinate.js").Coordinate} [center] The center of the view at the end of
 * the animation.
 * @property {number} [zoom] The zoom level of the view at the end of the
 * animation. This takes precedence over `resolution`.
 * @property {number} [resolution] The resolution of the view at the end
 * of the animation.  If `zoom` is also provided, this option will be ignored.
 * @property {number} [rotation] The rotation of the view at the end of
 * the animation.
 * @property {import("./coordinate.js").Coordinate} [anchor] Optional anchor to remain fixed
 * during a rotation or resolution animation.
 * @property {number} [duration=1000] The duration of the animation in milliseconds.
 * @property {function(number):number} [easing] The easing function used
 * during the animation (defaults to {@link module:ol/easing.inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 */

/**
 * @typedef {Object} State
 * @property {import("./coordinate.js").Coordinate} center Center.
 * @property {import("./proj/Projection.js").default} projection Projection.
 * @property {number} resolution Resolution.
 * @property {import("./coordinate.js").Coordinate} [nextCenter] The next center during an animation series.
 * @property {number} [nextResolution] The next resolution during an animation series.
 * @property {number} [nextRotation] The next rotation during an animation series.
 * @property {number} rotation Rotation.
 * @property {number} zoom Zoom.
 */

/**
 * Default min zoom level for the map view.
 * @type {number}
 */
var DEFAULT_MIN_ZOOM = 0;
/**
 * @typedef {import("./ObjectEventType").Types|'change:center'|'change:resolution'|'change:rotation'} ViewObjectEventTypes
 */

/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<ViewObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|ViewObjectEventTypes, Return>} ViewOnSignature
 */

/**
 * @classdesc
 * A View object represents a simple 2D view of the map.
 *
 * This is the object to act upon to change the center, resolution,
 * and rotation of the map.
 *
 * A View has a `projection`. The projection determines the
 * coordinate system of the center, and its units determine the units of the
 * resolution (projection units per pixel). The default projection is
 * Web Mercator (EPSG:3857).
 *
 * ### The view states
 *
 * A View is determined by three states: `center`, `resolution`,
 * and `rotation`. Each state has a corresponding getter and setter, e.g.
 * `getCenter` and `setCenter` for the `center` state.
 *
 * The `zoom` state is actually not saved on the view: all computations
 * internally use the `resolution` state. Still, the `setZoom` and `getZoom`
 * methods are available, as well as `getResolutionForZoom` and
 * `getZoomForResolution` to switch from one system to the other.
 *
 * ### The constraints
 *
 * `setCenter`, `setResolution` and `setRotation` can be used to change the
 * states of the view, but any constraint defined in the constructor will
 * be applied along the way.
 *
 * A View object can have a *resolution constraint*, a *rotation constraint*
 * and a *center constraint*.
 *
 * The *resolution constraint* typically restricts min/max values and
 * snaps to specific resolutions. It is determined by the following
 * options: `resolutions`, `maxResolution`, `maxZoom` and `zoomFactor`.
 * If `resolutions` is set, the other three options are ignored. See
 * documentation for each option for more information. By default, the view
 * only has a min/max restriction and allow intermediary zoom levels when
 * pinch-zooming for example.
 *
 * The *rotation constraint* snaps to specific angles. It is determined
 * by the following options: `enableRotation` and `constrainRotation`.
 * By default rotation is allowed and its value is snapped to zero when approaching the
 * horizontal.
 *
 * The *center constraint* is determined by the `extent` option. By
 * default the view center is not constrained at all.
 *
 * ### Changing the view state
 *
 * It is important to note that `setZoom`, `setResolution`, `setCenter` and
 * `setRotation` are subject to the above mentioned constraints. As such, it
 * may sometimes not be possible to know in advance the resulting state of the
 * View. For example, calling `setResolution(10)` does not guarantee that
 * `getResolution()` will return `10`.
 *
 * A consequence of this is that, when applying a delta on the view state, one
 * should use `adjustCenter`, `adjustRotation`, `adjustZoom` and `adjustResolution`
 * rather than the corresponding setters. This will let view do its internal
 * computations. Besides, the `adjust*` methods also take an `opt_anchor`
 * argument which allows specifying an origin for the transformation.
 *
 * ### Interacting with the view
 *
 * View constraints are usually only applied when the view is *at rest*, meaning that
 * no interaction or animation is ongoing. As such, if the user puts the view in a
 * state that is not equivalent to a constrained one (e.g. rotating the view when
 * the snap angle is 0), an animation will be triggered at the interaction end to
 * put back the view to a stable state;
 *
 * @api
 */

var View =
/** @class */
function (_super) {
  __extends(View, _super);
  /**
   * @param {ViewOptions} [opt_options] View options.
   */


  function View(opt_options) {
    var _this = _super.call(this) || this;
    /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */


    _this.on;
    /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */

    _this.once;
    /***
     * @type {ViewOnSignature<void>}
     */

    _this.un;
    var options = (0, _obj.assign)({}, opt_options);
    /**
     * @private
     * @type {Array<number>}
     */

    _this.hints_ = [0, 0];
    /**
     * @private
     * @type {Array<Array<Animation>>}
     */

    _this.animations_ = [];
    /**
     * @private
     * @type {number|undefined}
     */

    _this.updateAnimationKey_;
    /**
     * @private
     * @const
     * @type {import("./proj/Projection.js").default}
     */

    _this.projection_ = (0, _proj.createProjection)(options.projection, 'EPSG:3857');
    /**
     * @private
     * @type {import("./size.js").Size}
     */

    _this.viewportSize_ = [100, 100];
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */

    _this.targetCenter_ = null;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.targetResolution_;
    /**
     * @private
     * @type {number|undefined}
     */

    _this.targetRotation_;
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate}
     */

    _this.nextCenter_ = null;
    /**
     * @private
     * @type {number}
     */

    _this.nextResolution_;
    /**
     * @private
     * @type {number}
     */

    _this.nextRotation_;
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */

    _this.cancelAnchor_ = undefined;

    if (options.projection) {
      (0, _proj.disableCoordinateWarning)();
    }

    if (options.center) {
      options.center = (0, _proj.fromUserCoordinate)(options.center, _this.projection_);
    }

    if (options.extent) {
      options.extent = (0, _proj.fromUserExtent)(options.extent, _this.projection_);
    }

    _this.applyOptions_(options);

    return _this;
  }
  /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */


  View.prototype.applyOptions_ = function (options) {
    var properties = (0, _obj.assign)({}, options);

    for (var key in _ViewProperty.default) {
      delete properties[key];
    }

    this.setProperties(properties, true);
    var resolutionConstraintInfo = createResolutionConstraint(options);
    /**
     * @private
     * @type {number}
     */

    this.maxResolution_ = resolutionConstraintInfo.maxResolution;
    /**
     * @private
     * @type {number}
     */

    this.minResolution_ = resolutionConstraintInfo.minResolution;
    /**
     * @private
     * @type {number}
     */

    this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
    /**
     * @private
     * @type {Array<number>|undefined}
     */

    this.resolutions_ = options.resolutions;
    /**
     * @type {Array<number>|undefined}
     * @private
     */

    this.padding_ = options.padding;
    /**
     * @private
     * @type {number}
     */

    this.minZoom_ = resolutionConstraintInfo.minZoom;
    var centerConstraint = createCenterConstraint(options);
    var resolutionConstraint = resolutionConstraintInfo.constraint;
    var rotationConstraint = createRotationConstraint(options);
    /**
     * @private
     * @type {Constraints}
     */

    this.constraints_ = {
      center: centerConstraint,
      resolution: resolutionConstraint,
      rotation: rotationConstraint
    };
    this.setRotation(options.rotation !== undefined ? options.rotation : 0);
    this.setCenterInternal(options.center !== undefined ? options.center : null);

    if (options.resolution !== undefined) {
      this.setResolution(options.resolution);
    } else if (options.zoom !== undefined) {
      this.setZoom(options.zoom);
    }
  };

  Object.defineProperty(View.prototype, "padding", {
    /**
     * Padding (in css pixels).
     * If the map viewport is partially covered with other content (overlays) along
     * its edges, this setting allows to shift the center of the viewport away from that
     * content. The order of the values in the array is top, right, bottom, left.
     * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
     * @type {Array<number>|undefined}
     * @api
     */
    get: function () {
      return this.padding_;
    },
    set: function (padding) {
      var oldPadding = this.padding_;
      this.padding_ = padding;
      var center = this.getCenter();

      if (center) {
        var newPadding = padding || [0, 0, 0, 0];
        oldPadding = oldPadding || [0, 0, 0, 0];
        var resolution = this.getResolution();
        var offsetX = resolution / 2 * (newPadding[3] - oldPadding[3] + oldPadding[1] - newPadding[1]);
        var offsetY = resolution / 2 * (newPadding[0] - oldPadding[0] + oldPadding[2] - newPadding[2]);
        this.setCenterInternal([center[0] + offsetX, center[1] - offsetY]);
      }
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */

  View.prototype.getUpdatedOptions_ = function (newOptions) {
    var options = this.getProperties(); // preserve resolution (or zoom)

    if (options.resolution !== undefined) {
      options.resolution = this.getResolution();
    } else {
      options.zoom = this.getZoom();
    } // preserve center


    options.center = this.getCenterInternal(); // preserve rotation

    options.rotation = this.getRotation();
    return (0, _obj.assign)({}, options, newOptions);
  };
  /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */


  View.prototype.animate = function (var_args) {
    if (this.isDef() && !this.getAnimating()) {
      this.resolveConstraints(0);
    }

    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; ++i) {
      var options = arguments[i];

      if (options.center) {
        options = (0, _obj.assign)({}, options);
        options.center = (0, _proj.fromUserCoordinate)(options.center, this.getProjection());
      }

      if (options.anchor) {
        options = (0, _obj.assign)({}, options);
        options.anchor = (0, _proj.fromUserCoordinate)(options.anchor, this.getProjection());
      }

      args[i] = options;
    }

    this.animateInternal.apply(this, args);
  };
  /**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */


  View.prototype.animateInternal = function (var_args) {
    var animationCount = arguments.length;
    var callback;

    if (animationCount > 1 && typeof arguments[animationCount - 1] === 'function') {
      callback = arguments[animationCount - 1];
      --animationCount;
    }

    var i = 0;

    for (; i < animationCount && !this.isDef(); ++i) {
      // if view properties are not yet set, shortcut to the final state
      var state = arguments[i];

      if (state.center) {
        this.setCenterInternal(state.center);
      }

      if (state.zoom !== undefined) {
        this.setZoom(state.zoom);
      } else if (state.resolution) {
        this.setResolution(state.resolution);
      }

      if (state.rotation !== undefined) {
        this.setRotation(state.rotation);
      }
    }

    if (i === animationCount) {
      if (callback) {
        animationCallback(callback, true);
      }

      return;
    }

    var start = Date.now();
    var center = this.targetCenter_.slice();
    var resolution = this.targetResolution_;
    var rotation = this.targetRotation_;
    var series = [];

    for (; i < animationCount; ++i) {
      var options =
      /** @type {AnimationOptions} */
      arguments[i];
      var animation = {
        start: start,
        complete: false,
        anchor: options.anchor,
        duration: options.duration !== undefined ? options.duration : 1000,
        easing: options.easing || _easing.inAndOut,
        callback: callback
      };

      if (options.center) {
        animation.sourceCenter = center;
        animation.targetCenter = options.center.slice();
        center = animation.targetCenter;
      }

      if (options.zoom !== undefined) {
        animation.sourceResolution = resolution;
        animation.targetResolution = this.getResolutionForZoom(options.zoom);
        resolution = animation.targetResolution;
      } else if (options.resolution) {
        animation.sourceResolution = resolution;
        animation.targetResolution = options.resolution;
        resolution = animation.targetResolution;
      }

      if (options.rotation !== undefined) {
        animation.sourceRotation = rotation;
        var delta = (0, _math.modulo)(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
        animation.targetRotation = rotation + delta;
        rotation = animation.targetRotation;
      } // check if animation is a no-op


      if (isNoopAnimation(animation)) {
        animation.complete = true; // we still push it onto the series for callback handling
      } else {
        start += animation.duration;
      }

      series.push(animation);
    }

    this.animations_.push(series);
    this.setHint(_ViewHint.default.ANIMATING, 1);
    this.updateAnimations_();
  };
  /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */


  View.prototype.getAnimating = function () {
    return this.hints_[_ViewHint.default.ANIMATING] > 0;
  };
  /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */


  View.prototype.getInteracting = function () {
    return this.hints_[_ViewHint.default.INTERACTING] > 0;
  };
  /**
   * Cancel any ongoing animations.
   * @api
   */


  View.prototype.cancelAnimations = function () {
    this.setHint(_ViewHint.default.ANIMATING, -this.hints_[_ViewHint.default.ANIMATING]);
    var anchor;

    for (var i = 0, ii = this.animations_.length; i < ii; ++i) {
      var series = this.animations_[i];

      if (series[0].callback) {
        animationCallback(series[0].callback, false);
      }

      if (!anchor) {
        for (var j = 0, jj = series.length; j < jj; ++j) {
          var animation = series[j];

          if (!animation.complete) {
            anchor = animation.anchor;
            break;
          }
        }
      }
    }

    this.animations_.length = 0;
    this.cancelAnchor_ = anchor;
    this.nextCenter_ = null;
    this.nextResolution_ = NaN;
    this.nextRotation_ = NaN;
  };
  /**
   * Update all animations.
   */


  View.prototype.updateAnimations_ = function () {
    if (this.updateAnimationKey_ !== undefined) {
      cancelAnimationFrame(this.updateAnimationKey_);
      this.updateAnimationKey_ = undefined;
    }

    if (!this.getAnimating()) {
      return;
    }

    var now = Date.now();
    var more = false;

    for (var i = this.animations_.length - 1; i >= 0; --i) {
      var series = this.animations_[i];
      var seriesComplete = true;

      for (var j = 0, jj = series.length; j < jj; ++j) {
        var animation = series[j];

        if (animation.complete) {
          continue;
        }

        var elapsed = now - animation.start;
        var fraction = animation.duration > 0 ? elapsed / animation.duration : 1;

        if (fraction >= 1) {
          animation.complete = true;
          fraction = 1;
        } else {
          seriesComplete = false;
        }

        var progress = animation.easing(fraction);

        if (animation.sourceCenter) {
          var x0 = animation.sourceCenter[0];
          var y0 = animation.sourceCenter[1];
          var x1 = animation.targetCenter[0];
          var y1 = animation.targetCenter[1];
          this.nextCenter_ = animation.targetCenter;
          var x = x0 + progress * (x1 - x0);
          var y = y0 + progress * (y1 - y0);
          this.targetCenter_ = [x, y];
        }

        if (animation.sourceResolution && animation.targetResolution) {
          var resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);

          if (animation.anchor) {
            var size = this.getViewportSize_(this.getRotation());
            var constrainedResolution = this.constraints_.resolution(resolution, 0, size, true);
            this.targetCenter_ = this.calculateCenterZoom(constrainedResolution, animation.anchor);
          }

          this.nextResolution_ = animation.targetResolution;
          this.targetResolution_ = resolution;
          this.applyTargetState_(true);
        }

        if (animation.sourceRotation !== undefined && animation.targetRotation !== undefined) {
          var rotation = progress === 1 ? (0, _math.modulo)(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);

          if (animation.anchor) {
            var constrainedRotation = this.constraints_.rotation(rotation, true);
            this.targetCenter_ = this.calculateCenterRotate(constrainedRotation, animation.anchor);
          }

          this.nextRotation_ = animation.targetRotation;
          this.targetRotation_ = rotation;
        }

        this.applyTargetState_(true);
        more = true;

        if (!animation.complete) {
          break;
        }
      }

      if (seriesComplete) {
        this.animations_[i] = null;
        this.setHint(_ViewHint.default.ANIMATING, -1);
        this.nextCenter_ = null;
        this.nextResolution_ = NaN;
        this.nextRotation_ = NaN;
        var callback = series[0].callback;

        if (callback) {
          animationCallback(callback, true);
        }
      }
    } // prune completed series


    this.animations_ = this.animations_.filter(Boolean);

    if (more && this.updateAnimationKey_ === undefined) {
      this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this));
    }
  };
  /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */


  View.prototype.calculateCenterRotate = function (rotation, anchor) {
    var center;
    var currentCenter = this.getCenterInternal();

    if (currentCenter !== undefined) {
      center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
      (0, _coordinate.rotate)(center, rotation - this.getRotation());
      (0, _coordinate.add)(center, anchor);
    }

    return center;
  };
  /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */


  View.prototype.calculateCenterZoom = function (resolution, anchor) {
    var center;
    var currentCenter = this.getCenterInternal();
    var currentResolution = this.getResolution();

    if (currentCenter !== undefined && currentResolution !== undefined) {
      var x = anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution;
      var y = anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution;
      center = [x, y];
    }

    return center;
  };
  /**
   * Returns the current viewport size.
   * @private
   * @param {number} [opt_rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */


  View.prototype.getViewportSize_ = function (opt_rotation) {
    var size = this.viewportSize_;

    if (opt_rotation) {
      var w = size[0];
      var h = size[1];
      return [Math.abs(w * Math.cos(opt_rotation)) + Math.abs(h * Math.sin(opt_rotation)), Math.abs(w * Math.sin(opt_rotation)) + Math.abs(h * Math.cos(opt_rotation))];
    } else {
      return size;
    }
  };
  /**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [opt_size] Viewport size; if undefined, [100, 100] is assumed
   */


  View.prototype.setViewportSize = function (opt_size) {
    this.viewportSize_ = Array.isArray(opt_size) ? opt_size.slice() : [100, 100];

    if (!this.getAnimating()) {
      this.resolveConstraints(0);
    }
  };
  /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */


  View.prototype.getCenter = function () {
    var center = this.getCenterInternal();

    if (!center) {
      return center;
    }

    return (0, _proj.toUserCoordinate)(center, this.getProjection());
  };
  /**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */


  View.prototype.getCenterInternal = function () {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(_ViewProperty.default.CENTER)
    );
  };
  /**
   * @return {Constraints} Constraints.
   */


  View.prototype.getConstraints = function () {
    return this.constraints_;
  };
  /**
   * @return {boolean} Resolution constraint is set
   */


  View.prototype.getConstrainResolution = function () {
    return this.get('constrainResolution');
  };
  /**
   * @param {Array<number>} [opt_hints] Destination array.
   * @return {Array<number>} Hint.
   */


  View.prototype.getHints = function (opt_hints) {
    if (opt_hints !== undefined) {
      opt_hints[0] = this.hints_[0];
      opt_hints[1] = this.hints_[1];
      return opt_hints;
    } else {
      return this.hints_.slice();
    }
  };
  /**
   * Calculate the extent for the current view state and the passed size.
   * The size is the pixel dimensions of the box into which the calculated extent
   * should fit. In most cases you want to get the extent of the entire map,
   * that is `map.getSize()`.
   * @param {import("./size.js").Size} [opt_size] Box pixel size. If not provided, the size
   * of the map that uses this view will be used.
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */


  View.prototype.calculateExtent = function (opt_size) {
    var extent = this.calculateExtentInternal(opt_size);
    return (0, _proj.toUserExtent)(extent, this.getProjection());
  };
  /**
   * @param {import("./size.js").Size} [opt_size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */


  View.prototype.calculateExtentInternal = function (opt_size) {
    var size = opt_size || this.getViewportSizeMinusPadding_();
    var center =
    /** @type {!import("./coordinate.js").Coordinate} */
    this.getCenterInternal();
    (0, _asserts.assert)(center, 1); // The view center is not defined

    var resolution =
    /** @type {!number} */
    this.getResolution();
    (0, _asserts.assert)(resolution !== undefined, 2); // The view resolution is not defined

    var rotation =
    /** @type {!number} */
    this.getRotation();
    (0, _asserts.assert)(rotation !== undefined, 3); // The view rotation is not defined

    return (0, _extent.getForViewAndSize)(center, resolution, rotation, size);
  };
  /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */


  View.prototype.getMaxResolution = function () {
    return this.maxResolution_;
  };
  /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */


  View.prototype.getMinResolution = function () {
    return this.minResolution_;
  };
  /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */


  View.prototype.getMaxZoom = function () {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.minResolution_)
    );
  };
  /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */


  View.prototype.setMaxZoom = function (zoom) {
    this.applyOptions_(this.getUpdatedOptions_({
      maxZoom: zoom
    }));
  };
  /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */


  View.prototype.getMinZoom = function () {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.maxResolution_)
    );
  };
  /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */


  View.prototype.setMinZoom = function (zoom) {
    this.applyOptions_(this.getUpdatedOptions_({
      minZoom: zoom
    }));
  };
  /**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */


  View.prototype.setConstrainResolution = function (enabled) {
    this.applyOptions_(this.getUpdatedOptions_({
      constrainResolution: enabled
    }));
  };
  /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */


  View.prototype.getProjection = function () {
    return this.projection_;
  };
  /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */


  View.prototype.getResolution = function () {
    return (
      /** @type {number|undefined} */
      this.get(_ViewProperty.default.RESOLUTION)
    );
  };
  /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */


  View.prototype.getResolutions = function () {
    return this.resolutions_;
  };
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [opt_size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */


  View.prototype.getResolutionForExtent = function (extent, opt_size) {
    return this.getResolutionForExtentInternal((0, _proj.fromUserExtent)(extent, this.getProjection()), opt_size);
  };
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [opt_size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */


  View.prototype.getResolutionForExtentInternal = function (extent, opt_size) {
    var size = opt_size || this.getViewportSizeMinusPadding_();
    var xResolution = (0, _extent.getWidth)(extent) / size[0];
    var yResolution = (0, _extent.getHeight)(extent) / size[1];
    return Math.max(xResolution, yResolution);
  };
  /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [opt_power] Power.
   * @return {function(number): number} Resolution for value function.
   */


  View.prototype.getResolutionForValueFunction = function (opt_power) {
    var power = opt_power || 2;
    var maxResolution = this.getConstrainedResolution(this.maxResolution_);
    var minResolution = this.minResolution_;
    var max = Math.log(maxResolution / minResolution) / Math.log(power);
    return (
      /**
       * @param {number} value Value.
       * @return {number} Resolution.
       */
      function (value) {
        var resolution = maxResolution / Math.pow(power, value * max);
        return resolution;
      }
    );
  };
  /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */


  View.prototype.getRotation = function () {
    return (
      /** @type {number} */
      this.get(_ViewProperty.default.ROTATION)
    );
  };
  /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [opt_power] Power.
   * @return {function(number): number} Value for resolution function.
   */


  View.prototype.getValueForResolutionFunction = function (opt_power) {
    var logPower = Math.log(opt_power || 2);
    var maxResolution = this.getConstrainedResolution(this.maxResolution_);
    var minResolution = this.minResolution_;
    var max = Math.log(maxResolution / minResolution) / logPower;
    return (
      /**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */
      function (resolution) {
        var value = Math.log(maxResolution / resolution) / logPower / max;
        return value;
      }
    );
  };
  /**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [opt_rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */


  View.prototype.getViewportSizeMinusPadding_ = function (opt_rotation) {
    var size = this.getViewportSize_(opt_rotation);
    var padding = this.padding_;

    if (padding) {
      size = [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]];
    }

    return size;
  };
  /**
   * @return {State} View state.
   */


  View.prototype.getState = function () {
    var projection = this.getProjection();
    var resolution = this.getResolution();
    var rotation = this.getRotation();
    var center =
    /** @type {import("./coordinate.js").Coordinate} */
    this.getCenterInternal();
    var padding = this.padding_;

    if (padding) {
      var reducedSize = this.getViewportSizeMinusPadding_();
      center = calculateCenterOn(center, this.getViewportSize_(), [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
    }

    return {
      center: center.slice(0),
      projection: projection !== undefined ? projection : null,
      resolution: resolution,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: rotation,
      zoom: this.getZoom()
    };
  };
  /**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */


  View.prototype.getZoom = function () {
    var zoom;
    var resolution = this.getResolution();

    if (resolution !== undefined) {
      zoom = this.getZoomForResolution(resolution);
    }

    return zoom;
  };
  /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */


  View.prototype.getZoomForResolution = function (resolution) {
    var offset = this.minZoom_ || 0;
    var max, zoomFactor;

    if (this.resolutions_) {
      var nearest = (0, _array.linearFindNearest)(this.resolutions_, resolution, 1);
      offset = nearest;
      max = this.resolutions_[nearest];

      if (nearest == this.resolutions_.length - 1) {
        zoomFactor = 2;
      } else {
        zoomFactor = max / this.resolutions_[nearest + 1];
      }
    } else {
      max = this.maxResolution_;
      zoomFactor = this.zoomFactor_;
    }

    return offset + Math.log(max / resolution) / Math.log(zoomFactor);
  };
  /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */


  View.prototype.getResolutionForZoom = function (zoom) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1) {
        return 0;
      }

      var baseLevel = (0, _math.clamp)(Math.floor(zoom), 0, this.resolutions_.length - 2);
      var zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
      return this.resolutions_[baseLevel] / Math.pow(zoomFactor, (0, _math.clamp)(zoom - baseLevel, 0, 1));
    } else {
      return this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_);
    }
  };
  /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [opt_options] Options.
   * @api
   */


  View.prototype.fit = function (geometryOrExtent, opt_options) {
    /** @type {import("./geom/SimpleGeometry.js").default} */
    var geometry;
    (0, _asserts.assert)(Array.isArray(geometryOrExtent) || typeof
    /** @type {?} */
    geometryOrExtent.getSimplifiedGeometry === 'function', 24); // Invalid extent or geometry provided as `geometry`

    if (Array.isArray(geometryOrExtent)) {
      (0, _asserts.assert)(!(0, _extent.isEmpty)(geometryOrExtent), 25); // Cannot fit empty extent provided as `geometry`

      var extent = (0, _proj.fromUserExtent)(geometryOrExtent, this.getProjection());
      geometry = (0, _Polygon.fromExtent)(extent);
    } else if (geometryOrExtent.getType() === _GeometryType.default.CIRCLE) {
      var extent = (0, _proj.fromUserExtent)(geometryOrExtent.getExtent(), this.getProjection());
      geometry = (0, _Polygon.fromExtent)(extent);
      geometry.rotate(this.getRotation(), (0, _extent.getCenter)(extent));
    } else {
      var userProjection = (0, _proj.getUserProjection)();

      if (userProjection) {
        geometry =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometryOrExtent.clone().transform(userProjection, this.getProjection());
      } else {
        geometry = geometryOrExtent;
      }
    }

    this.fitInternal(geometry, opt_options);
  };
  /**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */


  View.prototype.rotatedExtentForGeometry = function (geometry) {
    var rotation = this.getRotation();
    var cosAngle = Math.cos(rotation);
    var sinAngle = Math.sin(-rotation);
    var coords = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var minRotX = +Infinity;
    var minRotY = +Infinity;
    var maxRotX = -Infinity;
    var maxRotY = -Infinity;

    for (var i = 0, ii = coords.length; i < ii; i += stride) {
      var rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
      var rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
      minRotX = Math.min(minRotX, rotX);
      minRotY = Math.min(minRotY, rotY);
      maxRotX = Math.max(maxRotX, rotX);
      maxRotY = Math.max(maxRotY, rotY);
    }

    return [minRotX, minRotY, maxRotX, maxRotY];
  };
  /**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [opt_options] Options.
   */


  View.prototype.fitInternal = function (geometry, opt_options) {
    var options = opt_options || {};
    var size = options.size;

    if (!size) {
      size = this.getViewportSizeMinusPadding_();
    }

    var padding = options.padding !== undefined ? options.padding : [0, 0, 0, 0];
    var nearest = options.nearest !== undefined ? options.nearest : false;
    var minResolution;

    if (options.minResolution !== undefined) {
      minResolution = options.minResolution;
    } else if (options.maxZoom !== undefined) {
      minResolution = this.getResolutionForZoom(options.maxZoom);
    } else {
      minResolution = 0;
    }

    var rotatedExtent = this.rotatedExtentForGeometry(geometry); // calculate resolution

    var resolution = this.getResolutionForExtentInternal(rotatedExtent, [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]]);
    resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);
    resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1); // calculate center

    var rotation = this.getRotation();
    var sinAngle = Math.sin(rotation);
    var cosAngle = Math.cos(rotation);
    var centerRot = (0, _extent.getCenter)(rotatedExtent);
    centerRot[0] += (padding[1] - padding[3]) / 2 * resolution;
    centerRot[1] += (padding[0] - padding[2]) / 2 * resolution;
    var centerX = centerRot[0] * cosAngle - centerRot[1] * sinAngle;
    var centerY = centerRot[1] * cosAngle + centerRot[0] * sinAngle;
    var center = this.getConstrainedCenter([centerX, centerY], resolution);
    var callback = options.callback ? options.callback : _functions.VOID;

    if (options.duration !== undefined) {
      this.animateInternal({
        resolution: resolution,
        center: center,
        duration: options.duration,
        easing: options.easing
      }, callback);
    } else {
      this.targetResolution_ = resolution;
      this.targetCenter_ = center;
      this.applyTargetState_(false, true);
      animationCallback(callback, true);
    }
  };
  /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */


  View.prototype.centerOn = function (coordinate, size, position) {
    this.centerOnInternal((0, _proj.fromUserCoordinate)(coordinate, this.getProjection()), size, position);
  };
  /**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */


  View.prototype.centerOnInternal = function (coordinate, size, position) {
    this.setCenterInternal(calculateCenterOn(coordinate, size, position, this.getResolution(), this.getRotation()));
  };
  /**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */


  View.prototype.calculateCenterShift = function (center, resolution, rotation, size) {
    var centerShift;
    var padding = this.padding_;

    if (padding && center) {
      var reducedSize = this.getViewportSizeMinusPadding_(-rotation);
      var shiftedCenter = calculateCenterOn(center, size, [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
      centerShift = [center[0] - shiftedCenter[0], center[1] - shiftedCenter[1]];
    }

    return centerShift;
  };
  /**
   * @return {boolean} Is defined.
   */


  View.prototype.isDef = function () {
    return !!this.getCenterInternal() && this.getResolution() !== undefined;
  };
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */


  View.prototype.adjustCenter = function (deltaCoordinates) {
    var center = (0, _proj.toUserCoordinate)(this.targetCenter_, this.getProjection());
    this.setCenter([center[0] + deltaCoordinates[0], center[1] + deltaCoordinates[1]]);
  };
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */


  View.prototype.adjustCenterInternal = function (deltaCoordinates) {
    var center = this.targetCenter_;
    this.setCenterInternal([center[0] + deltaCoordinates[0], center[1] + deltaCoordinates[1]]);
  };
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   * @api
   */


  View.prototype.adjustResolution = function (ratio, opt_anchor) {
    var anchor = opt_anchor && (0, _proj.fromUserCoordinate)(opt_anchor, this.getProjection());
    this.adjustResolutionInternal(ratio, anchor);
  };
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   */


  View.prototype.adjustResolutionInternal = function (ratio, opt_anchor) {
    var isMoving = this.getAnimating() || this.getInteracting();
    var size = this.getViewportSize_(this.getRotation());
    var newResolution = this.constraints_.resolution(this.targetResolution_ * ratio, 0, size, isMoving);

    if (opt_anchor) {
      this.targetCenter_ = this.calculateCenterZoom(newResolution, opt_anchor);
    }

    this.targetResolution_ *= ratio;
    this.applyTargetState_();
  };
  /**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   * @api
   */


  View.prototype.adjustZoom = function (delta, opt_anchor) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -delta), opt_anchor);
  };
  /**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The rotation center.
   * @api
   */


  View.prototype.adjustRotation = function (delta, opt_anchor) {
    if (opt_anchor) {
      opt_anchor = (0, _proj.fromUserCoordinate)(opt_anchor, this.getProjection());
    }

    this.adjustRotationInternal(delta, opt_anchor);
  };
  /**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The rotation center.
   */


  View.prototype.adjustRotationInternal = function (delta, opt_anchor) {
    var isMoving = this.getAnimating() || this.getInteracting();
    var newRotation = this.constraints_.rotation(this.targetRotation_ + delta, isMoving);

    if (opt_anchor) {
      this.targetCenter_ = this.calculateCenterRotate(newRotation, opt_anchor);
    }

    this.targetRotation_ += delta;
    this.applyTargetState_();
  };
  /**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */


  View.prototype.setCenter = function (center) {
    this.setCenterInternal(center ? (0, _proj.fromUserCoordinate)(center, this.getProjection()) : center);
  };
  /**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */


  View.prototype.setCenterInternal = function (center) {
    this.targetCenter_ = center;
    this.applyTargetState_();
  };
  /**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */


  View.prototype.setHint = function (hint, delta) {
    this.hints_[hint] += delta;
    this.changed();
    return this.hints_[hint];
  };
  /**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */


  View.prototype.setResolution = function (resolution) {
    this.targetResolution_ = resolution;
    this.applyTargetState_();
  };
  /**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */


  View.prototype.setRotation = function (rotation) {
    this.targetRotation_ = rotation;
    this.applyTargetState_();
  };
  /**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */


  View.prototype.setZoom = function (zoom) {
    this.setResolution(this.getResolutionForZoom(zoom));
  };
  /**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [opt_doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [opt_forceMoving] Apply constraints as if the view is moving.
   * @private
   */


  View.prototype.applyTargetState_ = function (opt_doNotCancelAnims, opt_forceMoving) {
    var isMoving = this.getAnimating() || this.getInteracting() || opt_forceMoving; // compute rotation

    var newRotation = this.constraints_.rotation(this.targetRotation_, isMoving);
    var size = this.getViewportSize_(newRotation);
    var newResolution = this.constraints_.resolution(this.targetResolution_, 0, size, isMoving);
    var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, isMoving, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));

    if (this.get(_ViewProperty.default.ROTATION) !== newRotation) {
      this.set(_ViewProperty.default.ROTATION, newRotation);
    }

    if (this.get(_ViewProperty.default.RESOLUTION) !== newResolution) {
      this.set(_ViewProperty.default.RESOLUTION, newResolution);
      this.set('zoom', this.getZoom(), true);
    }

    if (!newCenter || !this.get(_ViewProperty.default.CENTER) || !(0, _coordinate.equals)(this.get(_ViewProperty.default.CENTER), newCenter)) {
      this.set(_ViewProperty.default.CENTER, newCenter);
    }

    if (this.getAnimating() && !opt_doNotCancelAnims) {
      this.cancelAnimations();
    }

    this.cancelAnchor_ = undefined;
  };
  /**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [opt_duration] The animation duration in ms.
   * @param {number} [opt_resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   */


  View.prototype.resolveConstraints = function (opt_duration, opt_resolutionDirection, opt_anchor) {
    var duration = opt_duration !== undefined ? opt_duration : 200;
    var direction = opt_resolutionDirection || 0;
    var newRotation = this.constraints_.rotation(this.targetRotation_);
    var size = this.getViewportSize_(newRotation);
    var newResolution = this.constraints_.resolution(this.targetResolution_, direction, size);
    var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, false, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));

    if (duration === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = newResolution;
      this.targetRotation_ = newRotation;
      this.targetCenter_ = newCenter;
      this.applyTargetState_();
      return;
    }

    var anchor = opt_anchor || (duration === 0 ? this.cancelAnchor_ : undefined);
    this.cancelAnchor_ = undefined;

    if (this.getResolution() !== newResolution || this.getRotation() !== newRotation || !this.getCenterInternal() || !(0, _coordinate.equals)(this.getCenterInternal(), newCenter)) {
      if (this.getAnimating()) {
        this.cancelAnimations();
      }

      this.animateInternal({
        rotation: newRotation,
        center: newCenter,
        resolution: newResolution,
        duration: duration,
        easing: _easing.easeOut,
        anchor: anchor
      });
    }
  };
  /**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */


  View.prototype.beginInteraction = function () {
    this.resolveConstraints(0);
    this.setHint(_ViewHint.default.INTERACTING, 1);
  };
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [opt_duration] Animation duration in ms.
   * @param {number} [opt_resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   * @api
   */


  View.prototype.endInteraction = function (opt_duration, opt_resolutionDirection, opt_anchor) {
    var anchor = opt_anchor && (0, _proj.fromUserCoordinate)(opt_anchor, this.getProjection());
    this.endInteractionInternal(opt_duration, opt_resolutionDirection, anchor);
  };
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [opt_duration] Animation duration in ms.
   * @param {number} [opt_resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
   */


  View.prototype.endInteractionInternal = function (opt_duration, opt_resolutionDirection, opt_anchor) {
    this.setHint(_ViewHint.default.INTERACTING, -1);
    this.resolveConstraints(opt_duration, opt_resolutionDirection, opt_anchor);
  };
  /**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [opt_targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */


  View.prototype.getConstrainedCenter = function (targetCenter, opt_targetResolution) {
    var size = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(targetCenter, opt_targetResolution || this.getResolution(), size);
  };
  /**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [opt_direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */


  View.prototype.getConstrainedZoom = function (targetZoom, opt_direction) {
    var targetRes = this.getResolutionForZoom(targetZoom);
    return this.getZoomForResolution(this.getConstrainedResolution(targetRes, opt_direction));
  };
  /**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [opt_direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */


  View.prototype.getConstrainedResolution = function (targetResolution, opt_direction) {
    var direction = opt_direction || 0;
    var size = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(targetResolution, direction, size);
  };

  return View;
}(_Object.default);
/**
 * @param {Function} callback Callback.
 * @param {*} returnValue Return value.
 */


function animationCallback(callback, returnValue) {
  setTimeout(function () {
    callback(returnValue);
  }, 0);
}
/**
 * @param {ViewOptions} options View options.
 * @return {import("./centerconstraint.js").Type} The constraint.
 */


function createCenterConstraint(options) {
  if (options.extent !== undefined) {
    var smooth = options.smoothExtentConstraint !== undefined ? options.smoothExtentConstraint : true;
    return (0, _centerconstraint.createExtent)(options.extent, options.constrainOnlyCenter, smooth);
  }

  var projection = (0, _proj.createProjection)(options.projection, 'EPSG:3857');

  if (options.multiWorld !== true && projection.isGlobal()) {
    var extent = projection.getExtent().slice();
    extent[0] = -Infinity;
    extent[2] = Infinity;
    return (0, _centerconstraint.createExtent)(extent, false, false);
  }

  return _centerconstraint.none;
}
/**
 * @param {ViewOptions} options View options.
 * @return {{constraint: import("./resolutionconstraint.js").Type, maxResolution: number,
 *     minResolution: number, minZoom: number, zoomFactor: number}} The constraint.
 */


function createResolutionConstraint(options) {
  var resolutionConstraint;
  var maxResolution;
  var minResolution; // TODO: move these to be ol constants
  // see https://github.com/openlayers/openlayers/issues/2076

  var defaultMaxZoom = 28;
  var defaultZoomFactor = 2;
  var minZoom = options.minZoom !== undefined ? options.minZoom : DEFAULT_MIN_ZOOM;
  var maxZoom = options.maxZoom !== undefined ? options.maxZoom : defaultMaxZoom;
  var zoomFactor = options.zoomFactor !== undefined ? options.zoomFactor : defaultZoomFactor;
  var multiWorld = options.multiWorld !== undefined ? options.multiWorld : false;
  var smooth = options.smoothResolutionConstraint !== undefined ? options.smoothResolutionConstraint : true;
  var showFullExtent = options.showFullExtent !== undefined ? options.showFullExtent : false;
  var projection = (0, _proj.createProjection)(options.projection, 'EPSG:3857');
  var projExtent = projection.getExtent();
  var constrainOnlyCenter = options.constrainOnlyCenter;
  var extent = options.extent;

  if (!multiWorld && !extent && projection.isGlobal()) {
    constrainOnlyCenter = false;
    extent = projExtent;
  }

  if (options.resolutions !== undefined) {
    var resolutions = options.resolutions;
    maxResolution = resolutions[minZoom];
    minResolution = resolutions[maxZoom] !== undefined ? resolutions[maxZoom] : resolutions[resolutions.length - 1];

    if (options.constrainResolution) {
      resolutionConstraint = (0, _resolutionconstraint.createSnapToResolutions)(resolutions, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
      resolutionConstraint = (0, _resolutionconstraint.createMinMaxResolution)(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
  } else {
    // calculate the default min and max resolution
    var size = !projExtent ? // use an extent that can fit the whole world if need be
    360 * _proj.METERS_PER_UNIT[_Units.default.DEGREES] / projection.getMetersPerUnit() : Math.max((0, _extent.getWidth)(projExtent), (0, _extent.getHeight)(projExtent));
    var defaultMaxResolution = size / _common.DEFAULT_TILE_SIZE / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
    var defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM); // user provided maxResolution takes precedence

    maxResolution = options.maxResolution;

    if (maxResolution !== undefined) {
      minZoom = 0;
    } else {
      maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
    } // user provided minResolution takes precedence


    minResolution = options.minResolution;

    if (minResolution === undefined) {
      if (options.maxZoom !== undefined) {
        if (options.maxResolution !== undefined) {
          minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
        } else {
          minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
        }
      } else {
        minResolution = defaultMinResolution;
      }
    } // given discrete zoom levels, minResolution may be different than provided


    maxZoom = minZoom + Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
    minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);

    if (options.constrainResolution) {
      resolutionConstraint = (0, _resolutionconstraint.createSnapToPower)(zoomFactor, maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
      resolutionConstraint = (0, _resolutionconstraint.createMinMaxResolution)(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
  }

  return {
    constraint: resolutionConstraint,
    maxResolution: maxResolution,
    minResolution: minResolution,
    minZoom: minZoom,
    zoomFactor: zoomFactor
  };
}
/**
 * @param {ViewOptions} options View options.
 * @return {import("./rotationconstraint.js").Type} Rotation constraint.
 */


function createRotationConstraint(options) {
  var enableRotation = options.enableRotation !== undefined ? options.enableRotation : true;

  if (enableRotation) {
    var constrainRotation = options.constrainRotation;

    if (constrainRotation === undefined || constrainRotation === true) {
      return (0, _rotationconstraint.createSnapToZero)();
    } else if (constrainRotation === false) {
      return _rotationconstraint.none;
    } else if (typeof constrainRotation === 'number') {
      return (0, _rotationconstraint.createSnapToN)(constrainRotation);
    } else {
      return _rotationconstraint.none;
    }
  } else {
    return _rotationconstraint.disable;
  }
}
/**
 * Determine if an animation involves no view change.
 * @param {Animation} animation The animation.
 * @return {boolean} The animation involves no view change.
 */


function isNoopAnimation(animation) {
  if (animation.sourceCenter && animation.targetCenter) {
    if (!(0, _coordinate.equals)(animation.sourceCenter, animation.targetCenter)) {
      return false;
    }
  }

  if (animation.sourceResolution !== animation.targetResolution) {
    return false;
  }

  if (animation.sourceRotation !== animation.targetRotation) {
    return false;
  }

  return true;
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {import("./size.js").Size} size Box pixel size.
 * @param {import("./pixel.js").Pixel} position Position on the view to center on.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @return {import("./coordinate.js").Coordinate} Shifted center.
 */


function calculateCenterOn(coordinate, size, position, resolution, rotation) {
  // calculate rotated position
  var cosAngle = Math.cos(-rotation);
  var sinAngle = Math.sin(-rotation);
  var rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  rotX += (size[0] / 2 - position[0]) * resolution;
  rotY += (position[1] - size[1] / 2) * resolution; // go back to original angle

  sinAngle = -sinAngle; // go back to original rotation

  var centerX = rotX * cosAngle - rotY * sinAngle;
  var centerY = rotY * cosAngle + rotX * sinAngle;
  return [centerX, centerY];
}

var _default = View;
exports.default = _default;
},{"./Object.js":"node_modules/ol/Object.js","./geom/GeometryType.js":"node_modules/ol/geom/GeometryType.js","./proj/Units.js":"node_modules/ol/proj/Units.js","./ViewHint.js":"node_modules/ol/ViewHint.js","./ViewProperty.js":"node_modules/ol/ViewProperty.js","./tilegrid/common.js":"node_modules/ol/tilegrid/common.js","./proj.js":"node_modules/ol/proj.js","./functions.js":"node_modules/ol/functions.js","./coordinate.js":"node_modules/ol/coordinate.js","./asserts.js":"node_modules/ol/asserts.js","./obj.js":"node_modules/ol/obj.js","./centerconstraint.js":"node_modules/ol/centerconstraint.js","./math.js":"node_modules/ol/math.js","./resolutionconstraint.js":"node_modules/ol/resolutionconstraint.js","./rotationconstraint.js":"node_modules/ol/rotationconstraint.js","./easing.js":"node_modules/ol/easing.js","./extent.js":"node_modules/ol/extent.js","./array.js":"node_modules/ol/array.js","./geom/Polygon.js":"node_modules/ol/geom/Polygon.js"}],"node_modules/ol/structs/LRUCache.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asserts = require("../asserts.js");

/**
 * @module ol/structs/LRUCache
 */

/**
 * @typedef {Object} Entry
 * @property {string} key_ Key.
 * @property {Object} newer Newer.
 * @property {Object} older Older.
 * @property {*} value_ Value.
 */

/**
 * @classdesc
 * Implements a Least-Recently-Used cache where the keys do not conflict with
 * Object's properties (e.g. 'hasOwnProperty' is not allowed as a key). Expiring
 * items from the cache is the responsibility of the user.
 *
 * @fires import("../events/Event.js").default
 * @template T
 */
var LRUCache =
/** @class */
function () {
  /**
   * @param {number} [opt_highWaterMark] High water mark.
   */
  function LRUCache(opt_highWaterMark) {
    /**
     * Desired max cache size after expireCache(). If set to 0, no cache entries
     * will be pruned at all.
     * @type {number}
     */
    this.highWaterMark = opt_highWaterMark !== undefined ? opt_highWaterMark : 2048;
    /**
     * @private
     * @type {number}
     */

    this.count_ = 0;
    /**
     * @private
     * @type {!Object<string, Entry>}
     */

    this.entries_ = {};
    /**
     * @private
     * @type {?Entry}
     */

    this.oldest_ = null;
    /**
     * @private
     * @type {?Entry}
     */

    this.newest_ = null;
  }
  /**
   * @return {boolean} Can expire cache.
   */


  LRUCache.prototype.canExpireCache = function () {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  };
  /**
   * Expire the cache.
   * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
   */


  LRUCache.prototype.expireCache = function (keep) {
    while (this.canExpireCache()) {
      this.pop();
    }
  };
  /**
   * FIXME empty description for jsdoc
   */


  LRUCache.prototype.clear = function () {
    this.count_ = 0;
    this.entries_ = {};
    this.oldest_ = null;
    this.newest_ = null;
  };
  /**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */


  LRUCache.prototype.containsKey = function (key) {
    return this.entries_.hasOwnProperty(key);
  };
  /**
   * @param {function(T, string, LRUCache<T>): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   */


  LRUCache.prototype.forEach = function (f) {
    var entry = this.oldest_;

    while (entry) {
      f(entry.value_, entry.key_, this);
      entry = entry.newer;
    }
  };
  /**
   * @param {string} key Key.
   * @param {*} [opt_options] Options (reserved for subclasses).
   * @return {T} Value.
   */


  LRUCache.prototype.get = function (key, opt_options) {
    var entry = this.entries_[key];
    (0, _asserts.assert)(entry !== undefined, 15); // Tried to get a value for a key that does not exist in the cache

    if (entry === this.newest_) {
      return entry.value_;
    } else if (entry === this.oldest_) {
      this.oldest_ =
      /** @type {Entry} */
      this.oldest_.newer;
      this.oldest_.older = null;
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }

    entry.newer = null;
    entry.older = this.newest_;
    this.newest_.newer = entry;
    this.newest_ = entry;
    return entry.value_;
  };
  /**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */


  LRUCache.prototype.remove = function (key) {
    var entry = this.entries_[key];
    (0, _asserts.assert)(entry !== undefined, 15); // Tried to get a value for a key that does not exist in the cache

    if (entry === this.newest_) {
      this.newest_ =
      /** @type {Entry} */
      entry.older;

      if (this.newest_) {
        this.newest_.newer = null;
      }
    } else if (entry === this.oldest_) {
      this.oldest_ =
      /** @type {Entry} */
      entry.newer;

      if (this.oldest_) {
        this.oldest_.older = null;
      }
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }

    delete this.entries_[key];
    --this.count_;
    return entry.value_;
  };
  /**
   * @return {number} Count.
   */


  LRUCache.prototype.getCount = function () {
    return this.count_;
  };
  /**
   * @return {Array<string>} Keys.
   */


  LRUCache.prototype.getKeys = function () {
    var keys = new Array(this.count_);
    var i = 0;
    var entry;

    for (entry = this.newest_; entry; entry = entry.older) {
      keys[i++] = entry.key_;
    }

    return keys;
  };
  /**
   * @return {Array<T>} Values.
   */


  LRUCache.prototype.getValues = function () {
    var values = new Array(this.count_);
    var i = 0;
    var entry;

    for (entry = this.newest_; entry; entry = entry.older) {
      values[i++] = entry.value_;
    }

    return values;
  };
  /**
   * @return {T} Last value.
   */


  LRUCache.prototype.peekLast = function () {
    return this.oldest_.value_;
  };
  /**
   * @return {string} Last key.
   */


  LRUCache.prototype.peekLastKey = function () {
    return this.oldest_.key_;
  };
  /**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */


  LRUCache.prototype.peekFirstKey = function () {
    return this.newest_.key_;
  };
  /**
   * @return {T} value Value.
   */


  LRUCache.prototype.pop = function () {
    var entry = this.oldest_;
    delete this.entries_[entry.key_];

    if (entry.newer) {
      entry.newer.older = null;
    }

    this.oldest_ =
    /** @type {Entry} */
    entry.newer;

    if (!this.oldest_) {
      this.newest_ = null;
    }

    --this.count_;
    return entry.value_;
  };
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */


  LRUCache.prototype.replace = function (key, value) {
    this.get(key); // update `newest_`

    this.entries_[key].value_ = value;
  };
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */


  LRUCache.prototype.set = function (key, value) {
    (0, _asserts.assert)(!(key in this.entries_), 16); // Tried to set a value for a key that is used already

    var entry = {
      key_: key,
      newer: null,
      older: this.newest_,
      value_: value
    };

    if (!this.newest_) {
      this.oldest_ = entry;
    } else {
      this.newest_.newer = entry;
    }

    this.newest_ = entry;
    this.entries_[key] = entry;
    ++this.count_;
  };
  /**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */


  LRUCache.prototype.setSize = function (size) {
    this.highWaterMark = size;
  };

  return LRUCache;
}();

var _default = LRUCache;
exports.default = _default;
},{"../asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/tilecoord.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrUpdate = createOrUpdate;
exports.fromKey = fromKey;
exports.getCacheKeyForTileKey = getCacheKeyForTileKey;
exports.getKey = getKey;
exports.getKeyZXY = getKeyZXY;
exports.hash = hash;
exports.withinExtentAndZ = withinExtentAndZ;

/**
 * @module ol/tilecoord
 */

/**
 * An array of three numbers representing the location of a tile in a tile
 * grid. The order is `z` (zoom level), `x` (column), and `y` (row).
 * @typedef {Array<number>} TileCoord
 * @api
 */

/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {TileCoord} [opt_tileCoord] Tile coordinate.
 * @return {TileCoord} Tile coordinate.
 */
function createOrUpdate(z, x, y, opt_tileCoord) {
  if (opt_tileCoord !== undefined) {
    opt_tileCoord[0] = z;
    opt_tileCoord[1] = x;
    opt_tileCoord[2] = y;
    return opt_tileCoord;
  } else {
    return [z, x, y];
  }
}
/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {string} Key.
 */


function getKeyZXY(z, x, y) {
  return z + '/' + x + '/' + y;
}
/**
 * Get the key for a tile coord.
 * @param {TileCoord} tileCoord The tile coord.
 * @return {string} Key.
 */


function getKey(tileCoord) {
  return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
/**
 * Get the tile cache key for a tile key obtained through `tile.getKey()`.
 * @param {string} tileKey The tile key.
 * @return {string} The cache key.
 */


function getCacheKeyForTileKey(tileKey) {
  var _a = tileKey.substring(tileKey.lastIndexOf('/') + 1, tileKey.length).split(',').map(Number),
      z = _a[0],
      x = _a[1],
      y = _a[2];

  return getKeyZXY(z, x, y);
}
/**
 * Get a tile coord given a key.
 * @param {string} key The tile coord key.
 * @return {TileCoord} The tile coord.
 */


function fromKey(key) {
  return key.split('/').map(Number);
}
/**
 * @param {TileCoord} tileCoord Tile coord.
 * @return {number} Hash.
 */


function hash(tileCoord) {
  return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
}
/**
 * @param {TileCoord} tileCoord Tile coordinate.
 * @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {boolean} Tile coordinate is within extent and zoom level range.
 */


function withinExtentAndZ(tileCoord, tileGrid) {
  var z = tileCoord[0];
  var x = tileCoord[1];
  var y = tileCoord[2];

  if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
    return false;
  }

  var tileRange = tileGrid.getFullTileRange(z);

  if (!tileRange) {
    return true;
  } else {
    return tileRange.containsXY(x, y);
  }
}
},{}],"node_modules/ol/TileCache.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LRUCache = _interopRequireDefault(require("./structs/LRUCache.js"));

var _tilecoord = require("./tilecoord.js");

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
 * @module ol/TileCache
 */


var TileCache =
/** @class */
function (_super) {
  __extends(TileCache, _super);

  function TileCache() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */


  TileCache.prototype.expireCache = function (usedTiles) {
    while (this.canExpireCache()) {
      var tile = this.peekLast();

      if (tile.getKey() in usedTiles) {
        break;
      } else {
        this.pop().release();
      }
    }
  };
  /**
   * Prune all tiles from the cache that don't have the same z as the newest tile.
   */


  TileCache.prototype.pruneExceptNewestZ = function () {
    if (this.getCount() === 0) {
      return;
    }

    var key = this.peekFirstKey();
    var tileCoord = (0, _tilecoord.fromKey)(key);
    var z = tileCoord[0];
    this.forEach(function (tile) {
      if (tile.tileCoord[0] !== z) {
        this.remove((0, _tilecoord.getKey)(tile.tileCoord));
        tile.release();
      }
    }.bind(this));
  };

  return TileCache;
}(_LRUCache.default);

var _default = TileCache;
exports.default = _default;
},{"./structs/LRUCache.js":"node_modules/ol/structs/LRUCache.js","./tilecoord.js":"node_modules/ol/tilecoord.js"}],"node_modules/ol/source/TileEventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/source/TileEventType
 */

/**
 * @enum {string}
 */
var _default = {
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: 'tileloadstart',

  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: 'tileloadend',

  /**
   * Triggered if tile loading results in an error.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: 'tileloaderror'
};
/**
 * @typedef {'tileloadstart'|'tileloadend'|'tileloaderror'} TileSourceEventTypes
 */

exports.default = _default;
},{}],"node_modules/ol/source/Source.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Object = _interopRequireDefault(require("../Object.js"));

var _State = _interopRequireDefault(require("./State.js"));

var _util = require("../util.js");

var _proj = require("../proj.js");

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
 * @module ol/source/Source
 */


/**
 * A function that takes a {@link module:ol/PluggableMap~FrameState} and returns a string or
 * an array of strings representing source attributions.
 *
 * @typedef {function(import("../PluggableMap.js").FrameState): (string|Array<string>)} Attribution
 */

/**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
 *
 * @typedef {string|Array<string>|Attribution} AttributionLike
 */

/**
 * @typedef {Object} Options
 * @property {AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {import("./State.js").default} [state='ready'] State.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for {@link module:ol/layer/Layer~Layer} sources.
 *
 * A generic `change` event is triggered when the state of the source changes.
 * @abstract
 * @api
 */
var Source =
/** @class */
function (_super) {
  __extends(Source, _super);
  /**
   * @param {Options} options Source options.
   */


  function Source(options) {
    var _this = _super.call(this) || this;
    /**
     * @protected
     * @type {import("../proj/Projection.js").default}
     */


    _this.projection = (0, _proj.get)(options.projection);
    /**
     * @private
     * @type {?Attribution}
     */

    _this.attributions_ = adaptAttributions(options.attributions);
    /**
     * @private
     * @type {boolean}
     */

    _this.attributionsCollapsible_ = options.attributionsCollapsible !== undefined ? options.attributionsCollapsible : true;
    /**
     * This source is currently loading data. Sources that defer loading to the
     * map's tile queue never set this to `true`.
     * @type {boolean}
     */

    _this.loading = false;
    /**
     * @private
     * @type {import("./State.js").default}
     */

    _this.state_ = options.state !== undefined ? options.state : _State.default.READY;
    /**
     * @private
     * @type {boolean}
     */

    _this.wrapX_ = options.wrapX !== undefined ? options.wrapX : false;
    /**
     * @private
     * @type {boolean}
     */

    _this.interpolate_ = !!options.interpolate;
    /**
     * @protected
     * @type {function(import("../View.js").ViewOptions):void}
     */

    _this.viewResolver = null;
    /**
     * @protected
     * @type {function(Error):void}
     */

    _this.viewRejector = null;
    var self = _this;
    /**
     * @private
     * @type {Promise<import("../View.js").ViewOptions>}
     */

    _this.viewPromise_ = new Promise(function (resolve, reject) {
      self.viewResolver = resolve;
      self.viewRejector = reject;
    });
    return _this;
  }
  /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */


  Source.prototype.getAttributions = function () {
    return this.attributions_;
  };
  /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */


  Source.prototype.getAttributionsCollapsible = function () {
    return this.attributionsCollapsible_;
  };
  /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   */


  Source.prototype.getProjection = function () {
    return this.projection;
  };
  /**
   * @abstract
   * @return {Array<number>|null} Resolutions.
   */


  Source.prototype.getResolutions = function () {
    return (0, _util.abstract)();
  };
  /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */


  Source.prototype.getView = function () {
    return this.viewPromise_;
  };
  /**
   * Get the state of the source, see {@link module:ol/source/State~State} for possible states.
   * @return {import("./State.js").default} State.
   * @api
   */


  Source.prototype.getState = function () {
    return this.state_;
  };
  /**
   * @return {boolean|undefined} Wrap X.
   */


  Source.prototype.getWrapX = function () {
    return this.wrapX_;
  };
  /**
   * @return {boolean} Use linear interpolation when resampling.
   */


  Source.prototype.getInterpolate = function () {
    return this.interpolate_;
  };
  /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */


  Source.prototype.refresh = function () {
    this.changed();
  };
  /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */


  Source.prototype.setAttributions = function (attributions) {
    this.attributions_ = adaptAttributions(attributions);
    this.changed();
  };
  /**
   * Set the state of the source.
   * @param {import("./State.js").default} state State.
   */


  Source.prototype.setState = function (state) {
    this.state_ = state;
    this.changed();
  };

  return Source;
}(_Object.default);
/**
 * Turns the attributions option into an attributions function.
 * @param {AttributionLike|undefined} attributionLike The attribution option.
 * @return {Attribution|null} An attribution function (or null).
 */


function adaptAttributions(attributionLike) {
  if (!attributionLike) {
    return null;
  }

  if (Array.isArray(attributionLike)) {
    return function (frameState) {
      return attributionLike;
    };
  }

  if (typeof attributionLike === 'function') {
    return attributionLike;
  }

  return function (frameState) {
    return [attributionLike];
  };
}

var _default = Source;
exports.default = _default;
},{"../Object.js":"node_modules/ol/Object.js","./State.js":"node_modules/ol/source/State.js","../util.js":"node_modules/ol/util.js","../proj.js":"node_modules/ol/proj.js"}],"node_modules/ol/tilegrid/TileGrid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TileRange = _interopRequireWildcard(require("../TileRange.js"));

var _common = require("./common.js");

var _asserts = require("../asserts.js");

var _math = require("../math.js");

var _extent = require("../extent.js");

var _tilecoord = require("../tilecoord.js");

var _array = require("../array.js");

var _size = require("../size.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @module ol/tilegrid/TileGrid
 */

/**
 * @private
 * @type {import("../tilecoord.js").TileCoord}
 */
var tmpTileCoord = [0, 0, 0];
/**
 * Number of decimal digits to consider in integer values when rounding.
 * @type {number}
 */

var DECIMALS = 5;
/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
 * extent will be requested by {@link module:ol/source/Tile~TileSource} sources. When no `origin` or
 * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
 * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
 * specified, `extent` or `origins` must be provided.
 * @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
 * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
 * `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
 * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
 * array will have a length of `maxZoom + 1`.
 * @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
 * of the grid for each zoom level. If specified the values
 * define each zoom level's extent together with the `origin` or `origins`.
 * A grid `extent` can be configured in addition, and will further limit the extent
 * for which tile requests are made by sources. If the bottom-left corner of
 * an extent is used as `origin` or `origins`, then the `y` value must be
 * negative because OpenLayers tile coordinates use the top left as the origin.
 * @property {number|import("../size.js").Size} [tileSize] Tile size.
 * Default is `[256, 256]`.
 * @property {Array<import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * tile size.
 */

/**
 * @classdesc
 * Base class for setting the grid pattern for sources accessing tiled-image
 * servers.
 * @api
 */

var TileGrid =
/** @class */
function () {
  /**
   * @param {Options} options Tile grid options.
   */
  function TileGrid(options) {
    /**
     * @protected
     * @type {number}
     */
    this.minZoom = options.minZoom !== undefined ? options.minZoom : 0;
    /**
     * @private
     * @type {!Array<number>}
     */

    this.resolutions_ = options.resolutions;
    (0, _asserts.assert)((0, _array.isSorted)(this.resolutions_, function (a, b) {
      return b - a;
    }, true), 17); // `resolutions` must be sorted in descending order
    // check if we've got a consistent zoom factor and origin

    var zoomFactor;

    if (!options.origins) {
      for (var i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) {
        if (!zoomFactor) {
          zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
        } else {
          if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
            zoomFactor = undefined;
            break;
          }
        }
      }
    }
    /**
     * @private
     * @type {number|undefined}
     */


    this.zoomFactor_ = zoomFactor;
    /**
     * @protected
     * @type {number}
     */

    this.maxZoom = this.resolutions_.length - 1;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate|null}
     */

    this.origin_ = options.origin !== undefined ? options.origin : null;
    /**
     * @private
     * @type {Array<import("../coordinate.js").Coordinate>}
     */

    this.origins_ = null;

    if (options.origins !== undefined) {
      this.origins_ = options.origins;
      (0, _asserts.assert)(this.origins_.length == this.resolutions_.length, 20); // Number of `origins` and `resolutions` must be equal
    }

    var extent = options.extent;

    if (extent !== undefined && !this.origin_ && !this.origins_) {
      this.origin_ = (0, _extent.getTopLeft)(extent);
    }

    (0, _asserts.assert)(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18); // Either `origin` or `origins` must be configured, never both

    /**
     * @private
     * @type {Array<number|import("../size.js").Size>}
     */

    this.tileSizes_ = null;

    if (options.tileSizes !== undefined) {
      this.tileSizes_ = options.tileSizes;
      (0, _asserts.assert)(this.tileSizes_.length == this.resolutions_.length, 19); // Number of `tileSizes` and `resolutions` must be equal
    }
    /**
     * @private
     * @type {number|import("../size.js").Size}
     */


    this.tileSize_ = options.tileSize !== undefined ? options.tileSize : !this.tileSizes_ ? _common.DEFAULT_TILE_SIZE : null;
    (0, _asserts.assert)(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22); // Either `tileSize` or `tileSizes` must be configured, never both

    /**
     * @private
     * @type {import("../extent.js").Extent}
     */

    this.extent_ = extent !== undefined ? extent : null;
    /**
     * @private
     * @type {Array<import("../TileRange.js").default>}
     */

    this.fullTileRanges_ = null;
    /**
     * @private
     * @type {import("../size.js").Size}
     */

    this.tmpSize_ = [0, 0];
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */

    this.tmpExtent_ = [0, 0, 0, 0];

    if (options.sizes !== undefined) {
      this.fullTileRanges_ = options.sizes.map(function (size, z) {
        var tileRange = new _TileRange.default(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));

        if (extent) {
          var restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
          tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
          tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
          tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
          tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
        }

        return tileRange;
      }, this);
    } else if (extent) {
      this.calculateTileRanges_(extent);
    }
  }
  /**
   * Call a function with each tile coordinate for a given extent and zoom level.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} zoom Integer zoom level.
   * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
   * @api
   */


  TileGrid.prototype.forEachTileCoord = function (extent, zoom, callback) {
    var tileRange = this.getTileRangeForExtentAndZ(extent, zoom);

    for (var i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) {
      for (var j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
        callback([zoom, i, j]);
      }
    }
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
   * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
   * @return {boolean} Callback succeeded.
   */


  TileGrid.prototype.forEachTileCoordParentTileRange = function (tileCoord, callback, opt_tileRange, opt_extent) {
    var tileRange, x, y;
    var tileCoordExtent = null;
    var z = tileCoord[0] - 1;

    if (this.zoomFactor_ === 2) {
      x = tileCoord[1];
      y = tileCoord[2];
    } else {
      tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
    }

    while (z >= this.minZoom) {
      if (this.zoomFactor_ === 2) {
        x = Math.floor(x / 2);
        y = Math.floor(y / 2);
        tileRange = (0, _TileRange.createOrUpdate)(x, x, y, y, opt_tileRange);
      } else {
        tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
      }

      if (callback(z, tileRange)) {
        return true;
      }

      --z;
    }

    return false;
  };
  /**
   * Get the extent for this tile grid, if it was configured.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */


  TileGrid.prototype.getExtent = function () {
    return this.extent_;
  };
  /**
   * Get the maximum zoom level for the grid.
   * @return {number} Max zoom.
   * @api
   */


  TileGrid.prototype.getMaxZoom = function () {
    return this.maxZoom;
  };
  /**
   * Get the minimum zoom level for the grid.
   * @return {number} Min zoom.
   * @api
   */


  TileGrid.prototype.getMinZoom = function () {
    return this.minZoom;
  };
  /**
   * Get the origin for the grid at the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {import("../coordinate.js").Coordinate} Origin.
   * @api
   */


  TileGrid.prototype.getOrigin = function (z) {
    if (this.origin_) {
      return this.origin_;
    } else {
      return this.origins_[z];
    }
  };
  /**
   * Get the resolution for the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {number} Resolution.
   * @api
   */


  TileGrid.prototype.getResolution = function (z) {
    return this.resolutions_[z];
  };
  /**
   * Get the list of resolutions for the tile grid.
   * @return {Array<number>} Resolutions.
   * @api
   */


  TileGrid.prototype.getResolutions = function () {
    return this.resolutions_;
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
   * @return {import("../TileRange.js").default} Tile range.
   */


  TileGrid.prototype.getTileCoordChildTileRange = function (tileCoord, opt_tileRange, opt_extent) {
    if (tileCoord[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        var minX = tileCoord[1] * 2;
        var minY = tileCoord[2] * 2;
        return (0, _TileRange.createOrUpdate)(minX, minX + 1, minY, minY + 1, opt_tileRange);
      }

      var tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent || this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, opt_tileRange);
    }

    return null;
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
   * @return {import("../TileRange.js").default} Tile range.
   */


  TileGrid.prototype.getTileRangeForTileCoordAndZ = function (tileCoord, z, opt_tileRange) {
    if (z > this.maxZoom || z < this.minZoom) {
      return null;
    }

    var tileCoordZ = tileCoord[0];
    var tileCoordX = tileCoord[1];
    var tileCoordY = tileCoord[2];

    if (z === tileCoordZ) {
      return (0, _TileRange.createOrUpdate)(tileCoordX, tileCoordY, tileCoordX, tileCoordY, opt_tileRange);
    }

    if (this.zoomFactor_) {
      var factor = Math.pow(this.zoomFactor_, z - tileCoordZ);
      var minX = Math.floor(tileCoordX * factor);
      var minY = Math.floor(tileCoordY * factor);

      if (z < tileCoordZ) {
        return (0, _TileRange.createOrUpdate)(minX, minX, minY, minY, opt_tileRange);
      }

      var maxX = Math.floor(factor * (tileCoordX + 1)) - 1;
      var maxY = Math.floor(factor * (tileCoordY + 1)) - 1;
      return (0, _TileRange.createOrUpdate)(minX, maxX, minY, maxY, opt_tileRange);
    }

    var tileCoordExtent = this.getTileCoordExtent(tileCoord, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
  };
  /**
   * Get the extent for a tile range.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} tileRange Tile range.
   * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
   * @return {import("../extent.js").Extent} Extent.
   */


  TileGrid.prototype.getTileRangeExtent = function (z, tileRange, opt_extent) {
    var origin = this.getOrigin(z);
    var resolution = this.getResolution(z);
    var tileSize = (0, _size.toSize)(this.getTileSize(z), this.tmpSize_);
    var minX = origin[0] + tileRange.minX * tileSize[0] * resolution;
    var maxX = origin[0] + (tileRange.maxX + 1) * tileSize[0] * resolution;
    var minY = origin[1] + tileRange.minY * tileSize[1] * resolution;
    var maxY = origin[1] + (tileRange.maxY + 1) * tileSize[1] * resolution;
    return (0, _extent.createOrUpdate)(minX, minY, maxX, maxY, opt_extent);
  };
  /**
   * Get a tile range for the given extent and integer zoom level.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [opt_tileRange] Temporary tile range object.
   * @return {import("../TileRange.js").default} Tile range.
   */


  TileGrid.prototype.getTileRangeForExtentAndZ = function (extent, z, opt_tileRange) {
    var tileCoord = tmpTileCoord;
    this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tileCoord);
    var minX = tileCoord[1];
    var minY = tileCoord[2];
    this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tileCoord);
    return (0, _TileRange.createOrUpdate)(minX, tileCoord[1], minY, tileCoord[2], opt_tileRange);
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {import("../coordinate.js").Coordinate} Tile center.
   */


  TileGrid.prototype.getTileCoordCenter = function (tileCoord) {
    var origin = this.getOrigin(tileCoord[0]);
    var resolution = this.getResolution(tileCoord[0]);
    var tileSize = (0, _size.toSize)(this.getTileSize(tileCoord[0]), this.tmpSize_);
    return [origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution, origin[1] - (tileCoord[2] + 0.5) * tileSize[1] * resolution];
  };
  /**
   * Get the extent of a tile coordinate.
   *
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} [opt_extent] Temporary extent object.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */


  TileGrid.prototype.getTileCoordExtent = function (tileCoord, opt_extent) {
    var origin = this.getOrigin(tileCoord[0]);
    var resolution = this.getResolution(tileCoord[0]);
    var tileSize = (0, _size.toSize)(this.getTileSize(tileCoord[0]), this.tmpSize_);
    var minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
    var minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
    var maxX = minX + tileSize[0] * resolution;
    var maxY = minY + tileSize[1] * resolution;
    return (0, _extent.createOrUpdate)(minX, minY, maxX, maxY, opt_extent);
  };
  /**
   * Get the tile coordinate for the given map coordinate and resolution.  This
   * method considers that coordinates that intersect tile boundaries should be
   * assigned the higher tile coordinate.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */


  TileGrid.prototype.getTileCoordForCoordAndResolution = function (coordinate, resolution, opt_tileCoord) {
    return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
  };
  /**
   * Note that this method should not be called for resolutions that correspond
   * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
   * @param {number} x X.
   * @param {number} y Y.
   * @param {number} resolution Resolution (for a non-integer zoom level).
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */


  TileGrid.prototype.getTileCoordForXYAndResolution_ = function (x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
    var z = this.getZForResolution(resolution);
    var scale = resolution / this.getResolution(z);
    var origin = this.getOrigin(z);
    var tileSize = (0, _size.toSize)(this.getTileSize(z), this.tmpSize_);
    var tileCoordX = scale * (x - origin[0]) / resolution / tileSize[0];
    var tileCoordY = scale * (origin[1] - y) / resolution / tileSize[1];

    if (reverseIntersectionPolicy) {
      tileCoordX = (0, _math.ceil)(tileCoordX, DECIMALS) - 1;
      tileCoordY = (0, _math.ceil)(tileCoordY, DECIMALS) - 1;
    } else {
      tileCoordX = (0, _math.floor)(tileCoordX, DECIMALS);
      tileCoordY = (0, _math.floor)(tileCoordY, DECIMALS);
    }

    return (0, _tilecoord.createOrUpdate)(z, tileCoordX, tileCoordY, opt_tileCoord);
  };
  /**
   * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
   * they should have separate implementations.  This method is for integer zoom
   * levels.  The other method should only be called for resolutions corresponding
   * to non-integer zoom levels.
   * @param {number} x Map x coordinate.
   * @param {number} y Map y coordinate.
   * @param {number} z Integer zoom level.
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */


  TileGrid.prototype.getTileCoordForXYAndZ_ = function (x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
    var origin = this.getOrigin(z);
    var resolution = this.getResolution(z);
    var tileSize = (0, _size.toSize)(this.getTileSize(z), this.tmpSize_);
    var tileCoordX = (x - origin[0]) / resolution / tileSize[0];
    var tileCoordY = (origin[1] - y) / resolution / tileSize[1];

    if (reverseIntersectionPolicy) {
      tileCoordX = (0, _math.ceil)(tileCoordX, DECIMALS) - 1;
      tileCoordY = (0, _math.ceil)(tileCoordY, DECIMALS) - 1;
    } else {
      tileCoordX = (0, _math.floor)(tileCoordX, DECIMALS);
      tileCoordY = (0, _math.floor)(tileCoordY, DECIMALS);
    }

    return (0, _tilecoord.createOrUpdate)(z, tileCoordX, tileCoordY, opt_tileCoord);
  };
  /**
   * Get a tile coordinate given a map coordinate and zoom level.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} z Zoom level.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */


  TileGrid.prototype.getTileCoordForCoordAndZ = function (coordinate, z, opt_tileCoord) {
    return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {number} Tile resolution.
   */


  TileGrid.prototype.getTileCoordResolution = function (tileCoord) {
    return this.resolutions_[tileCoord[0]];
  };
  /**
   * Get the tile size for a zoom level. The type of the return value matches the
   * `tileSize` or `tileSizes` that the tile grid was configured with. To always
   * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
   * @param {number} z Z.
   * @return {number|import("../size.js").Size} Tile size.
   * @api
   */


  TileGrid.prototype.getTileSize = function (z) {
    if (this.tileSize_) {
      return this.tileSize_;
    } else {
      return this.tileSizes_[z];
    }
  };
  /**
   * @param {number} z Zoom level.
   * @return {import("../TileRange.js").default} Extent tile range for the specified zoom level.
   */


  TileGrid.prototype.getFullTileRange = function (z) {
    if (!this.fullTileRanges_) {
      return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
    } else {
      return this.fullTileRanges_[z];
    }
  };
  /**
   * @param {number} resolution Resolution.
   * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
   *     If 0, the nearest resolution will be used.
   *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
   *     nearest lower resolution (higher Z) will be used. Default is 0.
   *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
   *
   * For example to change tile Z at the midpoint of zoom levels
   * ```js
   * function(value, high, low) {
   *   return value - low * Math.sqrt(high / low);
   * }
   * ```
   * @return {number} Z.
   * @api
   */


  TileGrid.prototype.getZForResolution = function (resolution, opt_direction) {
    var z = (0, _array.linearFindNearest)(this.resolutions_, resolution, opt_direction || 0);
    return (0, _math.clamp)(z, this.minZoom, this.maxZoom);
  };
  /**
   * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
   * @private
   */


  TileGrid.prototype.calculateTileRanges_ = function (extent) {
    var length = this.resolutions_.length;
    var fullTileRanges = new Array(length);

    for (var z = this.minZoom; z < length; ++z) {
      fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
    }

    this.fullTileRanges_ = fullTileRanges;
  };

  return TileGrid;
}();

var _default = TileGrid;
exports.default = _default;
},{"../TileRange.js":"node_modules/ol/TileRange.js","./common.js":"node_modules/ol/tilegrid/common.js","../asserts.js":"node_modules/ol/asserts.js","../math.js":"node_modules/ol/math.js","../extent.js":"node_modules/ol/extent.js","../tilecoord.js":"node_modules/ol/tilecoord.js","../array.js":"node_modules/ol/array.js","../size.js":"node_modules/ol/size.js"}],"node_modules/ol/tilegrid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createForExtent = createForExtent;
exports.createForProjection = createForProjection;
exports.createXYZ = createXYZ;
exports.extentFromProjection = extentFromProjection;
exports.getForProjection = getForProjection;
exports.wrapX = wrapX;

var _Corner = _interopRequireDefault(require("./extent/Corner.js"));

var _TileGrid = _interopRequireDefault(require("./tilegrid/TileGrid.js"));

var _Units = _interopRequireDefault(require("./proj/Units.js"));

var _common = require("./tilegrid/common.js");

var _proj = require("./proj.js");

var _extent = require("./extent.js");

var _size = require("./size.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/tilegrid
 */

/**
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {!TileGrid} Default tile grid for the
 * passed projection.
 */
function getForProjection(projection) {
  var tileGrid = projection.getDefaultTileGrid();

  if (!tileGrid) {
    tileGrid = createForProjection(projection);
    projection.setDefaultTileGrid(tileGrid);
  }

  return tileGrid;
}
/**
 * @param {TileGrid} tileGrid Tile grid.
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {import("./tilecoord.js").TileCoord} Tile coordinate.
 */


function wrapX(tileGrid, tileCoord, projection) {
  var z = tileCoord[0];
  var center = tileGrid.getTileCoordCenter(tileCoord);
  var projectionExtent = extentFromProjection(projection);

  if (!(0, _extent.containsCoordinate)(projectionExtent, center)) {
    var worldWidth = (0, _extent.getWidth)(projectionExtent);
    var worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
    center[0] += worldWidth * worldsAway;
    return tileGrid.getTileCoordForCoordAndZ(center, z);
  } else {
    return tileCoord;
  }
}
/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent/Corner.js").default} [opt_corner] Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */


function createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner) {
  var corner = opt_corner !== undefined ? opt_corner : _Corner.default.TOP_LEFT;
  var resolutions = resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize);
  return new _TileGrid.default({
    extent: extent,
    origin: (0, _extent.getCorner)(extent, corner),
    resolutions: resolutions,
    tileSize: opt_tileSize
  });
}
/**
 * @typedef {Object} XYZOptions
 * @property {import("./extent.js").Extent} [extent] Extent for the tile grid. The origin for an XYZ tile grid is the
 * top-left corner of the extent. If `maxResolution` is not provided the zero level of the grid is defined by the resolution
 * at which one tile fits in the provided extent. If not provided, the extent of the EPSG:3857 projection is used.
 * @property {number} [maxResolution] Resolution at level zero.
 * @property {number} [maxZoom] Maximum zoom. The default is `42`. This determines the number of levels
 * in the grid set. For example, a `maxZoom` of 21 means there are 22 levels in the grid set.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {number|import("./size.js").Size} [tileSize=[256, 256]] Tile size in pixels.
 */

/**
 * Creates a tile grid with a standard XYZ tiling scheme.
 * @param {XYZOptions} [opt_options] Tile grid options.
 * @return {!TileGrid} Tile grid instance.
 * @api
 */


function createXYZ(opt_options) {
  var xyzOptions = opt_options || {};
  var extent = xyzOptions.extent || (0, _proj.get)('EPSG:3857').getExtent();
  var gridOptions = {
    extent: extent,
    minZoom: xyzOptions.minZoom,
    tileSize: xyzOptions.tileSize,
    resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution)
  };
  return new _TileGrid.default(gridOptions);
}
/**
 * Create a resolutions array from an extent.  A zoom factor of 2 is assumed.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {number} [opt_maxResolution] Resolution at level zero.
 * @return {!Array<number>} Resolutions array.
 */


function resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize, opt_maxResolution) {
  var maxZoom = opt_maxZoom !== undefined ? opt_maxZoom : _common.DEFAULT_MAX_ZOOM;
  var height = (0, _extent.getHeight)(extent);
  var width = (0, _extent.getWidth)(extent);
  var tileSize = (0, _size.toSize)(opt_tileSize !== undefined ? opt_tileSize : _common.DEFAULT_TILE_SIZE);
  var maxResolution = opt_maxResolution > 0 ? opt_maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
  var length = maxZoom + 1;
  var resolutions = new Array(length);

  for (var z = 0; z < length; ++z) {
    resolutions[z] = maxResolution / Math.pow(2, z);
  }

  return resolutions;
}
/**
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent/Corner.js").default} [opt_corner] Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */


function createForProjection(projection, opt_maxZoom, opt_tileSize, opt_corner) {
  var extent = extentFromProjection(projection);
  return createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner);
}
/**
 * Generate a tile grid extent from a projection.  If the projection has an
 * extent, it is used.  If not, a global extent is assumed.
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @return {import("./extent.js").Extent} Extent.
 */


function extentFromProjection(projection) {
  projection = (0, _proj.get)(projection);
  var extent = projection.getExtent();

  if (!extent) {
    var half = 180 * _proj.METERS_PER_UNIT[_Units.default.DEGREES] / projection.getMetersPerUnit();
    extent = (0, _extent.createOrUpdate)(-half, -half, half, half);
  }

  return extent;
}
},{"./extent/Corner.js":"node_modules/ol/extent/Corner.js","./tilegrid/TileGrid.js":"node_modules/ol/tilegrid/TileGrid.js","./proj/Units.js":"node_modules/ol/proj/Units.js","./tilegrid/common.js":"node_modules/ol/tilegrid/common.js","./proj.js":"node_modules/ol/proj.js","./extent.js":"node_modules/ol/extent.js","./size.js":"node_modules/ol/size.js"}],"node_modules/ol/source/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TileSourceEvent = void 0;

var _Event = _interopRequireDefault(require("../events/Event.js"));

var _Source = _interopRequireDefault(require("./Source.js"));

var _TileCache = _interopRequireDefault(require("../TileCache.js"));

var _TileState = _interopRequireDefault(require("../TileState.js"));

var _util = require("../util.js");

var _asserts = require("../asserts.js");

var _proj = require("../proj.js");

var _tilecoord = require("../tilecoord.js");

var _tilegrid = require("../tilegrid.js");

var _size = require("../size.js");

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
 * @module ol/source/Tile
 */


/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./TileEventType").TileSourceEventTypes, TileSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./TileEventType").TileSourceEventTypes, Return>} TileSourceOnSignature
 */

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] CacheSize.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./State.js").default} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 * @abstract
 * @api
 */
var TileSource =
/** @class */
function (_super) {
  __extends(TileSource, _super);
  /**
   * @param {Options} options SourceTile source options.
   */


  function TileSource(options) {
    var _this = _super.call(this, {
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      projection: options.projection,
      state: options.state,
      wrapX: options.wrapX,
      interpolate: options.interpolate
    }) || this;
    /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */


    _this.on;
    /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */

    _this.once;
    /***
     * @type {TileSourceOnSignature<void>}
     */

    _this.un;
    /**
     * @private
     * @type {boolean}
     */

    _this.opaque_ = options.opaque !== undefined ? options.opaque : false;
    /**
     * @private
     * @type {number}
     */

    _this.tilePixelRatio_ = options.tilePixelRatio !== undefined ? options.tilePixelRatio : 1;
    /**
     * @type {import("../tilegrid/TileGrid.js").default|null}
     */

    _this.tileGrid = options.tileGrid !== undefined ? options.tileGrid : null;
    var tileSize = [256, 256];

    if (_this.tileGrid) {
      (0, _size.toSize)(_this.tileGrid.getTileSize(_this.tileGrid.getMinZoom()), tileSize);
    }
    /**
     * @protected
     * @type {import("../TileCache.js").default}
     */


    _this.tileCache = new _TileCache.default(options.cacheSize || 0);
    /**
     * @protected
     * @type {import("../size.js").Size}
     */

    _this.tmpSize = [0, 0];
    /**
     * @private
     * @type {string}
     */

    _this.key_ = options.key || '';
    /**
     * @protected
     * @type {import("../Tile.js").Options}
     */

    _this.tileOptions = {
      transition: options.transition,
      interpolate: options.interpolate
    };
    /**
     * zDirection hint, read by the renderer. Indicates which resolution should be used
     * by a renderer if the views resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @type {number|import("../array.js").NearestDirectionFunction}
     */

    _this.zDirection = options.zDirection ? options.zDirection : 0;
    return _this;
  }
  /**
   * @return {boolean} Can expire cache.
   */


  TileSource.prototype.canExpireCache = function () {
    return this.tileCache.canExpireCache();
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */


  TileSource.prototype.expireCache = function (projection, usedTiles) {
    var tileCache = this.getTileCacheForProjection(projection);

    if (tileCache) {
      tileCache.expireCache(usedTiles);
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {number} z Zoom level.
   * @param {import("../TileRange.js").default} tileRange Tile range.
   * @param {function(import("../Tile.js").default):(boolean|void)} callback Called with each
   *     loaded tile.  If the callback returns `false`, the tile will not be
   *     considered loaded.
   * @return {boolean} The tile range is fully covered with loaded tiles.
   */


  TileSource.prototype.forEachLoadedTile = function (projection, z, tileRange, callback) {
    var tileCache = this.getTileCacheForProjection(projection);

    if (!tileCache) {
      return false;
    }

    var covered = true;
    var tile, tileCoordKey, loaded;

    for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
        tileCoordKey = (0, _tilecoord.getKeyZXY)(z, x, y);
        loaded = false;

        if (tileCache.containsKey(tileCoordKey)) {
          tile =
          /** @type {!import("../Tile.js").default} */
          tileCache.get(tileCoordKey);
          loaded = tile.getState() === _TileState.default.LOADED;

          if (loaded) {
            loaded = callback(tile) !== false;
          }
        }

        if (!loaded) {
          covered = false;
        }
      }
    }

    return covered;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */


  TileSource.prototype.getGutterForProjection = function (projection) {
    return 0;
  };
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */


  TileSource.prototype.getKey = function () {
    return this.key_;
  };
  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */


  TileSource.prototype.setKey = function (key) {
    if (this.key_ !== key) {
      this.key_ = key;
      this.changed();
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */


  TileSource.prototype.getOpaque = function (projection) {
    return this.opaque_;
  };
  /**
   * @return {Array<number>|null} Resolutions.
   */


  TileSource.prototype.getResolutions = function () {
    if (!this.tileGrid) {
      return null;
    }

    return this.tileGrid.getResolutions();
  };
  /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../Tile.js").default} Tile.
   */


  TileSource.prototype.getTile = function (z, x, y, pixelRatio, projection) {
    return (0, _util.abstract)();
  };
  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
   * @api
   */


  TileSource.prototype.getTileGrid = function () {
    return this.tileGrid;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */


  TileSource.prototype.getTileGridForProjection = function (projection) {
    if (!this.tileGrid) {
      return (0, _tilegrid.getForProjection)(projection);
    } else {
      return this.tileGrid;
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   * @protected
   */


  TileSource.prototype.getTileCacheForProjection = function (projection) {
    (0, _asserts.assert)((0, _proj.equivalent)(this.getProjection(), projection), 68 // A VectorTile source can only be rendered if it has a projection compatible with the view projection.
    );
    return this.tileCache;
  };
  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */


  TileSource.prototype.getTilePixelRatio = function (pixelRatio) {
    return this.tilePixelRatio_;
  };
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */


  TileSource.prototype.getTilePixelSize = function (z, pixelRatio, projection) {
    var tileGrid = this.getTileGridForProjection(projection);
    var tilePixelRatio = this.getTilePixelRatio(pixelRatio);
    var tileSize = (0, _size.toSize)(tileGrid.getTileSize(z), this.tmpSize);

    if (tilePixelRatio == 1) {
      return tileSize;
    } else {
      return (0, _size.scale)(tileSize, tilePixelRatio, this.tmpSize);
    }
  };
  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [opt_projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */


  TileSource.prototype.getTileCoordForTileUrlFunction = function (tileCoord, opt_projection) {
    var projection = opt_projection !== undefined ? opt_projection : this.getProjection();
    var tileGrid = this.getTileGridForProjection(projection);

    if (this.getWrapX() && projection.isGlobal()) {
      tileCoord = (0, _tilegrid.wrapX)(tileGrid, tileCoord, projection);
    }

    return (0, _tilecoord.withinExtentAndZ)(tileCoord, tileGrid) ? tileCoord : null;
  };
  /**
   * Remove all cached tiles from the source. The next render cycle will fetch new tiles.
   * @api
   */


  TileSource.prototype.clear = function () {
    this.tileCache.clear();
  };

  TileSource.prototype.refresh = function () {
    this.clear();

    _super.prototype.refresh.call(this);
  };
  /**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */


  TileSource.prototype.updateCacheSize = function (tileCount, projection) {
    var tileCache = this.getTileCacheForProjection(projection);

    if (tileCount > tileCache.highWaterMark) {
      tileCache.highWaterMark = tileCount;
    }
  };
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */


  TileSource.prototype.useTile = function (z, x, y, projection) {};

  return TileSource;
}(_Source.default);
/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
 * type.
 */


var TileSourceEvent =
/** @class */
function (_super) {
  __extends(TileSourceEvent, _super);
  /**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */


  function TileSourceEvent(type, tile) {
    var _this = _super.call(this, type) || this;
    /**
     * The tile related to the event.
     * @type {import("../Tile.js").default}
     * @api
     */


    _this.tile = tile;
    return _this;
  }

  return TileSourceEvent;
}(_Event.default);

exports.TileSourceEvent = TileSourceEvent;
var _default = TileSource;
exports.default = _default;
},{"../events/Event.js":"node_modules/ol/events/Event.js","./Source.js":"node_modules/ol/source/Source.js","../TileCache.js":"node_modules/ol/TileCache.js","../TileState.js":"node_modules/ol/TileState.js","../util.js":"node_modules/ol/util.js","../asserts.js":"node_modules/ol/asserts.js","../proj.js":"node_modules/ol/proj.js","../tilecoord.js":"node_modules/ol/tilecoord.js","../tilegrid.js":"node_modules/ol/tilegrid.js","../size.js":"node_modules/ol/size.js"}],"node_modules/ol/tileurlfunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFromTemplate = createFromTemplate;
exports.createFromTemplates = createFromTemplates;
exports.createFromTileUrlFunctions = createFromTileUrlFunctions;
exports.expandUrl = expandUrl;
exports.nullTileUrlFunction = nullTileUrlFunction;

var _asserts = require("./asserts.js");

var _math = require("./math.js");

var _tilecoord = require("./tilecoord.js");

/**
 * @module ol/tileurlfunction
 */

/**
 * @param {string} template Template.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */
function createFromTemplate(template, tileGrid) {
  var zRegEx = /\{z\}/g;
  var xRegEx = /\{x\}/g;
  var yRegEx = /\{y\}/g;
  var dashYRegEx = /\{-y\}/g;
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function (tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return undefined;
      } else {
        return template.replace(zRegEx, tileCoord[0].toString()).replace(xRegEx, tileCoord[1].toString()).replace(yRegEx, tileCoord[2].toString()).replace(dashYRegEx, function () {
          var z = tileCoord[0];
          var range = tileGrid.getFullTileRange(z);
          (0, _asserts.assert)(range, 55); // The {-y} placeholder requires a tile grid with extent

          var y = range.getHeight() - tileCoord[2] - 1;
          return y.toString();
        });
      }
    }
  );
}
/**
 * @param {Array<string>} templates Templates.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */


function createFromTemplates(templates, tileGrid) {
  var len = templates.length;
  var tileUrlFunctions = new Array(len);

  for (var i = 0; i < len; ++i) {
    tileUrlFunctions[i] = createFromTemplate(templates[i], tileGrid);
  }

  return createFromTileUrlFunctions(tileUrlFunctions);
}
/**
 * @param {Array<import("./Tile.js").UrlFunction>} tileUrlFunctions Tile URL Functions.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */


function createFromTileUrlFunctions(tileUrlFunctions) {
  if (tileUrlFunctions.length === 1) {
    return tileUrlFunctions[0];
  }

  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function (tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return undefined;
      } else {
        var h = (0, _tilecoord.hash)(tileCoord);
        var index = (0, _math.modulo)(h, tileUrlFunctions.length);
        return tileUrlFunctions[index](tileCoord, pixelRatio, projection);
      }
    }
  );
}
/**
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {number} pixelRatio Pixel ratio.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {string|undefined} Tile URL.
 */


function nullTileUrlFunction(tileCoord, pixelRatio, projection) {
  return undefined;
}
/**
 * @param {string} url URL.
 * @return {Array<string>} Array of urls.
 */


function expandUrl(url) {
  var urls = [];
  var match = /\{([a-z])-([a-z])\}/.exec(url);

  if (match) {
    // char range
    var startCharCode = match[1].charCodeAt(0);
    var stopCharCode = match[2].charCodeAt(0);
    var charCode = void 0;

    for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
      urls.push(url.replace(match[0], String.fromCharCode(charCode)));
    }

    return urls;
  }

  match = /\{(\d+)-(\d+)\}/.exec(url);

  if (match) {
    // number range
    var stop_1 = parseInt(match[2], 10);

    for (var i = parseInt(match[1], 10); i <= stop_1; i++) {
      urls.push(url.replace(match[0], i.toString()));
    }

    return urls;
  }

  urls.push(url);
  return urls;
}
},{"./asserts.js":"node_modules/ol/asserts.js","./math.js":"node_modules/ol/math.js","./tilecoord.js":"node_modules/ol/tilecoord.js"}],"node_modules/ol/source/UrlTile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TileEventType = _interopRequireDefault(require("./TileEventType.js"));

var _Tile = _interopRequireWildcard(require("./Tile.js"));

var _TileState = _interopRequireDefault(require("../TileState.js"));

var _tileurlfunction = require("../tileurlfunction.js");

var _tilecoord = require("../tilecoord.js");

var _util = require("../util.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * @module ol/source/UrlTile
 */


/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Cache size.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./State.js").default} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction TileLoadFunction.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] TileUrlFunction.
 * @property {string} [url] Url.
 * @property {Array<string>} [urls] Urls.
 * @property {boolean} [wrapX=true] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */

/**
 * @classdesc
 * Base class for sources providing tiles divided into a tile grid over http.
 *
 * @fires import("./Tile.js").TileSourceEvent
 */
var UrlTile =
/** @class */
function (_super) {
  __extends(UrlTile, _super);
  /**
   * @param {Options} options Image tile options.
   */


  function UrlTile(options) {
    var _this = _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      opaque: options.opaque,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tilePixelRatio: options.tilePixelRatio,
      wrapX: options.wrapX,
      transition: options.transition,
      interpolate: options.interpolate,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
    /**
     * @private
     * @type {boolean}
     */


    _this.generateTileUrlFunction_ = _this.tileUrlFunction === UrlTile.prototype.tileUrlFunction;
    /**
     * @protected
     * @type {import("../Tile.js").LoadFunction}
     */

    _this.tileLoadFunction = options.tileLoadFunction;

    if (options.tileUrlFunction) {
      _this.tileUrlFunction = options.tileUrlFunction;
    }
    /**
     * @protected
     * @type {!Array<string>|null}
     */


    _this.urls = null;

    if (options.urls) {
      _this.setUrls(options.urls);
    } else if (options.url) {
      _this.setUrl(options.url);
    }
    /**
     * @private
     * @type {!Object<string, boolean>}
     */


    _this.tileLoadingKeys_ = {};
    return _this;
  }
  /**
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */


  UrlTile.prototype.getTileLoadFunction = function () {
    return this.tileLoadFunction;
  };
  /**
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */


  UrlTile.prototype.getTileUrlFunction = function () {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  };
  /**
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */


  UrlTile.prototype.getUrls = function () {
    return this.urls;
  };
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */


  UrlTile.prototype.handleTileChange = function (event) {
    var tile =
    /** @type {import("../Tile.js").default} */
    event.target;
    var uid = (0, _util.getUid)(tile);
    var tileState = tile.getState();
    var type;

    if (tileState == _TileState.default.LOADING) {
      this.tileLoadingKeys_[uid] = true;
      type = _TileEventType.default.TILELOADSTART;
    } else if (uid in this.tileLoadingKeys_) {
      delete this.tileLoadingKeys_[uid];
      type = tileState == _TileState.default.ERROR ? _TileEventType.default.TILELOADERROR : tileState == _TileState.default.LOADED ? _TileEventType.default.TILELOADEND : undefined;
    }

    if (type != undefined) {
      this.dispatchEvent(new _Tile.TileSourceEvent(type, tile));
    }
  };
  /**
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */


  UrlTile.prototype.setTileLoadFunction = function (tileLoadFunction) {
    this.tileCache.clear();
    this.tileLoadFunction = tileLoadFunction;
    this.changed();
  };
  /**
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */


  UrlTile.prototype.setTileUrlFunction = function (tileUrlFunction, key) {
    this.tileUrlFunction = tileUrlFunction;
    this.tileCache.pruneExceptNewestZ();

    if (typeof key !== 'undefined') {
      this.setKey(key);
    } else {
      this.changed();
    }
  };
  /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */


  UrlTile.prototype.setUrl = function (url) {
    var urls = (0, _tileurlfunction.expandUrl)(url);
    this.urls = urls;
    this.setUrls(urls);
  };
  /**
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */


  UrlTile.prototype.setUrls = function (urls) {
    this.urls = urls;
    var key = urls.join('\n');

    if (this.generateTileUrlFunction_) {
      this.setTileUrlFunction((0, _tileurlfunction.createFromTemplates)(urls, this.tileGrid), key);
    } else {
      this.setKey(key);
    }
  };
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */


  UrlTile.prototype.tileUrlFunction = function (tileCoord, pixelRatio, projection) {
    return undefined;
  };
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   */


  UrlTile.prototype.useTile = function (z, x, y) {
    var tileCoordKey = (0, _tilecoord.getKeyZXY)(z, x, y);

    if (this.tileCache.containsKey(tileCoordKey)) {
      this.tileCache.get(tileCoordKey);
    }
  };

  return UrlTile;
}(_Tile.default);

var _default = UrlTile;
exports.default = _default;
},{"./TileEventType.js":"node_modules/ol/source/TileEventType.js","./Tile.js":"node_modules/ol/source/Tile.js","../TileState.js":"node_modules/ol/TileState.js","../tileurlfunction.js":"node_modules/ol/tileurlfunction.js","../tilecoord.js":"node_modules/ol/tilecoord.js","../util.js":"node_modules/ol/util.js"}],"node_modules/ol/source/TileImage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _ImageTile = _interopRequireDefault(require("../ImageTile.js"));

var _Tile = _interopRequireDefault(require("../reproj/Tile.js"));

var _TileCache = _interopRequireDefault(require("../TileCache.js"));

var _TileState = _interopRequireDefault(require("../TileState.js"));

var _UrlTile = _interopRequireDefault(require("./UrlTile.js"));

var _common = require("../reproj/common.js");

var _proj = require("../proj.js");

var _tilecoord = require("../tilecoord.js");

var _tilegrid = require("../tilegrid.js");

var _util = require("../util.js");

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
 * @module ol/source/TileImage
 */


/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("./State.js").default} [state] Source state.
 * @property {typeof import("../ImageTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service. For example, if the tile
 * service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get tile URL given a tile coordinate and the projection.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX] Whether to wrap the world horizontally. The default, is to
 * request out-of-bounds tiles from the server. When set to `false`, only one
 * world will be rendered. When set to `true`, tiles will be requested for one
 * world only, but they will be wrapped horizontally to render multiple worlds.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [key] Optional tile key for proper cache fetching
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */

/**
 * @classdesc
 * Base class for sources providing images divided into a tile grid.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
var TileImage =
/** @class */
function (_super) {
  __extends(TileImage, _super);
  /**
   * @param {!Options} options Image tile options.
   */


  function TileImage(options) {
    var _this = this;

    var interpolate = options.imageSmoothing !== undefined ? options.imageSmoothing : true;

    if (options.interpolate !== undefined) {
      interpolate = options.interpolate;
    }

    _this = _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      opaque: options.opaque,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX,
      transition: options.transition,
      interpolate: interpolate,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
    /**
     * @protected
     * @type {?string}
     */

    _this.crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : null;
    /**
     * @protected
     * @type {typeof ImageTile}
     */

    _this.tileClass = options.tileClass !== undefined ? options.tileClass : _ImageTile.default;
    /**
     * @protected
     * @type {!Object<string, TileCache>}
     */

    _this.tileCacheForProjection = {};
    /**
     * @protected
     * @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
     */

    _this.tileGridForProjection = {};
    /**
     * @private
     * @type {number|undefined}
     */

    _this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
    /**
     * @private
     * @type {boolean}
     */

    _this.renderReprojectionEdges_ = false;
    return _this;
  }
  /**
   * @return {boolean} Can expire cache.
   */


  TileImage.prototype.canExpireCache = function () {
    if (!_common.ENABLE_RASTER_REPROJECTION) {
      return _super.prototype.canExpireCache.call(this);
    }

    if (this.tileCache.canExpireCache()) {
      return true;
    } else {
      for (var key in this.tileCacheForProjection) {
        if (this.tileCacheForProjection[key].canExpireCache()) {
          return true;
        }
      }
    }

    return false;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */


  TileImage.prototype.expireCache = function (projection, usedTiles) {
    if (!_common.ENABLE_RASTER_REPROJECTION) {
      _super.prototype.expireCache.call(this, projection, usedTiles);

      return;
    }

    var usedTileCache = this.getTileCacheForProjection(projection);
    this.tileCache.expireCache(this.tileCache == usedTileCache ? usedTiles : {});

    for (var id in this.tileCacheForProjection) {
      var tileCache = this.tileCacheForProjection[id];
      tileCache.expireCache(tileCache == usedTileCache ? usedTiles : {});
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */


  TileImage.prototype.getGutterForProjection = function (projection) {
    if (_common.ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !(0, _proj.equivalent)(this.getProjection(), projection)) {
      return 0;
    } else {
      return this.getGutter();
    }
  };
  /**
   * @return {number} Gutter.
   */


  TileImage.prototype.getGutter = function () {
    return 0;
  };
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */


  TileImage.prototype.getKey = function () {
    var key = _super.prototype.getKey.call(this);

    if (!this.getInterpolate()) {
      key += ':disable-interpolation';
    }

    return key;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */


  TileImage.prototype.getOpaque = function (projection) {
    if (_common.ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !(0, _proj.equivalent)(this.getProjection(), projection)) {
      return false;
    } else {
      return _super.prototype.getOpaque.call(this, projection);
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */


  TileImage.prototype.getTileGridForProjection = function (projection) {
    if (!_common.ENABLE_RASTER_REPROJECTION) {
      return _super.prototype.getTileGridForProjection.call(this, projection);
    }

    var thisProj = this.getProjection();

    if (this.tileGrid && (!thisProj || (0, _proj.equivalent)(thisProj, projection))) {
      return this.tileGrid;
    } else {
      var projKey = (0, _util.getUid)(projection);

      if (!(projKey in this.tileGridForProjection)) {
        this.tileGridForProjection[projKey] = (0, _tilegrid.getForProjection)(projection);
      }

      return this.tileGridForProjection[projKey];
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   */


  TileImage.prototype.getTileCacheForProjection = function (projection) {
    if (!_common.ENABLE_RASTER_REPROJECTION) {
      return _super.prototype.getTileCacheForProjection.call(this, projection);
    }

    var thisProj = this.getProjection();

    if (!thisProj || (0, _proj.equivalent)(thisProj, projection)) {
      return this.tileCache;
    } else {
      var projKey = (0, _util.getUid)(projection);

      if (!(projKey in this.tileCacheForProjection)) {
        this.tileCacheForProjection[projKey] = new _TileCache.default(this.tileCache.highWaterMark);
      }

      return this.tileCacheForProjection[projKey];
    }
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!ImageTile} Tile.
   * @private
   */


  TileImage.prototype.createTile_ = function (z, x, y, pixelRatio, projection, key) {
    var tileCoord = [z, x, y];
    var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    var tileUrl = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : undefined;
    var tile = new this.tileClass(tileCoord, tileUrl !== undefined ? _TileState.default.IDLE : _TileState.default.EMPTY, tileUrl !== undefined ? tileUrl : '', this.crossOrigin, this.tileLoadFunction, this.tileOptions);
    tile.key = key;
    tile.addEventListener(_EventType.default.CHANGE, this.handleTileChange.bind(this));
    return tile;
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!(ImageTile|ReprojTile)} Tile.
   */


  TileImage.prototype.getTile = function (z, x, y, pixelRatio, projection) {
    var sourceProjection = this.getProjection();

    if (!_common.ENABLE_RASTER_REPROJECTION || !sourceProjection || !projection || (0, _proj.equivalent)(sourceProjection, projection)) {
      return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
    } else {
      var cache = this.getTileCacheForProjection(projection);
      var tileCoord = [z, x, y];
      var tile = void 0;
      var tileCoordKey = (0, _tilecoord.getKey)(tileCoord);

      if (cache.containsKey(tileCoordKey)) {
        tile = cache.get(tileCoordKey);
      }

      var key = this.getKey();

      if (tile && tile.key == key) {
        return tile;
      } else {
        var sourceTileGrid = this.getTileGridForProjection(sourceProjection);
        var targetTileGrid = this.getTileGridForProjection(projection);
        var wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
        var newTile = new _Tile.default(sourceProjection, sourceTileGrid, projection, targetTileGrid, tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio), this.getGutter(), function (z, x, y, pixelRatio) {
          return this.getTileInternal(z, x, y, pixelRatio, sourceProjection);
        }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.getInterpolate());
        newTile.key = key;

        if (tile) {
          newTile.interimTile = tile;
          newTile.refreshInterimChain();
          cache.replace(tileCoordKey, newTile);
        } else {
          cache.set(tileCoordKey, newTile);
        }

        return newTile;
      }
    }
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!(ImageTile|ReprojTile)} Tile.
   * @protected
   */


  TileImage.prototype.getTileInternal = function (z, x, y, pixelRatio, projection) {
    var tile = null;
    var tileCoordKey = (0, _tilecoord.getKeyZXY)(z, x, y);
    var key = this.getKey();

    if (!this.tileCache.containsKey(tileCoordKey)) {
      tile = this.createTile_(z, x, y, pixelRatio, projection, key);
      this.tileCache.set(tileCoordKey, tile);
    } else {
      tile = this.tileCache.get(tileCoordKey);

      if (tile.key != key) {
        // The source's params changed. If the tile has an interim tile and if we
        // can use it then we use it. Otherwise we create a new tile.  In both
        // cases we attempt to assign an interim tile to the new tile.
        var interimTile = tile;
        tile = this.createTile_(z, x, y, pixelRatio, projection, key); //make the new tile the head of the list,

        if (interimTile.getState() == _TileState.default.IDLE) {
          //the old tile hasn't begun loading yet, and is now outdated, so we can simply discard it
          tile.interimTile = interimTile.interimTile;
        } else {
          tile.interimTile = interimTile;
        }

        tile.refreshInterimChain();
        this.tileCache.replace(tileCoordKey, tile);
      }
    }

    return tile;
  };
  /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */


  TileImage.prototype.setRenderReprojectionEdges = function (render) {
    if (!_common.ENABLE_RASTER_REPROJECTION || this.renderReprojectionEdges_ == render) {
      return;
    }

    this.renderReprojectionEdges_ = render;

    for (var id in this.tileCacheForProjection) {
      this.tileCacheForProjection[id].clear();
    }

    this.changed();
  };
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */


  TileImage.prototype.setTileGridForProjection = function (projection, tilegrid) {
    if (_common.ENABLE_RASTER_REPROJECTION) {
      var proj = (0, _proj.get)(projection);

      if (proj) {
        var projKey = (0, _util.getUid)(proj);

        if (!(projKey in this.tileGridForProjection)) {
          this.tileGridForProjection[projKey] = tilegrid;
        }
      }
    }
  };

  return TileImage;
}(_UrlTile.default);
/**
 * @param {ImageTile} imageTile Image tile.
 * @param {string} src Source.
 */


function defaultTileLoadFunction(imageTile, src) {
  /** @type {HTMLImageElement|HTMLVideoElement} */
  imageTile.getImage().src = src;
}

var _default = TileImage;
exports.default = _default;
},{"../events/EventType.js":"node_modules/ol/events/EventType.js","../ImageTile.js":"node_modules/ol/ImageTile.js","../reproj/Tile.js":"node_modules/ol/reproj/Tile.js","../TileCache.js":"node_modules/ol/TileCache.js","../TileState.js":"node_modules/ol/TileState.js","./UrlTile.js":"node_modules/ol/source/UrlTile.js","../reproj/common.js":"node_modules/ol/reproj/common.js","../proj.js":"node_modules/ol/proj.js","../tilecoord.js":"node_modules/ol/tilecoord.js","../tilegrid.js":"node_modules/ol/tilegrid.js","../util.js":"node_modules/ol/util.js"}],"node_modules/ol/source/XYZ.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TileImage = _interopRequireDefault(require("./TileImage.js"));

var _tilegrid = require("../tilegrid.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/source/XYZ
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
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
 * Not used if `tileGrid` is provided.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get
 * tile URL given a tile coordinate and the projection.
 * Required if `url` or `urls` are not provided.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`,
 * and `{z}` placeholders. A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`,
 * may be used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */

/**
 * @classdesc
 * Layer source for tile data with URLs in a set XYZ format that are
 * defined in a URL template. By default, this follows the widely-used
 * Google grid where `x` 0 and `y` 0 are in the top left. Grids like
 * TMS where `x` 0 and `y` 0 are in the bottom left can be used by
 * using the `{-y}` placeholder in the URL template, so long as the
 * source does not have a custom tile grid. In this case
 * a `tileUrlFunction` can be used, such as:
 * ```js
 *  tileUrlFunction: function(coordinate) {
 *    return 'http://mapserver.com/' + coordinate[0] + '/' +
 *      coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
 *  }
 * ```
 * @api
 */
var XYZ =
/** @class */
function (_super) {
  __extends(XYZ, _super);
  /**
   * @param {Options} [opt_options] XYZ options.
   */


  function XYZ(opt_options) {
    var options = opt_options || {};
    var interpolate = options.imageSmoothing !== undefined ? options.imageSmoothing : true;

    if (options.interpolate !== undefined) {
      interpolate = options.interpolate;
    }

    var projection = options.projection !== undefined ? options.projection : 'EPSG:3857';
    var tileGrid = options.tileGrid !== undefined ? options.tileGrid : (0, _tilegrid.createXYZ)({
      extent: (0, _tilegrid.extentFromProjection)(projection),
      maxResolution: options.maxResolution,
      maxZoom: options.maxZoom,
      minZoom: options.minZoom,
      tileSize: options.tileSize
    });
    return _super.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: interpolate,
      opaque: options.opaque,
      projection: projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileGrid: tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== undefined ? options.wrapX : true,
      transition: options.transition,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    }) || this;
  }

  return XYZ;
}(_TileImage.default);

var _default = XYZ;
exports.default = _default;
},{"./TileImage.js":"node_modules/ol/source/TileImage.js","../tilegrid.js":"node_modules/ol/tilegrid.js"}],"Scripts/customFunctions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLayerByName = getLayerByName;
var map = $('#map').data('map');
var mapLayers = map.getLayers();

function getLayerByName(layerName) {
  var layer = null;
  mapLayers.forEach(function (lyr) {
    if (lyr.get('name') === layerName) layer = lyr;
  });
  return layer;
}
},{}],"Scripts/Identify.js":[function(require,module,exports) {
"use strict";

require("ol/ol.css");

var _Overlay = _interopRequireDefault(require("ol/Overlay"));

var _Tile = _interopRequireDefault(require("ol/layer/Tile"));

var _View = _interopRequireDefault(require("ol/View"));

var _XYZ = _interopRequireDefault(require("ol/source/XYZ"));

var _proj = require("ol/proj");

var _coordinate = require("ol/coordinate");

var _customFunctions = require("./customFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = $('#map').data('map');
/**
 * Elements that make up the popup.
 */

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
/**
 * Create an overlay to anchor the popup to the map.
 */

var overlay = new _Overlay.default({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});
/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

var key = 'Get your own API key at https://www.maptiler.com/cloud/';
var attributions = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' + '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
/**
 * Create the map.
 */

map.addOverlay(overlay);
/**
 * Add a click handler to the map to render the popup.
 */

map.on('singleclick', function (evt) {
  var coordinate = evt.coordinate;
  var hdms = (0, _coordinate.toStringHDMS)((0, _proj.toLonLat)(coordinate)); //Getting The Layer Source: getting the layer itself, and then getting its sourcw
  //Create a function to get the layer by name
  //Get The Layer by its name

  var CrimeTALayer = (0, _customFunctions.getLayerByName)('CrimeTA');
  var CrimeTASource = CrimeTALayer.getSource();
  var CrimeAreaLayer = (0, _customFunctions.getLayerByName)('CrimeArea');
  var CrimeAreaSource = CrimeAreaLayer.getSource();
  var view = map.getView();
  var resolution = view.getResolution();
  var projection = view.getProjection(); //แสดง pop up เมื่อคลิ๊ก

  var CrimeTAInfo = $('#Crime-Info');
  CrimeTAInfo.html('');
  var CrimeAreaInfo = $('#Crime-Area-Info');
  CrimeAreaInfo.html('');
  var noFeatures = $('no-features-Info');
  noFeatures.html('<p>No features info</p>');
  var CrimeTAUrl = CrimeTASource.getFeatureInfoUrl(coordinate, resolution, projection, {
    'INFO_FORMAT': 'application/json'
  });
  var CrimeAreaUrl = CrimeAreaSource.getFeatureInfoUrl(coordinate, resolution, projection, {
    'INFO_FORMAT': 'application/json'
  });

  if (CrimeTAUrl) {
    $.ajax({
      url: CrimeTAUrl,
      method: 'GET',
      success: function success(result) {
        console.log(result);
        var CrimeTA = result.features[0];

        if (CrimeTA) {
          var CrimeTAName = CrimeTA.properties.ta2022_v1_;
          var CrimeTAName2 = CrimeTA.properties.ta2022_v_1;
          var CrimeTAArea = CrimeTA.properties.land_area_; // const CrimeTAInfo =$('#Crime-Info');

          CrimeTAInfo.html("<h5>Crime TA Info</h5>\n            <p>Crime TA Name: ".concat(CrimeTAName, "</p> \n            <p>Crime TA Name2: ").concat(CrimeTAName2, "</p>\n            <p>Crime TA Area (sqm): ").concat(CrimeTAArea.toFixed(2), "</p>"));
          noFeatures.html('');
        }
      }
    });

    if (CrimeAreaUrl) {
      $.ajax({
        url: CrimeAreaUrl,
        method: 'GET',
        success: function success(result) {
          console.log(result);
          var CrimeArea = result.features[0];

          if (CrimeArea) {
            var CrimeAreaName = CrimeArea.properties.areaunitna;
            var CrimeAreaName2 = CrimeArea.properties.tlaname; // const CrimeAreaArea=CrimeArea.properties.land_area_;
            // const CrimeAreaInfo =$('#Crime-Area-Info');

            CrimeAreaInfo.html("<h5>Crime Area Info</h5>\n                <p>Crime Area Name: ".concat(CrimeAreaName, "</p> \n                <p>Crime Area Name2: ").concat(CrimeAreaName2, "</p>\n                "));
            noFeatures.html('');
          }
        }
      });
    }
  }

  {} //   content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';

  overlay.setPosition(coordinate);
});
},{"ol/ol.css":"node_modules/ol/ol.css","ol/Overlay":"node_modules/ol/Overlay.js","ol/layer/Tile":"node_modules/ol/layer/Tile.js","ol/View":"node_modules/ol/View.js","ol/source/XYZ":"node_modules/ol/source/XYZ.js","ol/proj":"node_modules/ol/proj.js","ol/coordinate":"node_modules/ol/coordinate.js","./customFunctions":"Scripts/customFunctions.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51847" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Scripts/Identify.js"], null)
//# sourceMappingURL=/Identify.ad0b8e74.js.map