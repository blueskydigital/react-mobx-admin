import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import AppComponent from './components/app'
import PostEditView from './posts/manip'
import PostListView from './posts/list'
import LoginView from './components/login'

export default (
  <Route path="/" component={AppComponent}>
    <IndexRedirect to="/posts" />
    <Route path="/login" component={LoginView} />
    <Route path="/posts" component={PostListView} />
    <Route path="/posts/:id" component={PostEditView} />
  </Route>
)
