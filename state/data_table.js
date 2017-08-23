import {observable, computed, action, transaction, asMap, toJS} from 'mobx'
import DataManipState from './data_manip'

export default class DataTableState extends DataManipState {

  initEntityListView(entityname, cfg) {
    const qParams = this.router.queryParams
    return transaction(() => {
      qParams._page = qParams._page || 1
      qParams._perPage = qParams._perPage || cfg.perPage || 10
      cfg.init && cfg.init(this)
      this.cv = observable(Object.assign({}, cfg.view, {
        type: 'entity_list',
        entityname: entityname,
        items: [],
        totalItems: 0,
        loading: true,
        selection: [],
        filters: asMap(this.appliedFilters)
      }))
      return this._refreshList()
    })
  }

  beforeListViewExit() {
    const queryParamsBackup = Object.assign({}, this.router.queryParams)
    this.listQParamsBackup = queryParamsBackup
  }

  detailClicked(row) {
    this.router.goTo(this.views.entity_detail, {
      entityname: this.router.params.entityname,
      id: row[this.cv.pkName || 'id']
    }, this)
  }

  addClicked() {
    this.router.goTo(this.views.entity_detail, {
      entityname: this.router.params.entityname,
      id: '_new'
    }, this)
  }

  @action
  updatePage(page) {
    const newQPars = Object.assign({}, toJS(this.router.queryParams), {
      '_page': page
    })
    this.cv.selection = []
    this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
  }

  @action
  setPerPage(num) {
    const newQPars = Object.assign({}, toJS(this.router.queryParams), {
      '_page': 1,
      '_perPage': num
    })
    this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
  }

  @action
  updateSort(sortField, sortDir) {
    const newQPars = Object.assign({}, toJS(this.router.queryParams), {
      '_sortField': sortField,
      '_sortDir': sortDir
    })
    this.cv.selection = []
    this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
  }

  @action
  refresh() {
    return this._refreshList()
  }

  // ---------------------- delete  ----------------------------

  @action
  deleteData(data) {
    const id = data[0][this.cv.pkName]
    return this.requester.deleteEntry(this.cv.entityname, id).then(() => {
      return this._refreshList()
    })
  }

  @action
  deleteSelected() {
    const promises = this.cv.selection.map((selected) => {
      const id = this.cv.items[selected][this.cv.pkName]
      return this.requester.deleteEntry(this.cv.entityname, id)
    })
    return Promise.all(promises).then(() => {   // wait for all delete reqests
      this.cv.selection = []
      return this._refreshList()
    })
  }

  // ---------------------- selection  ----------------------------

  @computed get selected_ids() {
    return this.cv.selection.map((selected) => {
      return this.cv.items[selected][this.cv.pkName]
    })
  }

  @action
  updateSelection(data) {
    this.cv.selection = data
  }

  @action toggleIndex(idx) {
    const removed = this.cv.selection.remove(idx)
    if(! removed) {
      this.cv.selection.push(idx)
    }
  }

  @action selectAll() {
    this.cv.selection = this.cv.items.map((i, idx) => idx)
  }

  // ---------------------- filtration  ----------------------------

  @computed get appliedFilters() {
    const applied = {}
    for (let k in this.router.queryParams) {
      if (k[0] !== '_') {
        applied[k] = this.router.queryParams[k]
      }
    }
    return applied
  }

  @computed get areFiltersApplied() {
    return JSON.stringify(this.cv.filters) === JSON.stringify(this.appliedFilters)
  }

  @action
  updateFilterValue(name, value) {
    this.cv.filters.set(name, value)
  }

  @action
  applyFilters() {
    const newQPars = Object.assign({}, this.cv.filters.toJS(), {
      '_page': 1,  // need to go to 1st page due to limited results
      '_perPage': this.router.queryParams['_perPage'],
      '_sortField': this.router.queryParams['_sortField'],
      '_sortDir': this.router.queryParams['_sortDir']
    })
    this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
  }

  @action
  showFilter(filter) {
    this.cv.filters.set(filter, undefined)
  }

  @action
  hideFilter(filter) {
    this.cv.filters.delete(filter)
    const newQPars = Object.assign({}, this.cv.filters.toJS(), {
      '_page': this.router.queryParams['_page'],
      '_perPage': this.router.queryParams['_perPage'],
      '_sortField': this.router.queryParams['_sortField'],
      '_sortDir': this.router.queryParams['_sortDir']
    })
    this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
  }

  // ---------------------- privates, support ----------------------------

  _refreshList() {
    this.cv.loading = true
    const pars = Object.assign({}, this.router.queryParams, {
      _extraparams: this.cv.extraparams
    })
    return this.requester.getEntries(this.cv.entityname, pars)
    .then((result) => {
      result && transaction(() => {
        this.cv.loading = false
        this.cv.totalItems = result.totalItems
        this.cv.items && this.cv.items.replace(result.data)
      })
    })
  }

}
