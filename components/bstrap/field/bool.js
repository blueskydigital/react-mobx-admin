import React from 'react'

const BStrapBoolField = ({record, attr}) => {
  const checked = Boolean(record[attr])
  return (
    <input className="form-check-input" name={attr} type="checkbox" value={checked} disabled />
  )
}

BStrapBoolField.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired
}

export default BStrapBoolField
