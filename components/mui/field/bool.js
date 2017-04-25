import React from 'react'
import Checkbox from 'material-ui/Checkbox'


const MUIBoolField = ({ attr, record, ...rest }) => {

  const checked = Boolean(record[attr])
  return (
    <Checkbox name={attr} disabled={true} checked={checked} {...rest} />
  )

}
MUIBoolField.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired
}
export default MUIBoolField
