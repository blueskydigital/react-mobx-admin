import { observable, computed, toJS, action, transaction } from 'mobx'
import TranslatStore from './transl'

export default class OptionsStore extends TranslatStore {

  // one of possible options loading ...
  @observable options = observable.map({
    'categories': [
      {value: 'tech', label: 'Technology'},
      {value: 'art', label: 'Art'},
    ]
  })

  @action loadOptions(name, query) {
    return this.requester.call(query).then((result) => {
      this.options.set(name, result.data)
    }).catch(this.onError.bind(this))
  }

}
