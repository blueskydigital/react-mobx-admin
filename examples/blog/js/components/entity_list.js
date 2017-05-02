import React from 'react'
import { observer } from 'mobx-react'
import PostListPage from './posts/list'
import TagsListPage from './tags/list'

const EntityList = ({store}) => {
  switch (store.cv.entityname) {
    case 'posts':
      return <PostListPage store={store} />
    case 'tags':
      return <TagsListPage store={store} />
  }
}

export default observer(['store'], EntityList)
