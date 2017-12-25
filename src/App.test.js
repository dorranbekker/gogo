import React from 'react'
import { assert } from 'chai'
import ReactDOM from 'react-dom'
import App from './App'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('shallow test', () => {
  const component = shallow(<App />)
  assert.equal(component.length, 1)
})