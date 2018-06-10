
function is (arg, type) {
  return Object.prototype.toString.call(arg) === ('[object ' + type + ']')
}

beforeEach(function () {
  fakemp.clearStorageSync()
})

describe('sync storage', function () {
  it('getStorageSync and setStorageSync and removeStorageSync', function () {
    fakemp.setStorageSync('foo', 'bar')
    assert(fakemp.getStorageSync('foo') === 'bar')
    fakemp.removeStorageSync('foo')

    // getStorageSync return undefined after removeStorageSync
    assert(fakemp.getStorageSync('foo') === undefined)
  })

  it('getStorageInfoSync', function () {
    var res = fakemp.getStorageInfoSync()
    assert(is(res, 'Object'))
    assert(is(res.keys, 'Array'))
    assert(is(res.limitSize, 'Number'))
    assert(is(res.currentSize, 'Number'))
  })

  it('clearStorageSync', function () {
    fakemp.setStorageSync('foo', 'bar')
    fakemp.clearStorageSync()

    // getStorageSync return undefined after clearStorageSync
    assert(fakemp.getStorageSync('foo') === undefined)
  })
})

describe('async storage', function () {
  it('setStorage', function (done) {
    fakemp.setStorage({
      key: 'foo',
      data: 'bar',
      success: function () {
        assert(fakemp.getStorageSync('foo') === 'bar')
        done()
      }
    })
  })

  it('getStorage', function (done) {
    fakemp.setStorageSync('foo', 'bar')
    fakemp.getStorage({
      key: 'foo',
      success: function (obj) {
        assert(obj.data === 'bar')
        done()
      }
    })
  })

  it('removeStorage', function (done) {
    fakemp.setStorageSync('foo', 'bar')
    fakemp.removeStorage({
      key: 'foo',
      success: function () {
        assert(fakemp.getStorageSync('foo') === undefined)
        done()
      }
    })
  })

  it('clearStorage', function (done) {
    fakemp.setStorageSync('foo', 'bar')
    fakemp.clearStorage({
      success: function () {
        console.log('success')
        assert(fakemp.getStorageSync('foo') === undefined)
        done()
      }
    })
  })

  it('getStorageInfo', function (done) {
    fakemp.getStorageInfo({
      success: function (obj) {
        res = obj.data
        assert(is(res, 'Object'))
        assert(is(res.keys, 'Array'))
        assert(is(res.limitSize, 'Number'))
        assert(is(res.currentSize, 'Number'))
        done()
      }
    })
  })
})

describe('createInstance', function () {
  it('createInstance return fakemp instance', function () {
    var appId = 'xxxxxxxxxx'
    var wx = fakemp.createInstance({appId: appId})
    assert(wx.contructor === fakemp.contructor)
    assert(wx.appId === appId)
  })
})
