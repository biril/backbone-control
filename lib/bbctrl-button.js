//     Backbone Control v0.0.1 / Button
//
//     https://github.com/biril/backbone-control
//     Licensed and freely distributed under the MIT License
//     Copyright (c) 2014-2015 Alex Lambiris

/*globals define */

define(['underscore', 'bbctrl-base'], function (_, Base) {
  'use strict';

  var elMarkup;

  (function () {
    /*jshint multistr:true */
    elMarkup = '\
      <div class="bbctrlButton">\
        <div class="bbctrlButton_label"></div>\
      </div>\
      ';
  }());

  return Base.extend({

    //
    events: {
      'click': function () {
        if (this._uiState.get('isDisabled')) {
          return;
        }
        this.trigger('clicked');
      }
    },

    // Initialized with options:
    //  * label: ..
    //  * uiState: { isDisabled: true / false }
    initialize: function (config) {

      config = _({}).extend(config, { elMarkup: elMarkup });

      Base.prototype.initialize.call(this, config);

      this._$select('label').text(config.label || '');

      this._updateDisplay();
    }

  });

});
