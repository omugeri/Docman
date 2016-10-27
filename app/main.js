import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './components/pages/LandingPage/Home.jsx';
import Login from './components/pages/Authentication/Login.jsx';
// import Menu from './components/pages/LandingPage/MenuBar.jsx';

render((
  <Router history={browserHistory}>
  <Route path='/' component={Home} />
  <Route path='/login' component={Login} />
  {/*<Route path='/signup' component={Signup}/>*/}
  </Router>
), document.getElementById('container'));
