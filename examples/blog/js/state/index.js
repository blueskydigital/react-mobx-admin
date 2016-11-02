import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import OptionsStore from './options'

export default class StateStore extends OptionsStore {

  constructor(requester) {
    super(requester,  {
      'posts_list': (state) => {
        state.loadOptions('tags', '/tags')
        return {
          perPage: 6,
          pkName: 'id',
          sortField: 'title',
          sortDir: 'ASC',
          attrs: ['id', 'title', 'category', 'published_at', 'tags'],
          headertitles: ['ID', 'Title', 'Cat', 'Published', 'Tags']
        }
      },
      'posts_detail': (state) => {
        state.loadOptions('tags', '/tags')
        return {
          edittitle: 'edit a nice post',
          validators: {
            'title': [
              {fn: (val) => (val.length === 0), message: state.__('title must be provided')},
              {fn: (val) => (val.length > 10), message: state.__('title too long')},
            ],
            'content': [
              {fn: (val) => (val.length === 0), message: state.__('this is mandatory')}
            ]
          }
        }
      },
      'tags_list': (state) => ({
        perPage: 3,
        pkName: 'id',
        attrs: ['id', 'name', 'published'],
        headertitles: ['ID', state.__('Name'), 'Published']
      }),
      'tags_detail': (state) => ({
        validators: {
          'name': [
            {fn: (val) => (val.length === 0), message: state.__('value must be provided')},
            {fn: (val) => (val.length > 10), message: state.__('value too long')},
          ]
        }
      })
    })
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
      case 'posts_list': return `/posts?page=${this.page}${this._query()}`
      case 'posts_detail': return '/posts/' + this.currentView.originEntityId
      case 'tags_list': return `/tags?page=${this.page}${this._query()}`
      case 'tags_detail': return '/tags/' + this.currentView.originEntityId
    }
  }

  onApiErr(err) {
    alert(`API error :( \n\n\n${err}`)
  }

}
