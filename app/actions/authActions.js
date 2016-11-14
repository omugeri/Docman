export function loginAction(token) {
  return {
    type: 'LOGIN_ACTION',
    token,
  };
}

export function logoutAction() {
  return {
    type: 'DESTROY_TOKEN',
    token: '',
  };
}