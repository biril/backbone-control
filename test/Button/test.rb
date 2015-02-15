require File.expand_path("../../helper", __FILE__)

button_selector = {
  root: '.bbctrlButton',
  label: '.bbctrlButton_label'
}

fixture_selector = {
  increase_button: '.increaseCountButton',
  decrease_button: '.decreaseCountButton',
  enable_increase_button_modifier:  '.modifier.enableIncrease',
  enable_decrease_button_modifier:  '.modifier.enableDecrease',
  disable_increase_button_modifier: '.modifier.disableIncrease',
  disable_decrease_button_modifier: '.modifier.disableDecrease'
}

describe 'the button control', type: :feature, sauce: ENV['RUN_ON_SAUCE'] do

  # Matchers facilitating the evaluation of the control's appearance. These may serve as an
  #  effective indication of all the control's visual aspects that the suite tests for. They
  #  necessarily make use of selenium native methods, for example to acquire the computed style of
  #  elements and compare against known styles. In this sense, they also define (in a minimalist
  #  fashion) the adjustments in the test suite that would be necessary to account for changes in
  #  the control's style

  matcher :appear_as_enabled do
    match do |actual|
      actual.native.style('background-color') == 'rgba(93, 147, 226, 1)'; # == #5D93E2
    end
  end

  matcher :appear_as_disabled do
    match do |actual|
      actual.native.style('background-color') == 'rgba(153, 172, 200, 1)'; # == #99ACC8
    end
  end

  matcher :have_label do |expected|
    match do |actual|
      label = actual.find(button_selector[:label])
      label && label.text == expected
    end
  end

  #

  before do
    visit 'localhost:8000/test/Button'
    expect(page).to have_css(button_selector[:root]) # Wait for buttons to render before proceeding
  end

  #

  it 'should render (twice)' do
    expect(all(button_selector[:root]).count).to eq(2)
  end

  it 'should render with given label' do
    within(fixture_selector[:increase_button]) do
      expect(find(button_selector[:root])).to have_label('Increase count')
    end
    within(fixture_selector[:decrease_button]) do
      expect(find(button_selector[:root])).to have_label('Decrease count')
    end
  end

  it 'should appear as enabled when initialized to enabled' do
    # The increase-button is initialized to the enabled state
    within(fixture_selector[:increase_button]) do
      expect(find(button_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when set to disabled after being initialized to enabled' do
    # The increase-button is initialized to the enabled state. Disable it
    find(fixture_selector[:disable_increase_button_modifier]).click()

    within(fixture_selector[:increase_button]) do
      expect(find(button_selector[:root])).to appear_as_disabled
    end
  end

  it 'should appear as enabled when set to enabled after being set to disabled' do
    # The increase-button is initialized to the enabled state. Disabled it and re-enabled it
    within(fixture_selector[:increase_button]) do
      expect(find(button_selector[:root])).to appear_as_enabled
    end

    find(fixture_selector[:disable_increase_button_modifier]).click()
    find(fixture_selector[:enable_increase_button_modifier]).click()

    within(fixture_selector[:increase_button]) do
      expect(find(button_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when initialized to disabled' do
    # The decrease-button is initialized to the disabled state
    within(fixture_selector[:decrease_button]) do
      expect(find(button_selector[:root])).to appear_as_disabled
    end
  end

  it 'should appear as enabled when set to enabled after being initialized to disabled' do
    # The decrease-button is initialized to the disabled state. Enable it
    find(fixture_selector[:enable_decrease_button_modifier]).click()

    within(fixture_selector[:decrease_button]) do
      expect(find(button_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when set to disabled after being set to enabled' do
    # The decrease-button is initialized to the disabled state. Enable it and re-disable it
    within(fixture_selector[:decrease_button]) do
      expect(find(button_selector[:root])).to appear_as_disabled
    end

    find(fixture_selector[:enable_decrease_button_modifier]).click()
    find(fixture_selector[:disable_decrease_button_modifier]).click()

    within(fixture_selector[:decrease_button]) do
      expect(find(button_selector[:root])).to appear_as_disabled
    end
  end

end
