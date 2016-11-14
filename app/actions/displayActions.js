export function displayUsers(users) {
  return {
    type: 'DISPLAY_USERS',
    users,
  };
}
export function displayDocs(users) {
  return {
    type: 'DISPLAY_DOCUMENTS',
    users,
  };
}
export function displayRoles(users) {
  return {
    type: 'DISPLAY_ROLES',
    users,
  };
}
export function displayDashboard(users) {
  return {
    type: 'DISPLAY_DASHBOARD',
    users,
  };
}
