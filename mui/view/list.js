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

  render() {
    const { state } = this.props

    function isSelected(idx) {
      return state.currentView.selection.indexOf(idx) >= 0
    }

    const title = state.currentView.title && <CardTitle title={state.currentView.title} />
    const filters = this.filters && (
      <Filters.Controls state={state}
        hideFilter={(filter)=>state.hideFilter(filter)} filters={this.filters} />
    )

    const result = (
      <Card style={{ margin: '2em', opacity: state.loading ? 0.8 : 1 }}>
        <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
          <Filters.Apply state={state} label={'apply filters'} apply={()=>state.applyFilters()} />
          {this.batchActions && (<DatagridActions state={state} actions={this.batchActions} />)}
          {this.filters && (
            <Filters.Dropdown state={state} title="addfilter" filters={this.filters}
              showFilter={(filter)=>state.showFilter(filter)} />
          )}
        </CardActions>

        { title }
        { filters }

        <Datagrid items={state.currentView.items} attrs={state.currentView.attrs}
          titles={state.currentView.headertitles} fields={this.fields}
          rowId={(row)=>row[state.currentView.pkName]}
          onSort={(field, dir)=>state.updateSort(field, dir)} sortstate={state.currentView}
          onRowSelection={this.onSelectionChange.bind(this)} isSelected={isSelected} />
        <Pagination state={state} onChange={(page)=>state.updatePage(page)} />
      </Card>
    )

    return this.renderOuter ? this.renderOuter(result) : result
  }

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

}
