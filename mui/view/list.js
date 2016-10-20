import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../components/datagrid/actions'


export default class MUIListView extends React.Component {

  renderComponents(props2) {
    const {
      state, onSort, onPageChange, onRowSelection,
      onShowFilter, onHideFilter, onFilterApply // optional props
    } = this.props

    function isSelected(idx) {
      return state.selection.indexOf(idx) >= 0
    }

    return (
      <Card style={{ margin: '2em', opacity: state.loading ? 0.8 : 1 }}>
        <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
          <Filters.Apply state={state} label={'apply filters'} apply={onFilterApply} />
          {props2.actions && (<DatagridActions state={state} actions={props2.actions} />)}
          {props2.filters && (<Filters.Dropdown state={state} title="addfilter" filters={props2.filters} showFilter={onShowFilter} />)}
        </CardActions>

        <CardTitle title={props2.title} />

        {props2.filters && (
          <Filters.Controls state={state} hideFilter={onHideFilter} filters={props2.filters} />
        )}

        <Datagrid items={state.items} attrs={props2.attrs} titles={props2.headertitles} fields={props2.fields}
          rowId={props2.rowId}
          onSort={onSort} sortstate={state}
          onRowSelection={onRowSelection} isSelected={isSelected} />
        <Pagination state={state} onChange={onPageChange} />
      </Card>
    )
  }

  static propTypes = {
    state: React.PropTypes.object.isRequired,
    onSort: React.PropTypes.func.isRequired,
    onPageChange: React.PropTypes.func.isRequired,
    onRowSelection: React.PropTypes.func,
    onShowFilter: React.PropTypes.func,
    onHideFilter: React.PropTypes.func,
    onFilterApply: React.PropTypes.func
  }

}
