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
    if(id === '_new') {
      return new Promise((resolve, reject) => {
        this._loadCreateData(entityName)
        resolve(view.entity)
      })
    } else {
      return this._loadEditData(entityName, id)
    }
  }

  _loadEditData(entityName, id) {
    this.currentView.entity_loading = true

    return this.requester.getEntry(entityName, id).then((data) => {
      this.currentView.entity && this.currentView.entity.merge(data)
      this.currentView.entity_loading = false
      // call handler if exists. TODO: Subject to change
      this.onEntityLoaded && this.onEntityLoaded(this.currentView.entity)
    })
  }

  _loadCreateData(fields) {
    this.currentView.entity.clear()
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
