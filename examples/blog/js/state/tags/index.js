import { action, transaction } from 'mobx'

export default function(store, editconfs, listconfs) {

  listconfs.tags = {
    view: {
      perPage: 3,
      pkName: 'id',
      attrs: ['id', 'name', 'published'],
      headertitles: ['ID', store.__('Name'), 'Published']
    }
  }

  editconfs.tags = {
    view: {
      validators: {
        'name': (val) => {
          if (!val || val.length === 0) {
            return store.__('value must be provided')
          }
          if(val.length > 10) {
            return store.__('value too long')
          }
        }
      }
    },
    prepareNew: (entity) => {
      // simulation of loading or time expansive operation
      const p = entity.has('id') ? entity : new Promise((resolve, reject) => {
        setTimeout(()=> {
          entity.set('published', true)
          entity.set('name', 'default name')
          resolve(entity)
        }, 2000)
      })
      return p
    }
  }

}
