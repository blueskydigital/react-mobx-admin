import React from 'react'
import { observer } from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton'
import { ToolbarTitle } from 'material-ui'

@observer
export default class Header extends React.Component {

  render() {
    const user = this.props.state.loggedUser
    if(user) {
      return (
        <div>
          <ToolbarTitle text={`${user.name} (${user.uname})`} />
          <RaisedButton label={this.props.state.__('logout')} secondary={true}
            onClick={()=>this.props.state.logout()} />
        </div>
      )
    } else {
      return (
        <div>
          <ToolbarTitle text="anonymous" />
          <RaisedButton onClick={()=>this.props.state.showLogin()} label={'login'} />
        </div>
      )
    }
  }

}
