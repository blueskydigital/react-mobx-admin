import DataManipState from 'react-mobx-admin/state/data_manip'
import DataTableState from 'react-mobx-admin/state/data_table'

export default (store) => {

  class ManipState extends DataManipState {
    //
    init() {
      super.init()
      store.loadOptions('tags', '/tags')
    }

    prepareNew() {
    }

    edittitle = 'edit a nice post'
    createtitle = 'add very interresting post ..'
    validators = {
      'title': [
        (val) => {
          if (!val || val.length === 0) {
            return store.__('title must be provided')
          }
        },
        (val) => {
          if (val && val.length > 10) {
            return store.__('title too long')
          }
        }
      ],
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
      '_global': (entity) => { // global validator
        const published_at = entity.get('published_at')
        const unpublished_at = entity.get('unpublished_at')
        if (published_at && unpublished_at && published_at > unpublished_at) {
          return [store.__('published must be less than unpublished')]
        }
      }
    }

    onSaved(saved) {
      store.addMessage('post successfully saved', 'info', 2000)
      super.onSaved(saved)
    }

    onLoaded (entity) {
      super.onLoaded(entity)
      alert('post onLoaded')
    }
  }

  class TableState extends DataTableState {
    perPage = 6
    defaultSortField = 'title'
    defaultSortDir = 'ASC'
    attrs = ['id', 'title', 'category', 'published_at', 'unpublished_at', 'tags']
    headertitles = ['id', 'title', 'cat', 'published', 'unpublished', 'tags']
    noSort = ['id', 'tags']
    title = 'posts'

    init() {
      super.init()
      store.loadOptions('tags', '/tags')
    }
  }

  return {ManipState, TableState}
}
