(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["spritejs"] = factory();
	else
		root["spritejs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 122);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(9);
var hide = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(61)('wks');
var uid = __webpack_require__(38);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(73);
var isBuffer = __webpack_require__(198);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(80);
var toPrimitive = __webpack_require__(63);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(23);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(28);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(53);
var defined = __webpack_require__(50);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(169)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(54)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(129);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(125);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(124);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(174);
var global = __webpack_require__(3);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(18);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["spritejs"] = factory();
	else
		root["spritejs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 115);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(0);
var ctx = __webpack_require__(14);
var hide = __webpack_require__(16);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(116);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(79);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(65)('wks');
var uid = __webpack_require__(46);
var Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(81);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(78);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(23)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(86);
var toPrimitive = __webpack_require__(67);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(133), __esModule: true };

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(34);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(38);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(56);
var defined = __webpack_require__(53);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseValue = exports.deprecate = exports.setDeprecation = exports.attr = exports.appendUnit = exports.rectVertices = exports.rectToBox = exports.boxUnion = exports.boxEqual = exports.boxToRect = exports.boxIntersect = exports.parseStringTransform = exports.fourValuesShortCut = exports.parseColorString = exports.parseStringFloat = exports.parseStringInt = exports.oneOrTwoValues = exports.parseColor = undefined;

var _utils = __webpack_require__(203);

var _decorators = __webpack_require__(202);

exports.parseColor = _utils.parseColor;
exports.oneOrTwoValues = _utils.oneOrTwoValues;
exports.parseStringInt = _utils.parseStringInt;
exports.parseStringFloat = _utils.parseStringFloat;
exports.parseColorString = _utils.parseColorString;
exports.fourValuesShortCut = _utils.fourValuesShortCut;
exports.parseStringTransform = _utils.parseStringTransform;
exports.boxIntersect = _utils.boxIntersect;
exports.boxToRect = _utils.boxToRect;
exports.boxEqual = _utils.boxEqual;
exports.boxUnion = _utils.boxUnion;
exports.rectToBox = _utils.rectToBox;
exports.rectVertices = _utils.rectVertices;
exports.appendUnit = _utils.appendUnit;
exports.attr = _decorators.attr;
exports.setDeprecation = _decorators.setDeprecation;
exports.deprecate = _decorators.deprecate;
exports.parseValue = _decorators.parseValue;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(26);

var _entries2 = _interopRequireDefault(_entries);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _map = __webpack_require__(33);

var _map2 = _interopRequireDefault(_map);

exports.registerNodeType = registerNodeType;
exports.createNode = createNode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeTypes = new _map2.default();

function registerNodeType(type, Class) {
  var isQuerable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  Object.defineProperty(Class.prototype, 'nodeType', {
    get: function get() {
      return type;
    }
  });
  nodeTypes.set(type, Class);
  if (isQuerable && !Class.prototype.ownerDocument) {
    Object.defineProperty(Class.prototype, 'ownerDocument', {
      get: function get() {
        var that = this;
        return {
          createElementNS: function createElementNS(uri, name) {
            var sprite = createNode(name);
            if (sprite) {
              return that.appendChild(sprite);
            }
            return null;
          }
        };
      }
    });
    (0, _assign2.default)(Class.prototype, {
      namespaceURI: 'http://spritejs.org/' + type,
      getElementById: function getElementById(id) {
        var children = this.children;
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.id === id) {
            return child;
          }
        }
        return null;
      },
      getElementsByName: function getElementsByName(name) {
        return this.children.filter(function (c) {
          return c.name === name;
        });
      },

      /*
        d3-friendly
        *, nodeType, checker
      */
      querySelector: function querySelector(selector) {
        var children = this.children;

        if (!selector || selector === '*') {
          return children[0];
        } else if (typeof selector === 'string') {
          // querySelector('nodeType')
          // querySelector('#id')
          // querySelector(':name')

          if (selector.startsWith('#')) {
            return this.getElementById(selector.slice(1));
          }
          if (selector.startsWith(':')) {
            var name = selector.slice(1);

            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              if (child.name === name) {
                return child;
              }
            }
            return null;
          }
          var nodeType = getNodeType(selector);
          if (nodeType) {
            for (var _i = 0; _i < children.length; _i++) {
              var _child = children[_i];
              if (_child instanceof nodeType) {
                return _child;
              }
            }
            return null;
          }
          return null;
        }
        for (var _i2 = 0; _i2 < children.length; _i2++) {
          var _child2 = children[_i2];
          var sel = (0, _entries2.default)(selector);
          for (var j = 0; j < sel.length; j++) {
            var _sel$j = (0, _slicedToArray3.default)(sel[j], 2),
                _type = _sel$j[0],
                checker = _sel$j[1];

            var _nodeType = getNodeType(_type);
            if (_nodeType && _child2 instanceof _nodeType && checker.call(this, _child2)) {
              return _child2;
            }
          }
        }
        return null;
      },
      querySelectorAll: function querySelectorAll(selector) {
        var _this = this;

        if (!selector || selector === '*') {
          return this.children;
        } else if (typeof selector === 'string') {
          if (selector.startsWith('#')) {
            var sprite = this.getElementById(selector.slice(1));
            return sprite ? [sprite] : [];
          }
          if (selector.startsWith(':')) {
            return this.getElementsByName(selector.slice(1));
          }
          var nodeType = getNodeType(selector);
          if (nodeType) {
            return this.children.filter(function (child) {
              return child instanceof nodeType;
            });
          }
          return null;
        }
        return this.children.filter(function (child) {
          var sel = (0, _entries2.default)(selector);
          for (var i = 0; i < sel.length; i++) {
            var _sel$i = (0, _slicedToArray3.default)(sel[i], 2),
                _type2 = _sel$i[0],
                checker = _sel$i[1];

            var _nodeType2 = getNodeType(_type2);
            if (!_nodeType2 || !(child instanceof _nodeType2)) {
              return false;
            }
            if (!checker.call(_this, child)) {
              return false;
            }
          }
          return true;
        });
      }
    });
  }
}

function createNode(type) {
  var Class = nodeTypes.get(type);
  if (Class) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Class, [null].concat(args)))();
  }
  return null;
}

function getNodeType(type) {
  return nodeTypes.get(type);
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(27);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(121);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(118);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(51);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(51);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(161)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(57)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(95);
var enumBugKeys = __webpack_require__(55);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(53);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(166);
var global = __webpack_require__(4);
var hide = __webpack_require__(16);
var Iterators = __webpack_require__(28);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = __webpack_require__(27);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = __webpack_require__(123);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = __webpack_require__(51);

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _set = __webpack_require__(50);

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _dec2, _desc, _value, _class, _class2, _temp;

var _attr12 = __webpack_require__(112);

var _attr13 = _interopRequireDefault(_attr12);

var _basenode = __webpack_require__(48);

var _basenode2 = _interopRequireDefault(_basenode);

var _spriteMath = __webpack_require__(73);

var _animation = __webpack_require__(111);

var _animation2 = _interopRequireDefault(_animation);

var _spriteUtils = __webpack_require__(18);

var _gradient = __webpack_require__(40);

var _gradient2 = _interopRequireDefault(_gradient);

var _nodetype = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _attr = (0, _symbol2.default)('attr'),
    _animations = (0, _symbol2.default)('animations'),
    _beforeRenders = (0, _symbol2.default)('beforeRenders'),
    _afterRenders = (0, _symbol2.default)('afterRenders');

var BaseSprite = (_dec = (0, _spriteUtils.deprecate)('BaseSprite#draw(fn, ...)', 'Instead use beforeDraw/afterDraw.'), _dec2 = (0, _spriteUtils.deprecate)('Instead use beforeDraw/afterDraw.'), (_class = (_temp = _class2 = function (_BaseNode) {
  (0, _inherits3.default)(BaseSprite, _BaseNode);

  /**
    new Sprite({
      attr: {
        ...
      }
    })
   */
  function BaseSprite(attr) {
    (0, _classCallCheck3.default)(this, BaseSprite);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BaseSprite.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite)).call(this));

    _this[_attr] = new _this.constructor.Attr(_this);
    _this[_animations] = new _set2.default();
    _this[_beforeRenders] = [];
    _this[_afterRenders] = [];

    if (attr) {
      _this.attr(attr);
    }
    return _this;
  }

  (0, _createClass3.default)(BaseSprite, [{
    key: 'serialize',
    value: function serialize() {
      var nodeType = this.nodeType,
          attrs = this[_attr].serialize(),
          id = this.id;

      return {
        nodeType: nodeType,
        attrs: attrs,
        id: id
      };
    }
  }, {
    key: 'cloneNode',
    value: function cloneNode(copyContent) {
      var node = new this.constructor();
      if (copyContent) {
        var attrs = JSON.parse(this[_attr].serialize());
        (0, _assign2.default)(node.attrs(), attrs);
      }
      return node;
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(prop) {
      return this.attr(prop);
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(prop, val) {
      return this.attr(prop, val);
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(prop) {
      return this.attr(prop, null);
    }
  }, {
    key: 'attr',
    value: function attr(props, val) {
      if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) === 'object') {
        (0, _assign2.default)(this[_attr], props);
        return this;
      } else if (typeof props === 'string') {
        if (val !== undefined) {
          (0, _assign2.default)(this[_attr], (0, _defineProperty3.default)({}, props, val));
          return this;
        }
        var attrs = this[_attr].attrs;
        return attrs[props];
      }

      return this[_attr].attrs;
    }
  }, {
    key: 'attrs',
    value: function attrs() {
      return this[_attr].attrs;
    }
  }, {
    key: 'animate',
    value: function animate(frames, timing) {
      var _this2 = this;

      var animation = new _animation2.default(this, frames, timing);
      if (this.layer) {
        animation.baseTimeline = this.layer.timeline;
        animation.play();
        animation.finished.then(function () {
          _this2[_animations].delete(animation);
        });
      }
      this[_animations].add(animation);
      return animation;
    }
  }, {
    key: 'connect',
    value: function connect(parent) {
      var _this3 = this;

      var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (parent && !(parent instanceof _basenode2.default)) {
        var node = new _basenode2.default();
        node.context = parent;
        parent = node;
      }
      var ret = (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'connect', this).call(this, parent, zOrder);
      Object.defineProperty(this, 'context', {
        get: function get() {
          return parent.cache || parent.context;
        },
        configurable: true
      });
      this[_animations].forEach(function (animation) {
        animation.baseTimeline = parent.timeline;
        animation.play();
        animation.finished.then(function () {
          _this3[_animations].delete(animation);
        });
      });
      return ret;
    }
  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      this[_animations].forEach(function (animation) {
        return animation.cancel();
      });
      var ret = (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'disconnect', this).call(this, parent);
      delete this.context;
      return ret;
    }

    // content width / height

  }, {
    key: 'OBBCollision',


    // OBB: http://blog.csdn.net/silangquan/article/details/50812425
    value: function OBBCollision(sprite) {
      // vertices: [p1, p2, p3, p4]
      var _vertices = (0, _slicedToArray3.default)(this.vertices, 3),
          p11 = _vertices[0],
          p12 = _vertices[1],
          p13 = _vertices[2],
          _sprite$vertices = (0, _slicedToArray3.default)(sprite.vertices, 3),
          p21 = _sprite$vertices[0],
          p22 = _sprite$vertices[1],
          p23 = _sprite$vertices[2];

      var a1 = new _spriteMath.Vector(p12, p11).unit(),
          a2 = new _spriteMath.Vector(p13, p12).unit(),
          a3 = new _spriteMath.Vector(p22, p21).unit(),
          a4 = new _spriteMath.Vector(p23, p22).unit();

      // The projection of the axis of a vertex in a certain direction
      function verticesProjection(vertices, axis) {
        var _vertices$map = vertices.map(function (v) {
          return axis.dot(new _spriteMath.Vector(v));
        }),
            _vertices$map2 = (0, _slicedToArray3.default)(_vertices$map, 4),
            p1 = _vertices$map2[0],
            p2 = _vertices$map2[1],
            p3 = _vertices$map2[2],
            p4 = _vertices$map2[3];

        return [Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4)];
      }

      function projectionIntersect(p1, p2) {
        var m1 = (p1[0] + p1[1]) / 2,
            l1 = Math.abs(p1[1] - p1[0]),
            m2 = (p2[0] + p2[1]) / 2,
            l2 = Math.abs(p2[1] - p2[0]);

        return Math.abs(m2 - m1) <= (l1 + l2) / 2;
      }

      return projectionIntersect(verticesProjection(this.vertices, a1), verticesProjection(sprite.vertices, a1)) && projectionIntersect(verticesProjection(this.vertices, a2), verticesProjection(sprite.vertices, a2)) && projectionIntersect(verticesProjection(this.vertices, a3), verticesProjection(sprite.vertices, a3)) && projectionIntersect(verticesProjection(this.vertices, a4), verticesProjection(sprite.vertices, a4));
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (!this.parent) return false;
      this.parent.removeChild(this);
      return true;
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parent) {
      parent.appendChild(this);
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate() {
      var clearCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var parent = this.parent;
      if (parent) {
        if (parent.forceUpdate) {
          parent.forceUpdate(true);
        } else if (parent.update) {
          if (clearCache) {
            this.cache = null;
          }
          this.parent.update(this);
        }
      }
    }

    // layer position to sprite offset

  }, {
    key: 'pointToOffset',
    value: function pointToOffset(x, y) {
      var attr = this.attr();
      var dx = x - attr.x,
          dy = y - attr.y;

      var transform = this.transform;
      return transform.inverse().transformPoint(dx, dy);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      var parentX = void 0,
          parentY = void 0;

      if (evt.parentX != null) {
        // group
        parentX = evt.parentX;
        parentY = evt.parentY;
      } else {
        parentX = evt.layerX;
        parentY = evt.layerY;
      }

      var _renderRect = (0, _slicedToArray3.default)(this.renderRect, 4),
          x = _renderRect[0],
          y = _renderRect[1],
          w = _renderRect[2],
          h = _renderRect[3];

      if (parentX >= x && parentX - x < w && parentY >= y && parentY - y < h) {
        var _originRect = (0, _slicedToArray3.default)(this.originRect, 4),
            ox = _originRect[0],
            oy = _originRect[1],
            ow = _originRect[2],
            oh = _originRect[3];

        var _pointToOffset = this.pointToOffset(parentX, parentY),
            _pointToOffset2 = (0, _slicedToArray3.default)(_pointToOffset, 2),
            nx = _pointToOffset2[0],
            ny = _pointToOffset2[1];

        if (nx >= ox && nx - ox < ow && ny >= oy && ny - oy < oh) {
          evt.offsetX = nx;
          evt.offsetY = ny;

          return true;
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(t) {
      if (typeof t === 'function') {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return this._draw.apply(this, [t].concat(args));
      }

      var drawingContext = this.context;
      if (!drawingContext) {
        throw new Error('No context!');
      }

      var context = drawingContext;

      var transform = this.transform.m,
          pos = this.attr('pos'),
          bound = this.originRect;

      drawingContext.save();
      drawingContext.translate(pos[0], pos[1]);
      drawingContext.transform.apply(drawingContext, (0, _toConsumableArray3.default)(transform));
      drawingContext.globalAlpha = this.attr('opacity');

      if (drawingContext.canvas && drawingContext.canvas.cloneNode) {
        context = this.cache;
        if (!context) {
          var cacheCanvas = drawingContext.canvas.cloneNode(false);
          cacheCanvas.width = bound[2];
          cacheCanvas.height = bound[3];
          context = cacheCanvas.getContext('2d');
        }
      } else {
        context.translate(bound[0], bound[1]);
      }

      // too slow in wxapp
      // if(context === drawingContext) {
      //   const [w, h] = this.offsetSize
      //   context.save()
      //   context.beginPath()
      //   context.rect(0, 0, w, h)
      //   context.clip()
      //   context.closePath()
      // }
      if (this[_beforeRenders].length) {
        this.userRender(t, context, 'before');
      }
      if (context !== this.cache) {
        // set cache before render for group
        if (context !== drawingContext) this.cache = context;
        context = this.render(t, context);
      }
      if (this[_afterRenders].length) {
        this.userRender(t, context, 'after');
      }
      // if(context === drawingContext) {
      //   context.restore()
      // }

      if (context !== drawingContext) {
        drawingContext.drawImage(context.canvas, bound[0], bound[1]);
      }
      drawingContext.restore();

      var updateHandlers = this.getEventHandlers('update');
      if (updateHandlers.length) {
        this.dispatchEvent('update', {
          target: this, context: context, renderBox: this.renderBox, lastRenderBox: this.lastRenderBox
        }, true);
      }
      this.lastRenderBox = this.renderBox;

      return drawingContext;
    }
  }, {
    key: '_draw',
    value: function _draw(fn) {
      var clearCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.drawAfter(fn, clearCache, remove);
    }
  }, {
    key: 'drawOnce',
    value: function drawOnce(fn) {
      this._draw(fn, true, true);
    }
  }, {
    key: 'drawBefore',
    value: function drawBefore(fn) {
      var clearCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this[_beforeRenders].push({ fn: fn, clearCache: clearCache, remove: remove });
      this.forceUpdate();
    }
  }, {
    key: 'drawAfter',
    value: function drawAfter(fn) {
      var clearCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this[_afterRenders].push({ fn: fn, clearCache: clearCache, remove: remove });
      this.forceUpdate();
    }

    // call by layer

  }, {
    key: 'userRender',
    value: function userRender(t, context, type) {
      var handlers = type;
      if (type === 'before') handlers = this[_beforeRenders];
      if (type === 'after') handlers = this[_afterRenders];
      var renderers = [];
      for (var i = 0; i < handlers.length; i++) {
        var renderer = handlers[i];
        var fn = renderer.fn,
            remove = renderer.remove,
            clearCache = renderer.clearCache;
        /* eslint-disable no-await-in-loop */

        fn.call(this, context, t, renderer);
        /* eslint-enable no-await-in-loop */
        if (!remove) {
          renderers.push(renderer);
        }
        if (clearCache) {
          this.cache = null;
        }
      }
      if (type === 'before') {
        this[_beforeRenders] = renderers;
      }
      if (type === 'after') {
        this[_afterRenders] = renderers;
      }
      return renderers;
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var attr = this.attr(),
          bgcolor = attr.bgcolor,
          gradients = attr.gradients,
          _offsetSize = (0, _slicedToArray3.default)(this.offsetSize, 2),
          offsetWidth = _offsetSize[0],
          offsetHeight = _offsetSize[1],
          _clientSize = (0, _slicedToArray3.default)(this.clientSize, 2),
          clientWidth = _clientSize[0],
          clientHeight = _clientSize[1];


      if (offsetWidth === 0 || offsetHeight === 0) {
        return drawingContext; // don't need to render
      }

      var _attr$border = (0, _slicedToArray3.default)(attr.border, 2),
          borderWidth = _attr$border[0],
          borderColor = _attr$border[1];

      var borderRadius = attr.borderRadius;

      drawingContext.save();

      // draw border
      if (borderWidth || gradients && gradients.border) {
        drawingContext.lineWidth = borderWidth;

        var x = borderWidth / 2,
            y = borderWidth / 2,
            w = offsetWidth - borderWidth,
            h = offsetHeight - borderWidth,
            r = borderRadius;


        drawingContext.beginPath();
        drawingContext.moveTo(x + r, y);
        drawingContext.arcTo(x + w, y, x + w, y + h, r);
        drawingContext.arcTo(x + w, y + h, x, y + h, r);
        drawingContext.arcTo(x, y + h, x, y, r);
        drawingContext.arcTo(x, y, x + w, y, r);
        drawingContext.closePath();

        if (gradients && gradients.border) {
          var rect = gradients.border.rect || [x, y, w, h];

          drawingContext.strokeStyle = (0, _gradient2.default)(drawingContext, rect, gradients.border);
        } else if (borderColor) {
          drawingContext.strokeStyle = borderColor;
        }

        drawingContext.stroke();
        drawingContext.clip();
      }

      // draw bgcolor
      if (bgcolor || gradients && gradients.bgcolor) {
        var _ref = [borderWidth, borderWidth, clientWidth, clientHeight, Math.max(0, borderRadius - borderWidth / 2)],
            _x9 = _ref[0],
            _y = _ref[1],
            _w = _ref[2],
            _h = _ref[3],
            _r = _ref[4];


        drawingContext.beginPath();
        drawingContext.moveTo(_x9 + _r, _y);
        drawingContext.arcTo(_x9 + _w, _y, _x9 + _w, _y + _h, _r);
        drawingContext.arcTo(_x9 + _w, _y + _h, _x9, _y + _h, _r);
        drawingContext.arcTo(_x9, _y + _h, _x9, _y, _r);
        drawingContext.arcTo(_x9, _y, _x9 + _w, _y, _r);
        drawingContext.closePath();

        if (gradients && gradients.bgcolor) {
          var _rect = gradients.bgcolor.rect || [_x9, _y, _w, _h];

          drawingContext.fillStyle = (0, _gradient2.default)(drawingContext, _rect, gradients.bgcolor);
        } else if (bgcolor) {
          drawingContext.fillStyle = bgcolor;
        }

        drawingContext.fill();
      }

      drawingContext.restore();

      var padding = attr.padding,
          paddingTop = padding[0],
          paddingLeft = padding[3];

      drawingContext.translate(paddingLeft, paddingTop);

      return drawingContext;
    }
  }, {
    key: 'layer',
    get: function get() {
      var node = this;
      do {
        node = node.parent;
      } while (node != null && !node.drawSprites);
      return node;
    }
  }, {
    key: 'id',
    set: function set(val) {
      this.attr('id', val);
    },
    get: function get() {
      return this.attr('id');
    }
  }, {
    key: 'name',
    set: function set(val) {
      this.attr('name', val);
    },
    get: function get() {
      return this.attr('name');
    }
  }, {
    key: 'transform',
    get: function get() {
      return new _spriteMath.Matrix(this[_attr].get('transformMatrix'));
    }
  }, {
    key: 'contentSize',
    get: function get() {
      var _attr2 = this.attr('size'),
          _attr3 = (0, _slicedToArray3.default)(_attr2, 2),
          width = _attr3[0],
          height = _attr3[1];

      return [width | 0, height | 0];
    }

    // content + padding

  }, {
    key: 'clientSize',
    get: function get() {
      var _attr4 = this.attr('padding'),
          _attr5 = (0, _slicedToArray3.default)(_attr4, 4),
          top = _attr5[0],
          right = _attr5[1],
          bottom = _attr5[2],
          left = _attr5[3],
          _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
          width = _contentSize[0],
          height = _contentSize[1];

      return [left + width + right, top + height + bottom];
    }

    // content + padding + border

  }, {
    key: 'offsetSize',
    get: function get() {
      var _attr6 = this.attr('border'),
          _attr7 = (0, _slicedToArray3.default)(_attr6, 1),
          borderWidth = _attr7[0],
          _clientSize2 = (0, _slicedToArray3.default)(this.clientSize, 2),
          width = _clientSize2[0],
          height = _clientSize2[1];

      return [width + 2 * borderWidth, height + 2 * borderWidth];
    }
  }, {
    key: 'innerSize',
    get: function get() {
      return this.contentSize;
    }
  }, {
    key: 'outerSize',
    get: function get() {
      return this.offsetSize;
    }
  }, {
    key: 'boundRect',
    get: function get() {
      var anchor = this.attr('anchor'),
          transform = this.transform;

      var _offsetSize2 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          width = _offsetSize2[0],
          height = _offsetSize2[1];

      var _anchor = (0, _slicedToArray3.default)(anchor, 2),
          anchorX = _anchor[0],
          anchorY = _anchor[1];

      var vertexs = [[-anchorX * width, -anchorY * height], [(1 - anchorX) * width, -anchorY * height], [-anchorX * width, (1 - anchorY) * height], [(1 - anchorX) * width, (1 - anchorY) * height]];

      var transformed = vertexs.map(function (v) {
        return transform.transformPoint(v[0], v[1]);
      });
      var vx = transformed.map(function (v) {
        return v[0];
      }),
          vy = transformed.map(function (v) {
        return v[1];
      });

      var minX = Math.min.apply(Math, (0, _toConsumableArray3.default)(vx)),
          minY = Math.min.apply(Math, (0, _toConsumableArray3.default)(vy)),
          maxX = Math.max.apply(Math, (0, _toConsumableArray3.default)(vx)),
          maxY = Math.max.apply(Math, (0, _toConsumableArray3.default)(vy));

      return [].concat((0, _toConsumableArray3.default)([minX, minY].map(Math.floor)), (0, _toConsumableArray3.default)([maxX - minX, maxY - minY].map(Math.ceil)));
    }

    // rect before transform

  }, {
    key: 'originRect',
    get: function get() {
      var _offsetSize3 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          width = _offsetSize3[0],
          height = _offsetSize3[1],
          _attr8 = this.attr('anchor'),
          _attr9 = (0, _slicedToArray3.default)(_attr8, 2),
          anchorX = _attr9[0],
          anchorY = _attr9[1];

      return [Math.floor(-anchorX * width), Math.floor(-anchorY * height), width, height];
    }
  }, {
    key: 'originRenderRect',
    get: function get() {
      var bound = this.originRect,
          pos = this.attr('pos');

      return [pos[0] + bound[0], pos[1] + bound[1], bound[2], bound[3]];
    }
  }, {
    key: 'renderBox',
    get: function get() {
      var bound = this.boundRect,
          pos = this.attr('pos');

      return [pos[0] + bound[0] - 1, pos[1] + bound[1] - 1, pos[0] + bound[0] + bound[2] + 1, pos[1] + bound[1] + bound[3] + 1];
    }
  }, {
    key: 'renderRect',
    get: function get() {
      var bound = this.boundRect,
          pos = this.attr('pos');

      return [pos[0] + bound[0], pos[1] + bound[1], bound[2], bound[3]];
    }
  }, {
    key: 'vertices',
    get: function get() {
      var vertices = (0, _spriteUtils.rectVertices)(this.originRect),
          transform = this.transform,
          _attr10 = this.attr('pos'),
          _attr11 = (0, _slicedToArray3.default)(_attr10, 2),
          x0 = _attr11[0],
          y0 = _attr11[1];


      return vertices.map(function (v) {
        var _transform$transformP = transform.transformPoint(v[0], v[1]),
            _transform$transformP2 = (0, _slicedToArray3.default)(_transform$transformP, 2),
            x = _transform$transformP2[0],
            y = _transform$transformP2[1];

        return [Math.round(x0 + x), Math.round(y0 + y)];
      });
    }
  }, {
    key: 'cache',
    set: function set(context) {
      this.cacheContext = context;
    },
    get: function get() {
      return this.cacheContext;
    }
  }]);
  return BaseSprite;
}(_basenode2.default), _class2.Attr = _attr13.default, _temp), (_applyDecoratedDescriptor(_class.prototype, '_draw', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_draw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'drawOnce', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'drawOnce'), _class.prototype)), _class));
exports.default = BaseSprite;


(0, _nodetype.registerNodeType)('basesprite', BaseSprite);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(131), __esModule: true };

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var call = __webpack_require__(89);
var isArrayIter = __webpack_require__(87);
var anObject = __webpack_require__(11);
var toLength = __webpack_require__(45);
var getIterFn = __webpack_require__(71);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(24);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = createGradients;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gradientBox(angle, rect) {
  var _rect = (0, _slicedToArray3.default)(rect, 4),
      x = _rect[0],
      y = _rect[1],
      w = _rect[2],
      h = _rect[3];

  angle %= 360;
  if (angle < 0) {
    angle += 360;
  }

  if (angle >= 0 && angle < 90) {
    var tan = Math.tan(Math.PI * angle / 180);

    var d = tan * w;

    if (d <= h) {
      return [x, y, x + w, y + d];
    }
    d = h / tan;
    return [x, y, x + d, y + h];
  } else if (angle >= 90 && angle < 180) {
    var _tan = Math.tan(Math.PI * (angle - 90) / 180);

    var _d = _tan * h;

    if (_d <= w) {
      return [x + w, y, x + w - _d, y + h];
    }
    _d = w / _tan;
    return [x + w, y, x, y + _d];
  } else if (angle >= 180 && angle < 270) {
    var _tan2 = Math.tan(Math.PI * (angle - 180) / 180);

    var _d2 = _tan2 * w;

    if (_d2 <= h) {
      return [x + w, y + h, x, y + h - _d2];
    }
    _d2 = h / _tan2;
    return [x + w, y + h, x + w - _d2, y];
  } else if (angle >= 270 && angle < 360) {
    var _tan3 = Math.tan(Math.PI * (angle - 270) / 180);

    var _d3 = _tan3 * h;

    if (_d3 <= w) {
      return [x, y + h, x + _d3, y];
    }
    _d3 = w / _tan3;
    return [x, y + h, x + w, y + h - _d3];
  }

  return [x, y, x + w, y + h];
}

function createGradients(context, rect, gradient) {
  var colors = gradient.colors,
      direction = gradient.direction,
      _rect2 = (0, _slicedToArray3.default)(rect, 4),
      x = _rect2[0],
      y = _rect2[1],
      w = _rect2[2],
      h = _rect2[3];

  var vector = gradient.vector;

  if (direction != null) {
    vector = gradientBox(direction, [x, y, w, h]);
  }

  var ret = void 0;
  if (vector.length === 4) {
    ret = context.createLinearGradient.apply(context, (0, _toConsumableArray3.default)(vector));
  } else if (vector.length === 6) {
    ret = context.createRadialGradient.apply(context, (0, _toConsumableArray3.default)(vector));
  } else if (vector.length === 3) {
    // for wxapp
    ret = context.createCircularGradient.apply(context, (0, _toConsumableArray3.default)(vector));
  } else {
    throw Error('Invalid gradient vector!');
  }

  colors.forEach(function (o) {
    ret.addColorStop(o.offset, o.color);
  });

  return ret;
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(49);

var _promise2 = _interopRequireDefault(_promise);

var _entries = __webpack_require__(26);

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = __webpack_require__(79);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = __webpack_require__(120);

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _utils = __webpack_require__(105);

var _effect2 = __webpack_require__(194);

var _effect3 = _interopRequireDefault(_effect2);

var _spriteTimeline = __webpack_require__(201);

var _spriteTimeline2 = _interopRequireDefault(_spriteTimeline);

var _easing = __webpack_require__(193);

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = __webpack_require__(76);

// 计算 offset
function calculateFramesOffset(keyframes) {
  keyframes = keyframes.slice(0);

  var firstFrame = keyframes[0],
      lastFrame = keyframes[keyframes.length - 1];

  lastFrame.offset = lastFrame.offset || 1;
  firstFrame.offset = firstFrame.offset || 0;

  var offset = 0,
      offsetFrom = -1;

  for (var i = 0; i < keyframes.length; i++) {
    var frame = keyframes[i];
    if (frame.offset != null) {
      var dis = i - offsetFrom;
      if (dis > 1) {
        var delta = (frame.offset - offset) / dis;
        for (var j = 0; j < dis - 1; j++) {
          keyframes[offsetFrom + j + 1].offset = offset + delta * (j + 1);
        }
      }
      offset = frame.offset;
      offsetFrom = i;
    }
    if (i > 0) {
      // 如果中间某个属性没有了，需要从前一帧复制过来
      keyframes[i] = (0, _assign2.default)({}, keyframes[i - 1], keyframes[i]);
    }
  }

  return keyframes;
}

var _timing = (0, _symbol2.default)('timing'),
    _keyframes = (0, _symbol2.default)('keyframes'),
    _initState = (0, _symbol2.default)('initState'),
    _readyDefer = (0, _symbol2.default)('readyDefer'),
    _finishedDefer = (0, _symbol2.default)('finishedDefer'),
    _effects = (0, _symbol2.default)('_effects');

/**
  easing: {
    type: 'cubic-bezier',
    value: [...]
  }
  easing: {
    type: 'steps',
    step: 1,
    pos: 'end'
  }
 */
var defaultTiming = {
  delay: 0,
  endDelay: 0,
  fill: 'auto',
  iterations: 1.0,
  playbackRate: 1.0,
  direction: 'normal',
  easing: 'linear',
  effect: null

  /**
    animation: play --> delay --> effect --> endDelay
    playState: idle --> pending --> running --> pending --> finished
   */
};
var Animator = function () {
  function Animator(initState, keyframes, timing) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Animator);

    if (Array.isArray(initState)) {
      var _ref = [initState[0], initState, keyframes];
      // 如果 initState 缺省，默认 keyframes 的第一帧为 initState

      initState = _ref[0];
      keyframes = _ref[1];
      timing = _ref[2];
    }

    if (typeof timing === 'number') {
      timing = { duration: timing };
    }

    this[_timing] = (0, _assign2.default)({}, defaultTiming, timing);

    var easing = this[_timing].easing;
    if (typeof easing === 'string') {
      if (!_easing2.default[easing]) {
        this[_timing].easing = (0, _utils.parseEasingStr)(easing);
      } else {
        this[_timing].easing = _easing2.default[easing];
      }
    } else if (this[_timing].easing.type === 'cubic-bezier') {
      this[_timing].easing = _utils.getBezierEasing.apply(undefined, (0, _toConsumableArray3.default)(easing.value));
    } else if (this[_timing].easing.type === 'steps') {
      this[_timing].easing = (0, _utils.getStepsEasing)(easing.step, easing.pos);
    }

    this[_keyframes] = calculateFramesOffset(keyframes);

    var lastFrame = this[_keyframes][this[_keyframes].length - 1];

    this[_initState] = {}; // 初始状态

    (0, _keys2.default)(lastFrame).forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(initState, key)) {
        _this[_initState][key] = initState[key];
      }
    });

    if (this[_keyframes][0].offset !== 0) {
      // 要补第一帧
      var startFrame = (0, _assign2.default)({}, this[_initState], { offset: 0 });
      this[_keyframes].unshift(startFrame);
    }
    if (lastFrame.offset < 1) {
      // 要补最后一帧
      var endFrame = (0, _assign2.default)({}, lastFrame, { offset: 1 });
      this[_keyframes].push(endFrame);
    }

    this[_effects] = {};
    this.timeline = null; // idle, no effect
  }

  (0, _createClass3.default)(Animator, [{
    key: 'pause',
    value: function pause() {
      this.timeline.playbackRate = 0;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      if (this.playState === 'finished') {
        this.cancel();
      }

      if (this.playState === 'idle') {
        var _timing2 = this[_timing],
            delay = _timing2.delay,
            duration = _timing2.duration,
            iterations = _timing2.iterations,
            endDelay = _timing2.endDelay,
            playbackRate = _timing2.playbackRate,
            timeline = _timing2.timeline;

        this.timeline = new _spriteTimeline2.default({
          originTime: delay,
          playbackRate: playbackRate
        }, timeline);

        if (this[_readyDefer] && !this[_readyDefer].timerID) {
          this[_readyDefer].timerID = this.timeline.setTimeout(function () {
            _this2[_readyDefer].resolve();
            assert(_this2.playState === 'running' || _this2.playState === 'finished', 'An error occured: ' + _this2.playState);
            delete _this2[_readyDefer];
          }, { entropy: -this.timeline.entropy });
        }

        if (this[_finishedDefer] && !this[_finishedDefer].timerID) {
          this[_finishedDefer].timerID = this.timeline.setTimeout(function () {
            _this2[_finishedDefer].resolve();
          }, { entropy: duration * iterations + endDelay - this.timeline.entropy });
        }
      } else if (this.playState === 'paused') {
        this.timeline.playbackRate = this.playbackRate;
        if (this[_readyDefer] && !this[_readyDefer].timerID) {
          this[_readyDefer].resolve();
          delete this[_readyDefer];
        }
      }
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this[_readyDefer]) {
        if (this.timeline) {
          this.timeline.clearTimeout(this[_readyDefer].timerID);
        }
        delete this[_readyDefer];
      }
      if (this[_finishedDefer]) {
        if (this.timeline) {
          this.timeline.clearTimeout(this[_finishedDefer].timerID);
        }
        delete this[_finishedDefer];
      }
      this.timeline = null;
    }
  }, {
    key: 'finish',
    value: function finish() {
      if (this.playState !== 'idle') {
        this.timeline.entropy = Infinity;
        if (this[_readyDefer]) {
          this.timeline.clearTimeout(this[_readyDefer].timerID);
          delete this[_readyDefer];
        }
        if (this[_finishedDefer]) {
          this.timeline.clearTimeout(this[_finishedDefer].timerID);
          this[_finishedDefer].resolve();
          delete this[_finishedDefer];
        }
      } else {
        if (this[_readyDefer]) {
          delete this[_readyDefer];
        }
        if (this[_finishedDefer]) {
          this[_finishedDefer].resolve();
          delete this[_finishedDefer];
        }
      }
    }
  }, {
    key: 'applyEffects',
    value: function applyEffects(effects) {
      return (0, _assign2.default)(this[_effects], effects);
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this[_timing].playbackRate;
    },
    set: function set(rate) {
      if (this.timeline && this.playState !== 'paused') {
        this.timeline.playbackRate = rate;
      }
      this[_timing].playbackRate = rate;
    }
  }, {
    key: 'playState',
    get: function get() {
      var timeline = this.timeline,
          _timing3 = this[_timing],
          iterations = _timing3.iterations,
          duration = _timing3.duration,
          endDelay = _timing3.endDelay;


      if (timeline == null) {
        return 'idle';
      }

      if (timeline.playbackRate === 0) {
        return 'paused';
      }

      if (timeline.entropy < 0) {
        // 开始 pending
        return 'pending';
      }

      var ed = timeline.entropy - iterations * duration;
      if (ed > 0 && ed < endDelay) {
        // 结束 pending
        return 'pending';
      }

      if (ed >= endDelay) {
        return 'finished';
      }

      return 'running';
    }
  }, {
    key: 'progress',
    get: function get() {
      var _timing4 = this[_timing],
          duration = _timing4.duration,
          iterations = _timing4.iterations;

      var timeline = this.timeline,
          entropy = timeline ? timeline.entropy : 0,
          playState = this.playState;

      var p = void 0;

      if (playState === 'idle') {
        p = 0;
      } else if (playState === 'paused' && entropy < 0) {
        p = 0;
      } else if (playState === 'pending') {
        if (entropy < 0) {
          p = 0;
        } else {
          // return periodicity(iterations, 1)
          var time = timeline.seekLocalTime(iterations * duration);
          p = (0, _utils.periodicity)(time, duration) / duration;
        }
      } else if (playState === 'running' || playState === 'paused') {
        p = (0, _utils.periodicity)(timeline.currentTime, duration) / duration;
      }

      if (playState === 'finished') {
        p = (0, _utils.periodicity)(iterations, 1);
      }

      return p;
    }
  }, {
    key: 'frame',
    get: function get() {
      var p = this.progress;

      var playState = this.playState,
          initState = this[_initState],
          _timing5 = this[_timing],
          fill = _timing5.fill,
          direction = _timing5.direction,
          duration = _timing5.duration,
          easing = _timing5.easing,
          effect = _timing5.effect;


      if (playState === 'idle') {
        return initState;
      }

      var entropy = this.timeline.entropy,
          keyframes = this[_keyframes].slice(0);

      var inversed = false;

      if (direction === 'reverse') {
        p = 1 - p;
        inversed = true;
      } else if (direction === 'alternate' || direction === 'alternate-reverse') {
        var period = Math.floor(entropy / duration);

        if (p === 1) period--;
        period = Math.max(0, period);

        if (period % 2 ^ direction === 'alternate-reverse') {
          p = 1 - p;
          inversed = true;
        }
      }

      var ret = {};

      if (entropy < 0 && playState === 'pending') {
        if (fill === 'backwards' || fill === 'both') {
          return inversed ? keyframes[keyframes.length - 1] : keyframes[0];
        }
        return initState;
      }

      if (playState === 'pending' || playState === 'finished') {
        if (fill !== 'forwards' && fill !== 'both') {
          return initState;
        }
      }

      var effects = this[_effects];

      p = easing(p, keyframes);

      for (var i = 1; i < keyframes.length; i++) {
        var frame = keyframes[i],
            offset = frame.offset;

        if (offset >= p || i === keyframes.length - 1) {
          var previousFrame = keyframes[i - 1],
              previousOffset = previousFrame.offset;

          if (effect) {
            ret = effect(previousFrame, frame, p, previousOffset, offset);
          } else {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(frame)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref2 = _step.value;

                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);

                var key = _ref3[0];
                var value = _ref3[1];

                if (key !== 'offset') {
                  var _effect = effects[key] || _effect3.default[key] || _effect3.default.default;

                  var v = _effect(previousFrame[key], value, p, previousOffset, offset);

                  if (v != null) {
                    ret[key] = v;
                  }
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
          break;
        }
      }

      return ret;
    }
  }, {
    key: 'baseTimeline',
    set: function set(timeline) {
      this[_timing].timeline = timeline;
    },
    get: function get() {
      return this[_timing].timeline;
    }
  }, {
    key: 'ready',
    get: function get() {
      var _this3 = this;

      if (this[_readyDefer]) {
        return this[_readyDefer].promise;
      }

      if (this.timeline && this.timeline.entropy >= 0) {
        if (this.playState !== 'paused') {
          return _promise2.default.resolve();
        }
        this[_readyDefer] = (0, _utils.defer)();
        return this[_readyDefer].promise;
      }
      this[_readyDefer] = (0, _utils.defer)();

      if (this.timeline) {
        // 已经在 pending 状态
        this[_readyDefer].timerID = this.timeline.setTimeout(function () {
          _this3[_readyDefer].resolve();
          assert(_this3.playState === 'running' || _this3.playState === 'finished', 'An error occured: ' + _this3.playState);
          delete _this3[_readyDefer];
        }, { entropy: -this.timeline.entropy });
      }

      return this[_readyDefer].promise;
    }
  }, {
    key: 'finished',
    get: function get() {
      var _this4 = this;

      if (this.playState === 'finished') {
        return _promise2.default.resolve();
      }
      if (!this[_finishedDefer]) {
        this[_finishedDefer] = (0, _utils.defer)();

        var _timing6 = this[_timing],
            duration = _timing6.duration,
            iterations = _timing6.iterations,
            endDelay = _timing6.endDelay;

        if (this.timeline) {
          this[_finishedDefer].timerID = this.timeline.setTimeout(function () {
            _this4[_finishedDefer].resolve();
          }, { entropy: duration * iterations + endDelay - this.timeline.entropy });
        }
      }

      return this[_finishedDefer].promise;
    }
  }]);
  return Animator;
}();

module.exports = {
  Animator: Animator,
  Easings: _easing2.default,
  Effects: _effect3.default,
  Timeline: _spriteTimeline2.default
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(35);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(92);
var enumBugKeys = __webpack_require__(55);
var IE_PROTO = __webpack_require__(64)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(54)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(85).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(66);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {



/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _eventHandlers = (0, _symbol2.default)('eventHandlers'),
    _collisionState = (0, _symbol2.default)('collisionState');

var BaseNode = function () {
  function BaseNode() {
    (0, _classCallCheck3.default)(this, BaseNode);

    this[_eventHandlers] = {};
  }

  (0, _createClass3.default)(BaseNode, [{
    key: 'on',
    value: function on(type, handler) {
      this[_eventHandlers][type] = this[_eventHandlers][type] || [];
      this[_eventHandlers][type].push(handler);
    }
  }, {
    key: 'off',
    value: function off(type, handler) {
      if (handler && this[_eventHandlers][type]) {
        var idx = this[_eventHandlers][type].indexOf(handler);

        if (idx >= 0) {
          this[_eventHandlers][type].splice(idx, 1);
        }
      } else {
        delete this[_eventHandlers][type];
      }
    }
  }, {
    key: 'getEventHandlers',
    value: function getEventHandlers(type) {
      return this[_eventHandlers][type] || [];
    }
    // d3-friendly

  }, {
    key: 'addEventListener',
    value: function addEventListener(type, handler) {
      return this.on(type, handler);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, handler) {
      return this.off(type, handler);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      throw Error('you mast override this method');
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var _this = this;

      var forceTrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!evt.terminated && (forceTrigger || this.pointCollision(evt))) {
        evt.target = this;
        if (evt.type !== type) {
          if (evt.type) {
            evt.originalType = evt.type;
          }
          evt.type = type;
        }

        var handlers = this[_eventHandlers][type];
        if (handlers) {
          handlers.forEach(function (handler) {
            return handler.call(_this, evt);
          });
        }

        if (type === 'mousemove') {
          if (!this[_collisionState]) {
            var _evt = (0, _assign2.default)({}, evt);
            _evt.type = 'mouseenter';
            _evt.terminated = false;

            this.dispatchEvent('mouseenter', _evt);
          }
          this[_collisionState] = true;
        }
      } else if (type === 'mousemove') {
        if (this[_collisionState]) {
          var _evt2 = (0, _assign2.default)({}, evt);
          _evt2.type = 'mouseleave';
          _evt2.target = this;
          _evt2.terminated = false;

          this.dispatchEvent('mouseleave', _evt2, true);
        }
        this[_collisionState] = false;
      }

      return this[_collisionState];
    }
    // called when layer appendChild

  }, {
    key: 'connect',
    value: function connect(parent) {
      var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.parent) {
        // throw new Error('This node belongs to another parent node! Remove it first...')
        this.disconnect(this.parent);
      }

      Object.defineProperty(this, 'zOrder', {
        value: zOrder,
        writable: false,
        configurable: true
      });

      Object.defineProperty(this, 'parent', {
        get: function get() {
          return parent;
        },
        configurable: true
      });

      var handlers = this[_eventHandlers].append;
      if (handlers && handlers.length) {
        this.dispatchEvent('append', {
          parent: parent,
          zOrder: zOrder
        }, true);
      }

      return this;
    }

    // override to recycling resources

  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      if (!this.parent || parent !== this.parent) {
        throw new Error('Invalid node to disconnect');
      }

      var zOrder = this.zOrder;
      delete this.zOrder;

      var handlers = this[_eventHandlers].remove;
      if (handlers && handlers.length) {
        this.dispatchEvent('remove', {
          parent: parent,
          zOrder: zOrder
        }, true);
      }

      delete this.parent;

      return this;
    }
  }]);
  return BaseNode;
}();

exports.default = BaseNode;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(122);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(35);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(43);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(98);
var hide = __webpack_require__(16);
var has = __webpack_require__(24);
var Iterators = __webpack_require__(28);
var $iterCreate = __webpack_require__(155);
var setToStringTag = __webpack_require__(39);
var getPrototypeOf = __webpack_require__(94);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(46)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(24);
var setDesc = __webpack_require__(10).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(23)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(34);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(37);
var createDesc = __webpack_require__(38);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(67);
var has = __webpack_require__(24);
var IE8_DOM_DEFINE = __webpack_require__(86);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(23);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(16);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(65)('keys');
var uid = __webpack_require__(46);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(43);
var wksExt = __webpack_require__(70);
var defineProperty = __webpack_require__(10).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(42);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(28);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = exports.Matrix = undefined;

var _matrix = __webpack_require__(195);

var _matrix2 = _interopRequireDefault(_matrix);

var _vector = __webpack_require__(196);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Matrix = _matrix2.default;
exports.Vector = _vector2.default;

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var TAU = Math.PI * 2;

var mapToEllipse = function mapToEllipse(_ref, rx, ry, cosphi, sinphi, centerx, centery) {
  var x = _ref.x,
      y = _ref.y;

  x *= rx;
  y *= ry;

  var xp = cosphi * x - sinphi * y;
  var yp = sinphi * x + cosphi * y;

  return {
    x: xp + centerx,
    y: yp + centery
  };
};

var approxUnitArc = function approxUnitArc(ang1, ang2) {
  // See http://spencermortensen.com/articles/bezier-circle/ for the derivation
  // of this constant.
  var c = 0.551915024494;

  var x1 = Math.cos(ang1);
  var y1 = Math.sin(ang1);
  var x2 = Math.cos(ang1 + ang2);
  var y2 = Math.sin(ang1 + ang2);

  return [{
    x: x1 - y1 * c,
    y: y1 + x1 * c
  }, {
    x: x2 + y2 * c,
    y: y2 - x2 * c
  }, {
    x: x2,
    y: y2
  }];
};

var vectorAngle = function vectorAngle(ux, uy, vx, vy) {
  var sign = ux * vy - uy * vx < 0 ? -1 : 1;
  var umag = Math.sqrt(ux * ux + uy * uy);
  var vmag = Math.sqrt(ux * ux + uy * uy);
  var dot = ux * vx + uy * vy;

  var div = dot / (umag * vmag);

  if (div > 1) {
    div = 1;
  }

  if (div < -1) {
    div = -1;
  }

  return sign * Math.acos(div);
};

var getArcCenter = function getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp) {
  var rxsq = Math.pow(rx, 2);
  var rysq = Math.pow(ry, 2);
  var pxpsq = Math.pow(pxp, 2);
  var pypsq = Math.pow(pyp, 2);

  var radicant = rxsq * rysq - rxsq * pypsq - rysq * pxpsq;

  if (radicant < 0) {
    radicant = 0;
  }

  radicant /= rxsq * pypsq + rysq * pxpsq;
  radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);

  var centerxp = radicant * rx / ry * pyp;
  var centeryp = radicant * -ry / rx * pxp;

  var centerx = cosphi * centerxp - sinphi * centeryp + (px + cx) / 2;
  var centery = sinphi * centerxp + cosphi * centeryp + (py + cy) / 2;

  var vx1 = (pxp - centerxp) / rx;
  var vy1 = (pyp - centeryp) / ry;
  var vx2 = (-pxp - centerxp) / rx;
  var vy2 = (-pyp - centeryp) / ry;

  var ang1 = vectorAngle(1, 0, vx1, vy1);
  var ang2 = vectorAngle(vx1, vy1, vx2, vy2);

  if (sweepFlag === 0 && ang2 > 0) {
    ang2 -= TAU;
  }

  if (sweepFlag === 1 && ang2 < 0) {
    ang2 += TAU;
  }

  return [centerx, centery, ang1, ang2];
};

var arcToBezier = function arcToBezier(_ref2) {
  var px = _ref2.px,
      py = _ref2.py,
      cx = _ref2.cx,
      cy = _ref2.cy,
      rx = _ref2.rx,
      ry = _ref2.ry,
      _ref2$xAxisRotation = _ref2.xAxisRotation,
      xAxisRotation = _ref2$xAxisRotation === undefined ? 0 : _ref2$xAxisRotation,
      _ref2$largeArcFlag = _ref2.largeArcFlag,
      largeArcFlag = _ref2$largeArcFlag === undefined ? 0 : _ref2$largeArcFlag,
      _ref2$sweepFlag = _ref2.sweepFlag,
      sweepFlag = _ref2$sweepFlag === undefined ? 0 : _ref2$sweepFlag;

  var curves = [];

  if (rx === 0 || ry === 0) {
    return [];
  }

  var sinphi = Math.sin(xAxisRotation * TAU / 360);
  var cosphi = Math.cos(xAxisRotation * TAU / 360);

  var pxp = cosphi * (px - cx) / 2 + sinphi * (py - cy) / 2;
  var pyp = -sinphi * (px - cx) / 2 + cosphi * (py - cy) / 2;

  if (pxp === 0 && pyp === 0) {
    return [];
  }

  rx = Math.abs(rx);
  ry = Math.abs(ry);

  var lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);

  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  var _getArcCenter = getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp),
      _getArcCenter2 = _slicedToArray(_getArcCenter, 4),
      centerx = _getArcCenter2[0],
      centery = _getArcCenter2[1],
      ang1 = _getArcCenter2[2],
      ang2 = _getArcCenter2[3];

  var segments = Math.max(Math.ceil(Math.abs(ang2) / (TAU / 4)), 1);

  ang2 /= segments;

  for (var i = 0; i < segments; i++) {
    curves.push(approxUnitArc(ang1, ang2));
    ang1 += ang2;
  }

  return curves.map(function (curve) {
    var _mapToEllipse = mapToEllipse(curve[0], rx, ry, cosphi, sinphi, centerx, centery),
        x1 = _mapToEllipse.x,
        y1 = _mapToEllipse.y;

    var _mapToEllipse2 = mapToEllipse(curve[1], rx, ry, cosphi, sinphi, centerx, centery),
        x2 = _mapToEllipse2.x,
        y2 = _mapToEllipse2.y;

    var _mapToEllipse3 = mapToEllipse(curve[2], rx, ry, cosphi, sinphi, centerx, centery),
        x = _mapToEllipse3.x,
        y = _mapToEllipse3.y;

    return { x1: x1, y1: y1, x2: x2, y2: y2, x: x, y: y };
  });
};

/* harmony default export */ __webpack_exports__["default"] = (arcToBezier);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

var _basesprite = __webpack_require__(32);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _children = (0, _symbol2.default)('children'),
    _zOrder = (0, _symbol2.default)('zOrder');

function sortChildren(children) {
  children.sort(function (a, b) {
    var a_zidx = a.attr('zIndex'),
        b_zidx = b.attr('zIndex');
    if (a_zidx === b_zidx) {
      return a.zOrder - b.zOrder;
    }
    return a_zidx - b_zidx;
  });
}

var Group = function (_BaseSprite) {
  (0, _inherits3.default)(Group, _BaseSprite);

  function Group(attr) {
    (0, _classCallCheck3.default)(this, Group);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Group.__proto__ || (0, _getPrototypeOf2.default)(Group)).call(this, attr));

    _this[_children] = [];
    _this[_zOrder] = 0;
    return _this;
  }

  (0, _createClass3.default)(Group, [{
    key: 'appendChild',
    value: function appendChild(sprite) {
      var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this[_children].push(sprite);
      sprite.connect(this, this[_zOrder]++);
      if (sort) sortChildren(this[_children]);
    }
  }, {
    key: 'append',
    value: function append() {
      var _this2 = this;

      for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      sprites.forEach(function (sprite) {
        return _this2.appendChild(sprite, false);
      });
      sortChildren(this[_children]);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(sprite) {
      var idx = this[_children].indexOf(sprite);
      if (idx === -1) {
        return null;
      }
      this[_children].splice(idx, 1);
      sprite.disconnect(this);
      return sprite;
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this3 = this;

      for (var _len2 = arguments.length, sprites = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sprites[_key2] = arguments[_key2];
      }

      if (sprites.length === 0) {
        sprites = this[_children].slice(0);
      }
      sprites.forEach(function (sprite) {
        return _this3.removeChild(sprite);
      });
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var forceTrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!evt.terminated && (forceTrigger || this.pointCollision(evt))) {
        var parentX = evt.offsetX - this.originRect[0];
        var parentY = evt.offsetY - this.originRect[1];
        // console.log(evt.parentX, evt.parentY)

        var _evt = (0, _assign2.default)({}, evt);
        _evt.parentX = parentX;
        _evt.parentY = parentY;

        var targetSprites = [];
        this[_children].forEach(function (sprite) {
          var hit = sprite.dispatchEvent(type, _evt, forceTrigger);
          if (hit) {
            targetSprites.push(sprite);
          }
        });

        evt.targetSprites = targetSprites;
        (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'dispatchEvent', this).call(this, type, evt, forceTrigger);
      }
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var context = (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, drawingContext);

      var children = this[_children];

      /* eslint-disable no-await-in-loop */
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        child.draw(t);
      }
      /* eslint-enable no-await-in-loop */

      return context;
    }
  }, {
    key: 'children',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'contentSize',
    get: function get() {
      var _attr = this.attr('size'),
          _attr2 = (0, _slicedToArray3.default)(_attr, 2),
          width = _attr2[0],
          height = _attr2[1];

      if (width === '' || height === '') {
        var right = void 0,
            bottom = void 0;

        right = 0;
        bottom = 0;
        this[_children].forEach(function (sprite) {
          var renderBox = sprite.renderBox;
          right = Math.max(right, renderBox[2]);
          bottom = Math.max(bottom, renderBox[3]);
        });
        width = right;
        height = bottom;
      }
      return [width, height];
    }
  }]);
  return Group;
}(_basesprite2.default);

exports.default = Group;


(0, _nodetype.registerNodeType)('group', Group, true);

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(214);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106)))

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSvgPath = getSvgPath;
var platform = exports.platform = {
  isBrowser: true
};

function getSvgPath(d) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  return path;
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(128), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(10).f;
var create = __webpack_require__(44);
var redefineAll = __webpack_require__(63);
var ctx = __webpack_require__(14);
var anInstance = __webpack_require__(52);
var forOf = __webpack_require__(36);
var $iterDefine = __webpack_require__(57);
var step = __webpack_require__(91);
var setSpecies = __webpack_require__(101);
var DESCRIPTORS = __webpack_require__(8);
var fastKey = __webpack_require__(58).fastKey;
var validate = __webpack_require__(68);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(42);
var from = __webpack_require__(147);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var $export = __webpack_require__(1);
var meta = __webpack_require__(58);
var fails = __webpack_require__(23);
var hide = __webpack_require__(16);
var redefineAll = __webpack_require__(63);
var forOf = __webpack_require__(36);
var anInstance = __webpack_require__(52);
var isObject = __webpack_require__(9);
var setToStringTag = __webpack_require__(39);
var dP = __webpack_require__(10).f;
var each = __webpack_require__(149)(0);
var DESCRIPTORS = __webpack_require__(8);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(4).document;
module.exports = document && document.documentElement;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(23)(function () {
  return Object.defineProperty(__webpack_require__(54)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(28);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(35);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(11);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(29);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(95);
var hiddenKeys = __webpack_require__(55).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(24);
var toObject = __webpack_require__(30);
var IE_PROTO = __webpack_require__(64)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(24);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(148)(false);
var IE_PROTO = __webpack_require__(64)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var isObject = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(59);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(34);
var ctx = __webpack_require__(14);
var forOf = __webpack_require__(36);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var core = __webpack_require__(0);
var dP = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(8);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(11);
var aFunction = __webpack_require__(34);
var SPECIES = __webpack_require__(3)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var invoke = __webpack_require__(154);
var html = __webpack_require__(85);
var cel = __webpack_require__(54);
var global = __webpack_require__(4);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(35)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _entries = __webpack_require__(26);

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
function nowtime() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  } else if (typeof process !== 'undefined' && process.hrtime) {
    var _process$hrtime = process.hrtime(),
        _process$hrtime2 = (0, _slicedToArray3.default)(_process$hrtime, 2),
        s = _process$hrtime2[0],
        ns = _process$hrtime2[1];

    return s * 1e3 + ns * 1e-6;
  }
  return Date.now ? Date.now() : new Date().getTime();
}
/* eslint-enable no-undef */

var _requestAnimationFrame = void 0;

if (typeof requestAnimationFrame === 'undefined') {
  _requestAnimationFrame = function _requestAnimationFrame(fn) {
    return setTimeout(function () {
      fn(nowtime());
    }, 16);
  };
} else {
  _requestAnimationFrame = requestAnimationFrame;
}

var steps = [];
var timerId = void 0,
    id = 0;

var FastAnimationFrame = {
  requestAnimationFrame: function requestAnimationFrame(step) {
    steps[++id] = step;

    if (timerId == null) {
      timerId = _requestAnimationFrame(function (t) {
        timerId = null;
        (0, _entries2.default)(steps).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
              id = _ref2[0],
              callback = _ref2[1];

          callback(t);
          delete steps[id];
        });
      });
    }
    return id;
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    delete steps[id];
  }
};

module.exports = FastAnimationFrame;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(72)))

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(33);

var _map2 = _interopRequireDefault(_map);

var _promise = __webpack_require__(49);

var _promise2 = _interopRequireDefault(_promise);

exports.defer = defer;
exports.periodicity = periodicity;
exports.getBezierEasing = getBezierEasing;
exports.getStepsEasing = getStepsEasing;
exports.parseEasingStr = parseEasingStr;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defer() {
  var ret = {};
  ret.promise = new _promise2.default(function (resolve, reject) {
    ret.resolve = resolve;
    ret.reject = reject;
  });
  return ret;
}

function periodicity(val, dur) {
  var t = Math.floor(val / dur);
  if (t) {
    val -= t * dur;
    return val || dur; // 周期值，0 的时候是 0，dur 的时候是 1，所以要分 t 是否为 0
  }
  return val;
}

var BezierEasing = __webpack_require__(124);
var bezierFuncCache = new _map2.default();

function getBezierEasing() {
  for (var _len = arguments.length, value = Array(_len), _key = 0; _key < _len; _key++) {
    value[_key] = arguments[_key];
  }

  var easing = bezierFuncCache.get(value);
  if (easing) {
    return easing;
  }
  easing = BezierEasing.apply(undefined, value);
  bezierFuncCache.set(value, easing);
  return easing;
}

function getStepsEasing(step) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';

  return function (p, frames) {
    for (var i = 1; i < frames.length; i++) {
      var offset = frames[i].offset;

      if (p <= offset) {
        var start = frames[i - 1].offset,
            end = offset;
        var fp = (p - start) / (end - start),
            d = 1 / step;

        var t = fp / d;
        if (pos === 'end') {
          t = Math.floor(t);
        } else {
          t = Math.ceil(t);
        }

        return d * t * (end - start) + start;
      }
    }
    return 0;
  };
}

function parseEasingStr(easingStr) {
  var pattern = /^cubic-bezier\((.*)\)/,
      matched = easingStr.match(pattern);

  if (matched) {
    var _value = matched[1].trim();
    _value = _value.split(',').map(function (v) {
      return parseFloat(v.trim());
    });
    return getBezierEasing.apply(undefined, (0, _toConsumableArray3.default)(_value));
  }

  pattern = /^steps\((.*)\)/;
  matched = easingStr.match(pattern);

  if (matched) {
    var _value2 = matched[1].trim();
    _value2 = _value2.split(',').map(function (v) {
      return v.trim();
    });

    var _value3 = _value2,
        _value4 = (0, _slicedToArray3.default)(_value3, 2),
        step = _value4[0],
        pos = _value4[1];

    return getStepsEasing(parseInt(step, 10), pos);
  }
  return easingStr;
}

/***/ }),
/* 106 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(27);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _dec, _desc, _value, _class, _class2, _temp;

var _basesprite = __webpack_require__(32);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _spriteUtils = __webpack_require__(18);

var _gradient = __webpack_require__(40);

var _gradient2 = _interopRequireDefault(_gradient);

var _nodetype = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var parseFont = __webpack_require__(114);

var measureText = function measureText(node, text, font) {
  var lineHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var ctx = node.context;
  if (!ctx) {
    return [0, 0];
  }
  ctx.save();
  ctx.font = font;

  var _ctx$measureText = ctx.measureText(text),
      width = _ctx$measureText.width;

  var height = parseFont(font).size * 1.2;
  ctx.restore();
  return [width, Math.max(height, lineHeight)];
};

function calculTextboxSize(node, text, font, lineHeight) {
  var lines = text.split(/\n/);
  var width = 0,
      height = 0;

  lines.forEach(function (line) {
    var _measureText = measureText(node, line, font, lineHeight),
        _measureText2 = (0, _slicedToArray3.default)(_measureText, 2),
        w = _measureText2[0],
        h = _measureText2[1];

    width = Math.max(width, w);
    height += h;
  });
  if (width === 0 && height === 0) {
    return '';
  }
  return [width, height];
}

var LabelSpriteAttr = (_dec = (0, _spriteUtils.deprecate)('Instead use fillColor.'), (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(LabelSpriteAttr, _BaseSprite$Attr);

  function LabelSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, LabelSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LabelSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(LabelSpriteAttr)).call(this, subject));

    _this.setDefault({
      font: '16px Arial',
      textAlign: 'left',
      strokeColor: '',
      fillColor: '',
      lineHeight: '',
      text: '',
      textboxSize: ''
    }, {
      color: {
        get: function get() {
          return this.fillColor;
        }
      }
    });
    return _this;
  }

  (0, _createClass3.default)(LabelSpriteAttr, [{
    key: 'text',
    set: function set(val) {
      val = String(val);
      this.clearCache();
      this.set('textboxSize', '');
      this.set('text', val);
    }
  }, {
    key: 'textboxSize',
    set: function set(val) {
      this.set('textboxSize', val);
    }
  }, {
    key: 'font',
    set: function set(val) {
      this.clearCache();
      this.set('textboxSize', '');
      this.set('font', val);
    }
  }, {
    key: 'lineHeight',
    set: function set(val) {
      this.clearCache();
      this.set('textboxSize', '');
      this.set('lineHeight', val);
    }
  }, {
    key: 'textAlign',
    set: function set(val) {
      this.clearCache();
      this.set('textAlign', val);
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.fillColor = val;
    }
  }, {
    key: 'strokeColor',
    set: function set(val) {
      this.clearCache();
      this.set('strokeColor', (0, _spriteUtils.parseColorString)(val));
    }
  }, {
    key: 'fillColor',
    set: function set(val) {
      this.clearCache();
      this.set('fillColor', (0, _spriteUtils.parseColorString)(val));
    }
  }]);
  return LabelSpriteAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'text', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'text'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'textboxSize', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textboxSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'font', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'font'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineHeight', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'textAlign', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textAlign'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_spriteUtils.attr, _dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'strokeColor', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'strokeColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fillColor', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fillColor'), _class.prototype)), _class));
var Label = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Label, _BaseSprite);

  function Label(text, attr) {
    (0, _classCallCheck3.default)(this, Label);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Label.__proto__ || (0, _getPrototypeOf2.default)(Label)).call(this, attr));

    _this2.text = String(text);
    return _this2;
  }

  (0, _createClass3.default)(Label, [{
    key: 'render',
    value: function render(t, drawingContext) {
      var _this3 = this;

      var context = (0, _get3.default)(Label.prototype.__proto__ || (0, _getPrototypeOf2.default)(Label.prototype), 'render', this).call(this, t, drawingContext),
          attr = this.attr(),
          text = this.text,
          font = attr.font;

      if (text) {
        context.font = attr.font;
        var lines = this.text.split(/\n/);
        var strokeColor = attr.strokeColor,
            fillColor = attr.fillColor;


        context.textBaseline = 'top';

        var align = attr.textAlign,
            _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
            width = _contentSize[0],
            height = _contentSize[1];


        context.textBaseline = 'middle';

        var _attr = this.attr('border'),
            _attr2 = (0, _slicedToArray3.default)(_attr, 1),
            borderWidth = _attr2[0];

        var gradients = attr.gradients;

        if (gradients && gradients.strokeColor) {
          var rect = gradients.strokeColor.rect || [borderWidth, borderWidth, width, height];

          strokeColor = (0, _gradient2.default)(context, rect, gradients.strokeColor);
        }
        if (strokeColor) {
          context.strokeStyle = strokeColor;
        }

        if (gradients && gradients.fillColor) {
          var _rect = gradients.fillColor.rect || [borderWidth, borderWidth, width, height];

          fillColor = (0, _gradient2.default)(context, _rect, gradients.fillColor);
        }
        if (fillColor) {
          context.fillStyle = fillColor;
        }

        if (!strokeColor && !fillColor) {
          fillColor = (0, _spriteUtils.parseColorString)('black');
        }

        var top = borderWidth;

        lines.forEach(function (line) {
          var left = borderWidth;

          var _measureText3 = measureText(_this3, line, font, attr.lineHeight),
              _measureText4 = (0, _slicedToArray3.default)(_measureText3, 2),
              w = _measureText4[0],
              h = _measureText4[1];

          if (align === 'center') {
            left += (width - w) / 2;
          } else if (align === 'right') {
            left += width - w;
          }

          if (fillColor) {
            context.fillText(line, left, top + h / 2);
          }
          if (strokeColor) {
            context.strokeText(line, left, top + h / 2);
          }

          top += h;
        });
      }

      return context;
    }
  }, {
    key: 'text',
    set: function set(val) {
      this.attr('text', val);
    },
    get: function get() {
      return this.attr('text');
    }

    // override to adapt content size

  }, {
    key: 'contentSize',
    get: function get() {
      var _attr3 = this.attr('size'),
          _attr4 = (0, _slicedToArray3.default)(_attr3, 2),
          width = _attr4[0],
          height = _attr4[1];

      var boxSize = this.attr('textboxSize');

      if (boxSize) {
        return boxSize;
      }
      if (width === '' || height === '') {
        var size = calculTextboxSize(this, this.text, this.attr('font'), this.attr('lineHeight'));
        this.attr('textboxSize', size);
        return size || [0, 0];
      }

      return [width, height];
    }
  }]);
  return Label;
}(_basesprite2.default), _class2.Attr = LabelSpriteAttr, _temp);
exports.default = Label;


(0, _nodetype.registerNodeType)('label', Label);

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _from = __webpack_require__(78);

var _from2 = _interopRequireDefault(_from);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = __webpack_require__(49);

var _promise2 = _interopRequireDefault(_promise);

var _set = __webpack_require__(50);

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

var _basenode = __webpack_require__(48);

var _basenode2 = _interopRequireDefault(_basenode);

var _group = __webpack_require__(75);

var _group2 = _interopRequireDefault(_group);

var _spriteUtils = __webpack_require__(18);

var _spriteAnimator = __webpack_require__(41);

var _fastAnimationFrame = __webpack_require__(104);

var _nodetype = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _children = (0, _symbol2.default)('children'),
    _updateSet = (0, _symbol2.default)('updateSet'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _state = (0, _symbol2.default)('state'),
    _tRecord = (0, _symbol2.default)('tRecord'),
    _timeline = (0, _symbol2.default)('timeline'),
    _renderPromise = (0, _symbol2.default)('renderPromise');

var Layer = function (_BaseNode) {
  (0, _inherits3.default)(Layer, _BaseNode);

  function Layer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        context = _ref.context,
        handleEvent = _ref.handleEvent,
        evaluateFPS = _ref.evaluateFPS,
        renderMode = _ref.renderMode;

    (0, _classCallCheck3.default)(this, Layer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layer.__proto__ || (0, _getPrototypeOf2.default)(Layer)).call(this));

    _this.handleEvent = handleEvent !== false;
    _this.evaluateFPS = !!evaluateFPS;

    // renderMode: repaintAll | repaintDirty
    _this.renderMode = renderMode || 'repaintAll';

    _this.outputContext = context;

    if (context.canvas && context.canvas.cloneNode) {
      var shadowCanvas = context.canvas.cloneNode(true);
      _this.shadowContext = shadowCanvas.getContext('2d');
    }

    _this[_children] = [];
    _this[_updateSet] = new _set2.default();
    _this[_zOrder] = 0;
    _this[_tRecord] = []; // calculate FPS
    _this[_state] = {};
    _this[_timeline] = new _spriteAnimator.Timeline();
    return _this;
  }

  (0, _createClass3.default)(Layer, [{
    key: 'insertBefore',
    value: function insertBefore(newchild, refchild) {
      var idx = this[_children].indexOf(refchild);
      if (idx >= 0) {
        this.removeChild(newchild);
        this[_children].splice(idx, 0, newchild);
        newchild.connect(this, refchild.zOrder);
        this.update(newchild);

        for (var i = idx + 1; i < this[_children].length; i++) {
          var child = this[_children][i],
              zOrder = child.zOrder + 1;

          delete child.zOrder;
          Object.defineProperty(this, 'zOrder', {
            value: zOrder,
            writable: false,
            configurable: true
          });

          this.update(child);
        }

        this[_zOrder]++;
      }

      return newchild;
    }
  }, {
    key: 'prepareRender',
    value: function prepareRender() {
      if (!this[_state].prepareRender) {
        this[_state].prepareRender = true;

        var that = this,
            _dispatchEvent = (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this);

        this[_renderPromise] = new _promise2.default(function (resolve, reject) {
          (0, _fastAnimationFrame.requestAnimationFrame)(function step(t) {
            var renderer = void 0;
            if (that.renderMode === 'repaintDirty') {
              renderer = that.renderRepaintDirty.bind(that);
            } else if (that.renderMode === 'repaintAll') {
              renderer = that.renderRepaintAll.bind(that);
            } else {
              throw new Error('unknown render mode!');
            }

            if (that[_updateSet].size) {
              renderer(t);

              _dispatchEvent.call(that, 'update', { target: that, timeline: that.timeline, currentTime: that.timeline.currentTime }, true);
            }

            if (that[_updateSet].size) {
              (0, _fastAnimationFrame.requestAnimationFrame)(step);
            } else {
              that[_state].prepareRender = false;
              resolve();
            }
          });
        });
        // .catch(ex => console.error(ex.message))
      }

      return this[_renderPromise];
    }
  }, {
    key: 'update',
    value: function update(target) {
      if (target && this[_updateSet].has(target)) return;

      // invisible... return
      if (target && !target.lastRenderBox && !this.isVisible(target)) return;

      if (target) this[_updateSet].add(target);

      this.prepareRender();
    }
  }, {
    key: 'isVisible',
    value: function isVisible(sprite) {
      if (sprite.isVisible) {
        return sprite.isVisible();
      }

      var opacity = sprite.attr('opacity');
      if (opacity <= 0) {
        return false;
      }

      var _sprite$offsetSize = (0, _slicedToArray3.default)(sprite.offsetSize, 2),
          width = _sprite$offsetSize[0],
          height = _sprite$offsetSize[1];

      if (width <= 0 || height <= 0) {
        return false;
      }

      return true;
    }
  }, {
    key: 'sortChildren',
    value: function sortChildren(children) {
      children.sort(function (a, b) {
        var a_zidx = a.attr('zIndex'),
            b_zidx = b.attr('zIndex');
        if (a_zidx === b_zidx) {
          return a.zOrder - b.zOrder;
        }
        return a_zidx - b_zidx;
      });
    }
  }, {
    key: 'drawSprites',
    value: function drawSprites(renderEls, t) {
      if (this.evaluateFPS) {
        this[_tRecord].push(t);
        this[_tRecord] = this[_tRecord].slice(-10);
      }

      for (var i = 0; i < renderEls.length; i++) {
        var child = renderEls[i];
        if (child.parent === this) {
          if (this.isVisible(child)) {
            child.draw(t);
          } else {
            // invisible, only need to remove lastRenderBox
            delete child.lastRenderBox;
          }
        }
      }
    }
  }, {
    key: 'renderRepaintAll',
    value: function renderRepaintAll(t) {
      var _this2 = this;

      var renderEls = this[_children].filter(function (e) {
        return _this2.isVisible(e);
      });
      this.sortChildren(renderEls);

      var outputContext = this.outputContext;
      if (outputContext.canvas) {
        var _outputContext$canvas = outputContext.canvas,
            width = _outputContext$canvas.width,
            height = _outputContext$canvas.height;

        outputContext.clearRect(0, 0, width, height);
      }

      var shadowContext = this.shadowContext;

      if (shadowContext) {
        if (shadowContext.canvas) {
          var _outputContext$canvas2 = outputContext.canvas,
              _width = _outputContext$canvas2.width,
              _height = _outputContext$canvas2.height;

          shadowContext.clearRect(0, 0, _width, _height);
        }
        this.drawSprites(renderEls, t);
        outputContext.drawImage(shadowContext.canvas, 0, 0);
      } else {
        this.drawSprites(renderEls, t);
      }

      this[_updateSet].clear();
    }
  }, {
    key: 'renderRepaintDirty',
    value: function renderRepaintDirty(t) {
      var _this3 = this;

      if (!this.outputContext.canvas) {
        console.warn('Cannot use repaintDirty, fallback to repaintAll!');
        return this.renderRepaintAll(t);
      }
      var _outputContext$canvas3 = this.outputContext.canvas,
          width = _outputContext$canvas3.width,
          height = _outputContext$canvas3.height;


      var updateSet = this[_updateSet];
      var children = this[_children].filter(function (e) {
        return _this3.isVisible(e);
      });
      var restEls = children.filter(function (el) {
        return !updateSet.has(el);
      });
      var affectedSet = new _set2.default(),
          unaffectedSet = new _set2.default();

      var updateEls = (0, _from2.default)(updateSet);

      for (var i = 0; i < restEls.length; i++) {
        var unaffectedEl = restEls[i];
        var affected = false;

        for (var j = 0; j < updateEls.length; j++) {
          var affectedEl = updateEls[j];
          var box1 = affectedEl.renderBox,
              box2 = unaffectedEl.renderBox,
              box3 = affectedEl.lastRenderBox;

          if ((0, _spriteUtils.boxIntersect)(box1, box2) || box3 && (0, _spriteUtils.boxIntersect)(box3, box2)) {
            affected = true;
            break;
          }
        }
        if (affected) affectedSet.add(unaffectedEl);else unaffectedSet.add(unaffectedEl);
      }

      if (affectedSet.size > 0 && unaffectedSet.size > 0) {
        var changed = void 0;
        do {
          changed = false;
          var _affectedEls = (0, _from2.default)(affectedSet),
              unaffectedEls = (0, _from2.default)(unaffectedSet);

          for (var _i = 0; _i < _affectedEls.length; _i++) {
            var _affectedEl = _affectedEls[_i];
            for (var _j = 0; _j < unaffectedEls.length; _j++) {
              var _unaffectedEl = unaffectedEls[_j];
              var _box = _affectedEl.renderBox,
                  _box2 = _unaffectedEl.renderBox;

              if ((0, _spriteUtils.boxIntersect)(_box, _box2)) {
                affectedSet.add(_unaffectedEl);
                unaffectedSet.delete(_unaffectedEl);
                changed = true;
                break;
              }
            }
            if (changed) break;
          }
        } while (changed);
      }

      var shadowContext = this.shadowContext;
      var outputContext = this.outputContext;

      if (shadowContext) {
        shadowContext.save();
        shadowContext.beginPath();
      }
      outputContext.save();
      outputContext.beginPath();

      for (var _i2 = 0; _i2 < updateEls.length; _i2++) {
        var updateEl = updateEls[_i2];
        var box = updateEl.renderBox;

        var dirtyBox = (0, _spriteUtils.boxIntersect)(box, [0, 0, width, height]);

        if (dirtyBox) {
          var dirtyRect = (0, _spriteUtils.boxToRect)(dirtyBox);

          if (shadowContext) shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(dirtyRect));
          outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(dirtyRect));
        }

        var lastRenderBox = updateEl.lastRenderBox;
        if (lastRenderBox && !(0, _spriteUtils.boxEqual)(lastRenderBox, box)) {
          dirtyBox = (0, _spriteUtils.boxIntersect)(lastRenderBox, [0, 0, width, height]);

          if (dirtyBox) {
            var _dirtyRect = (0, _spriteUtils.boxToRect)(dirtyBox);

            if (shadowContext) shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(_dirtyRect));
            outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(_dirtyRect));
          }
        }
      }

      var affectedEls = (0, _from2.default)(affectedSet);
      for (var _i3 = 0; _i3 < affectedEls.length; _i3++) {
        var _affectedEl2 = affectedEls[_i3];
        var _box3 = _affectedEl2.renderBox;
        var _dirtyBox = (0, _spriteUtils.boxIntersect)(_box3, [0, 0, width, height]);

        if (_dirtyBox) {
          var _dirtyRect2 = (0, _spriteUtils.boxToRect)(_dirtyBox);

          if (shadowContext) shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(_dirtyRect2));
          outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(_dirtyRect2));
        }
      }

      if (shadowContext) {
        shadowContext.clip();
        shadowContext.clearRect(0, 0, width, height);
      }

      outputContext.clip();
      outputContext.clearRect(0, 0, width, height);

      var renderEls = [].concat((0, _toConsumableArray3.default)(updateSet), (0, _toConsumableArray3.default)(affectedSet));
      this.sortChildren(renderEls);

      if (shadowContext) {
        this.drawSprites(renderEls, t);
        outputContext.drawImage(shadowContext.canvas, 0, 0);
        shadowContext.restore();
      } else {
        this.drawSprites(renderEls, t);
      }

      outputContext.restore();
      this[_updateSet].clear();
    }
  }, {
    key: 'appendChild',
    value: function appendChild(sprite) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.removeChild(sprite);
      this[_children].push(sprite);
      sprite.connect(this, this[_zOrder]++);
      if (update) this.update(sprite);
      return sprite;
    }
  }, {
    key: 'append',
    value: function append() {
      var _this4 = this;

      for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      sprites.forEach(function (sprite) {
        return _this4.appendChild(sprite);
      });
    }
  }, {
    key: 'removeChild',
    value: function removeChild(sprite) {
      var idx = this[_children].indexOf(sprite);
      if (idx === -1) {
        return null;
      }
      this[_children].splice(idx, 1);
      if (this.isVisible(sprite) || sprite.lastRenderBox) {
        sprite.forceUpdate();
      }
      sprite.disconnect(this);
      return sprite;
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this5 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length === 0) {
        args = this[_children].slice(0);
      }
      return args.map(function (child) {
        return _this5.removeChild(child);
      });
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if (this.outputContext.canvas) {
        var layerX = evt.layerX,
            layerY = evt.layerY;
        var _outputContext$canvas4 = this.outputContext.canvas,
            width = _outputContext$canvas4.width,
            height = _outputContext$canvas4.height;


        if (layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
          return true;
        }
        return false;
      }
      return true;
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      evt.layer = this;
      var sprites = this[_children].slice(0);
      sprites.sort(function (a, b) {
        var a_zidx = a.attr('zIndex'),
            b_zidx = b.attr('zIndex');

        if (a_zidx === b_zidx) {
          return b.zOrder - a.zOrder;
        }
        return b_zidx - a_zidx;
      });

      var targetSprites = [];
      for (var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i];
        var hit = sprite.dispatchEvent(type, evt);
        if (hit) {
          // detect mouseenter/mouseleave
          targetSprites.push(sprite);
        }
      }

      evt.targetSprites = targetSprites;
      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this).call(this, type, evt);
    }
  }, {
    key: 'connect',
    value: function connect(parent, zOrder, zIndex) {
      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'connect', this).call(this, parent, zOrder);
      this.zIndex = zIndex;
      if (parent && parent.container) {
        parent.container.appendChild(this.outputContext.canvas);
      }
      return this;
    }
  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      if (this.canvas && this.canvas.remove) {
        this.canvas.remove();
      }
      return (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'disconnect', this).call(this, parent);
    }
  }, {
    key: 'group',
    value: function group() {
      var group = new _group2.default();
      group.append.apply(group, arguments);
      this.appendChild(group);
      return group;
    }
  }, {
    key: 'adjust',
    value: function adjust(handler) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var outputContext = this.outputContext,
          shadowContext = this.shadowContext;
      if (!shadowContext) {
        throw new Error('No shadowContext.');
      }
      if (outputContext.canvas) {
        var _outputContext$canvas5 = outputContext.canvas,
            width = _outputContext$canvas5.width,
            height = _outputContext$canvas5.height;

        outputContext.clearRect(0, 0, width, height);
      }

      handler.call(this, outputContext);

      if (update) {
        outputContext.drawImage(shadowContext.canvas, 0, 0);
      }
    }
  }, {
    key: 'clearUpdate',
    value: function clearUpdate() {
      this[_updateSet].clear();
    }
  }, {
    key: 'children',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'timeline',
    get: function get() {
      return this[_timeline];
    }
  }, {
    key: 'context',
    get: function get() {
      return this.shadowContext ? this.shadowContext : this.outputContext;
    }
  }, {
    key: 'fps',
    get: function get() {
      if (!this.evaluateFPS) {
        return NaN;
      }
      var sum = 0;
      var tr = this[_tRecord].slice(-10);
      var len = tr.length;

      if (len <= 5) {
        return NaN;
      }
      tr.reduceRight(function (a, b, i) {
        sum += a - b;return b;
      });

      return Math.round(1000 * (len - 1) / sum);
    }
  }]);
  return Layer;
}(_basenode2.default);

exports.default = Layer;


(0, _nodetype.registerNodeType)('layer', Layer, true);

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(27);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _desc, _value, _class, _class2, _temp;

var _basesprite = __webpack_require__(32);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _gradient = __webpack_require__(40);

var _gradient2 = _interopRequireDefault(_gradient);

var _spriteAnimator = __webpack_require__(41);

var _spriteUtils = __webpack_require__(18);

var _svgPathToCanvas = __webpack_require__(206);

var _spritePathEffect = __webpack_require__(197);

var _spritePathEffect2 = _interopRequireDefault(_spritePathEffect);

var _platform = __webpack_require__(77);

var _nodetype = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

_spriteAnimator.Effects.d = _spritePathEffect2.default;

var PathSpriteAttr = (_dec = (0, _spriteUtils.deprecate)('Instead use strokeColor.'), (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(PathSpriteAttr, _BaseSprite$Attr);

  function PathSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, PathSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PathSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(PathSpriteAttr)).call(this, subject));

    _this.setDefault({
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter',
      strokeColor: '',
      fillColor: '',
      // d: path2d,
      boxSize: [0, 0],
      pathRect: [0, 0, 0, 0],
      pathBounds: [0, 0, 0, 0],
      trim: false
    }, {
      color: {
        get: function get() {
          return this.strokeColor;
        }
      }
    });
    return _this;
  }

  (0, _createClass3.default)(PathSpriteAttr, [{
    key: 'd',
    set: function set(val) {
      this.clearCache();
      this.set('d', val);
      var commands = void 0;
      if (val) {
        commands = (0, _svgPathToCanvas.pathToCanvas)(val);
        this.set('pathCommands', commands);
        this.set('pathBounds', (0, _svgPathToCanvas.getBounds)(val));
        this.subject.svg = (0, _platform.getSvgPath)(val);
      } else {
        this.set('pathCommands', null);
        this.set('pathBounds', null);
        this.subject.svg = null;
      }
    }
  }, {
    key: 'lineWidth',
    set: function set(val) {
      this.clearCache();
      this.set('lineWidth', Math.round(val));
    }

    /**
      lineCap: butt|round|square
     */

  }, {
    key: 'lineCap',
    set: function set(val) {
      this.clearCache();
      this.set('lineCap', val);
    }

    /**
      lineJoin: miter|round|bevel
     */

  }, {
    key: 'lineJoin',
    set: function set(val) {
      this.clearCache();
      this.set('lineJoin', val);
    }
  }, {
    key: 'strokeColor',
    set: function set(val) {
      this.clearCache();
      this.set('strokeColor', (0, _spriteUtils.parseColorString)(val));
    }
  }, {
    key: 'fillColor',
    set: function set(val) {
      this.clearCache();
      this.set('fillColor', (0, _spriteUtils.parseColorString)(val));
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.strokeColor = val;
    }
  }, {
    key: 'trim',
    set: function set(val) {
      this.set('trim', val);
    }
  }]);
  return PathSpriteAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'd', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineWidth', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineCap', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineCap'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineJoin', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'strokeColor', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'strokeColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fillColor', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fillColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_spriteUtils.attr, _dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'trim', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'trim'), _class.prototype)), _class));
var Path = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Path, _BaseSprite);

  function Path(attr) {
    (0, _classCallCheck3.default)(this, Path);

    if (typeof attr === 'string') {
      attr = { d: attr };
    }
    return (0, _possibleConstructorReturn3.default)(this, (Path.__proto__ || (0, _getPrototypeOf2.default)(Path)).call(this, attr));
  }

  (0, _createClass3.default)(Path, [{
    key: 'getPointAtLength',
    value: function getPointAtLength(length) {
      if (this.svg) {
        var _svg$getPointAtLength = this.svg.getPointAtLength(length),
            x = _svg$getPointAtLength.x,
            y = _svg$getPointAtLength.y;

        return [x, y];
      }
      return [0, 0];
    }
  }, {
    key: 'getPathLength',
    value: function getPathLength() {
      if (this.svg) {
        return this.svg.getTotalLength();
      }
      return 0;
    }
  }, {
    key: 'findPath',
    value: function findPath(offsetX, offsetY) {
      var context = this.context,
          path = this.path,
          d = this.attr('d');

      if (this.attr('trim')) {
        var _pathOffset = (0, _slicedToArray3.default)(this.pathOffset, 2),
            x = _pathOffset[0],
            y = _pathOffset[1];

        offsetX -= x;
        offsetY -= y;
      }

      if (_platform.platform.isBrowser && path) {
        if (context.isPointInPath(path, offsetX, offsetY)) {
          return [path];
        }
      } else if (!_platform.platform.isBrowser && d) {
        if ((0, _platform.pointInPath)(d, offsetX, offsetY)) {
          return [{ d: d }];
        }
      }
      return [];
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if ((0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'pointCollision', this).call(this, evt)) {
        var offsetX = evt.offsetX,
            offsetY = evt.offsetY;

        evt.targetPaths = this.findPath(offsetX, offsetY);
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var context = (0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'render', this).call(this, t, drawingContext),
          attr = this.attr();

      if (attr.d) {
        var strokeColor = attr.strokeColor,
            fillColor = attr.fillColor;


        context.translate.apply(context, (0, _toConsumableArray3.default)(this.pathOffset));

        var p = null;
        if (_platform.platform.isBrowser) {
          // only browser can use Path2D to create d attr
          p = new Path2D(attr.d);
          this.path = p;
        } else {
          context.save();
          context.beginPath();

          var _attr = this.attr('pathCommands'),
              commands = _attr.commands;

          commands.forEach(function (_ref) {
            var cmd = _ref.cmd,
                args = _ref.args;

            context[cmd].apply(context, (0, _toConsumableArray3.default)(args));
          });
          context.restore();
        }

        context.lineWidth = attr.lineWidth;
        context.lineCap = attr.lineCap;
        context.lineJoin = attr.lineJoin;

        var _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
            width = _contentSize[0],
            height = _contentSize[1],
            _attr$border = (0, _slicedToArray3.default)(attr.border, 1),
            borderWidth = _attr$border[0];

        var gradients = attr.gradients;
        if (gradients && gradients.fillColor) {
          var rect = gradients.fillColor.rect || [borderWidth, borderWidth, width, height];

          fillColor = (0, _gradient2.default)(context, rect, gradients.fillColor);
        }
        if (fillColor) {
          context.fillStyle = fillColor;
        }

        if (gradients && gradients.strokeColor) {
          var _rect = gradients.strokeColor.rect || [borderWidth, borderWidth, width, height];

          strokeColor = (0, _gradient2.default)(context, _rect, gradients.strokeColor);
        }
        if (strokeColor) {
          context.strokeStyle = strokeColor;
        }

        if (!strokeColor && !fillColor) {
          strokeColor = (0, _spriteUtils.parseColorString)('black');
        }

        if (strokeColor) {
          if (p) {
            context.stroke(p);
          } else {
            context.stroke();
          }
        }
        if (fillColor) {
          if (p) {
            context.fill(p);
          } else {
            context.fill();
          }
        }
      }

      return context;
    }
  }, {
    key: 'contentSize',
    get: function get() {
      var _attr2 = this.attr('size'),
          _attr3 = (0, _slicedToArray3.default)(_attr2, 2),
          width = _attr3[0],
          height = _attr3[1];

      var bounds = this.attr('pathBounds');
      var lineWidth = this.attr('lineWidth');

      var _attr4 = this.attr('border'),
          _attr5 = (0, _slicedToArray3.default)(_attr4, 1),
          borderWidth = _attr5[0];

      var padding = this.attr('padding');
      var padLeft = borderWidth + padding[3],
          padTop = borderWidth + padding[0];

      if (width === '') {
        width = bounds[2] + 1.414 * lineWidth | 0;
      }
      if (height === '') {
        height = bounds[3] + 1.414 * lineWidth | 0;
      }
      if (this.attr('trim')) {
        var _pathOffset2 = (0, _slicedToArray3.default)(this.pathOffset, 2),
            x = _pathOffset2[0],
            y = _pathOffset2[1];

        width += x - padLeft;
        height += y - padTop;
      }

      return [width, height];
    }
  }, {
    key: 'pathOffset',
    get: function get() {
      var trim = this.attr('trim'),
          bounds = this.attr('pathBounds');

      var lineWidth = this.attr('lineWidth');

      var _attr6 = this.attr('border'),
          _attr7 = (0, _slicedToArray3.default)(_attr6, 1),
          borderWidth = _attr7[0];

      var padding = this.attr('padding');
      var padLeft = borderWidth + padding[3],
          padTop = borderWidth + padding[0];

      if (trim) {
        return [-bounds[0] + padLeft + lineWidth * 1.414, -bounds[1] + padTop + lineWidth * 1.414];
      }
      return [padLeft, padTop];
    }
  }]);
  return Path;
}(_basesprite2.default), _class2.Attr = PathSpriteAttr, _temp);
exports.default = Path;


(0, _nodetype.registerNodeType)('path', Path);

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = __webpack_require__(80);

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _map = __webpack_require__(33);

var _map2 = _interopRequireDefault(_map);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(27);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class, _class2, _temp;

var _basesprite = __webpack_require__(32);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _filters = __webpack_require__(113);

var _filters2 = _interopRequireDefault(_filters);

var _spriteUtils = __webpack_require__(18);

var _nodetype = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _texturesCache = (0, _symbol2.default)('_texturesCache');
var _images = (0, _symbol2.default)('_images');

var TextureAttr = (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(TextureAttr, _BaseSprite$Attr);

  function TextureAttr(subject) {
    (0, _classCallCheck3.default)(this, TextureAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TextureAttr.__proto__ || (0, _getPrototypeOf2.default)(TextureAttr)).call(this, subject));

    _this.setDefault({
      texturesSize: [0, 0],
      textures: []
    });
    return _this;
  }
  /*
    {
      image: ...,  //texture resource
      srcRect: ..., //texture clip
      rect: ....,  //texture in sprite offset
      filter: ...  //texture filters
    }
   */


  (0, _createClass3.default)(TextureAttr, [{
    key: 'loadTextures',
    value: function loadTextures(textures) {
      var subject = this.subject;

      // adaptive textures
      var width = 0,
          height = 0;

      subject.images = textures.map(function (_ref) {
        var image = _ref.image,
            rect = _ref.rect,
            srcRect = _ref.srcRect;

        var w = void 0,
            h = void 0;
        if (rect) {
          w = rect[2] + rect[0];
          h = rect[3] + rect[1];
        } else if (srcRect) {
          w = srcRect[2];
          h = srcRect[3];
        } else {
          w = image.width;
          h = image.height;
        }
        if (width < w) {
          width = w;
        }
        if (height < h) {
          height = h;
        }
        return image;
      });
      this.set('texturesSize', [width, height]);
    }
  }, {
    key: 'textures',
    set: function set(textures) {
      if (!Array.isArray(textures)) {
        textures = [textures];
      }

      textures = textures.map(function (texture) {
        if (!texture.image) {
          texture = { image: texture };
        }
        return texture;
      });

      this.set('textures', textures);
      this.loadTextures(textures);
    }
  }, {
    key: 'texturesSize',
    get: function get() {
      return this.get('texturesSize');
    }
  }]);
  return TextureAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'textures', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textures'), _class.prototype)), _class);
var Sprite = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Sprite, _BaseSprite);

  /**
    new Sprite({
      attr: {
        ...
      },
      attributeChangedCallback: function(prop, oldValue, newValue){
       }
    })
   */
  function Sprite(attr) {
    (0, _classCallCheck3.default)(this, Sprite);

    if (typeof attr === 'string') {
      attr = { textures: [attr] };
    }

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Sprite.__proto__ || (0, _getPrototypeOf2.default)(Sprite)).call(this));

    _this2[_texturesCache] = new _map2.default();
    if (attr) {
      _this2.attr(attr);
    }
    return _this2;
  }

  (0, _createClass3.default)(Sprite, [{
    key: 'cloneNode',
    value: function cloneNode(copyContent) {
      var node = (0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'cloneNode', this).call(this, copyContent);
      if (copyContent) {
        node.textures = this.textures;
      }
      return node;
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      var _this3 = this;

      if ((0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'pointCollision', this).call(this, evt)) {
        var textures = this.textures;

        if (textures) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;

          evt.targetTextures = [];

          var _attr = this.attr('anchor'),
              _attr2 = (0, _slicedToArray3.default)(_attr, 2),
              anchorX = _attr2[0],
              anchorY = _attr2[1],
              _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
              width = _contentSize[0],
              height = _contentSize[1];

          offsetX += width * anchorX;
          offsetY += height * anchorY;

          textures.forEach(function (texture) {
            var _ref2 = texture.rect || [0, 0].concat((0, _toConsumableArray3.default)(_this3.innerSize)),
                _ref3 = (0, _slicedToArray3.default)(_ref2, 4),
                x = _ref3[0],
                y = _ref3[1],
                w = _ref3[2],
                h = _ref3[3];

            if (offsetX >= x && offsetX - x < w && offsetY >= y && offsetY - y < h) {
              // touched textures
              evt.targetTextures.push(texture);
            }
          });
        }
        return true;
      }
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var _this4 = this;

      var context = (0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'render', this).call(this, t, drawingContext);
      var textures = this.textures;

      if (this.images) {
        var _attr3 = this.attr(),
            borderWidth = _attr3.border[0];

        textures.forEach(function (texture, i) {
          var img = _this4.images[i];
          var rect = (texture.rect || [0, 0].concat((0, _toConsumableArray3.default)(_this4.innerSize))).slice(0);
          var srcRect = texture.srcRect;
          rect[0] += borderWidth;
          rect[1] += borderWidth;

          context.save();

          if (texture.filter) {
            var outterRect = void 0;
            var imgRect = srcRect ? [0, 0, srcRect[2], srcRect[3]] : [0, 0, img.width, img.height];

            if (texture.filter.dropShadow) {
              var dsArr = texture.filter.dropShadow;
              var shadowRect = [dsArr[0] - 2 * dsArr[2], dsArr[1] - 2 * dsArr[2], imgRect[2] + 4 * dsArr[2], imgRect[3] + 4 * dsArr[2]].map(function (val) {
                return Math.round(val);
              });

              outterRect = (0, _spriteUtils.boxToRect)((0, _spriteUtils.boxUnion)((0, _spriteUtils.rectToBox)(shadowRect), (0, _spriteUtils.rectToBox)(imgRect))).map(function (val) {
                return Math.abs(val);
              });
            } else {
              outterRect = imgRect;
            }

            var sx = rect[2] / outterRect[2],
                sy = rect[3] / outterRect[3];

            context.filter = _filters2.default.compile(texture.filter);

            if (srcRect) {
              context.drawImage.apply(context, [img].concat((0, _toConsumableArray3.default)(srcRect), [sx * outterRect[0] + rect[0], sy * outterRect[1] + rect[1], sx * srcRect[2], sy * srcRect[3]]));
            } else {
              context.drawImage(img, sx * outterRect[0] + rect[0], sy * outterRect[1] + rect[1], sx * img.width, sy * img.height);
            }
          } else if (srcRect) {
            context.drawImage.apply(context, [img].concat((0, _toConsumableArray3.default)(srcRect), (0, _toConsumableArray3.default)(rect)));
          } else {
            context.drawImage.apply(context, [img].concat((0, _toConsumableArray3.default)(rect)));
          }

          context.restore();
        });
      }

      return context;
    }
  }, {
    key: 'images',
    set: function set(images) {
      this[_images] = images;
    },
    get: function get() {
      return this[_images];
    }
  }, {
    key: 'textures',
    set: function set(textures) {
      this.attr('textures', textures);
    },
    get: function get() {
      return this.attr('textures');
    }

    // override to adapt textures' size

  }, {
    key: 'contentSize',
    get: function get() {
      var _attr4 = this.attr('size'),
          _attr5 = (0, _slicedToArray3.default)(_attr4, 2),
          width = _attr5[0],
          height = _attr5[1];

      var boxSize = this.attr('texturesSize');

      if (width === '') {
        width = boxSize[0] | 0;
      }
      if (height === '') {
        height = boxSize[1] | 0;
      }

      return [width, height];
    }
  }, {
    key: 'cache',
    set: function set(context) {
      if (context == null) {
        this[_texturesCache].clear();
        return;
      }
      var key = (0, _stringify2.default)(this.textures),
          cacheMap = this[_texturesCache];

      if (!cacheMap.has(key)) {
        cacheMap.set(key, context);
      }
    },
    get: function get() {
      var key = (0, _stringify2.default)(this.textures),
          cacheMap = this[_texturesCache];
      if (cacheMap.has(key)) {
        return cacheMap.get(key);
      }
      return null;
    }
  }]);
  return Sprite;
}(_basesprite2.default), _class2.Attr = TextureAttr, _temp);
exports.default = Sprite;


(0, _nodetype.registerNodeType)('sprite', Sprite);

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(26);

var _entries2 = _interopRequireDefault(_entries);

var _spriteAnimator = __webpack_require__(41);

var _fastAnimationFrame = __webpack_require__(104);

var _spriteMath = __webpack_require__(73);

var _spriteUtils = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultEffect = _spriteAnimator.Effects.default;

function arrayEffect(arr1, arr2, p, start, end) {
  if (Array.isArray(arr1)) {
    return arr1.map(function (o, i) {
      return defaultEffect(o, arr2[i], p, start, end);
    });
  }
  return defaultEffect(arr1, arr2, p, start, end);
}

function transformMatrix(trans) {
  if (Array.isArray(trans)) {
    return trans;
  }
  var transform = new _spriteMath.Matrix();

  (0, _entries2.default)(trans).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (Array.isArray(value)) {
      transform[key].apply(transform, (0, _toConsumableArray3.default)(value));
    } else {
      transform[key](value);
    }
  });

  return transform;
}

function objectEffect(obj1, obj2, p, start, end) {
  var t1 = (0, _assign2.default)({}, obj2, obj1),
      t2 = (0, _assign2.default)({}, obj1, obj2);

  (0, _entries2.default)(t1).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    t1[key] = arrayEffect(value, t2[key], p, start, end);
  });

  return t1;
}

function transformEffect(trans1, trans2, p, start, end) {
  trans1 = (0, _spriteUtils.parseStringTransform)(trans1);
  trans2 = (0, _spriteUtils.parseStringTransform)(trans2);

  if (Array.isArray(trans1) || Array.isArray(trans2)) {
    trans1 = transformMatrix(trans1);
    trans2 = transformMatrix(trans2);
    return arrayEffect(trans1, trans2, p, start, end);
  }
  return objectEffect(trans1, trans2, p, start, end);
}

function colorEffect(color1, color2, p, start, end) {
  color1 = (0, _spriteUtils.parseColor)(color1);
  color2 = (0, _spriteUtils.parseColor)(color2);

  if (color1.model === color2.model) {
    color1.value = arrayEffect(color1.value, color2.value, p, start, end).map(function (c) {
      return Math.round(c);
    });
    return color1;
  }

  return color2;
}

(0, _assign2.default)(_spriteAnimator.Effects, {
  pos: arrayEffect,
  size: arrayEffect,
  transform: transformEffect,
  bgcolor: colorEffect,
  border: function border(v1, v2, p, start, end) {
    return [defaultEffect(v1[0], v2[0], p, start, end), colorEffect(v1[1], v2[1], p, start, end)];
  },

  scale: arrayEffect,
  translate: arrayEffect,
  skew: arrayEffect,
  zIndex: function zIndex(v1, v2, p, start, end) {
    return Math.round(defaultEffect(v1, v2, p, start, end));
  },

  color: colorEffect,
  strokeColor: colorEffect,
  fillColor: colorEffect
});

var _default = function (_Animator) {
  (0, _inherits3.default)(_default, _Animator);

  function _default(sprite, frames, timing) {
    (0, _classCallCheck3.default)(this, _default);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call(this, sprite.attr(), frames, timing));

    _this.target = sprite;
    return _this;
  }

  (0, _createClass3.default)(_default, [{
    key: 'play',
    value: function play() {
      if (!this.target.parent || this.playState === 'running') {
        return;
      }

      (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'play', this).call(this);

      var sprite = this.target,
          layer = sprite.parent;

      if (!layer) {
        throw new Error('no context');
      }

      sprite.attr(this.frame);

      var that = this;
      this.ready.then(function () {
        (0, _fastAnimationFrame.requestAnimationFrame)(function update() {
          if (that.playState === 'idle') return;
          sprite.attr(that.frame);
          if (that.playState === 'running') {
            (0, _fastAnimationFrame.requestAnimationFrame)(update);
          } else if (that.playState === 'paused') {
            that.ready.then(function () {
              (0, _fastAnimationFrame.requestAnimationFrame)(update);
            });
          }
        });
      });
    }

    // 防止异步设置了不该设置的属性

  }, {
    key: 'cancel',
    value: function cancel() {
      (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'cancel', this).call(this);
      this.target.attr(this.frame);
    }
  }, {
    key: 'playState',
    get: function get() {
      if (!this.target.parent) {
        return 'idle';
      }
      return (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'playState', this);
    }
  }]);
  return _default;
}(_spriteAnimator.Animator);

exports.default = _default;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = __webpack_require__(27);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _entries = __webpack_require__(26);

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _stringify = __webpack_require__(80);

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperties = __webpack_require__(119);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _map = __webpack_require__(33);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _desc, _value, _class;

var _spriteMath = __webpack_require__(73);

var _spriteUtils = __webpack_require__(18);

var _platform = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _attr = (0, _symbol2.default)('attr'),
    _temp = (0, _symbol2.default)('store'),
    _subject = (0, _symbol2.default)('subject'),
    _default = (0, _symbol2.default)('default');

var SpriteAttr = (_dec = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringFloat, _spriteUtils.oneOrTwoValues), _dec2 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringInt), _dec3 = (0, _spriteUtils.parseValue)(_spriteUtils.parseColorString), _dec4 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringInt), _dec5 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringInt, _spriteUtils.fourValuesShortCut), _dec6 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringTransform), _dec7 = (0, _spriteUtils.deprecate)('Instead use attr.gradients.'), (_class = function () {
  function SpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, SpriteAttr);

    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this.setDefault({
      anchor: [0, 0],
      x: 0,
      y: 0,
      opacity: 1,
      width: '',
      height: '',
      bgcolor: '',
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      transform: 'matrix(1,0,0,1,0,0)',
      transformMatrix: [1, 0, 0, 1, 0, 0],
      border: [0, 'rgba(0,0,0,0)'],
      borderRadius: 0,
      padding: [0, 0, 0, 0],
      zIndex: 0,
      offsetRotate: 'auto',
      linearGradients: {},
      offsetDistance: 0
    }, {
      pos: {
        get: function get() {
          return [this.x, this.y];
        }
      },
      size: {
        get: function get() {
          return [this.width, this.height];
        }
      },
      linearGradients: {
        get: function get() {
          return this.gradients;
        }
      }
    });
    this[_temp] = new _map2.default(); // save non-serialized values
  }

  (0, _createClass3.default)(SpriteAttr, [{
    key: 'setDefault',
    value: function setDefault(attrs) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _assign2.default)(this[_default], attrs);
      (0, _assign2.default)(this[_attr], attrs);
      (0, _defineProperties2.default)(this[_attr], props);
    }
  }, {
    key: 'getAttrState',
    value: function getAttrState() {
      return this[_attr];
    }
  }, {
    key: 'saveObj',
    value: function saveObj(key, val) {
      this[_temp].set(key, val);
    }
  }, {
    key: 'loadObj',
    value: function loadObj(key) {
      return this[_temp].get(key);
    }
  }, {
    key: 'quietSet',
    value: function quietSet(key, val) {
      this[_attr][key] = val;
    }
  }, {
    key: 'set',
    value: function set(key, val) {
      if (val == null) {
        val = this[_default][key];
      }
      this[_attr][key] = val;
      this.forceUpdate();
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this[_attr][key];
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      if (this.subject) {
        this.subject.cache = null;
      }
      return this;
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate(clearCache) {
      if (this.subject) {
        this.subject.forceUpdate(clearCache);
      }
      return this;
    }
  }, {
    key: 'merge',
    value: function merge(attrs) {
      if (typeof attrs === 'string') {
        attrs = JSON.parse(attrs);
      }

      (0, _assign2.default)(this[_attr], attrs);

      return this;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return (0, _stringify2.default)(this[_attr]);
    }
  }, {
    key: 'resetOffset',
    value: function resetOffset() {
      var offsetPath = this.get('offsetPath');
      var dis = this.offsetDistance;

      if (offsetPath) {
        var pathObj = this.loadObj('offsetPath');
        if (pathObj) {
          offsetPath = pathObj;
        } else {
          offsetPath = (0, _platform.getSvgPath)(offsetPath);
          this.saveObj('offsetPath', offsetPath);
        }
      }

      if (offsetPath != null) {
        var len = dis * offsetPath.getTotalLength(),
            _offsetPath$getPointA = offsetPath.getPointAtLength(len),
            x = _offsetPath$getPointA.x,
            y = _offsetPath$getPointA.y;


        var angle = this.offsetRotate;
        if (angle === 'auto' || angle === 'reverse') {
          var delta = offsetPath.getPointAtLength(angle === 'auto' ? len + 1 : len - 1);
          var x1 = delta.x,
              y1 = delta.y;

          if (x1 === x && y1 === y) {
            // last point
            angle = this.get('offsetAngle');
          } else {
            angle = 180 * Math.atan2(y1 - y, x1 - x) / Math.PI;
          }

          if (this.offsetRotate === 'reverse') {
            angle = -angle;
          }
        }

        var offsetAngle = this.get('offsetAngle');

        if (offsetAngle) {
          this.rotate -= offsetAngle;
        }

        this.set('offsetAngle', angle);
        this.rotate += angle;

        var offsetPoint = this.get('offsetPoint');
        if (offsetPoint) {
          this.pos = [this.x - offsetPoint[0], this.y - offsetPoint[1]];
        }

        this.set('offsetPoint', [x, y]);
        this.pos = [this.x + x, this.y + y];
      }
    }
  }, {
    key: 'attrs',
    get: function get() {
      return this[_attr];
    }
  }, {
    key: 'subject',
    get: function get() {
      return this[_subject];
    }

    /* ------------------- define attributes ----------------------- */

  }, {
    key: 'id',
    set: function set(val) {
      return this.quietSet('id', String(val));
    }
  }, {
    key: 'name',
    set: function set(val) {
      return this.quietSet('name', String(val));
    }
  }, {
    key: 'anchor',
    set: function set(val) {
      this.set('anchor', val);
    }
  }, {
    key: 'x',
    set: function set(val) {
      this.set('x', Math.round(val));
    }
  }, {
    key: 'y',
    set: function set(val) {
      this.set('y', Math.round(val));
    }
  }, {
    key: 'pos',
    set: function set(val) {
      if (val == null) {
        val = [0, 0];
      }

      var _val = val,
          _val2 = (0, _slicedToArray3.default)(_val, 2),
          x = _val2[0],
          y = _val2[1];

      this.x = x;
      this.y = y;
    }
  }, {
    key: 'bgcolor',
    set: function set(val) {
      this.clearCache();
      this.set('bgcolor', val);
    }
  }, {
    key: 'opacity',
    set: function set(val) {
      this.set('opacity', val);
    }
  }, {
    key: 'width',
    set: function set(val) {
      this.clearCache();
      this.set('width', Math.round(val));
    }
  }, {
    key: 'height',
    set: function set(val) {
      this.clearCache();
      this.set('height', Math.round(val));
    }
  }, {
    key: 'size',
    set: function set(val) {
      if (val == null) {
        val = ['', ''];
      }

      var _val3 = val,
          _val4 = (0, _slicedToArray3.default)(_val3, 2),
          width = _val4[0],
          height = _val4[1];

      this.width = width;
      this.height = height;
    }
  }, {
    key: 'border',
    set: function set(val) {
      this.clearCache();

      var _val5 = (0, _slicedToArray3.default)(val, 2),
          width = _val5[0],
          color = _val5[1];

      this.set('border', [width, (0, _spriteUtils.parseColorString)(color)]);
    }
  }, {
    key: 'padding',
    set: function set(val) {
      this.clearCache();
      this.set('padding', val);
    }
  }, {
    key: 'borderRadius',
    set: function set(val) {
      this.clearCache();
      this.set('borderRadius', val);
    }

    // transform attributes

  }, {
    key: 'transform',
    set: function set(val) {
      var _this = this;

      /*
        rotate: 0,
        scale: [1, 1],
        translate: [0, 0],
        skew: [0, 0],
        matrix: [1,0,0,1,0,0],
       */
      this.merge({
        rotate: 0,
        scale: [1, 1],
        translate: [0, 0],
        skew: [0, 0]
      });

      if (Array.isArray(val)) {
        this.set('transformMatrix', val);
        this.set('transform', 'matrix(' + val + ')');
      } else {
        this.set('transformMatrix', [1, 0, 0, 1, 0, 0]);
        var transformStr = [];

        (0, _entries2.default)(val).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          if (key === 'matrix' && Array.isArray(value)) {
            _this.set('transformMatrix', new _spriteMath.Matrix(value).m);
          } else {
            _this[key] = value;
          }
          transformStr.push(key + '(' + value + ')');
        });

        this.set('transform', transformStr.join(' '));
      }
    }
  }, {
    key: 'rotate',
    set: function set(val) {
      var delta = this.get('rotate') - val;
      this.set('rotate', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix')).rotate(-delta);
      this.set('transformMatrix', transform.m);
    }
  }, {
    key: 'scale',
    set: function set(val) {
      val = (0, _spriteUtils.oneOrTwoValues)(val);
      var oldVal = this.get('scale');
      var delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
      this.set('scale', val);

      var offsetAngle = this.get('offsetAngle');
      if (offsetAngle) {
        this.rotate -= offsetAngle;
      }

      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));
      transform.scale.apply(transform, delta);
      this.set('transformMatrix', transform.m);

      if (offsetAngle) {
        this.rotate += offsetAngle;
      }
    }
  }, {
    key: 'translate',
    set: function set(val) {
      var oldVal = this.get('translate');
      var delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
      this.set('translate', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));
      transform.translate.apply(transform, delta);
      this.set('transformMatrix', transform.m);
    }
  }, {
    key: 'skew',
    set: function set(val) {
      var _ref3, _transform$multiply;

      var oldVal = this.get('skew');
      var invm = (_ref3 = new _spriteMath.Matrix()).skew.apply(_ref3, (0, _toConsumableArray3.default)(oldVal)).inverse();
      this.set('skew', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));
      (_transform$multiply = transform.multiply(invm)).skew.apply(_transform$multiply, (0, _toConsumableArray3.default)(val));
      this.set('transformMatrix', transform.m);
    }
  }, {
    key: 'zIndex',
    set: function set(val) {
      this.set('zIndex', val);
    }

    /**
      linearGradients : {
        bgcolor: {
          direction: 30,  //angle，[0,360)
          rect: [x, y, w, h],
          vector: [x1, y1, x2, y2], // direction/rect or from/to
          colors: [
            {offset: 0, color: 'red'},
            {offset: 1, color: 'black'}
          ]
        }
      }
     */

  }, {
    key: 'linearGradients',
    set: function set(val) {
      this.gradients = val;
    }

    /**
      gradients : {
        bgcolor: {
          direction: 30,  //angle，[0,360)
          rect: [x, y, w, h],  // rect + direction or vector
          vector: [x1, y1, r1, x2, y2, r2], // vector.length -> linear or radial
          colors: [
            {offset: 0, color: 'red'},
            {offset: 1, color: 'black'}
          ]
        }
      }
     */

  }, {
    key: 'gradients',
    set: function set(val) {
      this.clearCache();
      this.set('gradients', val);
    }
  }, {
    key: 'offsetPath',
    set: function set(val) {
      var offsetPath = (0, _platform.getSvgPath)(val);

      this.set('offsetPath', offsetPath.getAttribute('d'));
      this.saveObj('offsetPath', offsetPath);
      this.resetOffset();
    }
  }, {
    key: 'offsetDistance',
    set: function set(val) {
      this.set('offsetDistance', val);
      this.resetOffset();
    }
  }, {
    key: 'offsetRotate',
    set: function set(val) {
      this.set('offsetRotate', val);
      this.resetOffset();
    }
  }]);
  return SpriteAttr;
}(), (_applyDecoratedDescriptor(_class.prototype, 'id', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'id'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'name', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'name'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'anchor', [_spriteUtils.attr, _dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'anchor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'x', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'x'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'y', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'y'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pos', [_spriteUtils.attr, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'pos'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'bgcolor', [_spriteUtils.attr, _dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'bgcolor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'opacity', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'opacity'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'width', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'width'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'height', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'height'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'size', [_spriteUtils.attr, _dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'size'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'border', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'border'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'padding', [_spriteUtils.attr, _dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'padding'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'borderRadius', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'borderRadius'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'transform', [_spriteUtils.attr, _dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'transform'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rotate', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rotate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'scale', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'scale'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'translate', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'translate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'skew', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'skew'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'zIndex', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'zIndex'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'linearGradients', [_spriteUtils.attr, _dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'linearGradients'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'gradients', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'gradients'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetPath', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetPath'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetDistance', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetDistance'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetRotate', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetRotate'), _class.prototype)), _class));
exports.default = SpriteAttr;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entries = __webpack_require__(26);

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _spriteUtils = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  blur: function blur(px) {
    return 'blur(' + (0, _spriteUtils.appendUnit)(px) + ')';
  },
  brightness: function brightness(percent) {
    return 'brightness(' + percent + ')';
  },
  contrast: function contrast(percent) {
    return 'contrast(' + percent + ')';
  },
  dropShadow: function dropShadow(_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 4),
        offsetX = _ref2[0],
        offsetY = _ref2[1],
        shadowRadius = _ref2[2],
        color = _ref2[3];

    return 'drop-shadow(' + (0, _spriteUtils.appendUnit)(offsetX) + ' ' + (0, _spriteUtils.appendUnit)(offsetY) + ' ' + (0, _spriteUtils.appendUnit)(shadowRadius) + ' ' + color + ')';
  },
  grayscale: function grayscale(percent) {
    return 'grayscale(' + percent + ')';
  },
  hueRotate: function hueRotate(value) {
    return 'hue-rotate(' + (0, _spriteUtils.appendUnit)(value, 'deg') + ')';
  },
  invert: function invert(percent) {
    return 'invert(' + percent + ')';
  },
  opacity: function opacity(percent) {
    return 'opacity(' + percent + ')';
  },
  saturate: function saturate(percent) {
    return 'saturate(' + percent + ')';
  },
  sepia: function sepia(percent) {
    return 'sepia(' + percent + ')';
  },
  url: function url(path) {
    return 'url(' + path + ')';
  },
  compile: function compile() {
    var _this = this;

    var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _entries2.default)(filter).reduce(function (accumulator, curVal) {
      return accumulator.concat(_this[curVal[0]](curVal[1]));
    }, []).join(' ');
  }
}; // http://www.runoob.com/cssref/css3-pr-filter.html

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */

// borrow from node-canvas (https://github.com/Automattic/node-canvas)

/**
 * Font RegExp helpers.
 */

var weights = 'bold|bolder|lighter|[1-9]00',
    styles = 'italic|oblique',
    variants = 'small-caps',
    stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded',
    units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q',
    string = '\'([^\']+)\'|"([^"]+)"|[\\w-]+';

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
var weightRe = new RegExp('(' + weights + ') +', 'i');
var styleRe = new RegExp('(' + styles + ') +', 'i');
var variantRe = new RegExp('(' + variants + ') +', 'i');
var stretchRe = new RegExp('(' + stretches + ') +', 'i');
var sizeFamilyRe = new RegExp('([\\d\\.]+)(' + units + ') *' + '((?:' + string + ')( *, *(?:' + string + '))*)');

/**
 * Cache font parsing.
 */

var cache = {};

var defaultHeight = 16; // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = function (str) {
  // Cached
  if (cache[str]) return cache[str];

  // Try for required properties first.
  var sizeFamily = sizeFamilyRe.exec(str);
  if (!sizeFamily) return; // invalid

  // Default values and required properties
  var font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')

    // Optional, unordered properties.
  };var weight = void 0,
      style = void 0,
      variant = void 0,
      stretch = void 0;
  // Stop search at `sizeFamily.index`
  var substr = str.substring(0, sizeFamily.index);
  if (weight = weightRe.exec(substr)) font.weight = weight[1];
  if (style = styleRe.exec(substr)) font.style = style[1];
  if (variant = variantRe.exec(substr)) font.variant = variant[1];
  if (stretch = stretchRe.exec(substr)) font.stretch = stretch[1];

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75;
      break;
    case 'pc':
      font.size *= 16;
      break;
    case 'in':
      font.size *= 96;
      break;
    case 'cm':
      font.size *= 96.0 / 2.54;
      break;
    case 'mm':
      font.size *= 96.0 / 25.4;
      break;
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break;
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75;
      break;
    case 'q':
      font.size *= 96 / 25.4 / 4;
      break;
  }

  return cache[str] = font;
};

/* eslint-enable */

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNode = exports.registerNodeType = exports.Effects = exports.Group = exports.Layer = exports.Path = exports.Label = exports.Sprite = exports.BaseSprite = exports.BaseNode = exports.createGradients = undefined;

var _basesprite = __webpack_require__(32);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _sprite = __webpack_require__(110);

var _sprite2 = _interopRequireDefault(_sprite);

var _label = __webpack_require__(107);

var _label2 = _interopRequireDefault(_label);

var _layer = __webpack_require__(108);

var _layer2 = _interopRequireDefault(_layer);

var _group = __webpack_require__(75);

var _group2 = _interopRequireDefault(_group);

var _basenode = __webpack_require__(48);

var _basenode2 = _interopRequireDefault(_basenode);

var _path = __webpack_require__(109);

var _path2 = _interopRequireDefault(_path);

var _gradient = __webpack_require__(40);

var _gradient2 = _interopRequireDefault(_gradient);

var _spriteAnimator = __webpack_require__(41);

var _nodetype = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createGradients = _gradient2.default;
exports.BaseNode = _basenode2.default;
exports.BaseSprite = _basesprite2.default;
exports.Sprite = _sprite2.default;
exports.Label = _label2.default;
exports.Path = _path2.default;
exports.Layer = _layer2.default;
exports.Group = _group2.default;
exports.Effects = _spriteAnimator.Effects;
exports.registerNodeType = _nodetype.registerNodeType;
exports.createNode = _nodetype.createNode;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(129), __esModule: true };

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(81);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 124 */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  if (mX1 !== mY1 || mX2 !== mY2) {
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    if (mX1 === mY1 && mX2 === mY2) {
      return x; // linear
    }
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(125);
var swizzle = __webpack_require__(192);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
__webpack_require__(165);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(25);
module.exports = __webpack_require__(163);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(25);
module.exports = __webpack_require__(164);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(25);
__webpack_require__(31);
__webpack_require__(167);
__webpack_require__(182);
__webpack_require__(181);
__webpack_require__(180);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(168);
module.exports = __webpack_require__(0).Number.isNaN;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(169);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(170);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(171);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(172);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(183);
module.exports = __webpack_require__(0).Object.entries;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(173);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(174);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(175);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(176);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(25);
__webpack_require__(31);
__webpack_require__(177);
__webpack_require__(184);
__webpack_require__(185);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(25);
__webpack_require__(31);
__webpack_require__(178);
__webpack_require__(188);
__webpack_require__(187);
__webpack_require__(186);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(179);
__webpack_require__(47);
__webpack_require__(189);
__webpack_require__(190);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
__webpack_require__(31);
module.exports = __webpack_require__(70).f('iterator');


/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(36);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(45);
var toAbsoluteIndex = __webpack_require__(162);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(14);
var IObject = __webpack_require__(56);
var toObject = __webpack_require__(30);
var toLength = __webpack_require__(45);
var asc = __webpack_require__(151);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var isArray = __webpack_require__(88);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(150);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(10);
var createDesc = __webpack_require__(38);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(29);
var gOPS = __webpack_require__(61);
var pIE = __webpack_require__(37);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 154 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(44);
var descriptor = __webpack_require__(38);
var setToStringTag = __webpack_require__(39);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(16)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var macrotask = __webpack_require__(103).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(35)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(29);
var gOPS = __webpack_require__(61);
var pIE = __webpack_require__(37);
var toObject = __webpack_require__(30);
var IObject = __webpack_require__(56);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(23)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(93).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(29);
var toIObject = __webpack_require__(17);
var isEnum = __webpack_require__(37).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(9);
var anObject = __webpack_require__(11);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(14)(Function.call, __webpack_require__(60).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(66);
var defined = __webpack_require__(53);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(66);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var get = __webpack_require__(71);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(42);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(28);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(14);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(30);
var call = __webpack_require__(89);
var isArrayIter = __webpack_require__(87);
var toLength = __webpack_require__(45);
var createProperty = __webpack_require__(152);
var getIterFn = __webpack_require__(71);

$export($export.S + $export.F * !__webpack_require__(90)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(146);
var step = __webpack_require__(91);
var Iterators = __webpack_require__(28);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(57)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(82);
var validate = __webpack_require__(68);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(84)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(1);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(157) });


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(44) });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperties: __webpack_require__(92) });


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(10).f });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(17);
var $getOwnPropertyDescriptor = __webpack_require__(60).f;

__webpack_require__(62)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(30);
var $getPrototypeOf = __webpack_require__(94);

__webpack_require__(62)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(30);
var $keys = __webpack_require__(29);

__webpack_require__(62)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(160).set });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(43);
var global = __webpack_require__(4);
var ctx = __webpack_require__(14);
var classof = __webpack_require__(42);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(9);
var aFunction = __webpack_require__(34);
var anInstance = __webpack_require__(52);
var forOf = __webpack_require__(36);
var speciesConstructor = __webpack_require__(102);
var task = __webpack_require__(103).set;
var microtask = __webpack_require__(156)();
var newPromiseCapabilityModule = __webpack_require__(59);
var perform = __webpack_require__(96);
var promiseResolve = __webpack_require__(97);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(63)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(39)($Promise, PROMISE);
__webpack_require__(101)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(90)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(82);
var validate = __webpack_require__(68);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(84)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(4);
var has = __webpack_require__(24);
var DESCRIPTORS = __webpack_require__(8);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(98);
var META = __webpack_require__(58).KEY;
var $fails = __webpack_require__(23);
var shared = __webpack_require__(65);
var setToStringTag = __webpack_require__(39);
var uid = __webpack_require__(46);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(70);
var wksDefine = __webpack_require__(69);
var enumKeys = __webpack_require__(153);
var isArray = __webpack_require__(88);
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(67);
var createDesc = __webpack_require__(38);
var _create = __webpack_require__(44);
var gOPNExt = __webpack_require__(158);
var $GOPD = __webpack_require__(60);
var $DP = __webpack_require__(10);
var $keys = __webpack_require__(29);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(93).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(37).f = $propertyIsEnumerable;
  __webpack_require__(61).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(43)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(99)('Map');


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(100)('Map');


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(83)('Map') });


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $entries = __webpack_require__(159)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(4);
var speciesConstructor = __webpack_require__(102);
var promiseResolve = __webpack_require__(97);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(59);
var perform = __webpack_require__(96);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(99)('Set');


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(100)('Set');


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(83)('Set') });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69)('asyncIterator');


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69)('observable');


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(191);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(105);

exports.default = {
  linear: function linear(p) {
    return p;
  },

  ease: (0, _utils.getBezierEasing)(0.25, 0.1, 0.25, 1),
  'ease-in': (0, _utils.getBezierEasing)(0.42, 0, 1, 1),
  'ease-out': (0, _utils.getBezierEasing)(0, 0, 0.58, 1),
  'ease-in-out': (0, _utils.getBezierEasing)(0.42, 0, 0.58, 1),
  // 'step-start': function(p, frames){
  //   let ret = 0
  //   for(let i = 0; i < frames.length; i++){
  //     const {offset} = frames[i]
  //     ret = offset
  //     if(p < offset){
  //       break
  //     }
  //   }
  //   return ret
  // },
  // 'step-end': function(p, frames){
  //   let ret = 0
  //   for(let i = 0; i < frames.length; i++){
  //     const {offset} = frames[i]
  //     if(p < offset){
  //       break
  //     }
  //     ret = offset
  //   }
  //   return ret
  // }
  'step-start': (0, _utils.getStepsEasing)(1, 'start'),
  'step-end': (0, _utils.getStepsEasing)(1, 'end')
};

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // s - startFrame, e - endFrame
  default: function _default(from, to, p, s, e) {
    if (typeof from === 'number' && typeof to === 'number') {
      return from + (p - s) / (e - s) * (to - from);
    }

    if (p - s > e - p) {
      return to;
    }
    return from;
  }
};

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// from https://github.com/chrisaljoudi/transformatrix.js
/**
  default:
          (1, 0, 0)
          (0, 1, 0)
 */
var Matrix = function Matrix(m) {
  m = m || [1, 0, 0, 1, 0, 0];
  this.m = m.slice(0);
};

Matrix.prototype.unit = function () {
  this.m = [1, 0, 0, 1, 0, 0];
  return this;
};

Matrix.prototype.multiply = function (m) {
  var m1 = this.m;
  var m2 = void 0;

  if (m instanceof Matrix) {
    m2 = m.m;
  } else {
    m2 = m;
  }

  var m11 = m1[0] * m2[0] + m1[2] * m2[1],
      m12 = m1[1] * m2[0] + m1[3] * m2[1],
      m21 = m1[0] * m2[2] + m1[2] * m2[3],
      m22 = m1[1] * m2[2] + m1[3] * m2[3];

  var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
      dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];

  m1[0] = m11;
  m1[1] = m12;
  m1[2] = m21;
  m1[3] = m22;
  m1[4] = dx;
  m1[5] = dy;

  return this;
};

Matrix.prototype.inverse = function () {
  var inv = new Matrix(this.m),
      invm = inv.m;

  var d = 1 / (invm[0] * invm[3] - invm[1] * invm[2]),
      m0 = invm[3] * d,
      m1 = -invm[1] * d,
      m2 = -invm[2] * d,
      m3 = invm[0] * d,
      m4 = d * (invm[2] * invm[5] - invm[3] * invm[4]),
      m5 = d * (invm[1] * invm[4] - invm[0] * invm[5]);

  invm[0] = m0;
  invm[1] = m1;
  invm[2] = m2;
  invm[3] = m3;
  invm[4] = m4;
  invm[5] = m5;

  return inv;
};

/**
  (1, 0, sx)
  (0, 1, sy)
 * */
Matrix.prototype.translate = function (x, y) {
  return this.multiply([1, 0, 0, 1, x, y]);
};

/**
    (cos, -sin, 0)
    (sin, cos, 0)
 */
Matrix.prototype.rotate = function (deg) {
  var rad = deg * Math.PI / 180,
      c = Math.cos(rad),
      s = Math.sin(rad);

  return this.multiply([c, s, -s, c, 0, 0]);
};

/**
    (1, tx, 0)
    (ty, 1, 0)
 */
Matrix.prototype.skew = function (degX, degY) {
  degY |= 0;
  var radX = degX * Math.PI / 180,
      radY = degY * Math.PI / 180;
  var tx = Math.tan(radX),
      ty = Math.tan(radY);

  return this.multiply([1, ty, tx, 1, 0, 0]);
};

/**
  (sx, 0, 0)
  (0, sy, 0)
 */
Matrix.prototype.scale = function (sx, sy) {
  return this.multiply([sx, 0, 0, sy, 0, 0]);
};

Matrix.prototype.transformPoint = function (px, py) {
  var x = px,
      y = py;
  px = x * this.m[0] + y * this.m[2] + this.m[4];
  py = x * this.m[1] + y * this.m[3] + this.m[5];

  return [px, py];
};

Matrix.prototype.transformVector = function (px, py) {
  var x = px,
      y = py;
  px = x * this.m[0] + y * this.m[2];
  py = x * this.m[1] + y * this.m[3];

  return [px, py];
};

exports.default = Matrix;

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vector = function () {
  function Vector(p1) {
    var p2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];
    (0, _classCallCheck3.default)(this, Vector);

    var _p = (0, _slicedToArray3.default)(p1, 3),
        x1 = _p[0],
        y1 = _p[1],
        z1 = _p[2],
        _p2 = (0, _slicedToArray3.default)(p2, 3),
        x2 = _p2[0],
        y2 = _p2[1],
        z2 = _p2[2];

    z1 = z1 || 0;
    z2 = z2 || 0;

    this.x = x1 - x2;
    this.y = y1 - y2;
    this.z = z1 - z2;
  }

  (0, _createClass3.default)(Vector, [{
    key: "unit",
    value: function unit() {
      var length = this.length;
      return new Vector([this.x / length, this.y / length, this.z / length]);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      var x1 = this.x,
          y1 = this.y,
          z1 = this.z,
          x2 = v.x,
          y2 = v.y,
          z2 = v.z;

      return new Vector([y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - x2 * y1]);
    }
  }, {
    key: "length",
    get: function get() {
      var x = this.x,
          y = this.y,
          z = this.z;

      return Math.sqrt(x * x + y * y + z * z);
    }
  }]);
  return Vector;
}();

exports.default = Vector;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = function (pathA, pathB, p, s, e) {
  var ep = (p - s) / (e - s);
  if (ep <= 0) return pathA;
  if (ep >= 1) return pathB;
  return lerp(pathA, pathB, ep);
};

var _path2shapes = __webpack_require__(199);

var _path2shapes2 = _interopRequireDefault(_path2shapes);

var _sort = __webpack_require__(200);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/AlloyTeam/pasition

function _subShapes(shapes, count) {
  var _loop = function _loop(i) {
    var shape = shapes[shapes.length - 1];
    var newShape = [];
    var x = shape[0][0],
        y = shape[0][1];
    shape.forEach(function () {
      newShape.push([x, y, x, y, x, y, x, y]);
    });

    shapes.push(newShape);
  };

  for (var i = 0; i < count; i++) {
    _loop(i);
  }
}

function _upShapes(shapes, count) {
  var _loop2 = function _loop2(i) {
    var shape = shapes[shapes.length - 1];
    var newShape = [];

    shape.forEach(function (curve) {
      newShape.push(curve.slice(0));
    });
    shapes.push(newShape);
  };

  for (var i = 0; i < count; i++) {
    _loop2(i);
  }
}

function split(x1, y1, x2, y2, x3, y3, x4, y4, t) {
  return {
    left: _split(x1, y1, x2, y2, x3, y3, x4, y4, t),
    right: _split(x4, y4, x3, y3, x2, y2, x1, y1, 1 - t, true)
  };
}

function _split(x1, y1, x2, y2, x3, y3, x4, y4, t, reverse) {
  var x12 = (x2 - x1) * t + x1;
  var y12 = (y2 - y1) * t + y1;

  var x23 = (x3 - x2) * t + x2;
  var y23 = (y3 - y2) * t + y2;

  var x34 = (x4 - x3) * t + x3;
  var y34 = (y4 - y3) * t + y3;

  var x123 = (x23 - x12) * t + x12;
  var y123 = (y23 - y12) * t + y12;

  var x234 = (x34 - x23) * t + x23;
  var y234 = (y34 - y23) * t + y23;

  var x1234 = (x234 - x123) * t + x123;
  var y1234 = (y234 - y123) * t + y123;

  if (reverse) {
    return [x1234, y1234, x123, y123, x12, y12, x1, y1];
  }
  return [x1, y1, x12, y12, x123, y123, x1234, y1234];
}

function _splitCurves(curves, count) {
  var i = 0,
      index = 0;

  for (; i < count; i++) {
    var curve = curves[index];
    var cs = split(curve[0], curve[1], curve[2], curve[3], curve[4], curve[5], curve[6], curve[7], 0.5);
    curves.splice(index, 1);
    curves.splice(index, 0, cs.left, cs.right);

    index += 2;
    if (index >= curves.length - 1) {
      index = 0;
    }
  }
}

// 将两段 path 对齐
function match(pathA, pathB) {
  var minCurves = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

  var shapesA = (0, _path2shapes2.default)(pathA);
  var shapesB = (0, _path2shapes2.default)(pathB);

  var lenA = shapesA.length,
      lenB = shapesB.length;

  if (lenA > lenB) {
    _subShapes(shapesB, lenA - lenB);
  } else if (lenA < lenB) {
    _upShapes(shapesA, lenB - lenA);
  }

  shapesA = (0, _sort.sort)(shapesA, shapesB);

  shapesA.forEach(function (curves, index) {
    var lenA = curves.length,
        lenB = shapesB[index].length;

    if (lenA > lenB) {
      if (lenA < minCurves) {
        _splitCurves(curves, minCurves - lenA);
        _splitCurves(shapesB[index], minCurves - lenB);
      } else {
        _splitCurves(shapesB[index], lenA - lenB);
      }
    } else if (lenA < lenB) {
      if (lenB < minCurves) {
        _splitCurves(curves, minCurves - lenA);
        _splitCurves(shapesB[index], minCurves - lenB);
      } else {
        _splitCurves(curves, lenB - lenA);
      }
    }
  });

  shapesA.forEach(function (curves, index) {
    shapesA[index] = (0, _sort.sortCurves)(curves, shapesB[index]);
  });

  return [shapesA, shapesB];
}

function lerpPoints(x1, y1, x2, y2, t) {
  return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
}

function lerpCurve(curveA, curveB, t) {
  return lerpPoints(curveA[0], curveA[1], curveB[0], curveB[1], t).concat(lerpPoints(curveA[2], curveA[3], curveB[2], curveB[3], t)).concat(lerpPoints(curveA[4], curveA[5], curveB[4], curveB[5], t)).concat(lerpPoints(curveA[6], curveA[7], curveB[6], curveB[7], t));
}

function lerp(pathA, pathB, t) {
  var _match = match(pathA, pathB),
      _match2 = (0, _slicedToArray3.default)(_match, 2),
      shapesA = _match2[0],
      shapesB = _match2[1];

  return shapesA.map(function (shapeA, i) {
    var shapeB = shapesB[i];
    return shapeA.map(function (curveA, i) {
      var curveB = shapeB[i];
      var curve = lerpCurve(curveA, curveB, t);
      if (i === 0) {
        return 'M' + curve[0] + ' ' + curve[1] + ' C' + curve[2] + ' ' + curve[3] + ', ' + curve[4] + ' ' + curve[5] + ', ' + curve[6] + ' ' + curve[7];
      }
      return curve[2] + ' ' + curve[3] + ', ' + curve[4] + ' ' + curve[5] + ', ' + curve[6] + ' ' + curve[7];
    });
  }).join(' ') + 'z';
}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://github.com/jkroso/parse-svg-path/blob/master/index.js
/**
 * expected argument lengths
 * @type {Object}
 */

var length = {
  a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0

  /**
   * segment pattern
   * @type {RegExp}
   */

};var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

function parse(path) {
  var data = [];
  path.replace(segment, function (_, command, args) {
    var type = command.toLowerCase();
    args = parseValues(args);

    // overloaded moveTo
    if (type === 'm' && args.length > 2) {
      data.push([command].concat(args.splice(0, 2)));
      type = 'l';
      command = command === 'm' ? 'l' : 'L';
    }

    while (true) {
      if (args.length === length[type]) {
        args.unshift(command);
        return data.push(args);
      }
      if (args.length < length[type]) throw new Error('malformed path data');
      data.push([command].concat(args.splice(0, length[type])));
    }
  });
  return data;
}

var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

function parseValues(args) {
  var numbers = args.match(number);
  return numbers ? numbers.map(Number) : [];
}

exports.default = parse;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (path) {
  // https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
  // M = moveto
  // L = lineto
  // H = horizontal lineto
  // V = vertical lineto
  // C = curveto
  // S = smooth curveto
  // Q = quadratic Belzier curve
  // T = smooth quadratic Belzier curveto
  // A = elliptical Arc
  // Z = closepath
  // 以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位(从上一个点开始)。
  var cmds = (0, _parser2.default)(path),
      len = cmds.length,
      shapes = [];

  var preX = 0,
      preY = 0,
      j = 0,
      current = null,
      closeX = void 0,
      closeY = void 0,
      preCX = void 0,
      preCY = void 0,
      sLen = void 0,
      curves = void 0,
      lastCurve = void 0;

  for (; j < len; j++) {
    var item = cmds[j];
    var action = item[0];
    var preItem = cmds[j - 1];

    switch (action) {
      case 'm':
        sLen = shapes.length;
        shapes[sLen] = [];
        current = shapes[sLen];
        preX += item[1];
        preY += item[2];
        break;
      case 'M':

        sLen = shapes.length;
        shapes[sLen] = [];
        current = shapes[sLen];
        preX = item[1];
        preY = item[2];
        break;

      case 'l':
        current.push([preX, preY, preX, preY, preX, preY, preX + item[1], preY + item[2]]);
        preX += item[1];
        preY += item[2];
        break;

      case 'L':

        current.push([preX, preY, item[1], item[2], item[1], item[2], item[1], item[2]]);
        preX = item[1];
        preY = item[2];

        break;

      case 'h':

        current.push([preX, preY, preX, preY, preX, preY, preX + item[1], preY]);
        preX += item[1];
        break;

      case 'H':
        current.push([preX, preY, item[1], preY, item[1], preY, item[1], preY]);
        preX = item[1];
        break;

      case 'v':
        current.push([preX, preY, preX, preY, preX, preY, preX, preY + item[1]]);
        preY += item[1];
        break;

      case 'V':
        current.push([preX, preY, preX, item[1], preX, item[1], preX, item[1]]);
        preY = item[1];
        break;

      case 'C':

        current.push([preX, preY, item[1], item[2], item[3], item[4], item[5], item[6]]);
        preX = item[5];
        preY = item[6];
        break;
      case 'S':
        if (preItem[0] === 'C' || preItem[0] === 'c') {
          current.push([preX, preY, preX + preItem[5] - preItem[3], preY + preItem[6] - preItem[4], item[1], item[2], item[3], item[4]]);
        } else if (preItem[0] === 'S' || preItem[0] === 's') {
          current.push([preX, preY, preX + preItem[3] - preItem[1], preY + preItem[4] - preItem[2], item[1], item[2], item[3], item[4]]);
        }
        preX = item[3];
        preY = item[4];
        break;

      case 'c':
        current.push([preX, preY, preX + item[1], preY + item[2], preX + item[3], preY + item[4], preX + item[5], preY + item[6]]);
        preX += item[5];
        preY += item[6];
        break;
      case 's':
        if (preItem[0] === 'C' || preItem[0] === 'c') {
          current.push([preX, preY, preX + preItem[5] - preItem[3], preY + preItem[6] - preItem[4], preX + item[1], preY + item[2], preX + item[3], preY + item[4]]);
        } else if (preItem[0] === 'S' || preItem[0] === 's') {
          current.push([preX, preY, preX + preItem[3] - preItem[1], preY + preItem[4] - preItem[2], preX + item[1], preY + item[2], preX + item[3], preY + item[4]]);
        }

        preX += item[3];
        preY += item[4];

        break;
      case 'a':
        curves = (0, _svgArcToCubicBezier2.default)({
          rx: item[1],
          ry: item[2],
          px: preX,
          py: preY,
          xAxisRotation: item[3],
          largeArcFlag: item[4],
          sweepFlag: item[5],
          cx: preX + item[6],
          cy: preX + item[7]
        });
        lastCurve = curves[curves.length - 1];

        curves.forEach(function (curve, index) {
          if (index === 0) {
            current.push([preX, preY, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
          } else {
            current.push([curves[index - 1].x, curves[index - 1].y, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
          }
        });

        preX = lastCurve.x;
        preY = lastCurve.y;

        break;

      case 'A':

        curves = (0, _svgArcToCubicBezier2.default)({
          rx: item[1],
          ry: item[2],
          px: preX,
          py: preY,
          xAxisRotation: item[3],
          largeArcFlag: item[4],
          sweepFlag: item[5],
          cx: item[6],
          cy: item[7]
        });
        lastCurve = curves[curves.length - 1];

        curves.forEach(function (curve, index) {
          if (index === 0) {
            current.push([preX, preY, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
          } else {
            current.push([curves[index - 1].x, curves[index - 1].y, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
          }
        });

        preX = lastCurve.x;
        preY = lastCurve.y;

        break;
      case 'Q':
        current.push(q2b(preX, preY, item[1], item[2], item[3], item[4]));
        preX = item[3];
        preY = item[4];

        break;
      case 'q':
        current.push(q2b(preX, preY, preX + item[1], preY + item[2], item[3] + preX, item[4] + preY));
        preX += item[3];
        preY += item[4];
        break;

      case 'T':

        if (preItem[0] === 'Q' || preItem[0] === 'q') {
          preCX = preX + preItem[3] - preItem[1];
          preCY = preY + preItem[4] - preItem[2];
          current.push(q2b(preX, preY, preCX, preCY, item[1], item[2]));
        } else if (preItem[0] === 'T' || preItem[0] === 't') {
          current.push(q2b(preX, preY, preX + preX - preCX, preY + preY - preCY, item[1], item[2]));
          preCX = preX + preX - preCX;
          preCY = preY + preY - preCY;
        }

        preX = item[1];
        preY = item[2];
        break;

      case 't':
        if (preItem[0] === 'Q' || preItem[0] === 'q') {
          preCX = preX + preItem[3] - preItem[1];
          preCY = preY + preItem[4] - preItem[2];
          current.push(q2b(preX, preY, preCX, preCY, preX + item[1], preY + item[2]));
        } else if (preItem[0] === 'T' || preItem[0] === 't') {
          current.push(q2b(preX, preY, preX + preX - preCX, preY + preY - preCY, preX + item[1], preY + item[2]));
          preCX = preX + preX - preCX;
          preCY = preY + preY - preCY;
        }

        preX += item[1];
        preY += item[2];
        break;

      case 'Z':
        closeX = current[0][0];
        closeY = current[0][1];
        current.push([preX, preY, closeX, closeY, closeX, closeY, closeX, closeY]);
        break;
      case 'z':
        closeX = current[0][0];
        closeY = current[0][1];
        current.push([preX, preY, closeX, closeY, closeX, closeY, closeX, closeY]);
        break;

      default:
        throw new Error('unknown action');
    }
  }

  return shapes;
};

var _svgArcToCubicBezier = __webpack_require__(74);

var _svgArcToCubicBezier2 = _interopRequireDefault(_svgArcToCubicBezier);

var _parser = __webpack_require__(198);

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/AlloyTeam/pasition

function q2b(x1, y1, x2, y2, x3, y3) {
  return [x1, y1, (x1 + 2 * x2) / 3, (y1 + 2 * y2) / 3, (x3 + 2 * x2) / 3, (y3 + 2 * y2) / 3, x3, y3];
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://github.com/AlloyTeam/pasition

function shapeBox(shape) {
  var minX = shape[0][0],
      minY = shape[0][1],
      maxX = minX,
      maxY = minY;
  shape.forEach(function (curve) {
    var x1 = curve[0],
        x2 = curve[2],
        x3 = curve[4],
        x4 = curve[6],
        y1 = curve[1],
        y2 = curve[3],
        y3 = curve[5],
        y4 = curve[7];

    minX = Math.min(minX, x1, x2, x3, x4);
    minY = Math.min(minY, y1, y2, y3, y4);
    maxX = Math.max(maxX, x1, x2, x3, x4);
    maxY = Math.max(maxY, y1, y2, y3, y4);
  });

  return [minX, minY, maxX, maxY];
}

function boxDistance(boxA, boxB) {
  return Math.sqrt(Math.pow(boxA[0] - boxB[0], 2) + Math.pow(boxA[1] - boxB[1], 2)) + Math.sqrt(Math.pow(boxA[2] - boxB[2], 2) + Math.pow(boxA[3] - boxB[3], 2));
}

function curveDistance(curveA, curveB) {
  var x1 = curveA[0],
      x2 = curveA[2],
      x3 = curveA[4],
      x4 = curveA[6],
      y1 = curveA[1],
      y2 = curveA[3],
      y3 = curveA[5],
      y4 = curveA[7],
      xb1 = curveB[0],
      xb2 = curveB[2],
      xb3 = curveB[4],
      xb4 = curveB[6],
      yb1 = curveB[1],
      yb2 = curveB[3],
      yb3 = curveB[5],
      yb4 = curveB[7];

  return Math.sqrt(Math.pow(xb1 - x1, 2) + Math.pow(yb1 - y1, 2)) + Math.sqrt(Math.pow(xb2 - x2, 2) + Math.pow(yb2 - y2, 2)) + Math.sqrt(Math.pow(xb3 - x3, 2) + Math.pow(yb3 - y3, 2)) + Math.sqrt(Math.pow(xb4 - x4, 2) + Math.pow(yb4 - y4, 2));
}

function sortCurves(curvesA, curvesB) {
  var arrList = permuteCurveNum(curvesA.length);

  var list = [];
  arrList.forEach(function (arr) {
    var distance = 0;
    var i = 0;
    arr.forEach(function (index) {
      distance += curveDistance(curvesA[index], curvesB[i++]);
    });
    list.push({ index: arr, distance: distance });
  });

  list.sort(function (a, b) {
    return a.distance - b.distance;
  });

  var result = [];

  list[0].index.forEach(function (index) {
    result.push(curvesA[index]);
  });

  return result;
}

function sort(pathA, pathB) {
  var arrList = permuteNum(pathA.length);

  var list = [];
  arrList.forEach(function (arr) {
    var distance = 0;
    arr.forEach(function (index) {
      distance += boxDistance(shapeBox(pathA[index]), shapeBox(pathB[index]));
    });
    list.push({ index: arr, distance: distance });
  });

  list.sort(function (a, b) {
    return a.distance - b.distance;
  });

  var result = [];

  list[0].index.forEach(function (index) {
    result.push(pathA[index]);
  });

  return result;
}

function permuteCurveNum(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    var indexArr = [];
    for (var j = 0; j < num; j++) {
      var index = j + i;
      if (index > num - 1) index -= num;
      indexArr[index] = j;
    }

    arr.push(indexArr);
  }

  return arr;
}

function permuteNum(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(i);
  }

  return permute(arr);
}

function permute(input) {
  var permArr = [],
      usedChars = [];
  function main(input) {
    var i = void 0,
        ch = void 0;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length === 0) {
        permArr.push(usedChars.slice());
      }
      main(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  }
  return main(input);
}

exports.sort = sort;
exports.sortCurves = sortCurves;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(33);

var _map2 = _interopRequireDefault(_map);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(13);

var _symbol2 = _interopRequireDefault(_symbol);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nowtime() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  } else if (typeof process !== 'undefined' && process.hrtime) {
    var _process$hrtime = process.hrtime(),
        _process$hrtime2 = (0, _slicedToArray3.default)(_process$hrtime, 2),
        s = _process$hrtime2[0],
        ns = _process$hrtime2[1];

    return s * 1e3 + ns * 1e-6;
  }
  return Date.now ? Date.now() : new Date().getTime();
}

var defaultOptions = {
  originTime: 0,
  playbackRate: 1.0
};

var _timeMark = (0, _symbol2.default)('timeMark'),
    _playbackRate = (0, _symbol2.default)('playbackRate'),
    _timers = (0, _symbol2.default)('timers'),
    _originTime = (0, _symbol2.default)('originTime'),
    _timerID = (0, _symbol2.default)('timerID'),
    _setTimer = (0, _symbol2.default)('setTimer'),
    _parent = (0, _symbol2.default)('parent');

var Timeline = function () {
  function Timeline(options, parent) {
    (0, _classCallCheck3.default)(this, Timeline);

    if (options instanceof Timeline) {
      parent = options;
      options = {};
    }

    options = (0, _assign2.default)({}, defaultOptions, options);

    if (parent) {
      this[_parent] = parent;
    }

    // timeMark records the reference points on timeline
    // Each time we change the playbackRate or currentTime or entropy
    // A new timeMark will be generated
    // timeMark sorted by entropy
    // If you reset entropy, all the timeMarks behind the new entropy
    // should be dropped
    this[_timeMark] = [{
      globalTime: this.globalTime,
      localTime: -options.originTime,
      entropy: -options.originTime,
      playbackRate: options.playbackRate
    }];

    if (this[_parent]) {
      this[_timeMark][0].globalEntropy = this[_parent].entropy;
    }

    this[_originTime] = options.originTime;
    this[_playbackRate] = options.playbackRate;
    this[_timers] = new _map2.default();
    this[_timerID] = 0;
  }

  (0, _createClass3.default)(Timeline, [{
    key: 'fork',
    value: function fork(options) {
      return new Timeline(options, this);
    }
  }, {
    key: 'seekGlobalTime',
    value: function seekGlobalTime(seekEntropy) {
      var idx = this.seekTimeMark(seekEntropy),
          timeMark = this[_timeMark][idx];

      var entropy = timeMark.entropy,
          playbackRate = timeMark.playbackRate,
          globalTime = timeMark.globalTime;


      return globalTime + (seekEntropy - entropy) / Math.abs(playbackRate);
    }
  }, {
    key: 'seekLocalTime',
    value: function seekLocalTime(seekEntropy) {
      var idx = this.seekTimeMark(seekEntropy),
          timeMark = this[_timeMark][idx];

      var localTime = timeMark.localTime,
          entropy = timeMark.entropy,
          playbackRate = timeMark.playbackRate;


      if (playbackRate > 0) {
        return localTime + (seekEntropy - entropy);
      }
      return localTime - (seekEntropy - entropy);
    }
  }, {
    key: 'seekTimeMark',
    value: function seekTimeMark(entropy) {
      var timeMark = this[_timeMark];

      var l = 0,
          r = timeMark.length - 1;

      if (entropy <= timeMark[l].entropy) {
        return l;
      }
      if (entropy >= timeMark[r].entropy) {
        return r;
      }

      var m = Math.floor((l + r) / 2); // binary search

      while (m > l && m < r) {
        if (entropy === timeMark[m].entropy) {
          return m;
        } else if (entropy < timeMark[m].entropy) {
          r = m;
        } else if (entropy > timeMark[m].entropy) {
          l = m;
        }
        m = Math.floor((l + r) / 2);
      }

      return l;
    }
  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout(_x) {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function (id) {
      var timer = this[_timers].get(id);
      if (timer && timer.timerID != null) {
        if (this[_parent]) {
          this[_parent].clearTimeout(timer.timerID);
        } else {
          clearTimeout(timer.timerID);
        }
      }
      this[_timers].delete(id);
    })
  }, {
    key: 'clearInterval',
    value: function clearInterval(id) {
      return this.clearTimeout(id);
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout(handler) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { time: 0 };

      return this[_setTimer](handler, time, 'timeout');
    }
  }, {
    key: 'setInterval',
    value: function setInterval(handler) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { time: 0 };

      return this[_setTimer](handler, time, 'interval');
    }
  }, {
    key: _setTimer,
    value: function value(handler, time) {
      var _this = this;

      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'timeout';

      if (typeof time === 'number') {
        time = { time: time };
      }

      var currentTime = this.currentTime,
          entropy = this.entropy;

      var id = ++this[_timerID];

      var timerID = null;
      var delay = void 0;

      if (time.time == null) {
        // entropy
        delay = time.entropy / Math.abs(this.playbackRate);
      } else {
        delay = time.time / this.playbackRate;
      }

      if (isFinite(delay)) {
        var parent = this[_parent],
            globalTimeout = parent ? parent.setTimeout.bind(parent) : setTimeout,
            globalInterval = parent ? parent.setInterval.bind(parent) : setInterval;

        delay = Math.ceil(delay);

        if (this[_parent]) {
          delay = { entropy: delay };
        }

        if (type === 'timeout') {
          timerID = globalTimeout(function () {
            _this[_timers].delete(id);
            handler();
          }, delay);
        } else if (type === 'interval') {
          timerID = globalInterval(function () {
            var timer = _this[_timers].get(id);
            timer.active = true;
            handler();
            timer.active = false;
          }, delay);
        }
      }

      this[_timers].set(id, {
        timerID: timerID,
        handler: handler,
        time: time,
        currentTime: currentTime,
        entropy: entropy,
        type: type
      });

      return id;
    }
  }, {
    key: 'currentTime',
    get: function get() {
      var _timeMark2 = this[_timeMark][this[_timeMark].length - 1],
          localTime = _timeMark2.localTime,
          globalTime = _timeMark2.globalTime;

      return localTime + (this.globalTime - globalTime) * this.playbackRate;
    },
    set: function set(time) {
      var timeMark = {
        globalTime: this.globalTime,
        localTime: time,
        entropy: this.entropy,
        playbackRate: this.playbackRate
      };

      if (this[_parent]) {
        timeMark.globalEntropy = this[_parent].entropy;
      }

      this[_timeMark].push(timeMark);
    }
    // Both currentTime and entropy should be influenced by playbackRate.
    // If current playbackRate is negative, the currentTime should go backwards
    // while the entropy remain to go forwards.
    // Both of the initial values is set to -originTime

  }, {
    key: 'entropy',
    get: function get() {
      var _timeMark3 = this[_timeMark][this[_timeMark].length - 1],
          globalTime = _timeMark3.globalTime,
          entropy = _timeMark3.entropy,
          globalEntropy = _timeMark3.globalEntropy;

      if (this[_parent]) {
        return entropy + Math.abs((this[_parent].entropy - globalEntropy) * this.playbackRate);
      }
      return entropy + Math.abs((this.globalTime - globalTime) * this.playbackRate);
    },

    // change entropy will NOT cause currentTime changing but may influence the pass
    // and the future of the timeline. (It may change the result of seek***Time)
    // While entropy is set, all the marks behind will be droped
    set: function set(entropy) {
      var idx = this.seekTimeMark(entropy);
      this[_timeMark].length = idx + 1;

      this[_timeMark].push({
        globalTime: this.globalTime,
        localTime: this.currentTime,
        entropy: entropy,
        playbackRate: this.playbackRate
      });
    }
  }, {
    key: 'globalTime',
    get: function get() {
      if (this[_parent]) {
        return this[_parent].currentTime;
      }

      return nowtime();
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this[_playbackRate];
    },
    set: function set(rate) {
      var _this2 = this;

      if (rate !== this.playbackRate) {
        var currentTime = this.currentTime;
        // force currentTime updating
        this.currentTime = currentTime;
        this[_playbackRate] = rate;
        // set new playbackRate in new time mark
        this[_timeMark][this[_timeMark].length - 1].playbackRate = rate;

        // This should be asynchronous because we may reset playbackRate
        // in the timer handler ?
        if (this[_timers].size) {
          var timers = [].concat((0, _toConsumableArray3.default)(this[_timers]));
          timers.forEach(function (_ref) {
            var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                id = _ref2[0],
                timer = _ref2[1];

            _this2.clearTimeout(id);

            var entropy = _this2.entropy,
                time = timer.time,
                handler = timer.handler,
                type = timer.type,
                active = timer.active;


            var timerID = null;

            var delay = void 0;
            if (time.time == null) {
              delay = time.entropy - (entropy - timer.entropy);
              delay /= Math.abs(_this2.playbackRate);
            } else {
              delay = time.time - (currentTime - timer.currentTime);
              delay /= _this2.playbackRate;
            }

            if (isFinite(delay)) {
              var parent = _this2[_parent],
                  globalTimeout = parent ? parent.setTimeout.bind(parent) : setTimeout,
                  globalInterval = parent ? parent.setInterval.bind(parent) : setInterval;

              delay = Math.ceil(delay);

              if (_this2[_parent]) {
                delay = { entropy: delay };
              }

              if (type === 'timeout') {
                timerID = globalTimeout(function () {
                  _this2[_timers].delete(id);
                  handler();
                }, delay);
              } else if (type === 'interval') {
                timerID = globalTimeout(function () {
                  if (!active) {
                    handler();
                  }
                  if (time.time == null) {
                    delay = time.entropy / Math.abs(_this2.playbackRate);
                  } else {
                    delay = time.time / _this2.playbackRate;
                  }
                  if (_this2[_timers].has(id)) {
                    timerID = globalInterval(function () {
                      handler();
                    }, delay);
                    _this2[_timers].get(id).timerID = timerID;
                  }
                }, delay);
              }
            }

            _this2[_timers].set(id, {
              timerID: timerID,
              handler: handler,
              time: time,
              currentTime: currentTime,
              entropy: entropy,
              type: type
            });
          });
        }
      }
    }
  }]);
  return Timeline;
}();

module.exports = Timeline;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(72)))

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(50);

var _set2 = _interopRequireDefault(_set);

exports.attr = attr;
exports.setDeprecation = setDeprecation;
exports.deprecate = deprecate;
exports.parseValue = parseValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attr(target, prop, descriptor) {
  if (descriptor.get) {
    throw new Error('Attributes\' getter ' + prop + ' can not be override!');
  }
  descriptor.get = function () {
    return this.get(prop);
  };
  return descriptor;
}

var deprecationSet = new _set2.default();

function setDeprecation(apiName) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  msg = '[Deprecation] ' + apiName + ' has been deprecated.' + msg;
  if (!deprecationSet.has(msg)) {
    deprecationSet.add(msg);
    console.warn(msg);
  }
}

function deprecate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var msg = '',
      apiName = '';
  function decorator(target, prop, descriptor) {
    apiName = apiName || target.constructor.name + '#' + prop;
    if (typeof descriptor.value === 'function') {
      var func = descriptor.value;
      descriptor.value = function () {
        setDeprecation(apiName, msg);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return func.apply(this, args);
      };
    }
    if (descriptor.set) {
      var setter = descriptor.set;
      descriptor.set = function (val) {
        setDeprecation(apiName, msg);
        return setter.call(this, val);
      };
    }
    if (descriptor.get) {
      var getter = descriptor.get;
      descriptor.get = function () {
        setDeprecation(apiName, msg);
        return getter.call(this);
      };
    }
  }
  if (args.length === 1) {
    msg = args[0];
    return decorator;
  }
  if (args.length === 2) {
    apiName = args[0];
    msg = args[1];
    return decorator;
  }
  return decorator.apply(undefined, args);
}

function parseValue() {
  for (var _len3 = arguments.length, parsers = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    parsers[_key3] = arguments[_key3];
  }

  return function (target, prop, descriptor) {
    var setter = descriptor.set;

    descriptor.set = function (val) {
      val = parsers.reduce(function (v, parser) {
        return parser(v);
      }, val);

      setter.call(this, val);
    };

    return descriptor;
  };
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendUnit = exports.rectVertices = exports.rectToBox = exports.boxUnion = exports.boxEqual = exports.boxToRect = exports.boxIntersect = exports.parseStringTransform = exports.fourValuesShortCut = exports.parseColorString = exports.parseStringFloat = exports.parseStringInt = exports.oneOrTwoValues = exports.parseColor = exports.Color = undefined;

var _isNan = __webpack_require__(117);

var _isNan2 = _interopRequireDefault(_isNan);

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorString = __webpack_require__(126);

var Color = function () {
  function Color(color) {
    (0, _classCallCheck3.default)(this, Color);

    if (typeof color === 'string') {
      var _colorString$get = colorString.get(color),
          model = _colorString$get.model,
          value = _colorString$get.value;

      this.model = model;
      this.value = value;
    } else {
      this.model = color.model;
      this.value = color.value;
    }
  }

  (0, _createClass3.default)(Color, [{
    key: 'toString',
    value: function toString() {
      var _value = (0, _slicedToArray3.default)(this.value, 4),
          a = _value[0],
          b = _value[1],
          c = _value[2],
          d = _value[3];

      var model = this.model;

      return model + 'a(' + a + ',' + b + ',' + c + ',' + d + ')';
    }
  }, {
    key: 'str',
    get: function get() {
      return String(this);
    }
  }]);
  return Color;
}();

exports.Color = Color;


var parseColor = function parseColor(color) {
  return new Color(color);
};

function parseColorString(color) {
  return parseColor(color).toString();
}

function parseStringTransform(str) {
  if (typeof str !== 'string') return str;

  var rules = str.match(/(?:^|\s)+((?:scale|rotate|translate|skew|matrix)\([^()]+\))/g);
  var ret = {};
  if (rules) {
    rules.forEach(function (rule) {
      var matched = rule.match(/(scale|rotate|translate|skew|matrix)\(([^()]+)\)/);

      var _matched = (0, _slicedToArray3.default)(matched, 3),
          m = _matched[1],
          v = _matched[2];

      if (m === 'rotate') {
        ret[m] = parseStringFloat(v)[0];
      } else {
        ret[m] = parseStringFloat(v);
      }
    });
  }

  return ret;
}

function parseValuesString(str) {
  var isInt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (typeof str === 'string') {
    var values = str.split(/[\s,]+/g);
    return values.map(function (v) {
      return isInt ? parseInt(v, 10) : parseFloat(v);
    });
  }
  return str;
}

function parseStringInt(str) {
  return parseValuesString(str, true);
}

function parseStringFloat(str) {
  return parseValuesString(str, false);
}

function oneOrTwoValues(val) {
  if (!Array.isArray(val)) {
    return [val, val];
  } else if (val.length === 1) {
    return [val[0], val[0]];
  }
  return val;
}

function fourValuesShortCut(val) {
  if (!Array.isArray(val)) {
    return [val, val, val, val];
  } else if (val.length === 1) {
    return [val[0], val[0], val[0], val[0]];
  } else if (val.length === 2) {
    return [val[0], val[1], val[0], val[1]];
  }
  return [].concat((0, _toConsumableArray3.default)(val), [0, 0, 0, 0]).slice(0, 4);
}

function boxIntersect(box1, box2) {
  // left, top, right, buttom
  var _ref = [box1[0], box1[1], box1[2], box1[3]],
      l1 = _ref[0],
      t1 = _ref[1],
      r1 = _ref[2],
      b1 = _ref[3],
      _ref2 = [box2[0], box2[1], box2[2], box2[3]],
      l2 = _ref2[0],
      t2 = _ref2[1],
      r2 = _ref2[2],
      b2 = _ref2[3];


  var t = Math.max(t1, t2),
      r = Math.min(r1, r2),
      b = Math.min(b1, b2),
      l = Math.max(l1, l2);

  if (b >= t && r >= l) {
    return [l, t, r, b];
  }
  return null;
}

function boxToRect(box) {
  return [box[0], box[1], box[2] - box[0], box[3] - box[1]];
}

function boxEqual(box1, box2) {
  return box1[0] === box2[0] && box1[1] === box2[1] && box1[2] === box2[2] && box1[3] === box2[3];
}

function rectToBox(rect) {
  return [rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3]];
}

function rectVertices(rect) {
  var _rectToBox = rectToBox(rect),
      _rectToBox2 = (0, _slicedToArray3.default)(_rectToBox, 4),
      x1 = _rectToBox2[0],
      y1 = _rectToBox2[1],
      x2 = _rectToBox2[2],
      y2 = _rectToBox2[3];

  return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
}

function boxUnion(box1, box2) {
  if (!box1) return box2;
  if (!box2) return box1;

  return [Math.min(box1[0], box2[0]), Math.min(box1[1], box2[1]), Math.max(box1[2], box2[2]), Math.max(box1[3], box2[3])];
}

function appendUnit(value) {
  var defaultUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';

  if (value === '') {
    return value;
  }
  if (typeof value === 'string' && (0, _isNan2.default)(Number(value))) {
    return value;
  }
  return value + defaultUnit;
}

exports.parseColor = parseColor;
exports.oneOrTwoValues = oneOrTwoValues;
exports.parseStringInt = parseStringInt;
exports.parseStringFloat = parseStringFloat;
exports.parseColorString = parseColorString;
exports.fourValuesShortCut = fourValuesShortCut;
exports.parseStringTransform = parseStringTransform;
exports.boxIntersect = boxIntersect;
exports.boxToRect = boxToRect;
exports.boxEqual = boxEqual;
exports.boxUnion = boxUnion;
exports.rectToBox = rectToBox;
exports.rectVertices = rectVertices;
exports.appendUnit = appendUnit;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// v1.0 exported just the parser function. To maintain backwards compatibility,
// we export additional named features as properties of that function.
var parserFunction = __webpack_require__(205).parse;
parserFunction.parseSVG = parserFunction;
parserFunction.makeAbsolute = makeSVGPathCommandsAbsolute;
module.exports = parserFunction;

function makeSVGPathCommandsAbsolute(commands) {
	var subpathStart, prevCmd={x:0,y:0};
	var attr = {x:'x0',y:'y0',x1:'x0',y1:'y0',x2:'x0',y2:'y0'};
	commands.forEach(function(cmd) {
		if (cmd.command==='moveto') subpathStart=cmd;
		cmd.x0=prevCmd.x; cmd.y0=prevCmd.y;
		for (var a in attr) if (a in cmd) cmd[a] += cmd.relative ? cmd[attr[a]] : 0;
		if (!('x' in cmd)) cmd.x = prevCmd.x; // V
		if (!('y' in cmd)) cmd.y = prevCmd.y; // X
		cmd.relative = false;
		cmd.code = cmd.code.toUpperCase();
		if (cmd.command=='closepath') {
			cmd.x = subpathStart.x;
			cmd.y = subpathStart.y;
		}
		prevCmd = cmd;
	});
	return commands;
}


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */



function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { svg_path: peg$parsesvg_path },
      peg$startRuleFunction  = peg$parsesvg_path,

      peg$c0 = function(data) {
          if (!data) return [];
          for (var cmds=[],i=0;i<data.length;i++) cmds=cmds.concat.apply(cmds,data[i]);
          var first=cmds[0];
          if (first && first.code=='m'){ // Per spec, first moveto is never relative
            delete first.relative;
            first.code = 'M';
          }
          return cmds;
        },
      peg$c1 = function(first, more) { return merge(first,more) },
      peg$c2 = /^[Mm]/,
      peg$c3 = peg$classExpectation(["M", "m"], false, false),
      peg$c4 = function(c, first, more) {
          var move = commands(c,[first]);
          if (more) move = move.concat(commands(c=='M' ? 'L' : 'l',more[1]));
          return move;
        },
      peg$c5 = /^[Zz]/,
      peg$c6 = peg$classExpectation(["Z", "z"], false, false),
      peg$c7 = function() { return commands('Z') },
      peg$c8 = /^[Ll]/,
      peg$c9 = peg$classExpectation(["L", "l"], false, false),
      peg$c10 = function(c, args) { return commands(c,args) },
      peg$c11 = /^[Hh]/,
      peg$c12 = peg$classExpectation(["H", "h"], false, false),
      peg$c13 = function(c, args) { return commands(c,args.map(function(x){ return {x:x}})) },
      peg$c14 = /^[Vv]/,
      peg$c15 = peg$classExpectation(["V", "v"], false, false),
      peg$c16 = function(c, args) { return commands(c,args.map(function(y){ return {y:y}})) },
      peg$c17 = /^[Cc]/,
      peg$c18 = peg$classExpectation(["C", "c"], false, false),
      peg$c19 = function(a, b, c) { return { x1:a.x, y1:a.y, x2:b.x, y2:b.y, x:c.x, y:c.y } },
      peg$c20 = /^[Ss]/,
      peg$c21 = peg$classExpectation(["S", "s"], false, false),
      peg$c22 = function(b, c) { return { x2:b.x, y2:b.y, x:c.x, y:c.y } },
      peg$c23 = /^[Qq]/,
      peg$c24 = peg$classExpectation(["Q", "q"], false, false),
      peg$c25 = function(a, b) { return { x1:a.x, y1:a.y, x:b.x, y:b.y } },
      peg$c26 = /^[Tt]/,
      peg$c27 = peg$classExpectation(["T", "t"], false, false),
      peg$c28 = /^[Aa]/,
      peg$c29 = peg$classExpectation(["A", "a"], false, false),
      peg$c30 = function(rx, ry, xrot, large, sweep, xy) { return { rx:rx, ry:ry, xAxisRotation:xrot, largeArc:large, sweep:sweep, x:xy.x, y:xy.y } },
      peg$c31 = function(x, y) { return { x:x, y:y } },
      peg$c32 = function(n) { return n*1 },
      peg$c33 = function(parts) { return parts.join('')*1 },
      peg$c34 = /^[01]/,
      peg$c35 = peg$classExpectation(["0", "1"], false, false),
      peg$c36 = function(bit) { return bit=='1' },
      peg$c37 = function() { return '' },
      peg$c38 = ",",
      peg$c39 = peg$literalExpectation(",", false),
      peg$c40 = function(parts) { return parts.join('') },
      peg$c41 = ".",
      peg$c42 = peg$literalExpectation(".", false),
      peg$c43 = /^[eE]/,
      peg$c44 = peg$classExpectation(["e", "E"], false, false),
      peg$c45 = /^[+\-]/,
      peg$c46 = peg$classExpectation(["+", "-"], false, false),
      peg$c47 = /^[0-9]/,
      peg$c48 = peg$classExpectation([["0", "9"]], false, false),
      peg$c49 = function(digits) { return digits.join('') },
      peg$c50 = /^[ \t\n\r]/,
      peg$c51 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsesvg_path() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsewsp();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsewsp();
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsemoveTo_drawTo_commandGroups();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsewsp();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsewsp();
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemoveTo_drawTo_commandGroups() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsemoveTo_drawTo_commandGroup();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = [];
      s5 = peg$parsewsp();
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        s5 = peg$parsewsp();
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsemoveTo_drawTo_commandGroup();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = [];
        s5 = peg$parsewsp();
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$parsewsp();
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsemoveTo_drawTo_commandGroup();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemoveTo_drawTo_commandGroup() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsemoveto();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = [];
      s5 = peg$parsewsp();
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        s5 = peg$parsewsp();
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsedrawto_command();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = [];
        s5 = peg$parsewsp();
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$parsewsp();
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsedrawto_command();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedrawto_command() {
    var s0;

    s0 = peg$parseclosepath();
    if (s0 === peg$FAILED) {
      s0 = peg$parselineto();
      if (s0 === peg$FAILED) {
        s0 = peg$parsehorizontal_lineto();
        if (s0 === peg$FAILED) {
          s0 = peg$parsevertical_lineto();
          if (s0 === peg$FAILED) {
            s0 = peg$parsecurveto();
            if (s0 === peg$FAILED) {
              s0 = peg$parsesmooth_curveto();
              if (s0 === peg$FAILED) {
                s0 = peg$parsequadratic_bezier_curveto();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsesmooth_quadratic_bezier_curveto();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseelliptical_arc();
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsemoveto() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (peg$c2.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c3); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecoordinate_pair();
        if (s3 !== peg$FAILED) {
          s4 = peg$currPos;
          s5 = peg$parsecomma_wsp();
          if (s5 === peg$FAILED) {
            s5 = null;
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parselineto_argument_sequence();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c4(s1, s3, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseclosepath() {
    var s0, s1;

    s0 = peg$currPos;
    if (peg$c5.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c7();
    }
    s0 = s1;

    return s0;
  }

  function peg$parselineto() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c8.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c9); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parselineto_argument_sequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parselineto_argument_sequence() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsecoordinate_pair();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma_wsp();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsecoordinate_pair();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsecoordinate_pair();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsehorizontal_lineto() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c11.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c12); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecoordinate_sequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c13(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecoordinate_sequence() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsenumber();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma_wsp();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsenumber();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsevertical_lineto() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c14.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c15); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecoordinate_sequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c16(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecurveto() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c17.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c18); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecurveto_argument_sequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecurveto_argument_sequence() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsecurveto_argument();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma_wsp();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsecurveto_argument();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsecurveto_argument();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecurveto_argument() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsecoordinate_pair();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecomma_wsp();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecoordinate_pair();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecoordinate_pair();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c19(s1, s3, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesmooth_curveto() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c20.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c21); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsesmooth_curveto_argument_sequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesmooth_curveto_argument_sequence() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsesmooth_curveto_argument();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma_wsp();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsesmooth_curveto_argument();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsesmooth_curveto_argument();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesmooth_curveto_argument() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsecoordinate_pair();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecomma_wsp();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecoordinate_pair();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c22(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsequadratic_bezier_curveto() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c23.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c24); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsequadratic_bezier_curveto_argument_sequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsequadratic_bezier_curveto_argument_sequence() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsequadratic_bezier_curveto_argument();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma_wsp();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsequadratic_bezier_curveto_argument();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsequadratic_bezier_curveto_argument();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsequadratic_bezier_curveto_argument() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsecoordinate_pair();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecomma_wsp();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecoordinate_pair();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c25(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesmooth_quadratic_bezier_curveto() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c26.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c27); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsesmooth_quadratic_bezier_curveto_argument_sequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesmooth_quadratic_bezier_curveto_argument_sequence() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsecoordinate_pair();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma_wsp();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsecoordinate_pair();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsecoordinate_pair();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseelliptical_arc() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c28.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c29); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsewsp();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsewsp();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseelliptical_arc_argument_sequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseelliptical_arc_argument_sequence() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseelliptical_arc_argument();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma_wsp();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parseelliptical_arc_argument();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma_wsp();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseelliptical_arc_argument();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseelliptical_arc_argument() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

    s0 = peg$currPos;
    s1 = peg$parsenonnegative_number();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecomma_wsp();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenonnegative_number();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenumber();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsecomma_wsp();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseflag();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsecomma_wsp();
                  if (s8 === peg$FAILED) {
                    s8 = null;
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseflag();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsecomma_wsp();
                      if (s10 === peg$FAILED) {
                        s10 = null;
                      }
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parsecoordinate_pair();
                        if (s11 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c30(s1, s3, s5, s7, s9, s11);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecoordinate_pair() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsenumber();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecomma_wsp();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c31(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenonnegative_number() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parsefloating_point_constant();
    if (s1 === peg$FAILED) {
      s1 = peg$parsedigit_sequence();
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c32(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsenumber() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsesign();
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsefloating_point_constant();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = peg$currPos;
      s2 = peg$parsesign();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsedigit_sequence();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c33(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseflag() {
    var s0, s1;

    s0 = peg$currPos;
    if (peg$c34.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c35); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c36(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsecomma_wsp() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsewsp();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewsp();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecomma();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsewsp();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsewsp();
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsecomma();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsewsp();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsewsp();
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c37();
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parsecomma() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 44) {
      s0 = peg$c38;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c39); }
    }

    return s0;
  }

  function peg$parsefloating_point_constant() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsefractional_constant();
    if (s2 !== peg$FAILED) {
      s3 = peg$parseexponent();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = peg$currPos;
      s2 = peg$parsedigit_sequence();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseexponent();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c40(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsefractional_constant() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsedigit_sequence();
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 46) {
        s3 = peg$c41;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parsedigit_sequence();
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = peg$currPos;
      s2 = peg$parsedigit_sequence();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c41;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c42); }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c40(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseexponent() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c43.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c44); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsesign();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parsedigit_sequence();
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c40(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsesign() {
    var s0;

    if (peg$c45.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c46); }
    }

    return s0;
  }

  function peg$parsedigit_sequence() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c47.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c48); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c47.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c48); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c49(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsewsp() {
    var s0, s1;

    s0 = peg$currPos;
    if (peg$c50.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c51); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c37();
    }
    s0 = s1;

    return s0;
  }


    function merge(first,more){
      if (!more) return [first];
      for (var a=[first],i=0,l=more.length;i<l;i++) a[i+1]=more[i][1];
      return a;
    }

    var cmds = {m:'moveto',l:'lineto',h:'horizontal lineto',v:'vertical lineto',c:'curveto',s:'smooth curveto',q:'quadratic curveto',t:'smooth quadratic curveto',a:'elliptical arc',z:'closepath'};
    for (var code in cmds) cmds[code.toUpperCase()]=cmds[code];
    function commands(code,args){
      if (!args) args=[{}];
      for (var i=args.length;i--;){
        var cmd={code:code,command:cmds[code]};
        if (code==code.toLowerCase()) cmd.relative=true;
        for (var k in args[i]) cmd[k]=args[i][k];
        args[i] = cmd;
      }
      return args;
    }


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBounds = undefined;

var _toConsumableArray2 = __webpack_require__(7);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

exports.pathToCanvas = pathToCanvas;

var _svgArcToCubicBezier = __webpack_require__(74);

var _svgArcToCubicBezier2 = _interopRequireDefault(_svgArcToCubicBezier);

var _pathBounds = __webpack_require__(208);

var _pathBounds2 = _interopRequireDefault(_pathBounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(204),
    parseSVG = _require.parseSVG,
    makeAbsolute = _require.makeAbsolute;

function pathToCanvas(d) {
  var commands = makeAbsolute(parseSVG(d));
  var parsedCommands = [];
  commands.forEach(function (command) {
    if (command.code === 'A') {
      var x0 = command.x0,
          y0 = command.y0,
          x = command.x,
          y = command.y,
          rx = command.rx,
          ry = command.ry,
          xAxisRotation = command.xAxisRotation,
          largeArc = command.largeArc,
          sweep = command.sweep;

      var curves = (0, _svgArcToCubicBezier2.default)({
        px: x0,
        py: y0,
        cx: x,
        cy: y,
        rx: rx,
        ry: ry,
        xAxisRotation: xAxisRotation,
        largeArcFlag: largeArc,
        sweepFlag: sweep
      }).map(function (curve) {
        var x1 = curve.x1,
            y1 = curve.y1,
            x2 = curve.x2,
            y2 = curve.y2,
            x = curve.x,
            y = curve.y;

        return (0, _assign2.default)({
          x1: Math.round(x1),
          y1: Math.round(y1),
          x2: Math.round(x2),
          y2: Math.round(y2),
          x: Math.round(x),
          y: Math.round(y) }, { code: 'c', command: 'curveto' });
      });
      parsedCommands.push.apply(parsedCommands, (0, _toConsumableArray3.default)(curves));
    } else {
      parsedCommands.push(command);
    }
  });
  var footprint = [0, 0];
  var prev = null;
  var canvasCommands = [];
  for (var i = 0; i < parsedCommands.length; i++) {
    var cmd = parsedCommands[i];
    if (cmd.code !== 'c') {
      var x0 = cmd.x0,
          y0 = cmd.y0;

      if (footprint[0] !== x0 || footprint[1] !== y0) {
        canvasCommands.push({ cmd: 'moveTo', args: [x0, y0] });
      }
    }
    if (cmd.code === 'M') {
      var x = cmd.x,
          y = cmd.y;

      footprint = [x, y];
      canvasCommands.push({ cmd: 'moveTo', args: [x, y] });
    } else if (cmd.code === 'L') {
      var _x = cmd.x,
          _y = cmd.y;

      footprint = [_x, _y];
      canvasCommands.push({ cmd: 'lineTo', args: [_x, _y] });
    } else if (cmd.code === 'V') {
      var _y2 = cmd.y;

      footprint = [footprint[0], _y2];
      canvasCommands.push({ cmd: 'lineTo', args: [].concat((0, _toConsumableArray3.default)(footprint)) });
    } else if (cmd.code === 'H') {
      var _x2 = cmd.x;

      footprint = [_x2, footprint[1]];
      canvasCommands.push({ cmd: 'lineTo', args: [].concat((0, _toConsumableArray3.default)(footprint)) });
    } else if (cmd.code === 'C' || cmd.code === 'c') {
      var x1 = cmd.x1,
          y1 = cmd.y1,
          x2 = cmd.x2,
          y2 = cmd.y2,
          _x3 = cmd.x,
          _y3 = cmd.y;

      footprint = [_x3, _y3];
      prev = [x1, y1];
      canvasCommands.push({ cmd: 'bezierCurveTo', args: [x1, y1, x2, y2, _x3, _y3] });
    } else if (cmd.code === 'S') {
      var _x4 = cmd.x2,
          _y4 = cmd.y2,
          _x5 = cmd.x,
          _y5 = cmd.y;

      footprint = [_x5, _y5];
      canvasCommands.push({ cmd: 'bezierCurveTo', args: [].concat((0, _toConsumableArray3.default)(prev), [_x4, _y4, _x5, _y5]) });
    } else if (cmd.code === 'Q') {
      var _x6 = cmd.x1,
          _y6 = cmd.y1,
          _x7 = cmd.x,
          _y7 = cmd.y;

      footprint = [_x7, _y7];
      prev = [_x6, _y6];
      canvasCommands.push({ cmd: 'quadraticCurveTo', args: [_x6, _y6, _x7, _y7] });
    } else if (cmd.code === 'T') {
      var _x8 = cmd.x,
          _y8 = cmd.y;

      footprint = [_x8, _y8];
      canvasCommands.push({ cmd: 'quadraticCurveTo', args: [].concat((0, _toConsumableArray3.default)(prev), [_x8, _y8]) });
    } else if (cmd.code === 'Z') {
      canvasCommands.push({ cmd: 'closePath', args: [] });
    }
  }
  return { commands: canvasCommands, d: d };
}

exports.getBounds = _pathBounds2.default;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = absolutize;

/**
 * redefine `path` with absolute coordinates
 *
 * @param {Array} path
 * @return {Array}
 */

/* eslint-disable */
function absolutize(path) {
	var startX = 0;
	var startY = 0;
	var x = 0;
	var y = 0;

	return path.map(function (seg) {
		seg = seg.slice();
		var type = seg[0];
		var command = type.toUpperCase();

		// is relative
		if (type != command) {
			seg[0] = command;
			switch (type) {
				case 'a':
					seg[6] += x;
					seg[7] += y;
					break;
				case 'v':
					seg[1] += y;
					break;
				case 'h':
					seg[1] += x;
					break;
				default:
					for (var i = 1; i < seg.length;) {
						seg[i++] += x;
						seg[i++] += y;
					}
			}
		}

		// update cursor state
		switch (command) {
			case 'Z':
				x = startX;
				y = startY;
				break;
			case 'H':
				x = seg[1];
				break;
			case 'V':
				y = seg[1];
				break;
			case 'M':
				x = startX = seg[1];
				y = startY = seg[2];
				break;
			default:
				x = seg[seg.length - 2];
				y = seg[seg.length - 1];
		}

		return seg;
	});
}
/* eslint-enable */

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pathBounds;
var parse = __webpack_require__(211);
var abs = __webpack_require__(207);
var normalize = __webpack_require__(210);
var isSvgPath = __webpack_require__(209);
var assert = __webpack_require__(76);

function pathBounds(path) {
  // ES6 string tpl call
  if (Array.isArray(path) && path.length === 1 && typeof path[0] === 'string') path = path[0];

  // svg path string
  if (typeof path === 'string') {
    assert(isSvgPath(path), 'String is not an SVG path.');
    path = parse(path);
  }

  assert(Array.isArray(path), 'Argument should be a string or an array of path segments.');

  path = abs(path);
  path = normalize(path);

  if (!path.length) return [0, 0, 0, 0];

  var bounds = [Infinity, Infinity, -Infinity, -Infinity];

  for (var i = 0, l = path.length; i < l; i++) {
    var points = path[i].slice(1);

    for (var j = 0; j < points.length; j += 2) {
      if (points[j + 0] < bounds[0]) bounds[0] = points[j + 0];
      if (points[j + 1] < bounds[1]) bounds[1] = points[j + 1];
      if (points[j + 0] > bounds[2]) bounds[2] = points[j + 0];
      if (points[j + 1] > bounds[3]) bounds[3] = points[j + 1];
    }
  }

  return bounds;
}

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isPath(str) {
  if (typeof str !== 'string') return false;

  str = str.trim();

  // https://www.w3.org/TR/SVG/paths.html#PathDataBNF
  if (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(str) && /[\dz]$/i.test(str) && str.length > 4) return true;

  return false;
};

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _svgArcToCubicBezier = __webpack_require__(74);

var _svgArcToCubicBezier2 = _interopRequireDefault(_svgArcToCubicBezier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = normalize;

/* eslint-disable */


function normalize(path) {
  // init state
  var prev;
  var result = [];
  var bezierX = 0;
  var bezierY = 0;
  var startX = 0;
  var startY = 0;
  var quadX = null;
  var quadY = null;
  var x = 0;
  var y = 0;

  for (var i = 0, len = path.length; i < len; i++) {
    var seg = path[i];
    var command = seg[0];

    switch (command) {
      case 'M':
        startX = seg[1];
        startY = seg[2];
        break;
      case 'A':
        var curves = (0, _svgArcToCubicBezier2.default)({
          px: x,
          py: y,
          cx: seg[6],
          cy: seg[7],
          rx: seg[1],
          ry: seg[2],
          xAxisRotation: seg[3],
          largeArcFlag: seg[4],
          sweepFlag: seg[5]
        });

        // null-curves
        if (!curves.length) continue;

        for (var j = 0, c; j < curves.length; j++) {
          c = curves[j];
          seg = ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y];
          if (j < curves.length - 1) result.push(seg);
        }

        break;
      case 'S':
        // default control point
        var cx = x;
        var cy = y;
        if (prev == 'C' || prev == 'S') {
          cx += cx - bezierX; // reflect the previous command's control
          cy += cy - bezierY; // point relative to the current point
        }
        seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]];
        break;
      case 'T':
        if (prev == 'Q' || prev == 'T') {
          quadX = x * 2 - quadX; // as with 'S' reflect previous control point
          quadY = y * 2 - quadY;
        } else {
          quadX = x;
          quadY = y;
        }
        seg = quadratic(x, y, quadX, quadY, seg[1], seg[2]);
        break;
      case 'Q':
        quadX = seg[1];
        quadY = seg[2];
        seg = quadratic(x, y, seg[1], seg[2], seg[3], seg[4]);
        break;
      case 'L':
        seg = line(x, y, seg[1], seg[2]);
        break;
      case 'H':
        seg = line(x, y, seg[1], y);
        break;
      case 'V':
        seg = line(x, y, x, seg[1]);
        break;
      case 'Z':
        seg = line(x, y, startX, startY);
        break;
    }

    // update state
    prev = command;
    x = seg[seg.length - 2];
    y = seg[seg.length - 1];
    if (seg.length > 4) {
      bezierX = seg[seg.length - 4];
      bezierY = seg[seg.length - 3];
    } else {
      bezierX = x;
      bezierY = y;
    }
    result.push(seg);
  }

  return result;
}

function line(x1, y1, x2, y2) {
  return ['C', x1, y1, x2, y2, x2, y2];
}

function quadratic(x1, y1, cx, cy, x2, y2) {
  return ['C', x1 / 3 + 2 / 3 * cx, y1 / 3 + 2 / 3 * cy, x2 / 3 + 2 / 3 * cx, y2 / 3 + 2 / 3 * cy, x2, y2];
}
/* eslint-enable */

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = parse;

/**
 * expected argument lengths
 * @type {Object}
 */
/* eslint-disable */
var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0

	/**
  * segment pattern
  * @type {RegExp}
  */

};var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

function parse(path) {
	var data = [];
	path.replace(segment, function (_, command, args) {
		var type = command.toLowerCase();
		args = parseValues(args);

		// overloaded moveTo
		if (type == 'm' && args.length > 2) {
			data.push([command].concat(args.splice(0, 2)));
			type = 'l';
			command = command == 'm' ? 'l' : 'L';
		}

		while (true) {
			if (args.length == length[type]) {
				args.unshift(command);
				return data.push(args);
			}
			if (args.length < length[type]) throw new Error('malformed path data');
			data.push([command].concat(args.splice(0, length[type])));
		}
	});
	return data;
}

var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

function parseValues(args) {
	var numbers = args.match(number);
	return numbers ? numbers.map(Number) : [];
}
/* eslint-enable */

/***/ }),
/* 212 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(213);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(212);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106), __webpack_require__(72)))

/***/ })
/******/ ]);
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(147), __esModule: true };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(150), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(9);
var call = __webpack_require__(83);
var isArrayIter = __webpack_require__(81);
var anObject = __webpack_require__(6);
var toLength = __webpack_require__(37);
var getIterFn = __webpack_require__(67);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(88);
var enumBugKeys = __webpack_require__(52);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(13);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(50);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(21);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(45);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(131);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(128);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(75);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(75);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(6);
var dPs = __webpack_require__(166);
var enumBugKeys = __webpack_require__(52);
var IE_PROTO = __webpack_require__(60)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(51)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(79).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(62);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {



/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(22);

var _promise2 = _interopRequireDefault(_promise);

exports.createCanvas = createCanvas;
exports.loadImage = loadImage;
exports.getContainer = getContainer;
exports.shim = shim;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCanvas() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 150;

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function loadImage(src) {
  var img = document.createElement('img');
  img.crossOrigin = 'anonymous';

  var promise = new _promise2.default(function (resolve) {
    img.addEventListener('load', function () {
      resolve(img);
    });
  });
  img.src = src;
  return promise;
}

function getContainer(container) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  if (!container) {
    throw new Error('Container is not defined or cannot found.');
  }
  return container;
}

function shim() {}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(48);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = __webpack_require__(17);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(130);

var _entries2 = _interopRequireDefault(_entries);

var _asyncToGenerator2 = __webpack_require__(47);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(22);

var _promise2 = _interopRequireDefault(_promise);

var _map = __webpack_require__(126);

var _map2 = _interopRequireDefault(_map);

var _platform = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = __webpack_require__(104);

var loadedResources = new _map2.default();

/**
  loadTexture({
    id: 'bird1',
    src: 'http://some.path/brid1.png'
  })
 */

var Resource = {
  loadTexture: function loadTexture(texture) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30000;

    if (typeof texture === 'string') {
      texture = { src: texture };
    }
    if (!texture.id) {
      texture.id = texture.src;
    }

    var mapKey = texture.id;

    if (!loadedResources.has(mapKey)) {
      return new _promise2.default(function (resolve, reject) {
        var timer = setTimeout(function () {
          reject(new Error('load img timeout'));
        }, timeout);

        (0, _platform.loadImage)(texture.src).then(function (img) {
          // save image not canvas for svg preserveAspectRatio
          resolve({ img: img, texture: texture, fromCache: false });
          loadedResources.set(mapKey, img);
          clearTimeout(timer);
        });
      });
    }
    return _promise2.default.resolve({
      img: loadedResources.get(mapKey),
      texture: texture,
      fromCache: true
    });
  },

  /**
    u3d-json compatible: https://www.codeandweb.com/texturepacker
    {
      frames: {
        key: {
          frame: {x, y, w, h},
          trimmed: ...,
          rotated: true|false,
          spriteSourceSize: {x, y, w, h},
          sourceSize: {w, h}
        }
      }
    }
   */
  loadFrames: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(src, frameData) {
      var texture, frames;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof frameData === 'string')) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return axios.get(frameData);

            case 3:
              frameData = _context.sent;

              frameData = frameData.data;

            case 5:
              _context.next = 7;
              return this.loadTexture(src);

            case 7:
              texture = _context.sent;
              frames = frameData.frames;


              (0, _entries2.default)(frames).forEach(function (_ref2) {
                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
                    key = _ref3[0],
                    frame = _ref3[1];

                var _frame$sourceSize = frame.sourceSize,
                    w = _frame$sourceSize.w,
                    h = _frame$sourceSize.h;


                var canvas = (0, _platform.createCanvas)(w, h),
                    srcRect = frame.frame,
                    rect = frame.spriteSourceSize,
                    context = canvas.getContext('2d');

                var rotated = frame.rotated;

                context.save();

                if (rotated) {
                  context.translate(0, h);
                  context.rotate(-0.5 * Math.PI);

                  var tmp = rect.y;
                  rect.y = rect.x;
                  rect.x = h - srcRect.h - tmp;

                  context.drawImage(texture.img, srcRect.x, srcRect.y, srcRect.h, srcRect.w, rect.x, rect.y, rect.h, rect.w);
                } else {
                  context.drawImage(texture.img, srcRect.x, srcRect.y, srcRect.w, srcRect.h, rect.x, rect.y, rect.w, rect.h);
                }

                context.restore();

                loadedResources.set(key, canvas);
              });

              return _context.abrupt('return', texture);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadFrames(_x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return loadFrames;
  }()
};

exports.default = Resource;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseValue = exports.deprecate = exports.setDeprecation = exports.attr = exports.appendUnit = exports.rectVertices = exports.rectToBox = exports.boxUnion = exports.boxEqual = exports.boxToRect = exports.boxIntersect = exports.parseStringTransform = exports.fourValuesShortCut = exports.parseColorString = exports.parseStringFloat = exports.parseStringInt = exports.oneOrTwoValues = exports.parseColor = exports.Color = undefined;

var _utils = __webpack_require__(206);

var _decorators = __webpack_require__(205);

exports.Color = _utils.Color;
exports.parseColor = _utils.parseColor;
exports.oneOrTwoValues = _utils.oneOrTwoValues;
exports.parseStringInt = _utils.parseStringInt;
exports.parseStringFloat = _utils.parseStringFloat;
exports.parseColorString = _utils.parseColorString;
exports.fourValuesShortCut = _utils.fourValuesShortCut;
exports.parseStringTransform = _utils.parseStringTransform;
exports.boxIntersect = _utils.boxIntersect;
exports.boxToRect = _utils.boxToRect;
exports.boxEqual = _utils.boxEqual;
exports.boxUnion = _utils.boxUnion;
exports.rectToBox = _utils.rectToBox;
exports.rectVertices = _utils.rectVertices;
exports.appendUnit = _utils.appendUnit;
exports.attr = _decorators.attr;
exports.setDeprecation = _decorators.setDeprecation;
exports.deprecate = _decorators.deprecate;
exports.parseValue = _decorators.parseValue;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var normalizeHeaderName = __webpack_require__(119);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(69);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(69);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(99)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(152), __esModule: true };

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(22);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(199);


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(93);
var hide = __webpack_require__(10);
var has = __webpack_require__(13);
var Iterators = __webpack_require__(18);
var $iterCreate = __webpack_require__(163);
var setToStringTag = __webpack_require__(29);
var getPrototypeOf = __webpack_require__(87);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(38)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(13);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(23);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(27);
var createDesc = __webpack_require__(28);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(63);
var has = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(80);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(10);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(61)('keys');
var uid = __webpack_require__(38);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(35);
var wksExt = __webpack_require__(66);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(34);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(18);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(44);

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = __webpack_require__(48);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(47);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = __webpack_require__(17);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(21);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(33);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(31);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(32);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(46);

var _symbol2 = _interopRequireDefault(_symbol);

var _spriteCore = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _viewport = (0, _symbol2.default)('_viewport');

var ExLayer = function (_Layer) {
  (0, _inherits3.default)(ExLayer, _Layer);

  function ExLayer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        context = _ref.context,
        handleEvent = _ref.handleEvent,
        evaluateFPS = _ref.evaluateFPS,
        renderMode = _ref.renderMode,
        resolution = _ref.resolution;

    (0, _classCallCheck3.default)(this, ExLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExLayer.__proto__ || (0, _getPrototypeOf2.default)(ExLayer)).call(this, { context: context, handleEvent: handleEvent, evaluateFPS: evaluateFPS, renderMode: renderMode }));

    if (resolution) {
      _this.resolution = resolution;
    }
    return _this;
  }

  (0, _createClass3.default)(ExLayer, [{
    key: 'isVisible',
    value: function isVisible(sprite) {
      if (!(0, _get3.default)(ExLayer.prototype.__proto__ || (0, _getPrototypeOf2.default)(ExLayer.prototype), 'isVisible', this).call(this, sprite)) return false;

      var _resolution = (0, _slicedToArray3.default)(this.resolution, 2),
          maxWidth = _resolution[0],
          maxHeigth = _resolution[1];

      var box = sprite.renderBox;
      if (box[0] > maxWidth || box[1] > maxHeigth || box[2] < 0 || box[3] < 0) {
        return false;
      }
      return true;
    }
  }, {
    key: 'getSnapshot',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var snapshotCanvas, children;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.prepareRender();

              case 2:
                snapshotCanvas = this.canvas.cloneNode(true);

                snapshotCanvas.getContext('2d').drawImage(this.canvas, 0, 0);
                children = this.children.map(function (child) {
                  return child.serialize();
                });
                return _context.abrupt('return', { context: snapshotCanvas, children: children });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSnapshot() {
        return _ref2.apply(this, arguments);
      }

      return getSnapshot;
    }()
  }, {
    key: 'putSnapshot',
    value: function putSnapshot(snapshot) {
      var _this2 = this;

      var outputContext = this.outputContext;

      var _resolution2 = (0, _slicedToArray3.default)(this.resolution, 2),
          width = _resolution2[0],
          height = _resolution2[1];

      outputContext.clearRect(0, 0, width, height);
      outputContext.drawImage(snapshot.context, 0, 0);

      this.clearUpdate();

      snapshot.children.forEach(function (child) {
        var node = (0, _spriteCore.createNode)(child.nodeType);
        (0, _assign2.default)(node.attrs(), JSON.parse(child.attrs));
        _this2.appendChild(node, false);
      });

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.dispatchEvent('update', {
          target: child, context: child.context, renderBox: child.renderBox, lastRenderBox: child.lastRenderBox
        }, true);

        child.lastRenderBox = child.renderBox;
      }

      return this.children;
    }
  }, {
    key: 'canvas',
    get: function get() {
      return this.outputContext.canvas;
    }
  }, {
    key: 'id',
    get: function get() {
      return this.canvas.dataset.layerId;
    }
  }, {
    key: 'resolution',
    get: function get() {
      return [this.canvas.width, this.canvas.height];
    },
    set: function set(resolution) {
      var _resolution3 = (0, _slicedToArray3.default)(resolution, 2),
          width = _resolution3[0],
          height = _resolution3[1];

      var outputCanvas = this.outputContext.canvas;
      outputCanvas.width = width;
      outputCanvas.height = height;
      this.outputContext.clearRect(0, 0, width, height);

      if (this.shadowContext) {
        var shadowCanvas = this.shadowContext.canvas;
        shadowCanvas.width = width;
        shadowCanvas.height = height;
        this.shadowContext.clearRect(0, 0, width, height);
      }

      this.children.forEach(function (child) {
        delete child.lastRenderBox;
        child.forceUpdate();
      });
    }
  }, {
    key: 'viewport',
    set: function set(_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
          width = _ref4[0],
          height = _ref4[1];

      this.canvas.style.width = width + 'px';
      this.canvas.style.height = height + 'px';
      this[_viewport] = [width, height];
    },
    get: function get() {
      return this[_viewport];
    }
  }, {
    key: 'zIndex',
    get: function get() {
      return this.canvas.style.zIndex;
    },
    set: function set(zIndex) {
      this.canvas.style.zIndex = zIndex;
    }
  }]);
  return ExLayer;
}(_spriteCore.Layer);

exports.default = ExLayer;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var settle = __webpack_require__(111);
var buildURL = __webpack_require__(114);
var parseHeaders = __webpack_require__(120);
var isURLSameOrigin = __webpack_require__(118);
var createError = __webpack_require__(72);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(113);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(116);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(99)))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(110);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(123);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(134);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(46);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(5).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(59);
var ctx = __webpack_require__(9);
var anInstance = __webpack_require__(49);
var forOf = __webpack_require__(25);
var $iterDefine = __webpack_require__(54);
var step = __webpack_require__(85);
var setSpecies = __webpack_require__(96);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(55).fastKey;
var validate = __webpack_require__(64);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(34);
var from = __webpack_require__(155);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(1);
var meta = __webpack_require__(55);
var fails = __webpack_require__(12);
var hide = __webpack_require__(10);
var redefineAll = __webpack_require__(59);
var forOf = __webpack_require__(25);
var anInstance = __webpack_require__(49);
var isObject = __webpack_require__(8);
var setToStringTag = __webpack_require__(29);
var dP = __webpack_require__(5).f;
var each = __webpack_require__(157)(0);
var DESCRIPTORS = __webpack_require__(7);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(51)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(18);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(6);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(88);
var hiddenKeys = __webpack_require__(52).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(13);
var toObject = __webpack_require__(30);
var IE_PROTO = __webpack_require__(60)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(13);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(156)(false);
var IE_PROTO = __webpack_require__(60)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(12);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(26);
var toIObject = __webpack_require__(11);
var isEnum = __webpack_require__(27).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(56);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(23);
var ctx = __webpack_require__(9);
var forOf = __webpack_require__(25);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(6);
var aFunction = __webpack_require__(23);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(9);
var invoke = __webpack_require__(162);
var html = __webpack_require__(79);
var cel = __webpack_require__(51);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(24)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 99 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _get2 = __webpack_require__(31);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(45);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(21);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(33);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(32);

var _inherits3 = _interopRequireDefault(_inherits2);

var _slicedToArray2 = __webpack_require__(17);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _dec, _dec2, _desc, _value, _class, _class2, _temp;

var _spriteCore = __webpack_require__(20);

var _spriteUtils = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function ticksToD(axis) {
  if (!axis) return;

  var _axis$attr = axis.attr(),
      direction = _axis$attr.direction,
      ticks = _axis$attr.ticks,
      length = _axis$attr.length,
      vLength = _axis$attr.vLength,
      font = _axis$attr.font,
      lineWidth = _axis$attr.lineWidth,
      color = _axis$attr.color,
      axisScales = _axis$attr.axisScales;

  var originTicks = ticks.slice(0);

  var axisTicks = ticks.slice(0);
  if (axisScales.length) {
    axisTicks = axisTicks.map(function (tick) {
      return axisScales.reduce(function (v, s) {
        return s(v);
      }, tick);
    });
    axisTicks = axisTicks.filter(function (tick) {
      return tick >= 0;
    });
  }

  if (axisTicks.length <= 0) {
    return;
  }
  ticks = ticks.slice(-axisTicks.length);

  if (axisScales.length) {
    var scale = axisScales[axisScales.length - 1],
        _scale$range = scale.range(),
        _scale$range2 = (0, _slicedToArray3.default)(_scale$range, 2),
        start = _scale$range2[0],
        end = _scale$range2[1],
        _scale$domain = scale.domain(),
        _scale$domain2 = (0, _slicedToArray3.default)(_scale$domain, 2),
        from = _scale$domain2[0],
        to = _scale$domain2[1];


    if (start < axisTicks[0]) {
      ticks.unshift(from);
      axisTicks.unshift(start);
    }
    if (end > axisTicks[axisTicks.length - 1]) {
      ticks.push(to);
      axisTicks.push(end);
    }
  }

  var dist = axisTicks[axisTicks.length - 1] - axisTicks[0];
  if (length === 'auto') length = dist;

  var d = void 0;

  var points = axisTicks.map(function (tick) {
    return length * (tick - axisTicks[0]) / dist;
  });

  var offsetY = 0,
      offsetX = 0,
      offsetX0 = 0;

  axis.remove();
  ticks.forEach(function (data, i) {
    if (originTicks.indexOf(data) === -1) return;

    var label = new _spriteCore.Label();

    label.text = data;
    label.attr({ font: font, fillColor: color });

    var _label$contentSize = (0, _slicedToArray3.default)(label.contentSize, 2),
        w = _label$contentSize[0],
        h = _label$contentSize[1];

    offsetY = Math.max(offsetY, h);
    offsetX = Math.max(offsetX, w);

    if (i === 0) {
      offsetX0 = w;
    }

    var x = points[i];
    if (x != null) {
      if (direction === 'top') {
        label.attr({
          pos: [offsetX0 + x - Math.round(w / 2), 0]
        });
      } else if (direction === 'bottom') {
        label.attr({
          pos: [offsetX0 + x - Math.round(w / 2), vLength + 5]
        });
      } else if (direction === 'left') {
        label.attr({
          pos: [vLength + 5, x]
        });
      } else if (direction === 'right') {
        label.attr({
          pos: [0, x]
        });
      }
      axis.appendChild(label);
    }
  });

  var rect = void 0;
  if (direction === 'top') {
    d = 'M0 ' + vLength + ' h' + length;
    points.forEach(function (point) {
      d += 'M' + point + ' 0 v' + vLength;
    });
    rect = [offsetX0, offsetY + 5, length, vLength];
  } else if (direction === 'bottom') {
    d = 'M0 0 h' + length;
    points.forEach(function (point) {
      d += 'M' + Math.round(point) + ' 0 v' + vLength;
    });
    rect = [offsetX0, 0, length, vLength];
  } else if (direction === 'left') {
    d = 'M0 0 v' + length;
    points.forEach(function (point) {
      d += 'M0 ' + point + ' h' + vLength;
    });
    rect = [0, offsetY / 2, vLength, length];
  } else if (direction === 'right') {
    d = 'M' + (offsetX + 5) + ' 0 v' + length;
    points.forEach(function (point) {
      d += 'M' + (offsetX + 5 - vLength) + ' ' + point + ' h' + vLength;
    });

    rect = [offsetX + 5, offsetY / 2, vLength, length];
  }

  var path = new _spriteCore.Path();
  path.attr({
    d: d,
    lineWidth: lineWidth,
    strokeColor: color,
    pos: [rect[0], rect[1]]
  });

  axis.appendChild(path);
}

var AxisSpriteAttr = (_dec = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringFloat), _dec2 = (0, _spriteUtils.parseValue)(_spriteUtils.parseColorString), (_class = function (_Group$Attr) {
  (0, _inherits3.default)(AxisSpriteAttr, _Group$Attr);

  function AxisSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, AxisSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AxisSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(AxisSpriteAttr)).call(this, subject));

    _this.setDefault({
      length: 'auto',
      vLength: 10,
      ticks: [0, 100],
      direction: 'top',

      lineWidth: 1,
      color: 'black',
      renderMode: 'stroke', // stroke, fill

      font: '24px Arial',
      axisScales: []
    });
    return _this;
  }

  (0, _createClass3.default)(AxisSpriteAttr, [{
    key: 'font',
    set: function set(val) {
      this.clearCache();
      this.set('font', val);
      ticksToD(this.subject);
    }
  }, {
    key: 'direction',
    set: function set(val) {
      this.clearCache();
      this.set('direction', val);
      ticksToD(this.subject);
    }
  }, {
    key: 'length',
    set: function set(val) {
      this.clearCache();
      this.set('length', val);
      ticksToD(this.subject);
    }
  }, {
    key: 'vLength',
    set: function set(val) {
      this.clearCache();
      this.set('vLength', Math.round(val));
      ticksToD(this.subject);
    }
  }, {
    key: 'ticks',
    set: function set(ticks) {
      this.clearCache();
      this.set('ticks', ticks.sort(function (a, b) {
        return a - b;
      }));
      ticksToD(this.subject);
    }

    // set d3 scales

  }, {
    key: 'axisScales',
    set: function set(val) {
      this.clearCache();
      this.set('axisScales', val);
      ticksToD(this.subject);
    }
  }, {
    key: 'lineWidth',
    set: function set(val) {
      this.clearCache();
      this.set('lineWidth', val);
      ticksToD(this.subject);
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.clearCache();
      this.set('color', val);
      ticksToD(this.subject);
    }
  }]);
  return AxisSpriteAttr;
}(_spriteCore.Group.Attr), (_applyDecoratedDescriptor(_class.prototype, 'font', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'font'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'direction', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'direction'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'length', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'length'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'vLength', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'vLength'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'ticks', [_spriteUtils.attr, _dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'ticks'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'axisScales', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'axisScales'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineWidth', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_spriteUtils.attr, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype)), _class));
var Axis = (_temp = _class2 = function (_Group) {
  (0, _inherits3.default)(Axis, _Group);

  function Axis() {
    var ticks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 100];
    var opts = arguments[1];
    (0, _classCallCheck3.default)(this, Axis);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Axis.__proto__ || (0, _getPrototypeOf2.default)(Axis)).call(this, opts));

    if (ticks) {
      _this2.attr({ ticks: ticks });
    }
    return _this2;
  }

  (0, _createClass3.default)(Axis, [{
    key: 'render',
    value: function render(t, drawingContext) {
      var context = (0, _get3.default)(Axis.prototype.__proto__ || (0, _getPrototypeOf2.default)(Axis.prototype), 'render', this).call(this, t, drawingContext);
      return context;
    }
  }]);
  return Axis;
}(_spriteCore.Group), _class2.Attr = AxisSpriteAttr, _temp);
exports.default = Axis;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = __webpack_require__(48);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(22);

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = __webpack_require__(74);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(47);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = __webpack_require__(17);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = __webpack_require__(44);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(21);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(33);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(31);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(32);

var _inherits3 = _interopRequireDefault(_inherits2);

var _values = __webpack_require__(132);

var _values2 = _interopRequireDefault(_values);

var _symbol = __webpack_require__(46);

var _symbol2 = _interopRequireDefault(_symbol);

var _layer = __webpack_require__(68);

var _layer2 = _interopRequireDefault(_layer);

var _resource = __webpack_require__(41);

var _resource2 = _interopRequireDefault(_resource);

var _spriteCore = __webpack_require__(20);

var _platform = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _layerMap = (0, _symbol2.default)('layerMap'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _layers = (0, _symbol2.default)('layers'),
    _snapshot = (0, _symbol2.default)('snapshot'),
    _viewport = (0, _symbol2.default)('viewport'),
    _resolution = (0, _symbol2.default)('resolution');

function sortLayer(paper) {
  var layers = (0, _values2.default)(paper[_layerMap]);

  layers.sort(function (a, b) {
    if (b.zIndex === a.zIndex) {
      return b.zOrder - a.zOrder;
    }
    return b.zIndex - a.zIndex;
  });

  paper[_layers] = layers;
}

var _default = function (_BaseNode) {
  (0, _inherits3.default)(_default, _BaseNode);

  function _default(container, width, height) {
    (0, _classCallCheck3.default)(this, _default);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call(this));

    container = (0, _platform.getContainer)(container);
    _this.container = container;

    _this[_viewport] = [width || container.clientWidth, height || container.clientHeight];
    _this[_resolution] = [_this.viewport[0], _this.viewport[1]];
    _this[_zOrder] = 0;
    _this[_layerMap] = {};
    _this[_layers] = [];
    _this[_snapshot] = (0, _platform.createCanvas)();

    // d3-friendly
    _this.namespaceURI = 'http://spritejs.org/scene';
    var that = _this;
    _this.ownerDocument = {
      createElementNS: function createElementNS(uri, name) {
        return that.layer(name);
      }
    };

    var events = ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'click', 'dblclick'];

    _this.delegateEvent.apply(_this, events);
    return _this;
  }

  (0, _createClass3.default)(_default, [{
    key: 'insertBefore',


    // d3-friendly
    value: function insertBefore(node, next) {
      if (this.container) {
        return this.container.insertBefore(node, next);
      }
    }
  }, {
    key: 'appendChild',
    value: function appendChild(layer) {
      return this.appendLayer(layer);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(layer) {
      return this.removeLayer(layer);
    }
  }, {
    key: 'setViewport',
    value: function setViewport(width, height) {
      this.viewport = [width, height];
      return this;
    }
  }, {
    key: 'setResolution',
    value: function setResolution(width, height) {
      this.resolution = [width, height];
      return this;
    }
  }, {
    key: 'toGlobalPos',
    value: function toGlobalPos(x, y) {
      var resolution = this.resolution,
          viewport = this.viewport;

      x = x * viewport[0] / resolution[0];
      y = y * viewport[1] / resolution[1];

      return [x, y];
    }
  }, {
    key: 'toLocalPos',
    value: function toLocalPos(x, y) {
      var resolution = this.resolution,
          viewport = this.viewport;

      x = x * resolution[0] / viewport[0];
      y = y * resolution[1] / viewport[1];

      return [x, y];
    }
  }, {
    key: 'delegateEvent',
    value: function delegateEvent() {
      var _this2 = this;

      for (var _len = arguments.length, events = Array(_len), _key = 0; _key < _len; _key++) {
        events[_key] = arguments[_key];
      }

      events.forEach(function (event) {
        if (typeof event === 'string') {
          event = { type: event, passive: true };
        }

        var _event = event,
            type = _event.type,
            passive = _event.passive;


        _this2.container.addEventListener(type, function (e) {
          var layers = _this2[_layers];
          var evtArgs = {
            originalEvent: e,
            type: type,
            stopDispatch: function stopDispatch() {
              this.terminated = true;
            }
          };

          // mouse event layerX, layerY value change while browser scaled.
          if (e instanceof CustomEvent) {
            (0, _assign2.default)(evtArgs, e.detail);
            var x = evtArgs.x,
                y = evtArgs.y;

            if (x != null && y != null) {
              var _toGlobalPos = _this2.toGlobalPos(x, y),
                  _toGlobalPos2 = (0, _slicedToArray3.default)(_toGlobalPos, 2),
                  originalX = _toGlobalPos2[0],
                  originalY = _toGlobalPos2[1];

              (0, _assign2.default)(evtArgs, {
                layerX: x, layerY: y, originalX: originalX, originalY: originalY, x: x, y: y
              });
            }
          } else {
            var _e$target$getBounding = e.target.getBoundingClientRect(),
                left = _e$target$getBounding.left,
                top = _e$target$getBounding.top;

            var _originalX = void 0,
                _originalY = void 0;

            if (e.changedTouches) {
              // mobile
              var _e$changedTouches$ = e.changedTouches[0],
                  clientX = _e$changedTouches$.clientX,
                  clientY = _e$changedTouches$.clientY;


              _originalX = Math.round(clientX - left);
              _originalY = Math.round(clientY - top);
            } else {
              _originalX = Math.round(e.clientX - left);
              _originalY = Math.round(e.clientY - top);
            }

            var _toLocalPos = _this2.toLocalPos(_originalX, _originalY),
                _toLocalPos2 = (0, _slicedToArray3.default)(_toLocalPos, 2),
                layerX = _toLocalPos2[0],
                layerY = _toLocalPos2[1];

            (0, _assign2.default)(evtArgs, {
              layerX: layerX, layerY: layerY, originalX: _originalX, originalY: _originalY, x: layerX, y: layerY
            });
          }

          for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            if (layer.handleEvent) {
              layer.dispatchEvent(type, evtArgs);
            }
          }
        }, { passive: passive });
      });
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var container = this.container;
      container.dispatchEvent(new CustomEvent(type, { detail: evt }));
      (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'dispatchEvent', this).call(this, type, evt, true);
    }
  }, {
    key: 'preload',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this3 = this;

        for (var _len2 = arguments.length, resources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          resources[_key2] = arguments[_key2];
        }

        var ret, tasks, i, res, task, id, src;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ret = [], tasks = [];


                for (i = 0; i < resources.length; i++) {
                  res = resources[i];
                  task = void 0;


                  if (typeof res === 'string') {
                    task = _resource2.default.loadTexture(res);
                  } else if (Array.isArray(res)) {
                    task = _resource2.default.loadFrames.apply(_resource2.default, (0, _toConsumableArray3.default)(res));
                  } else {
                    id = res.id, src = res.src;

                    task = _resource2.default.loadTexture({ id: id, src: src });
                  }

                  tasks.push(task.then(function (r) {
                    ret.push(r);
                    _this3.dispatchEvent('preload', {
                      target: _this3, current: r, loaded: ret, resources: resources
                    });
                  }));
                }

                _context.next = 4;
                return _promise2.default.all(tasks);

              case 4:
                return _context.abrupt('return', ret);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preload() {
        return _ref.apply(this, arguments);
      }

      return preload;
    }()
  }, {
    key: 'layer',
    value: function layer() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { handleEvent: true };

      if (typeof opts === 'number') {
        opts = { zIndex: opts };
      }
      if (!this.hasLayer(id)) {
        var zIndex = 0;
        if (opts.zIndex != null) {
          zIndex = opts.zIndex;
          delete opts.zIndex;
        }

        var context = opts.context || (0, _platform.createCanvas)().getContext('2d');
        var canvas = context.canvas;
        canvas.dataset.layerId = id;
        canvas.style.position = 'absolute';
        canvas.style.left = 0;
        canvas.style.top = 0;
        opts.context = context;
        var layer = new _layer2.default(opts);
        this.appendLayer(layer, zIndex);
      }

      return this[_layerMap][id];
    }
  }, {
    key: 'appendLayer',
    value: function appendLayer(layer) {
      var zIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var id = layer.id;

      if (this.hasLayer(id) && this[_layerMap][id] !== layer) {
        throw new Error('layer ' + id + ' already exists! remove first...');
      }

      this.removeLayer(layer);

      this[_layerMap][id] = layer;
      layer.connect(this, this[_zOrder]++, zIndex);
      layer.viewport = this.viewport;
      layer.resolution = this.resolution;

      sortLayer(this);
      return layer;
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer(layer) {
      var layerID = void 0;
      if (typeof layer === 'string') {
        layerID = layer;
        layer = this[_layerMap][layer];
      } else {
        layerID = layer.id;
      }

      if (this.hasLayer(layer)) {
        layer.disconnect(this);
        delete this[_layerMap][layerID];
        sortLayer(this);
        return layer;
      }

      return null;
    }
  }, {
    key: 'hasLayer',
    value: function hasLayer(layer) {
      var layerID = void 0;
      if (typeof layer === 'string') {
        layerID = layer;
        layer = this[_layerMap][layer];
      } else {
        layerID = layer.id;
      }
      return layer && this[_layerMap][layerID] === layer;
    }
  }, {
    key: 'snapshot',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var canvas, _viewport2, width, height, layers, ctx, renderTasks;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                canvas = this[_snapshot];
                _viewport2 = (0, _slicedToArray3.default)(this.viewport, 2), width = _viewport2[0], height = _viewport2[1];


                canvas.width = width;
                canvas.height = height;

                layers = this[_layers].slice(0).reverse();
                ctx = canvas.getContext('2d');
                renderTasks = layers.map(function (layer) {
                  return layer.prepareRender();
                });
                _context2.next = 9;
                return _promise2.default.all(renderTasks);

              case 9:

                layers.forEach(function (layer) {
                  return ctx.drawImage(layer.canvas, 0, 0, width, height);
                });

                return _context2.abrupt('return', canvas);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function snapshot() {
        return _ref2.apply(this, arguments);
      }

      return snapshot;
    }()
  }, {
    key: 'width',
    get: function get() {
      return this.viewport[0];
    }
  }, {
    key: 'height',
    get: function get() {
      return this.viewport[1];
    }
  }, {
    key: 'distortion',
    get: function get() {
      return this.viewport[1] * this.resolution[0] / (this.viewport[0] * this.resolution[1]);
    }
  }, {
    key: 'viewport',
    set: function set(_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
          width = _ref4[0],
          height = _ref4[1];

      if (width === 'auto') {
        width = this.container.clientWidth;
      }
      if (height === 'auto') {
        height = this.container.clientHeight;
      }
      this[_viewport] = [width, height];
      this[_layers].forEach(function (layer) {
        layer.viewport = [width, height];
      });
    },
    get: function get() {
      return this[_viewport];
    }
  }, {
    key: 'resolution',
    set: function set(_ref5) {
      var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
          width = _ref6[0],
          height = _ref6[1];

      this[_resolution] = [width, height];
      this[_layers].forEach(function (layer) {
        layer.resolution = [width, height];
      });
    },
    get: function get() {
      return this[_resolution];
    }
  }]);
  return _default;
}(_spriteCore.BaseNode);

exports.default = _default;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = __webpack_require__(45);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _assign = __webpack_require__(44);

var _assign2 = _interopRequireDefault(_assign);

var _promise = __webpack_require__(22);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(21);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(33);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(31);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(32);

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class, _class2, _temp;

var _spriteCore = __webpack_require__(20);

var _spriteUtils = __webpack_require__(42);

var _resource = __webpack_require__(41);

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var ResAttr = (_class = function (_Sprite$Attr) {
  (0, _inherits3.default)(ResAttr, _Sprite$Attr);

  function ResAttr() {
    (0, _classCallCheck3.default)(this, ResAttr);
    return (0, _possibleConstructorReturn3.default)(this, (ResAttr.__proto__ || (0, _getPrototypeOf2.default)(ResAttr)).apply(this, arguments));
  }

  (0, _createClass3.default)(ResAttr, [{
    key: 'loadTextures',
    value: function loadTextures(textures) {
      var _this2 = this;

      // adaptive textures
      var promises = textures.map(function (texture) {
        if (texture.image) {
          return _promise2.default.resolve({ img: texture.image, texture: texture });
        }
        return _resource2.default.loadTexture(texture);
      });
      _promise2.default.all(promises).then(function (textures) {
        var res = textures.map(function (_ref) {
          var img = _ref.img,
              texture = _ref.texture,
              fromCache = _ref.fromCache;

          if (!fromCache) {
            _this2.clearCache();
          }
          return (0, _assign2.default)({}, texture, { image: img });
        });
        (0, _get3.default)(ResAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(ResAttr.prototype), 'loadTextures', _this2).call(_this2, res);
      });
    }
  }, {
    key: 'textures',
    set: function set(textures) {
      if (!Array.isArray(textures)) {
        textures = [textures];
      }

      textures = textures.map(function (texture) {
        if (typeof texture === 'string') {
          texture = { src: texture };
        } else if (!texture.src && !texture.id && !texture.image) {
          texture = { image: texture };
        }

        return texture;
      });

      this.set('textures', textures);
      this.loadTextures(textures);
    }
  }]);
  return ResAttr;
}(_spriteCore.Sprite.Attr), (_applyDecoratedDescriptor(_class.prototype, 'textures', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textures'), _class.prototype)), _class);
var ResSprite = (_temp = _class2 = function (_Sprite) {
  (0, _inherits3.default)(ResSprite, _Sprite);

  function ResSprite() {
    (0, _classCallCheck3.default)(this, ResSprite);
    return (0, _possibleConstructorReturn3.default)(this, (ResSprite.__proto__ || (0, _getPrototypeOf2.default)(ResSprite)).apply(this, arguments));
  }

  return ResSprite;
}(_spriteCore.Sprite), _class2.Attr = ResAttr, _temp);
exports.default = ResSprite;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = exports.Matrix = undefined;

var _matrix = __webpack_require__(203);

var _matrix2 = _interopRequireDefault(_matrix);

var _vector = __webpack_require__(204);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Matrix = _matrix2.default;
exports.Vector = _vector2.default;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(105);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var bind = __webpack_require__(73);
var Axios = __webpack_require__(107);
var defaults = __webpack_require__(43);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(70);
axios.CancelToken = __webpack_require__(106);
axios.isCancel = __webpack_require__(71);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(121);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(70);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(43);
var utils = __webpack_require__(4);
var InterceptorManager = __webpack_require__(108);
var dispatchRequest = __webpack_require__(109);
var isAbsoluteURL = __webpack_require__(117);
var combineURLs = __webpack_require__(115);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var transformData = __webpack_require__(112);
var isCancel = __webpack_require__(71);
var defaults = __webpack_require__(43);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(72);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = exports.Paper2D = exports.Scene = exports.Group = exports.Matrix = exports.Effects = exports.createNode = exports.registerNodeType = exports.Axis = exports.parseColor = exports.Color = exports.Path = exports.Layer = exports.Label = exports.Resource = exports.Sprite = exports.BaseSprite = exports.BaseNode = exports.version = undefined;

var _spriteUtils = __webpack_require__(42);

var _spriteCore = __webpack_require__(20);

var _sprite = __webpack_require__(102);

var _sprite2 = _interopRequireDefault(_sprite);

var _layer = __webpack_require__(68);

var _layer2 = _interopRequireDefault(_layer);

var _scene = __webpack_require__(101);

var _scene2 = _interopRequireDefault(_scene);

var _resource = __webpack_require__(41);

var _resource2 = _interopRequireDefault(_resource);

var _axis = __webpack_require__(100);

var _axis2 = _interopRequireDefault(_axis);

var _spriteMath = __webpack_require__(103);

var _platform = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_platform.shim) {
  (0, _platform.shim)();
}

(0, _spriteCore.registerNodeType)('layer', _layer2.default, true);
(0, _spriteCore.registerNodeType)('sprite', _sprite2.default);
(0, _spriteCore.registerNodeType)('axis', _axis2.default);

function Paper2D() {
  (0, _spriteUtils.setDeprecation)('spritejs.Paper2D', 'Instead use new spritejs.Scene.');

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(_scene2.default, [null].concat(args)))();
}

var version = '1.18.3';

exports.version = version;
exports.BaseNode = _spriteCore.BaseNode;
exports.BaseSprite = _spriteCore.BaseSprite;
exports.Sprite = _sprite2.default;
exports.Resource = _resource2.default;
exports.Label = _spriteCore.Label;
exports.Layer = _layer2.default;
exports.Path = _spriteCore.Path;
exports.Color = _spriteUtils.Color;
exports.parseColor = _spriteUtils.parseColor;
exports.Axis = _axis2.default;
exports.registerNodeType = _spriteCore.registerNodeType;
exports.createNode = _spriteCore.createNode;
exports.Effects = _spriteCore.Effects;
exports.Matrix = _spriteMath.Matrix;
exports.Group = _spriteCore.Group;
exports.Scene = _scene2.default;
exports.Paper2D = Paper2D;
exports.Vector = _spriteMath.Vector;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(153), __esModule: true };

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(135);
var swizzle = __webpack_require__(201);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
__webpack_require__(173);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(14);
module.exports = __webpack_require__(171);


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(14);
module.exports = __webpack_require__(172);


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(14);
__webpack_require__(19);
__webpack_require__(175);
__webpack_require__(188);
__webpack_require__(187);
__webpack_require__(186);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(176);
module.exports = __webpack_require__(0).Number.isNaN;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(177);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(178);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(179);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(189);
module.exports = __webpack_require__(0).Object.entries;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(180);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(181);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(182);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(190);
module.exports = __webpack_require__(0).Object.values;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(14);
__webpack_require__(19);
__webpack_require__(183);
__webpack_require__(191);
__webpack_require__(192);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(14);
__webpack_require__(19);
__webpack_require__(184);
__webpack_require__(195);
__webpack_require__(194);
__webpack_require__(193);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(185);
__webpack_require__(39);
__webpack_require__(196);
__webpack_require__(197);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
__webpack_require__(19);
module.exports = __webpack_require__(66).f('iterator');


/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(25);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(37);
var toAbsoluteIndex = __webpack_require__(170);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(9);
var IObject = __webpack_require__(53);
var toObject = __webpack_require__(30);
var toLength = __webpack_require__(37);
var asc = __webpack_require__(159);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var isArray = __webpack_require__(82);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(158);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(28);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(26);
var gOPS = __webpack_require__(58);
var pIE = __webpack_require__(27);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 162 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(28);
var setToStringTag = __webpack_require__(29);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(98).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(24)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(26);
var gOPS = __webpack_require__(58);
var pIE = __webpack_require__(27);
var toObject = __webpack_require__(30);
var IObject = __webpack_require__(53);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(6);
var getKeys = __webpack_require__(26);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(86).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(8);
var anObject = __webpack_require__(6);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(9)(Function.call, __webpack_require__(57).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(62);
var defined = __webpack_require__(50);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(62);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var get = __webpack_require__(67);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(34);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(18);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(9);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(30);
var call = __webpack_require__(83);
var isArrayIter = __webpack_require__(81);
var toLength = __webpack_require__(37);
var createProperty = __webpack_require__(160);
var getIterFn = __webpack_require__(67);

$export($export.S + $export.F * !__webpack_require__(84)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(154);
var step = __webpack_require__(85);
var Iterators = __webpack_require__(18);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(54)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(76);
var validate = __webpack_require__(64);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(78)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(1);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(165) });


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(11);
var $getOwnPropertyDescriptor = __webpack_require__(57).f;

__webpack_require__(89)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(30);
var $getPrototypeOf = __webpack_require__(87);

__webpack_require__(89)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(168).set });


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var global = __webpack_require__(3);
var ctx = __webpack_require__(9);
var classof = __webpack_require__(34);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(23);
var anInstance = __webpack_require__(49);
var forOf = __webpack_require__(25);
var speciesConstructor = __webpack_require__(97);
var task = __webpack_require__(98).set;
var microtask = __webpack_require__(164)();
var newPromiseCapabilityModule = __webpack_require__(56);
var perform = __webpack_require__(91);
var promiseResolve = __webpack_require__(92);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(59)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(29)($Promise, PROMISE);
__webpack_require__(96)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(84)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(76);
var validate = __webpack_require__(64);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(78)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(93);
var META = __webpack_require__(55).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(61);
var setToStringTag = __webpack_require__(29);
var uid = __webpack_require__(38);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(66);
var wksDefine = __webpack_require__(65);
var enumKeys = __webpack_require__(161);
var isArray = __webpack_require__(82);
var anObject = __webpack_require__(6);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(63);
var createDesc = __webpack_require__(28);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(167);
var $GOPD = __webpack_require__(57);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(26);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(86).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(27).f = $propertyIsEnumerable;
  __webpack_require__(58).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(35)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(94)('Map');


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(95)('Map');


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(77)('Map') });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $entries = __webpack_require__(90)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $values = __webpack_require__(90)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(97);
var promiseResolve = __webpack_require__(92);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(56);
var perform = __webpack_require__(91);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(94)('Set');


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(95)('Set');


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(77)('Set') });


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65)('asyncIterator');


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65)('observable');


/***/ }),
/* 198 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(200);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 200 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(202);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// from https://github.com/chrisaljoudi/transformatrix.js
/**
  default:
          (1, 0, 0)
          (0, 1, 0)
 */
var Matrix = function Matrix(m) {
  m = m || [1, 0, 0, 1, 0, 0];
  this.m = m.slice(0);
};

Matrix.prototype.unit = function () {
  this.m = [1, 0, 0, 1, 0, 0];
  return this;
};

Matrix.prototype.multiply = function (m) {
  var m1 = this.m;
  var m2 = void 0;

  if (m instanceof Matrix) {
    m2 = m.m;
  } else {
    m2 = m;
  }

  var m11 = m1[0] * m2[0] + m1[2] * m2[1],
      m12 = m1[1] * m2[0] + m1[3] * m2[1],
      m21 = m1[0] * m2[2] + m1[2] * m2[3],
      m22 = m1[1] * m2[2] + m1[3] * m2[3];

  var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
      dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];

  m1[0] = m11;
  m1[1] = m12;
  m1[2] = m21;
  m1[3] = m22;
  m1[4] = dx;
  m1[5] = dy;

  return this;
};

Matrix.prototype.inverse = function () {
  var inv = new Matrix(this.m),
      invm = inv.m;

  var d = 1 / (invm[0] * invm[3] - invm[1] * invm[2]),
      m0 = invm[3] * d,
      m1 = -invm[1] * d,
      m2 = -invm[2] * d,
      m3 = invm[0] * d,
      m4 = d * (invm[2] * invm[5] - invm[3] * invm[4]),
      m5 = d * (invm[1] * invm[4] - invm[0] * invm[5]);

  invm[0] = m0;
  invm[1] = m1;
  invm[2] = m2;
  invm[3] = m3;
  invm[4] = m4;
  invm[5] = m5;

  return inv;
};

/**
  (1, 0, sx)
  (0, 1, sy)
 * */
Matrix.prototype.translate = function (x, y) {
  return this.multiply([1, 0, 0, 1, x, y]);
};

/**
    (cos, -sin, 0)
    (sin, cos, 0)
 */
Matrix.prototype.rotate = function (deg) {
  var rad = deg * Math.PI / 180,
      c = Math.cos(rad),
      s = Math.sin(rad);

  return this.multiply([c, s, -s, c, 0, 0]);
};

/**
    (1, tx, 0)
    (ty, 1, 0)
 */
Matrix.prototype.skew = function (degX, degY) {
  degY |= 0;
  var radX = degX * Math.PI / 180,
      radY = degY * Math.PI / 180;
  var tx = Math.tan(radX),
      ty = Math.tan(radY);

  return this.multiply([1, ty, tx, 1, 0, 0]);
};

/**
  (sx, 0, 0)
  (0, sy, 0)
 */
Matrix.prototype.scale = function (sx, sy) {
  return this.multiply([sx, 0, 0, sy, 0, 0]);
};

Matrix.prototype.transformPoint = function (px, py) {
  var x = px,
      y = py;
  px = x * this.m[0] + y * this.m[2] + this.m[4];
  py = x * this.m[1] + y * this.m[3] + this.m[5];

  return [px, py];
};

Matrix.prototype.transformVector = function (px, py) {
  var x = px,
      y = py;
  px = x * this.m[0] + y * this.m[2];
  py = x * this.m[1] + y * this.m[3];

  return [px, py];
};

exports.default = Matrix;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(17);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vector = function () {
  function Vector(p1) {
    var p2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];
    (0, _classCallCheck3.default)(this, Vector);

    var _p = (0, _slicedToArray3.default)(p1, 3),
        x1 = _p[0],
        y1 = _p[1],
        z1 = _p[2],
        _p2 = (0, _slicedToArray3.default)(p2, 3),
        x2 = _p2[0],
        y2 = _p2[1],
        z2 = _p2[2];

    z1 = z1 || 0;
    z2 = z2 || 0;

    this.x = x1 - x2;
    this.y = y1 - y2;
    this.z = z1 - z2;
  }

  (0, _createClass3.default)(Vector, [{
    key: "unit",
    value: function unit() {
      var length = this.length;
      return new Vector([this.x / length, this.y / length, this.z / length]);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      var x1 = this.x,
          y1 = this.y,
          z1 = this.z,
          x2 = v.x,
          y2 = v.y,
          z2 = v.z;

      return new Vector([y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - x2 * y1]);
    }
  }, {
    key: "length",
    get: function get() {
      var x = this.x,
          y = this.y,
          z = this.z;

      return Math.sqrt(x * x + y * y + z * z);
    }
  }]);
  return Vector;
}();

exports.default = Vector;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(133);

var _set2 = _interopRequireDefault(_set);

exports.attr = attr;
exports.setDeprecation = setDeprecation;
exports.deprecate = deprecate;
exports.parseValue = parseValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attr(target, prop, descriptor) {
  if (descriptor.get) {
    throw new Error('Attributes\' getter ' + prop + ' can not be override!');
  }
  descriptor.get = function () {
    return this.get(prop);
  };
  return descriptor;
}

var deprecationSet = new _set2.default();

function setDeprecation(apiName) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  msg = '[Deprecation] ' + apiName + ' has been deprecated.' + msg;
  if (!deprecationSet.has(msg)) {
    deprecationSet.add(msg);
    console.warn(msg);
  }
}

function deprecate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var msg = '',
      apiName = '';
  function decorator(target, prop, descriptor) {
    apiName = apiName || target.constructor.name + '#' + prop;
    if (typeof descriptor.value === 'function') {
      var func = descriptor.value;
      descriptor.value = function () {
        setDeprecation(apiName, msg);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return func.apply(this, args);
      };
    }
    if (descriptor.set) {
      var setter = descriptor.set;
      descriptor.set = function (val) {
        setDeprecation(apiName, msg);
        return setter.call(this, val);
      };
    }
    if (descriptor.get) {
      var getter = descriptor.get;
      descriptor.get = function () {
        setDeprecation(apiName, msg);
        return getter.call(this);
      };
    }
  }
  if (args.length === 1) {
    msg = args[0];
    return decorator;
  }
  if (args.length === 2) {
    apiName = args[0];
    msg = args[1];
    return decorator;
  }
  return decorator.apply(undefined, args);
}

function parseValue() {
  for (var _len3 = arguments.length, parsers = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    parsers[_key3] = arguments[_key3];
  }

  return function (target, prop, descriptor) {
    var setter = descriptor.set;

    descriptor.set = function (val) {
      val = parsers.reduce(function (v, parser) {
        return parser(v);
      }, val);

      setter.call(this, val);
    };

    return descriptor;
  };
}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendUnit = exports.rectVertices = exports.rectToBox = exports.boxUnion = exports.boxEqual = exports.boxToRect = exports.boxIntersect = exports.parseStringTransform = exports.fourValuesShortCut = exports.parseColorString = exports.parseStringFloat = exports.parseStringInt = exports.oneOrTwoValues = exports.parseColor = exports.Color = undefined;

var _isNan = __webpack_require__(127);

var _isNan2 = _interopRequireDefault(_isNan);

var _toConsumableArray2 = __webpack_require__(74);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(17);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorString = __webpack_require__(136);

var Color = function () {
  function Color(color) {
    (0, _classCallCheck3.default)(this, Color);

    if (typeof color === 'string') {
      var _colorString$get = colorString.get(color),
          model = _colorString$get.model,
          value = _colorString$get.value;

      this.model = model;
      this.value = value;
    } else {
      this.model = color.model;
      this.value = color.value;
    }
  }

  (0, _createClass3.default)(Color, [{
    key: 'toString',
    value: function toString() {
      var _value = (0, _slicedToArray3.default)(this.value, 4),
          a = _value[0],
          b = _value[1],
          c = _value[2],
          d = _value[3];

      var model = this.model;

      return model + 'a(' + a + ',' + b + ',' + c + ',' + d + ')';
    }
  }, {
    key: 'str',
    get: function get() {
      return String(this);
    }
  }]);
  return Color;
}();

exports.Color = Color;


var parseColor = function parseColor(color) {
  return new Color(color);
};

function parseColorString(color) {
  return parseColor(color).toString();
}

function parseStringTransform(str) {
  if (typeof str !== 'string') return str;

  var rules = str.match(/(?:^|\s)+((?:scale|rotate|translate|skew|matrix)\([^()]+\))/g);
  var ret = {};
  if (rules) {
    rules.forEach(function (rule) {
      var matched = rule.match(/(scale|rotate|translate|skew|matrix)\(([^()]+)\)/);

      var _matched = (0, _slicedToArray3.default)(matched, 3),
          m = _matched[1],
          v = _matched[2];

      if (m === 'rotate') {
        ret[m] = parseStringFloat(v)[0];
      } else {
        ret[m] = parseStringFloat(v);
      }
    });
  }

  return ret;
}

function parseValuesString(str) {
  var isInt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (typeof str === 'string') {
    var values = str.split(/[\s,]+/g);
    return values.map(function (v) {
      return isInt ? parseInt(v, 10) : parseFloat(v);
    });
  }
  return str;
}

function parseStringInt(str) {
  return parseValuesString(str, true);
}

function parseStringFloat(str) {
  return parseValuesString(str, false);
}

function oneOrTwoValues(val) {
  if (!Array.isArray(val)) {
    return [val, val];
  } else if (val.length === 1) {
    return [val[0], val[0]];
  }
  return val;
}

function fourValuesShortCut(val) {
  if (!Array.isArray(val)) {
    return [val, val, val, val];
  } else if (val.length === 1) {
    return [val[0], val[0], val[0], val[0]];
  } else if (val.length === 2) {
    return [val[0], val[1], val[0], val[1]];
  }
  return [].concat((0, _toConsumableArray3.default)(val), [0, 0, 0, 0]).slice(0, 4);
}

function boxIntersect(box1, box2) {
  // left, top, right, buttom
  var _ref = [box1[0], box1[1], box1[2], box1[3]],
      l1 = _ref[0],
      t1 = _ref[1],
      r1 = _ref[2],
      b1 = _ref[3],
      _ref2 = [box2[0], box2[1], box2[2], box2[3]],
      l2 = _ref2[0],
      t2 = _ref2[1],
      r2 = _ref2[2],
      b2 = _ref2[3];


  var t = Math.max(t1, t2),
      r = Math.min(r1, r2),
      b = Math.min(b1, b2),
      l = Math.max(l1, l2);

  if (b >= t && r >= l) {
    return [l, t, r, b];
  }
  return null;
}

function boxToRect(box) {
  return [box[0], box[1], box[2] - box[0], box[3] - box[1]];
}

function boxEqual(box1, box2) {
  return box1[0] === box2[0] && box1[1] === box2[1] && box1[2] === box2[2] && box1[3] === box2[3];
}

function rectToBox(rect) {
  return [rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3]];
}

function rectVertices(rect) {
  var _rectToBox = rectToBox(rect),
      _rectToBox2 = (0, _slicedToArray3.default)(_rectToBox, 4),
      x1 = _rectToBox2[0],
      y1 = _rectToBox2[1],
      x2 = _rectToBox2[2],
      y2 = _rectToBox2[3];

  return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
}

function boxUnion(box1, box2) {
  if (!box1) return box2;
  if (!box2) return box1;

  return [Math.min(box1[0], box2[0]), Math.min(box1[1], box2[1]), Math.max(box1[2], box2[2]), Math.max(box1[3], box2[3])];
}

function appendUnit(value) {
  var defaultUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';

  if (value === '') {
    return value;
  }
  if (typeof value === 'string' && (0, _isNan2.default)(Number(value))) {
    return value;
  }
  return value + defaultUnit;
}

exports.parseColor = parseColor;
exports.oneOrTwoValues = oneOrTwoValues;
exports.parseStringInt = parseStringInt;
exports.parseStringFloat = parseStringFloat;
exports.parseColorString = parseColorString;
exports.fourValuesShortCut = fourValuesShortCut;
exports.parseStringTransform = parseStringTransform;
exports.boxIntersect = boxIntersect;
exports.boxToRect = boxToRect;
exports.boxEqual = boxEqual;
exports.boxUnion = boxUnion;
exports.rectToBox = rectToBox;
exports.rectVertices = rectVertices;
exports.appendUnit = appendUnit;

/***/ })
/******/ ]);
});