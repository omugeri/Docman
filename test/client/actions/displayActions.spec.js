import request from 'superagent';
import mocker from 'superagent-mocker';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import * as displayActions from '../../../app/actions/displayActions.js';

const mock = mocker(request);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('display actions', () => {
  beforeEach(() => {
    mock.clearRoutes();
  });

  it('simulates setting users to true to display the users', () => {
    const users = {
      user: true,
      documents: false,
    };
    const expectedAction = {
      type: 'DISPLAY_USERS',
      users,
    };
    expect(displayActions.displayUsers(users)).to.eql(expectedAction);
  });

  it('simulates setting documents to true to display the docs', () => {
    const documents = {
      user: false,
      documents: true,
    };
    const expectedAction = {
      type: 'DISPLAY_DOCUMENTS',
      documents,
    };
    expect(displayActions.displayDocs(documents)).to.eql(expectedAction);
  });
  it('simulates setting dashboard to true to display information', () => {
    const info = {
      info: true,
    };
    const expectedAction = {
      type: 'DISPLAY_DASHBOARD',
      info,
    };
    expect(displayActions.displayDashboard(info)).to.eql(expectedAction);
  });

  it('simulates setting the page to be displayed', () => {
    const page = 1;
    const expectedAction = {
      type: 'CHANGE_PAGE',
      page,
    };
    expect(displayActions.changePage(page)).to.eql(expectedAction);
  });

  it('simulates setting the editDoc variable to true', () => {
    const editDoc = true;
    const expectedAction = {
      type: 'EDIT_DOC',
      editDoc,
    };
    expect(displayActions.editDoc(editDoc)).to.eql(expectedAction);
  });

  it('simulates setting the user documents variable to true', () => {
    const userDocs = true;
    const expectedAction = {
      type: 'CURRENT_DOCS',
      userDocs,
    };
    expect(displayActions.userDoc(userDocs)).to.eql(expectedAction);
  });
});
