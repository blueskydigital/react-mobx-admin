import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import TranslatStore from './transl'

export default class OptionsStore extends TranslatStore {

  // one of possible options loading ...
  @observable options = asMap({
    'categories': [
      {value: 'tech', label: 'Technology'},
      {value: 'art', label: 'Art'},
    ]
  })

  @action loadOptions(name, query) {
    return this.callRequester(() => {
      return this.requester.call(query).then((result) => {
        this.options.set(name, result.data)
      })
    })
  }

}
