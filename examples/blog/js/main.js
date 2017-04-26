import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DevTools from 'mobx-react-devtools'
import { startRouter } from './router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// use it to create the app state
import StateStore from './state'
const state = new StateStore()
startRouter(state)

// init react components part using the only prop: the store
import { App } from './components/app'
const mount = document.getElementById("app")  // mountpoint
render((
  <div>
    <MuiThemeProvider className="view-wrapper">
      <App state={state} />
    </MuiThemeProvider>
    {Conf.debug ? (<DevTools />) : null}
  </div>
), mount)  // and final render
