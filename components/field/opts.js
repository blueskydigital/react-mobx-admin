import React from 'react'
import FieldBase from './base'

export default class OptionsField extends FieldBase {

  static propTypes = {
    attr: React.PropTypes.any.isRequired,
    record: React.PropTypes.object.isRequired,
    optionsrecord: React.PropTypes.object.isRequired,
    optionsattr: React.PropTypes.string,
    labelattr: React.PropTypes.string,
    valueattr: React.PropTypes.string,
    onTouchTap: React.PropTypes.func
  }

  renderComponent(label, val) {
    return (<span>{label}</span>)
  }

  renderVal(record, attr) {
    const { optionsrecord, optionsattr, labelattr, valueattr } = this.props
    const val = record[attr]
    const options = optionsrecord.get(optionsattr || attr)
    const found = options && options.filter((i) => {
      return i[valueattr || 'value'] === val
    })
    return (found && found.length > 0) &&
      this.renderComponent(found[0][labelattr || 'label'], val)
  }

}
