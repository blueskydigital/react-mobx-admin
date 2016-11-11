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
      validators: {
        'title': [
          {fn: (val) => (val.length === 0), message: this.__('title must be provided')},
          {fn: (val) => (val.length > 10), message: this.__('title too long')},
        ],
        'content': [
          {fn: (val) => (val.length === 0), message: this.__('this is mandatory')}
        ]
      }
    }
    this.initEntity(this.currentView, 'posts', id)
    // this does not to be observable thats why it is out of da transaction
    this.currentView.onReturn2list = () => this.showPostList()
  }

}
