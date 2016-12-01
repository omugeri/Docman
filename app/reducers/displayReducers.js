export default function displayReducers(state={page: 1}, action) {
  switch (action.type) {
    case 'DISPLAY_USERS':
      return Object.assign({}, state, action.users);

    case 'DISPLAY_DOCUMENTS':
      return Object.assign({}, state, action.documents);

    case 'DISPLAY_ROLES':
      return Object.assign({}, state, { roles: action.roles });

    case 'CHANGE_PAGE':
      return Object.assign({}, state, { page: action.page });

    case 'CURRENT_DOCS':
    console.log(action.userDocs);
      return Object.assign({}, state, {
        userDocs: action.userDocs,
      });

    default:
      return state;

  }
}
