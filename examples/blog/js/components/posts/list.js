import React from 'react'
import { observer } from 'mobx-react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import TextField from 'react-mobx-admin/components/field/text'
import DateField from 'react-mobx-admin/components/field/date'
import OptionsField from 'react-mobx-admin/components/field/opts'
import MultivalueField from 'react-mobx-admin/components/field/multivalue'
import TextInput from 'react-mobx-admin/mui/input/text'
import MUIListView from 'react-mobx-admin/mui/view/list'

class TagField extends OptionsField {
  renderComponent(label, val, onTouchTap) {
    return (
      <Chip style={{float: 'left'}} onTouchTap={onTouchTap}>
        {label}
      </Chip>
    )
  }
}

@observer
class PostListView extends MUIListView {

  batchActions(state) {
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected items?`)) {
        state.deleteSelected()
      }
    }
    return (
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
        <MenuItem primaryText="delete" leftIcon={<DeleteIcon />} onClick={() => _batchDelete()}/>
      </IconMenu>
    )
  }

  listActions(row) {
    const { state } = this.props
    function _deleteRow(row) {
      if(confirm(`Are you sure you want to delete ${row.title}?`)) {
        state.deleteData([row])
      }
    }
    return row ? (
      <div>
        <IconButton onClick={() => { _deleteRow(row)}}><DeleteIcon /></IconButton>
      </div>
    ) : null
  }

  fields = [
    (attr, row) => (<TextField attr={attr} record={row} />),
    (attr, row) => {
      const { state } = this.props
      const onTT = () => state.showEntityDetail('posts', row[state.currentView.pkName])
      return (<TextField attr={attr} record={row} maxlen={32} onTouchTap={onTT}/>)
    },
    (attr, row) => (
      <OptionsField attr={attr} record={row} optionsrecord={this.props.state.options} optionsattr={'categories'} />
    ),
    (attr, row) => (<DateField attr={attr} record={row} />),
    (attr, row) => (<MultivalueField attr={attr} record={row} itemRenderer={
      (item, idx, arr) => (
        <TagField key={idx} attr={idx} record={arr} optionsrecord={this.props.state.options} optionsattr={'tags'}
          labelattr={'name'} valueattr={'id'} />
      )
    } />)
  ]

  filters = {
    'category': {title: 'Category', icon: <DeleteIcon />, component: (props) => (<TextInput {...props} />)}
  }

}

export default PostListView
