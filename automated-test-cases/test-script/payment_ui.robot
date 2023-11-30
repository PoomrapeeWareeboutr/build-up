*** Settings ***
Default Tags    Payment_service
Library    SeleniumLibrary
Library    String
Test Setup    Run Keywords    Login    AND    Maximize Browser Window
Test Teardown    Close Browser

*** Variables ***
${url_login}    http://localhost:3000/sign-in

*** Keywords ***
Login
    Open Browser    ${url_login}    edge
    Sleep    0.3
    Click Element    name:username
    Input Text    name:username    user
    Sleep    0.5
    Click Element    name:password
    Input Text    name:password    user
    Sleep    0.5
    Click Element    tag:button
Click target product
    Execute JavaScript    document.querySelector("div.item-showcase-list > div:nth-child(3)").click();
Click buy button
    ${xpath}    Set Variable    //*[@id="root"]/div/div[2]/div[2]/div[2]/div[12]/div[2]/button
    Execute JavaScript  document.evaluate('${xpath}', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
Select product size
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[4]/div[4]
Click check out button
    Click Element    class:button-container__button--green
Click add shipping address
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[2]
Click select address
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[2]/button
Select address
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[2]/ul/li[1]/div
Click back button
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[1]
Click add payment method
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]
Click select payment method
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[2]/button/div
Select payment method as credit card
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[2]/ul/li[1]/div
Select payment method as online banking
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[2]/ul/li[2]/div
Click submit
    Click Element    xpath=//*[@id="root"]/div/div[2]/div[2]/div[2]/div[4]/div[2]

*** Test Cases ***
# User story 10: Make a payment with credit card
Buyer make a payment with credit card
    Sleep    1
    Click target product    
    Sleep    0.5
    Click buy button
    Sleep    0.5
    Select product size
    Sleep    0.5
    Click check out button
    Sleep    0.5
    Click add shipping address
    Sleep    0.5
    Click select address
    Sleep    0.5
    Select address
    Sleep    0.5
    Click back button
    Sleep    0.5
    Click add payment method
    Sleep    0.5
    Click select payment method
    Sleep    0.5
    Select payment method as credit card
    Sleep    0.5
    Click back button
    Sleep    0.5
    Click submit
    Sleep    0.5
    # Count the element to check that there are no products left in the cart
    ${count}    Get Element Count    class:cart-item
    Should Be Equal As Integers    ${count}   0

# User story 12: Make a payment with online banking
Buyer make a payment with online banking
    Sleep    1
    Click target product    
    Sleep    0.5
    Click buy button
    Sleep    0.5
    Select product size
    Sleep    0.5
    Click check out button
    Sleep    0.5
    Click add shipping address
    Sleep    0.5
    Click select address
    Sleep    0.5
    Select address
    Sleep    0.5
    Click back button
    Sleep    0.5
    Click add payment method
    Sleep    0.5
    Click select payment method
    Sleep    0.5
    Select payment method as online banking
    Sleep    0.5
    Click back button
    Sleep    0.5
    Click submit
    Sleep    0.5
    # Count the element to check that there are no products left in the cart
    ${count}    Get Element Count    class:cart-item
    Should Be Equal As Integers    ${count}   0

# Negative Cases for - User story 10 & 12
Buyer make a payment without input shipping address and payment method
    Sleep    1
    Click target product    
    Sleep    0.5
    Click buy button
    Sleep    0.5
    Select product size
    Sleep    0.5
    Click check out button
    Sleep    0.5
    Click submit
    Sleep    0.5
    # Count the element to check that the product still in the cart
    ${count}    Get Element Count    class:cart-item
    Should Be Equal As Strings    ${count}    1
Buyer make a payment with input shipping address but not input payment method
    Sleep    1
    Click target product    
    Sleep    0.5
    Click buy button
    Sleep    0.5
    Select product size
    Sleep    0.5
    Click check out button
    Sleep    0.5
    Click add shipping address
    Sleep    0.5
    Click select address
    Sleep    0.5
    Select address
    Sleep    0.5
    Click back button
    Sleep    0.5
    Click submit
    Sleep    0.5
    # Count the element to check that the product still in the cart
    ${count}    Get Element Count    class:cart-item
    Should Be Equal As Integers    ${count}   1
Buyer make a payment with input payment method but not input shipping address    
    Sleep    1
    Click target product    
    Sleep    0.5
    Click buy button
    Sleep    0.5
    Select product size
    Sleep    0.5
    Click check out button
    Sleep    0.5
    Click add payment method
    Sleep    0.5
    Click select payment method
    Sleep    0.5
    Select payment method as credit card
    Sleep    0.5
    Click back button
    Sleep    0.5
    Click submit
    Sleep    0.5
    # Count the element to check that the product still in the cart
    ${count}    Get Element Count    class:cart-item
    Should Be Equal As Integers    ${count}   1
