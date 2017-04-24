import React from 'react'
import { observer } from 'mobx-react'
import { Checkbox } from 'react-bootstrap'
import HeaderBase from '../../common/datagrid/header'
import * as TUtils from '../../common/datagrid/table'


class BStrapHeader extends HeaderBase {
  renderIcon(sort) {
    return <span style={sort === 'ASC' ? { transform: 'rotate(180deg)' } : {}}>sort</span>
  }
}

const BStrapDatagrid = ({
  state, attrs, fields, titles, rowId, isSelected,
  onRowSelection, onSort, sortstate, listActions, allSelected
}) => {

  function _renderHeader(name, label, sort, onSort) {
    return (
      <th key={`th_${name}`}>
        <BStrapHeader sort={sort} name={name} label={label} onSort={onSort} />
      </th>
    )
  }

  const listActionsRender = listActions ? (
    <th key={'_actions'}>{ listActions() }</th>
  ) : null

  function _renderCell(row, name, creatorFn, rowId) {
    return (
      <td key={`td_${rowId}_${name}`}>
        {creatorFn(name, row)}
      </td>
    )
  }

  function _renderRowActions(row) {
    return listActions ? (
      <td key={'datagrid-actions'}>{listActions(row)}</td>
    ) : null
  }

  function _onSelectAll(e) {
    e.target.checked ? onRowSelection('all') : onRowSelection([])
  }

  const selectable = onRowSelection !== undefined && isSelected !== undefined

  let tableChildren = state.loading ? (
    <tr><td>loadiny</td></tr>
  ) : state.items.length === 0 ? (
    <tr><td>EMPTY</td></tr>
  ) : state.items.map((r, i) => {
    const id = rowId(r)
    const selected = selectable && isSelected(i)
    return (
      <tr selected={selected} key={i}>
        { selectable ?
        <td key="chbox">
          <Checkbox checked={selected} inline={true}
            onChange={() => onRowSelection(i)}></Checkbox>
        </td>
        : null }
        {TUtils.buildCells(attrs, fields, r, rowId, _renderCell, _renderRowActions)}
      </tr>
    )
  })

  return (
    <table className="table table-sm">
      {titles ? (
        <thead>
          <tr>
            { selectable ? <th key="chbox">
              <Checkbox checked={allSelected} inline={true} bsClass="btn"
                onChange={_onSelectAll}></Checkbox>
            </th> : null }
            { TUtils.buildHeaders(attrs, titles, _renderHeader, listActionsRender, onSort, sortstate) }
          </tr>
        </thead>
      ) : null}
      <tbody>{tableChildren}</tbody>
    </table>
  )
}
export default observer(BStrapDatagrid)
