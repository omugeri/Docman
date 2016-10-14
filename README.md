# Checkpoint_3
[![Coverage Status](https://coveralls.io/repos/github/andela-omugeri/Checkpoint_3/badge.svg?branch=develop)](https://coveralls.io/github/andela-omugeri/Checkpoint_3?branch=develop)
[![CircleCI](https://circleci.com/gh/andela-omugeri/String.svg?style=svg)](https://circleci.com/gh/andela-omugeri/String)

This Document Management System allows users to manage documents and the administrator to create and manage users & roles.
Each User has a role while documents have owners and permissions. The Administrator can view all documents, however users can only view their own documents and public ones. The default permission for documents is public.

## Dependencies
* Mongoose​
* Node
* Postman

## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
1. Install [**MongoDB**](https://www.mongodb.org/) .
1. Clone the [**repository here**](https://github.com/andela-omugeri/Checkpoint_3)
1. [**cd**] into the root of the **Checkpoint_3 project directory**.
1. Run `npm install` on the terminal.

## Tests

Run `npm test` on the terminal while within the **project root directory**.

## Usage
### Starting
In the project root, run `npm start`.
### Routes

* #### login
`http://127.0.0.1:8080/api/users/login`

* #### logout
`http://127.0.0.1:8080/api/users/logout`
* #### users

  * ##### create
  `POST`
  `http://127.0.0.1:8080/api/users`

  * ##### update
  `PUT`
  `http://127.0.0.1:8080/api/users/:id`

  * ##### delete
  `DELETE`
  `http://127.0.0.1:8080/api/users/:id`

  * ##### get one user
  `GET`
  `http://127.0.0.1:8080/api/users/:id`

  * ##### get all users
  `GET`
  `http://127.0.0.1:8080/api/users`

* #### documents

  * ##### create
  `POST`
  `http://127.0.0.1:8080/api/documents`

  * ##### update
  `PUT`
  `http://127.0.0.1:8080/api/documents/:id`

  * ##### delete
  `DELETE`
  `http://127.0.0.1:8080/api/documents/:id`

  * ##### get all documents
  `GET`
  `http://127.0.0.1:8080/api/documents`

  * ##### get a document
  `GET`
  `http://127.0.0.1:8080/api/documents/:id`

  * ##### get documents belonging to a particular user
  `GET`
  `http://127.0.0.1:8080/api/users/:id/documents`

  * ##### get documents by date
  `GET`
  `http://127.0.0.1:8080/api/documents?published=2016-09-05`

  * #### paginate documents
  `GET`
  `http://127.0.0.1:8080/api/documents?limit=1&page=2`

* #### roles

  * ##### create
  `POST`
  `http://127.0.0.1:8080/api/roles`

  * #####  get all roles
  `GET`
  `http://127.0.0.1:3000/api/roles`

  * #####  update one role
  `PUT`
  `http://127.0.0.1:3000/api/roles/:id`

  * #####  delete one role
  `DELETE`
  `http://127.0.0.1:3000/api/roles/:id`

 You can fetch documents by role or date routes with limits to the the number of results they return, check the `search.spec.js` file for examples.
**NB** Make sure all tests pass before testing the api with POSTman.

## Models

Three models are defined: `Roles`, `Users` and `Documents`. `Roles` must have a unique title on their creation. A `User` must have a `Role` defined for them. The routes are defined under `server/models`.

## Testing

Testing is achieved through use of `superagent`, `mocha` and `chai` packages. `superagent` is used to make requests to the api and `mocha` is the testing framework and `chai` is the exception library. They will both be installed when you run `npm install` and the tests will run when you run `npm test`.

## Express Routes

Api endpoints were created using `express` router. The routes are defined under `server/routes`.

## Mongo Database

Ensure that you have installed `mongodb` locally. Before you go ahead to run the tests or work with the api, run `mongod` on a seperate tab on your terminal. Add the configuration to the db connection in your `.env` file. Each time tests are run or the app is run, the database is dropped and seeded.
