import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../common/datagrid/actions'

const MUIListView = ({
  store, onAddClicked, fields, filters, listActions, batchActions, renderOuter
}) => {
  //
  function onSelectionChange (selection) {
    if (selection === 'all') {
      store.selectAll()
    } else if (selection === 'none') {
      store.updateSelection([])
    } else {
      store.updateSelection(selection)
    }
  }

  function isSelected (idx) {
    return store.selection && store.selection.indexOf(idx) >= 0
  }

  const filtersRender = filters ? (
    <Filters.Controls state={store} filters={filters} showAttrFilters
      hideFilter={store.hideFilter.bind(store)} />
  ) : null
  const pagination = (
    <Pagination store={store} onChange={store.updatePage.bind(store)} />
  )
  const actions = (
    <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
      <Filters.Apply state={store} label={'apply filters'} apply={store.applyFilters.bind(store)} />
      {batchActions && (<DatagridActions state={store} actions={batchActions} />)}
      {filters && (
        <Filters.Dropdown state={store} title='addfilter' filters={filters}
          showFilter={store.showFilter.bind(store)} />
      )}
      {onAddClicked && <FlatButton label={store.addText} icon={<AddIcon />}
        onClick={() => onAddClicked(store)} />}
    </CardActions>
  )

  const result = (
    <Card>
      { actions }
      { store.title ? <CardTitle title={store.title} /> : null }
      { filtersRender }
      <div style={{clear: 'both'}}>
        <Datagrid state={store} attrs={store.attrs}
          titles={store.headertitles} fields={fields}
          rowId={(row) => row[store.pkName]}
          listActions={listActions}
          onSort={store.updateSort.bind(store)}
          sortstate={store.router.queryParams}
          onRowSelection={onSelectionChange} isSelected={isSelected} />
      </div>
      { pagination }
    </Card>
  )

  return renderOuter ? renderOuter(result) : result
}
MUIListView.propTypes = {
  store: PropTypes.object.isRequired,
  renderOuter: PropTypes.func
}
export default observer(MUIListView)
