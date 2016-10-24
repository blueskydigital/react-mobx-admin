import React from 'react'
import { observer } from 'mobx-react'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import ContentSort from 'material-ui/svg-icons/content/sort'
import DatagridBase from '../../components/datagrid/datagrid'
import HeaderBase from '../../components/datagrid/header'


class MUIHeader extends HeaderBase {
  renderIcon(sort) {
    return <ContentSort style={sort === 'ASC' ? { transform: 'rotate(180deg)' } : {}} />
  }
}


@observer
class MUIDatagrid extends DatagridBase {

  renderHeader(name, label, sort, onSort) {
    return (
      <TableHeaderColumn key={`th_${name}`}>
        <MUIHeader sort={sort} name={name} label={label} onSort={onSort} />
      </TableHeaderColumn>
    )
  }

  renderCell(row, name, creatorFn, rowId) {
    return (
      <TableRowColumn key={`td_${rowId}_${name}`}>
        {creatorFn(name, row)}
      </TableRowColumn>
    )
  }

  renderListActions(listActions) {
    return(
      <TableRowColumn key={'datagrid-actions'}>{listActions}</TableRowColumn>
    )
  }

  renderHeaders(sortstate) {
    return (
      <TableHeader>
        <TableRow>{this.buildHeaders(sortstate.sortDir, sortstate.sortField)}</TableRow>
      </TableHeader>
    )
  }

  renderTable(header) {
    const { rowId, items, isSelected, onRowSelection } = this.props
    const selectable = onRowSelection !== undefined && isSelected !== undefined

    return (
      <Table selectable={selectable} onRowSelection={this.props.onRowSelection} multiSelectable={true}>
        {header}
        <TableBody displayRowCheckbox={selectable} deselectOnClickaway={false}>
          {items.map((r, i) => {
            const id = rowId(r)
            const selected = selectable && isSelected(i)
            return (<TableRow selected={selected} key={i}>{this.buildCells(r, id)}</TableRow>)
          })}
        </TableBody>
      </Table>
    )
  }
}
export default MUIDatagrid
