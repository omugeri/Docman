export default function menuReducers(state={}, action) {
  switch (action.type) {
    case 'OPEN_USERS':
      return Object.assign({}, state, {
        users: action.users.users,
        documents: action.users.documents,
        roles: action.users.roles,
        dashboard: action.users.dashboard,
      });
    case 'OPEN_DOCUMENTS':
      return Object.assign({}, state, {
        users: action.documents.users,
        documents: action.documents.documents,
        roles: action.documents.roles,
        dashboard: action.documents.dashboard,
      });

    default:
      return state;

  }
}
