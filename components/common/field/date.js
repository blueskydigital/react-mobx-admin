import React from 'react'
import PropTypes from 'prop-types'

const DateField = ({ attr, val, Component }) => {
  function formateDate ({ date = new Date(), separator = '-', order = ['year', 'month', 'day'] }) {
    let obj = {
      'year': date.getUTCFullYear(),
      'month': (date.getUTCMonth() + 1 < 10) ? ('0' + (date.getUTCMonth() + 1)) : (date.getUTCMonth() + 1),
      'day': (date.getUTCDate() < 10) ? ('0' + date.getUTCDate()) : date.getUTCDate()
    }
    return `${obj[order[0]]}${separator}${obj[order[1]]}${separator}${obj[order[2]]}`
  }

  if (!val) {
    return null
  }

  const d = val instanceof Date ? d : new Date(val)
  const text = formateDate({date: d})
  return Component ? <Component attr={attr} text={text} /> : <span className='one-line-value'>{text}</span>
}

DateField.propTypes = {
  attr: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
}

export default DateField
