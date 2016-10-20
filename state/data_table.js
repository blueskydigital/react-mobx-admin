import {observable, computed, action, transaction, asMap, toJS} from 'mobx'
import DataManipState from './data_manip'

export default class DataTableState extends DataManipState {

  perPage = 2
  entityName = null

  @observable items = []
  @observable totalItems:number = 0
  @observable page:number = 1
  @observable sortDir = null
  @observable sortField = null

  @action
  loadListData(entityName, perPage, page = 1, sortField = null, sortDir = null, filters = {}) {
    this.entityName = entityName
    this.perPage = perPage
    transaction(() => {
      this.page = page
      this.sortField = sortField
      this.sortDir = sortDir
      this._resetFilters()
      this.items.replace([])
    })
    this._getEntries(entityName, parseInt(page), sortField, sortDir, filters)
  }

  @action
  updatePage(page) {
    this._getEntries(this.entityName, parseInt(page))
  }

  @action
  updateSort(sortField, sortDir) {
    this._getEntries(this.entityName, undefined, sortField, sortDir)
  }

  @action
  deleteData(data) {
    const id = this.originEntityId

    return this.callRequester(() => {
      return this.requester.deleteEntry(this.view, id)
    })
  }

  @action
  deleteSelected() {
    // TODO: dodelat this.callRequester(() =>{
  }

  // ---------------------- selection  ----------------------------

  @observable selection = []

  @action
  updateSelection(data) {
    this.selection = data
  }

  // ---------------------- filtration  ----------------------------

  @observable filters = asMap({})

  @action
  resetFilters(newFilters = {}) {
    transaction(() => {
      _resetFilters(newFilters)
    })
  }

  @action
  updateFilterValue(name, value) {
    this.filters.set(name, value)
  }

  @action
  applyFilters() {
    this._getEntries(this.entityName, undefined, undefined, undefined, toJS(this.filters))
  }

  @action
  showFilter(filter) {
    this.filters.set(filter, undefined)
  }

  @action
  hideFilter(filter) {
    this.filters.delete(filter)
  }

  _resetFilters(newFilters) {
    this.filters.clear()
    for(let i in newFilters) {
      this.filters.set(i, newFilters[i])
    }
  }

  // ---------------------- privates, support ----------------------------

  _getEntries(entityName, page, sortField, sortDir, filters) {
    return this.callRequester(() => {
      return this.requester.getEntries(entityName, {
        page: page || this.page,
        sortField: sortField || this.sortField,
        sortDir: sortDir || this.sortDir,
        filters: filters || toJS(this.filters),
        perPage: this.perPage
      }).then((result) => {
        transaction(() => {
          page && (this.page = page)
          sortField && (this.sortField = sortField)
          sortDir && (this.sortDir = sortDir)
          filters && this._resetFilters(filters)
          this.totalItems = result.totalItems
          this.items.replace(result.data)
          this.originEntityId && (this.originEntityId = null)
        })
      })
    })
  }

}
