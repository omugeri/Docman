require('dotenv').load();
const User = require('./../models/user');
const nJwt = require('njwt');

const secret = process.env.SECRET;

const userCntrl = {
  authenticate: (req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      try {
        const verified = nJwt.verify(token, secret);
        req.token = verified;
        next();
      } catch (e) {
        return res.status(401).send({
          message: 'Invalid user',
        });
      }
    } else {
      return res.status(401).send({
        message: 'Invalid user',
      });
    }
  },
  createUser: (req, res) => {
    const permissions = req.token.body.permissions;

    User.find({ email: req.body.email }, (err, users) => {
      if (!users.length) {
        const user = new User(); // create a new instance of the User models

        user.userName = req.body.userName;
        user.name.first = req.body.firstName;
        user.name.last = req.body.lastName;
        user.email = req.body.email;
        user.password = user.generateHash(req.body.password);
        if (permissions === 'Admin') {
          user.role = req.body.role || 'User';
        } else {
          user.role = 'User';
        }

        // save the user and check for errors
        user.save(() => {
          if (err) {
            return res.status(500).json(err);
          } else {
            return res.status(200).json(user);
          }
        });
      } else {
        return res.status(409).json(err);
      }
    });
  },
  all: (req, res) => {
    User.find((err, users) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        users,
      });
    });
  },

  getSpecificUser: (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) {
        res.status(404).json({ err });
      }
      res.status(201).json(user);
    });
  },
  updateUser: (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      const permissions = req.token.body.permissions;
      if (err || !user) {
        return res.status(404).json(err);
      }

      // update the user info
      user.userName = req.body.userName || user.userName;
      user.name.first = req.body.firstName || user.name.first;
      user.name.last = req.body.lastName || user.name.last;
      user.email = req.body.email || user.email;
      user.password = user.generateHash(req.body.password);

      if (permissions === 'Admin') {
        user.role = req.body.role || user.role;
      } else {
        user.role = 'User';
      }

      user.save(() => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(user);
      });
    });
  },

  deleteUser: (req, res) => {
    User.remove({
      _id: req.params.user_id,
    }, (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(user);
    });
  },
  login: (req, res) => {
    User.findOne({ userName: req.body.userName }, (err, user) => {
      if (err) {
        res.status(500).json({ err });
      }
      if (user.validPassword(user, req.body.password)) {
        console.log('WE\'RE HERE');
        const token = generateToken(user.userName, user.role);
        return res.status(202).json(token);
      } else {
        res.status(400).json({ message: 'Error logging in!' });
      }
    });
  },
  logout: (req, res) => {
    if (req.token) {
      const token = 0;
      return res.status(200).json(token);
    }
    return res.status(400);
  },
};

/*
 * generate a token once a user logs in
 */
function generateToken(userName, role) {
  const claims = {
    sub: userName,
    iss: 'docman',
    permissions: role,
  };
  const jwt = nJwt.create(claims, process.env.SECRET);
  const token = jwt.compact();
  return token;
}

module.exports = userCntrl;
