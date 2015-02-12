/*global define */

define(['jquery', 'backbone', 'bbctrl-switch'], function ($, Backbone, Switch) {

  'use strict';

  var run = function () {
    var
      doc,

      switch1Model,
      switch1,

      switch2UiState,
      switch2;

    doc = {
      $switch1Container: $('.testSection .switch1'),
      $switch2Container: $('.testSection .switch2'),

      $switch1StateDisplay: $('.testSection .switch1StateDisplay .output'),
      $switch2StateDisplay: $('.testSection .switch2StateDisplay .output'),

      $enableSwitch1:  $('.modifySection .enableSwitch1'),
      $enableSwitch2:  $('.modifySection .enableSwitch2'),

      $disableSwitch1: $('.modifySection .disableSwitch1'),
      $disableSwitch2: $('.modifySection .disableSwitch2')
    };

    // switch-1. Disable- & enable-modifiers which are rendered on the left side of the page
    //  allow disabling / enabling the switch. Note that this is done by invoking the control's
    //  `disable` / `enable` methods

    switch1Model = new Backbone.Model({ isOn: true });

    switch1 = new Switch({
      model: switch1Model,
      modelAttr: 'isOn',
      isAutoWriteToModel: true
    });

    doc.$switch1Container.append(switch1.el);

    doc.$enableSwitch1.on('click', function () {
      switch1.enable();
    });
    doc.$disableSwitch1.on('click', function () {
      switch1.disable();
    });

    doc.$switch1StateDisplay.text(switch1.getModelAttrs().isOn ? 'on' : 'off');
    switch1Model.on('change:isOn', function () {
      doc.$switch1StateDisplay.text(switch1Model.get('isOn') ? 'on' : 'off');
    });

    // switch-1. Disable- & enable-modifiers which are rendered on the left side of the page
    //  allow disabling / enabling the switch. Note that this is done by setting the `isDisabled`
    //  attr of a ui-state model which is instantiated below and passed to the control at
    //  construction-time. Also note that this switch is not driven by any model - we'll use the
    //  switch's 'request:set' events to track state. (A model-less switch starts out in the _off_
    //  state by default)

    switch2UiState = new Backbone.Model({ isDisabled: true });

    switch2 = new Switch({ uiState: switch2UiState });
    doc.$switch2Container.append(switch2.el);

    doc.$enableSwitch2.on('click', function () {
      switch2UiState.set({ isDisabled: false });
    });
    doc.$disableSwitch2.on('click', function () {
      switch2UiState.set({ isDisabled: true });
    });

    doc.$switch2StateDisplay.text(switch2.getModelAttrs().value ? 'on' : 'off');
    switch2.on('request:set', function (attrs) {
      doc.$switch2StateDisplay.text(attrs.value ? 'on' : 'off');
    });

  };

  return { run: run };

});
