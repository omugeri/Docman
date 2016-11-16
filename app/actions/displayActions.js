import request from 'superagent';
import { openDocuments } from './menuActions.js';

export function displayUsers(users) {
  return {
    type: 'DISPLAY_USERS',
    users,
  };
}
export function displayDocs(documents) {
  return {
    type: 'DISPLAY_DOCUMENTS',
    documents,
  };
}
export function displayRoles(roles) {
  return {
    type: 'DISPLAY_ROLES',
    roles,
  };
}
export function displayDashboard(info) {
  return {
    type: 'DISPLAY_DASHBOARD',
    info,
  };
}
export function changePage(page) {
  return {
    type: 'CHANGE_PAGE',
    page,
  };
}

export function reloadPage(page) {
  return (dispatch) => {
    dispatch(changePage(page));
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
      .get('/api/documents/')
      .set({ 'x-access-token': token })
      .query({
        limit: 6,
        page,
      })
      .accept('json')
      .end((err, res) => {
        const documents = JSON.parse(res.text);
        dispatch(displayDocs(documents));
        const documentsMenu = {
          dashboard: false,
          users: false,
          documents: true,
          roles: false,
        };
        dispatch(openDocuments(documentsMenu));
      });
  };
}
