import React from 'react'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from '../../common/datagrid/actions'


export default class BStrapListView extends React.Component {

  onSelectionChange(selection) {
    if(selection === 'all') {
      this.props.state.selectAll(this.props.state.currentView)
    } else if(selection === []) {
      this.props.state.updateSelection(this.props.state.currentView, [])
    } else { // we have receive index of selected item
      // so toggle the selection of da index
      this.props.state.toggleIndex(this.props.state.currentView, selection)
    }
  }

  render() {
    const { state, onAddClicked } = this.props

    function isSelected(idx) {
      return state.currentView.selection.indexOf(idx) >= 0
    }

    const loading = (! state.currentView.items) || state.currentView.items.length === 0

    if(loading) {
      return <span className="is-loading">loading</span>
    }

    const allSelected = state.currentView.selection.length === state.currentView.items.length

    const filters = (this.filters && ! loading) ? (
      <Filters.Controls state={state}
        hideFilter={(filter)=>state.hideFilter(state.currentView, filter)} filters={this.filters} />
    ) : null
    const grid = (
      <Datagrid items={state.currentView.items} attrs={state.currentView.attrs}
        titles={state.currentView.headertitles} fields={this.fields}
        rowId={(row)=>row[state.currentView.pkName]}
        listActions={this.listActions ? this.listActions.bind(this) : undefined}
        onSort={(field, dir)=>state.updateSort(state.currentView, field, dir)} sortstate={state.currentView}
        onRowSelection={this.onSelectionChange.bind(this)} isSelected={isSelected}
        allSelected={allSelected} />
    )

    const result = (
      <div className="card">
        <div className="card-block">
          <div className="pull-right">
            <Filters.Apply state={state} label={'apply filters'} apply={()=>state.applyFilters(state.currentView)} />
            {this.batchActions && (<DatagridActions state={state} actions={this.batchActions} />)}
            {this.filters && (
              <Filters.Dropdown state={state} title="addfilter" filters={this.filters}
                showFilter={(filter)=>state.showFilter(state.currentView, filter)} />
            )}
            <button type="button" className="btn btn-primary"
              onClick={()=>onAddClicked(state)}>{state.currentView.addText || '+'}</button>
          </div>
          {state.currentView.title ? <h4 className="card-title">{state.currentView.title}</h4> : null}
        </div>
        { filters }
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

    return this.renderOuter ? this.renderOuter(result) : result
  }

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

}
