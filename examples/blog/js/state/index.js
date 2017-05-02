import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import { RouterStore } from 'mobx-router'
import OptionsStore from './options'

import PostsInfoInit from './posts'
import TagsInfoInit from './tags'


export default class StateStore extends OptionsStore {

  constructor(views) {
    super()
    this.router = new RouterStore()
    this.views = views
    this.router.cv = {}
    this.listconfs = {}
    this.editconfs = {}
    PostsInfoInit(this, this.editconfs, this.listconfs)
    TagsInfoInit(this, this.editconfs, this.listconfs)
  }

  get cv() {
    return this.router.cv
  }

  set cv(val) {
    this.router.cv = val
  }

  showEntityUpdateView(entityname, id) {
    const cfg = this.editconfs[entityname]
    if (! cfg) {
      return this.on404('unknown entity ' + entityname)
    }
    id = (id && id !== '_new') ? id : null
    this.initEntityView(entityname, id, cfg).catch(this.onError.bind(this))
  }

  showEntityListView(entityname) {
    const cfg = this.listconfs[entityname]
    if (! cfg) {
      return this.on404('unknown entity ' + entityname)
    }
    this.initEntityListView(entityname, cfg).catch(this.onError.bind(this))
  }

  onListParamsChange(params, queryParams) {
    if (this.cv.type !== 'entity_list' || params.entityname !== this.cv.entityname) {
      return this.showEntityListView(params.entityname)
    }
    return this.refresh().catch(this.onError.bind(this))
  }

  beforeListViewEnter() {
    // TODO: dodelat
  }

  @observable messages = asMap({})

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
