export default function menuReducers(state={}, action) {
  switch (action.type) {
    case 'OPEN_USERS':
      return Object.assign({}, state, {
                users: action.users.users,
                documents: action.users.documents,
                roles: action.users.roles,
                dashboard: action.users.dashboard
              })

    default:
      return state;

  }
}
