import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import DatePicker from 'material-ui/DatePicker'

const MUIDateInput = ({ attr, record, label, errors, onChange }) => {

  function handleChange(_, value) {
    onChange(attr, value)
  }

  function datify(value) {
    const dateVal = value instanceof Date ? value : new Date(value)
    return isNaN(dateVal.getTime()) ? null : dateVal
  }

  const errorText = errors ? errors.get(attr) : undefined
  const val = record.get(attr)
  return (
    <DatePicker
      errorText={errorText}
      floatingLabelText={label}
      container="inline"
      autoOk
      value={val ? datify(val) : null}
      onChange={handleChange} />
  )
}
MUIDateInput.propTypes = {
  attr: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}
export default observer(MUIDateInput)
