import React from 'react'
import { render } from 'react-dom'
import { startRouter } from './state/router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// create requester
import { convertQuery, getTotalItems } from './api_flavor'
import DataRequester from 'react-mobx-admin/services/requester'
const _requester = new DataRequester(convertQuery, getTotalItems, Conf.apiUrl)

// use it to create the app state
import StateStore from './state'
const state = new StateStore(_requester)
startRouter(state)

// init react components part using the only prop: the store
import { App } from './components/app'
const mount = document.getElementById("app")  // mountpoint
render(<App state={state} />, mount)  // and final render
