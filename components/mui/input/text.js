import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'

const MUITextInput = ({ attr, record, label, onChange, errors }) => {

  function handleChange (evt) {
    onChange(attr, evt.target.value)
  }

  const errorText = errors ? errors.get(attr) : undefined
  const value = record.get(attr)
  return (
    <TextField name={attr} floatingLabelText={label}
      value={value || ''} onChange={handleChange}
      errorText={errorText} fullWidth={true} />
  )
}
MUITextInput.propTypes = {
  attr: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}
export default observer(MUITextInput)
