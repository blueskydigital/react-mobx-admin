import React from 'react'
import { browserHistory } from 'react-router'

export default class FieldBase extends React.Component {

  static propTypes = {
      attr: React.PropTypes.string.isRequired,
      record: React.PropTypes.object.isRequired,
      maxlen: React.PropTypes.number,
      to: React.PropTypes.string
  }

  handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation()
    browserHistory.push(this.props.to)
  }

  render() {
    const { attr, record, maxlen, to } = this.props
    let val = this.getVal(record, attr)
    val = (maxlen && typeof val === 'string' && val.length > maxlen) ? (val.substring(0, maxlen) + ' ...') : val
    return to ? (<a href="#" onTouchTap={this.handleTouchTap.bind(this)}>{val}</a>) : (<span>{val}</span>)
  }

}
