import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from './components/pages/LandingPage/Home.jsx';

render((
  <Router history={browserHistory}>
    <Route component={Home} path='/'/>
  </Router>
), document.getElementById('container'));

// const routes = (
//   <Router history={browserHistory}>
//     <Route path='/' component={homepage}/>
//   </Router>
// )
//
// render(routes, document.getElementById('container'));
