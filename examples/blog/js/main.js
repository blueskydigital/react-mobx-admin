import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DevTools from 'mobx-react-devtools'
import { startRouter } from 'mobx-router'
import views from './routeconfig'

// use it to create the app state
import StateStore from './state'
const store = new StateStore(views)
startRouter(views, store)

// init react components part using the only prop: the store
import { App } from './components/app'
const mount = document.getElementById("app")  // mountpoint
render((
  <div>
    <MuiThemeProvider className="view-wrapper">
      <App store={store} />
    </MuiThemeProvider>
    {Conf.debug ? (<DevTools />) : null}
  </div>
), mount)  // and final render
