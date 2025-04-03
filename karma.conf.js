module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/**/*.spec.ts'],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
