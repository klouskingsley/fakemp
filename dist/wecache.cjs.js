/*!
* wecache.cjs.js v0.0.1
*/
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var invariant = _interopDefault(require('invariant'));

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
    invariant(localStorage === null, 'localStorage not supported');
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
      return {
        data: obj[key]
      };
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
  var storage = new storageUtil({ appId: fakemp.appId });

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
    return storage.clear();
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

function returnSuccess(obj, res) {
  is.func(obj.success) && obj.success(res);
  is.func(obj.complete) && obj.complete(res);
}

var FakeMP = function () {
  function FakeMP() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, FakeMP);

    this.appId = opt.appId || Math.random();
    registerStorage(this);
  }

  createClass(FakeMP, null, [{
    key: 'createFakeMp',
    value: function createFakeMp(opt) {
      return new FakeMP(opt);
    }
  }]);
  return FakeMP;
}();

var index = FakeMP.createFakeMp();

module.exports = index;
