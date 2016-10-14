const mongodb = require('mongodb');
const async = require('async');
const TestUsers = require('./data/user');
const TestRoles = require('./data/role');
const TestDocuments = require('./data/document');

const url = 'mongodb://localhost/docman';

async.series([
  (callback) => {
    const MongoClient = mongodb.MongoClient;
    let users;
    let roles;
    let docs;
    MongoClient.connect(url, (err, docman) => {
      if (err) {
        return callback(err);
      }
      console.log("***********Deleting Collections***********");
      users = docman.collection('users');
      roles = docman.collection('roles');
      docs = docman.collection('documents');
      users.remove();
      roles.remove();
      docs.remove();
      console.log("+++++++++ADDING DATA++++++++++++++++");
      users.insert(TestUsers, (err, result) => {
        if (err) {
          console.log("Couldn't insert users: ", err);
        } else {
            console.log("ADDED", result.insertedCount, "USERS");
        }
      });
      roles.insert(TestRoles, (err, result) => {
        if (err) {
          console.log("couldn't insert roles: ", err);
        }
        console.log("ADDED", result.insertedCount, "ROLES");
        callback();
      });
      docs.insert(TestDocuments, (err, result) => {
        if (err) {
          return err;
        }
        console.log("ADDED", result.insertedCount, "DOCS");
        callback();
      });
    });
  },
], (err) => {
  if (err) {
    console.log(err);
  } else {
    process.exit(0);
  }
});
