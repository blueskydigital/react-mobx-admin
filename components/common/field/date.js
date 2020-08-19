import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateField = ({ attr, val, valN, Component }) => {
  function formateDate ({ date = new Date(), separator = '-', order = ['year', 'month', 'day'] }) {
    const obj = {
      year: date.getUTCFullYear(),
      month: (date.getUTCMonth() + 1 < 10) ? ('0' + (date.getUTCMonth() + 1)) : (date.getUTCMonth() + 1),
      day: (date.getUTCDate() < 10) ? ('0' + date.getUTCDate()) : date.getUTCDate()
    }
    return `${obj[order[0]]}${separator}${obj[order[1]]}${separator}${obj[order[2]]}`
  }

  if (!val) {
    return null
  }

  const d = val instanceof Date ? d : new Date(val)
  const text = formateDate({ date: d })
  const validDate = moment(text).isValid() && moment(text)
  const validDateN = valN && moment(valN).isValid() && moment(valN)
  let addClass = ''

  switch (attr) {
  case 'valid_from':
    addClass = validDateN
      ? (moment().isSameOrAfter(validDate, 'day') && moment().isSameOrBefore(validDateN, 'day')
        ? 'text-success'
        : 'text-danger')
      : ''
    break
  case 'valid_to':
    addClass = validDateN
      ? (moment().isSameOrBefore(validDate, 'day') && moment().isSameOrAfter(validDateN, 'day')
        ? 'text-success'
        : 'text-danger')
      : ''
    break
  }

  return Component
    ? <Component attr={attr} text={text} />
    : <span className={'one-line-value ' + addClass}>{text}</span>
}

DateField.propTypes = {
  attr: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
}

export default DateField
