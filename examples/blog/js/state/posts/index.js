
export function postListViewInit(state) {
  state.loadOptions('tags', '/tags')
  return {
    perPage: 6,
    pkName: 'id',
    sortField: 'title',
    sortDir: 'ASC',
    attrs: ['id', 'title', 'category', 'published_at', 'tags'],
    headertitles: ['ID', 'Title', 'Cat', 'Published', 'Tags']
  }
}

export function postDetailViewInit(state) {
  state.loadOptions('tags', '/tags')
  return {
    edittitle: 'edit a nice post',
    validators: {
      'title': [
        {fn: (val) => (val.length === 0), message: state.__('title must be provided')},
        {fn: (val) => (val.length > 10), message: state.__('title too long')},
      ],
      'content': [
        {fn: (val) => (val.length === 0), message: state.__('this is mandatory')}
      ]
    }
  }
}
