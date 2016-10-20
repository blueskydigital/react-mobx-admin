import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import AppComponent from './components/app'
import PostEditPage from './posts/manip'
import PostListPage from './posts/list'
import LoginPage from './components/login'

export default (
  <Route path="/" component={AppComponent}>
    <IndexRedirect to="/posts" />
    <Route path="/login" component={LoginPage} />
    <Route path="/posts" component={PostListPage} />
    <Route path="/posts/:id" component={PostEditPage} />
  </Route>
)
