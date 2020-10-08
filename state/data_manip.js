import { observable, computed, action, toJS } from 'mobx'
import deepEqual from 'deep-equal'

export default class DataManipState {
  @observable entityname = null
  @observable origRecordId = null
  @observable record = new Map()
  @observable errors = new Map()
  @observable saveErrors = []
  @observable state = 'loading'

  pkName = 'id'

  constructor (entityname, id, saveEntry) {
    if (this.prepareNew === undefined) {
      throw new Error('implement prepareNew method!')
    }
    this.saveEntry = saveEntry
    this.entityname = entityname
    this.origRecordId = id
  }

  _onPrepared () {
    this.origRecord = toJS(this.record)
    this._runValidators()
    this.state = 'ready'
  }

  init () {
    if (this.origRecordId === null) {
      const promise = this.prepareNew()
      if (!promise) {
        this._onPrepared()
      } else {
        promise.then(this._onPrepared.bind(this))
      }
    }
  }

  @action onLoaded (record) {
    this.origRecord = JSON.parse(JSON.stringify(record)) // deep clone :)
    this.record.merge(record)
    this._runValidators()
    this.state = 'ready'
  }

  _runValidators (opts) {
    for (const fieldName in this.validators) {
      const value = (fieldName === '_global') ? this.record : this.record.get(fieldName)
      this._validateField(fieldName, value, opts)
    }
  }

  _validateField (fieldName, value, opts) {
    if (this.validators && this.validators[fieldName]) {
      const validatorFn = this.validators[fieldName]
      const runValidatorsArray = (validatorArray) => {
        const errors = []
        validatorArray.map(validatorFn => {
          const error = validatorFn.bind(this)(value, this.errors, opts)
          if (error !== undefined) {
            errors.push(error)
          }
        })
        return errors.length > 0 ? errors : undefined
      }
      const error = validatorFn.call === undefined
        ? runValidatorsArray.bind(this)(validatorFn)
        : validatorFn.bind(this)(value, this.errors, opts)
      if (error === undefined && this.errors.has(fieldName)) {
        this.errors.delete(fieldName)
      } else if (error !== undefined) {
        this.errors.set(fieldName, error)
      }
    }
  }

  runGlobalValidator (opts) {
    this._validateField('_global', this.record, opts)
  }

  @computed get isEntityChanged () {
    const record = toJS(this.record)
    return !deepEqual(this.origRecord, record, { strict: true })
  }

  @action beforeSave (record) {
    // set updated_at because of save same date to the origRecord
    record.updated_at = new Date()

    this.origRecord = JSON.parse(JSON.stringify(record))
    this.record.merge(this.origRecord)
    this._runValidators()
  }

  @action save () {
    this.state = 'saving'
    return Promise.resolve(this.beforeSave.bind(this)).then(() => {
      if (this.errors.size) {
        this.state = 'ready'
        return this.onError('Validation errors') // show validation error message
      }
      return this.saveEntry(this.entityname, this.record, this.origRecordId)
        .then(this.onSaved.bind(this))
        .catch(() => this.state = 'ready') // this.onError.bind(this) did not work properly
      // error is handled from saveEntry error handler
      // in catch we just need to edit state so that page does not hang on "loading" state
    })
  }

  @action onSaved (saved) {
    this.origRecord = JSON.parse(JSON.stringify(saved)) // update origRecord coz saved
    this.record.clear()
    this.record.merge(saved)
    this.state = 'ready'
    if (!this.origRecordId) {
      const id = saved[this.pkName]
      this.origRecordId = id
      // if new is saved, we need to:
      this.onLoaded(saved) //  run onLoaded
    }
    return this.record
  }

  @action onError (err) {
    this.state = 'ready'
    this.saveErrors = [err]
  }

  // called on each update of edit form. Validation performed if got some validators
  @action
  updateData (fieldName, value) {
    value = value === '' ? null : value
    this.record.set(fieldName, value)
    this._validateField(fieldName, value)
    this._validateField('_global', this.record)
    // run listeners
    this.onFieldChange && this.onFieldChange[fieldName] &&
      this.onFieldChange[fieldName](value)
  }
}
