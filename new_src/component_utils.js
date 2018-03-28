
export function paginationRange (page, perPage, total) {
  const input = []
  const nbPages = Math.ceil(total / perPage) || 1

  // display page links around the current page
  if (page > 2) {
    input.push('1')
  }
  if (page === 4) {
    input.push('2')
  }
  if (page > 4) {
    input.push('.')
  }
  if (page > 1) {
    input.push(page - 1)
  }
  input.push(page)
  if (page < nbPages) {
    input.push(page + 1)
  }
  if (page === (nbPages - 3)) {
    input.push(nbPages - 1)
  }
  if (page < (nbPages - 3)) {
    input.push('.')
  }
  if (page < (nbPages - 1)) {
    input.push(nbPages)
  }

  return input
}

export function buildTableHeaders (attrs, titles, renderHeader, onSort, sortstate, noSort = []) {
  let headers = []
  let i

  const sortFields = sortstate._sortField ? sortstate._sortField.split(',') : []
  const sortDirs = sortstate._sortDir ? sortstate._sortDir.split(',') : []
  for (i = 0; i < attrs.length; i++) {
    const attr = attrs[i]
    const title = titles[i]
    const sortStateIdx = sortFields.indexOf(attr)
    const sortable = onSort && noSort.indexOf(attr) === -1
    const sort = sortStateIdx >= 0 ? sortDirs[sortStateIdx] : null
    const header = renderHeader(attr, title, sort, sortable ? onSort : null)
    headers.push(header)
  }

  return headers
}
