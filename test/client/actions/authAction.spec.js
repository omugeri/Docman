import request from 'superagent';
import mocker from 'superagent-mocker';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import * as authActions from '../../../app/actions/authActions.js';

const mock = mocker(request);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async authentication actions', () => {
  const credentials = {
    userName: 'riwhiz',
    password: 'olive',
  };

  beforeEach(() => {
    mock.clearRoutes();
  });
  const user = {
    token: 'token123',
    user: 'riwhiz',
  };

  it('simulates successful login', () => {
    mock
      .post('/api/users/login', () => {
        return {
          body: user,
        };
      });
  });

  it('simulates failed login', () => {
    const error = { error: 'Incorrect username and password!' };
    const expectedAction = {
      type: 'SET_ERROR',
      error,
    };
    expect(authActions.errorSet(error)).to.eql(expectedAction)
  });

  it('simulates logout', () => {
    const message = '';
    const expectedAction = {
      type: 'LOGOUT_ACTION',
      message,
    };
    expect(authActions.logoutAction(message)).to.eql(expectedAction);
  });

  it('simulates setting dialog to true', () => {
    const register = false;
    const expectedAction = {
      type: 'REGISTER_OPEN',
      register,
    };
    expect(authActions.registerClose(register)).to.eql(expectedAction);
  });

  it('simulates displays users once reloading is done', () => {
    const res = {
      body: {
        fullname: 'Alex Mugane',
        role: 'User',
        userName: 'ganjez',
      },
    };
    window.localStorage = {
      getItem: () => {
      return  "\"token123\"";
      }
    }
    mock
      .get('/api/users/', () => {
        return res;
      });
    const expectedActions = [
      { type: 'DISPLAY_USERS', users: res.body },
      { type: 'OPEN_USERS', users: {
        "dashboard": false,
        "documents": false,
        "roles": false,
        "users": true,
      } }
    ]
    const store = mockStore({ });

    return store.dispatch(authActions.reloadUser())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('simulates creating a new user', () => {
    const user = {
        firstName: 'Alex',
        lastName: 'Mugane',
        userName: 'ganjez',
        email: 'email@sth.com',
        password: '12345tfdsdfg',
    };

    window.localStorage = {
      getItem: () => {
      return  "\"token123\"";
      }
    };
    const res = {
      status: 200,
      body: {
        fullname: 'Alex Mugane',
        role: 'User',
        userName: 'ganjez',
      },
    };
    mock
    .post(`/api/users/`, () => {
      return res;
    });
    const expectedActions = [
      {
        type: 'REGISTER_OPEN',
        register: false,
      },
    ];
    const store = mockStore({ });

    return store.dispatch(authActions.create(user))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  })
});
