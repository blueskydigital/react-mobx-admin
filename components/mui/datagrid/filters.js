import React from 'react'
import { observer } from 'mobx-react'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import { CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import ActionHide from 'material-ui/svg-icons/action/highlight-off'
import FilterBases from '../../common/datagrid/filters'
import TextField from 'material-ui/TextField'


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

const _filterStyle = {'backgroundColor': 'rgb(232, 232, 232)'}
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
    return (
      <Chip onRequestDelete={onHide} style={styles.chip} key={name}>
        <div>{filter.title}</div>
        <filter.component record={state.cv.filters} attr={name} onChange={onUpdateValue} />
      </Chip>
    )
  }

  renderControls(controls, apply) {
    return (
      <CardText style={_filterStyle}>
        <div style={styles.wrapper}>
          {controls}
        </div>
      </CardText>
    )
  }

}

const Apply = observer(({apply, label, state}) => {
  const show = state.filters.size > 0 && ! state.filtersApplied
  return show && (<RaisedButton label={label} icon={<ContentFilter />} onClick={apply}/>)
})

export default { Dropdown, Controls, Apply }
