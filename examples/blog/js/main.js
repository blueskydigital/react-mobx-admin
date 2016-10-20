import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// create requester
import { convertQuery, getTotalItems } from './api_flavor'
import DataRequester from 'react-mobx-admin/services/requester'
const _requester = new DataRequester(convertQuery, getTotalItems, Conf.apiUrl)

// use it to create the app state
import StateStore from './stateStore'
const state = new StateStore(_requester)

// a way how to set state to react-router managed app
var createElement = function (Component, props) {
  return <Component {...props} state={state} />
}
import routes from './routes'
const app = (
  <Router history={browserHistory} createElement={createElement}>
    {routes}
  </Router>
)

const mount = document.getElementById("app")  // mountpoint
render(app, mount)  // and final render
