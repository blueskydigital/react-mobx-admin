import React from 'react'
import PropTypes from 'prop-types'

const DateField = ({ attr, val, Component }) => {
  if (!val) {
    return null
  }

  const d = val instanceof Date ? d : new Date(val)
  const text = d.toLocaleDateString()
  return Component ? <Component attr={attr} text={text} /> : <span>{text}</span>
}

DateField.propTypes = {
  attr: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
}

export default DateField
