import React from 'react'
import { observer } from 'mobx-react'
import { Checkbox } from 'react-bootstrap'

const BStrapBoolInput = ({attr, label, record, onChange, valuemapping}) => {

  const checked = Boolean(record.get(attr))

  const handleChange = (event) => {
    const newVal = ! checked
    onChange(attr, valuemapping ? valuemapping[newVal] : newVal)
  }

  return (
    <Checkbox checked={checked} onChange={handleChange}>{label}</Checkbox>
  )
}

BStrapBoolInput.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  valuemapping: React.PropTypes.object
}

export default observer(BStrapBoolInput)
