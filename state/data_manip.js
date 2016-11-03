import {observable, computed, action, transaction, asMap} from 'mobx'
import BaseState from './base'

export default class DataManipState extends BaseState {

  previousView = null

  @action
  showEntityDetail(entityName, id) {

    this.previousView = this.currentView  // backup

    this.initView(entityName + '_detail', {
      originEntityId: id,
      entityName: entityName,
      entity: asMap({}),
      errors: asMap({})
    })
    if(id === undefined) {
      this._loadCreateData(this.props.fields)
    } else {
      this._loadEditData(entityName, id)
    }
  }

  _loadEditData(entityName, id) {
    return this.callRequester(() => {
      return this.requester.getEntry(entityName, id).then((result) => {
        this.currentView.entity && this.currentView.entity.merge(result.data)
      })
    })
  }

  _loadCreateData(fields) {
    transaction(() => {
      this.currentView.entity.clear()
      for (let name in fields) {
        this.currentView.entity[name] = fields[name].defaultVal
      }
    })
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

    return this.callRequester(() => {
      return this.requester.saveEntry(this.currentView.entityName, this.currentView.entity, id)
    })
  }

  return2List() {
    if(this.previousView.entityName) {
      this.showEntityList(this.previousView.entityName, this.previousView.page)
    } else {
      this.showEntityList(this.currentView.entityName)
    }
  }

}
