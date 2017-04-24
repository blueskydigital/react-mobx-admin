import React from 'react'
import { observer } from 'mobx-react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../common/datagrid/actions'

const MUIListView = ({
  state, onAddClicked, fields, filters, listActions, batchActions, renderOuter
}) => {

  const cv = state.currentView

  function onSelectionChange(selection) {
    if(selection === 'all') {
      state.selectAll(cv)
    } else if(selection === 'none') {
      state.updateSelection(cv, [])
    } else {
      state.updateSelection(cv, selection)
    }
  }

  function isSelected(idx) {
    return cv.selection && cv.selection.indexOf(idx) >= 0
  }

  const filtersRender = (filters) ? (
    <Filters.Controls state={state} filters={filters}
      hideFilter={(filter)=>state.hideFilter(cv, filter)} />
  ) : null
  const pagination = (
    <Pagination state={state} onChange={(page)=>state.updatePage(cv, page)} />
  )
  const actions = (
    <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
      <Filters.Apply state={state} label={'apply filters'} apply={()=>state.applyFilters(cv)} />
      {batchActions && (<DatagridActions state={state} actions={batchActions} />)}
      {filters && (
        <Filters.Dropdown state={state} title="addfilter" filters={filters}
          showFilter={(filter)=>state.showFilter(cv, filter)} />
      )}
      {onAddClicked && <FlatButton label={cv.addText} icon={<AddIcon />}
        onTouchTap={() => onAddClicked(state)} />}
    </CardActions>
  )

  const result = (
    <Card>
      { actions }
      { cv.title ? <CardTitle title={cv.title} /> : null }
      { filtersRender }
      <div style={{clear: "both"}}>
        <Datagrid state={cv} attrs={cv.attrs}
          titles={cv.headertitles} fields={fields}
          rowId={(row)=>row[cv.pkName]}
          listActions={listActions}
          onSort={(field, dir)=>state.updateSort(cv, field, dir)}
          sortstate={cv}
          onRowSelection={onSelectionChange} isSelected={isSelected} />
      </div>
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
