import React from 'react'
import { observer } from 'mobx-react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const TextInput = ({attr, record, label, onChange, errors, ...rest}) => {

  function handleChange(event) {
    onChange(attr, event.target.value)
  }

  const errorText = errors ? errors.get(attr) : undefined
  const validationState = errorText ? 'error' : 'success'
  const value = record.get(attr)
  return (
    <FormGroup controlId={attr} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="input" name={attr} value={value || ''}
        onChange={handleChange} {...rest} />
      <FormControl.Feedback />
      {errorText ? <HelpBlock>{errorText}</HelpBlock> : null}
    </FormGroup>
  )
}

TextInput.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
}

export default observer(TextInput)
