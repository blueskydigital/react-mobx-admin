import {observable, computed, toJS, action, transaction} from 'mobx'
import DataTableState from 'react-mobx-admin/state/data_table'
import enTtransl from './i18n/en'
import csTtransl from './i18n/cs'

export default class StateStore extends DataTableState {

  @observable loggedUser = null
  @observable i18n = enTtransl

  transl(str) {
    return this.i18n[str] || `UNTRANSL${str}`
  }

  @action
  changeLang() {
    this.i18n = csTtransl
  }

  @action
  login(credentials) {
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
