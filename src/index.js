import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import store from './store'
import Home from './components/Home'
import App from './components/App'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/edit/:base64' component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
