@integration
Feature: CGG Homepage BDD integration
  In order view CGG page 
  As a customer
  I want to be able to click Homepage

 Scenario: User clicks on CTA button to be directed to a relevant Selfridges page
    Given I navigate to Christmas home page
    When I open a category
    And I click the CTA in a chapter 

 Scenario: User clicks on video play button
    Given I navigate to Christmas home page
    When I open a category
    And I play video
    
 Scenario: User scrolls down the page and clicks on product card to be directed to relevant PDP page
    Given I navigate to Christmas home page
    When I open a category
    And I click on a product card
 
 Scenario: User swipes across product carousel and clicks on CTA link to be directed to relevant PDP page
    Given I navigate to Christmas home page
    When I swipe on a carousel
    And click on a CTA to be taken to the relevant PDP page

 Scenario: User clicks on advert CTA link to be directed to relevant ad location on Selfridges
    Given I navigate to Christmas home page
    When I open first category
    And I click the CTA on sponsor spot

Scenario: User clicks on home button to be directed back to full chapter structure
    Given I navigate to Christmas home page
    When I click on Home button

Scenario: User clicks on next / back button to be directed to the previous / next chapter page
    Given I navigate to Christmas home page
    When I click on Next button 
    And I click on prev button 

Scenario: User clicks on accessibility icon to see accessible view
    Given I navigate to Christmas home page
    When I click on accessibility button

Scenario: User clicks on share icon to get share options across social
    Given I navigate to Christmas home page
    When I click on Share button