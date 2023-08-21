Feature: run basic HTTP GET tests
  Scenario: The app is running
    Given The app has started
    When surf to the about page
    Then get HTTP code 200 response
