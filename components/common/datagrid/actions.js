import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import _ from 'lodash'

const DatagridActions = ({actions, state}) => {
  let found = _.includes(state.cv.selection.map(i => {
    return _.includes(_.map(state.cv.items, 'id'), i)
  }), true)

  return found ? actions(state) : null
}

DatagridActions.propTypes = {
  actions: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
}

export default observer(DatagridActions)
