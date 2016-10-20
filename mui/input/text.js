import React from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'

@observer
class TextInput extends React.Component {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,
    validators: React.PropTypes.array
  }

  handleChange = (event) => {
    const { attr, validators } = this.props
    this.props.onChange(attr, event.target.value, validators)
  }

  render() {
    const { attr, label, record, errors } = this.props
    const errorText = errors ? errors.get(attr) : undefined
    const value = record.get(attr)
    return (
      <TextField name={attr} floatingLabelText={label}
        value={value || ''} onChange={this.handleChange}
        errorText={errorText} fullWidth={true} />
    )
  }
}

export default TextInput
