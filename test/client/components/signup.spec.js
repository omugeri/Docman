import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Signup } from '../../../app/components/pages/Authentication/Signup.jsx';

describe('<Signup />', () => {
  it('renders with a Signup title', () => {
    const wrapper = shallow(<Signup />);
    const dialog = wrapper.childAt(0);
    expect(dialog.props().title).to.eql('New User');
  });
  it('renders a firstName input field', () => {
    const wrapper = shallow(<Signup />);
    const text = wrapper.find('TextField');
    expect(text.first().props().floatingLabelText).to.contain('First Name');
  });

  it('renders a password input field', () => {
    const wrapper = shallow(<Signup />);
    const text = wrapper.find('TextField');
    expect(text.last().props().floatingLabelText).to.contain('password');
  });
});
