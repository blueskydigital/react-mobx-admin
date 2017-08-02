import React from 'react'
import PropTypes from 'prop-types'

const MUIDateField = ({ attr, val, onClick, ...rest }) => {
  function handleTouchTap (e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row on da table this field is on ...
    onClick()
  }

  if (!val) {
    return null
  }

  const d = val instanceof Date ? d : new Date(val)
  const valRender = (<span>{d.toLocaleDateString()}</span>)
  return onClick ? (<a href='javascript:void(0)' onTouchTap={handleTouchTap}>{valRender}</a>) : valRender
}
MUIDateField.propTypes = {
  attr: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
}
export default MUIDateField
