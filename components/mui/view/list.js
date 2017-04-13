import React from 'react'
import { observer } from 'mobx-react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../common/datagrid/actions'

const MUIListView = ({
  state, onAddClicked, fields, filters, listActions, batchActions, renderOuter
}) => {

  function onSelectionChange(selection) {
    if(selection === 'all') {
      state.selectAll(state.currentView)
    } else if(selection === 'none') {
      state.updateSelection(state.currentView, [])
    } else {
      state.updateSelection(state.currentView, selection)
    }
  }

  function isSelected(idx) {
    return state.currentView.selection && state.currentView.selection.indexOf(idx) >= 0
  }

  const title = state.currentView.title ?
    <CardTitle title={state.currentView.title} /> : null
  const filtersRender = (filters) ? (
    <Filters.Controls state={state} filters={filters}
      hideFilter={(filter)=>state.hideFilter(state.currentView, filter)} />
  ) : null
  const grid = !state.currentView.loading ? (
    <Datagrid items={state.currentView.items} attrs={state.currentView.attrs}
      titles={state.currentView.headertitles} fields={fields}
      rowId={(row)=>row[state.currentView.pkName]}
      listActions={listActions}
      onSort={(field, dir)=>state.updateSort(state.currentView, field, dir)}
      sortstate={state.currentView}
      onRowSelection={onSelectionChange} isSelected={isSelected} />
  ) : null
  const pagination = (
    <Pagination state={state}
      onChange={(page)=>state.updatePage(state.currentView, page)} />
  )
  const actions = (
    <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
      <Filters.Apply state={state} label={'apply filters'} apply={()=>state.applyFilters(state.currentView)} />
      {batchActions && (<DatagridActions state={state} actions={batchActions} />)}
      {filters && (
        <Filters.Dropdown state={state} title="addfilter" filters={filters}
          showFilter={(filter)=>state.showFilter(state.currentView, filter)} />
      )}
      {onAddClicked && <FlatButton label={state.currentView.addText} icon={<AddIcon />}
        onTouchTap={() => onAddClicked(state)} />}
    </CardActions>
  )

  const result = (
    <Card style={{ margin: '2em', opacity: state.loading ? 0.8 : 1 }}>
      { actions }
      { title }
      { filtersRender }
      { grid }
      { pagination }
    </Card>
  )

  return renderOuter ? renderOuter(result) : result
}
MUIListView.propTypes = {
  state: React.PropTypes.object.isRequired,
  renderOuter: React.PropTypes.func
}
export default observer(MUIListView)
