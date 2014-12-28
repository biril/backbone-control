/*global define, describe, it, expect */

define(['backbone', 'bbctrl-button'], function (Backbone, Button) {
  'use strict';

  var selectors = { label: '.bbctrlButton_label' };

  describe('The button control', function () {

    it('should render with given label', function () {
      var button = new Button({ label: 'Test Button' });
      expect(button.$(selectors.label).text()).toEqual('Test Button');
    });

    it('should trigger clicked-event when clicked', function () {
      var button, isButtonClickHandlerInvoked;
      button = new Button();
      button.on('clicked', function () {
        isButtonClickHandlerInvoked = true;
      });

      button.$el.click();

      expect(isButtonClickHandlerInvoked).toBeTruthy();
    });

    it('should not cause other instances to trigger clicked-event when clicked', function () {
      var button, otherButton, isOtherButtonClickHandlerInvoked;
      button = new Button();
      otherButton = new Button();
      otherButton.on('clicked', function () {
        isOtherButtonClickHandlerInvoked = true;
      });

      button.$el.click();

      expect(isOtherButtonClickHandlerInvoked).toBeFalsy();
    });

    it('should not trigger clicked-event when disabled (.disable())', function () {
      var button, isButtonClickHandlerInvoked;
      button = new Button();
      button.disable();
      button.on('clicked', function () {
        isButtonClickHandlerInvoked = true;
      });

      button.$el.click();

      expect(isButtonClickHandlerInvoked).toBeFalsy();
    });

    it('should not trigger clicked-event when disabled (.enable(false))', function () {
      var button, isButtonClickHandlerInvoked;
      button = new Button();
      button.enable(false);
      button.on('clicked', function () {
        isButtonClickHandlerInvoked = true;
      });

      button.$el.click();

      expect(isButtonClickHandlerInvoked).toBeFalsy();
    });

    it('should not trigger clicked-event when disabled (uiState.set({ isDisabled: true }))', function () {
      var button, isButtonClickHandlerInvoked;
      button = new Button({
        uiState: new Backbone.Model({ isDisabled: true })
      });
      button.enable(false);
      button.on('clicked', function () {
        isButtonClickHandlerInvoked = true;
      });

      button.$el.click();

      expect(isButtonClickHandlerInvoked).toBeFalsy();
    });

    it('should trigger clicked-event when clicked after being re-enabled (.enable())', function () {
      var button, isButtonClickHandlerInvoked;
      button = new Button();
      button.disable();
      button.on('clicked', function () {
        isButtonClickHandlerInvoked = true;
      });

      button.enable();
      button.$el.click();

      expect(isButtonClickHandlerInvoked).toBeTruthy();
    });

    it('should trigger clicked-event when clicked after being re-enabled (.disable(false))', function () {
      var button, isButtonClickHandlerInvoked;
      button = new Button();
      button.disable();
      button.on('clicked', function () {
        isButtonClickHandlerInvoked = true;
      });

      button.disable(false);
      button.$el.click();

      expect(isButtonClickHandlerInvoked).toBeTruthy();
    });

    it('should trigger clicked-event when clicked after being re-enabled (uiState.set({ isDisabled: false }))', function () {
      var button, uiState, isButtonClickHandlerInvoked;
      uiState = new Backbone.Model({ isDisabled: true });
      button = new Button({ uiState: uiState });
      button.disable();
      button.on('clicked', function () {
        isButtonClickHandlerInvoked = true;
      });

      uiState.set({ isDisabled: false });
      button.$el.click();

      expect(isButtonClickHandlerInvoked).toBeTruthy();
    });

  });

});
