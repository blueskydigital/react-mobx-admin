import {observable, computed, action} from 'mobx'
import deepEqual from 'deep-equal'

export default class DataManipStore {

  @observable record = new Map()
  @observable errors = new Map()
  @observable state = 'loading'

  pkName = 'id'

  loadEntry () { throw new Error('implement loadEntry!!') }
  saveEntry () { throw new Error('implement saveEntry!!') }

  initNew () {
    return this.onLoaded({}) // init empty
  }

  load (id) {
    return id
      ? this.loadEntry(id).then(this.onLoaded.bind(this))
      : this.initNew()
  }

  reload () {
    const id = this.record.get(this.pkName)
    return this.loadEntry(id).then(this.onLoaded.bind(this))
  }

  @action onLoaded (record) {
    this.origRecord = Object.assign({}, record)  // deep clone :)
    this.record.replace(record)
    this.runValidators()
    this.state = 'ready'
  }

  @action runValidators () {
    const validators = this.validators || []
    for (let fieldName in validators) {
      this.validateField(fieldName, this.record.get(fieldName))
    }
  }

  validateField (fieldName, value) {
    if (this.validators && this.validators[fieldName]) {
      const validatorFn = this.validators[fieldName].bind(this)
      const error = validatorFn(value, this.errors)
      if(!error && this.errors.has(fieldName)) {
        this.errors.delete(fieldName)
      } else if (error) {
        this.errors.set(fieldName, error)
      }
    }
  }

  @computed get isEntityChanged() {
    const record = this.record.toJS()
    return ! deepEqual(this.origRecord, record, {strict: true})
  }

  isSaveEnabled () {
    return this.errors.size === 0 && this.isEntityChanged
  }
  isBeingCreated () {
    return this.record.has(this.pkName)
  }

  @action save () {
    this.state = 'saving'
    return this.saveEntry(this.record.toJS())
    .then(this.onSaved.bind(this))
    .catch(this.onError.bind(this))
  }

  @action onSaved (saved) {
    this.origRecord = JSON.parse(JSON.stringify(saved)) // update origRecord coz saved
    this.record.clear()
    this.record.merge(saved)
    this.state = 'ready'
    // if (!this.origRecordId) {
    //   const id = saved[this.pkName]
    //   this.origRecordId = id
    //   // if new is saved, we need to:
    //   this.onLoaded(saved) //  run onLoaded
    // }
    return this.record
  }

  @action onError (err) {
    this.state = 'ready'
    this.processError(err)
  }

  processError (err) {
    alert(err)  // to be overriden, no one wants to alert some unreadables
  }

  // called on each update of edit form.
  // validation performed if got some validators
  @action updateData (fieldName, value) {
    value = value === '' ? null : value
    this.record.set(fieldName, value)
    this.runValidators()
    this.onFieldChange && this.onFieldChange(fieldName, value)
  }

}
