import React from 'react'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../common/datagrid/actions'
import { observer } from 'mobx-react'


const BStrapListView = ({
  state, onAddClicked, fields, filters, listActions, batchActions, renderOuter
}) => {

  function onSelectionChange(selection) {
    if(selection === 'all') {
      state.selectAll(state.currentView)
    } else if(selection === []) {
      state.updateSelection(state.currentView, [])
    } else { // we have receive index of selected item
      // so toggle the selection of da index
      state.toggleIndex(state.currentView, selection)
    }
  }

  function isSelected(idx) {
    return state.currentView.selection.indexOf(idx) >= 0
  }

  const loading = (! state.currentView.items) || state.currentView.items.length === 0

  if(loading) {
    return <span className="is-loading">loading</span>
  }

  const allSelected = state.currentView.selection.length === state.currentView.items.length

  const filtersRender = (filters && ! loading) ? (
    <Filters.Controls state={state}
      hideFilter={(filter)=>state.hideFilter(state.currentView, filter)} filters={filters} />
  ) : null
  const grid = (
    <Datagrid items={state.currentView.items} attrs={state.currentView.attrs}
      titles={state.currentView.headertitles} fields={fields}
      rowId={(row)=>row[state.currentView.pkName]}
      listActions={listActions}
      onSort={(field, dir)=>state.updateSort(state.currentView, field, dir)} sortstate={state.currentView}
      onRowSelection={onSelectionChange} isSelected={isSelected}
      allSelected={allSelected} />
  )

  const result = (
    <div className="card">
      <div className="card-block">
        <div className="pull-right">
          <Filters.Apply state={state} label={'apply filters'} apply={()=>state.applyFilters(state.currentView)} />
          {batchActions && (<DatagridActions state={state} actions={batchActions} />)}
          {filters && (
            <Filters.Dropdown state={state} title="addfilter" filters={filters}
              showFilter={(filter)=>state.showFilter(state.currentView, filter)} />
          )}
          {onAddClicked && <button type="button" className="btn btn-primary"
            onClick={()=>onAddClicked(state)}>{state.currentView.addText || '+'}</button>}
        </div>
        {state.currentView.title ? <h4 className="card-title">{state.currentView.title}</h4> : null}
      </div>
      { filtersRender }
      <div className="card-block">
        { grid }
      </div>
      <div className="card-block">
        <div className="pull-right">
          <Pagination.Pagination state={state} onChange={(page)=>state.updatePage(state.currentView, page)} />
        </div>
        <div className="pull-left">
          <Pagination.PageInfo info={state.currentView} />
        </div>
      </div>
    </div>
  )

  return renderOuter ? renderOuter(result) : result
}

BStrapListView.propTypes = {
  state: React.PropTypes.object.isRequired,
  renderOuter: React.PropTypes.func
}
export default observer(BStrapListView)
