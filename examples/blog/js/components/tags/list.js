import React from 'react'
import { observer } from 'mobx-react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'react-mobx-admin/components/mui/field/text'
import BoolField from 'react-mobx-admin/components/mui/field/bool'
import ListView from 'react-mobx-admin/components/mui/view/list'


const TagListView = ({state}) => {

  const batchActions = () => {
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected tags?`)) {
        state.deleteSelected(state.currentView)
      }
    }
    return (
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
        <MenuItem primaryText="delete" leftIcon={<DeleteIcon />} onClick={() => _batchDelete()}/>
      </IconMenu>
    )
  }

  const fields = [
    (attr, row) => (<TextField attr={attr} record={row} />),
    (attr, row) => {
      return <TextField attr={attr} record={row} onTouchTap={() => state.currentView.detailClicked(row)} />
    },
    (attr, row) => (<BoolField attr={attr} record={row} />)
  ]

  return (
    <ListView state={state} fields={fields}
      batchActions={batchActions} onAddClicked={state.currentView.addClicked} />

  )

}

export default observer(TagListView)
