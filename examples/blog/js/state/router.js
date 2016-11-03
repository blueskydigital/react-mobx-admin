import { createHistory } from 'history'
import { autorun } from 'mobx'

export function startRouter(store) {

  const qparsRegex = /\/posts\?(page=(\d)+)?(&sortField=(\w)+)?(&sortDir=ASC|DESC)?(&filters=(.*))?/

  // update state on url change
  page.base('/admin')   // this is optional (used whe you are serving app from subfolder)

  function _is_logged(ctx, next) {
    if(store.userLogged) {
      return next()
    }
    store.showLogin()
  }

  function _parse_query(ctx, next) {
    ctx.parsedQuery = qs.parse(ctx.querystring)
    next()
  }

  page('/entity/:entityName/:id', _is_logged, (ctx) => {
    store.showEntityDetail(ctx.params.entityName, ctx.params.id)
  })
  page('/entity/:entityName', _is_logged, _parse_query, (ctx) => {
    store.showEntityList(ctx.params.entityName, ctx.parsedQuery)
  })
  page('*', (ctx) => store.showLogin())
  page()

  // update url on state changes
  autorun(() => {
    const path = store.currentPath
    if (path !== window.location.pathname) {
      window.history.pushState(null, null, '/admin' + path)
    }
  })

}
