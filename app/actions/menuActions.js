export function openUsers(users) {
  return { type: 'OPEN_USERS', users };
}
export function openDocuments(documents) {
  return { type: 'OPEN_DOCUMENTS', documents };
}
export function openRoles(roles) {
  return { type: 'OPEN_DOCUMENTS', roles };
}
export function openDashboard(dashboard) {
  return { type: 'OPEN_DASHBOARD', dashboard };
}
export function openUserDoc(userDocOpen) {
  return { type: 'OPEN_USER_DOC', userDocOpen };
}
