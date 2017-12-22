import React from 'react'
import { observer, inject } from 'mobx-react'

import PostEditPage from './posts/manip'
import TagsEditPage from './tags/manip'


const EntityEdit = ({store}) => {
  switch (store.router.params.entityname) {
    case 'posts':
      return <PostEditPage store={store} />
    case 'tags':
      return <TagsEditPage store={store} />
  }
}

export default inject('store')(observer(EntityEdit))
