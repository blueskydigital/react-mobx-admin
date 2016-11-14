import React from 'react'
import Checkbox from 'material-ui/Checkbox'

class MUIBoolField extends React.Component {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired
  }

  render() {
    const { attr, record } = this.props
    const checked = Boolean(record[attr])
    return (
      <Checkbox name={attr} disabled={true} checked={checked} />
    )
  }
}

export default MUIBoolField
