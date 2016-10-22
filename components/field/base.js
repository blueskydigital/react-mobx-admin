import React from 'react'

export default class FieldBase extends React.Component {

  handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onTouchTap()
  }

  render() {
    const { attr, record, onTouchTap } = this.props
    let val = this.getVal(record, attr)
    return onTouchTap ?
      (<a href="#" onTouchTap={this.handleTouchTap.bind(this)}>{val}</a>) :
      (<span>{val}</span>)
  }

}
