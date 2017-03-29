import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import OptionsStore from './options'
import PostsStoreInit from './posts'
import TagsStoreInit from './tags'

// lego pattern :)
const TagsStore = TagsStoreInit(OptionsStore)
const PostsStore = PostsStoreInit(TagsStore)

export default class StateStore extends PostsStore {

  @computed get currentPath() {
    const _id = () => this.currentView.originEntityId ? this.currentView.originEntityId : '_new'
    const viewName = this.currentView ? this.currentView.name : 'login'
    switch(viewName) {
      case 'login': return '/login'
      case 'post_list': return `/entity/posts?${this.table_query(this.currentView)}`
      case 'post_detail': return '/entity/posts/' + _id()
      case 'tag_list': return `/entity/tags?${this.table_query(this.currentView)}`
      case 'tag_detail': return '/entity/tags/' + _id()
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

  @observable currentView = {}

}
