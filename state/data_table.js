import {observable, computed, action, transaction, toJS} from 'mobx'

export default class DataTableState {

  @observable filters = new Map()
  @observable state = 'loading'
  @observable items = []
  @observable totalItems = 0
  @observable selection = []
  perPage = 15
  pkName = 'id'

  constructor(entityname, requester, router, updateQPars) {
    this.requester = requester
    this.entityname = entityname
    this.router = router
    this.updateQPars = updateQPars
  }

  initEntityListView(entityname, cfg) {
    const qParams = this.router.queryParams
    return transaction(() => {
      qParams._page = qParams._page || 1
      qParams._perPage = localStorage.getItem('cargo_perPage') || qParams._perPage || cfg.perPage || 15
      cfg.init && cfg.init(this)
      this.cv = observable(Object.assign({}, cfg.view, {
        entityname: entityname,
        items: [],
        totalItems: 0,
        selection: [],
        filters: observable.shallowMap(this.appliedFilters),
        state: 'loading'
      }))
      return this._refreshList()
    })
  }

  init() {
    // set params from this.cv if missing _page || _perPage
    const qp = this.router.queryParams
    qp._page = qp._page ? qp._page : 1
    qp._perPage = qp._perPage ? qp._perPage : this.perPage
    return this._refreshList()
  }

  @action
  updatePage(page) {
    const newQPars = Object.assign({}, toJS(this.router.queryParams), {
      '_page': page
    })
    this.selection = []
    this.updateQPars(newQPars)
  }

  @action
  setPerPage(num) {
    const newQPars = Object.assign({}, toJS(this.router.queryParams), {
      '_page': 1,
      '_perPage': num
    })
    // localStorage.setItem('cargo_perPage', num)
    this.updateQPars(newQPars)
  }

  @action
  updateSort(sortField, sortDir) {
    const qp = this.router.queryParams
    const sortFields = qp._sortField ? qp._sortField.split(',') : []
    const sortDirs = qp._sortDir ? qp._sortDir.split(',') : []
    const sortStateIdx = sortFields.indexOf(sortField)
    if (sortStateIdx >= 0 && sortDir) {
      sortDirs[sortStateIdx] = sortDir
    } else if (sortStateIdx >= 0 && sortDir === null) {
      sortFields.splice(sortStateIdx, 1)
      sortDirs.splice(sortStateIdx, 1)
    } else {
      sortFields.push(sortField)
      sortDirs.push(sortDir)
    }
    const newQPars = Object.assign({}, toJS(this.router.queryParams), {
      '_sortField': sortFields.join(','),
      '_sortDir': sortDirs.join(',')
    })
    if (sortFields.length === 0) {
      delete newQPars._sortField
      delete newQPars._sortDir
    }
    this.selection = []
    this.updateQPars(newQPars)
  }

  @action
  refresh() {
    return this._refreshList()
  }

  // ---------------------- delete  ----------------------------

  @action
  deleteData(data) {
    const id = data[0][this.pkName]
    return this.requester.deleteEntry(this.entityname, id).then(() => {
      return this._refreshList()
    })
  }

  @action
  deleteSelected() {
    const promises = this.selection.map((selected) => {
      const id = this.items[selected][this.pkName]
      return this.requester.deleteEntry(this.entityname, id)
    })
    return Promise.all(promises).then(() => {   // wait for all delete reqests
      this.selection = []
      return this._refreshList()
    })
  }

  // ---------------------- selection  ----------------------------

  @computed get selected_ids() {
    return this.selection.map((selected) => {
      return this.items[selected][this.pkName]
    })
  }

  @action
  updateSelection(data) {
    this.selection = data
  }

  @action toggleIndex(idx) {
    const removed = this.selection.remove(idx)
    if(! removed) {
      this.selection.push(idx)
    }
  }

  @action selectAll() {
    this.selection = this.items.map((i, idx) => idx)
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
    return JSON.stringify(this.filters) === JSON.stringify(this.appliedFilters)
  }

  @action
  updateFilterValue(name, value) {
    this.filters.set(name, value)
  }

  @action
  applyFilters() {
    const newQPars = Object.assign({}, this.filters.toJS(), {
      '_page': 1,  // need to go to 1st page due to limited results
      '_perPage': this.router.queryParams['_perPage'],
      '_sortField': this.router.queryParams['_sortField'],
      '_sortDir': this.router.queryParams['_sortDir']
    })
    this.router.entityname = this.entityname
    this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
  }

  @action
  showFilter(filter) {
    this.filters.set(filter, undefined)
  }

  @action
  hideFilter(filter) {
    this.filters.delete(filter)
    const newQPars = Object.assign({}, this.filters.toJS(), {
      '_page': this.router.queryParams['_page'],
      '_perPage': this.router.queryParams['_perPage'],
      '_sortField': this.router.queryParams['_sortField'],
      '_sortDir': this.router.queryParams['_sortDir']
    })
    this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
  }

  // ---------------------- privates, support ----------------------------

  _refreshList() {
    this.state = 'loading'

    // if (this.router.entityname && this.entityname && this.router.entityname !== this.entityname) {
    //   for (let k in this.router.queryParams) {
    //     if (k[0] !== '_') {
    //       this.filters.delete(k)
    //       delete this.router.queryParams[k]
    //     }
    //   }
    // }

    const pars = Object.assign({}, this.router.queryParams)//, {
    //   _extraparams: this.extraparams
    // })

    return this.requester.getEntries(this.entityname, pars)
    .then(this.onDataLoaded.bind(this))
  }

  @action
  onDataLoaded(result) {
    this.state = 'ready'
    this.totalItems = result.totalItems
    this.items.replace(result.data)
  }

}
