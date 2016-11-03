import React from 'react'


export default class EditFormBase extends React.Component {

  onSave(e) {
    e.preventDefault()
    const saveOp = this.props.state.saveData()
    this.onUpdated && saveOp.then(this.onUpdated.bind(this))
  }

  updateField(name, value) {
    this.props.state.updateData(name, value)
  }

  onSaveAndReturn2list(e) {
    e.preventDefault()
    this.props.state.saveData().then(this.onUpdated.bind(this))
    .then(() => {
      this.props.state.return2List()
    })
  }

  onCancel(e) {
    e.preventDefault()
    this.props.state.return2List()
  }

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

}
