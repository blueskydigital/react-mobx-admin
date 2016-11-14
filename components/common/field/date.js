import React from 'react'
import FieldBase from './base'

export default class TextField extends FieldBase {

  renderVal(record, attr) {
    const d = record[attr] instanceof Date ? d : new Date(record[attr])
    return this.renderComponent(d.toLocaleDateString())
  }

}
