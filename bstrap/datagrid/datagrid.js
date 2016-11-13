import React from 'react'
import { observer } from 'mobx-react'
import { Checkbox } from 'react-bootstrap'
import DatagridBase from '../../components/datagrid/datagrid'
import HeaderBase from '../../components/datagrid/header'


class BStrapHeader extends HeaderBase {
  renderIcon(sort) {
    return <span style={sort === 'ASC' ? { transform: 'rotate(180deg)' } : {}}>sort</span>
  }
}


@observer
class BStrapDatagrid extends DatagridBase {

  renderHeader(name, label, sort, onSort) {
    return (
      <th key={`th_${name}`}>
        <BStrapHeader sort={sort} name={name} label={label} onSort={onSort} />
      </th>
    )
  }

  renderListActionsHeader(listActions) {
    return <th key={'_actions'}>{listActions()}</th>
  }

  renderCell(row, name, creatorFn, rowId) {
    return (
      <td key={`td_${rowId}_${name}`}>
        {creatorFn(name, row)}
      </td>
    )
  }

  renderListActions(listActions) {
    return(
      <td key={'datagrid-actions'}>{listActions}</td>
    )
  }

  renderHeaders() {
    const { isSelected, onRowSelection } = this.props
    const selectable = onRowSelection !== undefined && isSelected !== undefined
    return (
      <thead>
        <tr>{this.buildHeaders()}</tr>
      </thead>
    )
  }

  renderTable(header) {
    const { rowId, items, isSelected, onRowSelection } = this.props
    const selectable = onRowSelection !== undefined && isSelected !== undefined

    return (
      <table className="table table-sm">
        {header}
        <tbody>
          {items.map((r, i) => {
            const id = rowId(r)
            const selected = selectable && isSelected(i)
            return (<tr selected={selected} key={i}>{this.buildCells(r, id)}</tr>)
          })}
        </tbody>
      </table>
    )
  }
}
export default BStrapDatagrid
