import React from 'react'

const ObservedOptionsField = ({ attr, record, optionsrecord, optionsattr, labelattr, valueattr, ...rest }) => {

  const onClick = rest.onClick || rest.onTouchTap
  const Component = rest.Component

  function handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row on da table this field is on ...
    onClick()
  }

  const val = record[attr]

  if (! val) {
    return null
  }

  const options = optionsrecord.get(optionsattr || attr)
  const found = options && options.filter((i) => {
    return i[valueattr || 'value'] === val
  })
  const text = (found && found.length > 0) ? found[0][labelattr || 'label'] : val
  const valRender = rest.Component ? <rest.Component text={text} /> : (<span>{text}</span>)
  return onClick ? (<a href="#" onClick={handleTouchTap}>{valRender}</a>) : valRender
}
ObservedOptionsField.propTypes = {
  attr: React.PropTypes.any.isRequired,
  record: React.PropTypes.object.isRequired,
  optionsrecord: React.PropTypes.object.isRequired,
  optionsattr: React.PropTypes.string,
  labelattr: React.PropTypes.string,
  valueattr: React.PropTypes.string,
  onTouchTap: React.PropTypes.func,
  onTouchTap: React.PropTypes.func
}
export default ObservedOptionsField
