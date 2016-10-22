import React from 'react'
import FieldBase from './base'

export default class OptionsField extends FieldBase {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    optionsrecord: React.PropTypes.object.isRequired,
    labelattr: React.PropTypes.string,
    valueattr: React.PropTypes.string,
    onTouchTap: React.PropTypes.func
  }

  getVal(record, attr) {
    const { optionsrecord, labelattr, valueattr } = this.props
    const val = record[attr]
    const options = optionsrecord.get(attr)
    const found = options.filter((i) => {
      return i[valueattr || 'value'] === val
    })
    return found.length > 0 && found[0][labelattr || 'label']
  }

}
