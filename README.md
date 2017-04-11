## Overview

#### Web application that allows students to vote on how likely it is that a given topic will show up on the next test. 
#### This application is written in Javascript and uses JQuery and AJAX

### INFORMATION FOR USERS:

1. Creating an account:
    * Click the 'Register' button and enter a username and password.
      > Note: a valid username is an email in the csu.fullerton.edu domain.
2. Logging in:
    * Click the 'Login' button and enter your credentials.
3. Posting a Topic:
    * Select your desired course from the drop-down menu.
    * Enter your topic in the field labelled 'Topic'.
    * Click the 'Submit' Button.
4. Voting on a Topic:
    * For a given topic, click the 'Like' or 'Dislike' button to enter a vote.

## Installation and Execution
### Prerequisites

* Node.js
    #### For latest version download from https://nodejs.org/en/download/
    
* Atom text editor
    #### Install at > https://atom.io/
    
* Atom Plug-ins (Optional)
    #### Open Atom and navigate to its Settings screen. On a Mac, this is done by choosing Atom → Preferences... On Windows, you can access it via File → Settings or using the keyboard shortcut Ctrl-. On the lefthand side of the Settings   screen, click + Install
    #### Install emmet,atom-beautify, autocomplete-paths, api-docs, linter, linter-csslint, linter-htmlhint and linter-eslint
    
* Google Chrome Browser
    #### For latest version > www.google.com/chrome/browser/desktop

* Install `npm` Packages:
#### Open your terminal and enter the following command
    > npm install -g json-server
    > npm install -g browser-sync

### Running the application: 
#### Navigate to Project folder in the terminal-

	> cd CPSC473_Project1
#### Type in the following command- 

	> json-server --port=3002 --watch db.json
#### Open another terminal and use following commands -

	> cd CPSC473_Project1
	> browser-sync start --server

#### Web server will be up and running on your local machine at -

	> http://localhost:3000

## Group Members:
-Regine Lee
-Arjen Mercado
-Diana Galvan
-Luan Khong
-Eric Lara
-Nikita Sadinidhi Vijayan
