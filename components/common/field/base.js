import React from 'react'

export default class FieldBase extends React.Component {

  handleTouchTap(e) {
    e.preventDefault()
    e.stopPropagation() // prevent selecting row ot da table this field is on ...
    const clickHandler = this.props.onTouchTap || this.props.onClick
    clickHandler()
  }

  renderComponent(label, val) {
    return (<span>{label}</span>)
  }

  render() {
    const { attr, record, onTouchTap, onClick } = this.props
    let val = this.renderVal(record, attr)
    const clickHandler = onTouchTap || onClick
    return val && (clickHandler ?
      (<a href="#" onTouchTap={this.handleTouchTap.bind(this)}>{val}</a>) : val)
  }

}
