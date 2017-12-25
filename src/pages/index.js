import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ROUTES from './routes'

import Test from './test'
import Test2 from './test2'
// [new pages import]

const Pages = () => (
  <Switch>
    <Route exact path='/' component={() => null} />
    <Route exact path={ROUTES.TEST} component={Test} />
    <Route exact path={ROUTES.TEST2} component={Test2} />
    {/* [new pages route] */}
  </Switch>
)

export default Pages