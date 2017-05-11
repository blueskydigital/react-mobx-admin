import React from 'react'
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
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
}
export default observer(MUIDateInput)
