module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    browsers: ['PhantomJS'],
    colors: true,
    reporters: ['progress'],

    files: [
      // add files to load to the browser like angular or jquery
      'src/**/*.js',
      'test/**/*_helper.js'
      'test/**/*_spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*_helper.js': ['browserify']
      'test/**/*_spec.js': ['browserify']
    },

    browserify: {
       debug: true,
       transform: ['babelify']
    },

    plugins: [
      'karma-browserify',
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ]

  });
};