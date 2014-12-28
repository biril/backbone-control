//     Backbone Control v0.0.1 / Base
//
//     https://github.com/biril/backbone-control
//     Licensed and freely distributed under the MIT License
//     Copyright (c) 2015 Alex Lambiris

/*globals define */

define(['underscore', 'backbone'], function (_, Backbone) {
  'use strict';

  return Backbone.View.extend({

    //
    _updateDisplay: function () {
      this.$el.toggleClass(this._class('isDisabled'), this._uiState.get('isDisabled'));
    },

    // Initialize the Base-control with given configuration:
    //  * `elMarkup`: The markup to be set as content of control's `.el`
    //  * `elClass`: The control's top-level class - the class of control's `.el`. Used to create
    //      the 'protected' `_class` / `_selector` / `_$select` helpers
    //  * `uiState`: Optional ui-state for the control
    //  * `isAutoWriteToModel`: ..
    initialize: function (config) {

      // Use the given uiState or create one which will be internal to the control, if none given
      this._uiState = config.uiState || new Backbone.Model({ isDisabled: false });

      // Invoke `_updateDisplay` whenever the `isDisabled` attribute is modified. This behaviour is
      //  common to all controls
      this._uiState.on('change:isDisabled', this._updateDisplay, this);

      // Use given markup to `setElement`
      this.setElement(Backbone.$(config.elMarkup));

      //
      if (config.isAutoWriteToModel) {
        this.on('request:set', function (attrs) {
          this._model.set(attrs);
        }, this);
      }

      //
      this._class = function (rawClass) {
        return config.elClass + '_' + rawClass;
      };

      //
      this._selector = function (rawClass) {
        return '.' + config.elClass + '_' + rawClass;
      };

      //
      this._$select = _.bind(function (rawClass) {
        return this.$(this._selector(rawClass));
      }, this);
    },

    // Disable the control - or enable, if the `shouldDisable` argument is given and set to false.
    //  Equivalent to `uiState.set({ isDisabled: shouldDisable })` where `uiState` is the control's
    //  ui-state. Note that disabling (or enabling) by means of the `disable` method _will_ also
    //  set the ui-state's `isDisabled` attribute
    disable: function (shouldDisable) {
      this._uiState.set({ isDisabled: _.isUndefined(shouldDisable) || shouldDisable });
    },

    // Enable the control - or disable, if the `shouldEnable` argument is given and set to false.
    //  Equivalent to `uiState.set({ isDisabled: !shouldEnable })` where `uiState` is the control's
    //  ui-state. Note that enabling (or disabling) by means of the `enable` method _will_ also
    //  set the ui-state's `isDisabled` attribute
    enable: function (shouldEnable) {
      this._uiState.set({ isDisabled: !_.isUndefined(shouldEnable) && !shouldEnable });
    }

  });

});
