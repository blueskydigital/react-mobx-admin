import React from 'react'

export default class FieldBase extends React.Component {

  handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row ot da table this field is on ...
    this.props.onTouchTap()
  }

  render() {
    const { attr, record, onTouchTap } = this.props
    let val = this.renderVal(record, attr)
    return val && (onTouchTap ?
      (<a href="#" onTouchTap={this.handleTouchTap.bind(this)}>{val}</a>) : val)
  }

}
