import React from 'react'
import { observer } from 'mobx-react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import TextField from 'react-mobx-admin/components/common/field/text'
import DateField from 'react-mobx-admin/components/common/field/date'
import OptionsField from 'react-mobx-admin/components/common/field/opts'
import MultivalueField from 'react-mobx-admin/components/common/field/multivalue'
import MUIBoolField from 'react-mobx-admin/components/mui/field/bool'
import TextInput from 'react-mobx-admin/components/mui/input/text'
import MUIListView from 'react-mobx-admin/components/mui/view/list'

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
      return <TextField attr={attr} record={row} maxlen={32} onTouchTap={() => state.currentView.detailClicked(row)} />
    },
    (attr, row) => (<MUIBoolField attr={attr} record={row} />)
  ]

  return (
    <MUIListView state={state} fields={fields}
      batchActions={batchActions} onAddClicked={state.currentView.addClicked} />

  )

}

export default observer(TagListView)
