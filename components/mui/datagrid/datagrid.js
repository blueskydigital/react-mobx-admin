import React from 'react'
import { observer } from 'mobx-react'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import ContentSort from 'material-ui/svg-icons/content/sort'
import * as TUtils from '../../common/datagrid/table'
import HeaderBase from '../../common/datagrid/header'


class MUIHeader extends HeaderBase {
  renderIcon(sort) {
    return <ContentSort style={sort === 'ASC' ? { transform: 'rotate(180deg)' } : {}} />
  }
}

const MUIDatagrid = ({
  state, attrs, fields, titles, rowId, isSelected,
  onRowSelection, onSort, sortstate, listActions
}) => {

  const selectable = onRowSelection !== undefined && isSelected !== undefined

  function _renderHeader(name, label, sort, onSort) {
    return (
      <TableHeaderColumn key={'th_' + name}>
        <MUIHeader sort={sort} name={name} label={label} onSort={onSort} />
      </TableHeaderColumn>
    )
  }

  const listActionsRender = listActions ? (
    <TableHeaderColumn key={'_actions'}>
      { listActions() }
    </TableHeaderColumn>
  ) : null

  function _renderCell(row, name, creatorFn, rowId) {
    return (
      <TableRowColumn key={'td_' + rowId + name}>
        {creatorFn(name, row)}
      </TableRowColumn>
    )
  }

  function _renderRowActions(row) {
    return listActions ? (
      <TableRowColumn key={'datagrid-actions'}>{listActions(row)}</TableRowColumn>
    ) : null
  }

  let tableChildren = state.loading ? (
    <TableRow><TableRowColumn><CircularProgress /></TableRowColumn></TableRow>
  ) : state.items.length === 0 ? (
    <TableRow><TableRowColumn>EMPTY</TableRowColumn></TableRow>
  ) : state.items.map((r, i) => {
    const id = rowId(r)
    const selected = isSelected && isSelected(i)
    return (
      <TableRow selected={selected} key={i}>
        { TUtils.buildCells(attrs, fields, r, rowId, _renderCell, _renderRowActions) }
      </TableRow>
    )
  })

  return (
    <Table selectable={selectable} onRowSelection={onRowSelection} multiSelectable={true}>
      {titles ? (
        <TableHeader displaySelectAll={selectable}>
          <TableRow>
            { TUtils.buildHeaders(attrs, titles, _renderHeader, listActionsRender, onSort, sortstate) }
          </TableRow>
        </TableHeader>
      ) : null}
      <TableBody displayRowCheckbox={selectable} deselectOnClickaway={false}>
        {tableChildren}
      </TableBody>
    </Table>
  )
}
export default observer(MUIDatagrid)
