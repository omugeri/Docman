import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import HomePage from './components/pages/LandingPage/Home.jsx';
import Login from './components/pages/Authentication/Login.jsx';
import Signup from './components/pages/Authentication/Signup.jsx';
import Base from './components/pages/Dashboard/Base.jsx';
import App from './App.jsx';
import Edit from './components/pages/Dashboard/Edit.jsx';
import ErrorPage from './components/pages/Authentication/ErrorPage.jsx';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Base} />
        <Route path="/edit" component={Edit} />
        <Route path="/*" component={ErrorPage} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('container'));
