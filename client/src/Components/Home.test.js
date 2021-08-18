import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Home from './Home.jsx';
import SearchBar from './SearchBar.jsx';
import Card from './Card.jsx';
import Paged from './Paged.jsx';

configure({adapter: new Adapter()});

describe('<Home />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper =  shallow(<Home />)
  })

  it('should render component <SearchBar />', () => {
    expect(wrapper.find(SearchBar)).toHaveLength(1)
  })

  it('should render component <Card />', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  })

  it('should render component <Paged />', () => {
    expect(wrapper.find(Paged)).toHaveLength(1);
  })
})
