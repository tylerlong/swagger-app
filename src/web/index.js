import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import store from './store'
import Home from './components/Home'
import App from './components/App'
import Alerts from './components/Alerts'

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Alerts />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/edit' component={App} />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)
