import React from 'react'
import PropTypes from 'prop-types'
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
  attr: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
export default observer(MUIBoolInput)
