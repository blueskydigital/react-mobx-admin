import {observable, computed, action, transaction, asMap} from 'mobx'
import BaseState from './base'

export default class DataManipState extends BaseState {

  @observable originEntityId = null
  @observable entityName = null
  @observable entity = asMap({})
  @observable errors = asMap({})

  @action
  showEntityDetail(entityName, id) {
    this.currentView = {
      name: entityName + '_detail'
    }
    if(id === undefined) {
      this.loadCreateData(this.props.fields)
    } else {
      this.loadEditData(entityName, id)
    }
  }

  loadEditData(entityName, id, sortField, sortDir) {
    this.originEntityId = id
    this.entityName = entityName

    return this.callRequester(() => {
      return this.requester.getEntry(entityName, id).then((result) => {
        transaction(() => {
          this.entity.clear()
          this.entity.merge(result.data)
        })
      })
    })
  }

  loadCreateData(fields) {
    transaction(() => {
      this.originEntityId = null
      this.entity.clear()
      for (let name in fields) {
        this.entity[name] = fields[name].defaultVal
      }
    })
  }

  _validateField(fieldName, value, validators) {
    let errors = []
    validators.forEach((v) => {
      if(v.fn(value) === true) {
        errors.push(v.message)
      }
    })
    if(errors.length === 0 && this.errors.has(fieldName)) {
      this.errors.delete(fieldName)
    } else if (errors.length > 0) {
      this.errors.set(fieldName, errors)
    }
  }

  // called on each update of edit form. Validation performed if got some validators
  @action
  updateData(fieldName, value, validators) {
    transaction(() => {
      this.entity.set(fieldName, value)
      if(validators) {
        this._validateField(fieldName, value, validators)
      }
    })
  }

  @action
  saveData() {
    const id = this.originEntityId

    return this.callRequester(() => {
      return this.requester.saveEntry(this.entityName, this.entity, id)
    })
  }

  @action return2List() {
    this.showEntityList(this.entityName, this.page)
  }

}
