import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import store from './store'
import Home from './containers/Home'
import App from './containers/App'
import Alerts from './containers/Alerts'

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Alerts />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/edit/:base64' component={App} />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)
