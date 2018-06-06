class FakeMP {
  constructor (opt = {}) {
    this.appId = opt.appId || Math.random()
  }

  static createFakeMp (opt) {
    return new FakeMP(opt)
  }
}

export default FakeMP.createFakeMp()
