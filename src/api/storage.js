import StorageUtil from '../utils/storage'
import is from '../utils/is'

export default function registerStorage (fakemp) {
  var storage = new StorageUtil({appId: fakemp.appId})

  fakemp.setStorage = function (obj) {
    const res = storage.set(obj.key, obj.data)
    returnSuccess({...obj, errMsg: 'setStorage:ok', data: res})
  }

  fakemp.getStorage = function (obj) {
    const res = storage.get(obj.key)
    returnSuccess({...obj, errMsg: 'getStorage:ok', data: res})
  }

  fakemp.getStorageInfo = function (obj = {}) {
    const res = storage.info()
    returnSuccess({...obj, errMsg: 'getStorageInfo:ok', data: res})
  }

  fakemp.removeStorage = function (obj) {
    const res = storage.remove(obj.key)
    returnSuccess({...obj, errMsg: 'removeStorage:ok', data: res})
  }

  fakemp.clearStorage = function (obj = {}) {
    const res = storage.clear()
    returnSuccess({...obj, errMsg: 'clearStorage:ok', data: res})
  }

  fakemp.setStorageSync = function (key, data) {
    return storage.set(key, data)
  }

  fakemp.getStorageSync = function (key) {
    return storage.get(key)
  }

  fakemp.getStorageInfoSync = function () {
    return storage.info()
  }

  fakemp.removeStorageSync = function (key) {
    return storage.remove(key)
  }

  fakemp.clearStorageSync = function () {
    return storage.clear()
  }

}

function returnSuccess (obj) {
  is.func(obj.success) && obj.success({errMsg: obj.errMsg, data: obj.data})
  is.func(obj.complete) && obj.complete({errMsg: obj.errMsg, data: obj.data})
}
