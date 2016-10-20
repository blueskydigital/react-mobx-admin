import FieldBase from './base'

export default class TextField extends FieldBase {

  getVal(record, attr) {
    const d = record[attr] instanceof Date ? d : new Date(record[attr])
    return d.toLocaleDateString()
  }

}
