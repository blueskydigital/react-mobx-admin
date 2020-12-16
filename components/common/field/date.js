import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateField = ({ attr, val, valN, Component, showTime }) => {
  function formateDate ({ date = new Date(), separator = '-', separator2 = ':', order = ['year', 'month', 'day'], order2 = ['hours', 'minutes'] }) {
    const obj = {
      year: date.getUTCFullYear(),
      month: (date.getUTCMonth() + 1 < 10) ? ('0' + (date.getUTCMonth() + 1)) : (date.getUTCMonth() + 1),
      day: (date.getUTCDate() < 10) ? ('0' + date.getUTCDate()) : date.getUTCDate(),
      hours: (date.getUTCHours() < 10) ? ('0' + date.getUTCHours()) : date.getUTCHours(),
      minutes: (date.getUTCMinutes() < 10) ? ('0' + date.getUTCMinutes()) : date.getUTCMinutes()

    }
    return !showTime
      ? `${obj[order[0]]}${separator}${obj[order[1]]}${separator}${obj[order[2]]}`
      : `${obj[order[0]]}${separator}${obj[order[1]]}${separator}${obj[order[2]]} ${obj[order2[0]]}${separator2}${obj[order2[1]]}`
  }

  if (!val) {
    return null
  }

  const dateVal = val instanceof Date ? val : new Date(val)
  const text = formateDate({ date: dateVal })
  const validDate = moment(text).isValid() && moment(text)
  const validDateN = valN && moment(valN).isValid() && moment(valN)
  let addClass = ''

  switch (attr) {
  case 'from':
  case 'valid_from':
  case 'items_valid_from':
  case 'contract_date':
  case 'due_date':
  case 'publish_date':
  case 'start_license_period':
    addClass = validDateN
      ? (moment().isSameOrAfter(validDate, 'day') && moment().isSameOrBefore(validDateN, 'day')
        ? 'text-success'
        : (moment().isBefore(validDate, 'day') ? 'text-info' : 'text-danger'))
      : ''
    break
  case 'to':
  case 'valid_to':
  case 'items_valid_to':
  case 'contract_end_date':
  case 'expire_date':
  case 'cancel_date':
  case 'end_license_period':
    addClass = validDateN
      ? (moment().isSameOrBefore(validDate, 'day') && moment().isSameOrAfter(validDateN, 'day')
        ? 'text-success'
        : (moment().isBefore(validDateN, 'day') ? 'text-info' : 'text-danger'))
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
