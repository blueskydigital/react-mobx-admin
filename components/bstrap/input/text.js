import React from 'react'
import { observer } from 'mobx-react'

const TextInput = ({attr, record, label, onChange, errors}, ...rest) => {

  function handleChange(event) {
    onChange(attr, event.target.value)
  }

  const errorText = errors ? errors.get(attr) : undefined
  const value = record.get(attr)
  // TODO: errorText={errorText}
  return (
    <input name={attr} value={value || ''} onChange={handleChange} {...rest} />
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
