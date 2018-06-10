import registerStorage from './api/storage'

class FakeMP {
  constructor (opt = {}) {
    this.appId = opt.appId || Math.random()
    registerStorage(this)
  }

  static createFakeMp (opt) {
    return new FakeMP(opt)
  }
}

export default FakeMP.createFakeMp()
