import React from 'react'

const OptionsField = ({ attr, record, getText, ...rest }) => {

  const onClick = rest.onClick || rest.onTouchTap

  function handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row on da table this field is on ...
    onClick()
  }

  const val = record[attr]

  if (! val) {
    return null
  }

  const valRender = (<span>{getText(val)}</span>)
  return onClick ? (<a href="#" onClick={handleTouchTap}>{valRender}</a>) : valRender
}
export default OptionsField
