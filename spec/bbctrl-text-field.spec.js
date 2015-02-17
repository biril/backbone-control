/*global define, describe, it, expect */

define (['backbone', 'bbctrl-text-field'], function (Backbone, TextField) {
  'use strict';

  var typeIntoTextField;

  //

  // Helper methods to simulate user interaction with the control. These may serve as an
  //  effective indication of all the interactions that the control supports (and the suite tests
  //  for). They unavoidably leverage privileged knowlege of control internals, for example
  //  reaching into the control's document, to invoke a click on an appropriately named class. In
  //  this sense, they also serve as a means of isolating the most brittle part of the test suite
  //  - that, which is coupled with the unit's implementation - into a small set of APIs. These
  //  may be adjusted as needed to account for changes in the control's implementation while
  //  keeping the rest of the suite unaffected
  typeIntoTextField = function (textField, text) {
    textField._forceInputText(text);
  };

  //

  describe('The text field control', function () {

    describe('in terms of being bound to model state', function () {

      it ('should be set to empty string when initialized without a model', function () {
        var textField;

        textField = new TextField();

        expect(textField.getModelAttrs()).toEqual({ value: '' });
      });

      it ('should be set to model attribute\'s value when initialized with model', function () {
        var textField, user;
        user = new Backbone.Model({ name: 'Anna' });

        textField = new TextField({ model: user, modelAttr: 'name' });

        expect(textField.getModelAttrs()).toEqual({ name: 'Anna' });
      });

    });

    describe('in terms of setting model state', function () {

      it ('should trigger set-request when input-text edited to value which differs from model attribute\'s', function () {
        var textField, isSetRequestHandlerInvoked;
        textField = new TextField();
        textField.on('request:set', function () {
          isSetRequestHandlerInvoked = true;
        });

        typeIntoTextField(textField, 'hello');

        expect(isSetRequestHandlerInvoked).toBeTruthy();
      });

      it ('should trigger set-request with string-attribute that coinsides with current input-text', function () {
        var textField, textPayload;
        textField = new TextField();
        textField.on('request:set', function (attrs) {
          textPayload = attrs.value;
        });

        typeIntoTextField(textField, 'hello');

        expect(textPayload).toEqual('hello');
      });

      it ('should not trigger set-request when input-text edited to value which coinsides with model attribute\'s', function () {
        var textField, user, isSetRequestHandlerInvoked;
        user = new Backbone.Model({ name: 'Anna' });
        textField = new TextField({ model: user, modelAttr: 'name' });
        textField.on('request:set', function () {
          isSetRequestHandlerInvoked = true;
        });

        typeIntoTextField(textField, 'Anna');

        expect(isSetRequestHandlerInvoked).toBeFalsy();
      });

      ///

      it ('should not modify model attribute\'s value when input-text edited and is not auto-write-to-model', function () {
        var textField, user;
        user = new Backbone.Model({ name: 'Anna' });
        textField = new TextField({ model: user, modelAttr: 'name' });

        typeIntoTextField(textField, 'Bob');

        expect(user.get('name')).toEqual('Anna');
      });

      it ('should modify model attribute\'s value when input-text edited and is auto-write-to-model', function () {
        var textField, user;
        user = new Backbone.Model({ name: 'Anna' });
        textField = new TextField({ model: user, modelAttr: 'name', isAutoWriteToModel: true });

        typeIntoTextField(textField, 'Bob');

        expect(user.get('name')).toEqual('Bob');
      });

    });

  });

});
