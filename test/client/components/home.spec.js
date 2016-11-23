import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Home } from '../../../app/components/pages/LandingPage/Home.jsx';

const wrapper = shallow(<Home />);
describe('<Home />', () => {
  it('should have two RaisedButtons and one Login Component', () => {
    expect(wrapper.find('RaisedButton')).to.have.length(1);
    expect(wrapper.find('Login')).to.have.length(1);
  });
  it('checks on the props in the Component', () => {
    expect(wrapper.props().handleUsername).to.be.defined;
    expect(wrapper.props().handlePassword).to.be.defined;
    expect(wrapper.props().handleSubmit).to.be.defined;
  });
});
