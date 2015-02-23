Backbone Control
================

[![Build Status](https://travis-ci.org/biril/backbone-control.png)](https://travis-ci.org/biril/backbone-control)

Common UI elements, reinvented as data-driven Backbone components.

By design, HTML controls attain specific state as a response to user interaction. A checkbox will
go into and out of the 'checked' state as a response to the user clicking on it; a text input will
be populated with whatever input the user types into it. Essentially, application state is
persisted directly on the document - on the view - rather than on the model. Additionally,
validations or any appropriate constraint-enforcing logic is executed too late, as a response to
state change rather than as a prerequisite thereof. Consequently, HTML controls are hard to fit
into MV* applications - such as those built with Backbone - where models act as the
single-source-of-truth and views act as their projection onto the presentation layer.

Backbone Control is an implementation of common UI elements (button, switch (check box / radio
button), text field, drop-down list, etc) as Backbone Views driven by Backbone Models. As an
example, building a user-details form based on Backbone Control elements is intended to look
something like this:

```javascript
var user = new Backbone.Model({
    name: 'David',
    emailAddress: 'Davidbowman@home.com',
    country: 'us',
    isNotifiedForUpdates: false
  });

// Create controls for editing the user's name, country and their notify-for-updates status. Each
//  control is associated with some specific attribute of the user model. Additionally, through the
//  isAutoWriteToModel attribute, they're all set up with two-way data binding, i.e. any changes on
//  the control will be automatically persisted on the model. Contrast this to how the
//  email-address text field is used further down
var userNameTextField = new TextField({
    model: user,
    modelAttr: 'name',
    isAutoWriteToModel: true
  });
$('.userName').append(userNameTextField.el);

var userCountryDropList = new DropList({
    model: user,
    modelAttr: 'country',
    items: [
      { value: 'us', name: 'United States' },
      { value: 'gb', name: 'United Kingdom' },
      { value: 'ae', name: 'United Arab Emirates' },
      { value: 'tz', name: 'United Republic of Tanzania' }
    ],
    isAutoWriteToModel: true
  });
$('.userCountry').append(userCountryDropList.el);

var notifyForUpdatesSwitch = new Switch({
    model: user,
    modelAttr: 'isNotifiedForUpdates',
    isAutoWriteToModel: true
  });
$('.notifyForUpdates').append(notifyForUpdatesSwitch.el);

// For the user's email-address text field we only want one-way data-binding (notice the
//  isAutoWriteToModel attribute set to false). That is to say, the view should always reflect the
//  model's state but changes on the view should not be automatically persisted on the model.
//  Instead, a listener is set up for the controls 'submitted' / 'blurred' events, which performs
//  a validation step before commiting the value to the model
var userEmailAddressTextField = new TextField({
    model: user,
    modelAttr: 'emailAddress',
    isAutoWriteToModel: false
  });
$('.userEmailAddress').append(userEmailAddressTextField.el);
userEmailTextField.on('submitted blurred', function (attrs) {
  if (isValidEmailAddress(attrs.emailAddress)) {
    user.set(attrs);
  }
});

// The button is a state-less view, not associated with any model. A listener is set up for the
//  button's 'clicked' event, which saves the current state of the model
var submitButton = new TextField({ label: 'Apply Changes' });
$('.submit', submitButton.el);
submitButton.on('clicked', function () {
  user.save();
});

```

Note that this is an early, 0.0.x revision and as such still very much in flux.


License
-------

Licensed under the MIT License (LICENSE.txt).

Copyright (c) 2014-2015 Alex Lambiris
