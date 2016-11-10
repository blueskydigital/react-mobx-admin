
export default class MockRequester {

  data = null

  getEntries(entityName, params) {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }

  getEntry(entityName, id, options={}) {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }

  deleteEntry(entityName, id) {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }

  saveEntry(entityName, data, id=null) {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }

  call(url, method = 'get', data) {   // call our API
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }

  callExternalRes(conf) {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }
}
