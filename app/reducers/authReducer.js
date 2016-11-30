export default function authReducers(state={}, action) {
  switch (action.type) {
    case 'LOGOUT_ACTION':
      return Object.assign({}, state, {
        message: action.message,
      });

    case 'SET_ERROR':
      return Object.assign({}, state, { error: action.error });

    case 'SET_PERMISSION':
      return Object.assign({}, state, { permissions: action.permissions });

    default:
      return state;
  }
}
