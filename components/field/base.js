import React from 'react'

export default class FieldBase extends React.Component {

  static propTypes = {
    attr: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    maxlen: React.PropTypes.number,
    onTouchTap: React.PropTypes.func
  }

  handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onTouchTap()
  }

  render() {
    const { attr, record, maxlen, onTouchTap } = this.props
    let val = this.getVal(record, attr)
    val = (maxlen && typeof val === 'string' && val.length > maxlen) ? (val.substring(0, maxlen) + ' ...') : val
    return onTouchTap ? (<a href="#" onTouchTap={this.handleTouchTap.bind(this)}>{val}</a>) : (<span>{val}</span>)
  }

}
