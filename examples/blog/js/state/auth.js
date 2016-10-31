import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import DataTableState from 'react-mobx-admin/state/data_table'

export default class AuthStore extends DataTableState {

  @observable loggedUser = null

  @action
  showLogin() {
    this.currentView = {
      name: 'login'
    }
  }

  @action performLogin(credentials) {
    let self = this
    this.incRecCount()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        self.loggedUser = {
          uname: credentials.uname,
          name: 'gandalf the gray'
        }
        this.decRecCount()
        resolve(toJS(self.loggedUser))
      }, Math.random() * 2000 + 1000)
    })
  }

}
