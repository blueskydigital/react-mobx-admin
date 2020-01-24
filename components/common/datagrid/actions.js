import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

const DatagridActions = ({ actions, state, overlay }) => {
  let actionsElement = (state.selection.length > 0)
    ? actions(state)
    : React.cloneElement(actions(state), {
      open: false, // closed dropdown if items not selected
      onClick: () => {},
      style: { opacity: .65, cursor: 'not-allowed' }
    })
  return overlay && typeof overlay === 'function' ? overlay(actionsElement) : actionsElement
}

DatagridActions.propTypes = {
  actions: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
}

export default observer(DatagridActions)
