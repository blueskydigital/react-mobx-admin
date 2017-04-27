import { action, transaction } from 'mobx'

export default (BaseClass) => class TagsStore extends BaseClass {

  @action showTagList(query = {}) {
    this.initEntityListView(this.currentView, 'tags', query, {
      name: 'tag_list',
      perPage: 3,
      pkName: 'id',
      attrs: ['id', 'name', 'published'],
      headertitles: ['ID', this.__('Name'), 'Published']
    }, (row) => {
      this.showTagDetail(row.id)
    }, () => {
      this.showTagDetail(null)
    }).catch(this.onError.bind(this))
  }

  @action showTagDetail(id) {
    this.initEntityView(this.currentView, 'tags', id, {
      name: 'tag_detail',
      validators: {
        'name': (val) => {
          if (!val || val.length === 0) {
            return this.__('value must be provided')
          }
          if(val.length > 10) {
            return this.__('value too long')
          }
        }
      }
    }, () => {
      this.showTagList()
    }, (saved) => {
      this.addMessage('tag successfully saved', 'info', 2000)
    }, (entity) => {
      // simulation of loading or time expansive operation
      return new Promise((resolve, reject) => {
        setTimeout(()=> {
          entity.set('published', true)
          resolve(entity)
        }, 2000)
      })
    }).catch(this.onError.bind(this))
  }

}
