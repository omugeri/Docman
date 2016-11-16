export default function authReducers(state={}, action) {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return Object.assign({}, state, { token: action.token });

    case 'LOGOUT_ACTION':
      return Object.assign({}, state, action.token);

    default:
      return state;
  }
}
