import React from 'react'


export default class EditFormBase extends React.Component {

  updateField(name, value, validators) {
    this.props.state.updateData(name, value, validators)
  }

  onUpdated() {
    alert('Changes successfully saved.')
  }

  onSave(e) {
    e.preventDefault()
    const formLevelValidators = this.props.validators
    this.props.saveData(formLevelValidators).then(this.onUpdated.bind(this))
  }

  onSaveAndReturn2list(e) {
    e.preventDefault()
    this.props.saveData().then(this.onUpdated.bind(this))
    .then(() => {
      this.props.return2List()
    })
  }

  onCancel(e) {
    e.preventDefault()
    this.props.return2List()
  }

  static propTypes = {
    state: React.PropTypes.object.isRequired,
    saveData: React.PropTypes.func.isRequired,
    return2List: React.PropTypes.func.isRequired,
    validators: React.PropTypes.array
  }

}
