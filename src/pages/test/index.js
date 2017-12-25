import React, { Component } from 'react'
import TestComponent from './test'  
  
export const Test = () => 
  class Wrapper extends Component {      
    render = () => (
      <TestComponent {...this.props} />
    )
  }

export default Test()