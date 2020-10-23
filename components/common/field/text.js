import React from 'react'
import PropTypes from 'prop-types'
import { OverlayTrigger, Popover } from 'react-bootstrap'

const TextField = ({ attr, val, Component, toFixed, options, labelattr, valueattr, popoverText, disableValue, textWidth }) => {
  if (!val && String(val) !== '0') {
    return null
  }

  if (val && toFixed) {
    const parsed = parseFloat(val)

    if (parsed || parsed === 0) {
      if (parsed === 0) val = 0
      else val = isNaN(parseInt(toFixed)) ? parsed.toFixed(2) : parsed.toFixed(toFixed)
    }
  }

  const found = options
    ? options.filter(i => (i[valueattr || 'value'] === val))
    : null

  const text = found && found.length > 0
    ? (typeof labelattr === 'function' ? labelattr(found[0]) : found[0][labelattr || 'label'])
    : popoverText || null

  const addDisableValue = disableValue ? ' text-muted' : ''
  const collapseClass = val.length > 20 ? ' regions-collapse' : ''

  const handleClick = e => {
    e.preventDefault()
    if (e.target.style.whiteSpace === 'normal') {
      e.target.style.whiteSpace = 'nowrap'
      e.target.style.cursor = 'zoom-in'
      e.target.style.fontWeight = 'normal'
    } else {
      e.target.style.whiteSpace = 'normal'
      e.target.style.cursor = 'zoom-out'
    }
  }

  const textWidthStyle = textWidth && ({ maxWidth: textWidth })
  const finalVal = Component
    ? val
    : (<span className={val && val.length && (val.length > 20 || val.indexOf(' ') || val.indexOf('-'))
      ? 'one-line-value' + addDisableValue + collapseClass
      : addDisableValue} onClick={collapseClass ? handleClick : null}
    style={textWidthStyle}
    title={!text ? val : ''}>
      {val}
    </span>)

  return Component
    ? <Component attr={attr} text={val} />
    : (!text ? finalVal : <OverlayTrigger
      trigger={['hover', 'focus']}
      placement='left'
      overlay={<Popover>{text}</Popover>}>
      {finalVal}
    </OverlayTrigger>)
}

TextField.propTypes = {
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
  values: PropTypes.array,
  disableValue: PropTypes.bool,
  popoverText: PropTypes.string,
  Component: PropTypes.func
}

export default TextField
