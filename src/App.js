import React, { Component } from 'react';
import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Pages from './pages'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Pages />
  </Router>
)

export default App
