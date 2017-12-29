import DataManipState from 'react-mobx-admin/state/data_manip'
import DataTableState from 'react-mobx-admin/state/data_table'

export default (store) => {

  class ManipState extends DataManipState {

    prepareNew() {
      // simulation of loading or time expansive operation
      const p = this.record.has('id') ? this.record : new Promise((resolve, reject) => {
        setTimeout(() => {
          this.record.set('published', true)
          this.record.set('name', 'default name')
          resolve(this.record)
        }, 2000)
      })
      return p
    }

    validators = {
      'name': (val) => {
        if (!val || val.length === 0) {
          return store.__('value must be provided')
        }
        if (val.length > 10) {
          return store.__('value too long')
        }
      }
    }
  }

  class TableState extends DataTableState {
    perPage = 3
    attrs = ['id', 'name', 'published']
    headertitles = ['ID', store.__('Name'), 'Published']
    defaultSortField = 'name'
    defaultSortDir = 'ASC'
  }

  return {ManipState, TableState}
}
