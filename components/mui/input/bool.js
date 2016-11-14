import React from 'react'
import { observer } from 'mobx-react'
import Checkbox from 'material-ui/Checkbox'

@observer
class MUIBoolInput extends React.Component {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  }

  handleChange = (event, isInputChecked) => {
    this.props.onChange(this.props.attr, isInputChecked)
  }

  render() {
    const { attr, label, record } = this.props
    const checked = Boolean(record.get(attr))
    return (
      <Checkbox name={attr} label={label} checked={checked}
        onCheck={this.handleChange} labelPosition="left"/>
    )
  }
}

export default MUIBoolInput
