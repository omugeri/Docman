import { expect } from 'chai';
import reducer from '../../../app/reducers/menuReducers.js';

describe('menu reducers', () => {
  it('simulates setting the user menu to true', () => {
    expect(
      reducer({}, {
        type: 'OPEN_USERS',
        users: true,
      })
    ).to.eql({
      users: true,
      documents: false,
      roles: false,
    });
  });
  it('simulates setting the documents menu', () => {
    expect(
      reducer({}, {
        type: 'OPEN_DOCUMENTS',
        documents: true,
      })
    ).to.eql({
      users: false,
      documents: true,
      roles: false,
    });
  });
  it('simulates setting the roles menu to true', () => {
    expect(
      reducer({}, {
        type: 'OPEN_ROLES',
        roles: true,
      })
    ).to.eql({
      users: false,
      documents: false,
      roles: true,
    });
  });
  it('simulates setting the user documents dialog', () => {
    expect(
      reducer({}, {
        type: 'OPEN_USER_DOC',
        userDocOpen: true,
      })
    ).to.eql({
      userDocOpen: true,
    });
  });
});
