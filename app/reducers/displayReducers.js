export default function displayReducers(state={}, action) {
  switch (action.type) {
    case 'DISPLAY_USERS':
      return Object.assign({}, state, action.users);

    case 'DISPLAY_DOCUMENTS':
      return Object.assign({}, state, action.documents);

    default:
      return state;

  }
}
