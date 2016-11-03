import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import OptionsStore from './options'
import { postListViewInit, postDetailViewInit } from './posts'
import { tagListViewInit, tagDetailViewInit } from './tags'

export default class StateStore extends OptionsStore {

  constructor(requester) {
    super(requester,  {
      'posts_list': postListViewInit,
      'posts_detail': postDetailViewInit,
      'tags_list': tagListViewInit,
      'tags_detail': tagDetailViewInit
    })
  }

  @computed get currentPath() {
    const viewName = this.currentView ? this.currentView.name : 'login'
    switch(viewName) {
      case 'login': return '/login'
      case 'posts_list': return `/entity/posts?${this.table_query()}`
      case 'posts_detail': return '/entity/posts/' + this.currentView.originEntityId
      case 'tags_list': return `/entity/tags?${this.table_query()}`
      case 'tags_detail': return '/entity/tags/' + this.currentView.originEntityId
    }
  }

  onApiErr(err) {
    alert(`API error :( \n\n\n${err}`)
  }

}
