
export function buildHeaders(attrs, titles, renderHeader, listActionsRender, onSort, sortstate) {
  let headers = []
  let i
  for(i = 0; i < attrs.length; i++) {
    const attr = attrs[i]
    const title = titles[i]
    const sort = sortstate && (sortstate._sortField === attr) ? sortstate._sortDir : null
    const header = renderHeader(attr, title, sort, onSort)
    headers.push(header)
  }

  // add another th for List actions
  headers.push(listActionsRender)

  return headers
}

export function buildCells(attrs, fields, row, rowId, renderCell, renderRowActions) {
  let cells = []
  let i
  for(i = 0; i < attrs.length; i++) {
    const attr = attrs[i]
    const field = fields[i]
    const cell = renderCell(row, attr, field, rowId)
    cells.push(cell)
  }

  const rowActions = renderRowActions && renderRowActions(row)
  rowActions && cells.push(rowActions)

  return cells
}
