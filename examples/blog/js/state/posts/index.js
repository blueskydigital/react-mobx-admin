import { transaction } from 'mobx'

export default (BaseClass) => class PostsStore extends BaseClass {

  showPostList(query = {}) {
    this.loadOptions('tags', '/tags')
    transaction(() => {
      this.currentView = {
        name: 'post_list',
        perPage: 6,
        pkName: 'id',
        sortField: 'title',
        sortDir: 'ASC',
        attrs: ['id', 'title', 'category', 'published_at', 'tags'],
        headertitles: ['ID', 'Title', 'Cat', 'Published', 'Tags']
      }
      this.initEntityList(this.currentView, 'posts', query)
    })
  }

  showPostDetail(id) {
    this.loadOptions('tags', '/tags')
    this.currentView = {
      name: 'post_detail',
      edittitle: 'edit a nice post',
      createtitle: 'add very interresting post ..',
      validators: {
        'title': [
          {fn: (val) => (! val || val.length === 0), message: this.__('title must be provided')},
          {fn: (val) => (! val || val.length > 10), message: this.__('title too long')},
        ],
        'content': [
          {fn: (val) => (! val || val.length === 0), message: this.__('this is mandatory')}
        ],
        'category': [
          {fn: (val) => (! val), message: this.__('category must be provided')},
        ],
        '_global': [{ // global validators
          fn: (val) => {
            const published_at = this.currentView.entity.get('published_at')
            const unpublished_at = this.currentView.entity.get('unpublished_at')
            return published_at && unpublished_at && published_at > unpublished_at
          },
          message: this.__('published must be less than unpublished')
        }]
      }
    }
    this.initEntity(this.currentView, 'posts', id)
    // this does not to be observable thats why it is out of da transaction
    this.currentView.onReturn2list = () => this.showPostList()
    this.currentView.onSaved = () => {
      this.addMessage('post successfully saved', 'info', 2000)
    }
  }

}
