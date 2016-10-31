import React from 'react'
import { observer } from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton'
import { ToolbarTitle } from 'material-ui'

@observer
export default class Header extends React.Component {

  render() {
    const user = this.props.state.loggedUser
    if(user) {
      return <ToolbarTitle text={`${user.name} (${user.uname})`} />
    } else {
      return (
        <div>
          <ToolbarTitle text="anonymous" />
          <RaisedButton onTouchTap={()=>this.props.state.showLogin()} label={'login'} />
        </div>
      )
    }
  }

}
