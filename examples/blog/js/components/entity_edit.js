import React from 'react'
import { observer } from 'mobx-react'

import PostEditPage from './posts/manip'
import TagsEditPage from './tags/manip'

const EntityEdit = ({store}) => {
  switch (store.cv.entityname) {
    case 'posts':
      return <PostEditPage store={store} />
    case 'tags':
      return <TagsEditPage store={store} />
  }
}

export default  observer(['store'], EntityEdit)
