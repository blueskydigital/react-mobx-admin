import React from 'react'
import { observer } from 'mobx-react'


export default class DatagridBase extends React.Component {

  static propTypes = {
    attrs: React.PropTypes.array.isRequired,
    fields: React.PropTypes.array.isRequired,
    items: React.PropTypes.object.isRequired,
    rowId: React.PropTypes.func.isRequired, // func that returns unique ID from given row
    sortstate: React.PropTypes.object,
    selection: React.PropTypes.array,
    onSort: React.PropTypes.func,
    titles: React.PropTypes.array,  // title of columns, if present header is rendered
    listActions: React.PropTypes.func
  }

  buildHeaders(sortDir, sortField) {
    const { attrs, titles, listActions, onSort } = this.props

    let headers = []
    let i
    for(i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      const title = titles[i]
      const sort = (sortField === attr) ? sortDir : null
      const header = this.renderHeader(attr, title, sort, onSort)
      headers.push(header)
    }

    // add another th for List actions if any
    if (listActions) {
      headers.push(<th key={'_actions'}></th>)
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

}
