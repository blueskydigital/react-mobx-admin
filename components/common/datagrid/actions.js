import React from 'react'
import { observer } from 'mobx-react'

const DatagridActions = ({actions, state}) => {

  return (state.currentView.selection.length > 0) ? actions(state) : null

}

DatagridActions.propTypes = {
  actions: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired
}

export default observer(DatagridActions)
