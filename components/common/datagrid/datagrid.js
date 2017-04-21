import React from 'react'
import { observer } from 'mobx-react'


export default class DatagridBase extends React.Component {

  static propTypes = {
    attrs: React.PropTypes.object.isRequired,
    fields: React.PropTypes.array.isRequired,
    items: React.PropTypes.object.isRequired,
    rowId: React.PropTypes.func.isRequired, // func that returns unique ID from given row
    sortstate: React.PropTypes.object,
    selection: React.PropTypes.array,
    onSort: React.PropTypes.func,
    titles: React.PropTypes.object,  // title of columns, if present header is rendered
    listActions: React.PropTypes.func
  }

  buildHeaders() {
    const { attrs, titles, listActions, onSort, sortstate } = this.props

    let headers = []
    let i
    for(i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      const title = titles[i]
      const sort = sortstate && (sortstate.sortField === attr) ? sortstate.sortDir : null
      const header = this.renderHeader(attr, title, sort, onSort)
      headers.push(header)
    }

    // add another th for List actions if any
    if (listActions) {
      headers.push(this.renderListActionsHeader(listActions))
    }

    return headers
  }

  buildCells(row, rowId) {
    const { attrs, fields, listActions } = this.props
    let cells = []
    let i
    for(i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      const field = fields[i]
      const cell = this.renderCell(row, attr, field, rowId)
      cells.push(cell)
    }

    if(listActions) {
      cells.push(this.renderListActions(listActions(row)))
    }

    return cells
  }

  render() {
    const { rowId, items, isSelected, onRowSelection, onSort, titles } = this.props
    const selectable = onRowSelection !== undefined && isSelected !== undefined
    const headers = titles && this.renderHeaders()

    return this.renderTable(headers)
  }

}
