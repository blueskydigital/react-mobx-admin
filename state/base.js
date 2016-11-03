import { observable, action, computed, asMap } from 'mobx'

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

  @observable messages = asMap({})

  @action addMessage(text, type, timeout = 0) {
    const message = {text, type, timeout}
    this.messages.set(text, message)
    if(timeout > 0) {
      function _remove() {
        this.messages.delete(text)
      }
      setTimeout(_remove.bind(this), timeout)
    }
    return message
  }

  @action removeMessage(message) {
    this.messages.delete(message.text)
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
      } else {
        this.onRequesterError ? this.onRequesterError(err) :
          console.log && console.log(JSON.stringify(err))
      }
    })
  }

}
