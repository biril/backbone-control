/*global define, describe, it, expect */

define(['backbone', 'bbctrl-button'], function (Backbone, Button) {
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
    clickButton = function (button) {
      button.$el.click();
    };

  //

  describe('The button control', function () {

    describe('in terms of misc events', function () {

      it('should trigger clicked-event when clicked', function () {
        var button, isButtonClickHandlerInvoked;
        button = new Button();
        button.on('clicked', function () {
          isButtonClickHandlerInvoked = true;
        });

        clickButton(button);

        expect(isButtonClickHandlerInvoked).toBeTruthy();
      });

    });

    describe('in terms of disabled behaviour', function () {

      it('should not trigger clicked-event when clicked (.disable())', function () {
        var button, isButtonClickHandlerInvoked;
        button = new Button();
        button.on('clicked', function () {
          isButtonClickHandlerInvoked = true;
        });

        button.disable();
        clickButton(button);

        expect(isButtonClickHandlerInvoked).toBeFalsy();
      });

      it('should not trigger clicked-event when clicked (.enable(false))', function () {
        var button, isButtonClickHandlerInvoked;
        button = new Button();
        button.on('clicked', function () {
          isButtonClickHandlerInvoked = true;
        });

        button.enable(false);
        clickButton(button);

        expect(isButtonClickHandlerInvoked).toBeFalsy();
      });

      it('should not trigger clicked-event when clicked (initialized with uiState: { isDisabled: true })', function () {
        var button, isButtonClickHandlerInvoked;
        button = new Button({
          uiState: new Backbone.Model({ isDisabled: true })
        });
        button.on('clicked', function () {
          isButtonClickHandlerInvoked = true;
        });

        clickButton(button);

        expect(isButtonClickHandlerInvoked).toBeFalsy();
      });

      it('should not trigger clicked-event when clicked (uiState.set({ isDisabled: true }))', function () {
        var button, uiState, isButtonClickHandlerInvoked;
        uiState = new Backbone.Model({ isDisabled: false });
        button = new Button({ uiState: uiState });
        button.on('clicked', function () {
          isButtonClickHandlerInvoked = true;
        });

        uiState.set({ isDisabled: true });
        clickButton(button);

        expect(isButtonClickHandlerInvoked).toBeFalsy();
      });

      it('should trigger clicked-event when re-enabled (.enable()) and clicked', function () {
        var button, isButtonClickHandlerInvoked;
        button = new Button();
        button.disable();
        button.on('clicked', function () {
          isButtonClickHandlerInvoked = true;
        });

        button.enable();
        clickButton(button);

        expect(isButtonClickHandlerInvoked).toBeTruthy();
      });

      it('should trigger clicked-event when re-enabled (.disable(false)) and clicked', function () {
        var button, isButtonClickHandlerInvoked;
        button = new Button();
        button.disable();
        button.on('clicked', function () {
          isButtonClickHandlerInvoked = true;
        });

        button.disable(false);
        clickButton(button);

        expect(isButtonClickHandlerInvoked).toBeTruthy();
      });

      it('should trigger clicked-event when re-enabled (uiState.set({ isDisabled: false })) and clicked', function () {
        var button, uiState, isButtonClickHandlerInvoked;
        uiState = new Backbone.Model({ isDisabled: true });
        button = new Button({ uiState: uiState });
        button.on('clicked', function () {
          isButtonClickHandlerInvoked = true;
        });

        uiState.set({ isDisabled: false });
        clickButton(button);

        expect(isButtonClickHandlerInvoked).toBeTruthy();
      });

    });

  });

});
