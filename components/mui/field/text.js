import React from 'react'

const TextField = ({ attr, record, onTouchTap }) => {

  function handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row on da table this field is on ...
    onTouchTap()
  }

  const val = record[attr]

  if (! val) {
    return null
  }

  const valRender = (<span>{val}</span>)
  return onTouchTap ? (<a href="javascript:void(0)" onTouchTap={handleTouchTap}>{valRender}</a>) : valRender
}
export default TextField
