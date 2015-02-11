//     Backbone Control v0.0.1 / Switch
//
//     https://github.com/biril/backbone-control
//     Licensed and freely distributed under the MIT License
//     Copyright (c) 2014-2015 Alex Lambiris

/*globals define */

define(['underscore', 'backbone', 'bbctrl-base'], function (_, Backbone, Base) {
  'use strict';

  var elMarkup;

  (function () {
    /*jshint multistr:true */
    elMarkup = '\
      <div class="bbctrlSwitch">\
        <div class="bbctrlSwitch_handle"></div>\
      </div>\
      ';
  }());

  return Base.extend({

    //
    _updateDisplay: function () {
      this.$el.toggleClass('bbctrlSwitch_isOn',
        this._fromModelAttrVal(this._model.get(this._modelAttr)));
      Base.prototype._updateDisplay.call(this);
    },

    //
    events: {
      'click': function () {
        if (this._uiState.get('isDisabled')) {
          return;
        }
        var val = this._negateModelAttrVal(this._model.get(this._modelAttr));
        this.trigger('request:set', _.object([[this._modelAttr, val]]));
      }
    },

    // Initialized with options:
    //  * model:
    //  * modelAttr:
    //  * isAutoWriteToModel:
    //  * uiState: { isDisabled: true / false }
    //  * toModelAttrVal:
    //  * fromModelAttrVal:
    initialize: function (config) {

      config = _({}).extend(config, { elMarkup: elMarkup });

      // If no model given then this control will _have_ to be autoWriteToModel. Regardless of
      //  given `isAutoWriteToModel`
      if (!config.model) {
        config.isAutoWriteToModel = true;
      }

      Base.prototype.initialize.call(this, config);

      //
      this._model = config.model || new Backbone.Model({ value: false });
      this._modelAttr = config.modelAttr || 'value';
      this._model.on('change:' + this._modelAttr, this._updateDisplay, this);

      //
      this._toModelAttrVal = config.toModelAttrVal || _.identity;
      this._fromModelAttrVal = config.fromModelAttrVal || _.identity;
      this._negateModelAttrVal = function (modelAttrVal) {
        return this._toModelAttrVal(!this._fromModelAttrVal(modelAttrVal));
      };

      this._updateDisplay();
    },

    getModelAttrs: function () {
      return _.object([[this._modelAttr, this._model.get(this._modelAttr)]]);
    }

  });
});
