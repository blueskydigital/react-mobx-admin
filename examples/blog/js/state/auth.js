import { observable, computed, toJS, action, transaction } from 'mobx'
import BlogRequester from '../services'

export default class AuthStore {

  constructor(requester, initializers) {
    const stored = localStorage.getItem('gandalf_admin_user')
    try {
      this.loggedUser = stored ? JSON.parse(stored) : null
    } catch(e) {
      this.loggedUser = observable(null)
    }
    // create requester here because we need to provide on401 callback for it ..
    this.requester = new BlogRequester(this.on401.bind(this))
  }

  on401(err) {
    alert('we have to login!!')
  }

  onError(err) {
    if (err.status || err.config) {
      return this.addMessage(err.message || err, 'error', 2000)
    }
    throw err
  }

  @observable loggedUser = null

  @computed get userLogged() {
    return this.loggedUser !== null
  }

  @action
  showLogin() {
    this.router.cv = observable({
      uname: '',
      pwd: '',
      submitted: false
    })
  }

  @action
  logout() {
    this.loggedUser = null
    localStorage.removeItem('gandalf_admin_user')
  }

  @action performLogin() {
    this.router.cv.submitted = true
    let self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        self.loggedUser = {
          uname: self.router.cv.uname,
          name: 'gandalf the gray'
        }
        localStorage.setItem('gandalf_admin_user', JSON.stringify(self.loggedUser))
        resolve(toJS(self.loggedUser))
      }, Math.random() * 2000 + 1000)
    }).then((user) => {
      this.router.cv.submitted = false
      this.router.goTo(this.views.entity_list, {entityname: 'posts'}, this, {_page: 1})
    })
  }

}
