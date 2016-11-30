import { expect } from 'chai';
import reducer from '../../../app/reducers/displayReducers.js';

describe('display reducers', () => {
  const users = {
    _id: '567duje234',
    username: 'ganjez',
    name: {
      first: 'Alex',
      last: 'Mugane',
    },
  };
  it('should simulate getting user details to display', () => {
    expect(
      reducer({}, {
        type: 'DISPLAY_USERS',
        users,
      })
    ).to.eql(users);
  });
  const documents = {
    _id: '93475jkd834',
    title: 'Alice in Wonderland',
    content: 'I dont even know how the tale goes',
  };
  it('simulates getting documents to display', () => {
    expect(
      reducer({}, {
        type: 'DISPLAY_DOCUMENTS',
        documents,
      })
    ).to.eql(documents);
  });
  it('simulates setting the page to be displayed', () => {
    expect(
      reducer({}, {
        type: 'CHANGE_PAGE',
        page: 3,
      })
    ).to.eql({ page: 3 });
  });
  const userDocs = {
    title: 'CARS',
    content: 'Automotives that commonly have four wheels used' +
    'as a means of transportation for many pple',
    owner: 'ganjez',
  };
  it('simulates storing the docs of a specific user', () => {
    expect(
      reducer({}, {
        type: 'CURRENT_DOCS',
        userDocs,
      })
    ).to.eql({ userDocs });
  });
});
