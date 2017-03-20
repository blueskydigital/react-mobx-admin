import { action, transaction } from 'mobx'

export default (BaseClass) => class TagsStore extends BaseClass {

  @action showTagList(query = {}) {
    transaction(() => {
      this.currentView = {
        name: 'tag_list',
        perPage: 3,
        pkName: 'id',
        attrs: ['id', 'name', 'published'],
        headertitles: ['ID', this.__('Name'), 'Published']
      }
      this.initEntityList(this.currentView, 'tags', query)
    })
  }

  @action showTagDetail(id) {
    transaction(() => {
      this.currentView = {
        name: 'tag_detail',
        validators: {
          'name': [
            {fn: (val) => (val.length === 0), message: this.__('value must be provided')},
            {fn: (val) => (val.length > 10), message: this.__('value too long')},
          ]
        }
      }
      this.initEntity(this.currentView, 'tags', id)
    })
    // this does not to be observable thats why it is out of da transaction
    this.currentView.onReturn2list = () => this.showTagList()
    this.currentView.onSaved = () => {
      this.addMessage('tag successfully saved', 'info', 2000)
    }
  }

}
