import React from 'react'

const MUIDateField = ({ attr, record, onClick, ...rest }) => {

  function handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row on da table this field is on ...
    const clickHandler = this.props.onTouchTap || this.props.onClick
    onClick()
  }

  if (! record[attr]) {
    return null
  }

  const d = record[attr] instanceof Date ? d : new Date(record[attr])
  const valRender = (<span>{d.toLocaleDateString()}</span>)
  return onClick ? (<a href="#" onTouchTap={handleTouchTap}>{valRender}</a>) : valRender
}
MUIDateField.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired
}
export default MUIDateField
