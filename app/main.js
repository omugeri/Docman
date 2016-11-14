import React from 'react';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './components/pages/LandingPage/Home.jsx';
import Login from './components/pages/Authentication/Login.jsx';
import Base from './components/pages/Dashboard/Base.jsx';

const store = configureStore();


render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path='/' component={Home}>
      <IndexRoute component={Home} />
      <Route path='/login' component={Login} />
    </Route>
    <Route path="/dashboard" component={Base} />
  </Router>
  </Provider>
, document.getElementById('container'));
