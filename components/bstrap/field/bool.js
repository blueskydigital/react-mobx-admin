import React from 'react'

const BStrapBoolField = ({record, attr, valuemapping}) => {
  const val = valuemapping ? valuemapping[record[attr]] : record[attr]
  const checked = Boolean(val)
  return (
    <input className="form-check-input" name={attr} type="checkbox" checked={checked} disabled />
  )
}

BStrapBoolField.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired
}

export default BStrapBoolField
