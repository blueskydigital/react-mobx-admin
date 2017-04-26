import {extendObservable, computed, action, transaction, asMap} from 'mobx'

export default class DataManipState {

  initEntityView(view, entityName, id, newView, onReturn2list, onSaved, initNew) {
    if(! onReturn2list || ! onSaved) {
      throw 'onReturn2list and onSaved must be set'
    }
    const listViewBackup = Object.assign({}, view)
    transaction(() => {
      const atts = Object.assign(newView, {
        entityName: entityName,
        originEntityId: id,
        entity: asMap({}),
        errors: asMap({}),
        loading: false
      })
      extendObservable(view, atts)
    })
    view.listViewBackup = listViewBackup
    view.onReturn2list = onReturn2list
    view.onSaved = onSaved
    if(id) {  // load for edit existing
      return this._loadEditData(view, entityName, id)
    } else {  // create
      return this._loadCreateData(view, entityName, initNew)
    }
  }

  _loadEditData(view, entityName, id) {
    view.loading = true

    return this.requester.getEntry(entityName, id).then((data) => {
      view.entity && view.entity.merge(data)
      view.loading = false
      this._runValidators()
      return view.entity
    })
  }

  _loadCreateData(view, fields, initNew) {
    view.loading = true
    let p = new Promise((resolve, reject) => {
      view.entity.clear()
      resolve(view.entity)
    })
    p = initNew !== undefined ? p.then(initNew) : p
    p.then((entity) => {
      this._runValidators()
      view.loading = false
    })
    return p
  }

  _runValidators() {
    for (let fieldName in this.currentView.validators) {
      const value = (fieldName === '_global') ? this.currentView.entity : this.currentView.entity.get(fieldName)
      const fieldValidators = this.currentView.validators[fieldName]
      fieldValidators && this._validateField(fieldName, value, fieldValidators)
    }
  }

  _validateField(fieldName, value, validatorFn) {
    const error = validatorFn(value)
    if(error === undefined && this.currentView.errors.has(fieldName)) {
      this.currentView.errors.delete(fieldName)
    } else if (error !== undefined) {
      this.currentView.errors.set(fieldName, error)
    }
  }

  // called on each update of edit form. Validation performed if got some validators
  @action
  updateData(fieldName, value, validators) {
    transaction(() => {
      this.currentView.entity.set(fieldName, value)
      const v = this.currentView.validators
      if(v && v[fieldName]) {
        this._validateField(fieldName, value, v[fieldName])
      }
      // run global validators
      v && v['_global'] && this._validateField('_global', this.currentView.entity, v['_global'])
    })
  }

  @action
  saveData() {
    const id = this.currentView.originEntityId
    return this.requester.saveEntry(this.currentView.entityName, this.currentView.entity, id)
  }

}
