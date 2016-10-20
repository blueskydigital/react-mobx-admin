import FieldBase from './base'

export default class TextField extends FieldBase {

  getVal(record, attr) {
    return record[attr]
  }

}
