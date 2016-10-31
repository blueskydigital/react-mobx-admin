import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { observer } from 'mobx-react'
import { observable, toJS } from 'mobx'

@observer
class LoginView extends React.Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired,
    afterLogin: React.PropTypes.func.isRequired
  }

  @observable credentials = {
    uname: '',
    pwd: ''
  }
  @observable submitted = false

  handleSubmit() {
    this.submitted = true
    return this.props.state.performLogin(toJS(this.credentials))
    .then((user) => {
      this.props.afterLogin()
    })
    .catch((err)=>{
      this.submitted = false
    })
  }

  render() {
    return (
      <Card style={{ margin: '1em'}}>
        <CardTitle title={'login'} />

        <form style={{ padding: '0 1em 1em 1em' }}>
          <TextField name={'uname'} floatingLabelText={'uname'}
            value={this.credentials.uname} onChange={(e)=>{this.credentials.uname = e.target.value}} />
          <br/>
          <TextField name={'pwd'} floatingLabelText={'pwd'} type={'password'}
            value={this.credentials.pwd} onChange={(e)=>{this.credentials.pwd = e.target.value}} />
        </form>

        <CardActions>
          <RaisedButton onTouchTap={()=>this.handleSubmit()} label={'login'} disabled={this.submitted} />
        </CardActions>
      </Card>
    )
  }

}

export default LoginView
