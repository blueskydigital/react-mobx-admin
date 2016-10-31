import { createHistory } from 'history'
import { Router } from 'director'
import { autorun } from 'mobx'

export function startRouter(store) {

  const qparsRegex = /\/posts\?(page=(\d)+)?(&sortField=(\w)+)?(&sortDir=ASC|DESC)?(&filters=(.*))?/

  // update state on url change
  const router = new Router({
    '/login': store.showLogin(),
    '/:entityName/:id': (entityName, id) => store.showEntityDetail(entityName, id),
    '/:entityName': (entityName) => store.showEntityList(entityName),
  }).configure({
    notfound: () => store.showLogin(),
    html5history: true
  }).init()

  // update url on state changes
  autorun(() => {
    const path = store.currentPath
    if (path !== window.location.pathname) {
      window.history.pushState(null, null, path)
    }
  })

}
