import React from 'react'
import { observer } from 'mobx-react'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import { CardText } from 'material-ui/Card'
import ActionHide from 'material-ui/svg-icons/action/highlight-off'
import FilterBases from '../../components/datagrid/filters'

// dropdown with available filters
@observer
class Dropdown extends FilterBases.DropdownBase {

  renderItem(name, text, icon, onClick) {
    return (
      <MenuItem key={name} primaryText={text} leftIcon={icon} onClick={onClick}/>
    )
  }

  renderMenu(state, filters) {
    return (
      <IconMenu iconButtonElement={<IconButton><ContentFilter /></IconButton>}>
        {this.createItems(state, filters)}
      </IconMenu>
    )
  }

}

// controls to set filter values
@observer
class Controls extends FilterBases.ControlsBase {

  renderControl(filter, name, state, onHide, onUpdateValue) {

    const deleteLink = (
      <IconButton iconStyle={{ color: '#00bcd4' }} onTouchTap={onHide} tooltip="Remove this filter">
        <ActionHide />
      </IconButton>
    )

    return (
      <div className={`form-field form-group filter-${name}`} key={name}>
        <div style={{ float: 'left' }}>
          {deleteLink}
        </div>
        <div style={{ float: 'right' }}>
          <filter.component record={state.filters} attr={name} label={filter.label} onChange={onUpdateValue} />
        </div>
      </div>
    )
  }

  renderControls(controls, apply) {
    return (
      <CardText>
        {controls}
        <div style={{ clear: 'both' }}></div>
      </CardText>
    )
  }

}

@observer
class Apply extends React.Component {
  render() {
    const { apply, label, state } = this.props
    const show = state.filters.size > 0
    return show && (<RaisedButton label={label} icon={<ContentFilter />} onTouchTap={apply}/>)
  }
}

export default { Dropdown, Controls, Apply }
