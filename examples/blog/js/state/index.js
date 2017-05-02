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
