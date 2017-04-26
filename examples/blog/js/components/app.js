import React from 'react'
import { observer } from 'mobx-react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import UserInfo from './header'
import MessagesView from './messages'


const Loading = observer( ({state}) => {
  return state.loading ? <CircularProgress color="#fff" /> : <span />
})

export const App = observer( ({ state }) => {
  return (
    <div>
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <FlatButton onTouchTap={() => state.showLogin()}>SampleAPp</FlatButton>
          <FlatButton onTouchTap={() => state.showPostList()}>Posts</FlatButton>
          <FlatButton onTouchTap={() => state.showPostList({filters: {"category":"tech"}})}>Tech Posts</FlatButton>
          <FlatButton onTouchTap={() => state.showTagList()}>Tags</FlatButton>
          <FlatButton onTouchTap={() => state.changeLang()}>ChangeLang</FlatButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <Loading state={state}/>
          <UserInfo state={state}/>
        </ToolbarGroup>
      </Toolbar>
      { renderCurrentView(state) }
      <MessagesView state={state} />
    </div>
  )
})

import PostEditPage from './posts/manip'
import PostListPage from './posts/list'
import TagsEditPage from './tags/manip'
import TagsListPage from './tags/list'
import LoginPage from './login'

function renderCurrentView(state) {
  switch (state.currentView.name) {
    case 'login': return <LoginPage state={state} afterLogin={()=>state.showEntityList('posts')} />
    case 'post_list': return <PostListPage state={state} />
    case 'post_detail': return <PostEditPage state={state} />
    case 'tag_list': return <TagsListPage state={state} />
    case 'tag_detail': return <TagsEditPage state={state} />
  }
}
