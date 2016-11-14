import React from 'react'
import FieldBase from './base'

export default class TextField extends FieldBase {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    maxlen: React.PropTypes.number,
    onTouchTap: React.PropTypes.func
  }

  renderVal(record, attr) {
    const { maxlen } = this.props
    let val = record[attr]
    val = (maxlen && typeof val === 'string' && val.length > maxlen) ?
        (val.substring(0, maxlen) + ' ...') : val
    return this.renderComponent(val)
  }

}
