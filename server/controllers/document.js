const Document = require('./../models/document');
const User = require('./../models/user');
const userCntrl = require('./user');

const documentCntrl = {
  createDoc: (req, res) => {
    const permissions = req.token.body.permissions;
    const owner = req.token.body.sub;
    const document = new Document(); // create a new instance of the Document
    document.title = req.body.title;
    document.content = req.body.content;

    if (permissions === 'Admin') {
      document.permissions = req.body.permissions || 'Public';
      document.owner = req.body.owner;
    } else {
      document.permissions = 'Public';
      document.owner = owner;
    }

    // save the document and check for errors
    document.save((err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(document);
    });
  },
  all: (req, res) => {
    const permissions = req.token.body.permissions;
    const owner = req.token.body.sub;
    const limit = req.body.limit || req.query.limit;
    const page = req.body.page || req.query.page || req.headers.page;
    const published = req.body.published || req.query.published || req.headers.published;
    let query;

    if (permissions === 'Admin') {
      if (published) {
        const start = new Date(published);
        const end = new Date(start.getTime() + 86400000);

        query = Document.find({ createdAt: { $gte: start, $lt: end } });
      }
      query = Document.find();
    } else if (published) {
      const start = new Date(published);
      const end = new Date(start.getTime() + 86400000);

      query = Document.find(
        { $and: [{ createdAt: { $gte: start, $lt: end } },
          { $or: [{ owner: owner }, { permissions: 'Public' }] }],
        });
    } else {
      query = Document.find(
        { $or: [{ owner: owner }, { permissions: 'Public' }],
      });
    }
    Document.paginate(query.sort('-createdAt'),
    { page: parseInt(page, 10), limit: parseInt(limit, 10) })
      .then((documents) => {
        return res.status(200).json(documents);
      });
  },
  getSpecificDoc: (req, res) => {
    Document.findById(req.params.document_id, (err, document) => {
      if (err || !document) {
        return res.status(404).err;
      }
      return res.json(document);
    });
  },
  getUserDoc: (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) {
        return res.status(404).err;
      }
      Document.find({ owner: user.userName }, (err, documents) => {
        if (err) {
          return res.status(500).err;
        }
        return res.status(200).json(documents);
      });
    });
  },
  updateDoc: (req, res) => {
    const permissions = req.token.body.permissions;
    const owner = req.token.body.sub;

    Document.findById(req.params.document_id, (err, document) => {
      if (err || !document) {
        return res.status(404).json(err);
      }
      if (owner !== document.owner) {
        return res.status(403).json({ message: 'Cannot edit this document!' });
      }
      // update the document info
      document.title = req.body.title;
      document.content = req.body.content;
      document.owner = owner;
      document.modifiedAt = Date.now();
      if (permissions === 'Admin') {
        document.permissions = req.body.permissions;
      } else {
        document.permissions = 'Public';
      }

      document.save((err) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.json({ message: 'Document updated!' });
      });
    });
  },
  deleteDoc: (req, res) => {
    Document.remove({
      _id: req.params.document_id,
    }, (err, user) => {
      if (err) {
        return res.status(400).err;
      }
      return res.json({ message: 'Successfully deleted' });
    });
  },
};

module.exports = documentCntrl;
