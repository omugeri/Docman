import request from 'superagent';
import mocker from 'superagent-mocker';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import * as displayActions from '../../../app/actions/displayActions.js';

const mock = mocker(request);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Display async actions', () => {
  beforeEach(() => {
    mock.clearRoutes();
  });

  it('simulates reloading a page after fetching documents', () => {
    const res = {
      body: {
        title: 'Names',
        Content: 'too many names',
        owner: 'ganjez',
      },
    };
    window.localStorage = {
      getItem: () => {
        return "\"token123\"";
      },
    };
    mock
      .get('/api/documents/', () => {
        return res;
      });
    const expectedActions = [
      { type: 'CHANGE_PAGE', page: 1 },
      { type: 'DISPLAY_DOCUMENTS', documents: res.body },
      { type: 'OPEN_DOCUMENTS', documents: true },
    ];
    const store = mockStore({ });

    return store.dispatch(displayActions.reloadPage(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('simulates creating documents', () => {
    const res = {
      status: 200,
    };
    const doc = {
      title: 'Names',
      Content: 'too many names',
      owner: 'ganjez',
    };
    window.localStorage = {
      getItem: () => {
        return "\"token123\"";
      },
    };
    mock
    .post('/api/documents', () => {
      return res;
    });
    const expectedAction = [{ type: 'CHANGE_PAGE', page: 1 }];
    const store = mockStore({});
    return store.dispatch(displayActions.createDoc(doc))
    .then(() => {
      expect(store.getActions()).to.eql(expectedAction);
    });
  });
  it('simulates selecting a particular user', () => {
    const row = 2;
    window.localStorage = {
      getItem: () => {
        return "\"token123\"";
      },
    };
    const res = {
      status: 200,
      body: {
        title: 'Names',
        Content: 'too many names',
        owner: 'ganjez',
      },
    };
    const docs = 'hi09876b';
    mock
    .get(`/api/users/${docs}/documents`, () => {
      return res;
    });
    const expectedActions = [
      { type: 'CURRENT_DOCS', userDocs: res.body },
      { type: 'OPEN_USER_DOC', userDocOpen: true },
    ];
    const store = mockStore({
      display: {
        users: [{ _id: '678kje' }, { _id: '9387y4j' }, { _id: 'hi09876b' }],
      },
    });
    return store.dispatch(displayActions.selectedUser(row))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it('simulates submitting an edited document', () => {
    window.localStorage = {
      getItem: () => {
        return "\"token123\"";
      },
    };
    const doc = {
      id: 'hj098976fvu',
      title: 'Names',
      Content: 'too many names',
      owner: 'ganjez',
    };
    const res = {
      status: 200,
    };
    const id = 'hj098976fvu';
    mock
    .put(`/api/documents/${id}`, () => {
      return res;
    });
    const expectedAction = [{
      type: 'CHANGE_PAGE',
      page: 1,
    }];
    const store = mockStore({ doc });
    return store.dispatch(displayActions.handleEditSubmit(doc))
    .then(() => {
      expect(store.getActions()).to.eql(expectedAction);
    });
  });
  it('simulates deleting documents', () => {
    window.localStorage = {
      getItem: () => {
        return "\"token123\"";
      },
    };
    const res = { status: 200 };
    const doc = 'hj098976fvu';
    mock
    .del(`/api/documents/${doc}`, () => {
      return res;
    });
    const expectedAction = [{
      type: 'CHANGE_PAGE',
      page: 1,
    }];
    const store = mockStore({ doc });
    return store.dispatch(displayActions.deleteDoc(doc))
    .then(() => {
      expect(store.getActions()).to.eql(expectedAction);
    });
  });
});
