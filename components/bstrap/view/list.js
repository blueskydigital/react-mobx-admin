import React from 'react'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../common/datagrid/actions'
import { observer } from 'mobx-react'


const BStrapListView = ({
  state, onAddClicked, fields, filters, listActions, batchActions, renderOuter
}) => {

  const cv = state.currentView

  function onSelectionChange(selection) {
    if(selection === 'all') {
      state.selectAll(cv)
    } else if(selection === []) {
      state.updateSelection(cv, [])
    } else { // we have receive index of selected item
      // so toggle the selection of da index
      state.toggleIndex(cv, selection)
    }
  }

  function isSelected(idx) {
    return cv.selection.indexOf(idx) >= 0
  }

  const allSelected = cv.selection.length > 0 && cv.selection.length === cv.items.length

  const filtersRender = (filters && ! cv.loading) ? (
    <Filters.Controls state={state}
      hideFilter={(filter)=>state.hideFilter(cv, filter)} filters={filters} />
  ) : null
  const grid = cv.loading ? null : (
    <Datagrid items={cv.items} attrs={cv.attrs}
      titles={cv.headertitles} fields={fields}
      rowId={(row)=>row[cv.pkName]}
      listActions={listActions}
      onSort={(field, dir)=>state.updateSort(cv, field, dir)} sortstate={cv}
      onRowSelection={onSelectionChange} isSelected={isSelected}
      allSelected={allSelected} />
  )

  const result = (
    <div className="card">
      <div className="card-block">
        <div className="pull-right">
          <Filters.Apply state={state} label={'apply filters'} apply={()=>state.applyFilters(cv)} />
          {batchActions && (<DatagridActions state={state} actions={batchActions} />)}
          {filters && (
            <Filters.Dropdown state={state} title="addfilter" filters={filters}
              showFilter={(filter)=>state.showFilter(cv, filter)} />
          )}
          {onAddClicked && <button type="button" className="btn btn-primary"
            onClick={()=>onAddClicked(state)}>{cv.addText || '+'}</button>}
        </div>
        {cv.title ? <h4 className="card-title">{cv.title}</h4> : null}
      </div>
      { filtersRender }
      <div className="card-block">
        { (cv.loading) ? <span className="is-loading">loading</span> : grid }
      </div>
      {(cv.loading) ? null :
        <div className="card-block">
          <div className="pull-right">
            <Pagination.Pagination state={state} onChange={(page)=>state.updatePage(cv, page)} />
          </div>
          <div className="pull-left">
            <Pagination.PageInfo info={cv} />
          </div>
        </div>
      }
    </div>
  )

  return renderOuter ? renderOuter(result) : result
}

BStrapListView.propTypes = {
  state: React.PropTypes.object.isRequired,
  renderOuter: React.PropTypes.func
}
export default observer(BStrapListView)
