import {extendObservable, computed, action, transaction, asMap} from 'mobx'

export default class DataManipState {

  initEntity(view, entityName, id) {
    this.previousView = view  // backup for go back

    extendObservable(view, {
      entityName: entityName,
      originEntityId: id,
      entity: asMap({}),
      errors: asMap({}),
      entity_loading: false
    })
    if(id) {  // load for edit existing
      return this._loadEditData(view, entityName, id)
    } else {  // create
      return new Promise((resolve, reject) => {
        this._loadCreateData(view, entityName)
        resolve(view.entity)
      })
    }
  }

  _loadEditData(view, entityName, id) {
    view.entity_loading = true

    return this.requester.getEntry(entityName, id).then((data) => {
      view.entity && view.entity.merge(data)
      view.entity_loading = false
      return view.entity
    })
  }

  _loadCreateData(view, fields) {
    view.entity.clear()
  }

  _validateField(fieldName, value, validators) {
    let errors = []
    validators.map((v) => {
      if(v.fn(value) === true) {
        errors.push(v.message)
      }
    })
    if(errors.length === 0 && this.currentView.errors.has(fieldName)) {
      this.currentView.errors.delete(fieldName)
    } else if (errors.length > 0) {
      this.currentView.errors.set(fieldName, errors)
    }
  }

  // called on each update of edit form. Validation performed if got some validators
  @action
  updateData(fieldName, value, validators) {
    transaction(() => {
      this.currentView.entity.set(fieldName, value)
      if(this.currentView.validators && this.currentView.validators[fieldName]) {
        this._validateField(fieldName, value, this.currentView.validators[fieldName])
      }
    })
  }

  @action
  saveData() {
    const id = this.currentView.originEntityId
    return this.requester.saveEntry(this.currentView.entityName, this.currentView.entity, id)
  }

  return2List(view) {
    if(view.onReturn2list) {
      view.onReturn2list()
    }
  }

}
