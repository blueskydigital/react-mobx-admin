import {observable, computed, action, transaction, asMap, toJS} from 'mobx'
import deepEqual from 'deep-equal'

export default class DataManipState {

  initEntityView(entityname, id, cfg) {
    transaction(() => {
      cfg.init && cfg.init(this, id, entityname)
      this.cv = observable(Object.assign(cfg.view, {
        type: 'entity_detail',
        entityname: entityname,
        origRecordId: id,
        record: asMap({}),
        errors: asMap({}),
        loading: true
      }))
    })
    this.cv.onSave = cfg.onSave
    this.cv.onLoaded = cfg.onLoaded
    let p = (id) ?
      this._loadEditData(entityname, id, cfg.onLoaded) :  // load for edit existing
      this._loadCreateData(entityname, cfg.prepareNew)  // create
    return p.then((record) => {
      try {
        this.cv.origRecord = JSON.parse(JSON.stringify(record))  // deep clone :)
      } catch(e) {
        throw new Error('maybe you have forgotten to return record from onLoaded?')
      }
      this._runValidators()
      this.cv.loading = false
    })
  }

  _loadEditData(entityname, id, onLoaded) {
    const p = this.requester.getEntry(entityname, id).then((data) => {
      this.cv.record && this.cv.record.merge(data)
      return this.cv.record
    })
    return onLoaded !== undefined ? p.then(onLoaded) : p
  }

  _loadCreateData(entityname, prepareNew) {
    const p = new Promise((resolve, reject) => {
      this.cv.record.clear()
      resolve(this.cv.record)
    })
    return prepareNew !== undefined ? p.then(prepareNew) : p
  }

  _runValidators(state, opts) {
    state = state ? state : this.cv
    for (let fieldName in state.validators) {
      const value = (fieldName === '_global') ? state.record : state.record.get(fieldName)
      this._validateField(fieldName, value, state, opts)
    }
  }

  _validateField(fieldName, value, state, opts) {
    state = state ? state : this.cv
    if (state.validators && state.validators[fieldName]) {
      const validatorFn = state.validators[fieldName]

      function runValidatorsArray (validatorArray) {
        let validatorFn, error, i
        for (i = 0; i < validatorArray.length; i++) {
          validatorFn = validatorArray[i]
          error = validatorFn(value, state.errors, opts)
          if (error !== undefined) {
            return error
          }
        }
      }
      const error = validatorFn.call === undefined
        ? runValidatorsArray(validatorFn)
        : validatorFn(value, state.errors, opts)
      if(error === undefined && state.errors.has(fieldName)) {
        state.errors.delete(fieldName)
      } else if (error !== undefined) {
        state.errors.set(fieldName, error)
      }
    }
  }

  runGlobalValidator(state, opts) {
    state = state ? state : this.cv
    this._validateField('_global', state.record, state, opts)
  }

  @computed get isEntityChanged() {
    const record = toJS(this.cv.record)
    return ! deepEqual(this.cv.origRecord, record, {strict: true})
  }

  @action
  saveEntity(onReturn2list = null) {
    const cv = this.cv
    let p = this.requester.saveEntry(cv.entityname, cv.record, cv.origRecordId)
    .then((saved) => {
      cv.origRecord = JSON.parse(JSON.stringify(saved)) // update origRecord coz saved
      transaction(() => {
        cv.record.clear()
        cv.record.merge(saved)
        const id = saved[cv.pkName || 'id']
        if (! cv.origRecordId) {
          // if new is saved, we need to:
          this.cv.onLoaded && this.cv.onLoaded(cv.record) //  run onLoaded
          this.router.params.id = id  // change param from _new to id
        }
        cv.origRecordId = id
      })
      return cv.record
    })
    p = cv.onSave ? p.then(cv.onSave) : p
    p = onReturn2list ? p.then(onReturn2list) : p
    return p
  }

  // called on each update of edit form. Validation performed if got some validators
  @action
  updateData(state, fieldName, value) {
    state = state ? state : this.cv
    transaction(() => {
      state.record.set(fieldName, value)
      this._validateField(fieldName, value, state)
      this._validateField('_global', state.record, state)
      // run listeners
      state.onFieldChange && state.onFieldChange[fieldName] &&
        state.onFieldChange[fieldName](value, state)
    })
  }

  onReturn2list() {
    this.router.goTo(this.views.entity_list, {
      entityname: this.router.params.entityname
    }, this, this.listQParamsBackup || {_page: 1})
  }

}
