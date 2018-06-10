// code from https://github.com/chemzqm/wept/blob/master/src/sdk/storage.js

import invariant from 'invariant'

// 5MB
const LIMIT_SIZE = 5*1024

function currentSize() {
  var total = 0
  for(var x in localStorage) {
    var amount = (localStorage[x].length * 2) / 1024
    total += amount
  }
  return Math.ceil(total)
}

class Storage {
  constructor ({appId} = {}) {
    this.appId = appId || Math.random()
    invariant(typeof localStorage === 'object', 'localStorage not supported')
  }

  set (key, value) {
    let str = localStorage.getItem(this.appId)
    let obj
    obj = str ? JSON.parse(str) : {}
    obj[key] = value
    localStorage.setItem(this.appId, JSON.stringify(obj))
  }

  get (key) {
    let str = localStorage.getItem(this.appId)
    let obj
    obj = str ? JSON.parse(str) : {}
    return obj[key]
  }

  remove (key) {
    let str = localStorage.getItem(this.appId)
    if (!str) return
    let obj =JSON.parse(str)
    let data = obj[key]
    delete obj[key]
    localStorage.setItem(this.appId, JSON.stringify(obj))
    return data
  }

  clear () {
    localStorage.removeItem(this.appId)
  }

  getAll () {
    let str = localStorage.getItem(this.appId)
    let obj = str ? JSON.parse(str) : {}
    let res = {}
    Object.keys(obj).forEach(function (key) {
      res[key] = {
        data: obj[key]
      }
    })
    return res
  }

  info () {
    let str = localStorage.getItem(this.appId)
    let obj = str ? JSON.parse(str) : {}
    return {
      keys: Object.keys(obj),
      limitSize: LIMIT_SIZE,
      currentSize: currentSize()
    }
  }
}

export default Storage
