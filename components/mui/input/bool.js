import React from 'react'
import { observer } from 'mobx-react'
import Checkbox from 'material-ui/Checkbox'

const MUIBoolInput = ({ attr, record, label, onChange }) => {

  function handleChange(event, isInputChecked) {
    onChange(attr, isInputChecked)
  }

  const checked = Boolean(record.get(attr))
  return (
    <Checkbox name={attr} label={label} checked={checked}
      onCheck={handleChange} labelPosition="left"/>
  )
}
MUIBoolInput.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}
export default observer(MUIBoolInput)
