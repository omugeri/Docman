import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { shallowWithContext } from '../helpers/utils';
import Delete from '../../../app/components/pages/Dashboard/Delete.jsx';

describe('<Delete />', () => {
  it('should have one Component', () => {
    const wrapper = shallow(<Delete />);
    expect(wrapper.find('Dialog')).to.be.defined;
  });
});
