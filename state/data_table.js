import {
  extendObservable, computed, action, transaction, asMap, toJS
} from 'mobx'
import DataManipState from './data_manip'

export default class DataTableState extends DataManipState {

  initEntityListView(view, entityName, query, newView, detailClicked, addClicked) {
    if(! detailClicked || ! addClicked) {
      throw 'detailClicked and addClicked must be set'
    }
    if(view.listViewBackup && view.listViewBackup.entityName === entityName) {
      Object.assign(query, view.listViewBackup)
    }
    view.listViewBackup && delete view.listViewBackup  // delete it, we don't want to influence next views
    transaction(() => {
      const atts = Object.assign(newView, {
        entityName: entityName,
        page: parseInt(query.page || 1),
        sortField: query.sortField ? query.sortField : newView.sortField,
        sortDir: query.sortDir ? query.sortDir : newView.sortDir,
        totalItems: 0,
        selection: [],
        filters: asMap(query.filters || {}),
        extraparams: newView.extraparams || null
      })
      extendObservable(view, atts)
      if (! view.items) {
        extendObservable(view, {items: []})
      }
    })
    view.detailClicked = detailClicked
    view.addClicked = addClicked
    return this._refreshList(view)
  }

  @action
  updatePage(view, page) {
    view.page = parseInt(page)
    this._refreshList(view)
  }

  @action
  updateSort(view, sortField, sortDir) {
    transaction(() => {
      view.sortField = sortField
      view.sortDir = sortDir
    })
    this._refreshList(view)
  }

  @action
  refresh(view) {
    this._refreshList(view)
  }

  @action
  deleteData(view, data) {
    const id = data[0][view.pkName]
    return this.requester.deleteEntry(view.entityName, id).then(()=>{
      return this._refreshList(view)
    })
  }

  @action
  deleteSelected(view) {
    const promises = view.selection.map((selected) => {
      const id = view.items[selected][view.pkName]
      return this.requester.deleteEntry(view.entityName, id)
    })
    return Promise.all(promises).then(() => {   // wait for all delete reqests
      view.selection = []
      return this._refreshList(view)
    })
  }

  // ---------------------- selection  ----------------------------

  @computed get selected_ids() {
    return this.currentView.selection.map((selected) => {
      return this.currentView.items[selected][this.currentView.pkName]
    })
  }

  @action
  updateSelection(view, data) {
    view.selection = data
  }

  @action toggleIndex(view, idx) {
    const removed = view.selection.remove(idx)
    if(! removed) {
      view.selection.push(idx)
    }
  }

  @action selectAll(view) {
    view.selection = view.items.map((i, idx) => idx)
  }

  // ---------------------- filtration  ----------------------------

  @action
  updateFilterValue(view, name, value) {
    view.filters.set(name, value)
  }

  @action
  applyFilters(view) {
    this._refreshList(view)
  }

  @action
  showFilter(view, filter) {
    view.filters.set(filter, undefined)
  }

  @action
  hideFilter(view, filter) {
    view.filters.delete(filter)
    this._refreshList(view)
  }

  _resetFilters(view, newFilters) {
    view.filters.clear()
    for(let i in newFilters) {
      view.filters.set(i, newFilters[i])
    }
  }

  table_query(view) {
    const rv = []
    if(view.page) {
      rv.push(`page=${view.page}`)
    }
    if(view.sortField) {
        rv.push(`sortField=${view.sortField}&sortDir=${view.sortDir}`)
    }
    if(view.filters.size > 0) {
      rv.push(`filters=${JSON.stringify(view.filters)}`)
    }
    return rv.join('&')
  }

  // ---------------------- privates, support ----------------------------

  _refreshList(view) {
    return this.requester.getEntries(view.entityName, {
      page: view.page,
      sortField: view.sortField,
      sortDir: view.sortDir,
      filters: toJS(view.filters),
      perPage: view.perPage,
      extraparams: view.extraparams
    }).then((result) => {
      result && transaction(() => {
        view.totalItems = result.totalItems
        view.items && view.items.replace(result.data)
      })
    })
  }

}
