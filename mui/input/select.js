import React from 'react'
import { observer } from 'mobx-react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


@observer
class SelectInput extends React.Component {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    labelattr: React.PropTypes.string,
    valattr: React.PropTypes.string,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    optionsrecord: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object,
    validators: React.PropTypes.array
  }

  handleChange(event, index, value) {
    const { attr, validators } = this.props
    this.props.onChange(attr, value, validators)
  }

  renderOptions(options, labelattr, valattr) {
    let opts = []
    let idx, val, c
    for(idx = 0; idx < options.length; idx++) {
      val = options[idx]
      c = <MenuItem key={idx} value={val[valattr]} primaryText={val[labelattr]} />
      opts.push(c)
    }
    return opts
  }

  render() {
    const { attr, labelattr, valattr, label, record, optionsrecord, errors } = this.props
    const errorText = errors ? errors.get(attr) : undefined
    const value = record.get(attr)
    const options = optionsrecord.get(attr)
    const renderedOpts = options && options.length &&
      this.renderOptions(options, labelattr || 'label', valattr || 'value')
    return (
      <SelectField value={value} onChange={this.handleChange.bind(this)}
          floatingLabelText={label} fullWidth={true} errorText={errorText}>
        {renderedOpts}
      </SelectField>
    )
  }
}

export default SelectInput