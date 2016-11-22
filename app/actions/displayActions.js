import request from 'superagent';
import { openDocuments, openUserDoc } from './menuActions.js';

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
export function editDoc(editDoc) {
  return {
    type: 'EDIT_DOC',
    editDoc,
  };
}
export function userDoc(userDocs) {
  return {
    type: 'CURRENT_DOCS',
    userDocs,
  };
}
export function createDoc(doc) {
  return (dispatch) => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
    .post('/api/documents')
    .set({ 'x-access-token': token })
    .send({
      title: doc.title,
      content: doc.content,
      permissions: doc.permissions,
    })
      .end((err, res) => {
        if (res.status === 200) {
          dispatch(reloadPage(1));
        } else {
          this.setState({
            error: true,
          });
        }
      });
  };
}
export function selectedUser(row) {
  return (dispatch, getState) => {
    const docs = getState().display.users[row]._id;
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
      .get(`/api/users/${docs}/documents`)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (res.status === 200){
          const userDocs = JSON.parse(res.text);
          dispatch(userDoc(userDocs));
          dispatch(openUserDoc({ userDocOpen: true }));
        } else {
          dispatch(errorSet(res.text));
        }
      });
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
        limit: 3,
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
export function handleEditSubmit(doc) {
  return (dispatch) => {
    const id = doc.id;
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
      .put(`/api/documents/${id}`)
      .set({ 'x-access-token': token })
      .send({
        title: doc.title,
        content: doc.content,
        permissions: doc.permissions,
      })
      .end((err, res) => {
        if (res.status === 200) {
          dispatch(reloadPage(1));
        } else {
          return err;
        }
      });
  };
}
export function deleteDoc(doc) {
  return (dispatch) => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    request
      .delete(`/api/documents/${doc}`)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (res.status === 200) {
          dispatch(reloadPage(1));
        } else {
          return err;
        }
      });
  };
}
