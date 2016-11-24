const menu = {
  users: false,
  documents: true,
  dashboard: false,
}
export default function menuReducers(state = menu, action) {
  switch (action.type) {
    case 'OPEN_USERS':
      return Object.assign({}, state, {
        users: action.users,
        documents: false,
        dashboard: false,
      });
    case 'OPEN_DOCUMENTS':
      return Object.assign({}, state, {
        users: false,
        documents: action.documents,
        dashboard: false,
      });
    case 'OPEN_USER_DOC':
      return Object.assign({}, state, {
        userDocOpen: action.userDocOpen,
      });
    default:
      return state;

  }
}
