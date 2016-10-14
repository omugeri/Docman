
const router = require('express').Router();
const documentCntrl = require('../controllers/document');
const userCntrl = require('../controllers/user');

router.use(userCntrl.authenticate);

router.route('/')

  // create a document
  .post(documentCntrl.createDoc)
  .get(documentCntrl.all);

router.route('/:document_id')

  // get the document with that id
  .get(documentCntrl.getSpecificDoc)

  // update the document with given id
  .put(documentCntrl.updateDoc)
  .delete(documentCntrl.deleteDoc);

module.exports = router;
