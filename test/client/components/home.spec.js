import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { mountWithContext, shallowWithContext } from '../helpers/utils';
import { Home } from '../../../app/components/pages/LandingPage/Home.jsx';

const wrapper = mountWithContext(<Home />);
describe('<Home />', () => {
  it('should have two RaisedButtons and one Login Component', () => {
    // console.log('child', wrapper.childAt(0).childAt(0).debug());
    expect(wrapper.find('RaisedButton')).to.have.length(1);
    expect(wrapper.find('Login')).to.have.length(1);
  });
  it('checks on the props in the Component', () => {
    expect(wrapper.props().handleUsername).to.be.defined;
    expect(wrapper.props().handlePassword).to.be.defined;
    expect(wrapper.props().handleSubmit).to.be.defined;
  });
  // it('simulates calling handleOpen', () => {
  //   const handleOpen = sinon.stub();
  //   const wrapper = shallowWithContext(<Home />)
  //   const button = wrapper.childAt(0).childAt(0);
  //   wrapper.childAt(0).childAt(0).simulate('touchTap');
  //   expect(handleOpen.calledOnce).to.be.true;
  // })
});
