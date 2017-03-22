import React from 'react'


export default class EditFormBase extends React.Component {

  onSave(e) {
    e.preventDefault()
    this.props.state.currentView.onSaved()
  }

  updateField(name, value) {
    this.props.state.updateData(name, value)
  }

  onSaveAndReturn2list(e) {
    e.preventDefault()
    this.props.state.currentView.onSaved().then(() => {
      this._return2List()
    })
  }

  _return2List() {
    const cv = this.props.state.currentView
    cv.onReturn2list && cv.onReturn2list()
  }

  onCancel(e) {
    e.preventDefault()
    this._return2List()
  }

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

}
