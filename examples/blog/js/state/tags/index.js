
export function tagListViewInit(state) {
  return {
    perPage: 3,
    pkName: 'id',
    attrs: ['id', 'name', 'published'],
    headertitles: ['ID', state.__('Name'), 'Published']
  }
}

export function tagDetailViewInit(state) {
  return {
    validators: {
      'name': [
        {fn: (val) => (val.length === 0), message: state.__('value must be provided')},
        {fn: (val) => (val.length > 10), message: state.__('value too long')},
      ]
    }
  }
}
