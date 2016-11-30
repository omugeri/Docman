import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Base from '../../../app/components/pages/Dashboard/Base';

const wrapper = shallow(<Base />);

describe('<Base />', () => {
  it('should have two components', () => {
    expect(wrapper.find('TopBar')).to.be.defined;
    expect(wrapper.find('SideMenu')).to.be.defined;
  });
});
