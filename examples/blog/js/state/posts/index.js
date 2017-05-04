import { transaction, action } from 'mobx'

export default function(store, editconfs, listconfs) {

  listconfs.posts = {
    view: {
      perPage: 6,
      pkName: 'id',
      sortField: 'title',
      sortDir: 'ASC',
      attrs: ['id', 'title', 'category', 'published_at', 'tags'],
      headertitles: ['ID', 'Title', 'Cat', 'Published', 'Tags'],
      title: 'posts'
    },
    init: (store) => {
      store.loadOptions('tags', '/tags')
    }
  }

  editconfs.posts = {
    view: {
      edittitle: 'edit a nice post',
      createtitle: 'add very interresting post ..',
      validators: {
        'title': (val) => {
          if (!val || val.length === 0) {
            return store.__('title must be provided')
          }
          if (val.length > 10) {
            return store.__('title too long')
          }
        },
        'content': (val) => {
          if (!val || val.length === 0) {
            return store.__('content must be provided')
          }
        },
        'category': (val) => {
          if (! val) {
            return store.__('category must be provided')
          }
        },
        'published_at': (val) => {
          if (! val) {
            return store.__('published at must be provided')
          }
        },
        '_global': (val) => { // global validator
          const published_at = store.cv.entity.get('published_at')
          const unpublished_at = store.cv.entity.get('unpublished_at')
          if (published_at && unpublished_at && published_at > unpublished_at) {
            return [store.__('published must be less than unpublished')]
          }
        }
      }
    },
    init: (store, id, entityname) => {
      store.loadOptions('tags', '/tags')
    },
    onSave: (saved) => {
      store.addMessage('post successfully saved', 'info', 2000)
    },
    onLoaded: (entity) => {
      alert('post onLoaded')
      return entity
    }
  }

}
