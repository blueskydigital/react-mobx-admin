import {observable, computed, action, transaction, asMap} from 'mobx'

export default class DataManipState {

  initEntityView(entityname, id, cfg) {
    transaction(() => {
      cfg.init && cfg.init(this)
      this.cv = observable(Object.assign(cfg.view, {
        type: 'entity_detail',
        entityname: entityname,
        originEntityId: id,
        entity: asMap({}),
        errors: asMap({}),
        loading: true
      }))
    })
    this.cv.onSave = cfg.onSave
    if(id) {  // load for edit existing
      return this._loadEditData(entityname, id)
    } else {  // create
      return this._loadCreateData(entityname, cfg.initNew)
    }
  }

  _loadEditData(entityname, id) {
    return this.requester.getEntry(entityname, id).then((data) => {
      this.cv.entity && this.cv.entity.merge(data)
      this.cv.loading = false
      this._runValidators()
      return this.cv.entity
    })
  }

  _loadCreateData(entityname, initNew) {
    let p = new Promise((resolve, reject) => {
      this.cv.entity.clear()
      resolve(this.cv.entity)
    })
    p = initNew !== undefined ? p.then(initNew) : p
    p.then((entity) => {
      this._runValidators()
      this.cv.loading = false
    })
    return p
  }

  _runValidators() {
    for (let fieldName in this.cv.validators) {
      const value = (fieldName === '_global') ? this.cv.entity : this.cv.entity.get(fieldName)
      const fieldValidators = this.cv.validators[fieldName]
      fieldValidators && this._validateField(fieldName, value, fieldValidators)
    }
  }

  _validateField(fieldName, value, validatorFn) {
    const error = validatorFn(value)
    if(error === undefined && this.cv.errors.has(fieldName)) {
      this.cv.errors.delete(fieldName)
    } else if (error !== undefined) {
      this.cv.errors.set(fieldName, error)
    }
  }

  @action
  saveEntity(onReturn2list = null) {
    const cv = this.cv
    let p = this.requester.saveEntry(cv.entityname, cv.entity, cv.originEntityId)
    .then((saved) => {
      cv.entity.clear()
      cv.entity.merge(saved)
      cv.originEntityId = saved.id
      return cv.entity
    })
    p = cv.onSave ? p.then(cv.onSave) : p
    p = onReturn2list ? p.then(onReturn2list) : p
    return p.catch(this.onError.bind(this))
  }

  // called on each update of edit form. Validation performed if got some validators
  @action
  updateData(fieldName, value, validators) {
    transaction(() => {
      this.cv.entity.set(fieldName, value)
      const v = this.cv.validators
      if(v && v[fieldName]) {
        this._validateField(fieldName, value, v[fieldName])
      }
      // run global validators
      v && v['_global'] && this._validateField('_global', this.cv.entity, v['_global'])
    })
  }

  onReturn2list() {
    this.router.goTo(this.views.entity_list, {
      entityname: this.router.params.entityname
    }, this, this.listQParamsBackup || {_page: 1})
  }

}
