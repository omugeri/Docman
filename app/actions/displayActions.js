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
export function editDoc(editDoc) {
  return {
    type: 'EDIT_DOC',
    editDoc,
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
export function handleEditSubmit(doc) {
  return (dispatch) => {
    const id = doc.id;
    console.log('id is: ', doc);
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
        if(res.status === 200) {
          dispatch(reloadPage(1));
        } else {
          console.log('error: ', err);
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
          console.log(res.body.message);
          dispatch(reloadPage(1));
        } else {
          console.log('err is: ', err);
        }
      });
  };
}
