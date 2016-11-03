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

  _query() {
    let q = ''
    if(this.currentView.sortField) {
      q = q + '&sortField=' + this.currentView.sortField + '&sortDir=' + this.currentView.sortDir
    }
    if(this.currentView.filters.size > 0) {
      q = q + '&filters=' + JSON.stringify(this.filters)
    }
    return q
  }

  @computed get currentPath() {
    switch(this.currentView.name) {
      case 'login': return '/login'
      case 'posts_list': return `/posts?page=${this.currentView.page}${this._query()}`
      case 'posts_detail': return '/posts/' + this.currentView.originEntityId
      case 'tags_list': return `/tags?page=${this.currentView.page}${this._query()}`
      case 'tags_detail': return '/tags/' + this.currentView.originEntityId
    }
  }

  onApiErr(err) {
    alert(`API error :( \n\n\n${err}`)
  }

}
