import React from 'react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import TextField from 'react-mobx-admin/components/field/text'
import DateField from 'react-mobx-admin/components/field/date'
import TextInput from 'react-mobx-admin/mui/input/text'
import ListPageBase from 'react-mobx-admin/components/page/list'
import MUIListView from 'react-mobx-admin/mui/view/list'


class PostListView extends MUIListView {

  render() {
    const { state } = this.props
    const headertitles = [
      'ID', 'Title', 'Cat', 'Published'
    ]
    const attrs = [
      "id", "title", "category", "published_at"
    ]
    const fields = [
      (attr, row) => (<TextField attr={attr} record={row} />),
      (attr, row) => {
        const to = `/posts/${row.id.toString()}`
        return (<TextField attr={attr} record={row} maxlen={32} to={to}/>)
      },
      (attr, row) => (<TextField attr={attr} record={row} />),
      (attr, row) => (<DateField attr={attr} record={row} />)
    ]
    function rowId(row) {
      return row.id
    }
    function _deleteRow(row) {
      if(confirm(`Are you sure you want to delete ${row.title}?`)) {
        state.deleteData([row])
      }
    }
    function listActions(row) {
      return (
        <div>
          <IconButton onClick={() => { _deleteRow(row)}}><DeleteIcon /></IconButton>
        </div>
      )
    }
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected items?`)) {
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
    var filters = {
      'category': {title: 'Category', icon: <DeleteIcon />, component: (props) => (<TextInput {...props} />)}
    }

    // let rendering of actual components to parent (in this case it uses MatUI)
    return this.renderComponents({
      attrs, headertitles, fields, title: 'posts', rowId,
      listActions: listActions,
      actions: batchActions,
      filters: filters
    })
  }

}

export default class PostListPage extends ListPageBase {

  static defaultProps = {
    entityName: 'posts',
    perPage: 5
  }

  render() {
    return (
      <PostListView
        state={this.props.state}
        onSort={this.onListSort.bind(this)}
        onPageChange={this.onPageChange.bind(this)}
        onRowSelection={this.onSelect.bind(this)}
        onShowFilter={this.showFilter.bind(this)}
        onHideFilter={this.hideFilter.bind(this)}
        onFilterApply={this.applyFilters.bind(this)} />
    )
  }

}
