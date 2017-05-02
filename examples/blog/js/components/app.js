import React from 'react'
import { observer, Provider } from 'mobx-react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui'
import FlatButton from 'material-ui/FlatButton'
import { MobxRouter } from 'mobx-router'
import UserInfo from './header'
import MessagesView from './messages'
import views from '../routeconfig'


export const App = observer( ({ store }) => {
  return (
    <div>
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <FlatButton onTouchTap={() => store.router.goTo(views.login, {}, store, {})}>SampleAPp</FlatButton>
          <FlatButton onTouchTap={() => {
            store.router.goTo(views.entity_list, {entityname: 'posts'}, store, {_page: 1})
          }}>Posts</FlatButton>
          <FlatButton onTouchTap={() => {
            store.router.goTo(views.entity_list, {entityname: 'posts'}, store, {_page: 1, category: 'tech'})
          }}>Tech Posts</FlatButton>
          <FlatButton onTouchTap={() => {
            store.router.goTo(views.entity_list, {entityname: 'tags'}, store, {_page: 1})
          }}>Tags</FlatButton>
          <FlatButton onTouchTap={() => store.changeLang()}>ChangeLang</FlatButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <UserInfo state={store}/>
        </ToolbarGroup>
      </Toolbar>
      <Provider store={store}>
        <MobxRouter />
      </Provider>
      <MessagesView state={store} />
    </div>
  )
})
