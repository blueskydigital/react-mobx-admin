import React from 'react'
import { observer } from 'mobx-react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import FilterBases from '../../common/datagrid/filters'

// dropdown with available filters
@observer
class Dropdown extends FilterBases.DropdownBase {

  renderItem(name, text, icon, onClick) {
    return (
      <MenuItem key={name} eventKey={name} onClick={onClick}>{text}</MenuItem>
    )
  }

  renderMenu(state, filters) {
    return (
      <DropdownButton title="filters" id="bg-nested-dropdown">
        {this.createItems(state, filters)}
      </DropdownButton>
    )
  }

}

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

// controls to set filter values
@observer
class Controls extends FilterBases.ControlsBase {

  renderControl(filter, name, state, onHide, onUpdateValue) {

    const deleteLink = (
      <button onClick={onHide}>
        x
      </button>
    )

    return (
      <div className={`form-field form-group filter-${name}`} style={styles.chip} key={name}>
        <div style={{ float: 'left' }}>
          <div>{filter.title}</div>
          <filter.component record={state.currentView.filters} attr={name} onChange={onUpdateValue} />
        </div>
        {deleteLink}
      </div>
    )
  }

  renderControls(controls, apply) {
    return (
      <div style={styles.wrapper}>
        {controls}
      </div>
    )
  }

}

const Apply = observer(({ apply, label, state }) => {
  const show = state.currentView.filters.size > 0 && ! state.filtersApplied
  return show && (<button onClick={apply}>{label}</button>)
})

export default { Dropdown, Controls, Apply }
