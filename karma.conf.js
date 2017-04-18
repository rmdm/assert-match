// Karma configuration

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['browserify', 'mocha'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*spec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },

    browserify: {
      debug: true,
      transform:  [
        [
          'babelify',
          {
            presets: ['es2015'],
            plugins: [
              'transform-runtime',
              'add-module-exports'
            ]
          }
        ]
      ],
    },

    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    autoWatch: false,

    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

  })
}
