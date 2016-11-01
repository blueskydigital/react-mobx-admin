import { observable, action, computed } from 'mobx'

export default class BaseState {

  constructor(requester, viewInfo) {
    this.requester = requester
    this.viewInfo = viewInfo
  }

  @observable currentView = null

  initView(name, data) {
    const viewInfo = this.viewInfo[name] || {}
    data.name = name
    this.currentView = Object.assign(data, viewInfo)
    viewInfo.onInit && viewInfo.onInit(this)  // call onInit if present
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
