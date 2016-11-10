import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import OptionsStore from './options'
import { postListViewInit, postDetailViewInit } from './posts'
import { tagListViewInit, tagDetailViewInit } from './tags'

export default class StateStore extends OptionsStore {

  constructor() {
    super()
    this.viewInitializers = {
      'posts_list': postListViewInit,
      'posts_detail': postDetailViewInit,
      'tags_list': tagListViewInit,
      'tags_detail': tagDetailViewInit
    }
  }

  @computed get currentPath() {
    const _id = () => this.currentView.originEntityId ? this.currentView.originEntityId : '_new'
    const viewName = this.currentView ? this.currentView.name : 'login'
    switch(viewName) {
      case 'login': return '/login'
      case 'posts_list': return `/entity/posts?${this.table_query()}`
      case 'posts_detail': return '/entity/posts/' + _id()
      case 'tags_list': return `/entity/tags?${this.table_query()}`
      case 'tags_detail': return '/entity/tags/' + _id()
    }
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

  @observable currentView = null

  initView(name, data = {}) {
    const defaults = this.viewInitializers[name] ? this.viewInitializers[name](this) : {}
    for(let i in data) {
      if(data[i] !== undefined) {
        defaults[i] = data[i]
      }
    }
    defaults.name = name
    this.currentView = defaults
  }

}
