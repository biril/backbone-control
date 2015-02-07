/*global define */

define(['jquery', 'backbone', 'bbctrl-button'], function ($, Backbone, Button) {

  'use strict';

  var run = function () {
    var
      doc,
      increaseButton,
      decreaseButtonUiState,
      decreaseButton,
      numOfClicks;

    numOfClicks = 0;

    doc = {
      $increaseCountButtonContainer: $('.testSection .increaseCountButton'),
      $decreaseCountButtonContainer: $('.testSection .decreaseCountButton'),
      $count: $('.testSection .count'),

      $enableIncrease: $('.modifySection .enableIncrease'),
      $disableIncrease: $('.modifySection .disableIncrease'),
      $enableDecrease: $('.modifySection .enableDecrease'),
      $disableDecrease: $('.modifySection .disableDecrease')
    };

    // The increase-counter button. Clicking this should increase the displayed count. Disable- &
    //  enable-modifiers which are rendered on the left side of the page allow disabling / enabling
    //  the button. Note that this is done by invoking the control's `disable` / `enable` methods

    increaseButton = new Button({ label: 'Increase count' });

    doc.$increaseCountButtonContainer.append(increaseButton.el);

    doc.$enableIncrease.on('click', function () {
      increaseButton.enable();
    });
    doc.$disableIncrease.on('click', function () {
      increaseButton.disable();
    });

    increaseButton.on('clicked', function () {
      ++numOfClicks;
      doc.$count.text(numOfClicks);
    });

    // The decrease-counter button. Clicking this should decrease the displayed count. Disable- &
    //  enable-modifiers which are rendered on the left side of the page allow disabling / enabling
    //  the button. Note that this is done by setting the `isDisabled` attr of a ui-state model which
    //  is instantiated below and passed to the control at construction-time

    decreaseButtonUiState = new Backbone.Model({ isDisabled: true });

    decreaseButton = new Button({
      label: 'Decrease count',
      uiState: decreaseButtonUiState
    });
    doc.$decreaseCountButtonContainer.append(decreaseButton.el);

    doc.$enableDecrease.on('click', function () {
      decreaseButtonUiState.set({ isDisabled: false });
    });
    doc.$disableDecrease.on('click', function () {
      decreaseButtonUiState.set({ isDisabled: true });
    });

    decreaseButton.on('clicked', function () {
      --numOfClicks;
      doc.$count.text(numOfClicks);
    });
  };

  return { run: run };

});
