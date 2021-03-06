// call the packages we need
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./server/routes');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackHotMiddleware = require('webpack-hot-middleware');
// It serves the files emitted from webpack over a connect server
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const injectTapEventPlugin = require('react-tap-event-plugin');

// require('dotenv').load();
injectTapEventPlugin();

const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;

// the mpromise is deprecated so had to plugin another library
mongoose.Promise = global.Promise;

// applies if running on production mode
app.use(express.static(__dirname + '/dist'));

if (isDeveloping) {
  require('dotenv').load();

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  mongoose.connect('mongodb://localhost/docman');

  app.use(bodyParser.json());
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  router(app);
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
    // applies if running on production mode
  mongoose.connect(process.env.MONGOLAB_URI);

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/dist'));
  router(app);
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

// START THE server
app.listen(port);
console.log('Magic happens on port ', port);

module.exports = app;
