import { browserHistory } from 'react-router';
import request from 'superagent';
import { displayUsers } from './displayActions';
import { openUsers } from './menuActions';

export function loginAction(token) {
  return {
    type: 'LOGIN_ACTION',
    token,
  };
}

export function logoutAction() {
  return {
    type: 'LOGOUT_ACTION',
    message: '',
  };
}

export function errorSet(error) {
  return {
    type: 'SET_ERROR',
    error,
  };
}
export function registerClose() {
  return {
    type: 'REGISTER_OPEN',
    register: false,
  }
}
export function reloadUser() {
  return (dispatch) => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
      .get('/api/users/')
      .set({ 'x-access-token': token })
      .accept('json')
      .end((err, res) => {
        const user = JSON.parse(res.text);
        if (res.status === 401) {
          browserHistory.push('/');
        }
        dispatch(displayUsers(user));
        const userMenu = {
          users: true,
          dashboard: false,
          documents: false,
          roles: false,
        };
        dispatch(openUsers(userMenu));
      });
  };
}
export function create(user) {
  return (dispatch) => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
    .post(`/api/users/`)
    .set({ 'x-access-token': token })
    .send({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    })
      .end((err, res) => {
        if (res.status === 200) {
          dispatch(registerClose());
          dispatch(reloadUser());
        } else {
          dispatch(errorSet(err));
        }
      });
  };
}
