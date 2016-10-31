import React from 'react'


export default class EditFormBase extends React.Component {

  onUpdated() {
    alert('Changes successfully saved.')
  }

  onSave(e) {
    e.preventDefault()
    const formLevelValidators = this.props.validators
    this.props.state.saveData(formLevelValidators).then(this.onUpdated.bind(this))
  }

  updateField(name, value, validators) {
    this.props.state.updateData(name, value, validators)
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
