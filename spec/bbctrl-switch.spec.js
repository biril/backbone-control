/*global define, describe, it, expect */

define(['backbone', 'bbctrl-switch'], function (Backbone, Switch) {
  'use strict';

  //

  var

    // Helper methods to simulate user interaction with the control. These may serve as an
    //  effective indication of all the interactions that the control supports (and the suite tests
    //  for). They unavoidably leverage privileged knowlege of control internals, for example
    //  reaching into the control's document, to invoke a click on an appropriately named class. In
    //  this sense, they also serve as a means of isolating the most brittle part of the test suite
    //  - that, which is coupled with the unit's implementation - into a small set of APIs. These
    //  may be adjusted as needed to account for changes in the control's implementation while
    //  keeping the rest of the suite unaffected
    clickSwitch = function (theSwitch) {
      theSwitch.$el.click();
    };

  //

  describe('The switch control', function () {

    describe('in terms of being bound to model state', function () {

      it('should be set to off when initialized without model', function () {
        var theSwitch = new Switch();

        expect(theSwitch.getModelAttrs()).toEqual({ value: false });
      });

      it('should be set to off when initialized with model with false attribute', function () {
        var theSwitch = new Switch({
          model: new Backbone.Model({ isOn: false }),
          modelAttr: 'isOn'
        });

        expect(theSwitch.getModelAttrs()).toEqual({ isOn: false });
      });

      it('should be set to on when initialized with model with true attribute', function () {
        var theSwitch = new Switch({
          model: new Backbone.Model({ isTurnedOn: true }),
          modelAttr: 'isTurnedOn'
        });

        expect(theSwitch.getModelAttrs()).toEqual({ isTurnedOn: true });
      });

    });

    ///

    describe('in terms of setting model state', function () {

      it('should trigger set-request when clicked', function () {
        var theSwitch, isSwitchSetRequestHandlerInvoked;
        theSwitch = new Switch();
        theSwitch.on('request:set', function () {
          isSwitchSetRequestHandlerInvoked = true;
        });

        clickSwitch(theSwitch);

        expect(isSwitchSetRequestHandlerInvoked).toBeTruthy();
      });

      it('should trigger set-to-on-request when set to off and clicked', function () {
        var theSwitch, isRequestSetToOn;
        theSwitch = new Switch();
        theSwitch.on('request:set', function (attrs) {
          isRequestSetToOn = attrs.value === true;
        });

        clickSwitch(theSwitch);

        expect(isRequestSetToOn).toBeTruthy();
      });

      it('should trigger set-to-off-request when set to on and clicked', function () {
        var theSwitch, isRequestSetToOff;
        theSwitch = new Switch({
          model: new Backbone.Model({ isTurnedOn: true }),
          modelAttr: 'isTurnedOn'
        });
        theSwitch.on('request:set', function (attrs) {
          isRequestSetToOff = attrs.isTurnedOn === false;
        });

        clickSwitch(theSwitch);

        expect(isRequestSetToOff).toBeTruthy();
      });

      ///

      it('should not modify model\'s attribute when clicked and is not auto-write-to-model', function () {
        var theSwitch, switchModel;
        switchModel = new Backbone.Model({ isOn: false });
        theSwitch = new Switch({
          model: switchModel,
          modelAttr: 'isOn'
        });

        clickSwitch(theSwitch);
        expect(switchModel.get('isOn')).toBeFalsy();
        clickSwitch(theSwitch);
        expect(switchModel.get('isOn')).toBeFalsy();
      });

      it('should negate model\'s attribute when clicked and is auto-write-to-model', function () {
        var theSwitch, switchModel;
        switchModel = new Backbone.Model({ isOn: false });
        theSwitch = new Switch({
          model: switchModel,
          modelAttr: 'isOn',
          isAutoWriteToModel: true
        });

        expect(switchModel.get('isOn')).toBeFalsy();
        clickSwitch(theSwitch);
        expect(switchModel.get('isOn')).toBeTruthy();
        clickSwitch(theSwitch);
        expect(switchModel.get('isOn')).toBeFalsy();
      });

    });

    ///
    describe('in terms of disabled behaviour', function () {

      it('should not trigger set-request when clicked (.disable())', function () {
        var theSwitch, isSwitchSetRequestHandlerInvoked;
        theSwitch = new Switch();
        theSwitch.on('request:set', function () {
          isSwitchSetRequestHandlerInvoked = true;
        });

        theSwitch.disable();
        clickSwitch(theSwitch);

        expect(isSwitchSetRequestHandlerInvoked).toBeFalsy();
      });

      it('should not trigger set-request when clicked (.enable(false))', function () {
        var theSwitch, isSwitchSetRequestHandlerInvoked;
        theSwitch = new Switch();
        theSwitch.on('request:set', function () {
          isSwitchSetRequestHandlerInvoked = true;
        });

        theSwitch.enable(false);
        clickSwitch(theSwitch);

        expect(isSwitchSetRequestHandlerInvoked).toBeFalsy();
      });

      it('should not trigger set-request when clicked (initialized with uiState: { isDisabled: true })', function () {
        var theSwitch, isSwitchSetRequestHandlerInvoked;
        theSwitch = new Switch({
          uiState: new Backbone.Model({ isDisabled: true })
        });
        theSwitch.on('request:set', function () {
          isSwitchSetRequestHandlerInvoked = true;
        });

        clickSwitch(theSwitch);

        expect(isSwitchSetRequestHandlerInvoked).toBeFalsy();
      });

      it('should not trigger set-request when clicked (uiState.set({ isDisabled: true }))', function () {
        var theSwitch, uiState, isSwitchSetRequestHandlerInvoked;
        uiState = new Backbone.Model({ isDisabled: false });
        theSwitch = new Switch({ uiState: uiState });
        theSwitch.on('request:set', function () {
          isSwitchSetRequestHandlerInvoked = true;
        });

        uiState.set({ isDisabled: true });
        clickSwitch(theSwitch);

        expect(isSwitchSetRequestHandlerInvoked).toBeFalsy();
      });

      it('should trigger set-request when re-enabled (.enable()) and clicked', function () {
        var theSwitch, isSwitchSetRequestHandlerInvoked;
        theSwitch = new Switch();
        theSwitch.disable();
        theSwitch.on('request:set', function () {
          isSwitchSetRequestHandlerInvoked = true;
        });

        theSwitch.enable();
        clickSwitch(theSwitch);

        expect(isSwitchSetRequestHandlerInvoked).toBeTruthy();
      });

      it('should trigger set-request when re-enabled (.disable(false)) and clicked', function () {
        var theSwitch, isSwitchSetRequestHandlerInvoked;
        theSwitch = new Switch();
        theSwitch.disable();
        theSwitch.on('request:set', function () {
          isSwitchSetRequestHandlerInvoked = true;
        });

        theSwitch.disable(false);
        clickSwitch(theSwitch);

        expect(isSwitchSetRequestHandlerInvoked).toBeTruthy();
      });

      it('should trigger set-request when re-enabled (uiState.set({ isDisabled: false })) and clicked', function () {
        var theSwitch, uiState, isSwitchSetRequestHandlerInvoked;
        uiState = new Backbone.Model({ isDisabled: true });
        theSwitch = new Switch({ uiState: uiState });
        theSwitch.on('request:set', function () {
          isSwitchSetRequestHandlerInvoked = true;
        });

        uiState.set({ isDisabled: false });
        clickSwitch(theSwitch);

        expect(isSwitchSetRequestHandlerInvoked).toBeTruthy();
      });

    });

    describe('in terms of to/from model-attr converters', function () {

      it ('should convert to/from model-attr', function () {
        var theSwitch, model, requestedValueToSet;
        model = new Backbone.Model({ direction: 'right' });
        theSwitch = new Switch({
          model: model,
          modelAttr: 'direction',
          fromModelAttrVal: function (direction) {
            return direction === 'right';
          },
          toModelAttrVal: function (isOn) {
            return isOn ? 'right' : 'left';
          }
        });
        theSwitch.on('request:set', function (attrs) {
          requestedValueToSet = attrs.direction;
        });

        clickSwitch(theSwitch);
        expect(requestedValueToSet).toEqual('left');
      });

    });

  });

});
