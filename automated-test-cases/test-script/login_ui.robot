*** Settings ***
Default Tags    Login_service
Library    SeleniumLibrary
Test Teardown    Close Browser

*** Variables ***
${url_login}    http://localhost:3000/sign-in

*** Test Cases ***
# User Story 1: User login
User login with valid username and password
    Open Browser    ${url_login}    edge
    Sleep    0.3
    Click Element    name:username
    Input Text    name:username    user
    Sleep    0.5
    Click Element    name:password
    Input Text    name:password    user
    Sleep    0.5
    Click Element    tag:button
    Sleep    1
    # Get the cookie of username after login to check it equal to the username or not
    ${cookie}    Get Cookie    username
    Should Be Equal As Strings    ${cookie.value}    user
User login with invalid username and password
    Open Browser    ${url_login}    edge
    Sleep    0.3
    Click Element    name:username
    Input Text    name:username    dadwad
    Sleep    0.5
    Click Element    name:password
    Input Text    name:password    kdk03qk
    Sleep    0.5
    Click Element    tag:button
    Sleep    1
    # Get the current page location to check that it is the login page or not
    ${url_location}    Get Location
    Should Be Equal As Strings    ${url_location}    ${url_login}
User login with valid username but invalid password
    Open Browser    ${url_login}    edge
    Sleep    0.3
    Click Element    name:username
    Input Text    name:username    user
    Sleep    0.5
    Click Element    name:password
    Input Text    name:password    kdk03qk
    Sleep    0.5
    Click Element    tag:button
    Sleep    1
    # Get the current page location to check that it is the login page or not
    ${url_location}    Get Location
    Should Be Equal As Strings    ${url_location}    ${url_login}
User login with valid password but invalid username
    Open Browser    ${url_login}    edge
    Sleep    0.3
    Click Element    name:username
    Input Text    name:username    dadwad
    Sleep    0.5
    Click Element    name:password
    Input Text    name:password    user
    Sleep    0.5
    Click Element    tag:button
    Sleep    1
    # Get the current page location to check that it is the login page or not
    ${url_location}    Get Location
    Should Be Equal As Strings    ${url_location}    ${url_login}
User login without input username and password    
    Open Browser    ${url_login}    edge
    Sleep    0.5
    Click Element    tag:button
    Sleep    1
    # Get the current page location to check that it is the login page or not
    ${url_location}    Get Location
    Should Be Equal As Strings    ${url_location}    ${url_login}
