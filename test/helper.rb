require 'sauce'
require 'sauce/capybara'
require 'capybara/rspec'

# See https://docs.saucelabs.com/tutorials/ruby/ and https://github.com/saucelabs/sauce_ruby for
#  documentation concering sauce-labs specific configuration. Note that 'RUN_ON_SAUCE' environent
#  variable determines whether the test suite runs locally or remotely, on sauce. See
#  https://github.com/saucelabs/sauce_ruby/wiki/Swappable-Sauce

Capybara.run_server = false
Capybara.default_driver = ENV['RUN_ON_SAUCE'] ? :sauce : :selenium
Capybara.default_wait_time = 5

Sauce.config do |c|
  c[:start_tunner] = ENV['RUN_ON_SAUCE']
  c[:browsers] = [
    ["OS X 10.10", "Chrome", "39"] # TBD
  ]
end
