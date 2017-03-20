import React from 'react'


export default class EditFormBase extends React.Component {

  _save() {
    const savePromise = this.props.state.saveData()
    const cv = this.props.state.currentView
    cv.onSaved && savePromise.then(cv.onSaved())
    return savePromise
  }

  onSave(e) {
    e.preventDefault()
    this._save()
  }

  updateField(name, value) {
    this.props.state.updateData(name, value)
  }

  onSaveAndReturn2list(e) {
    e.preventDefault()
    this._save().then(() => {
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
