
export function convertQuery(q) {
  const perPage = q.perPage
  let converted = {
    _start: (q.page - 1) * perPage,
    _limit: perPage
  }
  if(q.sortField) {
    converted._sort = q.sortField
    converted._order = q.sortDir
  }
  for(let i in q.filters) {
    converted[i] = q.filters[i]
  }
  return converted
}

export function getTotalItems(response) {
  return parseInt(response.headers['x-total-count']) || response.data.length
}
