import {observable, computed, action, transaction, asMap, toJS} from 'mobx'
import DataManipState from './data_manip'

export default class DataTableState extends DataManipState {

  @action showEntityList(entityName, page = 1, sortField, sortDir, filterVals = {}) {
    this.initView(entityName, {
      entityName: entityName,
      page: parseInt(page),
      perPage: 5,
      totalItems: 0,
      items: [],
      selection: [],
      filters: asMap(filterVals)
    })
    this._refreshList()
  }

  @action
  updatePage(page) {
    this.currentView.page = parseInt(page)
    this._refreshList()
  }

  @action
  updateSort(sortField, sortDir) {
    transaction(() => {
      this.currentView.sortField = sortField
      this.currentView.sortDir = sortDir
    })
    this._refreshList()
  }

  @action
  refresh() {
    this._refreshList()
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
    this.callRequester(() => {
      const promises = this.currentView.selection.map((selected) => {
        const id = this.currentView.items[selected][this.currentView.pkName]
        return this.requester.deleteEntry(this.currentView.entityName, id)
      })
      return Promise.all(promises).then(() => {   // wait for all delete reqests
        this.currentView.selection = []
        return this._refreshList()
      })
    })
  }

  // ---------------------- selection  ----------------------------

  @computed get selected_ids() {
    return this.currentView.selection.map((selected) => {
      return this.currentView.items[selected][this.currentView.pkName]
    })
  }

  @action
  updateSelection(data) {
    this.currentView.selection = data
  }

  // ---------------------- filtration  ----------------------------

  @action
  updateFilterValue(name, value) {
    this.currentView.filters.set(name, value)
  }

  @action
  applyFilters() {
    this._refreshList()
  }

  @action
  showFilter(filter) {
    this.currentView.filters.set(filter, undefined)
  }

  @action
  hideFilter(filter) {
    this.currentView.filters.delete(filter)
    this._refreshList()
  }

  _resetFilters(newFilters) {
    this.currentView.filters.clear()
    for(let i in newFilters) {
      this.currentView.filters.set(i, newFilters[i])
    }
  }

  // ---------------------- privates, support ----------------------------

  _refreshList() {
    return this.callRequester(() => {
      return this.requester.getEntries(this.currentView.entityName, {
        page: this.currentView.page,
        sortField: this.currentView.sortField,
        sortDir: this.currentView.sortDir,
        filters: toJS(this.currentView.filters),
        perPage: this.currentView.perPage
      }).then((result) => {
        transaction(() => {
          this.currentView.totalItems = result.totalItems
          this.currentView.items.replace(result.data)
        })
      })
    })
  }

}
