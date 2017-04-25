import React from 'react'
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
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
}
export default observer(MUITextInput)
