import React from 'react'
import { observer } from 'mobx-react'
import DatePicker from 'react-bootstrap-date-picker'
import { FormGroup, ControlLabel } from 'react-bootstrap'

const BStrapDateInput = ({attr, label, record, onChange, errors}) => {

  function handleChange(value) {
    onChange(attr, value)
  }

  const errorText = errors ? errors.get(attr) : undefined

  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <DatePicker value={record.get(attr)} onChange={handleChange} />
    </FormGroup>
  )
}

BStrapDateInput.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
}

export default observer(BStrapDateInput)
