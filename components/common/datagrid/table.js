
export function buildHeaders (
  attrs, titles, renderHeader, listActionsRender, onSort,
  sortstate, noSort = [], listActionDeleteRender, fakeID = null
) {
  const headers = []
  const attrsLength = attrs.length

  // add another th for List actions
  headers.push(listActionsRender)

  const sortFields = sortstate._sortField ? sortstate._sortField.split(',') : []
  const sortDirs = sortstate._sortDir ? sortstate._sortDir.split(',') : []
  for (let i = 0; i < attrsLength; i++) {
    const attr = attrs[i]
    const title = titles[i]
    const sortStateIdx = sortFields.indexOf(attr)
    const sortable = onSort && noSort.indexOf(attr) === -1
    const sort = sortStateIdx >= 0 ? sortDirs[sortStateIdx] : null
    const header = renderHeader(attr, title, sort, sortable ? onSort : null, fakeID)
    headers.push(header)
  }

  // add another th for Delete action
  headers.push(listActionDeleteRender)

  return headers
}

export function buildCells (
  attrs, fields, row, rowId, renderCell,
  renderRowActions, renderRowActionDelete, disableAttrs = null, fakeID = null
) {
  const cells = []
  const attrsLength = attrs.length
  let disableValue

  // add another td for Row actions
  const rowActions = renderRowActions && renderRowActions(row)
  rowActions && cells.push(rowActions)

  for (let i = 0; i < attrsLength; i++) {
    const attr = attrs[i]
    const field = fields[i]

    if (disableAttrs && disableAttrs instanceof Object) {
      // disable value only
      if (disableAttrs.disable && disableAttrs.disable.includes(attr)) {
        disableValue = true
      }
      // do not show value
      if (disableAttrs.hide && disableAttrs.hide.includes(attr)) {
        row[attr] = null
      }
    }

    const cell = renderCell(row, attr, field, rowId, disableValue, fakeID)
    cells.push(cell)
  }

  // add another td for Delete action
  const rowActionDelete = renderRowActionDelete && renderRowActionDelete(row)
  rowActionDelete && cells.push(rowActionDelete)

  return cells
}
