import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../components/datagrid/actions'


export default class MUIListView extends React.Component {

  render() {
    const {
      state, title, desc, attrs, headertitles, fields, actions,
      rowId, onSort, onPageChange, onRowSelection,
      filters, onShowFilter, onHideFilter, onFilterApply // optional props
    } = this.props

    function isSelected(idx) {
      return state.selection.indexOf(idx) >= 0
    }

    return (
      <Card style={{ margin: '2em', opacity: state.loading ? 0.8 : 1 }}>
        <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
          <Filters.Apply state={state} label={'apply filters'} apply={onFilterApply} />
          {actions && (<DatagridActions state={state} actions={actions} />)}
          {filters && (<Filters.Dropdown state={state} title="addfilter" filters={filters} showFilter={onShowFilter} />)}
        </CardActions>

        <CardTitle title={title} />

        {filters && (
          <Filters.Controls state={state} hideFilter={onHideFilter} filters={filters} />
        )}

        <Datagrid items={state.items} attrs={attrs} titles={headertitles} fields={fields} rowId={rowId}
          onSort={onSort} sortstate={state}
          onRowSelection={onRowSelection} isSelected={isSelected} />
        <Pagination state={state} onChange={onPageChange} />
      </Card>
    )
  }

  static propTypes = {
    attrs: React.PropTypes.array.isRequired,
    fields: React.PropTypes.array.isRequired,
    headertitles: React.PropTypes.array,
    state: React.PropTypes.object.isRequired,
    rowId: React.PropTypes.func.isRequired,
    listActions: React.PropTypes.func,
    onSort: React.PropTypes.func.isRequired,
    onPageChange: React.PropTypes.func.isRequired,
    onRowSelection: React.PropTypes.func,
    onShowFilter: React.PropTypes.func,
    onHideFilter: React.PropTypes.func,
    onFilterApply: React.PropTypes.func
  }

}
