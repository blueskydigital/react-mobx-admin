import { observable, computed, toJS, action, transaction } from 'mobx'
import AuthStore from './auth'
import enTtransl from '../i18n/en'
import csTtransl from '../i18n/cs'

export default class TranslatStore extends AuthStore {

  @observable i18n = enTtransl

  transl(str) {
    return this.i18n[str] || `UNTRANSL${str}`
  }
  __(str) {
    return this.transl(str)
  }

  @action changeLang() {
    this.i18n = csTtransl
  }

}
