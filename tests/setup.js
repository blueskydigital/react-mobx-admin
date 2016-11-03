require('babel-register')({
  ignore: /node_modules(?!\/react-mobx-admin)/ // they aren't compiled.
})

global.document = require('jsdom').jsdom('<body></body>')
global.window = document.defaultView
global.navigator = window.navigator
