import React from 'react'
import { observer } from 'mobx-react'

@observer
class DatagridActions extends React.Component {

  static propTypes = {
    actions: React.PropTypes.func.isRequired,
    state: React.PropTypes.object.isRequired
  }

  render() {
    const { state, actions } = this.props

    if(state.selection.length > 0) {
      return actions()
    } else {
      return null
    }
  }

}

export default DatagridActions
