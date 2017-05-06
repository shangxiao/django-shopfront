import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import App from 'components/App';

describe('<App />', () => {

  it('calls render', () => {
    sinon.spy(App.prototype, 'render');
    const wrapper = mount(<App />);
    expect(App.prototype.render.calledOnce).to.equal(true);
  });

});
