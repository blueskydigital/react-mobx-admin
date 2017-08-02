import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox'

const MUIBoolField = ({ attr, val, ...rest }) => {
  const checked = Boolean(val)
  return (
    <Checkbox name={attr} disabled={true} checked={checked} {...rest} />
  )
}
MUIBoolField.propTypes = {
  attr: PropTypes.string.isRequired,
  val: PropTypes.any
}
export default MUIBoolField
