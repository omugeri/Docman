
const express = require('express');
const userCntrl = require('../controllers/user');
const documentCntrl = require('../controllers/document');

const router = express.Router();


router.route('/login')
  .post(userCntrl.login);

router.use(userCntrl.authenticate);

router.route('/logout')
  .post(userCntrl.logout);

router.route('/')
  // create a user
  .post(userCntrl.createUser)
  .get(userCntrl.all);

router.route('/:user_id')
  .get(userCntrl.getSpecificUser)
  .put(userCntrl.updateUser)
  .delete(userCntrl.deleteUser);

router.route('/:user_id/documents')
  .get(documentCntrl.getUserDoc);

module.exports = router;
