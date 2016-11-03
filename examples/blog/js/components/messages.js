import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { observer } from 'mobx-react'

@observer
class MessagesView extends React.Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    let mess = []
    this.props.state.messages.forEach((message, key) => {
      mess.push(<Snackbar key={key} open={true} message={message.text} />)
    })
    return (<div>{mess}</div>)
  }
}
export default MessagesView
