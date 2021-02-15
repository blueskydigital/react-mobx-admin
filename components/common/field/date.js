import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateField = ({ attr, val, valN, valT, Component, showTime }) => {
  if (!val) {
    return null
  }

  let addClass = ''
  let text = val && (moment(val).isValid()
    ? (val && moment(typeof val === 'string' && val.indexOf('T') < 0
      ? (val + 'T00:00:00.000Z')
      : val).utc())
    : '')
  const compare = showTime ? 'second' : 'day'
  const now = moment(moment().format(moment.defaultFormatUtc)).utc()
  const validDate = moment(text).isValid() && moment(text)
  const validDateN = valN && moment(valN).isValid() && moment(valN)
  const validDateT = valT && moment(valT).isValid() && moment(valT)

  switch (attr) {
  case 'from':
  case 'valid_from':
  case 'items_valid_from':
  case 'contract_date':
  case 'due_date':
  case 'publish_date':
  case 'start_license_period':
    addClass = (validDateT || validDateN) && validDate
      ? (now.isSameOrAfter(validDate, compare) && now.isSameOrBefore((validDateT || validDateN), compare)
        ? 'text-success'
        : (now.isBefore(validDate, compare) ? 'text-info' : 'text-danger'))
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
    addClass = (validDateT || validDateN) && validDate
      ? (now.isSameOrAfter(validDateN, compare) && now.isSameOrBefore((validDateT || validDate), compare)
        ? 'text-success'
        : (now.isBefore(validDateN, compare) ? 'text-info' : 'text-danger'))
      : ''
    break
  }

  text = text && text.format(showTime
    ? 'YYYY-MM-DD HH:mm'
    : 'YYYY-MM-DD')
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
