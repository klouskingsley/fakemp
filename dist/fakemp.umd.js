/*!
* fakemp.umd.js v0.1.0
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.fakemp = factory());
}(this, (function () { 'use strict';

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var invariant = function(condition, format, a, b, c, d, e, f) {

    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };

  var invariant_1 = invariant;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
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

  // code from https://github.com/chemzqm/wept/blob/master/src/sdk/storage.js

  // 5MB
  var LIMIT_SIZE = 5 * 1024;

  function currentSize() {
    var total = 0;
    for (var x in localStorage) {
      var amount = localStorage[x].length * 2 / 1024;
      total += amount;
    }
    return Math.ceil(total);
  }

  var Storage = function () {
    function Storage() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          appId = _ref.appId;

      classCallCheck(this, Storage);

      this.appId = appId || Math.random();
      invariant_1((typeof localStorage === 'undefined' ? 'undefined' : _typeof(localStorage)) === 'object', 'localStorage not supported');
    }

    createClass(Storage, [{
      key: 'set',
      value: function set$$1(key, value) {
        var str = localStorage.getItem(this.appId);
        var obj = void 0;
        obj = str ? JSON.parse(str) : {};
        obj[key] = value;
        localStorage.setItem(this.appId, JSON.stringify(obj));
      }
    }, {
      key: 'get',
      value: function get$$1(key) {
        var str = localStorage.getItem(this.appId);
        var obj = void 0;
        obj = str ? JSON.parse(str) : {};
        return obj[key];
      }
    }, {
      key: 'remove',
      value: function remove(key) {
        var str = localStorage.getItem(this.appId);
        if (!str) return;
        var obj = JSON.parse(str);
        var data = obj[key];
        delete obj[key];
        localStorage.setItem(this.appId, JSON.stringify(obj));
        return data;
      }
    }, {
      key: 'clear',
      value: function clear() {
        localStorage.removeItem(this.appId);
      }
    }, {
      key: 'getAll',
      value: function getAll() {
        var str = localStorage.getItem(this.appId);
        var obj = str ? JSON.parse(str) : {};
        var res = {};
        Object.keys(obj).forEach(function (key) {
          res[key] = {
            data: obj[key]
          };
        });
        return res;
      }
    }, {
      key: 'info',
      value: function info() {
        var str = localStorage.getItem(this.appId);
        var obj = str ? JSON.parse(str) : {};
        return {
          keys: Object.keys(obj),
          limitSize: LIMIT_SIZE,
          currentSize: currentSize()
        };
      }
    }]);
    return Storage;
  }();

  var is = {
    func: function func(f) {
      return typeof f === 'function';
    }
  };

  function registerStorage(fakemp) {
    var storage = new Storage({ appId: fakemp.appId });

    fakemp.setStorage = function (obj) {
      var res = storage.set(obj.key, obj.data);
      returnSuccess(_extends({}, obj, { errMsg: 'setStorage:ok', data: res }));
    };

    fakemp.getStorage = function (obj) {
      var res = storage.get(obj.key);
      returnSuccess(_extends({}, obj, { errMsg: 'getStorage:ok', data: res }));
    };

    fakemp.getStorageInfo = function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var res = storage.info();
      returnSuccess(_extends({}, obj, { errMsg: 'getStorageInfo:ok', data: res }));
    };

    fakemp.removeStorage = function (obj) {
      var res = storage.remove(obj.key);
      returnSuccess(_extends({}, obj, { errMsg: 'removeStorage:ok', data: res }));
    };

    fakemp.clearStorage = function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var res = storage.clear();
      returnSuccess(_extends({}, obj, { errMsg: 'clearStorage:ok', data: res }));
    };

    fakemp.setStorageSync = function (key, data) {
      return storage.set(key, data);
    };

    fakemp.getStorageSync = function (key) {
      return storage.get(key);
    };

    fakemp.getStorageInfoSync = function () {
      return storage.info();
    };

    fakemp.removeStorageSync = function (key) {
      return storage.remove(key);
    };

    fakemp.clearStorageSync = function () {
      return storage.clear();
    };
  }

  function returnSuccess(obj) {
    is.func(obj.success) && obj.success({ errMsg: obj.errMsg, data: obj.data });
    is.func(obj.complete) && obj.complete({ errMsg: obj.errMsg, data: obj.data });
  }

  var FakeMP = function () {
    function FakeMP() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, FakeMP);

      this.appId = opt.appId || Math.random();
      registerStorage(this);
    }

    createClass(FakeMP, [{
      key: 'createInstance',
      value: function createInstance(opt) {
        return new FakeMP(opt);
      }
    }]);
    return FakeMP;
  }();

  var index = new FakeMP();

  return index;

})));
