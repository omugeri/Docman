import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Home from '../../app/components/pages/LandingPage/Home.jsx';

describe('<Home />', ()=>{
  it('should have the AppBar and one Button', ()=> {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('AppBar')).to.have.length(1);
    expect(wrapper.find('RaisedButton')).to.have.length(1);
  });
})
