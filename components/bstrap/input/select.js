import React from 'react'
import { observer } from 'mobx-react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const SelectInput = ({
  attr, labelattr, valueattr, label, record,
  optionsrecord, optionsattr, errors, onChange
}) => {

  function handleChange(evt) {
    onChange(attr, evt.target.value)
  }

  function renderOptions(options, labelattr, valueattr) {
    let opts = []
    let idx, val, c
    for(idx = 0; idx < options.length; idx++) {
      val = options[idx]
      c = <option key={idx} value={val[valueattr]}>{val[labelattr]}</option>
      opts.push(c)
    }
    return opts
  }

  const errorText = errors ? errors.get(attr) : undefined
  const value = record.get(attr)
  const options = optionsrecord.get(optionsattr || attr)
  const renderedOpts = options && options.length &&
    renderOptions(options, labelattr || 'label', valueattr || 'value')
  return (
    <FormGroup controlId={attr}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="select" placeholder="select" onChange={handleChange}>
        {renderedOpts}
      </FormControl>
    </FormGroup>
  )
}

SelectInput.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  labelattr: React.PropTypes.string,
  valueattr: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  optionsrecord: React.PropTypes.object.isRequired,
  optionsattr: React.PropTypes.string,
  errors: React.PropTypes.object
}

export default observer(SelectInput)
