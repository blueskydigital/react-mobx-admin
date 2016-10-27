import React from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'


@observer
class MarkdownInput extends React.Component {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    mdrender: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,
    validators: React.PropTypes.array
  }

  handleChange(event) {
    const { attr, validators } = this.props
    this.props.onChange(attr, event.target.value, validators)
  }

  render() {
    const { attr, label, record, errors, mdrender } = this.props
    const errorText = errors ? errors.get(attr) : undefined
    const value = record.get(attr)
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <TextField name={attr} floatingLabelText={label}
            value={value || ''} onChange={this.handleChange.bind(this)}
            errorText={errorText} fullWidth={true} multiLine={true} />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          {value && <div dangerouslySetInnerHTML={{__html: mdrender(value)}} />}
        </div>
      </div>
    )
  }
}
export default MarkdownInput
