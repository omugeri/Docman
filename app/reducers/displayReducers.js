export default function displayReducers(state={}, action) {
  switch (action.type) {
    case 'DISPLAY_USERS':
      return Object.assign({}, state, action.users);

    case 'DISPLAY_DOCUMENTS':
      return Object.assign({}, state, action.documents);

    case 'CHANGE_PAGE':
      return Object.assign({}, state, { page: action.page });

    case 'EDIT_DOC':
      return Object.assign({}, state, action.editDoc);

    case 'CURRENT_DOCS':
      return Object.assign({}, state, {
        userDocs: action.userDocs,
      });

    default:
      return state;

  }
}
