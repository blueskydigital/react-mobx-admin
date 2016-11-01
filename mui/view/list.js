import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../components/datagrid/actions'


export default class MUIListView extends React.Component {

  onSelectionChange(data) {
    this.props.state.updateSelection(data)
  }

  renderComponents(props2) {
    const { state } = this.props

    function isSelected(idx) {
      return state.currentView.selection.indexOf(idx) >= 0
    }

    return (
      <Card style={{ margin: '2em', opacity: state.loading ? 0.8 : 1 }}>
        <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
          <Filters.Apply state={state} label={'apply filters'} apply={()=>state.applyFilters()} />
          {props2.actions && (<DatagridActions state={state} actions={props2.actions} />)}
          {props2.filters && (
            <Filters.Dropdown state={state} title="addfilter" filters={props2.filters}
              showFilter={(filter)=>state.showFilter(filter)} />
          )}
        </CardActions>

        <CardTitle title={props2.title} />

        {props2.filters && (
          <Filters.Controls state={state} hideFilter={(filter)=>state.hideFilter(filter)} filters={props2.filters} />
        )}

        <Datagrid items={state.currentView.items} attrs={state.currentView.attrs}
          titles={state.currentView.headertitles} fields={props2.fields}
          rowId={(row)=>row[state.currentView.pkName]}
          onSort={(field, dir)=>state.updateSort(field, dir)} sortstate={state.currentView}
          onRowSelection={this.onSelectionChange.bind(this)} isSelected={isSelected} />
        <Pagination state={state} onChange={(page)=>state.updatePage(page)} />
      </Card>
    )
  }

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

}
