import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Dialog from 'material-ui/Dialog';

import Login from '../../../app/components/pages/Authentication/Login.jsx';

describe('Login Dialog', () => {
  it('asserts that there is a Dialog', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('Dialog')).to.be.defined;
  });
  it('asserts that the dialog has a title', () => {
    const wrapper = shallow(<Login />);
    const Dialog = wrapper.find('Dialog');
    expect(Dialog.props().title).to.be.defined;
  });
});
