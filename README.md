## Overview

<p> Web application that allows students to vote on how likely it is that a given topic will show up on the next test.
This application is written in Javascript and uses JQuery and AJAX </p>

## Group Members:
* Regine Lee
* Arjen Mercado
* Nikita Sadinidhi Vijayan
* Diana Galvan
* Luan Khong
* Eric Lara


## INFORMATION FOR USERS:

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
    <p> For latest version download from https://nodejs.org/en/download/ </p>

* Atom text editor (Any Editor)
    <p> Install at > https://atom.io/ </p>

* Atom Plug-ins (Optional)
   <p> Open Atom and navigate to its Settings screen. On a Mac, this is done by choosing Atom → Preferences... On Windows, you can access it via File → Settings or using the keyboard shortcut Ctrl-. On the lefthand side of the Settings   screen, click + Install. Install emmet,atom-beautify, autocomplete-paths, api-docs, linter, linter-csslint, linter-htmlhint and linter-eslint. </p>

* Google Chrome Browser
    <p> For latest version > www.google.com/chrome/browser/desktop </p>

* Install `npm` Packages:
<p> Open your terminal and enter the following command </p>

    > npm install -g json-server
    > npm install -g browser-sync

### Running the application:
**Navigate to Project folder in the terminal-**

	> cd CPSC473_Project1
**Type in the following command- to start the json server**

	> json-server --port=3002 --watch db.json
**Open another terminal and use following commands**

	> cd CPSC473_Project1
	> browser-sync start --server --files "*.html, stylesheets/*.css, scripts/*.js"

**Web server will be up and running on your local machine at -**

	> http://localhost:3000

## Technical Details
#### Purpose: 
Students can vote on how likely it is that a given topic will show up on the next test.

##### Functionality:
* Users can register with their school email_id and create a own password
* Once students registered, they can login to like or dislike a particular topic.

##### Coding details:
	> included in the TitanStudyBuddy_Documentation google doc link below
	https://docs.google.com/document/d/1ENDgfB44NvwemCBMJdApgV-jvHXadrPbxBIKBmXKKQE/edit?usp=sharing

##### JSON database structure:
The db.json consist of two arrays called "Topics_Submitted" and "LoginAccounts".

**TopicSubmissions**
1.	“id”: this is used as a unique identifier for topics.
2.	“course”: Course name.
3.	“topic”: It is the topic name from the course.
4.	“likes”:  counter for number of likes
5.	“dislikes”: counter for number of dislikes
6.	“likesEmail”: this is an array which consist email_ids of students who liked a topic.
7.	“dislikesEmail”: this is an array which consist email_ids of students who disliked a topic.

**LoginAccounts**
1.	“id”: this is used as a unique identifier for user id.
2.	“username”: it has the user's email id.
3.	“password”: it contains the user password.

## User Manual

 
- Launch the web page by running browser sync. The webpage will look like the screen shot below.
![first_look](https://cloud.githubusercontent.com/assets/14969562/24989769/d8541e16-1fc3-11e7-8787-cf337719b232.PNG)

- click on the register button to register with csu.fullerton.edu.
![registration](https://cloud.githubusercontent.com/assets/14969562/24989796/042aca08-1fc4-11e7-95ee-c60ae115f58d.PNG)

- Enter the username, password and click Register button.

- Click on login button and enter the details as shown below to login.
![login](https://cloud.githubusercontent.com/assets/14969562/24989893/c3b8b952-1fc4-11e7-8db6-2f63c262277d.PNG)

- After login it looks as shown below.
![after_login](https://cloud.githubusercontent.com/assets/14969562/24989909/df02fc4a-1fc4-11e7-93e6-6c8b96066644.PNG)

- Now, you can post a topic by selecting the course from the dropdown.
![select_course](https://cloud.githubusercontent.com/assets/14969562/24989927/ff63359a-1fc4-11e7-866a-7a7a89e3eeba.png)

- Enter the topic and click on submit button
![topic_entered](https://cloud.githubusercontent.com/assets/14969562/24989949/2c363c02-1fc5-11e7-9131-2baa40908f8b.PNG)

- Now, you will see the topic you entered displayed at the bottom of the topics for all course.
![added topic](https://cloud.githubusercontent.com/assets/14969562/24989967/53a88326-1fc5-11e7-9587-4d283f859b40.PNG)

- Click on like or dislike button and notice the counter value change.
![final](https://cloud.githubusercontent.com/assets/14969562/24990134/71b58070-1fc6-11e7-87a9-92016981f5e6.PNG)

- If you are not logged in, the following error message will be displayed.
![errorlogin](https://cloud.githubusercontent.com/assets/14969562/24990010/9ad07510-1fc5-11e7-86b9-acb6e8b8dde1.PNG)

- If you have already voted, then the following error message will be displayed.
![already voted](https://cloud.githubusercontent.com/assets/14969562/24990057/f0da631c-1fc5-11e7-8ff6-857c82db825d.PNG)



