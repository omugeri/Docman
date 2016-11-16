import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import Home from './components/pages/LandingPage/Home.jsx';
import Login from './components/pages/Authentication/Login.jsx';
import Base from './components/pages/Dashboard/Base.jsx';
import App from './App.jsx';
import Edit from './components/pages/Dashboard/Edit.jsx';
// import { loginAction } from './actions/authActions';


const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Base} />
        <Route path="/edit" component={Edit} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('container'));
