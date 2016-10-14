const router = require('express').Router();
const roleCntrl = require('../controllers/roles');
const userCntrl = require('../controllers/user');

router.use(userCntrl.authenticate);

router.route('/')
  // create a role
  .post(roleCntrl.createRole)
  .get(roleCntrl.all);

router.route('/:role_id')
  .put(roleCntrl.updateRole)
  .delete(roleCntrl.deleteRole);
module.exports = router;
