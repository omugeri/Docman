import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { mountWithContext, shallowWithContext } from '../helpers/utils';
import Delete from '../../../app/components/pages/Dashboard/Delete.jsx';

describe('<Delete />', () => {
  it('should have one Component', () => {
    const wrapper = shallow(<Delete />);
    expect(wrapper.find('Dialog')).to.be.defined;
  });
  // it('should have child Components', () => {
  //   const handleOpen = sinon.stub();
  //   const wrapper = mountWithContext(<Delete onTouchTap={handleOpen}/>);
  //   console.log(wrapper.debug());
  //   wrapper.find('Dialog').simulate('click');
  //   expect(handleOpen.calledOnce).to.be.false;
  // });
});
