require File.expand_path("../../helper", __FILE__)

switch_selector = {
  root: '.bbctrlSwitch',
  handle: '.bbctrlSwitch_handle'
}

fixture_selector = {
  switch1: '.switch1',
  switch2: '.switch2',
  enable_switch1_modifier:  '.modifier.enableSwitch1',
  enable_switch2_modifier:  '.modifier.enableSwitch2',
  disable_switch1_modifier: '.modifier.disableSwitch1',
  disable_switch2_modifier: '.modifier.disableSwitch2'
}

describe 'the switch control', :type => :feature do

  #

  matcher :appear_as_on do
    match do |actual|
      handle = actual.find(switch_selector[:handle])
      handle.native.style('margin-left') === '23px'
    end
  end

  matcher :appear_as_off do
    match do |actual|
      handle = actual.find(switch_selector[:handle])
      handle.native.style('margin-left') === '1px'
    end
  end

  matcher :appear_as_enabled do
    match do |actual|
      handle = actual.find(switch_selector[:handle])
      handle.native.style('background-color') == 'rgba(93, 147, 226, 1)'; # == #5D93E2
    end
  end

  matcher :appear_as_disabled do
    match do |actual|
      handle = actual.find(switch_selector[:handle])
      handle.native.style('background-color') == 'rgba(153, 172, 200, 1)'; # == #99ACC8
    end
  end

  #

  before do
    visit 'localhost:8000/test/Switch'
    expect(page).to have_css(switch_selector[:root]) # Wait for switches to render before proceeding
  end

  #

  it 'should render (twice)' do
    expect(all('.bbctrlSwitch').count).to eq(2)
  end

  it 'should appear as on when initialized to on' do
    # Switch 1 is initialized to the on state
    switch = find(fixture_selector[:switch1]).find(switch_selector[:root])

    expect(switch).to appear_as_on
  end

  it 'should appear as on when set to on after being set to off' do
    # Switch 1 is initialized to the on state
    switch = find(fixture_selector[:switch1]).find(switch_selector[:root])

    switch.click()
    switch.click()

    expect(switch).to appear_as_on
  end

  it 'should appear as off when initialized to off' do
    # Switch 2 is initialized to the off state
    switch = find(fixture_selector[:switch2]).find(switch_selector[:root])

    expect(switch).to appear_as_off
  end

  it 'should appear as off when set to off after being set to on' do
    # Switch 2 is initialized to the off state
    switch = find(fixture_selector[:switch2]).find(switch_selector[:root])

    switch.click()
    switch.click()

    expect(switch).to appear_as_off
  end

  it 'should appear as enabled when initialized to enabled' do
    # Switch1 is initialized to the enabled state
    within(fixture_selector[:switch1]) do
      expect(find(switch_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when set to disabled after being initialized to enabled' do
    # Switch1 is initialized to the enabled state. Disable it
    find(fixture_selector[:disable_switch1_modifier]).click()

    within(fixture_selector[:switch1]) do
      expect(find(switch_selector[:root])).to appear_as_disabled
    end
  end

  it 'should appear as enabled when set to enabled after being set to disabled' do
    # Switch1 is initialized to the enabled state. Disable it and re-enable it
    find(fixture_selector[:disable_switch1_modifier]).click()
    find(fixture_selector[:enable_switch1_modifier]).click()

    within(fixture_selector[:switch1]) do
      expect(find(switch_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when initialized to disabled' do
    # Switch2 is initialized to the disabled state
    within(fixture_selector[:switch2]) do
      expect(find(switch_selector[:root])).to appear_as_disabled
    end
  end

  it 'should appear as enabled when set to enabled after being initialized to disabled' do
    # Switch2 is initialized to the disabled state. Enable it
    find(fixture_selector[:enable_switch2_modifier]).click()

    within(fixture_selector[:switch2]) do
      expect(find(switch_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when set to disabled after being set to enabled' do
    # Switch2 is initialized to the disabled state. Enable it and re-disable it
    find(fixture_selector[:enable_switch2_modifier]).click()
    find(fixture_selector[:disable_switch2_modifier]).click()

    within(fixture_selector[:switch2]) do
      expect(find(switch_selector[:root])).to appear_as_disabled
    end
  end

end
