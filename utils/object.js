'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
exports.deepFreeze = deepFreeze;
exports.deepMerge = deepMerge;
function isObject(item) {
  return item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item);
}

function deepFreeze(obj) {
  Object.keys(obj).forEach(function (key) {
    return key && isObject(obj[key]) && Object.freeze(obj[key]);
  });
  return Object.freeze(obj);
}

function deepMerge(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) {
    return target;
  }
  // making sure to not change target (immutable)
  var output = Object.assign({}, target);
  var source = sources.shift();
  if (isObject(output) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      if (isObject(source[key])) {
        if (!output[key]) {
          output[key] = Object.assign({}, source[key]);
        } else {
          output[key] = deepMerge({}, output[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return deepMerge.apply(undefined, [output].concat(sources));
}

exports.default = { deepFreeze: deepFreeze, deepMerge: deepMerge, isObject: isObject };