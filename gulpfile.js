/*eslint-disable */
'use strict';

var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var DeepMerge = require('deep-merge');
var nodemon = require('nodemon');

var deepmerge = DeepMerge(function(target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

var baseConfig = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']},
    ],
  },
  debug: process.env.NODE_ENV === 'production' ? false : true,
};

/**
 * Create Webpack config object based on a base object.
 * This function can be used to create different webpack builds. If you need
 * to pack other artifacts, such as front-end code, this function can be used
 * to create that config.
 * @param {object} overrides: Object that is used to override the base config.
 * @returns {object}: Webpack config object that can be used to configure Webpack.
 */
function createConfig(overrides) {
  return deepmerge(baseConfig, overrides || {});
}

// Calculate external dependencies for Webpack. Webpack searches for these
// packages in the node_modules instead of packing them into the bundle.
var nodeModules = {};
fs.readdirSync('node_modules')
  .forEach(function(mod) {
    if (mod !== '.bin') {
      nodeModules[mod] = 'commonjs ' + mod;
    }
  });

// Create Webpack config file for the server-side code.
var serverConfig = createConfig({
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  externals: nodeModules,
  plugins: [
  ],
});

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log(err);
    } else {
      console.log(stats.toString());
    }

    if (done) {
      done(err);
    }
  };
}

// Gulp tasks definition begins.
gulp.task('build', function(done) {
  webpack(serverConfig).run(onBuild(done));
});

gulp.task('build-watch', ['build'], function() {
  webpack(serverConfig).watch(100, function(err, stats) {
    onBuild()(err, stats);
    nodemon.restart();
  });
});

gulp.task('run', ['build-watch'], function() {
  nodemon({
    execMap: {
      js: 'node',
    },
    script: path.join(__dirname, 'build/index'),
    ignore: ['*'],
    ext: 'js',
  }).on('restart', function() {
    console.log('Reloading Nodemon');
  });
});
/*eslint-enable */
