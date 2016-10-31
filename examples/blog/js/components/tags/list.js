import React from 'react'
import { observer } from 'mobx-react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import TextField from 'react-mobx-admin/components/field/text'
import DateField from 'react-mobx-admin/components/field/date'
import OptionsField from 'react-mobx-admin/components/field/opts'
import MultivalueField from 'react-mobx-admin/components/field/multivalue'
import MUIBoolField from 'react-mobx-admin/mui/field/bool'
import TextInput from 'react-mobx-admin/mui/input/text'
import MUIListView from 'react-mobx-admin/mui/view/list'

@observer
class TagListView extends MUIListView {

  render() {
    const { state } = this.props
    const headertitles = [
      'ID', 'Name', 'Published'
    ]
    const attrs = [
      "id", "name", "published"
    ]
    const fields = [
      (attr, row) => (<TextField attr={attr} record={row} />),
      (attr, row) => (
        <TextField attr={attr} record={row} maxlen={32} onTouchTap={()=>state.showEntityDetail('tags', row.id)}/>
      ),
      (attr, row) => (<MUIBoolField attr={attr} record={row} />)
    ]
    function rowId(row) {
      return row.id
    }
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected tags?`)) {
        state.deleteSelected()
      }
    }
    function batchActions() {
      return (
        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
          <MenuItem primaryText="delete" leftIcon={<DeleteIcon />} onClick={() => _batchDelete()}/>
        </IconMenu>
      )
    }

    // let rendering of actual components to parent (in this case it uses MatUI)
    return this.renderComponents({
      attrs, headertitles, fields, title: 'tags', rowId,
      actions: batchActions
    })
  }

}

export default TagListView
