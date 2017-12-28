/* global confirm */
import React from 'react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'react-mobx-admin/components/common/field/text'
import BoolField from 'react-mobx-admin/components/mui/field/bool'
import ListView from 'react-mobx-admin/components/mui/view/list'

const TagListView = ({store}) => {
  //
  const batchActions = () => {
    function _batchDelete () {
      if (confirm(`Are you sure you want to delete selected tags?`)) {
        store.cv.deleteSelected()
      }
    }
    return (
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
        <MenuItem primaryText='delete' leftIcon={<DeleteIcon />} onClick={() => _batchDelete()} />
      </IconMenu>
    )
  }

  const fields = [
    (attr, row) => (<TextField attr={attr} val={row[attr]} />),
    (attr, row) => {
      const DetailLink = ({text}) => (
        <a href='javascript:void(0)' onClick={() => store.detailClicked(row)}>{text}</a>
      )
      return <TextField attr={attr} val={row[attr]} Component={DetailLink} />
    },
    (attr, row) => (<BoolField attr={attr} val={row[attr]} />)
  ]

  return (
    <ListView store={store.cv} fields={fields}
      batchActions={batchActions} onAddClicked={store.addClicked.bind(store)} />

  )
}

export default TagListView
