import React from 'react'
import { browserHistory } from 'react-router'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import TextField from 'react-mobx-admin/components/field/text'
import DateField from 'react-mobx-admin/components/field/date'
import OptionsField from 'react-mobx-admin/components/field/opts'
import MultivalueField from 'react-mobx-admin/components/field/multivalue'
import TextInput from 'react-mobx-admin/mui/input/text'
import ListPageBase from 'react-mobx-admin/components/page/list'
import MUIListView from 'react-mobx-admin/mui/view/list'

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
      (attr, row) => {
        const onTouchTap = () => (browserHistory.push(`/tags/${row.id.toString()}`))
        return (<TextField attr={attr} record={row} maxlen={32} onTouchTap={onTouchTap}/>)
      },
      (attr, row) => (<TextField attr={attr} record={row} />)
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

export default class TagListPage extends ListPageBase {

  static defaultProps = {
    entityName: 'tags',
    perPage: 5
  }

  render() {
    return (
      <TagListView
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
