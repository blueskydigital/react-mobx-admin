import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


const MUISelectInput = ({
  attr, record, label,
  optionsrecord, optionsattr,
  labelattr, valueattr,
  errors, onChange
}) => {

  function handleChange(event, index, value) {
    onChange(attr, value)
  }

  const errorText = errors ? errors.get(attr) : undefined
  const value = record.get(attr)
  const options = optionsrecord.get(optionsattr || attr)

  function renderOptions(options, labelattr, valueattr) {
    let opts = []
    let idx, val, c
    for(idx = 0; idx < options.length; idx++) {
      val = options[idx]
      c = <MenuItem key={idx} value={val[valueattr]} primaryText={val[labelattr]} />
      opts.push(c)
    }
    return opts
  }

  const renderedOpts = options && options.length &&
    renderOptions(options, labelattr || 'label', valueattr || 'value')
  return (
    <SelectField value={value} onChange={handleChange}
        floatingLabelText={label} fullWidth={true} errorText={errorText}>
      {renderedOpts}
    </SelectField>
  )
}
MUISelectInput.propTypes = {
  attr: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  labelattr: PropTypes.string,
  valueattr: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  optionsrecord: PropTypes.object.isRequired,
  optionsattr: PropTypes.string,
  errors: PropTypes.object
}
export default observer(MUISelectInput)
