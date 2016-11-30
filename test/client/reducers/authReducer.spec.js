import { expect } from 'chai';
import reducer from '../../../app/reducers/authReducer.js';

describe('authentication reducers', () => {
  it('should handle LOGOUT_ACTION', () => {
    expect(
      reducer({}, {
        type: 'LOGOUT_ACTION',
        message: 'I am here',
      })
    ).to.eql({ message: 'I am here' });
  });
  it('should set the state of the error', () => {
    expect(
      reducer({}, {
        type: 'SET_ERROR',
        error: 'error logging in',
      })
    ).to.eql({ error: 'error logging in' });
  });
});
