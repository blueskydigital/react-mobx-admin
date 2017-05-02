
export function convertQuery(q) {
  const converted = {}
  if (q._page) {
    converted._start = (q._page - 1) * q._perPage,
    converted._limit = q._perPage
  }

  if(q._sortField) {
    converted._sort = q._sortField
    converted._order = q._sortDir
  }

  for(let i in q) {
    if (i[0] !== '_')
    converted[i] = q[i]
  }
  return converted
}

export function getTotalItems(response) {
  return parseInt(response.headers['x-total-count']) || response.data.length
}
