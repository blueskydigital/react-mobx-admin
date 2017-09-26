import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({ attr, val, Component }) => {
  if (!val) {
    return null
  }

  return Component
    ? <Component attr={attr} text={val} />
    : <span className={val.length > 25 ? 'one-line-value' : ''} title={val}>
      {val}</span>
}

TextField.propTypes = {
  attr: PropTypes.any.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  Component: PropTypes.func
}

export default TextField
