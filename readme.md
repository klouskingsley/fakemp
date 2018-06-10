# fakemp [![Build Status](https://travis-ci.org/klouskingsley/fakemp.svg?branch=master)](https://travis-ci.org/klouskingsley/fakemp
> 使用浏览器模拟微信小程序Api, 现仅支持[Storage](https://developers.weixin.qq.com/miniprogram/dev/api/data.html)

## Install

```npm
$ npm install fakemp -S
```

## Usage

> 用法与微信小程序一致

```js
const wx = require('fakemp')

wx.setStorageSync('foo', 'bar')
wx.getStorageSync('foo')  // bar
```

## Api

#### .createInstance(*[options]*)

创建新的wx实例(多个小程序数据隔离时需要)

###### options
- Type: `object`

name | description | default
--- | --- | ---
appId | 小程序的appId, 用于隔离不同的storage | Math.random()


## License

MIT
