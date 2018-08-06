import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({ attr, val, Component, toFixed }) => {

  if (!val && String(val) !== '0') {
    return null
  }

  if(val || val && toFixed) {
    let parsed = parseFloat(val)

    if(parsed || parsed === 0)
      if(parsed === 0) val = 0
      else val = parsed.toFixed(toFixed || 2)
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
