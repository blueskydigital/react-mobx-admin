import DataRequester from 'react-mobx-admin/services/requester'
import { convertQuery, getTotalItems } from './api_flavor'

export default class BlogAppRequester extends DataRequester {

  constructor(on401, onError) {
    super(convertQuery, getTotalItems, on401, onError, Conf.apiUrl)
  }

  // maybe more methods? :)

}
