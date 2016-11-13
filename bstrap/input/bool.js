import React from 'react'
import { observer } from 'mobx-react'
import { Checkbox } from 'react-bootstrap'

const BStrapBoolInput = ({attr, label, record, onChange}) => {

  const handleChange = (event, isInputChecked) => {
    onChange(this.props.attr, isInputChecked)
  }

  const checked = Boolean(record.get(attr))
  return (
    <Checkbox checked={checked} onChange={handleChange}>{label}</Checkbox>
  )
}

BStrapBoolInput.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}

export default observer(BStrapBoolInput)
