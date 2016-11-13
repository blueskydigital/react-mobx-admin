import React from 'react'

const BStrapOptionsField = ({
  record, attr, onClick, optionsrecord, optionsattr, valueattr
}) => {
  const val = record[attr]
  const options = optionsrecord.get(optionsattr || attr)
  const found = options && options.filter((i) => {
    return i[valueattr || 'value'] === val
  })
  if(found && found.length > 0) {
    const val = <span>found[0][labelattr || 'label']</span>
    return onClick ? (<a href="#" onClick={onClick}>{val}</a>) : val)
  }
  return null  
}

BStrapOptionsField.propTypes = {
  attr: React.PropTypes.any.isRequired,
  record: React.PropTypes.object.isRequired,
  optionsrecord: React.PropTypes.object.isRequired,
  optionsattr: React.PropTypes.string,
  labelattr: React.PropTypes.string,
  valueattr: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default BStrapOptionsField
