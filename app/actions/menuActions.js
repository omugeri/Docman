export function openUsers(users) {
  return { type: 'OPEN_USERS', users}
}
export function openDocuments(documents) {
  return { type: 'OPEN_DOCUMENTS', documents}
}
export function openRoles(roles) {
  return { type: 'OPEN_ROLES', roles}
}
export function closeUsers(users) {
  return { type: 'CLOSE_USERS', users}
}
export function closeDocuments(documents) {
  return { type: 'CLOSE_DOCUMENTS', documents}
}
export function closeRoles(roles) {
  return { type: 'CLOSE_ROLES', roles}
}
