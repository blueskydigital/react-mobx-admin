import { observable, computed, action, toJS } from 'mobx'

export default class DataTableStore {
  @observable state = 'loading'
  @observable items = []
  @observable totalItems = 0
  @observable selection = []
  @observable selectionAll = false
  perPage = 15
  pkName = 'id'
  perPageOptions = [10, 15, 20, 50, 100]

  constructor (router, updateQPars) {
    this.router = router
    this.updateQPars = updateQPars
    for (const attr in router.queryParams) { // init filters
      attr[0] !== '_' && this.filters.set(attr, router.queryParams[attr])
    }
  }

  init () {
    this.setDefaults()
    return this._refreshList()
  }

  getEntries (params) {
    throw new Error('implement getEntries!!')
  }

  @action updatePage (page) {
    const newQPars = Object.assign({}, toJS(this.router.queryParams), {
      _page: page
    })
    this.selection = []
    this.selectionAll = false
    this.updateQPars(newQPars)

    this.store.setEntityLastState(this.store.cv.entityname, this.router.queryParams)
  }

  @action setPerPage (num) {
    const newQPars = Object.assign({}, toJS(this.router.queryParams), {
      _page: 1,
      _perPage: num
    })
    this.updateQPars(newQPars)
  }

  @action updateSort (sortField, sortDir) {
    const qp = this.router.queryParams || {}
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
      _sortField: sortFields.join(','),
      _sortDir: sortDirs.join(',')
    })
    if (sortFields.length === 0) {
      delete newQPars._sortField
      delete newQPars._sortDir
    }
    this.selection = []
    this.selectionAll = false
    this.updateQPars(newQPars)
  }

  @action
  refresh () {
    return this._refreshList()
  }

  // ---------------------- selection  ----------------------------

  @computed get selected_ids () {
    return this.selection.map((selected) => {
      return this.items[selected][this.pkName]
    })
  }

  @computed get selectedItems () {
    return this.selection.map(i => this.items[i])
  }

  @action updateSelection (data) {
    this.selection = data
    if (!data || data.length <= 0) {
      this.selectionAll = false
    }
  }

  @action toggleIndex (idx) {
    const removed = this.selection.remove(idx)
    if (!removed) {
      this.selection.push(idx)
    }
  }

  @action selectAll () {
    const fixedSelection = []

    this.selection = this.items.map((r, idx) => {
      const timeRestricted = (
        this.store && this.store.timeRestriction &&
        this.store.timeRestriction.checkRow(this.store, r, this)
      ) || undefined

      if (!(timeRestricted && timeRestricted > 0)) {
        fixedSelection.push(idx)
      }
    })
    this.selection = fixedSelection
    this.selectionAll = !this.selectionAll
  }

  // ---------------------- filtration  ----------------------------

  @observable filters = new Map()

  @computed get appliedFilters () {
    const applied = {}
    for (const k in this.router.queryParams) {
      if (k[0] !== '_') {
        applied[k] = this.router.queryParams[k]
      }
    }
    return applied
  }

  isFilterValueChanged (filtername) {
    return this.filters.get(filtername) !== this.router.queryParams[filtername]
  }

  isFilterApplied (filtername) {
    return filtername in this.router.queryParams
  }

  @computed get areFiltersApplied () {
    return JSON.stringify(this.filters) === JSON.stringify(this.appliedFilters)
  }

  @action updateFilterValue (name, value) {
    this.filters.set(name, value)
  }

  @action applyFilters () {
    const newQPars = Object.assign({}, this.filters.toJS(), {
      _page: 1, // need to go to 1st page due to limited results
      _perPage: this.router.queryParams._perPage,
      _sortField: this.router.queryParams._sortField,
      _sortDir: this.router.queryParams._sortDir
    })
    this.updateQPars(newQPars)
  }

  @action showFilter (filter) {
    this.filters.set(filter, undefined)
  }

  @action hideFilter (filter) {
    this.filters.delete(filter)
    const newQPars = Object.assign({}, this.filters.toJS(), {
      _page: this.router.queryParams._page,
      _perPage: this.router.queryParams._perPage,
      _sortField: this.router.queryParams._sortField,
      _sortDir: this.router.queryParams._sortDir
    })
    this.updateQPars(newQPars)
  }

  // ---------------------- privates, support ----------------------------

  getRequestParams (params) {
    return new Promise((resolve, _) => resolve(params))
  }

  setDefaults () {
    const qp = this.router.queryParams || {}
    // set params if missing _page || _perPage
    qp._page = qp._page ? qp._page : 1
    qp._perPage = qp._perPage ? qp._perPage : this.perPage
    if (this.defaultSortField && !qp._sortField) {
      qp._sortField = this.defaultSortField
      qp._sortDir = this.defaultSortDir
    }
  }

  _refreshList () {
    this.state = 'loading'
    return this.getRequestParams(toJS(this.router.queryParams))
      .then(pars => {
        return this.getEntries(pars)
      })
      .then(this.onDataLoaded.bind(this))
  }

  @action onDataLoaded (result) {
    this.state = 'ready'
    this.totalItems = result.totalItems
    this.items.replace(result.data)
    return result
  }
}
