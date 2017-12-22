import React from 'react'
import { observer, inject } from 'mobx-react'
import PostListPage from './posts/list'
import TagsListPage from './tags/list'

const EntityList = ({store}) => {
  switch (store.router.params.entityname) {
    case 'posts':
      return <PostListPage store={store} />
    case 'tags':
      return <TagsListPage store={store} />
  }
}

export default inject('store')(observer(EntityList))
