/* jshint node:true, strict:false */

var
  requirejs = require('requirejs'),

  jasmine = (function () {
    var Jasmine = require('jasmine');
    return new Jasmine({ projectBaseDir: require('path').resolve() });
  }()),

  $ = (function () {
    var
      doc = require('jsdom').jsdom(),
      window = doc.parentWindow;
    return require('jquery')(window);
  }()),

  Backbone = require('backbone'),

  specs = [
    'spec/bbctrl-button.spec.js',
    'spec/bbctrl-switch.spec.js',
    'spec/bbctrl-text-field.spec.js'
  ];

Backbone.$ = $;

requirejs.config({
  nodeRequire: require,
  baseUrl: 'lib',
  paths: {}
});

requirejs(specs, function () {
  jasmine.configureDefaultReporter({});
  jasmine.env.execute();
});
