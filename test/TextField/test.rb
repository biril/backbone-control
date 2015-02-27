require File.expand_path("../../helper", __FILE__)

textField_selector = {
  root: '.bbctrlTextField',
  input: '.bbctrlTextField_input'
}

fixture_selector = {
  textField1: '.textField1',
  textField2: '.textField2',
  enable_textField1_modifier:  '.modifier.enableTextField1',
  enable_textField2_modifier:  '.modifier.enableTextField2',
  disable_textField1_modifier: '.modifier.disableTextField1',
  disable_textField2_modifier: '.modifier.disableTextField2'
}

describe 'the Text Field control', :type => :feature, sauce: ENV['RUN_ON_SAUCE'] do

  # Matchers facilitating the evaluation of the control's appearance. These may serve as an
  #  effective indication of all the control's visual aspects that the suite tests for. They
  #  necessarily make use of selenium native methods, for example to acquire the computed style of
  #  elements and compare against known styles. In this sense, they also define (in a minimalist
  #  fashion) the adjustments in the test suite that would be necessary to account for changes in
  #  the control's style

  matcher :appear_as_enabled do
    match do |actual|
      # For now let's just check whether the input-element is indeed enabled
      !actual.find(textField_selector[:input]).disabled?
    end
  end

  matcher :appear_as_disabled do
    match do |actual|
      # For now let's just check whether the input-element is indeed disabled
      actual.find(textField_selector[:input]).disabled?
    end
  end

  matcher :appear_as_hovered do
    # Unfortunately, Selenium's .style('border-color') will return emptyness.
    #  We'll have to check the border-top/right/bottom/left-color one by one:
    directions = %w{ top right bottom left }
    input_border_colors = nil
    match do |actual|
      input = actual.find(textField_selector[:input])
      input_border_colors = directions.map do |direction|
        input.native.style("border-#{direction}-color")
      end
      input_border_colors.all? do |color|
        color == 'rgba(56, 121, 217, 1)' # == #3879d9
      end
    end
    failure_message do |actual|
      "expected #{actual} to appear as hovered: To have border-#{directions.join('/')}-color: "\
      "rgba(56, 121, 217, 1). Actuals: #{input_border_colors.join(', ')}"
    end
    failure_message_when_negated do |actual|
      "expected #{actual} to not appear as hovered: To have border-#{directions.join('/')}-color: "\
      "dif. than rgba(56, 121, 217, 1). Actuals: #{input_border_colors.join(', ')}"
    end
  end

  #

  before do
    visit 'http://localhost:8000/test/TextField'
    expect(page).to have_css(textField_selector[:root]) # Wait for textFieldes to render before proceeding
  end

  #

  it 'should render (twice)' do
    expect(all('.bbctrlTextField').count).to eq(2)
  end

  it 'should appear as enabled when initialized to enabled' do
    # TextField1 is initialized to the enabled state
    within(fixture_selector[:textField1]) do
      expect(find(textField_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when set to disabled after being initialized to enabled' do
    # TextField1 is initialized to the enabled state. Disable it
    find(fixture_selector[:disable_textField1_modifier]).click()

    within(fixture_selector[:textField1]) do
      expect(find(textField_selector[:root])).to appear_as_disabled
    end
  end

  it 'should appear as enabled when set to enabled after being set to disabled' do
    # TextField1 is initialized to the enabled state. Disable it and re-enable it
    find(fixture_selector[:disable_textField1_modifier]).click()
    find(fixture_selector[:enable_textField1_modifier]).click()

    within(fixture_selector[:textField1]) do
      expect(find(textField_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when initialized to disabled' do
    # TextField2 is initialized to the disabled state
    within(fixture_selector[:textField2]) do
      expect(find(textField_selector[:root])).to appear_as_disabled
    end
  end

  it 'should appear as enabled when set to enabled after being initialized to disabled' do
    # TextField2 is initialized to the disabled state. Enable it
    find(fixture_selector[:enable_textField2_modifier]).click()

    within(fixture_selector[:textField2]) do
      expect(find(textField_selector[:root])).to appear_as_enabled
    end
  end

  it 'should appear as disabled when set to disabled after being set to enabled' do
    # TextField2 is initialized to the disabled state. Enable it and re-disable it
    find(fixture_selector[:enable_textField2_modifier]).click()
    find(fixture_selector[:disable_textField2_modifier]).click()

    within(fixture_selector[:textField2]) do
      expect(find(textField_selector[:root])).to appear_as_disabled
    end
  end

  it 'should appear as hovered when hovered' do
    text_field = nil
    within(fixture_selector[:textField1]) do
      text_field = find(textField_selector[:root])
    end

    text_field.hover()

    expect(text_field).to appear_as_hovered
  end

  it 'should not appear as hovered when hovered and disabled' do
    # TextField2 is initialized to the disabled state
    text_field = nil
    within(fixture_selector[:textField2]) do
      text_field = find(textField_selector[:root])
    end

    text_field.hover()

    expect(text_field).to_not appear_as_hovered
  end

end
