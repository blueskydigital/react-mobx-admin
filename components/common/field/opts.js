import React from 'react'
import PropTypes from 'prop-types'

const OptionsField = ({val, attr, options, valueattr, labelattr, Component}) => {
  const found = options ? options.filter((i) => {
    return i[valueattr || 'value'] === val
  }) : null
  if (found && found.length > 0) {
    const text = (typeof labelattr === 'function')
      ? labelattr(found[0]) : found[0][labelattr || 'label']

    return Component ? <Component text={text} /> : <span>{text}</span>
  }
  return null
}

OptionsField.propTypes = {
  attr: PropTypes.any.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  options: PropTypes.object,
  labelattr: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  valueattr: PropTypes.string,
  Component: PropTypes.func
}

export default OptionsField
