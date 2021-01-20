import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateField = ({ attr, val, valN, valT, Component, showTime }) => {
  if (!val) {
    return null
  }

  const text = val && (moment(val).isValid()
    ? (val && moment(typeof val === 'string' && val.indexOf('T') < 0
      ? (val + 'T00:00:00.000Z')
      : val).utc()
      .format(showTime
        ? 'YYYY-MM-DD HH:mm'
        : 'YYYY-MM-DD'))
    : '')

  const validDate = moment(text).isValid() && moment(text)
  const validDateN = valN && moment(valN).isValid() && moment(valN)
  const validDateT = valT && moment(valT).isValid() && moment(valT)
  let addClass = ''
  switch (attr) {
  case 'from':
  case 'valid_from':
  case 'items_valid_from':
  case 'contract_date':
  case 'due_date':
  case 'publish_date':
  case 'start_license_period':
    addClass = (validDateT || validDateN)
      ? (moment().isSameOrAfter(validDate, 'day') && moment().isSameOrBefore((validDateT || validDateN), 'day')
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
  case 'canceled_date':
  case 'end_license_period':
    addClass = validDateN
      ? (moment().isSameOrBefore((validDateT || validDate), 'day') && moment().isSameOrAfter(validDateN, 'day')
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
