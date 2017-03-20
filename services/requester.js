import axios from 'axios'

class DataRequester {

  constructor(convertQuery, getTotalItems, on401, onError, apiUrl) {
    this.apiUrl = apiUrl
    this.convertQuery = convertQuery
    this.getTotalItems = getTotalItems
    this.authHeaders = {}
    this.on401 = on401
    this.onError = onError
  }

  setDefaultHeaders(defHeaders) {
    for(let key in defHeaders) {
      axios.defaults.headers.common[key] = defHeaders[key]
    }
  }

  setAuth(headers) {
    this.authHeaders = headers
  }

  _defaultCatcher(err) {
    if(err.response && err.response.status === 401) {
      this.on401(err)
    } else {
      this.onError(err)
    }
  }

  getEntries(entityName, params) {

    let qParams = this.convertQuery(params)

    const req = axios({
      method: 'get',
      url: `${this.apiUrl}/${entityName}`,
      params: qParams,
      headers: this.authHeaders
    })

    return req.then((response) => {
      return {
        data: response.data,
        totalItems: this.getTotalItems(response)
      }
    }).catch(this._defaultCatcher.bind(this))

  }

  getEntry(entityName, id, options={}) {
    return axios({
      method: 'get',
      url: `${this.apiUrl}/${entityName}/${id}`,
      headers: this.authHeaders
    }).then((response) => {
      return response.data
    }).catch(this._defaultCatcher.bind(this))
  }

  deleteEntry(entityName, id) {
    return axios({
      method: 'delete',
      url: `${this.apiUrl}/${entityName}/${id}`,
      headers: this.authHeaders
    }).catch(this._defaultCatcher.bind(this))
  }

  saveEntry(entityName, data, id=null) {
    const conf = {
      headers: this.authHeaders,
      data: data
    }

    if (id) {
      conf.url = `${this.apiUrl}/${entityName}/${id}`
      conf.method = 'put'
    } else {
      conf.url = `${this.apiUrl}/${entityName}`
      conf.method = 'post'
    }
    return axios(conf).then((response) => {
      return response.data
    }).catch(this._defaultCatcher.bind(this))
  }

  call(url, method = 'get', data) {   // call our API
    return axios({
      method: method,
      url: `${this.apiUrl}${url}`,
      headers: this.authHeaders,
      data: data
    }).catch(this._defaultCatcher.bind(this))
  }

  callExternalRes(conf) {   // just to be able to call external API
    return axios(conf)
  }
}

export default DataRequester
