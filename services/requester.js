import axios from 'axios'

class DataRequester {

  constructor(convertQuery, getTotalItems, apiUrl) {
    this.apiUrl = apiUrl
    this.convertQuery = convertQuery
    this.getTotalItems = getTotalItems
  }

  setDefaultHeaders(defHeaders) {
    let key
    for(key in defHeaders) {
      axios.defaults.headers.common[key] = defHeaders[key]
    }
  }

  getEntries(entityName, params) {

    let qParams = this.convertQuery(params)

    return axios.get(`${this.apiUrl}/${entityName}`, {params: qParams}).then((response) => {
      return {
        data: response.data,
        totalItems: this.getTotalItems(response)
      }
    })

  }

  getEntry(entityName, id, options={}) {

    return axios.get(`${this.apiUrl}/${entityName}/${id}`)

  }

  saveEntry(entityName, data, id=null) {
    let query

    if (id) {
      query = axios.put(`${this.apiUrl}/${entityName}/${id}`, data)
    } else {
      query = axios.post(`${this.apiUrl}/${entityName}`, data)
    }

    return query.then((response) => {
      return response.data
    })
  }
}

export default DataRequester
