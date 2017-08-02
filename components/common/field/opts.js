import React from 'react'

const OptionsField = ({ attr, val, getText, ...rest }) => {
  const onClick = rest.onClick || rest.onTouchTap

  function handleTouchTap (e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row on da table this field is on ...
    onClick()
  }

  if (!val) {
    return null
  }

  const valRender = (<span>{getText(val)}</span>)
  return onClick ? (<a href='javascript:void(0)' onClick={handleTouchTap}>{valRender}</a>) : valRender
}
export default OptionsField
