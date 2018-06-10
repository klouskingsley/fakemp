module.exports = function (config) {
  var opt = {
    singleRun: true,
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/fakemp.umd.js',
      {pattern: 'test.js', watched: false},
    ],
    port: 9876,
    autoWatch: false,
    browsers: ['Chrome'],
    concurrency: 1,
    browserDisconnectTimeout: 6000,
    processKillTimeout: 6000,
  }

  config.set(opt)
}
