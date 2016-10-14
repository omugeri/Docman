const userRoutes = require('./user');
const documentRoutes = require('./document');
const rolesRoutes = require('./roles');

const router = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/documents', documentRoutes);
  app.use('/api/roles', rolesRoutes);
};

module.exports = router;
