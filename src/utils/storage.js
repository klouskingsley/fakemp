// code from https://github.com/chemzqm/wept/blob/master/src/sdk/storage.js

// 5MB
const LIMIT_SIZE = 5*1024

let directory = 'lksklfakldfjklasd'

function currentSize() {
  var total = 0
  for(var x in localStorage) {
    var amount = (localStorage[x].length * 2) / 1024
    total += amount
  }
  return Math.ceil(total)
}

function getType(key) {
  let str= localStorage.getItem(directory + '_type')
  if (!str) return
  let obj = JSON.parse(str)
  return obj[key]
}

function getTypes() {
  let str= localStorage.getItem(directory + '_type')
  if (!str) return {}
  return JSON.parse(str)
}


class Storage {
  constructor ({appId} = {}) {
    this.appId = appId || Math.random()
  }

  set (key, value, dataType) {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj
    obj = str ? JSON.parse(str) : {}
    obj[key] = value
    localStorage.setItem(directory, JSON.stringify(obj))
    let types = getTypes()
    types[key] = dataType
    localStorage.setItem(directory + '_type', JSON.stringify(types))
    this.emit('change')
  }

  get (key) {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj
    obj = str ? JSON.parse(str) : {}
    return {
      data: obj[key],
      dataType: getType(key)
    }
  }

  remove (key) {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    if (!str) return
    let obj =JSON.parse(str)
    let data = obj[key]
    delete obj[key]
    localStorage.setItem(directory, JSON.stringify(obj))
    let types = getTypes()
    delete types[key]
    localStorage.setItem(directory + '_type', JSON.stringify(types))
    this.emit('change')
    return data
  }

  clear () {
    if (window.localStorage == null) return console.error('localStorage not supported')
    localStorage.removeItem(directory)
    localStorage.removeItem(directory + '_type')
    this.emit('change')
  }
  
  getAll () {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj = str ? JSON.parse(str) : {}
    let res = {}
    Object.keys(obj).forEach(function (key) {
      res[key] = {
        data: obj[key],
        dataType: getType(key)
      }
    })
    return res
  }

  info () {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj = str ? JSON.parse(str) : {}
    return {
      keys: Object.keys(obj),
      limitSize: LIMIT_SIZE,
      currentSize: currentSize()
    }
  }
}
