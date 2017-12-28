/* global alert, confirm */
import React from 'react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import TextField from 'react-mobx-admin/components/common/field/text'
import DateField from 'react-mobx-admin/components/common/field/date'
import OptionsField from 'react-mobx-admin/components/common/field/opts'
import MultivalueField from 'react-mobx-admin/components/common/field/multivalue'
import TextInput from 'react-mobx-admin/components/mui/input/text'
import SelectInput from 'react-mobx-admin/components/mui/input/select'
import ListView from 'react-mobx-admin/components/mui/view/list'

const PostListView = ({store}) => {
  //
  const _tagOptionComponent = ({attr, record}) => {
    function onClick () {
      alert(JSON.stringify(record))
    }
    const _tagComponent = ({text}) => (
      <Chip style={{float: 'left'}} onClick={onClick}>{text}</Chip>
    )
    return <OptionsField attr={attr} record={record}
      optionsrecord={store.options} optionsattr={'tags'}
      labelattr={'name'} valueattr={'id'} Component={_tagComponent} />
  }

  const batchActions = (store) => {
    function _batchDelete () {
      if (confirm(`Are you sure you want to delete selected items?`)) {
        store.cv.deleteSelected()
      }
    }
    return (
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
        <MenuItem primaryText='delete' leftIcon={<DeleteIcon />} onClick={() => _batchDelete()} />
      </IconMenu>
    )
  }

  const listActions = (row) => {
    function _deleteRow (row) {
      if (confirm(`Are you sure you want to delete ${row.title}?`)) {
        store.cv.deleteData([row])
      }
    }
    return row ? (
      <div>
        <IconButton onClick={(e) => {
          e.stopPropagation() // prevent selecting deleted row
          e.preventDefault()
          _deleteRow(row)
        }}><DeleteIcon /></IconButton>
      </div>
    ) : null
  }

  const fields = [
    (attr, row) => (<TextField attr={attr} val={row[attr]} />),
    (attr, row) => {
      const DetailLink = ({text}) => (
        <a href='javascript:void(0)' onClick={() => store.detailClicked(row)}>{text}</a>
      )
      return <TextField attr={attr} val={row[attr]} Component={DetailLink} />
    },
    (attr, row) => (
      <OptionsField attr={attr} val={row[attr]} optionsrecord={store.options} optionsattr={'categories'} />
    ),
    (attr, row) => (<DateField attr={attr} val={row[attr]} />),
    (attr, row) => (<DateField attr={attr} val={row[attr]} />),
    (attr, row) => {
      return <MultivalueField attr={attr} val={row[attr]} Item={_tagOptionComponent} />
    }
  ]

  const filters = {
    'category': {
      title: 'Category',
      icon: <DeleteIcon />,
      component: (props) => (
        <SelectInput {...props} optionsrecord={store.options} optionsattr={'categories'} />
      )
    },
    'title_like': {
      title: 'Title',
      icon: <DeleteIcon />,
      component: (props) => (<TextInput {...props} />)
    }
  }

  return (
    <ListView store={store.cv} fields={fields} listActions={listActions} filters={filters}
      batchActions={batchActions} onAddClicked={store.addClicked.bind(store)} />
  )
}

export default PostListView
