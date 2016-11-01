import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import AuthStore from './auth'
import enTtransl from '../i18n/en'
import csTtransl from '../i18n/cs'

export default class StateStore extends AuthStore {

  constructor(requester) {
    super(requester)
    const __ = this.transl
    this.viewInfo = {
      'posts': {
        onInit: (state) => { this.loadOptions('tags', '/tags') },
        perPage: 6,
        pkName: 'id',
        attrs: ['id', 'title', 'category', 'published_at', 'tags'],
        headertitles: ['ID', 'Title', 'Cat', 'Published', 'Tags']
      },
      'posts_detail': {
        onInit: (state) => { this.loadOptions('tags', '/tags') },
        edittitle: 'edit a nice post',
        validators: {
          'title': [
            {fn: (val) => (val.length === 0), message: (state)=>state.__('title must be provided')},
            {fn: (val) => (val.length > 10), message: (state)=>state.__('title too long')},
          ],
          'content': [
            {fn: (val) => (val.length === 0), message: (state)=>state.__('this is mandatory')}
          ]
        }
      },
      'tags': {
        perPage: 3,
        pkName: 'id',
        attrs: ['id', 'name', 'published'],
        headertitles: ['ID', 'Name', 'Published']
      },
      'tags_detail': {
        validators: {
          'name': [
            {fn: (val) => (val.length === 0), message: (state)=>state.__('value must be provided')},
            {fn: (val) => (val.length > 10), message: (state)=>state.__('value too long')},
          ]
        }
      }
    }
  }

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
  __(str) {
    return this.transl(str)
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
