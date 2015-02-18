//     Backbone Control v0.0.1 / Text Field
//
//     https://github.com/biril/backbone-control
//     Licensed and freely distributed under the MIT License
//     Copyright (c) 2014-2015 Alex Lambiris

/*globals define */


define(['underscore', 'backbone', 'bbctrl-base'], function (_, Backbone, Base) {
  'use strict';

  var

    /*jshint multistr:true */
    elMarkup = '\
      <div class="bbctrlTextField">\
        <div class="bbctrlTextField_input"></div>\
      </div>\
      ';

  return Base.extend({

    // Initialized with configuration:
    //  * model:
    //  * modelAttr:
    initialize: function (config) {
      config = _(config = _.clone(config || {})).defaults({
        elMarkup: elMarkup,
        model: config.model || new Backbone.Model({ value: '' }),
        modelAttr: config.modelAttr || 'value'
      });

      this._model = config.model;
      this._modelAttr = config.modelAttr;

      Base.prototype.initialize.call(this, config);

      this._doc = { $input: this._$select('input') };

      this._doc.$input.on('input', this._processInput, this);
    },

    getModelAttrs: function () {
      return _.object([[this._modelAttr, this._model.get(this._modelAttr)]]);
    },

    // Force the given input text on the text-field, as if entered on the UI - this API is
    //  currently supported solely for the purposes of testing as there is no good method of
    //  (or appropriatly triggered event for) catching the modification of text-input contents by
    //  means of javascript
    _forceInputText: function (text) {
      if (this._uiState.get('isDisabled')) {
        return;
      }
      this._doc.$input.val(text);
      this._processInput();
    },

    _processInput: function () {
      var inputText = this._doc.$input.val();

      if (inputText === this._model.get(this._modelAttr)) {
        return;
      }

      this.trigger('request:set', _.object([[this._modelAttr, inputText]]));
    },

  });

});