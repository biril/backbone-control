/*global define, describe, it, expect */

define(['backbone', 'bbctrl-switch'], function (Backbone, Switch) {
  'use strict';

  describe('The switch control', function () {

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

    ///

    it('should trigger set-request when clicked', function () {
      var theSwitch, isSwitchSetRequestHandlerInvoked;
      theSwitch = new Switch();
      theSwitch.on('request:set', function () {
        isSwitchSetRequestHandlerInvoked = true;
      });

      theSwitch.$el.click();

      expect(isSwitchSetRequestHandlerInvoked).toBeTruthy();
    });

    it('should trigger set-to-on-request when set to off and clicked', function () {
      var theSwitch, isRequestSetToOn;
      theSwitch = new Switch();
      theSwitch.on('request:set', function (attrs) {
        isRequestSetToOn = attrs.value === true;
      });

      theSwitch.$el.click();

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

      theSwitch.$el.click();

      expect(isRequestSetToOff).toBeTruthy();
    });

    it('should not cause other instances to trigger set-request when clicked', function () {
      var theSwitch, otherSwitch, isOtherSwitchSetRequestHandlerInvoked;
      theSwitch = new Switch();
      otherSwitch = new Switch();
      otherSwitch.on('request:set', function () {
        isOtherSwitchSetRequestHandlerInvoked = true;
      });

      theSwitch.$el.click();

      expect(isOtherSwitchSetRequestHandlerInvoked).toBeFalsy();
    });

    ///

    it('should not modify model\'s attribute when clicked and is not auto-write-to-model', function () {
      var theSwitch, switchModel;
      switchModel = new Backbone.Model({ isOn: false });
      theSwitch = new Switch({
        model: switchModel,
        modelAttr: 'isOn'
      });

      theSwitch.$el.click();
      expect(switchModel.get('isOn')).toBeFalsy();
      theSwitch.$el.click();
      expect(switchModel.get('isOn')).toBeFalsy();
    });

    it('should negate model\'s attribute when clicked and is auto-write-to-model ', function () {
      var theSwitch, switchModel;
      switchModel = new Backbone.Model({ isOn: false });
      theSwitch = new Switch({
        model: switchModel,
        modelAttr: 'isOn',
        isAutoWriteToModel: true
      });

      expect(switchModel.get('isOn')).toBeFalsy();
      theSwitch.$el.click();
      expect(switchModel.get('isOn')).toBeTruthy();
      theSwitch.$el.click();
      expect(switchModel.get('isOn')).toBeFalsy();
    });

    ///

    it('should not trigger set-request when disabled (.disable())', function () {
      var theSwitch, isSwitchSetRequestHandlerInvoked;
      theSwitch = new Switch();
      theSwitch.disable();
      theSwitch.on('request:set', function () {
        isSwitchSetRequestHandlerInvoked = true;
      });

      theSwitch.$el.click();

      expect(isSwitchSetRequestHandlerInvoked).toBeFalsy();
    });

    it('should not trigger set-request when disabled (.enable(false))', function () {
      var theSwitch, isSwitchSetRequestHandlerInvoked;
      theSwitch = new Switch();
      theSwitch.enable(false);
      theSwitch.on('request:set', function () {
        isSwitchSetRequestHandlerInvoked = true;
      });

      theSwitch.$el.click();

      expect(isSwitchSetRequestHandlerInvoked).toBeFalsy();
    });

    it('should not trigger set-request when disabled (uiState.set({ isDisabled: true }))', function () {
      var theSwitch, isSwitchSetRequestHandlerInvoked;
      theSwitch = new Switch({
        uiState: new Backbone.Model({ isDisabled: true })
      });
      theSwitch.enable(false);
      theSwitch.on('request:set', function () {
        isSwitchSetRequestHandlerInvoked = true;
      });

      theSwitch.$el.click();

      expect(isSwitchSetRequestHandlerInvoked).toBeFalsy();
    });

    it('should trigger set-request when clicked after being re-enabled (.enable())', function () {
      var theSwitch, isSwitchSetRequestHandlerInvoked;
      theSwitch = new Switch();
      theSwitch.disable();
      theSwitch.on('request:set', function () {
        isSwitchSetRequestHandlerInvoked = true;
      });

      theSwitch.enable();
      theSwitch.$el.click();

      expect(isSwitchSetRequestHandlerInvoked).toBeTruthy();
    });

    it('should trigger set-request when clicked after being re-enabled (.disable(false))', function () {
      var theSwitch, isSwitchSetRequestHandlerInvoked;
      theSwitch = new Switch();
      theSwitch.disable();
      theSwitch.on('request:set', function () {
        isSwitchSetRequestHandlerInvoked = true;
      });

      theSwitch.disable(false);
      theSwitch.$el.click();

      expect(isSwitchSetRequestHandlerInvoked).toBeTruthy();
    });

    it('should trigger set-request when clicked after being re-enabled (uiState.set({ isDisabled: false }))', function () {
      var theSwitch, uiState, isSwitchSetRequestHandlerInvoked;
      uiState = new Backbone.Model({ isDisabled: true });
      theSwitch = new Switch({ uiState: uiState });
      theSwitch.disable();
      theSwitch.on('request:set', function () {
        isSwitchSetRequestHandlerInvoked = true;
      });

      uiState.set({ isDisabled: false });
      theSwitch.$el.click();

      expect(isSwitchSetRequestHandlerInvoked).toBeTruthy();
    });

  });

});
