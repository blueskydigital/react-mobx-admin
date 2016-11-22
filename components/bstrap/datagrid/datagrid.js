import React from 'react'
import { observer } from 'mobx-react'
import { Checkbox } from 'react-bootstrap'
import DatagridBase from '../../common/datagrid/datagrid'
import HeaderBase from '../../common/datagrid/header'


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

  _onSelectAll(e) {
    e.target.checked ?
      this.props.onRowSelection('all') :
      this.props.onRowSelection([])
  }

  renderHeaders() {
    const { isSelected, onRowSelection, allSelected } = this.props
    const selectable = onRowSelection !== undefined && isSelected !== undefined
    return (
      <thead>
        <tr>
          { selectable ? <td key="chbox">
            <Checkbox checked={allSelected} inline={true}
              onChange={this._onSelectAll.bind(this)}></Checkbox>
          </td> : null }
          {this.buildHeaders()}
        </tr>
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
            return (
              <tr selected={selected} key={i}>
                { selectable ?
                <td key="chbox">
                  <Checkbox checked={selected} inline={true}
                    onChange={() => onRowSelection(i)}></Checkbox>
                </td>
                : null }
                {this.buildCells(r, id)}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
export default BStrapDatagrid
