import React from 'react'
import FieldBase from './base'

export default class MultivalueField extends FieldBase {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    itemRenderer: React.PropTypes.func,
    onTouchTap: React.PropTypes.func
  }

  renderVal(record, attr) {
    const renderItem = (this.props.itemRenderer === undefined) ? function(i, idx) {
      return (<span className="tag" key={idx}>{i}</span>)
    } : this.props.itemRenderer
    let val = record[attr]
    return (
      <div>{val.map((i, idx) => renderItem(i, idx, val))}</div>
    )
  }

}
