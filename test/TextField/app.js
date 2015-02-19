/*global define */

define(['jquery', 'backbone', 'bbctrl-text-field'], function ($, Backbone, TextField) {

  'use strict';

  var run = function () {
    var
      doc,

      user,
      textField1,

      textField2UiState,
      textField2;

    doc = {
      $textField1Container: $('.testSection .textField1'),
      $textField2Container: $('.testSection .textField2'),

      $enableTextField1:  $('.modifySection .enableTextField1'),
      $enableTextField2:  $('.modifySection .enableTextField2'),

      $disableTextField1: $('.modifySection .disableTextField1'),
      $disableTextField2: $('.modifySection .disableTextField2')
    };

    // textField-1. Disable- & enable-modifiers which are rendered on the left side of the page
    //  allow disabling / enabling the textField. Note that this is done by invoking the control's
    //  `disable` / `enable` methods

    user = new Backbone.Model({ name: 'Anna' });

    textField1 = new TextField({
      model: user,
      modelAttr: 'name',
      isAutoWriteToModel: true
    });

    doc.$textField1Container.append(textField1.el);

    doc.$enableTextField1.on('click', function () {
      textField1.enable();
    });
    doc.$disableTextField1.on('click', function () {
      textField1.disable();
    });

    // textField-2. Disable- & enable-modifiers which are rendered on the left side of the page
    //  allow disabling / enabling the textField. Note that this is done by setting the
    //  `isDisabled` attr of a ui-state model which is instantiated below and passed to the control
    //  at construction-time. Also note that this textField is not driven by any model - we can use
    //  the textField's 'request:set' events to track state

    textField2UiState = new Backbone.Model({ isDisabled: true });

    textField2 = new TextField({ uiState: textField2UiState });
    doc.$textField2Container.append(textField2.el);

    doc.$enableTextField2.on('click', function () {
      textField2UiState.set({ isDisabled: false });
    });
    doc.$disableTextField2.on('click', function () {
      textField2UiState.set({ isDisabled: true });
    });

  };

  return { run: run };

});
