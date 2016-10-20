import React from 'react'
import { observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import DevTools from 'mobx-react-devtools'

@observer
class Loading extends React.Component {
  render() {
    return this.props.state.loading ? <CircularProgress color="#fff" /> : <span />
  }
}

export default class AppComponent extends React.Component {
  render() {
    const { state } = this.props

    return (
      <div>
        <MuiThemeProvider className="view-wrapper">
          <div>
            <Toolbar>
              <ToolbarGroup firstChild={true}>
                <FlatButton onTouchTap={() => browserHistory.push('/')}>SampleAPp</FlatButton>
                <FlatButton onTouchTap={() => browserHistory.push('/posts')}>Posts</FlatButton>
                <FlatButton onTouchTap={() => state.changeLang()}>ChangeLang</FlatButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <Loading state={this.props.state}/>
              </ToolbarGroup>
            </Toolbar>
            {this.props.children}
          </div>
        </MuiThemeProvider>
        <DevTools />
      </div>
    )
  }
}
