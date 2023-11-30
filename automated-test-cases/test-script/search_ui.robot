*** Settings ***
Default Tags    Search_service
Library    SeleniumLibrary
Test Setup    Run Keywords    Open homepage    AND    Maximize Browser Window
Test Teardown    Close Browser

*** Variables ***
${url}    http://localhost:3000/

*** Keywords ***
Open homepage
    Open Browser    ${url}    edge

*** Test Cases ***
# User story 14: Search product by name
User search product by existing product name
    # Click search bar on navbar and input the name of product
    Click Element    class:global-nav__input
    Input Text    class:global-nav__input    New Balance 530 White Silver Navy
    Sleep    1
    # Click search icon
    Click Element    class:global-nav__search-icon
    Sleep    1
    # Get the product name to check whether collect or not
    ${product_name}    Get Text    class:item-slot__text--name
    Should Be Equal As Strings    ${product_name}    New Balance 530 White Silver Navy
User search product by non-existing product name
    # Click search bar on navbar and input the name of product
    Click Element    class:global-nav__input
    Input Text    class:global-nav__input    Converse Jack Purcell
    Sleep    1
    # Click search icon
    Click Element    class:global-nav__search-icon
    Sleep    1
    # Count the element to check that there are nothing for the search result
    ${count}    Get Element Count    class:item-slot__text--name
    Should Be Equal As Integers    ${count}    0
User search product without input
    Sleep    1
    # Click search icon
    Click Element    class:global-nav__search-icon
    Sleep    1
    # Count the element to check that there are nothing for the search result
    ${count}    Get Element Count    class:item-slot__text--name
    Should Be Equal As Integers    ${count}    0

# User Story 15: Search product by category
User search product by shoes category
    # Click category button on navbar
    Click Element    xpath=//*[@id="root"]/div/div[1]/div[1]/div/div
    Sleep    1
    # Select shoes category
    Click Element    xpath=//*[@id="root"]/div/div[1]/div[1]/div/div/ul/li[1]
    Sleep    1
    # Count element of shoes that is equal to number that we have in system or not
    ${count}    Get Element Count    class:item-slot
    Should Be Equal As Integers    ${count}    8
User search product by t-shirt category    
    # Click category button on navbar
    Click Element    xpath=//*[@id="root"]/div/div[1]/div[1]/div/div
    Sleep    1
    # Select t-shirt category
    Click Element    xpath=//*[@id="root"]/div/div[1]/div[1]/div/div/ul/li[2]
    Sleep    1
    # Count element of t-shirt that is equal to number that we have in system or not
    ${count}    Get Element Count    class:item-slot
    Should Be Equal As Integers    ${count}    2