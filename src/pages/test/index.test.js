import React from 'react'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { Test } from './index'

describe('test/index.test.js', () => {

  it('renders ok', () => {
    const TestComponent = Test({})
    const wrapper = shallow(<TestComponent />)
    assert.equal(wrapper.length, 1)
  })

})