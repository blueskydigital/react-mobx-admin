import React from 'react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'react-mobx-admin/components/mui/field/text'
import BoolField from 'react-mobx-admin/components/mui/field/bool'
import ListView from 'react-mobx-admin/components/mui/view/list'


const TagListView = ({store}) => {

  const batchActions = () => {
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected tags?`)) {
        store.deleteSelected()
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
      return <TextField attr={attr} record={row} onTouchTap={() => store.detailClicked(row)} />
    },
    (attr, row) => (<BoolField attr={attr} record={row} />)
  ]

  return (
    <ListView store={store} fields={fields}
      batchActions={batchActions} onAddClicked={store.addClicked.bind(store)} />

  )

}

export default TagListView
