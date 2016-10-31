import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import AuthStore from './auth'
import enTtransl from '../i18n/en'
import csTtransl from '../i18n/cs'

export default class StateStore extends AuthStore {

  _query() {
    let q = ''
    if(this.sortField) {
      q = q + '&sortField=' + this.sortField + '&sortDir=' + this.sortDir
    }
    if(this.currentView.filters.size > 0) {
      q = q + '&filters=' + JSON.stringify(this.filters)
    }
    return q
  }

  @computed get currentPath() {
    switch(this.currentView.name) {
      case 'login': return '/login'
      case 'posts': return `/posts?page=${this.page}${this._query()}`
      case 'posts_detail': return '/posts/' + this.currentView.originEntityId
      case 'tags': return `/tags?page=${this.page}${this._query()}`
      case 'tags_detail': return '/tags/' + this.currentView.originEntityId
    }
  }

  @observable i18n = enTtransl

  transl(str) {
    return this.i18n[str] || `UNTRANSL${str}`
  }

  @action changeLang() {
    this.i18n = csTtransl
  }

  // one of possible options loading ...
  @observable options = asMap({
    'categories': [
      {value: 'tech', label: 'Technology'},
      {value: 'art', label: 'Art'},
    ]
  })

  @action loadOptions(name, query) {
    return this.callRequester(() => {
      return this.requester.call(query).then((result) => {
        this.options.set(name, result.data)
      })
    })
  }

  onApiErr(err) {
    alert(`API error :( \n\n\n${err}`)
  }

}
