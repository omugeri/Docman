import request from 'superagent';
import mocker from 'superagent-mocker';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import * as searchActions from '../../../app/actions/searchActions.js';

const mock = mocker(request);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('Search tests', () => {
  it('simulates searching for documents created on a specific date', () => {
    const res = {
      status: 200,
      body: {
        docs: {
          title: 'Names',
          Content: 'too many names',
          owner: 'ganjez',
        },
        total: 2,
      },
    };
    const datePicked = '2016-09-12';
    window.localStorage = {
      getItem: () => {
        return "\"token123\"";
      },
    };
    mock
    .get('/api/documents', () => {
      return res;
    });
    const expectedAction = [
      {
        type: 'CURRENT_DOCS',
        userDocs: res.body.docs,
      },
      {
        type: 'OPEN_USER_DOC',
        userDocOpen: true,
      },
    ];
    const store = mockStore({});
    return store.dispatch(searchActions.searchQuery(datePicked))
    .then(() => {
      expect(store.getActions()).to.eql(expectedAction);
    });
  });
  it('simulates no search results', () => {
    const res = {
      status: 200,
      body: {
        docs: {
        },
        total: 0,
      },
    };
    const datePicked = '2016-09-12';
    window.localStorage = {
      getItem: () => {
        return "\"token123\"";
      },
    };
    mock
    .get('/api/documents', () => {
      return res;
    });
    const expectedAction = [
      {
        type: 'CURRENT_DOCS',
        userDocs: [{
          content: 'No document found',
          id: 'error1',
          owner: '',
          title: 'Search Results',
        }],
      },
      {
        type: 'OPEN_USER_DOC',
        userDocOpen: true,
      },
    ];
    const store = mockStore({});
    return store.dispatch(searchActions.searchQuery(datePicked))
    .then(() => {
      expect(store.getActions()).to.eql(expectedAction);
    });
  });
});
