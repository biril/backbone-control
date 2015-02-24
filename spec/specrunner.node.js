/* jshint node:true, strict:false */

var
  path = require('path'),

  requirejs = require('requirejs'),

  jasmine = (function () {
    var Jasmine = require('jasmine');
    return new Jasmine({ projectBaseDir: path.resolve() });
  }()),

  $ = (function () {
    var
      doc = require('jsdom').jsdom(),
      window = doc.parentWindow;
    return require('jquery')(window);
  }()),

  Backbone = require('backbone'),

  specs = [
    '../spec/bbctrl-button.spec',
    '../spec/bbctrl-switch.spec',
    '../spec/bbctrl-text-field.spec'
  ];

Backbone.$ = $;

requirejs.config({
  nodeRequire: require,
  baseUrl: path.resolve(__dirname, '../lib'),
  paths: {}
});

requirejs(specs, function () {
  jasmine.configureDefaultReporter({});
  jasmine.env.execute();
});
