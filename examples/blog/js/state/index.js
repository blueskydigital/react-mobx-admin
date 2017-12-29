import { observable, computed, toJS, action, transaction } from 'mobx'
import { RouterStore } from 'mobx-router'
import OptionsStore from './options'

import Posts from './posts'
import Tags from './tags'

export default class StateStore extends OptionsStore {

  constructor(views) {
    super()
    this.router = new RouterStore()
    this.views = views

    const tags = Tags(this)
    const posts = Posts(this)
    this.manipStores = {
      'tags': tags.ManipState,
      'posts': posts.ManipState
    }
    this.listStores = {
      'tags': tags.TableState,
      'posts': posts.TableState
    }
  }

  showEntityUpdateView(entityname, id) {
    const StoreClass = this.manipStores[entityname]
    if (StoreClass === undefined) {
      return this.on404('unknown entity ' + entityname)
    }
    id = (id && id !== '_new') ? id : null
    this.cv = new StoreClass(entityname, id, this.requester.saveEntry.bind(this.requester))
    this.cv.init()
    id && this.requester.getEntry(entityname, id).then(this.cv.onLoaded.bind(this.cv))
  }

  showEntityListView() {
    const entityname = this.router.params.entityname
    const StoreClass = this.listStores[entityname]
    if (StoreClass === undefined) {
      return this.on404('unknown entity ' + entityname)
    }
    this.cv = new StoreClass(entityname, this.requester, this.router, (newQPars) => {
      this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
    })
    this.cv.init()
  }

  beforeListViewExit() {
    const queryParamsBackup = Object.assign({}, this.router.queryParams)
    this.listQParamsBackup = queryParamsBackup
  }

  onListParamsChange(origParams, origQueryParams) {
    if (origParams.entityname !== this.router.params.entityname) {
      return this.showEntityListView()
    }
    return this.cv.refresh().catch(this.onError.bind(this))
  }

  detailClicked(row) {
    this.router.goTo(this.views.entity_detail, {
      entityname: this.router.params.entityname,
      id: row[this.cv.pkName || 'id']
    }, this)
  }

  goTo(view, params, queryParams={}) {
    this.router.goTo(this.views[view], params, this, queryParams)
  }

  addClicked() {
    this.router.goTo(this.views.entity_detail, {
      entityname: this.router.params.entityname,
      id: '_new'
    }, this)
  }

  // overrided method adding catch handler
  saveEntity(onReturn2list) {
    super.saveEntity(onReturn2list).catch(this.onError.bind(this))
  }

  beforeListViewEnter() {
    // TODO: dodelat
  }

  onReturn2list() {
    this.router.goTo(this.views.entity_list, {
      entityname: this.router.params.entityname
    }, this, this.cv.listQParamsBackup || {_page: 1})
  }

  @observable messages = observable.shallowMap({})

  @action addMessage(text, type, timeout = 0) {
    const message = {text, type, timeout}
    this.messages.set(text, message)
    if(timeout > 0) {
      function _remove() {
        this.messages.delete(text)
      }
      setTimeout(_remove.bind(this), timeout)
    }
    return message
  }

  @action removeMessage(message) {
    this.messages.delete(message.text)
  }

}
