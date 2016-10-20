import React from 'react'
import { observer } from 'mobx-react'
import FlatButton from 'material-ui/FlatButton'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import PaginationBase from '../../components/datagrid/pagination'

const buttonStyle = { margin: '10px 0' }

@observer
class DatagridPagination extends PaginationBase {

  render() {
    const totalItems = this.props.state.totalItems
    const page = parseInt(this.props.state.page) || 1
    const perPage = parseInt(this.props.state.perPage) || 1
    const nbPages = Math.ceil(totalItems / perPage) || 1
    const offsetEnd = Math.min(page * perPage, totalItems)
    const offsetBegin = Math.min((page - 1) * perPage + 1, offsetEnd)
    const displayPagination = perPage < totalItems

    const pageRange = this.range(page, perPage, totalItems).map(pageNum =>
      (pageNum === '.') ?
        <span key={pageNum} style={{ padding: '1.2em' }}>&hellip;</span> :
        <FlatButton key={pageNum} label={pageNum} data-page={pageNum} style={buttonStyle}
          onClick={this.onChange(pageNum)} primary={pageNum !== this.props.page} />
    )

    const pagination = (nbPages > 1) && (
      <ToolbarGroup>
      {page > 1 &&
          <FlatButton primary key="prev" label="Prev" icon={<ChevronLeft />} onClick={this.onChange(page - 1)} />
      }
      {pageRange}
      {page !== nbPages &&
          <FlatButton primary key="next" label="Next" icon={<ChevronRight />} labelPosition="before" onClick={this.onChange(page + 1)} />
      }
      </ToolbarGroup>
    )

    return (
      <Toolbar>
        <ToolbarGroup firstChild>
          <span style={{ padding: '1.2em' }} >{offsetBegin}-{offsetEnd} of {totalItems}</span>
        </ToolbarGroup>
        {pagination}
      </Toolbar>
    )
  }

}
export default DatagridPagination
