import registerStorage from './api/storage'

class FakeMP {
  constructor (opt = {}) {
    this.appId = opt.appId || Math.random()
    registerStorage(this)
  }

  createInstance (opt) {
    return new FakeMP(opt)
  }
}

export default new FakeMP()
