import React from 'react'
import PropTypes from 'prop-types'

const ObservedOptionsField = ({ attr, val, optionsrecord, optionsattr, labelattr, valueattr, ...rest }) => {
  const onClick = rest.onClick || rest.onTouchTap

  function handleTouchTap (e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row on da table this field is on ...
    onClick()
  }

  if (!val) {
    return null
  }

  const options = optionsrecord.get(optionsattr || attr)
  const found = options && options.filter((i) => {
    return i[valueattr || 'value'] === val
  })
  const text = (found && found.length > 0) ? found[0][labelattr || 'label'] : val
  const valRender = rest.Component ? <rest.Component text={text} /> : (<span>{text}</span>)
  return onClick ? (<a href='javascript:void(0)' onClick={handleTouchTap}>{valRender}</a>) : valRender
}
ObservedOptionsField.propTypes = {
  attr: PropTypes.any.isRequired,
  val: PropTypes.string,
  optionsrecord: PropTypes.object.isRequired,
  optionsattr: PropTypes.string,
  labelattr: PropTypes.string,
  valueattr: PropTypes.string,
  onTouchTap: PropTypes.func
}
export default ObservedOptionsField
