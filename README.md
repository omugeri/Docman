# DOCMAN
[Coverage Status](https://coveralls.io/repos/github/andela-omugeri/Checkpoint_3/badge.svg?branch=develop)](https://coveralls.io/github/andela-omugeri/Checkpoint_3?branch=develop)
[![CircleCI](https://circleci.com/gh/andela-omugeri/String.svg?style=svg)](https://circleci.com/gh/andela-omugeri/String)

This Document Management System allows users to manage documents and the administrator to create and manage users & roles.
Each User has a role while documents have owners and permissions. The Administrator can view all documents, however users can only view their own documents and public ones. The default permission for documents is public. To make a document private toggle the button at the bottom of the form.

## Dependencies
* React
* Material UI
* Mongoose​
* Node

## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
1. Install [**MongoDB**](https://www.mongodb.org/) .
1. Clone the [**repository here**](https://github.com/andela-omugeri/Checkpoint_3)
1. [**cd**] into the root of the **Docman project directory**.
1. Run `npm install` on the terminal.

## Tests

Run `npm test` on the terminal while within the **project root directory** for
front end tests and `npm testBend` for backend tests.

## Usage
### Starting
In the project root, run `npm start`.
### Routes

* #### login
`http://127.0.0.1:8080/`
Click the login button on the home page. Successful login redirects you to the
dashboard.

* #### logout
to logout, click on the logout button on the top-right of the dashboard.

* #### users
  to view users, click on the users button on the left side menu. These brings a
  list of all the users and their roles.

  * ##### create
  To create a user, click on the users button on the left menu then click on the
  green floating button. The default permissions for new users is 'User'.


* #### documents

  * ##### create
  To create a document, click on the document button on the left menu then click on the
  green floating button. The default permissions for new documents is 'Public'.

  * ##### update
  To update a document choose edit on the drop down menu on the specific document.
  P.S. you can only update your own document.

  * ##### delete
  To delete a document choose delete on the drop down menu on the specific document.
  P.S. you can only delete your own document.

  * ##### get documents belonging to a particular user
  To see a users document, click on the user and all the documents will be displayed.
  scroll to see them all.

**NB** Make sure all tests pass before running the System.

## Models

Three models are defined: `Roles`, `Users` and `Documents`. `Roles` must have a unique title on their creation. A `User` must have a `Role` defined for them. The routes are defined under `server/models`.

## Testing

Testing is achieved through use of `enzyme`, `mocha` and `chai` packages. `enzyme` is used to simulate react events while testing. `mocha` is the testing framework and `chai` is the exception library. They will both be installed when you run `npm install` and the tests will run with the command `npm test`.

## Routes

The routes are defined using `react-router`.

## Mongo Database

Ensure that you have installed `mongodb` locally or substitute with one of the available
cloud mongo databases. Before you go ahead to run the tests or work with the api, run `mongod` on a separate tab on your terminal. Add the configuration to the db connection in your `.env` file. Each time tests are run or the app is run, the database is dropped and seeded.
