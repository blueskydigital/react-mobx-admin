import { observable, action, computed } from 'mobx'

export default class BaseState {

  constructor(requester, viewInitializers) {
    this.requester = requester
    this.viewInitializers = viewInitializers
  }

  @observable currentView = null

  initView(name, data = {}) {
    const defaults = this.viewInitializers[name] ? this.viewInitializers[name](this) : {}
    for(let i in data) {
      if(data[i] !== undefined) {
        defaults[i] = data[i]
      }
    }
    defaults.name = name
    this.currentView = defaults
  }

  @observable req = {count: 0}

  @computed get loading() {
    return this.req.count > 0
  }

  @computed get cv() {
    return this.currentView
  }

  @action
  incRecCount() {
    this.req.count++
  }

  @action
  decRecCount() {
    this.req.count--
  }

  callRequester(fn) {
    this.req.count++
    return fn()
    .then(() => {
      this.req.count--
    })
    .catch((err) => {
      this.req.count--
      if(err.response && err.response.status === 401) {
        this.on401(err)
      } else if (err.response) {
        this.onApiErr(err)
      } else {
        throw err
      }
    })
  }

}
