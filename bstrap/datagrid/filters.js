import React from 'react'
import { observer } from 'mobx-react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import FilterBases from '../../components/datagrid/filters'

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
      <DropdownButton title="Dropdown" id="bg-nested-dropdown">
        {this.createItems(state, filters)}
      </DropdownButton>
    )
  }

}

// controls to set filter values
@observer
class Controls extends FilterBases.ControlsBase {

  renderControl(filter, name, state, onHide, onUpdateValue) {

    const deleteLink = (
      <button onClick={onHide} tooltip="Remove this filter">
        x
      </button>
    )

    return (
      <div className={`form-field form-group filter-${name}`} key={name}>
        <div>
          {deleteLink}
        </div>
        <div style={{ float: 'right' }}>
          <filter.component record={state.currentView.filters} attr={name} label={filter.label} onChange={onUpdateValue} />
        </div>
      </div>
    )
  }

  renderControls(controls, apply) {
    return (
      <div>
        {controls}
      </div>
    )
  }

}

const Apply = observer(({ apply, label, state }) => {
  const show = state.currentView.filters.size > 0
  return show && (<button onClick={apply}>{label}</button>)
})

export default { Dropdown, Controls, Apply }
