import React from 'react'
import { browserHistory } from 'react-router'

export default class EditView extends React.Component {

  _getId() {
    const id = this.props.routeParams.id
    return (id && id[0] === '_') ? undefined : id
  }

  componentDidMount() {
    const id = this._getId()
    if(id === undefined) {
      this.props.state.loadCreateData(this.props.fields)
    } else {
      this.props.state.loadEditData(this.props.entityName, id)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.state.loadEditData(nextProps.params.entity, nextProps.params.id)
    }
  }

  save() {
    return this.props.state.saveData(this.props.entityName)
  }

  return2List() {
    browserHistory.push(`/${this.props.entityName}/`)
  }

}
